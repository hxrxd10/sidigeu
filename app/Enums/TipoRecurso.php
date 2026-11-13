<?php

namespace App\Enums;

/**
 * Recursos ejecutados en un proyecto (RF-2.08).
 */
enum TipoRecurso: string
{
    case Humano = 'humano';
    case Material = 'material';
    case Financiero = 'financiero';

    public function nombre(): string
    {
        return match ($this) {
            self::Humano => 'Humano',
            self::Material => 'Material',
            self::Financiero => 'Financiero',
        };
    }

    /**
     * @return array<int, array{valor: string, nombre: string}>
     */
    public static function opciones(): array
    {
        return array_map(
            fn (self $tipo): array => ['valor' => $tipo->value, 'nombre' => $tipo->nombre()],
            self::cases(),
        );
    }
}
