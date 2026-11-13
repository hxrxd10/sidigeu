<?php

namespace Database\Factories;

use App\Enums\Rol;
use App\Models\Role;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Usuario desactivado: no puede iniciar sesión (RF-T.03).
     */
    public function inactivo(): static
    {
        return $this->state(fn (array $attributes) => [
            'activo' => false,
        ]);
    }

    /**
     * Usuario asignado a una unidad administrativa.
     */
    public function enUnidad(Unidad|int $unidad): static
    {
        return $this->state(fn (array $attributes) => [
            'unidad_id' => $unidad instanceof Unidad ? $unidad->id : $unidad,
        ]);
    }

    /**
     * Usuario con los roles indicados, creándolos si aún no existen.
     */
    public function conRoles(Rol ...$roles): static
    {
        return $this->afterCreating(function (User $user) use ($roles): void {
            $ids = collect($roles)->map(fn (Rol $rol): int => Role::firstOrCreate(
                ['slug' => $rol],
                ['nombre' => $rol->nombre(), 'descripcion' => $rol->descripcion()],
            )->id);

            $user->roles()->syncWithoutDetaching($ids);
        });
    }
}
