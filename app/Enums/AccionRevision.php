<?php

namespace App\Enums;

/**
 * Acciones registradas en el historial de revisión de una actividad (RF-1.02).
 */
enum AccionRevision: string
{
    case Envio = 'envio';
    case Validacion = 'validacion';
    case Observacion = 'observacion';
    case Rechazo = 'rechazo';
    case Reprogramacion = 'reprogramacion';
    case Cancelacion = 'cancelacion';
    case Cierre = 'cierre';
    case PublicacionAgenda = 'publicacion_agenda';
    case RetiroAgenda = 'retiro_agenda';

    public function nombre(): string
    {
        return match ($this) {
            self::Envio => 'Enviada a revisión',
            self::Validacion => 'Validada',
            self::Observacion => 'Observada',
            self::Rechazo => 'Rechazada',
            self::Reprogramacion => 'Reprogramada',
            self::Cancelacion => 'Cancelada',
            self::Cierre => 'Cerrada',
            self::PublicacionAgenda => 'Publicada en la Agenda Cultural',
            self::RetiroAgenda => 'Retirada de la Agenda Cultural',
        };
    }
}
