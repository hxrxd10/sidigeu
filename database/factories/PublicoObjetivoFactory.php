<?php

namespace Database\Factories;

use App\Models\PublicoObjetivo;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<PublicoObjetivo>
 */
class PublicoObjetivoFactory extends Factory
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
