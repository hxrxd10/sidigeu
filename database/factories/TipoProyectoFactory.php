<?php

namespace Database\Factories;

use App\Models\TipoProyecto;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<TipoProyecto>
 */
class TipoProyectoFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => Str::ucfirst(fake()->unique()->word()),
            'activo' => true,
        ];
    }
}
