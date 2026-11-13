<?php

use App\Enums\Rol;
use App\Enums\TipoPersona;
use App\Models\PersonaRecursoHumano;
use App\Models\User;
use Illuminate\Support\Carbon;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->gestor = User::factory()->conRoles(Rol::GestorRecursoHumano)->create();
});

test('el reporte resume activos, inactivos y la distribución por tipo', function () {
    PersonaRecursoHumano::factory()->artista()->count(2)->create();
    PersonaRecursoHumano::factory()->deportista()->create();
    PersonaRecursoHumano::factory()->deportista()->inactiva()->create();

    actingAs($this->gestor)
        ->get(route('recurso-humano.reportes'))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('resumen.total', 4)
            ->where('resumen.activos', 3)
            ->where('resumen.inactivos', 1)
            ->where('porTipo.0.etiqueta', TipoPersona::Artista->plural())
            ->where('porTipo.0.total', 2)
            ->where('porTipo.1.total', 2));
});

test('el reporte clasifica por rango de edad', function () {
    PersonaRecursoHumano::factory()->create([
        'fecha_nacimiento' => Carbon::today()->subYears(20)->toDateString(),
    ]);
    PersonaRecursoHumano::factory()->create([
        'fecha_nacimiento' => Carbon::today()->subYears(60)->toDateString(),
    ]);

    actingAs($this->gestor)
        ->get(route('recurso-humano.reportes'))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('porRangoEdad.1.etiqueta', 'De 18 a 25')
            ->where('porRangoEdad.1.total', 1)
            ->where('porRangoEdad.4.etiqueta', 'Mayores de 50')
            ->where('porRangoEdad.4.total', 1));
});

test('la exportación entrega el padrón en CSV', function () {
    PersonaRecursoHumano::factory()->create([
        'nombres' => 'Marta',
        'apellidos' => 'Hernández',
    ]);

    $respuesta = actingAs($this->gestor)->get(route('recurso-humano.reportes.exportar'));

    $respuesta->assertOk()
        ->assertHeader('content-type', 'text/csv; charset=UTF-8');

    $contenido = $respuesta->streamedContent();

    expect($contenido)->toContain('Hernández')
        ->and($contenido)->toContain('Nacionalidad');
});

test('la exportación oculta los documentos a los roles no autorizados', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();
    PersonaRecursoHumano::factory()->create(['dpi' => '2987654321101']);

    $contenido = actingAs($consulta)
        ->get(route('recurso-humano.reportes.exportar'))
        ->streamedContent();

    expect($contenido)->not->toContain('2987654321101')
        ->and($contenido)->not->toContain('DPI');
});
