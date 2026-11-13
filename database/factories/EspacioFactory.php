<?php

namespace Database\Factories;

use App\Enums\EstadoEspacio;
use App\Models\Espacio;
use App\Models\Sede;
use App\Models\TipoEspacio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Espacio>
 */
class EspacioFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sede_id' => Sede::factory(),
            'nombre' => 'Espacio '.fake()->unique()->word(),
            'tipo_espacio_id' => TipoEspacio::factory(),
            'ubicacion' => 'Nivel '.fake()->numberBetween(1, 3),
            'capacidad' => fake()->numberBetween(20, 500),
            'caracteristicas' => fake()->sentence(),
            'condiciones_uso' => 'Uso exclusivo para actividades académicas y culturales.',
            'estado' => EstadoEspacio::Activo,
            'visible_publico' => true,
        ];
    }

    public function enMantenimiento(): static
    {
        return $this->state(fn (): array => ['estado' => EstadoEspacio::Mantenimiento]);
    }

    public function oculto(): static
    {
        return $this->state(fn (): array => ['visible_publico' => false]);
    }
}
