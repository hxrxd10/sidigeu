<?php

namespace App\Actions\Actividades;

use App\Enums\AccionRevision;
use App\Enums\EstadoActividad;
use App\Models\Actividad;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Ejecución, reprogramación y cancelación de una actividad (RF-1.05).
 */
class GestionarEjecucion
{
    public function __construct(private ReservarEspacio $reserva) {}

    public function iniciar(Actividad $actividad, User $usuario): Actividad
    {
        $this->exigirTransicion($actividad, EstadoActividad::EnEjecucion);

        $actividad->update(['estado' => EstadoActividad::EnEjecucion]);

        return $actividad;
    }

    /**
     * Guarda la fecha anterior en el historial y vuelve a validar el espacio.
     */
    public function reprogramar(
        Actividad $actividad,
        User $usuario,
        string $fechaNueva,
        ?string $horaInicio,
        ?string $horaFin,
        ?string $motivo = null,
    ): Actividad {
        $this->exigirTransicion($actividad, EstadoActividad::Reprogramada);

        return DB::transaction(function () use ($actividad, $usuario, $fechaNueva, $horaInicio, $horaFin, $motivo): Actividad {
            $fechaAnterior = $actividad->fecha->toDateString();

            $actividad->update([
                'fecha' => $fechaNueva,
                'hora_inicio' => $horaInicio,
                'hora_fin' => $horaFin,
                'estado' => EstadoActividad::Reprogramada,
            ]);

            $this->reserva->sincronizar($actividad->refresh()->load(['espacio', 'unidad', 'responsable']), $usuario);

            $actividad->reprogramaciones()->create([
                'fecha_anterior' => $fechaAnterior,
                'fecha_nueva' => $fechaNueva,
                'motivo' => $motivo,
                'user_id' => $usuario->id,
            ]);

            $actividad->revisiones()->create([
                'user_id' => $usuario->id,
                'accion' => AccionRevision::Reprogramacion,
                'comentario' => $motivo,
            ]);

            return $actividad;
        });
    }

    public function cancelar(Actividad $actividad, User $usuario, string $motivo): Actividad
    {
        $this->exigirTransicion($actividad, EstadoActividad::Cancelada);

        return DB::transaction(function () use ($actividad, $usuario, $motivo): Actividad {
            $actividad->update([
                'estado' => EstadoActividad::Cancelada,
                'motivo_cancelacion' => $motivo,
            ]);

            $this->reserva->liberar($actividad);

            $actividad->revisiones()->create([
                'user_id' => $usuario->id,
                'accion' => AccionRevision::Cancelacion,
                'comentario' => $motivo,
            ]);

            return $actividad;
        });
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
