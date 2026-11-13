<?php

use App\Enums\EstadoEspacio;
use App\Enums\Rol;
use App\Models\Equipamiento;
use App\Models\Espacio;
use App\Models\Sede;
use App\Models\SolicitudEspacio;
use App\Models\TipoEspacio;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->administradorEspacios = User::factory()->conRoles(Rol::AdministradorEspacios)->create();
    $this->sede = Sede::factory()->create(['nombre' => 'Paraninfo']);
    $this->tipo = TipoEspacio::factory()->create(['nombre' => 'Salón']);
});

/**
 * @return array<string, mixed>
 */
function datosEspacio(array $extra = []): array
{
    return [
        'sede_id' => test()->sede->id,
        'nombre' => 'Salón Mayor',
        'tipo_espacio_id' => test()->tipo->id,
        'capacidad' => 250,
        'estado' => EstadoEspacio::Activo->value,
        'visible_publico' => true,
        ...$extra,
    ];
}

test('el administrador de espacios registra un espacio con su equipamiento', function () {
    $sonido = Equipamiento::factory()->create(['nombre' => 'Sonido']);
    $sillas = Equipamiento::factory()->create(['nombre' => 'Sillas']);

    actingAs($this->administradorEspacios)
        ->post(route('espacios.store'), datosEspacio([
            'equipamientos' => [$sonido->id, $sillas->id],
            'cantidades' => [$sonido->id => 1, $sillas->id => 200],
        ]))
        ->assertSessionHasNoErrors();

    $espacio = Espacio::sole();

    expect($espacio->nombre)->toBe('Salón Mayor')
        ->and($espacio->equipamientos)->toHaveCount(2)
        ->and((int) $espacio->equipamientos->firstWhere('nombre', 'Sillas')->pivot->cantidad)->toBe(200);
});

test('dos espacios de la misma sede no pueden repetir nombre', function () {
    Espacio::factory()->create([
        'sede_id' => $this->sede->id,
        'nombre' => 'Salón Mayor',
        'tipo_espacio_id' => $this->tipo->id,
    ]);

    actingAs($this->administradorEspacios)
        ->post(route('espacios.store'), datosEspacio())
        ->assertSessionHasErrors('nombre');

    $otraSede = Sede::factory()->create(['nombre' => 'MUSAC']);

    actingAs($this->administradorEspacios)
        ->post(route('espacios.store'), datosEspacio(['sede_id' => $otraSede->id]))
        ->assertSessionHasNoErrors();
});

test('las fotografías del espacio se guardan en el disco público', function () {
    Storage::fake('public');

    actingAs($this->administradorEspacios)
        ->post(route('espacios.store'), datosEspacio([
            'fotografias' => [
                UploadedFile::fake()->image('salon-1.jpg'),
                UploadedFile::fake()->image('salon-2.jpg'),
            ],
        ]))
        ->assertSessionHasNoErrors();

    $espacio = Espacio::sole();

    expect($espacio->fotografias)->toHaveCount(2);
    Storage::disk('public')->assertExists($espacio->fotografias->first()->ruta);
});

test('un usuario sin el rol consulta los espacios pero no los modifica', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();
    $espacio = Espacio::factory()->create();

    actingAs($consulta)->get(route('espacios.index'))->assertOk();
    actingAs($consulta)->get(route('espacios.show', $espacio))->assertOk();
    actingAs($consulta)->get(route('espacios.create'))->assertForbidden();
    actingAs($consulta)->post(route('espacios.store'), datosEspacio())->assertForbidden();
    actingAs($consulta)->delete(route('espacios.destroy', $espacio))->assertForbidden();
});

test('la ficha del espacio muestra su historial de uso', function () {
    $espacio = Espacio::factory()->create();

    SolicitudEspacio::factory()->aprobada()->create([
        'espacio_id' => $espacio->id,
        'solicitante_nombre' => 'Facultad de Agronomía',
    ]);
    SolicitudEspacio::factory()->create(['espacio_id' => $espacio->id]);

    actingAs($this->administradorEspacios)
        ->get(route('espacios.show', $espacio))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('historial', 1)
            ->where('historial.0.solicitante', 'Facultad de Agronomía'));
});

