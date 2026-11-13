<?php

use App\Enums\EstadoActividad;
use App\Enums\EstadoProyecto;
use App\Enums\RangoEdad;
use App\Enums\Rol;
use App\Enums\SexoBeneficiario;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\PersonaRecursoHumano;
use App\Models\Proyecto;
use App\Models\SolicitudEspacio;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Support\Carbon;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create();
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->enUnidad($this->unidad)->create();
});

test('el panel resume las actividades del mes de la unidad', function () {
    $hoy = Carbon::today()->toDateString();
    $otraUnidad = Unidad::factory()->create();

    Actividad::factory()->cerrada()->enFecha($hoy)->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->enAgenda()->enFecha($hoy)->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->enFecha($hoy)->create(['unidad_id' => $otraUnidad->id]);

    actingAs($this->coordinador)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('actividades.total', 2)
            ->where('actividades.cerradas', 1)
            ->where('actividades.enAgenda', 1)
            ->has('actividades.proximas'));
});

test('el panel entrega las series de las gráficas', function () {
    $hoy = Carbon::today();

    $actividad = Actividad::factory()->cerrada()->enFecha($hoy->toDateString())
        ->create(['unidad_id' => $this->unidad->id]);
    $actividad->beneficiarios()->create([
        'sexo' => SexoBeneficiario::Mujer,
        'rango_edad' => RangoEdad::Adultez,
        'cantidad' => 40,
    ]);

    Actividad::factory()->enFecha($hoy->copy()->subMonths(2)->toDateString())
        ->create(['unidad_id' => $this->unidad->id]);

    actingAs($this->coordinador)
        ->get(route('dashboard'))
        ->assertInertia(fn ($pagina) => $pagina
            ->has('graficas.porTipo', 1)
            ->where('graficas.porTipo.0.valor', 1)
            ->has('graficas.actividadesPorMes', 6)
            ->where('graficas.actividadesPorMes.5.valor', 1)
            ->where('graficas.actividadesPorMes.3.valor', 1)
            ->has('graficas.beneficiariosPorMes', 6)
            ->where('graficas.beneficiariosPorMes.5.valor', 40));
});

test('la dirección ve el resumen de todas las unidades', function () {
    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $hoy = Carbon::today()->toDateString();

    Actividad::factory()->enFecha($hoy)->create(['unidad_id' => $this->unidad->id]);
    Actividad::factory()->enFecha($hoy)->create(['unidad_id' => Unidad::factory()->create()->id]);

    actingAs($direccion)
        ->get(route('dashboard'))
        ->assertInertia(fn ($pagina) => $pagina->where('actividades.total', 2));
});

test('el panel resume proyectos, espacios y recurso humano', function () {
    Proyecto::factory()->enEjecucion()->create(['unidad_id' => $this->unidad->id]);
    Proyecto::factory()->enEstado(EstadoProyecto::EnRevision)->create(['unidad_id' => $this->unidad->id]);

    $espacio = Espacio::factory()->create();
    Espacio::factory()->enMantenimiento()->create();
    SolicitudEspacio::factory()->aprobada()
        ->enHorario(Carbon::today()->toDateString(), '09:00:00', '11:00:00')
        ->create(['espacio_id' => $espacio->id]);

    PersonaRecursoHumano::factory()->artista()->count(2)->create();
    PersonaRecursoHumano::factory()->deportista()->inactiva()->create();

    actingAs($this->coordinador)
        ->get(route('dashboard'))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('proyectos.enEjecucion', 1)
            ->where('proyectos.enRevision', 1)
            ->where('espacios.total', 2)
            ->where('espacios.enMantenimiento', 1)
            ->where('espacios.reservasSemana', 1)
            ->where('recursoHumano.activos', 2)
            ->where('recursoHumano.inactivos', 1)
            ->where('recursoHumano.artistas', 2));
});

test('los pendientes dependen del rol', function () {
    Actividad::factory()->enEstado(EstadoActividad::Enviada)->create(['unidad_id' => $this->unidad->id]);
    Proyecto::factory()->enEstado(EstadoProyecto::EnRevision)->create(['unidad_id' => $this->unidad->id]);

    $validador = User::factory()->conRoles(Rol::Validador)->create();

    actingAs($validador)
        ->get(route('dashboard'))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('pendientes.0.etiqueta', 'Actividades por validar')
            ->where('pendientes.0.total', 1)
            ->where('pendientes.1.etiqueta', 'Proyectos por aprobar'));

    $consulta = User::factory()->conRoles(Rol::Consulta)->create();

    actingAs($consulta)
        ->get(route('dashboard'))
        ->assertInertia(fn ($pagina) => $pagina->has('pendientes', 0));
});

test('la portada pública se ve sin iniciar sesión', function () {
    $this->get(route('home'))->assertOk();
});
