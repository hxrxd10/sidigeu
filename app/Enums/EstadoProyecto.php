<?php

namespace App\Enums;

/**
 * Ciclo de vida de un proyecto (sección 5.2 de los requerimientos).
 */
enum EstadoProyecto: string
{
    case Registrado = 'registrado';
    case EnFormulacion = 'en_formulacion';
    case EnRevision = 'en_revision';
    case Observado = 'observado';
    case Aprobado = 'aprobado';
    case EnEjecucion = 'en_ejecucion';
    case Cerrado = 'cerrado';
    case Rechazado = 'rechazado';
    case Suspendido = 'suspendido';
    case Cancelado = 'cancelado';

    public function nombre(): string
    {
        return match ($this) {
            self::Registrado => 'Registrado',
            self::EnFormulacion => 'En formulación',
            self::EnRevision => 'En revisión',
            self::Observado => 'Observado',
            self::Aprobado => 'Aprobado',
            self::EnEjecucion => 'En ejecución',
            self::Cerrado => 'Cerrado',
            self::Rechazado => 'Rechazado',
            self::Suspendido => 'Suspendido',
            self::Cancelado => 'Cancelado',
        };
    }

    /**
     * La formulación se edita mientras el proyecto no se ha enviado a revisión
     * o ha vuelto observado (RF-2.02).
     */
    public function esEditable(): bool
    {
        return in_array($this, [self::Registrado, self::EnFormulacion, self::Observado], true);
    }

    public function esFinal(): bool
    {
        return in_array($this, [self::Cerrado, self::Rechazado, self::Cancelado], true);
    }

    /**
     * Solo un proyecto aprobado o en ejecución registra avances (RF-2.04).
     */
    public function admiteEjecucion(): bool
    {
        return in_array($this, [self::Aprobado, self::EnEjecucion], true);
    }

    /**
     * @return array<int, self>
     */
    public function siguientes(): array
    {
        return match ($this) {
            self::Registrado => [self::EnFormulacion, self::EnRevision, self::Cancelado],
            self::EnFormulacion => [self::EnRevision, self::Cancelado],
            self::EnRevision => [self::Aprobado, self::Observado, self::Rechazado],
            self::Observado => [self::EnRevision, self::Cancelado],
            self::Aprobado => [self::EnEjecucion, self::Suspendido, self::Cancelado],
            self::EnEjecucion => [self::Cerrado, self::Suspendido, self::Cancelado],
            self::Suspendido => [self::EnEjecucion, self::Cancelado],
            self::Cerrado, self::Rechazado, self::Cancelado => [],
        };
    }

    public function permiteTransicionA(self $destino): bool
    {
        return in_array($destino, $this->siguientes(), true);
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
