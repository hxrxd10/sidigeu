<?php

use App\Enums\Rol;
use App\Models\Unidad;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->seed(RoleSeeder::class);

    $this->administrador = User::factory()->conRoles(Rol::Administrador)->create();
});

test('solo el administrador entra a la administración de usuarios', function () {
    $coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->create();

    actingAs($coordinador)->get(route('usuarios.index'))->assertForbidden();
    actingAs($this->administrador)->get(route('usuarios.index'))->assertOk();
});

test('crear un usuario le asigna roles y le envía el enlace para definir su contraseña', function () {
    Notification::fake();

    $unidad = Unidad::factory()->create();

    actingAs($this->administrador)
        ->post(route('usuarios.store'), [
            'name' => 'Ana López',
            'email' => 'ana.lopez@usac.edu.gt',
            'unidad_id' => $unidad->id,
            'activo' => true,
            'roles' => [Rol::CoordinadorUnidad->value, Rol::Consulta->value],
        ])
        ->assertRedirect(route('usuarios.index'));

    $usuario = User::where('email', 'ana.lopez@usac.edu.gt')->sole();

    expect($usuario->unidad_id)->toBe($unidad->id)
        ->and($usuario->activo)->toBeTrue()
        ->and($usuario->tieneRol(Rol::CoordinadorUnidad, Rol::Consulta))->toBeTrue();

    Notification::assertSentTo($usuario, ResetPassword::class);
});

test('no se puede repetir el correo de otro usuario', function () {
    User::factory()->create(['email' => 'repetido@usac.edu.gt']);

    actingAs($this->administrador)
        ->post(route('usuarios.store'), [
            'name' => 'Otro',
            'email' => 'repetido@usac.edu.gt',
        ])
        ->assertSessionHasErrors('email');
});

test('actualizar un usuario cambia su unidad y sus roles', function () {
    $usuario = User::factory()->conRoles(Rol::Consulta)->create();
    $unidad = Unidad::factory()->create();

    actingAs($this->administrador)
        ->put(route('usuarios.update', $usuario), [
            'name' => 'Nombre corregido',
            'email' => $usuario->email,
            'unidad_id' => $unidad->id,
            'activo' => true,
            'roles' => [Rol::Validador->value],
        ])
        ->assertRedirect(route('usuarios.index'));

    $usuario->refresh()->load('roles');

    expect($usuario->name)->toBe('Nombre corregido')
        ->and($usuario->unidad_id)->toBe($unidad->id)
        ->and($usuario->tieneRol(Rol::Validador))->toBeTrue()
        ->and($usuario->tieneRol(Rol::Consulta))->toBeFalse();
});

test('un administrador no puede desactivarse ni quitarse su propio rol', function () {
    actingAs($this->administrador)
        ->put(route('usuarios.update', $this->administrador), [
            'name' => $this->administrador->name,
            'email' => $this->administrador->email,
            'activo' => false,
            'roles' => [],
        ])
        ->assertSessionHasErrors(['activo', 'roles']);

    expect($this->administrador->refresh()->activo)->toBeTrue();
});

test('el administrador activa y desactiva a otros usuarios', function () {
    $usuario = User::factory()->create();

    actingAs($this->administrador)
        ->patch(route('usuarios.estado', $usuario))
        ->assertRedirect();

    expect($usuario->refresh()->activo)->toBeFalse();

    actingAs($this->administrador)->patch(route('usuarios.estado', $usuario));

    expect($usuario->refresh()->activo)->toBeTrue();
});

test('el administrador no puede desactivarse a sí mismo desde el listado', function () {
    actingAs($this->administrador)
        ->patch(route('usuarios.estado', $this->administrador))
        ->assertSessionHasErrors('activo');

    expect($this->administrador->refresh()->activo)->toBeTrue();
});
