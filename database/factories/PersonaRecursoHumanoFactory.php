<?php

namespace Database\Factories;

use App\Enums\TipoPersona;
use App\Models\Disciplina;
use App\Models\Pais;
use App\Models\PersonaRecursoHumano;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<PersonaRecursoHumano>
 */
class PersonaRecursoHumanoFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipo = fake()->randomElement(TipoPersona::cases());

        return [
            'tipo' => $tipo,
            'disciplina_id' => Disciplina::factory()->deTipo($tipo),
            'agrupacion_id' => null,
            'nombres' => fake()->firstName(),
            'apellidos' => fake()->lastName(),
            // Reutiliza Guatemala si ya existe: el código ISO es único.
            'pais_id' => Pais::query()->where('codigo', 'GT')->value('id')
                ?? Pais::factory()->guatemala(),
            'fecha_nacimiento' => fake()->dateTimeBetween('-45 years', '-18 years')->format('Y-m-d'),
            'dpi' => fake()->unique()->numerify('#############'),
            'pasaporte' => null,
            'fecha_alta' => Carbon::today()->subYears(2)->toDateString(),
            'activo' => true,
        ];
    }

    /**
     * Cada persona arranca con su primer período de permanencia abierto.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (PersonaRecursoHumano $persona): void {
            $persona->periodos()->create([
                'fecha_alta' => $persona->fecha_alta,
                'fecha_baja' => $persona->fecha_baja,
                'motivo_baja' => $persona->motivo_baja,
            ]);
        });
    }

    public function artista(): static
    {
        return $this->state(fn (): array => [
            'tipo' => TipoPersona::Artista,
            'disciplina_id' => Disciplina::factory()->deTipo(TipoPersona::Artista),
        ]);
    }

    public function deportista(): static
    {
        return $this->state(fn (): array => [
            'tipo' => TipoPersona::Deportista,
            'disciplina_id' => Disciplina::factory()->deTipo(TipoPersona::Deportista),
        ]);
    }

    /**
     * Persona extranjera: se identifica con pasaporte en lugar de DPI (RN-4.01).
     */
    public function extranjera(): static
    {
        return $this->state(fn (): array => [
            'pais_id' => Pais::factory(),
            'dpi' => null,
            'pasaporte' => fake()->unique()->bothify('??######'),
        ]);
    }

    public function inactiva(?string $fechaBaja = null): static
    {
        return $this->state(fn (): array => [
            'activo' => false,
            'fecha_baja' => $fechaBaja ?? Carbon::today()->subMonths(3)->toDateString(),
            'motivo_baja' => 'Fin de su participación en el programa',
        ]);
    }
}
