<?php

use App\Enums\AccionRevision;
use App\Enums\EstadoActividad;
use App\Enums\EstadoProyecto;
use App\Enums\Rol;
use App\Enums\TipoRecurso;
use App\Models\Actividad;
use App\Models\Indicador;
use App\Models\PersonaRecursoHumano;
use App\Models\Proyecto;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create();
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->enUnidad($this->unidad)->create();
    $this->direccion = User::factory()->conRoles(Rol::Direccion)->create();
});

function proyectoFormulado(array $extra = []): Proyecto
{
    $proyecto = Proyecto::factory()->create(['unidad_id' => test()->unidad->id, ...$extra]);

    $proyecto->objetivos()->create(['descripcion' => 'Objetivo específico', 'orden' => 0]);
    $proyecto->cronograma()->create(['tarea' => 'Primera tarea', 'avance' => 0, 'orden' => 0]);

    return $proyecto;
}

test('no se envía a aprobación un proyecto sin objetivos ni cronograma', function () {
    $proyecto = Proyecto::factory()->create(['unidad_id' => $this->unidad->id]);

    actingAs($this->coordinador)
        ->patch(route('proyectos.enviar', $proyecto))
        ->assertSessionHasErrors('estado');

    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::Registrado);
});

test('el coordinador envía y la dirección aprueba el proyecto', function () {
    $proyecto = proyectoFormulado();

    actingAs($this->coordinador)->patch(route('proyectos.enviar', $proyecto))->assertRedirect();
    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::EnRevision);

    actingAs($this->direccion)->patch(route('proyectos.aprobar', $proyecto))->assertRedirect();
    $proyecto->refresh();

    expect($proyecto->estado)->toBe(EstadoProyecto::Aprobado)
        ->and($proyecto->revisiones->pluck('accion')->all())
        ->toBe([AccionRevision::Validacion, AccionRevision::Envio]);
});

test('observar devuelve el proyecto a la unidad y rechazar lo cierra', function () {
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnRevision]);

    actingAs($this->direccion)
        ->patch(route('proyectos.observar', $proyecto))
        ->assertSessionHasErrors('comentario');

    actingAs($this->direccion)
        ->patch(route('proyectos.observar', $proyecto), ['comentario' => 'Falta detallar el presupuesto.'])
        ->assertRedirect();

    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::Observado)
        ->and($proyecto->motivo_estado)->toContain('presupuesto');

    actingAs($this->coordinador)->patch(route('proyectos.enviar', $proyecto));
    actingAs($this->direccion)
        ->patch(route('proyectos.rechazar', $proyecto), ['comentario' => 'No corresponde al programa.']);

    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::Rechazado);
});

test('un coordinador no aprueba sus propios proyectos', function () {
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnRevision]);

    actingAs($this->coordinador)->patch(route('proyectos.aprobar', $proyecto))->assertForbidden();

    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::EnRevision);
});

test('solo un proyecto aprobado registra avances', function () {
    $registrado = proyectoFormulado();

    actingAs($this->coordinador)
        ->post(route('proyectos.avance.store', $registrado), [
            'fecha' => Carbon::today()->toDateString(),
            'porcentaje' => 20,
            'descripcion' => 'Avance inicial',
        ])
        ->assertSessionHasErrors('estado');

    expect($registrado->refresh()->avances)->toHaveCount(0);
});

test('el avance actualiza cronograma, presupuesto, recursos y evidencias', function () {
    Storage::fake('public');

    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::Aprobado]);
    $tarea = $proyecto->cronograma()->first();
    $renglon = $proyecto->presupuesto()->create([
        'descripcion' => 'Materiales',
        'cantidad' => 10,
        'costo_unitario' => 100,
    ]);
    $persona = PersonaRecursoHumano::factory()->create();

    actingAs($this->coordinador)
        ->post(route('proyectos.avance.store', $proyecto), [
            'fecha' => Carbon::today()->toDateString(),
            'porcentaje' => 45,
            'descripcion' => 'Se completó la convocatoria y arrancaron las clases.',
            'tareas' => [['id' => $tarea->id, 'avance' => 60]],
            'renglones' => [['id' => $renglon->id, 'ejecutado' => 400]],
            'recursos' => [
                ['tipo' => TipoRecurso::Humano->value, 'persona_recurso_humano_id' => $persona->id, 'cantidad' => 1, 'costo' => 0],
                ['tipo' => TipoRecurso::Material->value, 'descripcion' => 'Instrumentos prestados', 'cantidad' => 2, 'costo' => 0],
            ],
            'archivos' => [UploadedFile::fake()->image('avance.jpg')],
            'enlaces' => [['url' => 'https://ejemplo.org/galeria', 'descripcion' => 'Galería']],
        ])
        ->assertSessionHasNoErrors();

    $proyecto->refresh()->load(['avances.evidencias', 'cronograma', 'presupuesto', 'recursos']);

    expect($proyecto->estado)->toBe(EstadoProyecto::EnEjecucion)
        ->and($proyecto->avances)->toHaveCount(1)
        ->and($proyecto->avances->first()->evidencias)->toHaveCount(2)
        ->and($proyecto->cronograma->first()->avance)->toBe(60)
        ->and($proyecto->avance_fisico)->toBe(60)
        ->and($proyecto->presupuesto_ejecutado)->toBe(400.0)
        ->and($proyecto->presupuesto_total)->toBe(1000.0)
        ->and($proyecto->recursos)->toHaveCount(2);
});

