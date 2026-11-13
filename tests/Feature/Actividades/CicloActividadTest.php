<?php

use App\Enums\AccionRevision;
use App\Enums\EstadoActividad;
use App\Enums\EstadoSolicitud;
use App\Enums\RangoEdad;
use App\Enums\Rol;
use App\Enums\SexoBeneficiario;
use App\Enums\TipoEvidencia;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\Indicador;
use App\Models\PersonaRecursoHumano;
use App\Models\SolicitudEspacio;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create();
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->enUnidad($this->unidad)->create();
    $this->validador = User::factory()->conRoles(Rol::Validador)->create();
});

function actividadDeLaUnidad(array $extra = []): Actividad
{
    return Actividad::factory()->create(['unidad_id' => test()->unidad->id, ...$extra]);
}

test('el coordinador envía la actividad y el validador la valida', function () {
    $actividad = actividadDeLaUnidad();

    actingAs($this->coordinador)->patch(route('actividades.enviar', $actividad))->assertRedirect();
    expect($actividad->refresh()->estado)->toBe(EstadoActividad::Enviada);

    actingAs($this->validador)->patch(route('actividades.validar', $actividad))->assertRedirect();
    $actividad->refresh();

    expect($actividad->estado)->toBe(EstadoActividad::Validada)
        ->and($actividad->revisiones->pluck('accion')->all())
        ->toBe([AccionRevision::Validacion, AccionRevision::Envio]);
});

test('una actividad con bandera de agenda se publica al validarse', function () {
    $actividad = actividadDeLaUnidad([
        'publicar_agenda' => true,
        'estado' => EstadoActividad::Enviada,
    ]);

    actingAs($this->validador)->patch(route('actividades.validar', $actividad));

    expect($actividad->refresh()->estado)->toBe(EstadoActividad::PublicadaAgenda);
});

test('al validar se confirma la reserva del espacio', function () {
    $espacio = Espacio::factory()->create();
    $actividad = actividadDeLaUnidad([
        'espacio_id' => $espacio->id,
        'lugar_externo' => null,
        'estado' => EstadoActividad::Enviada,
    ]);

    $reserva = SolicitudEspacio::factory()
        ->enHorario($actividad->fecha->toDateString(), $actividad->hora_inicio, $actividad->hora_fin)
        ->create(['espacio_id' => $espacio->id, 'actividad_id' => $actividad->id]);

    actingAs($this->validador)->patch(route('actividades.validar', $actividad))->assertSessionHasNoErrors();

    expect($reserva->refresh()->estado)->toBe(EstadoSolicitud::Aprobada)
        ->and($reserva->resuelto_por)->toBe($this->validador->id);
});

test('observar devuelve la actividad a la unidad con el comentario', function () {
    $actividad = actividadDeLaUnidad(['estado' => EstadoActividad::Enviada]);

    actingAs($this->validador)
        ->patch(route('actividades.observar', $actividad))
        ->assertSessionHasErrors('comentario');

    actingAs($this->validador)
        ->patch(route('actividades.observar', $actividad), ['comentario' => 'Falta el detalle del público objetivo.'])
        ->assertRedirect();

    $actividad->refresh();

    expect($actividad->estado)->toBe(EstadoActividad::Observada)
        ->and($actividad->revisiones->first()->comentario)->toContain('público objetivo');

    // Observada vuelve a ser editable y se puede reenviar.
    actingAs($this->coordinador)->patch(route('actividades.enviar', $actividad))->assertRedirect();
    expect($actividad->refresh()->estado)->toBe(EstadoActividad::Enviada);
});

test('rechazar cierra el ciclo y libera el espacio', function () {
    $espacio = Espacio::factory()->create();
    $actividad = actividadDeLaUnidad(['espacio_id' => $espacio->id, 'estado' => EstadoActividad::Enviada]);
    $reserva = SolicitudEspacio::factory()->create([
        'espacio_id' => $espacio->id,
        'actividad_id' => $actividad->id,
    ]);

    actingAs($this->validador)
        ->patch(route('actividades.rechazar', $actividad), ['comentario' => 'No corresponde a la línea de acción.'])
        ->assertRedirect();

    expect($actividad->refresh()->estado)->toBe(EstadoActividad::Rechazada)
        ->and($reserva->refresh()->estado)->toBe(EstadoSolicitud::Cancelada);
});

test('un coordinador no puede validar sus propias actividades', function () {
    $actividad = actividadDeLaUnidad(['estado' => EstadoActividad::Enviada]);

    actingAs($this->coordinador)->patch(route('actividades.validar', $actividad))->assertForbidden();

    expect($actividad->refresh()->estado)->toBe(EstadoActividad::Enviada);
});

