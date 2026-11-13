<?php

use App\Enums\EstadoActividad;
use App\Enums\EstadoSolicitud;
use App\Enums\Rol;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\LineaAccion;
use App\Models\SolicitudEspacio;
use App\Models\TipoActividad;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\UploadedFile;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create(['nombre' => 'Cultura']);
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)
        ->enUnidad($this->unidad)->create(['name' => 'Ana Coordinadora']);
    $this->tipo = TipoActividad::factory()->create(['nombre' => 'Concierto']);
    $this->linea = LineaAccion::factory()->create(['nombre' => 'Arte y cultura']);
    $this->espacio = Espacio::factory()->create(['nombre' => 'Teatro de Cámara']);
});

/**
 * Arma un CSV con los encabezados de la plantilla y las filas indicadas.
 *
 * @param  array<int, array<int, string>>  $filas
 */
function archivoDeActividades(array $filas): UploadedFile
{
    $encabezados = 'Nombre de la actividad *,Fecha *,Hora de inicio,Hora de finalización,'
        .'Unidad *,Tipo de actividad *,Línea de acción *,Espacio,Lugar externo,'
        .'Responsable,Publicar en la Agenda Cultural,Descripción';

    $lineas = collect($filas)->map(
        fn (array $fila): string => implode(',', array_map(
            fn (string $valor): string => '"'.$valor.'"',
            $fila,
        ))
    )->prepend($encabezados)->implode("\n");

    return UploadedFile::fake()->createWithContent('actividades.csv', $lineas."\n");
}

test('solo quien programa actividades entra a la carga masiva', function () {
    actingAs(User::factory()->conRoles(Rol::Consulta)->create())
        ->get(route('actividades.carga-masiva.create'))
        ->assertForbidden();

    actingAs($this->coordinador)
        ->get(route('actividades.carga-masiva.create'))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->component('actividades/carga-masiva')
            ->has('columnas', 12)
            ->where('listas.SiNo', ['Sí', 'No']));
});

test('la plantilla ofrece solo la unidad del coordinador', function () {
    Unidad::factory()->create(['nombre' => 'Deportes']);

    actingAs($this->coordinador)
        ->get(route('actividades.carga-masiva.create'))
        ->assertInertia(fn ($pagina) => $pagina->where('listas.Unidades', ['Cultura']));
});

test('un rol de alcance global ofrece todas las unidades', function () {
    Unidad::factory()->create(['nombre' => 'Deportes']);

    actingAs(User::factory()->conRoles(Rol::Administrador)->create())
        ->get(route('actividades.carga-masiva.create'))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina->where('listas.Unidades', ['Cultura', 'Deportes']));
});

test('la plantilla de Excel trae las listas desplegables de los catálogos', function () {
    $respuesta = actingAs($this->coordinador)
        ->get(route('actividades.carga-masiva.plantilla'))
        ->assertOk();

    $ruta = tempnam(sys_get_temp_dir(), 'plantilla-actividades-');
    file_put_contents($ruta, $respuesta->getContent());

    $zip = new ZipArchive;
    $zip->open($ruta);

    expect($zip->getFromName('xl/worksheets/sheet1.xml'))->toContain('<formula1>Unidades</formula1>')
        ->toContain('<formula1>Espacios</formula1>')
        ->and($zip->getFromName('xl/worksheets/sheet3.xml'))->toContain('Teatro de Cámara');
});

test('la revisión acepta una actividad con espacio y horario', function () {
    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                ['Concierto de marimba', '15-03-2026', '17:00', '19:00', 'Cultura', 'Concierto',
                    'Arte y cultura', 'Teatro de Cámara', '', 'Ana Coordinadora', 'Sí', 'Marimba nacional'],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen', ['total' => 1, 'validas' => 1, 'conError' => 0]));

    expect(Actividad::query()->count())->toBe(0);
});

test('al confirmar se crean las actividades en borrador con su reserva', function () {
    $revision = actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                ['Concierto de marimba', '15-03-2026', '17:00', '19:00', 'Cultura', 'Concierto',
                    'Arte y cultura', 'Teatro de Cámara', '', '', 'Sí', ''],
                ['Taller en el parque', '16-03-2026', '', '', 'Cultura', 'Concierto',
                    'Arte y cultura', '', 'Parque Central', '', 'No', ''],
            ]),
        ]);

    $token = $revision->viewData('page')['props']['revision']['token'];

    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.store'), ['token' => $token])
        ->assertRedirect(route('actividades.index'));

    expect(Actividad::query()->count())->toBe(2);

    assertDatabaseHas('actividades', [
        'nombre' => 'Concierto de marimba',
        'unidad_id' => $this->unidad->id,
        'espacio_id' => $this->espacio->id,
        'estado' => EstadoActividad::Borrador->value,
        'publicar_agenda' => true,
        'creado_por' => $this->coordinador->id,
    ]);

    // La actividad fuera de las instalaciones no reserva nada.
    assertDatabaseHas('actividades', [
        'nombre' => 'Taller en el parque',
        'espacio_id' => null,
        'lugar_externo' => 'Parque Central',
    ]);

    expect(SolicitudEspacio::query()->where('estado', EstadoSolicitud::Pendiente)->count())->toBe(1);
});

