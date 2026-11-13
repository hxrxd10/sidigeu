<?php

namespace Database\Factories;

use App\Enums\Rol;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return $this->atributosDe(Rol::Consulta);
    }

    /**
     * Crea el rol indicado del catálogo institucional.
     */
    public function rol(Rol $rol): static
    {
        return $this->state(fn (): array => $this->atributosDe($rol));
    }

    /**
     * @return array<string, mixed>
     */
    private function atributosDe(Rol $rol): array
    {
        return [
            'slug' => $rol,
            'nombre' => $rol->nombre(),
            'descripcion' => $rol->descripcion(),
        ];
    }
}
