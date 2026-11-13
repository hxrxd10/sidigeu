<?php

namespace App\Actions\Actividades;

use App\Enums\AccionRevision;
use App\Enums\EstadoActividad;
use App\Enums\Rol;
use App\Models\Actividad;
use App\Models\User;
use App\Notifications\ActividadEnviadaARevision;
use App\Notifications\ActividadResuelta;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

/**
 * Envío, validación, observación y rechazo de una actividad (RF-1.02, RF-1.03).
 */
class GestionarRevision
{
    public function __construct(private ReservarEspacio $reserva) {}

    public function enviar(Actividad $actividad, User $usuario): Actividad
    {
        $this->exigirTransicion($actividad, EstadoActividad::Enviada);

        return DB::transaction(function () use ($actividad, $usuario): Actividad {
            $actividad->update(['estado' => EstadoActividad::Enviada]);
            $this->registrar($actividad, $usuario, AccionRevision::Envio);
            $this->avisarAValidadores($actividad);

            return $actividad;
        });
    }

    /**
     * Al validar, la actividad con bandera de agenda se publica y su reserva de
     * espacio queda confirmada.
     */
    public function validar(Actividad $actividad, User $validador, ?string $comentario = null): Actividad
    {
        $destino = $actividad->publicar_agenda
            ? EstadoActividad::PublicadaAgenda
            : EstadoActividad::Validada;

        $this->exigirTransicion($actividad, $destino);

        return DB::transaction(function () use ($actividad, $validador, $comentario, $destino): Actividad {
            $actividad->update(['estado' => $destino]);
            $this->reserva->confirmar($actividad->load(['espacio', 'reservas']), $validador);
            $this->registrar($actividad, $validador, AccionRevision::Validacion, $comentario);
            $this->avisarALaUnidad($actividad, AccionRevision::Validacion, $comentario);

            return $actividad;
        });
    }

    /**
     * Publica en la Agenda Cultural una actividad ya validada (RF-1.03). La
     * actividad no necesita estar en un espacio de la DIGEU: basta con que
     * tenga un lugar, sea del catálogo o externo.
     */
    public function publicarEnAgenda(Actividad $actividad, User $usuario): Actividad
    {
        return $this->cambiarAgenda($actividad, $usuario, publicar: true);
    }

    /**
     * Quita la actividad de la Agenda Cultural sin cancelarla: sigue su curso
     * en el sistema, solo deja de verse en el portal público.
     */
    public function quitarDeAgenda(Actividad $actividad, User $usuario): Actividad
    {
        return $this->cambiarAgenda($actividad, $usuario, publicar: false);
    }

    private function cambiarAgenda(Actividad $actividad, User $usuario, bool $publicar): Actividad
    {
        $this->exigirCambioDeAgenda($actividad, $publicar);

        // Solo mientras la actividad está en la etapa de validación el estado
        // acompaña a la bandera; después basta con la bandera.
        $destino = match (true) {
            $publicar && $actividad->estado === EstadoActividad::Validada => EstadoActividad::PublicadaAgenda,
            ! $publicar && $actividad->estado === EstadoActividad::PublicadaAgenda => EstadoActividad::Validada,
            default => null,
        };

        if ($destino instanceof EstadoActividad) {
            $this->exigirTransicion($actividad, $destino);
        }

        $accion = $publicar ? AccionRevision::PublicacionAgenda : AccionRevision::RetiroAgenda;

        return DB::transaction(function () use ($actividad, $usuario, $publicar, $destino, $accion): Actividad {
            $datos = ['publicar_agenda' => $publicar];

            if ($destino instanceof EstadoActividad) {
                $datos['estado'] = $destino;
            }

            $actividad->update($datos);

            $this->registrar($actividad, $usuario, $accion);
            $this->avisarALaUnidad($actividad, $accion, null);

            return $actividad;
        });
    }

    private function exigirCambioDeAgenda(Actividad $actividad, bool $publicar): void
    {
        if (! $actividad->estado->admiteCambioDeAgenda()) {
            throw ValidationException::withMessages([
                'publicar_agenda' => 'La actividad está '.mb_strtolower($actividad->estado->nombre())
                    .': la publicación en la Agenda Cultural se decide en el formulario hasta que se valida.',
            ]);
        }

        if ($actividad->publicar_agenda === $publicar) {
            throw ValidationException::withMessages([
                'publicar_agenda' => $publicar
                    ? 'La actividad ya está publicada en la Agenda Cultural.'
                    : 'La actividad no está publicada en la Agenda Cultural.',
            ]);
        }
    }

    public function observar(Actividad $actividad, User $validador, string $comentario): Actividad
    {
        $this->exigirTransicion($actividad, EstadoActividad::Observada);

        return DB::transaction(function () use ($actividad, $validador, $comentario): Actividad {
            $actividad->update(['estado' => EstadoActividad::Observada]);
            $this->registrar($actividad, $validador, AccionRevision::Observacion, $comentario);
            $this->avisarALaUnidad($actividad, AccionRevision::Observacion, $comentario);

            return $actividad;
        });
    }

    public function rechazar(Actividad $actividad, User $validador, string $comentario): Actividad
    {
        $this->exigirTransicion($actividad, EstadoActividad::Rechazada);

        return DB::transaction(function () use ($actividad, $validador, $comentario): Actividad {
            $actividad->update(['estado' => EstadoActividad::Rechazada]);
            $this->reserva->liberar($actividad);
            $this->registrar($actividad, $validador, AccionRevision::Rechazo, $comentario);
            $this->avisarALaUnidad($actividad, AccionRevision::Rechazo, $comentario);

            return $actividad;
        });
    }

    /**
     * Notifica a quienes validan la programación (RF-T.07).
     */
    private function avisarAValidadores(Actividad $actividad): void
    {
        $validadores = User::query()
            ->activos()
            ->whereHas('roles', fn ($query) => $query->whereIn('slug', [
                Rol::Validador->value,
                Rol::Administrador->value,
            ]))
            ->get();

        Notification::send($validadores, new ActividadEnviadaARevision($actividad->load('unidad')));
    }

    /**
     * Notifica al responsable y a quien registró la actividad.
     */
    private function avisarALaUnidad(Actividad $actividad, AccionRevision $accion, ?string $comentario): void
    {
        $destinatarios = User::query()
            ->activos()
            ->whereKey(array_filter([$actividad->responsable_id, $actividad->creado_por]))
            ->get();

        Notification::send($destinatarios, new ActividadResuelta($actividad, $accion, $comentario));
    }

    private function registrar(
        Actividad $actividad,
        User $usuario,
        AccionRevision $accion,
        ?string $comentario = null,
    ): void {
        $actividad->revisiones()->create([
            'user_id' => $usuario->id,
            'accion' => $accion,
            'comentario' => $comentario,
        ]);
    }

    private function exigirTransicion(Actividad $actividad, EstadoActividad $destino): void
    {
        if (! $actividad->estado->permiteTransicionA($destino)) {
            throw ValidationException::withMessages([
                'estado' => 'La actividad está '.mb_strtolower($actividad->estado->nombre())
                    .' y no puede pasar a '.mb_strtolower($destino->nombre()).'.',
            ]);
        }
    }
}
