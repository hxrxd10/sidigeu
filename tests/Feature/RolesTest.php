<?php

use App\Enums\Rol;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

test('tieneRol reconoce los roles asignados al usuario', function () {
    $usuario = User::factory()->conRoles(Rol::CoordinadorUnidad)->create();

    expect($usuario->tieneRol(Rol::CoordinadorUnidad))->toBeTrue()
        ->and($usuario->tieneRol(Rol::Validador))->toBeFalse()
        ->and($usuario->tieneRol(Rol::Validador, Rol::CoordinadorUnidad))->toBeTrue();
});

test('un usuario sin roles no tiene ninguno', function () {
    $usuario = User::factory()->create();

    expect($usuario->tieneRol(...Rol::cases()))->toBeFalse()
        ->and($usuario->esAdministrador())->toBeFalse()
        ->and($usuario->tieneAlcanceGlobal())->toBeFalse();
});

test('los roles de dirección y validación tienen alcance global', function () {
    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $coordinador = User::factory()->conRoles(Rol::CoordinadorUnidad)->create();

    expect($direccion->tieneAlcanceGlobal())->toBeTrue()
        ->and($coordinador->tieneAlcanceGlobal())->toBeFalse();
});

test('el administrador supera cualquier verificación de permisos', function () {
    Gate::define('reporte-institucional', fn (): bool => false);

    $administrador = User::factory()->conRoles(Rol::Administrador)->create();
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();

    expect(Gate::forUser($administrador)->allows('reporte-institucional'))->toBeTrue()
        ->and(Gate::forUser($consulta)->allows('reporte-institucional'))->toBeFalse();
});

test('un usuario pertenece a una unidad administrativa', function () {
    $unidad = Unidad::factory()->create(['nombre' => 'Unidad de Cultura']);

    $usuario = User::factory()->enUnidad($unidad)->create();

    expect($usuario->unidad->nombre)->toBe('Unidad de Cultura')
        ->and($usuario->unidad->area)->not->toBeNull()
        ->and($unidad->usuarios()->whereKey($usuario->id)->exists())->toBeTrue();
});

test('un usuario nuevo está activo', function () {
    expect(User::factory()->create()->activo)->toBeTrue();
});
