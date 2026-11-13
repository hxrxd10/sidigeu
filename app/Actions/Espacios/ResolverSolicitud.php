<?php

namespace App\Actions\Espacios;

use App\Enums\EstadoSolicitud;
use App\Models\SolicitudEspacio;
use App\Models\User;
use App\Notifications\SolicitudEspacioResuelta;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

/**
 * Aprueba o rechaza una solicitud y notifica al solicitante (RF-3.05, RF-3.11).
 */
class ResolverSolicitud
{
    public function __construct(private VerificarDisponibilidad $disponibilidad) {}

    /**
     * Antes de aprobar se vuelve a verificar el traslape, porque pudo haberse
     * aprobado otra solicitud mientras esta esperaba.
     */
    public function aprobar(SolicitudEspacio $solicitud, User $resolutor): SolicitudEspacio
    {
        return DB::transaction(function () use ($solicitud, $resolutor): SolicitudEspacio {
            $solicitud = SolicitudEspacio::query()->lockForUpdate()->findOrFail($solicitud->id);

            if (! $solicitud->espacio->estado->admiteReservas()) {
                throw ValidationException::withMessages([
                    'estado' => 'El espacio no admite reservas: está inactivo o en mantenimiento.',
                ]);
            }

            $conflictos = $this->disponibilidad->conflictos(
                $solicitud->espacio_id,
                $solicitud->fecha->toDateString(),
                $solicitud->hora_inicio,
                $solicitud->hora_fin,
                $solicitud->id,
            );

            if ($conflictos->isNotEmpty()) {
                throw ValidationException::withMessages([
                    'estado' => 'El horario ya está ocupado por otra reserva aprobada.',
                ]);
            }

            $solicitud->update([
                'estado' => EstadoSolicitud::Aprobada,
                'resuelto_por' => $resolutor->id,
                'fecha_resolucion' => now(),
                'motivo_rechazo' => null,
            ]);

            $this->notificar($solicitud);

            return $solicitud;
        });
    }

    public function rechazar(SolicitudEspacio $solicitud, User $resolutor, string $motivo): SolicitudEspacio
    {
        $solicitud->update([
            'estado' => EstadoSolicitud::Rechazada,
            'resuelto_por' => $resolutor->id,
            'fecha_resolucion' => now(),
            'motivo_rechazo' => $motivo,
        ]);

        $this->notificar($solicitud);

        return $solicitud;
    }

    public function cancelar(SolicitudEspacio $solicitud, User $resolutor, ?string $motivo = null): SolicitudEspacio
    {
        $solicitud->update([
            'estado' => EstadoSolicitud::Cancelada,
            'resuelto_por' => $resolutor->id,
            'fecha_resolucion' => now(),
            'motivo_rechazo' => $motivo,
        ]);

        return $solicitud;
    }

    /**
     * El solicitante puede ser externo, así que se notifica a su correo.
     */
    private function notificar(SolicitudEspacio $solicitud): void
    {
        Notification::route('mail', $solicitud->correo)
            ->notify(new SolicitudEspacioResuelta($solicitud->load('espacio.sede')));
    }
}
