<?php

namespace App\Enums;

/**
 * Ciclo de vida de una actividad (sección 4.2 de los requerimientos).
 */
enum EstadoActividad: string
{
    case Borrador = 'borrador';
    case Enviada = 'enviada';
    case Observada = 'observada';
    case Validada = 'validada';
    case PublicadaAgenda = 'publicada_agenda';
    case Reprogramada = 'reprogramada';
    case EnEjecucion = 'en_ejecucion';
    case Cerrada = 'cerrada';
    case Rechazada = 'rechazada';
    case Cancelada = 'cancelada';

    public function nombre(): string
    {
        return match ($this) {
            self::Borrador => 'Borrador',
            self::Enviada => 'Enviada a revisión',
            self::Observada => 'Observada',
            self::Validada => 'Validada',
            self::PublicadaAgenda => 'Publicada en agenda',
            self::Reprogramada => 'Reprogramada',
            self::EnEjecucion => 'En ejecución',
            self::Cerrada => 'Cerrada',
            self::Rechazada => 'Rechazada',
            self::Cancelada => 'Cancelada',
        };
    }

    /**
     * Solo se editan los datos de programación mientras la actividad no se ha
     * validado (RF-1.02).
     */
    public function esEditable(): bool
    {
        return in_array($this, [self::Borrador, self::Observada], true);
    }

    public function esFinal(): bool
    {
        return in_array($this, [self::Cerrada, self::Rechazada, self::Cancelada], true);
    }

    /**
     * Estados en los que la actividad ya está aprobada y aún puede ejecutarse.
     *
     * @return array<int, self>
     */
    public static function programadas(): array
    {
        return [self::Validada, self::PublicadaAgenda, self::Reprogramada];
    }

    /**
     * Estados en los que se puede publicar la actividad en la Agenda Cultural
     * o quitarla de ella (RF-1.03). Antes de validarse la decisión vive en la
     * casilla del formulario; después, en las acciones de la ficha.
     */
    public function admiteCambioDeAgenda(): bool
    {
        return in_array($this, [
            self::Validada,
            self::PublicadaAgenda,
            self::Reprogramada,
            self::EnEjecucion,
            self::Cerrada,
        ], true);
    }

    /**
     * Transiciones permitidas desde este estado.
     *
     * @return array<int, self>
     */
    public function siguientes(): array
    {
        return match ($this) {
            self::Borrador => [self::Enviada, self::Cancelada],
            self::Enviada => [self::Validada, self::PublicadaAgenda, self::Observada, self::Rechazada],
            self::Observada => [self::Enviada, self::Cancelada],
            // Validada y publicada en agenda son la misma etapa: se pasa de una
            // a otra al publicar la actividad o al quitarla de la agenda.
            self::Validada => [self::PublicadaAgenda, self::EnEjecucion, self::Reprogramada, self::Cancelada],
            self::PublicadaAgenda => [self::Validada, self::EnEjecucion, self::Reprogramada, self::Cancelada],
            self::Reprogramada => [self::EnEjecucion, self::Reprogramada, self::Cancelada],
            self::EnEjecucion => [self::Cerrada, self::Cancelada],
            self::Cerrada, self::Rechazada, self::Cancelada => [],
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
