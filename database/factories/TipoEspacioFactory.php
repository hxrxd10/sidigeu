<?php

namespace Database\Factories;

use App\Models\TipoEspacio;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<TipoEspacio>
 */
class TipoEspacioFactory extends Factory
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
