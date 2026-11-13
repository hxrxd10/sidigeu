<?php

namespace App\Notifications;

use App\Enums\AccionRevision;
use App\Models\Proyecto;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Informa a la unidad el resultado de la aprobación de su proyecto (RF-T.07).
 */
class ProyectoResuelto extends Notification
{
    use Queueable;

    public function __construct(
        public Proyecto $proyecto,
        public AccionRevision $accion,
        public ?string $comentario = null,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mensaje = (new MailMessage)
            ->subject($this->accion->nombre().': '.$this->proyecto->nombre)
            ->greeting('Resultado de la aprobación')
            ->line('El proyecto "'.$this->proyecto->nombre.'" fue '.mb_strtolower($this->accion->nombre()).'.');

        if ($this->comentario !== null) {
            $mensaje->line('Comentario: '.$this->comentario);
        }

        return $mensaje
            ->action('Ver el proyecto', route('proyectos.show', $this->proyecto))
            ->salutation('Sistema Interno de Gestión de la Extensión Universitaria');
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'tipo' => 'proyecto_resuelto',
            'titulo' => $this->accion->nombre(),
            'mensaje' => '"'.$this->proyecto->nombre.'": '.($this->comentario ?? 'sin comentarios.'),
            'ruta' => route('proyectos.show', $this->proyecto),
        ];
    }
}
