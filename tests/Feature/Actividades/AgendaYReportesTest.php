<?php

use App\Enums\EstadoActividad;
use App\Enums\RangoEdad;
use App\Enums\Rol;
use App\Enums\SexoBeneficiario;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\Indicador;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Support\Carbon;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create(['nombre' => 'Unidad de Cultura']);
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->enUnidad($this->unidad)->create();
    $this->mes = Carbon::today()->format('Y-m');
});

test('la Agenda Cultural es pública y solo muestra lo publicado', function () {
    Actividad::factory()->enAgenda()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'Concierto de marimba']);

    Actividad::factory()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'Taller interno']);

    Actividad::factory()->enFecha(Carbon::today()->toDateString())
        ->create([
            'unidad_id' => $this->unidad->id,
            'nombre' => 'Validada sin agenda',
            'estado' => EstadoActividad::Validada,
        ]);

    get(route('publico.agenda', ['mes' => $this->mes]))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->has('actividades', 1)
            ->where('actividades.0.nombre', 'Concierto de marimba'));
});

test('la agenda filtra por unidad y cambia de mes', function () {
    $otraUnidad = Unidad::factory()->create();

    Actividad::factory()->enAgenda()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->enAgenda()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $otraUnidad->id]);
    Actividad::factory()->enAgenda()->enFecha(Carbon::today()->addMonth()->toDateString())
        ->create(['unidad_id' => $this->unidad->id]);

    get(route('publico.agenda', ['mes' => $this->mes, 'unidad_id' => $this->unidad->id]))
        ->assertInertia(fn ($pagina) => $pagina->has('actividades', 1));

    get(route('publico.agenda', ['mes' => Carbon::today()->addMonth()->format('Y-m')]))
        ->assertInertia(fn ($pagina) => $pagina->has('actividades', 1));
});

test('el reporte mensual separa actividades realizadas de logros no programados', function () {
    $hoy = Carbon::today()->toDateString();

    $realizada = Actividad::factory()->cerrada()->enFecha($hoy)
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'Taller realizado']);
    $realizada->beneficiarios()->create([
        'sexo' => SexoBeneficiario::Mujer,
        'rango_edad' => RangoEdad::Juventud,
        'cantidad' => 40,
    ]);

    Actividad::factory()->logroNoProgramado()->enFecha($hoy)
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'Reconocimiento recibido']);

    Actividad::factory()->enFecha($hoy)
        ->create(['unidad_id' => $this->unidad->id, 'estado' => EstadoActividad::Cancelada]);

    actingAs($this->coordinador)
        ->get(route('actividades.reportes.mensual', ['mes' => $this->mes]))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('resumen.cerradas', 2)
            ->where('resumen.canceladas', 1)
            ->where('resumen.logros', 1)
            ->where('resumen.beneficiarios', 40)
            ->has('realizadas', 1)
            ->where('realizadas.0.nombre', 'Taller realizado')
            ->has('logros', 1)
            ->where('logros.0.nombre', 'Reconocimiento recibido'));
});

test('el reporte mensual suma los indicadores alcanzados', function () {
    $indicador = Indicador::factory()->create(['nombre' => 'Personas beneficiadas']);
    $hoy = Carbon::today()->toDateString();

    foreach ([60, 40] as $valor) {
        $actividad = Actividad::factory()->cerrada()->enFecha($hoy)->create(['unidad_id' => $this->unidad->id]);
        $actividad->indicadores()->attach($indicador->id, ['valor_meta' => 50, 'valor_alcanzado' => $valor]);
    }

    actingAs($this->coordinador)
        ->get(route('actividades.reportes.mensual', ['mes' => $this->mes]))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('indicadores', 1)
            ->where('indicadores.0.nombre', 'Personas beneficiadas')
            ->where('indicadores.0.meta', 100)
            ->where('indicadores.0.alcanzado', 100));
});

test('el reporte acumulado agrupa por mes, unidad y tipo', function () {
    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $anio = (int) Carbon::today()->format('Y');

    Actividad::factory()->cerrada()->enFecha($anio.'-01-15')->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->cerrada()->enFecha($anio.'-02-20')->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->cerrada()->enFecha($anio.'-07-10')->create(['unidad_id' => $this->unidad->id]);

    actingAs($direccion)
        ->get(route('actividades.reportes.acumulado', [
            'anio' => $anio,
            'periodo' => 'trimestral',
            'bloque' => 1,
        ]))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('resumen.cerradas', 2)
            ->has('porMes', 3)
            ->has('porUnidad', 1)
            ->where('porUnidad.0.etiqueta', 'Unidad de Cultura'));

    actingAs($direccion)
        ->get(route('actividades.reportes.acumulado', ['anio' => $anio, 'periodo' => 'anual']))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('resumen.cerradas', 3)
            ->has('porMes', 12));
});

