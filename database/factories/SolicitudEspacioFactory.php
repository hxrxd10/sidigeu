<?php

namespace Database\Factories;

use App\Enums\EstadoSolicitud;
use App\Models\Espacio;
use App\Models\SolicitudEspacio;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<SolicitudEspacio>
 */
class SolicitudEspacioFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'espacio_id' => Espacio::factory(),
            'fecha' => Carbon::today()->addWeek()->toDateString(),
            'hora_inicio' => '09:00:00',
            'hora_fin' => '11:00:00',
            'solicitante_nombre' => fake()->name(),
            'institucion' => fake()->company(),
            'correo' => fake()->unique()->safeEmail(),
            'telefono' => fake()->numerify('########'),
            'proposito' => 'Ensayo general de la agrupación.',
            'asistentes' => fake()->numberBetween(10, 100),
            'estado' => EstadoSolicitud::Pendiente,
        ];
    }

    public function aprobada(): static
    {
        return $this->state(fn (): array => [
            'estado' => EstadoSolicitud::Aprobada,
            'fecha_resolucion' => Carbon::now(),
        ]);
    }

    public function rechazada(): static
    {
        return $this->state(fn (): array => [
            'estado' => EstadoSolicitud::Rechazada,
            'fecha_resolucion' => Carbon::now(),
            'motivo_rechazo' => 'El espacio está reservado para una actividad institucional.',
        ]);
    }

    public function enHorario(string $fecha, string $inicio, string $fin): static
    {
        return $this->state(fn (): array => [
            'fecha' => $fecha,
            'hora_inicio' => $inicio,
            'hora_fin' => $fin,
        ]);
    }
}