test('el calendario muestra las reservas del período con su estado', function () {
    $espacio = Espacio::factory()->create();
    $fecha = Carbon::today()->toDateString();

    SolicitudEspacio::factory()->aprobada()->enHorario($fecha, '09:00:00', '11:00:00')
        ->create(['espacio_id' => $espacio->id]);
    SolicitudEspacio::factory()->enHorario($fecha, '14:00:00', '16:00:00')
        ->create(['espacio_id' => $espacio->id]);

    actingAs($this->administradorEspacios)
        ->get(route('calendario.index', ['vista' => 'dia', 'fecha' => $fecha]))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('filtros.vista', 'dia')
            ->has('rango.dias', 1)
            ->has('reservas', 2)
            ->where('reservas.0.estado', 'aprobada')
            ->where('reservas.1.estado', 'pendiente'));
});

test('el calendario filtra por sede y cambia de vista', function () {
    $otraSede = Sede::factory()->create();
    Espacio::factory()->create(['sede_id' => $this->sede->id]);
    Espacio::factory()->create(['sede_id' => $otraSede->id]);

    actingAs($this->administradorEspacios)
        ->get(route('calendario.index', ['sede_id' => $this->sede->id]))
        ->assertInertia(fn ($pagina) => $pagina->has('espacios', 1));

    actingAs($this->administradorEspacios)
        ->get(route('calendario.index', ['vista' => 'semana']))
        ->assertInertia(fn ($pagina) => $pagina->has('rango.dias', 7));
});

test('el reporte de utilización suma las horas de las reservas aprobadas', function () {
    $espacio = Espacio::factory()->create(['nombre' => 'Auditorio']);
    $fecha = Carbon::today()->toDateString();

    SolicitudEspacio::factory()->aprobada()->enHorario($fecha, '08:00:00', '11:00:00')
        ->create(['espacio_id' => $espacio->id]);
    SolicitudEspacio::factory()->enHorario($fecha, '14:00:00', '18:00:00')
        ->create(['espacio_id' => $espacio->id]);

    actingAs($this->administradorEspacios)
        ->get(route('espacios.reportes', ['desde' => $fecha, 'hasta' => $fecha]))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('resumen.reservas', 1)
            ->where('resumen.horas', 3)
            ->where('masUsados.0.espacio', 'Auditorio')
            ->where('masUsados.0.horas', 3));
});

test('la utilización se exporta a CSV', function () {
    $espacio = Espacio::factory()->create(['nombre' => 'Patio Central']);
    SolicitudEspacio::factory()->aprobada()->create(['espacio_id' => $espacio->id]);

    $respuesta = actingAs($this->administradorEspacios)
        ->get(route('espacios.reportes.exportar'));

    $respuesta->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');

    expect($respuesta->streamedContent())->toContain('Patio Central')
        ->and($respuesta->streamedContent())->toContain('Ocupación (%)');
});

test('un espacio en uso se puede dejar fuera del catálogo público', function () {
    $espacio = Espacio::factory()->create();

    actingAs($this->administradorEspacios)
        ->put(route('espacios.update', $espacio), datosEspacio([
            'nombre' => $espacio->nombre,
            'sede_id' => $espacio->sede_id,
            'tipo_espacio_id' => $espacio->tipo_espacio_id,
            'visible_publico' => false,
            'estado' => EstadoEspacio::Mantenimiento->value,
        ]))
        ->assertSessionHasNoErrors();

    $espacio->refresh();

    expect($espacio->visible_publico)->toBeFalse()
        ->and($espacio->estado)->toBe(EstadoEspacio::Mantenimiento);

    $this->get(route('publico.espacios.index'))
        ->assertInertia(fn ($pagina) => $pagina->has('espacios', 0));
});
