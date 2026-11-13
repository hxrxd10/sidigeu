<?php

namespace App\Actions\Espacios;

use App\Models\SolicitudEspacio;
use Illuminate\Support\Collection;

/**
 * Control de traslapes del calendario de ocupación (RF-1.08, RF-3.06).
 *
 * Solo las solicitudes aprobadas bloquean un horario; las pendientes se
 * muestran en el calendario pero no impiden otra reserva.
 */
class VerificarDisponibilidad
{
    /**
     * @return Collection<int, SolicitudEspacio>
     */
    public function conflictos(
        int $espacioId,
        string $fecha,
        string $horaInicio,
        string $horaFin,
        ?int $ignorarSolicitudId = null,
    ): Collection {
        return SolicitudEspacio::query()
            ->aprobadas()
            ->queSeTraslapanCon($espacioId, $fecha, $horaInicio, $horaFin)
            ->when($ignorarSolicitudId, fn ($query, $id) => $query->whereKeyNot($id))
            ->orderBy('hora_inicio')
            ->get();
    }

    public function estaLibre(
        int $espacioId,
        string $fecha,
        string $horaInicio,
        string $horaFin,
        ?int $ignorarSolicitudId = null,
    ): bool {
        return $this->conflictos($espacioId, $fecha, $horaInicio, $horaFin, $ignorarSolicitudId)->isEmpty();
    }
}
