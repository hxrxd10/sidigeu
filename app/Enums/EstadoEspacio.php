<?php

namespace App\Enums;

/**
 * Estado operativo de un espacio (RF-3.12).
 */
enum EstadoEspacio: string
{
    case Activo = 'activo';
    case Inactivo = 'inactivo';
    case Mantenimiento = 'mantenimiento';

    public function nombre(): string
    {
        return match ($this) {
            self::Activo => 'Activo',
            self::Inactivo => 'Inactivo',
            self::Mantenimiento => 'En mantenimiento',
        };
    }

    /**
     * Un espacio inactivo o en mantenimiento no admite reservas nuevas.
     */
    public function admiteReservas(): bool
    {
        return $this === self::Activo;
    }

    /**
     * @return array<int, array{valor: string, nombre: string}>
     */
    public static function opciones(): array
    {
        return array_map(
            fn (self $estado): array => ['valor' => $estado->value, 'nombre' => $estado->nombre()],
            self::cases(),
        );
    }
}
