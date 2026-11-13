<?php

use App\Enums\Rol;
use App\Enums\TipoPersona;
use App\Models\Disciplina;
use App\Models\Pais;
use App\Models\PersonaRecursoHumano;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->gestor = User::factory()->conRoles(Rol::GestorRecursoHumano)->create();
    $this->guatemala = Pais::factory()->guatemala()->create();
    $this->disciplina = Disciplina::factory()->deTipo(TipoPersona::Artista)->create(['nombre' => 'Marimba']);
});

/**
 * @return array<string, mixed>
 */
function datosPersona(array $extra = []): array
{
    return [
        'tipo' => TipoPersona::Artista->value,
        'disciplina_id' => test()->disciplina->id,
        'nombres' => 'Luis Fernando',
        'apellidos' => 'Pérez García',
        'pais_id' => test()->guatemala->id,
        'fecha_nacimiento' => '1995-04-18',
        'dpi' => '1234567890101',
        'fecha_alta' => Carbon::today()->subYear()->toDateString(),
        ...$extra,
    ];
}

test('el gestor registra a una persona y le abre su primer período', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona())
        ->assertSessionHasNoErrors();

    $persona = PersonaRecursoHumano::sole();

    expect($persona->nombre_completo)->toBe('Luis Fernando Pérez García')
        ->and($persona->activo)->toBeTrue()
        ->and($persona->periodos)->toHaveCount(1)
        ->and($persona->periodos->first()->fecha_baja)->toBeNull();
});

test('una persona guatemalteca necesita DPI', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona(['dpi' => null]))
        ->assertSessionHasErrors('dpi');
});

test('el DPI debe tener trece dígitos y no repetirse', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona(['dpi' => '123']))
        ->assertSessionHasErrors('dpi');

    PersonaRecursoHumano::factory()->create(['dpi' => '1234567890101']);

    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona())
        ->assertSessionHasErrors('dpi');
});

test('una persona extranjera se identifica con pasaporte', function () {
    $mexico = Pais::factory()->create(['nombre' => 'México', 'codigo' => 'MX']);

    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona([
            'pais_id' => $mexico->id,
            'dpi' => null,
            'pasaporte' => 'MX998877',
        ]))
        ->assertSessionHasNoErrors();

    expect(PersonaRecursoHumano::sole()->pasaporte)->toBe('MX998877');
});

test('sin ningún documento no se puede registrar', function () {
    $mexico = Pais::factory()->create(['nombre' => 'México', 'codigo' => 'MX']);

    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona([
            'pais_id' => $mexico->id,
            'dpi' => null,
            'pasaporte' => null,
        ]))
        ->assertSessionHasErrors('dpi');
});

test('la disciplina debe corresponder al tipo de persona', function () {
    $deportiva = Disciplina::factory()->deTipo(TipoPersona::Deportista)->create();

    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona(['disciplina_id' => $deportiva->id]))
        ->assertSessionHasErrors('disciplina_id');
});

test('la fecha de alta no puede ser anterior al nacimiento', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona([
            'fecha_nacimiento' => '2000-01-01',
            'fecha_alta' => '1999-01-01',
        ]))
        ->assertSessionHasErrors('fecha_alta');
});

test('la fotografía se guarda en el disco público', function () {
    Storage::fake('public');

    actingAs($this->gestor)
        ->post(route('recurso-humano.store'), datosPersona([
            'foto' => UploadedFile::fake()->image('retrato.jpg'),
        ]))
        ->assertSessionHasNoErrors();

    $ruta = PersonaRecursoHumano::sole()->foto_ruta;

    expect($ruta)->not->toBeNull();
    Storage::disk('public')->assertExists($ruta);
});

test('un usuario sin el rol de gestor consulta el padrón pero no lo modifica', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();
    $persona = PersonaRecursoHumano::factory()->create();

    actingAs($consulta)->get(route('recurso-humano.index'))->assertOk();
    actingAs($consulta)->get(route('recurso-humano.show', $persona))->assertOk();
    actingAs($consulta)->get(route('recurso-humano.create'))->assertForbidden();
    actingAs($consulta)->post(route('recurso-humano.store'), datosPersona())->assertForbidden();
    actingAs($consulta)->delete(route('recurso-humano.destroy', $persona))->assertForbidden();
});

test('la búsqueda encuentra por apellido y el filtro por tipo separa los padrones', function () {
    PersonaRecursoHumano::factory()->artista()->create(['apellidos' => 'Monterroso']);
    PersonaRecursoHumano::factory()->deportista()->create(['apellidos' => 'Ramírez']);

    actingAs($this->gestor)
        ->get(route('recurso-humano.index', ['busqueda' => 'Monterroso']))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('personas.data', 1)
            ->where('personas.data.0.apellidos', 'Monterroso'));

    actingAs($this->gestor)
        ->get(route('recurso-humano.index', ['tipo' => TipoPersona::Deportista->value]))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('personas.data', 1)
            ->where('personas.data.0.apellidos', 'Ramírez'));
});

test('eliminar una persona la retira del padrón sin borrarla de la base', function () {
    $persona = PersonaRecursoHumano::factory()->create();

    actingAs($this->gestor)
        ->delete(route('recurso-humano.destroy', $persona))
        ->assertRedirect(route('recurso-humano.index'));

    expect($persona->refresh()->trashed())->toBeTrue()
        ->and(PersonaRecursoHumano::count())->toBe(0);
});
