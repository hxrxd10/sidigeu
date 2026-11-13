<?php

use App\Enums\Rol;
use App\Enums\TipoPersona;
use App\Models\Agrupacion;
use App\Models\Area;
use App\Models\Disciplina;
use App\Models\PersonaRecursoHumano;
use App\Models\Unidad;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->administrador = User::factory()->conRoles(Rol::Administrador)->create();
});

test('cualquier usuario interno consulta los catálogos', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();

    actingAs($consulta)->get(route('catalogos.index'))->assertOk();
    actingAs($consulta)->get(route('catalogos.show', 'disciplinas'))->assertOk();
});

test('solo el administrador agrega valores a un catálogo', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();

    actingAs($consulta)
        ->post(route('catalogos.store', 'agrupaciones'), ['nombre' => 'Coro universitario'])
        ->assertForbidden();

    actingAs($this->administrador)
        ->post(route('catalogos.store', 'agrupaciones'), ['nombre' => 'Coro universitario', 'activo' => true])
        ->assertRedirect(route('catalogos.show', 'agrupaciones'));

    expect(Agrupacion::where('nombre', 'Coro universitario')->exists())->toBeTrue();
});

test('una disciplina puede repetir nombre solo si cambia el tipo', function () {
    Disciplina::factory()->create(['nombre' => 'Ajedrez', 'tipo' => TipoPersona::Deportista]);

    actingAs($this->administrador)
        ->post(route('catalogos.store', 'disciplinas'), [
            'nombre' => 'Ajedrez',
            'tipo' => TipoPersona::Deportista->value,
        ])
        ->assertSessionHasErrors('nombre');

    actingAs($this->administrador)
        ->post(route('catalogos.store', 'disciplinas'), [
            'nombre' => 'Ajedrez',
            'tipo' => TipoPersona::Artista->value,
        ])
        ->assertSessionHasNoErrors();

    expect(Disciplina::where('nombre', 'Ajedrez')->count())->toBe(2);
});

test('editar un valor del catálogo conserva su identificador', function () {
    $area = Area::factory()->create(['nombre' => 'Cultura', 'slug' => 'cultura']);

    actingAs($this->administrador)
        ->put(route('catalogos.update', ['catalogo' => 'areas', 'registro' => $area->id]), [
            'nombre' => 'Cultura y arte',
            'slug' => 'cultura',
            'activo' => true,
        ])
        ->assertSessionHasNoErrors();

    expect($area->refresh()->nombre)->toBe('Cultura y arte');
});

test('un valor en uso se desactiva en lugar de eliminarse', function () {
    $disciplina = Disciplina::factory()->create(['tipo' => TipoPersona::Artista]);
    PersonaRecursoHumano::factory()->create([
        'tipo' => TipoPersona::Artista,
        'disciplina_id' => $disciplina->id,
    ]);

    actingAs($this->administrador)
        ->delete(route('catalogos.destroy', ['catalogo' => 'disciplinas', 'registro' => $disciplina->id]))
        ->assertRedirect();

    $disciplina->refresh();

    expect($disciplina->exists)->toBeTrue()
        ->and($disciplina->activo)->toBeFalse()
        ->and($disciplina->trashed())->toBeFalse();
});

test('un valor sin uso sí se elimina', function () {
    $unidad = Unidad::factory()->create();

    actingAs($this->administrador)
        ->delete(route('catalogos.destroy', ['catalogo' => 'unidades', 'registro' => $unidad->id]))
        ->assertRedirect();

    expect($unidad->refresh()->trashed())->toBeTrue();
});
