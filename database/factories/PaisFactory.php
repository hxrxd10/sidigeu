<?php

namespace Database\Factories;

use App\Models\Pais;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Pais>
 */
class PaisFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->unique()->country(),
            'codigo' => Str::upper(fake()->unique()->lexify('??')),
            'activo' => true,
        ];
    }

    public function guatemala(): static
    {
        return $this->state(fn (): array => ['nombre' => 'Guatemala', 'codigo' => 'GT']);
    }
}
