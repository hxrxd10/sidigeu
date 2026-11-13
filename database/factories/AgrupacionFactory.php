<?php

namespace Database\Factories;

use App\Models\Agrupacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Agrupacion>
 */
class AgrupacionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => 'Agrupación '.fake()->unique()->word(),
            'activo' => true,
        ];
    }
}