test('el tablero muestra el avance físico y el financiero', function () {
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion]);
    $proyecto->cronograma()->first()->update(['avance' => 50]);
    $proyecto->presupuesto()->create([
        'descripcion' => 'Transporte',
        'cantidad' => 1,
        'costo_unitario' => 2000,
        'ejecutado' => 500,
    ]);

    actingAs($this->coordinador)
        ->get(route('proyectos.show', $proyecto))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('proyecto.seguimiento.avance_fisico', 50)
            ->where('proyecto.seguimiento.presupuesto_total', 2000)
            ->where('proyecto.seguimiento.presupuesto_ejecutado', 500)
            ->where('proyecto.seguimiento.avance_financiero', 25));
});

test('el cierre exige resultados y guarda los valores finales', function () {
    Storage::fake('public');

    $indicador = Indicador::factory()->create();
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion]);
    $proyecto->indicadores()->attach($indicador->id, ['meta' => 100]);

    actingAs($this->coordinador)
        ->post(route('proyectos.cierre.store', $proyecto), [])
        ->assertSessionHasErrors('resultados');

    actingAs($this->coordinador)
        ->post(route('proyectos.cierre.store', $proyecto), [
            'resultados' => 'Se formó a 45 estudiantes.',
            'productos' => 'Repertorio grabado y memoria del proyecto.',
            'lecciones_aprendidas' => 'Conviene iniciar la convocatoria un mes antes.',
            'indicadores' => [['indicador_id' => $indicador->id, 'valor_final' => 45]],
            'archivos' => [UploadedFile::fake()->create('memoria.pdf', 100, 'application/pdf')],
        ])
        ->assertSessionHasNoErrors();

    $proyecto->refresh()->load(['indicadores', 'evidencias']);

    expect($proyecto->estado)->toBe(EstadoProyecto::Cerrado)
        ->and($proyecto->fecha_cierre)->not->toBeNull()
        ->and((float) $proyecto->indicadores->first()->detalleProyecto->valor_final)->toBe(45.0)
        ->and($proyecto->evidencias)->toHaveCount(1);
});

test('suspender y cancelar exigen motivo', function () {
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion]);

    actingAs($this->coordinador)
        ->patch(route('proyectos.suspender', $proyecto))
        ->assertSessionHasErrors('motivo');

    actingAs($this->coordinador)
        ->patch(route('proyectos.suspender', $proyecto), ['motivo' => 'Falta de presupuesto'])
        ->assertRedirect();

    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::Suspendido);

    actingAs($this->coordinador)
        ->patch(route('proyectos.cancelar', $proyecto), ['motivo' => 'No se consiguió financiamiento'])
        ->assertRedirect();

    expect($proyecto->refresh()->estado)->toBe(EstadoProyecto::Cancelado);
});

test('vincular actividades suma sus resultados al proyecto', function () {
    $indicador = Indicador::factory()->create();
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion]);
    $proyecto->indicadores()->attach($indicador->id, ['meta' => 200]);

    $actividad = Actividad::factory()->cerrada()->create(['unidad_id' => $this->unidad->id]);
    $actividad->indicadores()->attach($indicador->id, ['valor_meta' => 50, 'valor_alcanzado' => 80]);
    $actividad->beneficiarios()->create([
        'sexo' => 'mujer',
        'rango_edad' => 'juventud',
        'cantidad' => 30,
    ]);

    actingAs($this->coordinador)
        ->post(route('proyectos.actividades.store', $proyecto), ['actividad_id' => $actividad->id])
        ->assertRedirect();

    expect($actividad->refresh()->proyecto_id)->toBe($proyecto->id);

    actingAs($this->coordinador)
        ->get(route('proyectos.show', $proyecto))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('proyecto.indicadores.0.aporte_actividades', 80)
            ->where('proyecto.seguimiento.beneficiarios_actividades', 30)
            ->where('proyecto.seguimiento.actividades_cerradas', 1));

    actingAs($this->coordinador)
        ->delete(route('proyectos.actividades.destroy', [$proyecto, $actividad]))
        ->assertRedirect();

    expect($actividad->refresh()->proyecto_id)->toBeNull();
});

test('no se vincula una actividad de otra unidad ni de otro proyecto', function () {
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion]);
    $ajena = Actividad::factory()->create(['unidad_id' => Unidad::factory()->create()->id]);

    actingAs($this->coordinador)
        ->post(route('proyectos.actividades.store', $proyecto), ['actividad_id' => $ajena->id])
        ->assertSessionHasErrors('actividad_id');

    $otroProyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion]);
    $tomada = Actividad::factory()->create([
        'unidad_id' => $this->unidad->id,
        'proyecto_id' => $otroProyecto->id,
    ]);

    actingAs($this->coordinador)
        ->post(route('proyectos.actividades.store', $proyecto), ['actividad_id' => $tomada->id])
        ->assertSessionHasErrors('actividad_id');
});

test('el informe del proyecto se descarga en CSV', function () {
    $proyecto = proyectoFormulado(['estado' => EstadoProyecto::EnEjecucion, 'nombre' => 'Escuela de marimba']);
    Actividad::factory()->cerrada()->create([
        'unidad_id' => $this->unidad->id,
        'proyecto_id' => $proyecto->id,
        'nombre' => 'Clase inaugural',
        'estado' => EstadoActividad::Cerrada,
    ]);

    $respuesta = actingAs($this->coordinador)->get(route('proyectos.informe', $proyecto));

    $respuesta->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');

    expect($respuesta->streamedContent())->toContain('Escuela de marimba')
        ->and($respuesta->streamedContent())->toContain('CRONOGRAMA')
        ->and($respuesta->streamedContent())->toContain('Clase inaugural');
});
