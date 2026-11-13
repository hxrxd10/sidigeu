<?php

namespace App\Actions\Proyectos;

use App\Enums\EstadoActividad;
use App\Models\Actividad;
use App\Models\Proyecto;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

/**
 * Vinculación de actividades del Módulo 1 con un proyecto (RF-1.12, RF-2.06).
 *
 * Los resultados e indicadores de las actividades cerradas no se copian: se
 * consolidan al consultar el proyecto, de modo que siempre reflejan el estado
 * actual de cada actividad.
 */
class VincularActividad
{
    public function vincular(Proyecto $proyecto, Actividad $actividad): Actividad
    {
        if ($actividad->unidad_id !== $proyecto->unidad_id) {
            throw ValidationException::withMessages([
                'actividad_id' => 'La actividad pertenece a otra unidad administrativa.',
            ]);
        }

        if ($actividad->proyecto_id !== null && $actividad->proyecto_id !== $proyecto->id) {
            throw ValidationException::withMessages([
                'actividad_id' => 'La actividad ya está vinculada a otro proyecto.',
            ]);
        }

        $actividad->update(['proyecto_id' => $proyecto->id]);

        return $actividad;
    }

    public function desvincular(Proyecto $proyecto, Actividad $actividad): Actividad
    {
        if ($actividad->proyecto_id !== $proyecto->id) {
            throw ValidationException::withMessages([
                'actividad_id' => 'La actividad no pertenece a este proyecto.',
            ]);
        }

        $actividad->update(['proyecto_id' => null]);

        return $actividad;
    }

    /**
     * Aporte de las actividades cerradas del proyecto a cada indicador y a los
     * beneficiarios atendidos (RF-2.06).
     *
     * @return array{indicadores: array<int, float>, beneficiarios: int, actividades: int}
     */
    public function consolidado(Proyecto $proyecto): array
    {
        /** @var Collection<int, Actividad> $cerradas */
        $cerradas = $proyecto->actividades()
            ->with(['indicadores', 'beneficiarios'])
            ->where('estado', EstadoActividad::Cerrada)
            ->get();

        $indicadores = [];

        foreach ($cerradas as $actividad) {
            foreach ($actividad->indicadores as $indicador) {
                $indicadores[$indicador->id] = ($indicadores[$indicador->id] ?? 0)
                    + (float) $indicador->pivot->valor_alcanzado;
            }
        }

        return [
            'indicadores' => $indicadores,
            'beneficiarios' => (int) $cerradas->sum(
                fn (Actividad $actividad): int => $actividad->beneficiarios_total
            ),
            'actividades' => $cerradas->count(),
        ];
    }
}
