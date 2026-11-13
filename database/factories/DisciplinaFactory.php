<?php

namespace Database\Factories;

use App\Enums\TipoPersona;
use App\Models\Disciplina;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Disciplina>
 */
class DisciplinaFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => Str::ucfirst(fake()->unique()->word()),
            'tipo' => fake()->randomElement(TipoPersona::cases()),
            'activo' => true,
        ];
    }

    public function deTipo(TipoPersona $tipo): static
    {
        return $this->state(fn (): array => ['tipo' => $tipo]);
    }
}
