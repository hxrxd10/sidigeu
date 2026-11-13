<?php

use App\Enums\Rol;
use App\Models\Actividad;
use App\Models\PersonaRecursoHumano;
use App\Models\Unidad;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create();
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->enUnidad($this->unidad)->create();
});

test('la búsqueda exige iniciar sesión', function () {
    $this->get(route('buscar', ['q' => 'teatro']))->assertRedirect(route('login'));
});

test('con menos de dos letras no se busca', function () {
    actingAs($this->coordinador)
        ->getJson(route('buscar', ['q' => 'a']))
        ->assertOk()
        ->assertExactJson(['grupos' => []]);
});

test('encuentra actividades de la unidad del usuario por nombre', function () {
    Actividad::factory()->create([
        'unidad_id' => $this->unidad->id,
        'nombre' => 'Festival de teatro universitario',
    ]);

    actingAs($this->coordinador)
        ->getJson(route('buscar', ['q' => 'teatro']))
        ->assertOk()
        ->assertJsonPath('grupos.0.titulo', 'Actividades')
        ->assertJsonPath('grupos.0.resultados.0.titulo', 'Festival de teatro universitario');
});

test('no muestra actividades de otra unidad', function () {
    Actividad::factory()->create([
        'unidad_id' => Unidad::factory()->create()->id,
        'nombre' => 'Festival de teatro de otra unidad',
    ]);

    actingAs($this->coordinador)
        ->getJson(route('buscar', ['q' => 'teatro']))
        ->assertOk()
        ->assertJsonMissing(['titulo' => 'Actividades']);
});

test('la dirección busca actividades de todas las unidades', function () {
    Actividad::factory()->create([
        'unidad_id' => Unidad::factory()->create()->id,
        'nombre' => 'Festival de teatro de otra unidad',
    ]);

    actingAs(User::factory()->conRoles(Rol::Direccion)->create())
        ->getJson(route('buscar', ['q' => 'teatro']))
        ->assertOk()
        ->assertJsonPath('grupos.0.resultados.0.titulo', 'Festival de teatro de otra unidad');
});

test('el padrón se busca por nombre y nunca devuelve el documento', function () {
    PersonaRecursoHumano::factory()->artista()->create([
        'nombres' => 'Lucía',
        'apellidos' => 'Marroquín',
        'dpi' => '1234567890101',
    ]);

    $respuesta = actingAs($this->coordinador)
        ->getJson(route('buscar', ['q' => 'Marroquín']))
        ->assertOk()
        ->assertJsonPath('grupos.0.titulo', 'Recurso humano')
        ->assertJsonPath('grupos.0.resultados.0.titulo', 'Lucía Marroquín');

    expect($respuesta->getContent())->not->toContain('1234567890101');

    actingAs($this->coordinador)
        ->getJson(route('buscar', ['q' => '1234567890101']))
        ->assertOk()
        ->assertExactJson(['grupos' => []]);
});

test('solo el administrador encuentra usuarios', function () {
    User::factory()->create(['name' => 'Rodrigo Pineda']);

    actingAs($this->coordinador)
        ->getJson(route('buscar', ['q' => 'Pineda']))
        ->assertOk()
        ->assertJsonMissing(['titulo' => 'Usuarios']);

    actingAs(User::factory()->conRoles(Rol::Administrador)->create())
        ->getJson(route('buscar', ['q' => 'Pineda']))
        ->assertOk()
        ->assertJsonPath('grupos.0.titulo', 'Usuarios');
});
