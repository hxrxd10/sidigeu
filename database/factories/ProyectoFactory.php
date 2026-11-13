<?php

namespace Database\Factories;

use App\Enums\EstadoProyecto;
use App\Models\Proyecto;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Proyecto>
 */
class ProyectoFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => 'Proyecto '.fake()->unique()->word(),
            'unidad_id' => Unidad::factory(),
            'responsable_id' => User::factory(),
            'justificacion' => fake()->paragraph(),
            'objetivo_general' => fake()->sentence(),
            'fecha_inicio' => Carbon::today()->toDateString(),
            'fecha_fin' => Carbon::today()->addMonths(6)->toDateString(),
            'estado' => EstadoProyecto::Registrado,
        ];
    }

    public function enEstado(EstadoProyecto $estado): static
    {
        return $this->state(fn (): array => ['estado' => $estado]);
    }

    public function aprobado(): static
    {
        return $this->state(fn (): array => ['estado' => EstadoProyecto::Aprobado]);
    }

    public function enEjecucion(): static
    {
        return $this->state(fn (): array => ['estado' => EstadoProyecto::EnEjecucion]);
    }

    public function cerrado(): static
    {
        return $this->state(fn (): array => [
            'estado' => EstadoProyecto::Cerrado,
            'resultados' => 'Resultados finales del proyecto.',
            'productos' => 'Informe final y material didáctico.',
            'fecha_cierre' => Carbon::now(),
        ]);
    }
}
