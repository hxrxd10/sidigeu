<?php

namespace App\Enums;

/**
 * Tipo de recurso humano vinculado a la DIGEU (Módulo 4).
 */
enum TipoPersona: string
{
    case Artista = 'artista';
    case Deportista = 'deportista';

    public function nombre(): string
    {
        return match ($this) {
            self::Artista => 'Artista',
            self::Deportista => 'Deportista',
        };
    }

    public function plural(): string
    {
        return match ($this) {
            self::Artista => 'Artistas',
            self::Deportista => 'Deportistas',
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