test('la revisión explica el error de cada fila', function () {
    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                // Sin lugar: ni espacio ni lugar externo.
                ['Sin lugar', '15-03-2026', '', '', 'Cultura', 'Concierto', 'Arte y cultura', '', '', '', 'No', ''],
                // Espacio sin horario.
                ['Sin horario', '15-03-2026', '', '', 'Cultura', 'Concierto', 'Arte y cultura', 'Teatro de Cámara', '', '', 'No', ''],
                // Tipo que no está en el catálogo.
                ['Tipo raro', '15-03-2026', '', '', 'Cultura', 'Kermés', 'Arte y cultura', '', 'Plaza', '', 'No', ''],
                // Fecha ilegible.
                ['Fecha mala', 'mañana', '', '', 'Cultura', 'Concierto', 'Arte y cultura', '', 'Plaza', '', 'No', ''],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen.validas', 0)
            ->where('revision.filas.0.errores.0', 'Lugar: indique un espacio del catálogo o un lugar externo.')
            ->where('revision.filas.1.errores.0', 'Horario: para reservar un espacio debe indicar la hora de inicio y la de finalización.')
            ->where('revision.filas.2.errores.0', 'Tipo de actividad: «Kermés» no está en el catálogo.')
            ->where('revision.filas.3.errores.0', 'Fecha: «mañana» no es una fecha válida (use dd-mm-aaaa).'));
});

test('no repite el error con el nombre técnico del campo', function () {
    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                ['Fecha mala', 'mañana', '', '', 'Cultura', 'Kermés', 'Arte y cultura', '', 'Plaza', '', 'No', ''],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            // Un error por campo: el claro, no el genérico del validador.
            ->has('revision.filas.0.errores', 2)
            ->where('revision.filas.0.errores.0', 'Tipo de actividad: «Kermés» no está en el catálogo.')
            ->where('revision.filas.0.errores.1', 'Fecha: «mañana» no es una fecha válida (use dd-mm-aaaa).'));
});

test('el coordinador no puede programar en otra unidad', function () {
    Unidad::factory()->create(['nombre' => 'Deportes']);

    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                ['Partido', '15-03-2026', '', '', 'Deportes', 'Concierto', 'Arte y cultura', '', 'Cancha', '', 'No', ''],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen.validas', 0)
            ->where(
                'revision.filas.0.errores.0',
                'Unidad: «Deportes» no está entre las unidades que puede programar.'
            ));
});

test('avisa del choque de horario con una reserva aprobada', function () {
    SolicitudEspacio::factory()->aprobada()
        ->enHorario('15-03-2026', '18:00:00', '20:00:00')
        ->create(['espacio_id' => $this->espacio->id]);

    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                ['Concierto', '15-03-2026', '17:00', '19:00', 'Cultura', 'Concierto',
                    'Arte y cultura', 'Teatro de Cámara', '', '', 'No', ''],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen.validas', 0)
            ->where('revision.filas.0.errores.0', 'Espacio: «Teatro de Cámara» ya está reservado el 15-03-2026 de 18:00 a 20:00.'));
});

test('avisa del choque entre dos filas del mismo archivo', function () {
    actingAs($this->coordinador)
        ->post(route('actividades.carga-masiva.revision'), [
            'archivo' => archivoDeActividades([
                ['Primera', '15-03-2026', '17:00', '19:00', 'Cultura', 'Concierto',
                    'Arte y cultura', 'Teatro de Cámara', '', '', 'No', ''],
                ['Segunda', '15-03-2026', '18:00', '20:00', 'Cultura', 'Concierto',
                    'Arte y cultura', 'Teatro de Cámara', '', '', 'No', ''],
            ]),
        ])
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('revision.resumen', ['total' => 2, 'validas' => 1, 'conError' => 1])
            ->where(
                'revision.filas.1.errores.0',
                'Espacio: otra fila de este archivo ya pidió ese espacio a esa hora («Primera»).'
            ));
});
