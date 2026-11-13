<?php

namespace App\Enums;

/**
 * Ciclo de vida de una solicitud de espacio (sección 6.3).
 */
enum EstadoSolicitud: string
{
    case Pendiente = 'pendiente';
    case Aprobada = 'aprobada';
    case Rechazada = 'rechazada';
    case Cancelada = 'cancelada';

    public function nombre(): string
    {
        return match ($this) {
            self::Pendiente => 'Pendiente de confirmación',
            self::Aprobada => 'Aprobada',
            self::Rechazada => 'Rechazada',
            self::Cancelada => 'Cancelada',
        };
    }

    /**
     * Solo una solicitud aprobada bloquea el horario del espacio (RF-3.05).
     */
    public function bloqueaHorario(): bool
    {
        return $this === self::Aprobada;
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
