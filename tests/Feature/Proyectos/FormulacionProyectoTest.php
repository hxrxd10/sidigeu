<?php

use App\Enums\EstadoProyecto;
use App\Enums\Rol;
use App\Models\FuenteFinanciamiento;
use App\Models\Indicador;
use App\Models\Proyecto;
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
});

function proyectoDeLaUnidad(array $extra = []): Proyecto
{
    return Proyecto::factory()->create(['unidad_id' => test()->unidad->id, ...$extra]);
}

test('el coordinador registra un proyecto en su unidad', function () {
    actingAs($this->coordinador)
        ->post(route('proyectos.store'), [
            'nombre' => 'Escuela de marimba comunitaria',
            'objetivo_general' => 'Formar nuevas generaciones de ejecutantes de marimba.',
            'justificacion' => 'La marimba es patrimonio cultural de la nación.',
            'fecha_inicio' => Carbon::today()->toDateString(),
            'fecha_fin' => Carbon::today()->addMonths(6)->toDateString(),
        ])
        ->assertSessionHasNoErrors();

    $proyecto = Proyecto::sole();

    expect($proyecto->estado)->toBe(EstadoProyecto::Registrado)
        ->and($proyecto->unidad_id)->toBe($this->unidad->id)
        ->and($proyecto->creado_por)->toBe($this->coordinador->id);
});

test('el objetivo general es obligatorio y la fecha fin no puede ser anterior al inicio', function () {
    actingAs($this->coordinador)
        ->post(route('proyectos.store'), ['nombre' => 'Sin objetivo'])
        ->assertSessionHasErrors('objetivo_general');

    actingAs($this->coordinador)
        ->post(route('proyectos.store'), [
            'nombre' => 'Fechas invertidas',
            'objetivo_general' => 'Objetivo',
            'fecha_inicio' => Carbon::today()->toDateString(),
            'fecha_fin' => Carbon::today()->subMonth()->toDateString(),
        ])
        ->assertSessionHasErrors('fecha_fin');
});

test('la formulación guarda objetivos, beneficiarios, cronograma, presupuesto e indicadores', function () {
    $proyecto = proyectoDeLaUnidad();
    $indicador = Indicador::factory()->create();
    $fuente = FuenteFinanciamiento::factory()->create();

    actingAs($this->coordinador)
        ->post(route('proyectos.formulacion.store', $proyecto), [
            'objetivos' => [
                ['descripcion' => 'Formar a 40 estudiantes'],
                ['descripcion' => 'Montar un repertorio de 10 piezas'],
                ['descripcion' => ''],
            ],
            'beneficiarios' => [
                ['tipo' => 'Estudiantes', 'cantidad' => 40, 'descripcion' => 'De nivel medio'],
            ],
            'cronograma' => [
                ['tarea' => 'Convocatoria', 'fecha_inicio' => Carbon::today()->toDateString(), 'avance' => 100],
                ['tarea' => 'Clases semanales', 'avance' => 20],
            ],
            'presupuesto' => [
                [
                    'descripcion' => 'Instrumentos',
                    'cantidad' => 2,
                    'costo_unitario' => 7500,
                    'fuente_financiamiento_id' => $fuente->id,
                ],
            ],
            'indicadores' => [
                ['indicador_id' => $indicador->id, 'linea_base' => 0, 'meta' => 40],
            ],
        ])
        ->assertSessionHasNoErrors();

    $proyecto->refresh()->load(['objetivos', 'beneficiarios', 'cronograma', 'presupuesto', 'indicadores']);

    expect($proyecto->estado)->toBe(EstadoProyecto::EnFormulacion)
        ->and($proyecto->objetivos)->toHaveCount(2)
        ->and($proyecto->beneficiarios->first()->cantidad)->toBe(40)
        ->and($proyecto->cronograma)->toHaveCount(2)
        ->and($proyecto->presupuesto_total)->toBe(15000.0)
        ->and($proyecto->avance_fisico)->toBe(60)
        ->and((float) $proyecto->indicadores->first()->detalleProyecto->meta)->toBe(40.0);
});

test('un indicador sin meta no se asocia al proyecto', function () {
    $proyecto = proyectoDeLaUnidad();
    $indicador = Indicador::factory()->create();

    actingAs($this->coordinador)
        ->post(route('proyectos.formulacion.store', $proyecto), [
            'indicadores' => [['indicador_id' => $indicador->id, 'meta' => null]],
        ])
        ->assertSessionHasNoErrors();

    expect($proyecto->load('indicadores')->indicadores)->toHaveCount(0);
});

test('la formulación se cierra cuando el proyecto ya fue aprobado', function () {
    $proyecto = proyectoDeLaUnidad(['estado' => EstadoProyecto::Aprobado]);

    actingAs($this->coordinador)
        ->get(route('proyectos.formulacion.edit', $proyecto))
        ->assertForbidden();

    actingAs($this->coordinador)
        ->get(route('proyectos.edit', $proyecto))
        ->assertForbidden();
});

test('un coordinador no toca los proyectos de otra unidad', function () {
    $ajeno = Proyecto::factory()->create(['unidad_id' => Unidad::factory()->create()->id]);

    actingAs($this->coordinador)->get(route('proyectos.show', $ajeno))->assertForbidden();
    actingAs($this->coordinador)->get(route('proyectos.edit', $ajeno))->assertForbidden();
});

test('el histórico filtra por estado y por unidad', function () {
    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $otraUnidad = Unidad::factory()->create();

    proyectoDeLaUnidad(['nombre' => 'Cerrado de cultura', 'estado' => EstadoProyecto::Cerrado]);
    proyectoDeLaUnidad(['nombre' => 'En ejecución de cultura', 'estado' => EstadoProyecto::EnEjecucion]);
    Proyecto::factory()->create(['unidad_id' => $otraUnidad->id, 'estado' => EstadoProyecto::Cerrado]);

    actingAs($direccion)
        ->get(route('proyectos.index', ['estado' => EstadoProyecto::Cerrado->value]))
        ->assertInertia(fn ($pagina) => $pagina->has('proyectos.data', 2));

    actingAs($direccion)
        ->get(route('proyectos.index', ['unidad_id' => $this->unidad->id]))
        ->assertInertia(fn ($pagina) => $pagina->has('proyectos.data', 2));

    actingAs($this->coordinador)
        ->get(route('proyectos.index'))
        ->assertInertia(fn ($pagina) => $pagina->has('proyectos.data', 2));
});

test('solo se elimina un proyecto recién registrado', function () {
    $proyecto = proyectoDeLaUnidad();

    actingAs($this->coordinador)
        ->delete(route('proyectos.destroy', $proyecto))
        ->assertRedirect(route('proyectos.index'));

    expect($proyecto->refresh()->trashed())->toBeTrue();

    $enRevision = proyectoDeLaUnidad(['estado' => EstadoProyecto::EnRevision]);

    actingAs($this->coordinador)
        ->delete(route('proyectos.destroy', $enRevision))
        ->assertForbidden();
});
