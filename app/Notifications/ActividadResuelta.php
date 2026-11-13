<?php

namespace App\Notifications;

use App\Enums\AccionRevision;
use App\Models\Actividad;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Informa a la unidad el resultado de la revisión de su actividad (RF-T.07).
 */
class ActividadResuelta extends Notification
{
    use Queueable;

    public function __construct(
        public Actividad $actividad,
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
            ->subject($this->accion->nombre().': '.$this->actividad->nombre)
            ->greeting('Resultado de la revisión')
            ->line('La actividad "'.$this->actividad->nombre.'" fue '.mb_strtolower($this->accion->nombre()).'.');

        if ($this->comentario !== null) {
            $mensaje->line('Comentario: '.$this->comentario);
        }

        return $mensaje
            ->action('Ver la actividad', route('actividades.show', $this->actividad))
            ->salutation('Sistema Interno de Gestión de la Extensión Universitaria');
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'tipo' => 'actividad_resuelta',
            'titulo' => $this->accion->nombre(),
            'mensaje' => '"'.$this->actividad->nombre.'": '.($this->comentario ?? 'sin comentarios.'),
            'ruta' => route('actividades.show', $this->actividad),
        ];
    }
}
