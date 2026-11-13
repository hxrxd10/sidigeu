<?php

use App\Enums\EstadoSolicitud;
use App\Enums\Rol;
use App\Models\Espacio;
use App\Models\SolicitudEspacio;
use App\Models\User;
use App\Notifications\SolicitudEspacioRecibida;
use App\Notifications\SolicitudEspacioResuelta;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->administradorEspacios = User::factory()->conRoles(Rol::AdministradorEspacios)->create();
    $this->espacio = Espacio::factory()->create(['nombre' => 'Salón Mayor']);
    $this->fecha = Carbon::today()->addWeek()->toDateString();
});

/**
 * @return array<string, mixed>
 */
function datosSolicitud(array $extra = []): array
{
    return [
        'espacio_id' => test()->espacio->id,
        'fecha' => test()->fecha,
        'hora_inicio' => '09:00',
        'hora_fin' => '11:00',
        'solicitante_nombre' => 'Asociación de Estudiantes',
        'correo' => 'contacto@ejemplo.org',
        'proposito' => 'Conversatorio sobre extensión universitaria.',
        ...$extra,
    ];
}

test('cualquier persona puede enviar una solicitud sin iniciar sesión', function () {
    Notification::fake();

    post(route('publico.solicitud.store'), datosSolicitud())
        ->assertRedirect();

    $solicitud = SolicitudEspacio::sole();

    expect($solicitud->estado)->toBe(EstadoSolicitud::Pendiente)
        ->and($solicitud->solicitado_por)->toBeNull();

    Notification::assertSentTo($this->administradorEspacios, SolicitudEspacioRecibida::class);
});

test('el catálogo público no requiere sesión y oculta los espacios no publicados', function () {
    $oculto = Espacio::factory()->oculto()->create(['nombre' => 'Bodega']);

    $this->get(route('publico.espacios.index'))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina->has('espacios', 1));

    $this->get(route('publico.espacios.show', $oculto))->assertNotFound();
});

test('una solicitud no puede cruzarse con una reserva aprobada', function () {
    SolicitudEspacio::factory()
        ->aprobada()
        ->enHorario($this->fecha, '10:00:00', '12:00:00')
        ->create(['espacio_id' => $this->espacio->id]);

    post(route('publico.solicitud.store'), datosSolicitud())
        ->assertSessionHasErrors('hora_inicio');

    expect(SolicitudEspacio::pendientes()->count())->toBe(0);
});

test('una solicitud sí puede registrarse en un horario contiguo', function () {
    Notification::fake();

    SolicitudEspacio::factory()
        ->aprobada()
        ->enHorario($this->fecha, '11:00:00', '13:00:00')
        ->create(['espacio_id' => $this->espacio->id]);

    post(route('publico.solicitud.store'), datosSolicitud())
        ->assertSessionHasNoErrors();

    expect(SolicitudEspacio::pendientes()->count())->toBe(1);
});

test('un espacio en mantenimiento no admite solicitudes', function () {
    $espacio = Espacio::factory()->enMantenimiento()->create();

    post(route('publico.solicitud.store'), datosSolicitud(['espacio_id' => $espacio->id]))
        ->assertSessionHasErrors('espacio_id');
});

test('la hora de finalización debe ser posterior a la de inicio', function () {
    post(route('publico.solicitud.store'), datosSolicitud(['hora_fin' => '08:00']))
        ->assertSessionHasErrors('hora_fin');
});

test('aprobar una solicitud bloquea el horario y notifica al solicitante', function () {
    Notification::fake();

    $solicitud = SolicitudEspacio::factory()
        ->enHorario($this->fecha, '09:00:00', '11:00:00')
        ->create(['espacio_id' => $this->espacio->id, 'correo' => 'persona@ejemplo.org']);

    actingAs($this->administradorEspacios)
        ->patch(route('solicitudes.aprobar', $solicitud))
        ->assertRedirect();

    $solicitud->refresh();

    expect($solicitud->estado)->toBe(EstadoSolicitud::Aprobada)
        ->and($solicitud->resuelto_por)->toBe($this->administradorEspacios->id)
        ->and($solicitud->fecha_resolucion)->not->toBeNull();

    Notification::assertSentOnDemand(SolicitudEspacioResuelta::class);

    // Con el horario ya bloqueado, una solicitud nueva en ese rango se rechaza.
    post(route('publico.solicitud.store'), datosSolicitud(['hora_inicio' => '10:00', 'hora_fin' => '12:00']))
        ->assertSessionHasErrors('hora_inicio');
});

test('no se aprueban dos solicitudes que se traslapan', function () {
    Notification::fake();

    SolicitudEspacio::factory()
        ->aprobada()
        ->enHorario($this->fecha, '09:00:00', '11:00:00')
        ->create(['espacio_id' => $this->espacio->id]);

    $segunda = SolicitudEspacio::factory()
        ->enHorario($this->fecha, '10:00:00', '12:00:00')
        ->create(['espacio_id' => $this->espacio->id]);

    actingAs($this->administradorEspacios)
        ->patch(route('solicitudes.aprobar', $segunda))
        ->assertSessionHasErrors('estado');

    expect($segunda->refresh()->estado)->toBe(EstadoSolicitud::Pendiente);
});

test('rechazar exige motivo y lo envía al solicitante', function () {
    Notification::fake();

    $solicitud = SolicitudEspacio::factory()->create(['espacio_id' => $this->espacio->id]);

    actingAs($this->administradorEspacios)
        ->patch(route('solicitudes.rechazar', $solicitud))
        ->assertSessionHasErrors('motivo_rechazo');

    actingAs($this->administradorEspacios)
        ->patch(route('solicitudes.rechazar', $solicitud), [
            'motivo_rechazo' => 'El espacio está reservado para un acto institucional.',
        ])
        ->assertRedirect();

    expect($solicitud->refresh()->estado)->toBe(EstadoSolicitud::Rechazada)
        ->and($solicitud->motivo_rechazo)->toContain('acto institucional');

    Notification::assertSentOnDemand(SolicitudEspacioResuelta::class);
});

test('un usuario sin el rol no resuelve solicitudes', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();
    $solicitud = SolicitudEspacio::factory()->create(['espacio_id' => $this->espacio->id]);

    actingAs($consulta)->get(route('solicitudes.index'))->assertForbidden();
    actingAs($consulta)->patch(route('solicitudes.aprobar', $solicitud))->assertForbidden();

    expect($solicitud->refresh()->estado)->toBe(EstadoSolicitud::Pendiente);
});
