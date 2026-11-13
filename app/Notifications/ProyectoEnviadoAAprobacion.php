<?php

namespace App\Notifications;

use App\Models\Proyecto;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Avisa a Dirección y Planificación que hay un proyecto por aprobar (RF-2.03).
 */
class ProyectoEnviadoAAprobacion extends Notification
{
    use Queueable;

    public function __construct(public Proyecto $proyecto) {}

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
            ->subject('Proyecto por aprobar: '.$this->proyecto->nombre)
            ->greeting('Nuevo proyecto en revisión')
            ->line($this->proyecto->unidad->nombre.' envió el proyecto "'.$this->proyecto->nombre.'".')
            ->action('Revisar el proyecto', route('proyectos.show', $this->proyecto))
            ->salutation('Sistema Interno de Gestión de la Extensión Universitaria');
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'tipo' => 'proyecto_enviado',
            'titulo' => 'Proyecto por aprobar',
            'mensaje' => $this->proyecto->unidad->nombre.' envió "'.$this->proyecto->nombre.'".',
            'ruta' => route('proyectos.show', $this->proyecto),
        ];
    }
}
