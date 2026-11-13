<?php

use App\Enums\EstadoActividad;
use App\Enums\EstadoSolicitud;
use App\Enums\Rol;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\Indicador;
use App\Models\LineaAccion;
use App\Models\PublicoObjetivo;
use App\Models\SolicitudEspacio;
use App\Models\TipoActividad;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Support\Carbon;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create(['nombre' => 'Unidad de Cultura']);
    $this->coordinador = User::factory()
        ->conRoles(Rol::CoordinadorUnidad)
        ->enUnidad($this->unidad)
        ->create();
    $this->tipo = TipoActividad::factory()->create(['nombre' => 'Taller']);
    $this->linea = LineaAccion::factory()->create(['nombre' => 'Difusión cultural']);
});

/**
 * @return array<string, mixed>
 */
function datosActividad(array $extra = []): array
{
    return [
        'nombre' => 'Taller de marimba',
        'fecha' => Carbon::today()->addWeeks(2)->toDateString(),
        'hora_inicio' => '09:00',
        'hora_fin' => '11:00',
        'lugar_externo' => 'Salón comunal de la zona 1',
        'tipo_actividad_id' => test()->tipo->id,
        'linea_accion_id' => test()->linea->id,
        'publicar_agenda' => false,
        ...$extra,
    ];
}

test('el coordinador registra una actividad en borrador con su clasificación', function () {
    $publico = PublicoObjetivo::factory()->create();
    $indicador = Indicador::factory()->create();

    actingAs($this->coordinador)
        ->post(route('actividades.store'), datosActividad([
            'publicos' => [$publico->id],
            'indicadores' => [['indicador_id' => $indicador->id, 'valor_meta' => 50]],
        ]))
        ->assertSessionHasNoErrors();

    $actividad = Actividad::sole();

    expect($actividad->estado)->toBe(EstadoActividad::Borrador)
        ->and($actividad->unidad_id)->toBe($this->unidad->id)
        ->and($actividad->publicosObjetivo)->toHaveCount(1)
        ->and((float) $actividad->indicadores->first()->pivot->valor_meta)->toBe(50.0);
});

test('toda actividad necesita un lugar', function () {
    actingAs($this->coordinador)
        ->post(route('actividades.store'), datosActividad(['lugar_externo' => null]))
        ->assertSessionHasErrors('lugar_externo');
});

test('la hora de finalización debe ser posterior a la de inicio', function () {
    actingAs($this->coordinador)
        ->post(route('actividades.store'), datosActividad(['hora_fin' => '08:00']))
        ->assertSessionHasErrors('hora_fin');
});

test('al elegir un espacio se crea la reserva pendiente vinculada', function () {
    $espacio = Espacio::factory()->create();

    actingAs($this->coordinador)
        ->post(route('actividades.store'), datosActividad([
            'espacio_id' => $espacio->id,
            'lugar_externo' => null,
        ]))
        ->assertSessionHasNoErrors();

    $actividad = Actividad::sole();
    $reserva = SolicitudEspacio::sole();

    expect($reserva->actividad_id)->toBe($actividad->id)
        ->and($reserva->estado)->toBe(EstadoSolicitud::Pendiente)
        ->and($reserva->espacio_id)->toBe($espacio->id)
        ->and($actividad->lugar)->toBe($espacio->nombre);
});

test('no se puede programar una actividad en un espacio ya reservado', function () {
    $espacio = Espacio::factory()->create();
    $fecha = Carbon::today()->addWeeks(2)->toDateString();

    SolicitudEspacio::factory()
        ->aprobada()
        ->enHorario($fecha, '10:00:00', '12:00:00')
        ->create(['espacio_id' => $espacio->id]);

    actingAs($this->coordinador)
        ->post(route('actividades.store'), datosActividad([
            'espacio_id' => $espacio->id,
            'lugar_externo' => null,
            'fecha' => $fecha,
        ]))
        ->assertSessionHasErrors('espacio_id');

    expect(Actividad::count())->toBe(0);
});

test('un espacio exige horario para poder reservarlo', function () {
    $espacio = Espacio::factory()->create();

    actingAs($this->coordinador)
        ->post(route('actividades.store'), datosActividad([
            'espacio_id' => $espacio->id,
            'lugar_externo' => null,
            'hora_inicio' => null,
            'hora_fin' => null,
        ]))
        ->assertSessionHasErrors('hora_inicio');
});

test('solo se edita o elimina mientras la actividad no se ha validado', function () {
    $actividad = Actividad::factory()->create(['unidad_id' => $this->unidad->id]);

    actingAs($this->coordinador)->get(route('actividades.edit', $actividad))->assertOk();

    $actividad->update(['estado' => EstadoActividad::Validada]);

    actingAs($this->coordinador)->get(route('actividades.edit', $actividad))->assertForbidden();
    actingAs($this->coordinador)->delete(route('actividades.destroy', $actividad))->assertForbidden();

    $actividad->update(['estado' => EstadoActividad::Borrador]);

    actingAs($this->coordinador)
        ->delete(route('actividades.destroy', $actividad))
        ->assertRedirect(route('actividades.index'));

    expect($actividad->refresh()->trashed())->toBeTrue();
});

test('un coordinador no gestiona las actividades de otra unidad', function () {
    $otraUnidad = Unidad::factory()->create();
    $ajena = Actividad::factory()->create(['unidad_id' => $otraUnidad->id]);

    actingAs($this->coordinador)->get(route('actividades.edit', $ajena))->assertForbidden();
    actingAs($this->coordinador)->get(route('actividades.show', $ajena))->assertForbidden();
});

test('el listado mensual solo muestra la unidad del coordinador', function () {
    $otraUnidad = Unidad::factory()->create();
    $mes = Carbon::today()->format('Y-m');

    Actividad::factory()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'De mi unidad']);
    Actividad::factory()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $otraUnidad->id, 'nombre' => 'De otra unidad']);

    actingAs($this->coordinador)
        ->get(route('actividades.index', ['mes' => $mes]))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('actividades.data', 1)
            ->where('actividades.data.0.nombre', 'De mi unidad'));
});

test('la dirección ve la programación de todas las unidades', function () {
    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $otraUnidad = Unidad::factory()->create();

    Actividad::factory()->enFecha(Carbon::today()->toDateString())->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->enFecha(Carbon::today()->toDateString())->create(['unidad_id' => $otraUnidad->id]);

    actingAs($direccion)
        ->get(route('actividades.index', ['mes' => Carbon::today()->format('Y-m')]))
        ->assertInertia(fn ($pagina) => $pagina->has('actividades.data', 2));
});
