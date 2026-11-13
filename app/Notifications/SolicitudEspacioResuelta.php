<?php

namespace App\Notifications;

use App\Enums\EstadoSolicitud;
use App\Models\SolicitudEspacio;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Informa al solicitante el resultado de su solicitud (RF-3.11).
 */
class SolicitudEspacioResuelta extends Notification
{
    use Queueable;

    public function __construct(public SolicitudEspacio $solicitud) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $espacio = $this->solicitud->espacio;
        $aprobada = $this->solicitud->estado === EstadoSolicitud::Aprobada;

        $mensaje = (new MailMessage)
            ->subject(($aprobada ? 'Solicitud aprobada: ' : 'Solicitud rechazada: ').$espacio->nombre)
            ->greeting('Estimado/a '.$this->solicitud->solicitante_nombre)
            ->line(
                $aprobada
                    ? 'Su solicitud para usar '.$espacio->nombre.' fue aprobada.'
                    : 'Su solicitud para usar '.$espacio->nombre.' no pudo ser aprobada.'
            )
            ->line('Fecha: '.$this->solicitud->fecha->format('d-m-Y').', de '.$this->solicitud->horaInicioCorta().' a '.$this->solicitud->horaFinCorta().'.');

        if (! $aprobada && $this->solicitud->motivo_rechazo !== null) {
            $mensaje->line('Motivo: '.$this->solicitud->motivo_rechazo);
        }

        if ($aprobada && $espacio->condiciones_uso !== null) {
            $mensaje->line('Condiciones de uso: '.$espacio->condiciones_uso);
        }

        return $mensaje->salutation('Dirección General de Extensión Universitaria');
    }
}
