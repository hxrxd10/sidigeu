<?php

namespace App\Notifications;

use App\Models\Actividad;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Avisa a quienes validan que una unidad envió una actividad (RF-1.02, RF-T.07).
 */
class ActividadEnviadaARevision extends Notification
{
    use Queueable;

    public function __construct(public Actividad $actividad) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Actividad enviada a revisión: '.$this->actividad->nombre)
            ->greeting('Nueva actividad por validar')
            ->line($this->actividad->unidad->nombre.' envió "'.$this->actividad->nombre.'" para su revisión.')
            ->line('Fecha programada: '.$this->actividad->fecha->format('d-m-Y').'.')
            ->action('Revisar la actividad', route('actividades.show', $this->actividad))
            ->salutation('Sistema Interno de Gestión de la Extensión Universitaria');
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'tipo' => 'actividad_enviada',
            'titulo' => 'Actividad por validar',
            'mensaje' => $this->actividad->unidad->nombre.' envió "'.$this->actividad->nombre.'".',
            'ruta' => route('actividades.show', $this->actividad),
        ];
    }
}
