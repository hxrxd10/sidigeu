<?php

use App\Enums\EstadoActividad;
use App\Enums\EstadoProyecto;
use App\Enums\Rol;
use App\Models\Actividad;
use App\Models\Area;
use App\Models\Proyecto;
use App\Models\Unidad;
use App\Models\User;
use App\Notifications\ActividadEnviadaARevision;
use App\Notifications\ActividadResuelta;
use App\Notifications\ProyectoEnviadoAAprobacion;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create();
    $this->coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->enUnidad($this->unidad)->create();
    $this->validador = User::factory()->conRoles(Rol::Validador)->create();
});

test('enviar una actividad a revisión notifica a quienes validan', function () {
    Notification::fake();

    $actividad = Actividad::factory()->create([
        'unidad_id' => $this->unidad->id,
        'creado_por' => $this->coordinador->id,
    ]);

    actingAs($this->coordinador)->patch(route('actividades.enviar', $actividad))->assertRedirect();

    Notification::assertSentTo($this->validador, ActividadEnviadaARevision::class);
});

test('observar una actividad notifica a quien la registró', function () {
    Notification::fake();

    $actividad = Actividad::factory()->create([
        'unidad_id' => $this->unidad->id,
        'creado_por' => $this->coordinador->id,
        'responsable_id' => $this->coordinador->id,
        'estado' => EstadoActividad::Enviada,
    ]);

    actingAs($this->validador)
        ->patch(route('actividades.observar', $actividad), ['comentario' => 'Falta el público objetivo.']);

    Notification::assertSentTo($this->coordinador, ActividadResuelta::class);
});

test('enviar un proyecto notifica a dirección', function () {
    Notification::fake();

    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $proyecto = Proyecto::factory()->create(['unidad_id' => $this->unidad->id]);
    $proyecto->objetivos()->create(['descripcion' => 'Objetivo', 'orden' => 0]);
    $proyecto->cronograma()->create(['tarea' => 'Tarea', 'orden' => 0]);

    actingAs($this->coordinador)->patch(route('proyectos.enviar', $proyecto))->assertRedirect();

    Notification::assertSentTo($direccion, ProyectoEnviadoAAprobacion::class);
});

test('la bandeja muestra las notificaciones y permite marcarlas leídas', function () {
    $actividad = Actividad::factory()->create([
        'unidad_id' => $this->unidad->id,
        'estado' => EstadoActividad::Enviada,
    ]);

    $this->validador->notify(new ActividadEnviadaARevision($actividad->load('unidad')));

    actingAs($this->validador)
        ->get(route('notificaciones.index'))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->where('noLeidas', 1)
            ->has('notificaciones.data', 1)
            ->where('notificaciones.data.0.titulo', 'Actividad por validar'));

    actingAs($this->validador)->patch(route('notificaciones.leidas'))->assertRedirect();

    expect($this->validador->refresh()->unreadNotifications()->count())->toBe(0);
});

test('cada usuario solo ve sus propias notificaciones', function () {
    $actividad = Actividad::factory()->create(['unidad_id' => $this->unidad->id]);
    $this->validador->notify(new ActividadEnviadaARevision($actividad->load('unidad')));

    actingAs($this->coordinador)
        ->get(route('notificaciones.index'))
        ->assertInertia(fn ($pagina) => $pagina->has('notificaciones.data', 0));
});

test('la bitácora es solo para el administrador y filtra por entidad y acción', function () {
    $administrador = User::factory()->conRoles(Rol::Administrador)->create();

    actingAs($this->coordinador)->get(route('bitacora.index'))->assertForbidden();

    actingAs($administrador);
    $area = Area::factory()->create(['nombre' => 'Cultura']);
    $area->update(['nombre' => 'Cultura y arte']);
    Proyecto::factory()->create(['unidad_id' => $this->unidad->id, 'estado' => EstadoProyecto::Registrado]);

    actingAs($administrador)
        ->get(route('bitacora.index', ['entidad' => Area::class, 'accion' => 'actualizado']))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->has('registros.data', 1)
            ->where('registros.data.0.entidad', 'Area')
            ->where('registros.data.0.accion', 'actualizado')
            ->where('registros.data.0.valores_antes.nombre', 'Cultura')
            ->where('registros.data.0.valores_despues.nombre', 'Cultura y arte'));
});
