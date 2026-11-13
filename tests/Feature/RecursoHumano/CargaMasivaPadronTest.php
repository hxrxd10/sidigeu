<?php

use App\Enums\Rol;
use App\Enums\TipoPersona;
use App\Models\Disciplina;
use App\Models\Pais;
use App\Models\PersonaRecursoHumano;
use App\Models\User;
use Illuminate\Http\UploadedFile;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

beforeEach(function () {
    $this->gestor = User::factory()->conRoles(Rol::GestorRecursoHumano)->create();
    $this->guatemala = Pais::factory()->guatemala()->create();
    $this->danza = Disciplina::factory()->deTipo(TipoPersona::Artista)->create(['nombre' => 'Danza']);
    $this->futbol = Disciplina::factory()->deTipo(TipoPersona::Deportista)->create(['nombre' => 'Fútbol']);
});

/**
 * Arma un CSV con los encabezados de la plantilla y las filas indicadas.
 *
 * @param  array<int, array<int, string>>  $filas
 */
function archivoDelPadron(array $filas): UploadedFile
{
    $encabezados = 'Tipo *,Nombres *,Apellidos *,Disciplina *,Agrupación,País *,'
        .'Fecha de nacimiento *,DPI,Pasaporte,Fecha de alta *';

    $lineas = collect($filas)->map(
        fn (array $fila): string => implode(',', array_map(
            fn (string $valor): string => '"'.$valor.'"',
            $fila,
        ))
    )->prepend($encabezados)->implode("\n");

    return UploadedFile::fake()->createWithContent('padron.csv', $lineas."\n");
}

test('solo quien gestiona el padrón entra a la carga masiva', function () {
    actingAs(User::factory()->conRoles(Rol::Consulta)->create())
        ->get(route('recurso-humano.carga-masiva.create'))
        ->assertForbidden();

    actingAs($this->gestor)
        ->get(route('recurso-humano.carga-masiva.create'))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->component('recurso-humano/carga-masiva')
            ->has('columnas', 10)
            ->where('listas.Disciplinas', ['Danza', 'Fútbol']));
});

test('la plantilla se descarga como libro de Excel con listas desplegables', function () {
    $respuesta = actingAs($this->gestor)
        ->get(route('recurso-humano.carga-masiva.plantilla'))
        ->assertOk()
        ->assertHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    $ruta = tempnam(sys_get_temp_dir(), 'plantilla-');
    file_put_contents($ruta, $respuesta->getContent());

    $zip = new ZipArchive;
    $zip->open($ruta);

    expect($zip->getFromName('xl/worksheets/sheet1.xml'))->toContain('<dataValidation type="list"')
        ->and($zip->getFromName('xl/worksheets/sheet3.xml'))->toContain('Danza')
        ->and($zip->getFromName('xl/workbook.xml'))->toContain('name="Disciplinas"');
});

test('la plantilla también se descarga como CSV', function () {
    actingAs($this->gestor)
        ->get(route('recurso-humano.carga-masiva.plantilla-csv'))
        ->assertOk()
        ->assertHeader('Content-Type', 'text/csv; charset=utf-8')
        ->assertSee('Fecha de nacimiento *', false);
});

test('la revisión marca la fila válida y no guarda nada', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([
                ['Artista', 'María José', 'Ramírez', 'Danza', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen', ['total' => 1, 'validas' => 1, 'conError' => 0])
            ->where('revision.filas.0.numero', 2)
            ->has('revision.token'));

    expect(PersonaRecursoHumano::query()->count())->toBe(0);
});

test('la carga se confirma con el token de la revisión', function () {
    $revision = actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([
                ['Artista', 'María José', 'Ramírez', 'Danza', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
                ['Deportista', 'Carlos', 'Pérez', 'Fútbol', '', 'Guatemala', '20-08-1999', '2345678901012', '', '01-02-2026'],
            ]),
        ]);

    $token = $revision->viewData('page')['props']['revision']['token'];

    actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.store'), ['token' => $token])
        ->assertRedirect(route('recurso-humano.index'));

    expect(PersonaRecursoHumano::query()->count())->toBe(2);

    assertDatabaseHas('personas_recurso_humano', [
        'nombres' => 'María José',
        'apellidos' => 'Ramírez',
        'disciplina_id' => $this->danza->id,
        'activo' => true,
    ]);

    // El alta abre el primer período de permanencia, igual que en el formulario.
    expect(PersonaRecursoHumano::query()->firstOrFail()->periodos()->count())->toBe(1);
});

test('la revisión explica el error de cada fila', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([
                // Disciplina que no existe en el catálogo.
                ['Artista', 'Ana', 'López', 'Alfarería', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
                // Guatemalteca sin DPI.
                ['Artista', 'Sofía', 'Gómez', 'Danza', '', 'Guatemala', '14-05-2001', '', '', '01-02-2026'],
                // Disciplina deportiva para un artista.
                ['Artista', 'Luis', 'Castillo', 'Fútbol', '', 'Guatemala', '14-05-2001', '3456789010123', '', '01-02-2026'],
                // Fecha que no se entiende.
                ['Artista', 'Iván', 'Mejía', 'Danza', '', 'Guatemala', 'el año pasado', '4567890101234', '', '01-02-2026'],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen.validas', 0)
            ->where('revision.resumen.conError', 4)
            ->where('revision.filas.0.errores.0', 'Disciplina: «Alfarería» no está en el catálogo.')
            ->where('revision.filas.1.errores.1', 'DPI: es obligatorio para las personas guatemaltecas.')
            ->where('revision.filas.2.errores.0', 'Disciplina: «Fútbol» no corresponde a un artista.')
            ->where('revision.filas.3.errores.0', 'Fecha de nacimiento: «el año pasado» no es una fecha válida (use dd-mm-aaaa).'));
});

test('un DPI repetido dentro del archivo se rechaza', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([
                ['Artista', 'Ana', 'López', 'Danza', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
                ['Artista', 'Otra', 'Persona', 'Danza', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen', ['total' => 2, 'validas' => 1, 'conError' => 1])
            ->where('revision.filas.1.errores.0', 'DPI: «1234567890101» ya viene en otra fila de este archivo.'));
});

test('un DPI que ya está en el padrón se rechaza', function () {
    PersonaRecursoHumano::factory()->artista()->create(['dpi' => '1234567890101']);

    actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([
                ['Artista', 'Ana', 'López', 'Danza', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina->where('revision.resumen.conError', 1));
});

test('el token de otro usuario no sirve', function () {
    $revision = actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([
                ['Artista', 'María José', 'Ramírez', 'Danza', '', 'Guatemala', '14-05-2001', '1234567890101', '', '01-02-2026'],
            ]),
        ]);

    $token = $revision->viewData('page')['props']['revision']['token'];

    actingAs(User::factory()->conRoles(Rol::GestorRecursoHumano)->create())
        ->post(route('recurso-humano.carga-masiva.store'), ['token' => $token])
        ->assertSessionHasErrors('archivo');

    expect(PersonaRecursoHumano::query()->count())->toBe(0);
});

test('un archivo sin filas de datos se rechaza', function () {
    actingAs($this->gestor)
        ->post(route('recurso-humano.carga-masiva.revision'), [
            'archivo' => archivoDelPadron([]),
        ])
        ->assertSessionHasErrors('archivo');
});