test('el reporte mensual se exporta a CSV', function () {
    Actividad::factory()->cerrada()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'Jornada de salud comunitaria']);

    $respuesta = actingAs($this->coordinador)
        ->get(route('actividades.reportes.exportar', ['mes' => $this->mes]));

    $respuesta->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');

    expect($respuesta->streamedContent())->toContain('Jornada de salud comunitaria')
        ->and($respuesta->streamedContent())->toContain('Beneficiarios');
});

test('una actividad validada se publica en la agenda después de validarse', function () {
    $validador = User::factory()->conRoles(Rol::Validador)->create();
    $actividad = Actividad::factory()->enEstado(EstadoActividad::Validada)->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id, 'nombre' => 'Exposición de pintura']);

    actingAs($validador)
        ->patch(route('actividades.publicar-agenda', $actividad))
        ->assertRedirect();

    expect($actividad->refresh()->publicar_agenda)->toBeTrue()
        ->and($actividad->estado)->toBe(EstadoActividad::PublicadaAgenda);

    get(route('publico.agenda', ['mes' => $this->mes]))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('actividades', 1)
            ->where('actividades.0.nombre', 'Exposición de pintura'));
});

test('quitar una actividad de la agenda no la cancela', function () {
    $validador = User::factory()->conRoles(Rol::Validador)->create();
    $actividad = Actividad::factory()->enAgenda()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id]);

    actingAs($validador)
        ->patch(route('actividades.quitar-agenda', $actividad))
        ->assertRedirect();

    expect($actividad->refresh()->publicar_agenda)->toBeFalse()
        ->and($actividad->estado)->toBe(EstadoActividad::Validada);

    get(route('publico.agenda', ['mes' => $this->mes]))
        ->assertInertia(fn ($pagina) => $pagina->has('actividades', 0));
});

test('una actividad en ejecución o cerrada sale de la agenda sin cambiar de estado', function () {
    $validador = User::factory()->conRoles(Rol::Validador)->create();
    $actividad = Actividad::factory()->cerrada()->enFecha(Carbon::today()->toDateString())
        ->create(['unidad_id' => $this->unidad->id, 'publicar_agenda' => true]);

    actingAs($validador)->patch(route('actividades.quitar-agenda', $actividad));

    expect($actividad->refresh()->publicar_agenda)->toBeFalse()
        ->and($actividad->estado)->toBe(EstadoActividad::Cerrada);
});

test('una actividad en un lugar externo se publica en la agenda sin reservar espacio', function () {
    $validador = User::factory()->conRoles(Rol::Validador)->create();
    $actividad = Actividad::factory()->enEstado(EstadoActividad::Validada)->enFecha(Carbon::today()->toDateString())
        ->create([
            'unidad_id' => $this->unidad->id,
            'nombre' => 'Festival en el parque central',
            'espacio_id' => null,
            'lugar_externo' => 'Parque Central de Quetzaltenango',
        ]);

    actingAs($validador)->patch(route('actividades.publicar-agenda', $actividad));

    expect($actividad->refresh()->reservas)->toHaveCount(0);

    get(route('publico.agenda', ['mes' => $this->mes]))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('actividades.0.nombre', 'Festival en el parque central')
            ->where('actividades.0.lugar', 'Parque Central de Quetzaltenango')
            ->where('actividades.0.sede', null));
});

test('la agenda la maneja quien valida, no la unidad', function () {
    $actividad = Actividad::factory()->enEstado(EstadoActividad::Validada)
        ->create(['unidad_id' => $this->unidad->id]);

    actingAs($this->coordinador)
        ->patch(route('actividades.publicar-agenda', $actividad))
        ->assertForbidden();
});

test('no se publica en la agenda una actividad que aún no se valida', function () {
    $validador = User::factory()->conRoles(Rol::Validador)->create();
    $actividad = Actividad::factory()->create(['unidad_id' => $this->unidad->id]);

    actingAs($validador)
        ->patch(route('actividades.publicar-agenda', $actividad))
        ->assertForbidden();
});

