<?php

namespace Database\Factories;

use App\Enums\EstadoActividad;
use App\Models\Actividad;
use App\Models\LineaAccion;
use App\Models\TipoActividad;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Actividad>
 */
class ActividadFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => 'Actividad '.fake()->unique()->word(),
            'unidad_id' => Unidad::factory(),
            'responsable_id' => User::factory(),
            'fecha' => Carbon::today()->addWeek()->toDateString(),
            'hora_inicio' => '09:00:00',
            'hora_fin' => '11:00:00',
            'lugar_externo' => 'Salón comunal',
            'tipo_actividad_id' => TipoActividad::factory(),
            'linea_accion_id' => LineaAccion::factory(),
            'publicar_agenda' => false,
            'es_logro_no_programado' => false,
            'estado' => EstadoActividad::Borrador,
            'descripcion' => fake()->sentence(),
        ];
    }

    public function enEstado(EstadoActividad $estado): static
    {
        return $this->state(fn (): array => ['estado' => $estado]);
    }

    public function enAgenda(): static
    {
        return $this->state(fn (): array => [
            'publicar_agenda' => true,
            'estado' => EstadoActividad::PublicadaAgenda,
        ]);
    }

    public function enEjecucion(): static
    {
        return $this->state(fn (): array => ['estado' => EstadoActividad::EnEjecucion]);
    }

    public function cerrada(): static
    {
        return $this->state(fn (): array => [
            'estado' => EstadoActividad::Cerrada,
            'resultados' => 'Se alcanzaron los objetivos previstos.',
            'fecha_cierre' => Carbon::now(),
        ]);
    }

    public function logroNoProgramado(): static
    {
        return $this->state(fn (): array => [
            'es_logro_no_programado' => true,
            'estado' => EstadoActividad::Cerrada,
            'resultados' => 'Logro registrado fuera de la programación mensual.',
            'fecha_cierre' => Carbon::now(),
        ]);
    }

    public function enFecha(string $fecha): static
    {
        return $this->state(fn (): array => ['fecha' => $fecha]);
    }
}
