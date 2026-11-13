<?php

use App\Enums\Rol;
use App\Models\PersonaRecursoHumano;
use App\Models\User;
use Illuminate\Support\Carbon;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->gestor = User::factory()->conRoles(Rol::GestorRecursoHumano)->create();
});

test('dar de baja cierra el período vigente y guarda el motivo', function () {
    $persona = PersonaRecursoHumano::factory()->create([
        'fecha_alta' => Carbon::today()->subYears(3)->toDateString(),
    ]);

    $fechaBaja = Carbon::today()->subMonth()->toDateString();

    actingAs($this->gestor)
        ->post(route('recurso-humano.baja', $persona), [
            'fecha_baja' => $fechaBaja,
            'motivo_baja' => 'Finalizó su participación',
        ])
        ->assertSessionHasNoErrors();

    $persona->refresh()->load('periodos');

    expect($persona->activo)->toBeFalse()
        ->and($persona->fecha_baja->toDateString())->toBe($fechaBaja)
        ->and($persona->motivo_baja)->toBe('Finalizó su participación')
        ->and($persona->periodos)->toHaveCount(1)
        ->and($persona->periodos->first()->fecha_baja->toDateString())->toBe($fechaBaja);
});

test('la fecha de baja no puede ser anterior a la de alta', function () {
    $persona = PersonaRecursoHumano::factory()->create([
        'fecha_alta' => Carbon::today()->subMonth()->toDateString(),
    ]);

    actingAs($this->gestor)
        ->post(route('recurso-humano.baja', $persona), [
            'fecha_baja' => Carbon::today()->subYear()->toDateString(),
        ])
        ->assertSessionHasErrors('fecha_baja');

    expect($persona->refresh()->activo)->toBeTrue();
});

test('reactivar limpia la baja y abre un período nuevo', function () {
    $persona = PersonaRecursoHumano::factory()
        ->inactiva(Carbon::today()->subMonths(6)->toDateString())
        ->create(['fecha_alta' => Carbon::today()->subYears(2)->toDateString()]);

    $nuevaAlta = Carbon::today()->subMonth()->toDateString();

    actingAs($this->gestor)
        ->put(route('recurso-humano.reactivar', $persona), ['fecha_alta' => $nuevaAlta])
        ->assertSessionHasNoErrors();

    $persona->refresh()->load('periodos');

    expect($persona->activo)->toBeTrue()
        ->and($persona->fecha_baja)->toBeNull()
        ->and($persona->motivo_baja)->toBeNull()
        ->and($persona->fecha_alta->toDateString())->toBe($nuevaAlta)
        ->and($persona->periodos)->toHaveCount(2)
        ->and($persona->periodos->last()->fecha_baja)->toBeNull();
});

test('la permanencia acumulada suma todos los períodos', function () {
    $persona = PersonaRecursoHumano::factory()->create([
        'fecha_alta' => Carbon::today()->subDays(400)->toDateString(),
    ]);

    actingAs($this->gestor)->post(route('recurso-humano.baja', $persona), [
        'fecha_baja' => Carbon::today()->subDays(300)->toDateString(),
    ]);

    actingAs($this->gestor)->put(route('recurso-humano.reactivar', $persona), [
        'fecha_alta' => Carbon::today()->subDays(50)->toDateString(),
    ]);

    $persona->refresh()->load('periodos');

    // 100 días del primer período más los 50 del período vigente.
    expect($persona->permanenciaTotal()['dias_totales'])->toBe(150)
        ->and($persona->permanencia()['dias_totales'])->toBe(50);
});

test('solo el gestor cambia el estado de una persona', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();
    $persona = PersonaRecursoHumano::factory()->create();

    actingAs($consulta)
        ->post(route('recurso-humano.baja', $persona), [
            'fecha_baja' => Carbon::today()->toDateString(),
        ])
        ->assertForbidden();

    expect($persona->refresh()->activo)->toBeTrue();
});
