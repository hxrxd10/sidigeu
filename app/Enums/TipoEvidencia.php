<?php

namespace App\Enums;

/**
 * Tipos de evidencia que respaldan una actividad (RF-1.06).
 */
enum TipoEvidencia: string
{
    case Fotografia = 'fotografia';
    case Documento = 'documento';
    case Enlace = 'enlace';

    public function nombre(): string
    {
        return match ($this) {
            self::Fotografia => 'Fotografía',
            self::Documento => 'Documento',
            self::Enlace => 'Enlace',
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
