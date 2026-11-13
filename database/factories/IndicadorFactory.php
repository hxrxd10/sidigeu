<?php

namespace Database\Factories;

use App\Models\Indicador;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Indicador>
 */
class IndicadorFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => Str::ucfirst(fake()->unique()->word()),
            'unidad_medida' => fake()->randomElement(['Personas', 'Actividades', 'Horas', 'Porcentaje']),
            'descripcion' => fake()->sentence(),
            'activo' => true,
        ];
    }
}