test('la ficha ofrece publicar o quitar de la agenda según corresponda', function () {
    $validador = User::factory()->conRoles(Rol::Validador)->create();
    $validada = Actividad::factory()->enEstado(EstadoActividad::Validada)->create(['unidad_id' => $this->unidad->id]);
    $publicada = Actividad::factory()->enAgenda()->create(['unidad_id' => $this->unidad->id]);

    actingAs($validador)
        ->get(route('actividades.show', $validada))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('permisos.publicarAgenda', true)
            ->where('permisos.quitarAgenda', false));

    actingAs($validador)
        ->get(route('actividades.show', $publicada))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('permisos.publicarAgenda', false)
            ->where('permisos.quitarAgenda', true));
});

test('cada actividad de la agenda se descarga como archivo de calendario', function () {
    $actividad = Actividad::factory()->enAgenda()->enFecha('2026-11-17')
        ->create([
            'unidad_id' => $this->unidad->id,
            'nombre' => 'Concierto de marimba; entrada libre',
            'descripcion' => 'Presentación de la orquesta.',
            'hora_inicio' => '16:00:00',
            'hora_fin' => '19:00:00',
            'espacio_id' => null,
            'lugar_externo' => 'Parque Central',
        ]);

    $respuesta = get(route('publico.agenda.calendario', $actividad));

    $respuesta->assertOk()
        ->assertHeader('content-type', 'text/calendar; charset=utf-8')
        ->assertHeader('content-disposition', 'attachment; filename="concierto-de-marimba-entrada-libre.ics"');

    $ics = $respuesta->getContent();

    // Guatemala es UTC-6: las 16:00 locales son las 22:00 UTC.
    expect($ics)->toContain('BEGIN:VCALENDAR')
        ->and($ics)->toContain('DTSTART:20261117T220000Z')
        ->and($ics)->toContain('DTEND:20261118T010000Z')
        ->and($ics)->toContain('LOCATION:Parque Central')
        ->and($ics)->toContain('Concierto de marimba\; entrada libre')
        ->and($ics)->toContain('END:VCALENDAR');
});

test('una actividad sin hora ocupa todo el día en el calendario', function () {
    $actividad = Actividad::factory()->enAgenda()->enFecha('2026-11-17')
        ->create([
            'unidad_id' => $this->unidad->id,
            'hora_inicio' => null,
            'hora_fin' => null,
            'espacio_id' => null,
        ]);

    $ics = get(route('publico.agenda.calendario', $actividad))->getContent();

    expect($ics)->toContain('DTSTART;VALUE=DATE:20261117')
        ->and($ics)->toContain('DTEND;VALUE=DATE:20261118');
});

test('no se descarga el calendario de una actividad que no está publicada', function () {
    $actividad = Actividad::factory()->enEstado(EstadoActividad::Validada)
        ->create(['unidad_id' => $this->unidad->id]);

    get(route('publico.agenda.calendario', $actividad))->assertNotFound();
});

test('las líneas del archivo de calendario no pasan de 75 octetos', function () {
    $actividad = Actividad::factory()->enAgenda()->enFecha('2026-11-17')
        ->create([
            'unidad_id' => $this->unidad->id,
            'nombre' => 'Jornada de proyección popular con acompañamiento de la orquesta sinfónica universitaria',
            'descripcion' => str_repeat('Programación cultural de la Dirección General de Extensión Universitaria. ', 4),
        ]);

    $ics = get(route('publico.agenda.calendario', $actividad))->getContent();

    foreach (explode("\r\n", $ics) as $linea) {
        expect(strlen($linea))->toBeLessThanOrEqual(75);
    }
});

test('el calendario de una actividad en un espacio propio lleva la sede', function () {
    $espacio = Espacio::factory()->create(['nombre' => 'Salón Mayor', 'ubicacion' => 'Nivel 2']);
    $actividad = Actividad::factory()->enAgenda()->enFecha('2026-11-17')
        ->create([
            'unidad_id' => $this->unidad->id,
            'espacio_id' => $espacio->id,
            'lugar_externo' => null,
        ]);

    $ics = get(route('publico.agenda.calendario', $actividad))->getContent();

    expect($ics)->toContain('LOCATION:Salón Mayor\, Nivel 2\, '.$espacio->sede->nombre);
});
