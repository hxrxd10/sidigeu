<?php

namespace App\Notifications;

use App\Models\SolicitudEspacio;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Avisa al Administrador de espacios que entró una solicitud (RF-3.04).
 */
class SolicitudEspacioRecibida extends Notification
{
    use Queueable;

    public function __construct(public SolicitudEspacio $solicitud) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $espacio = $this->solicitud->espacio;

        return (new MailMessage)
            ->subject('Nueva solicitud de espacio: '.$espacio->nombre)
            ->greeting('Nueva solicitud de espacio')
            ->line($this->solicitud->solicitante_nombre.' solicitó '.$espacio->nombre.' ('.$espacio->sede->nombre.').')
            ->line('Fecha: '.$this->solicitud->fecha->format('d-m-Y').', de '.$this->solicitud->horaInicioCorta().' a '.$this->solicitud->horaFinCorta().'.')
            ->line('Propósito: '.$this->solicitud->proposito)
            ->action('Revisar la solicitud', route('solicitudes.index'))
            ->salutation('Sistema Interno de Gestión de la Extensión Universitaria');
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'tipo' => 'solicitud_espacio_recibida',
            'solicitud_id' => $this->solicitud->id,
            'espacio' => $this->solicitud->espacio->nombre,
            'solicitante' => $this->solicitud->solicitante_nombre,
            'fecha' => $this->solicitud->fecha->toDateString(),
        ];
    }
}
