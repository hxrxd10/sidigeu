<?php

use App\Enums\Rol;
use App\Models\Area;
use App\Models\Role;
use Database\Seeders\AreaSeeder;
use Database\Seeders\RoleSeeder;

test('el seeder crea el catálogo completo de roles', function () {
    $this->seed(RoleSeeder::class);

    expect(Role::count())->toBe(count(Rol::cases()))
        ->and(Role::where('slug', Rol::Administrador)->value('nombre'))->toBe('Administrador');
});

test('el seeder crea las áreas institucionales de la DIGEU', function () {
    $this->seed(AreaSeeder::class);

    expect(Area::pluck('slug')->all())->toBe([
        'formacion',
        'cultura',
        'deporte',
        'vinculacion',
        'interdisciplinariedad',
    ]);
});

test('los seeders se pueden ejecutar más de una vez sin duplicar registros', function () {
    $this->seed(RoleSeeder::class);
    $this->seed(AreaSeeder::class);
    $this->seed(RoleSeeder::class);
    $this->seed(AreaSeeder::class);

    expect(Role::count())->toBe(count(Rol::cases()))
        ->and(Area::count())->toBe(5);
});
