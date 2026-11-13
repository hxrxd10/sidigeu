<?php

namespace Database\Seeders;

use App\Enums\Rol;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            AreaSeeder::class,
            PaisSeeder::class,
            DisciplinaSeeder::class,
            EspacioSeeder::class,
            ActividadCatalogoSeeder::class,
            ProyectoCatalogoSeeder::class,
        ]);

        $administrador = User::factory()->create([
            'name' => 'Administrador DIGEU',
            'email' => 'admin@digeu.test',
        ]);

        $administrador->roles()->sync(
            Role::where('slug', Rol::Administrador)->value('id')
        );
    }
}
