<?php

namespace App\Actions\Proyectos;

use App\Enums\AccionRevision;
use App\Enums\EstadoProyecto;
use App\Enums\Rol;
use App\Models\Proyecto;
use App\Models\User;
use App\Notifications\ProyectoEnviadoAAprobacion;
use App\Notifications\ProyectoResuelto;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

/**
 * Envío a aprobación y resolución del proyecto (RF-2.03, RF-2.04).
 */
class GestionarAprobacion
{
    public function enviar(Proyecto $proyecto, User $usuario): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::EnRevision);
        $this->exigirFormulacion($proyecto);

        return DB::transaction(function () use ($proyecto, $usuario): Proyecto {
            $proyecto->update(['estado' => EstadoProyecto::EnRevision]);
            $this->registrar($proyecto, $usuario, AccionRevision::Envio);
            $this->avisarAAprobadores($proyecto);

            return $proyecto;
        });
    }

    public function aprobar(Proyecto $proyecto, User $aprobador, ?string $comentario = null): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::Aprobado);

        return DB::transaction(function () use ($proyecto, $aprobador, $comentario): Proyecto {
            $proyecto->update(['estado' => EstadoProyecto::Aprobado, 'motivo_estado' => null]);
            $this->registrar($proyecto, $aprobador, AccionRevision::Validacion, $comentario);
            $this->avisarALaUnidad($proyecto, AccionRevision::Validacion, $comentario);

            return $proyecto;
        });
    }

    public function observar(Proyecto $proyecto, User $aprobador, string $comentario): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::Observado);

        return DB::transaction(function () use ($proyecto, $aprobador, $comentario): Proyecto {
            $proyecto->update(['estado' => EstadoProyecto::Observado, 'motivo_estado' => $comentario]);
            $this->registrar($proyecto, $aprobador, AccionRevision::Observacion, $comentario);
            $this->avisarALaUnidad($proyecto, AccionRevision::Observacion, $comentario);

            return $proyecto;
        });
    }

    public function rechazar(Proyecto $proyecto, User $aprobador, string $comentario): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::Rechazado);

        return DB::transaction(function () use ($proyecto, $aprobador, $comentario): Proyecto {
            $proyecto->update(['estado' => EstadoProyecto::Rechazado, 'motivo_estado' => $comentario]);
            $this->registrar($proyecto, $aprobador, AccionRevision::Rechazo, $comentario);
            $this->avisarALaUnidad($proyecto, AccionRevision::Rechazo, $comentario);

            return $proyecto;
        });
    }

    /**
     * Notifica a Dirección y Planificación (RF-T.07).
     */
    private function avisarAAprobadores(Proyecto $proyecto): void
    {
        $aprobadores = User::query()
            ->activos()
            ->whereHas('roles', fn ($query) => $query->whereIn('slug', [
                Rol::Direccion->value,
                Rol::Validador->value,
                Rol::Administrador->value,
            ]))
            ->get();

        Notification::send($aprobadores, new ProyectoEnviadoAAprobacion($proyecto->load('unidad')));
    }

    private function avisarALaUnidad(Proyecto $proyecto, AccionRevision $accion, ?string $comentario): void
    {
        $destinatarios = User::query()
            ->activos()
            ->whereKey(array_filter([$proyecto->responsable_id, $proyecto->creado_por]))
            ->get();

        Notification::send($destinatarios, new ProyectoResuelto($proyecto, $accion, $comentario));
    }

    private function registrar(
        Proyecto $proyecto,
        User $usuario,
        AccionRevision $accion,
        ?string $comentario = null,
    ): void {
        $proyecto->revisiones()->create([
            'user_id' => $usuario->id,
            'accion' => $accion,
            'comentario' => $comentario,
        ]);
    }

    /**
     * Un proyecto sin objetivos ni cronograma no está formulado (RF-2.02).
     */
    private function exigirFormulacion(Proyecto $proyecto): void
    {
        if ($proyecto->objetivos()->count() === 0) {
            throw ValidationException::withMessages([
                'estado' => 'Registre al menos un objetivo específico antes de enviar el proyecto.',
            ]);
        }

        if ($proyecto->cronograma()->count() === 0) {
            throw ValidationException::withMessages([
                'estado' => 'Registre el cronograma antes de enviar el proyecto.',
            ]);
        }
    }

    private function exigirTransicion(Proyecto $proyecto, EstadoProyecto $destino): void
    {
        if (! $proyecto->estado->permiteTransicionA($destino)) {
            throw ValidationException::withMessages([
                'estado' => 'El proyecto está '.mb_strtolower($proyecto->estado->nombre())
                    .' y no puede pasar a '.mb_strtolower($destino->nombre()).'.',
            ]);
        }
    }
}
