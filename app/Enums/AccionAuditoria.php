<?php

namespace App\Enums;

/**
 * Acciones que registra la bitácora de auditoría (RF-T.05).
 */
enum AccionAuditoria: string
{
    case Creado = 'creado';
    case Actualizado = 'actualizado';
    case Eliminado = 'eliminado';
    case Restaurado = 'restaurado';
    case Consultado = 'consultado';

    public function nombre(): string
    {
        return match ($this) {
            self::Creado => 'Creado',
            self::Actualizado => 'Actualizado',
            self::Eliminado => 'Eliminado',
            self::Restaurado => 'Restaurado',
            self::Consultado => 'Consultado',
        };
    }
}
