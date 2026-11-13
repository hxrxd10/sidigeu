<?php

namespace Database\Seeders;

use App\Enums\Rol;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Catálogo de roles del sistema (sección 8.1 de los requerimientos).
     */
    public function run(): void
    {
        foreach (Rol::cases() as $rol) {
            Role::updateOrCreate(
                ['slug' => $rol],
                ['nombre' => $rol->nombre(), 'descripcion' => $rol->descripcion()],
            );
        }
    }
}