test('reprogramar guarda la fecha anterior y mueve la reserva', function () {
    $espacio = Espacio::factory()->create();
    $actividad = actividadDeLaUnidad([
        'espacio_id' => $espacio->id,
        'lugar_externo' => null,
        'estado' => EstadoActividad::Validada,
    ]);
    $reserva = SolicitudEspacio::factory()->aprobada()
        ->enHorario($actividad->fecha->toDateString(), $actividad->hora_inicio, $actividad->hora_fin)
        ->create(['espacio_id' => $espacio->id, 'actividad_id' => $actividad->id]);

    $fechaAnterior = $actividad->fecha->toDateString();
    $fechaNueva = Carbon::parse($fechaAnterior)->addWeek()->toDateString();

    actingAs($this->coordinador)
        ->patch(route('actividades.reprogramar', $actividad), [
            'fecha' => $fechaNueva,
            'hora_inicio' => '14:00',
            'hora_fin' => '16:00',
            'motivo' => 'Cruce con un acto institucional',
        ])
        ->assertSessionHasNoErrors();

    $actividad->refresh();

    expect($actividad->estado)->toBe(EstadoActividad::Reprogramada)
        ->and($actividad->fecha->toDateString())->toBe($fechaNueva)
        ->and($actividad->reprogramaciones)->toHaveCount(1)
        ->and($actividad->reprogramaciones->first()->fecha_anterior->toDateString())->toBe($fechaAnterior)
        ->and($reserva->refresh()->fecha->toDateString())->toBe($fechaNueva)
        ->and($reserva->horaInicioCorta())->toBe('14:00');
});

test('cancelar exige motivo y libera el espacio', function () {
    $espacio = Espacio::factory()->create();
    $actividad = actividadDeLaUnidad(['espacio_id' => $espacio->id, 'estado' => EstadoActividad::Validada]);
    $reserva = SolicitudEspacio::factory()->aprobada()->create([
        'espacio_id' => $espacio->id,
        'actividad_id' => $actividad->id,
    ]);

    actingAs($this->coordinador)
        ->patch(route('actividades.cancelar', $actividad))
        ->assertSessionHasErrors('motivo');

    actingAs($this->coordinador)
        ->patch(route('actividades.cancelar', $actividad), ['motivo' => 'Suspendida por lluvia'])
        ->assertRedirect();

    expect($actividad->refresh()->estado)->toBe(EstadoActividad::Cancelada)
        ->and($actividad->motivo_cancelacion)->toBe('Suspendida por lluvia')
        ->and($reserva->refresh()->estado)->toBe(EstadoSolicitud::Cancelada);
});

test('no se cierra una actividad que no está en ejecución', function () {
    $actividad = actividadDeLaUnidad(['estado' => EstadoActividad::Validada]);

    actingAs($this->coordinador)
        ->post(route('actividades.cierre.store', $actividad), ['resultados' => 'Resultados del taller'])
        ->assertSessionHasErrors('estado');

    expect($actividad->refresh()->estado)->toBe(EstadoActividad::Validada);
});

test('el cierre exige resultados', function () {
    $actividad = actividadDeLaUnidad(['estado' => EstadoActividad::EnEjecucion]);

    actingAs($this->coordinador)
        ->post(route('actividades.cierre.store', $actividad), [])
        ->assertSessionHasErrors('resultados');
});

test('el cierre guarda resultados, beneficiarios, participantes, indicadores y evidencias', function () {
    Storage::fake('public');

    $indicador = Indicador::factory()->create();
    $persona = PersonaRecursoHumano::factory()->create();
    $actividad = actividadDeLaUnidad(['estado' => EstadoActividad::EnEjecucion]);
    $actividad->indicadores()->attach($indicador->id, ['valor_meta' => 100]);

    actingAs($this->coordinador)
        ->post(route('actividades.cierre.store', $actividad), [
            'resultados' => 'Se capacitó a 120 personas de la comunidad.',
            'beneficiarios' => [
                ['sexo' => SexoBeneficiario::Mujer->value, 'rango_edad' => RangoEdad::Juventud->value, 'cantidad' => 70],
                ['sexo' => SexoBeneficiario::Hombre->value, 'rango_edad' => RangoEdad::Juventud->value, 'cantidad' => 50],
            ],
            'participantes' => [
                ['persona_recurso_humano_id' => $persona->id, 'rol' => 'Instructor'],
                ['nombre_externo' => 'Invitado externo', 'rol' => 'Ponente'],
            ],
            'indicadores' => [['indicador_id' => $indicador->id, 'valor_alcanzado' => 120]],
            'archivos' => [UploadedFile::fake()->image('evidencia.jpg')],
            'enlaces' => [['url' => 'https://ejemplo.org/nota', 'descripcion' => 'Nota de prensa']],
        ])
        ->assertSessionHasNoErrors();

    $actividad->refresh()->load(['beneficiarios', 'participantes', 'indicadores', 'evidencias']);

    expect($actividad->estado)->toBe(EstadoActividad::Cerrada)
        ->and($actividad->fecha_cierre)->not->toBeNull()
        ->and($actividad->beneficiarios_total)->toBe(120)
        ->and($actividad->participantes)->toHaveCount(2)
        ->and((float) $actividad->indicadores->first()->pivot->valor_alcanzado)->toBe(120.0)
        ->and($actividad->evidencias)->toHaveCount(2)
        ->and($actividad->evidencias->pluck('tipo')->all())
        ->toBe([TipoEvidencia::Fotografia, TipoEvidencia::Enlace]);
});

test('iniciar la ejecución solo procede desde una actividad aprobada', function () {
    $borrador = actividadDeLaUnidad();

    actingAs($this->coordinador)
        ->patch(route('actividades.iniciar', $borrador))
        ->assertSessionHasErrors('estado');

    $validada = actividadDeLaUnidad(['estado' => EstadoActividad::Validada]);

    actingAs($this->coordinador)->patch(route('actividades.iniciar', $validada))->assertRedirect();

    expect($validada->refresh()->estado)->toBe(EstadoActividad::EnEjecucion);
});
