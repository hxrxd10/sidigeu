<?php

namespace Database\Factories;

use App\Models\PersonaRecursoHumano;
use App\Models\PersonaRecursoHumanoPeriodo;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<PersonaRecursoHumanoPeriodo>
 */
class PersonaRecursoHumanoPeriodoFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'persona_id' => PersonaRecursoHumano::factory(),
            'fecha_alta' => Carbon::today()->subYears(2)->toDateString(),
            'fecha_baja' => null,
            'motivo_baja' => null,
        ];
    }

    public function cerrado(string $fechaAlta, string $fechaBaja): static
    {
        return $this->state(fn (): array => [
            'fecha_alta' => $fechaAlta,
            'fecha_baja' => $fechaBaja,
            'motivo_baja' => 'Período cerrado',
        ]);
    }
}
