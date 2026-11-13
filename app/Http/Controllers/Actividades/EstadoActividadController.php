<?php

namespace App\Http\Controllers\Actividades;

use App\Actions\Actividades\GestionarEjecucion;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

/**
 * Ejecución, reprogramación y cancelación de una actividad (RF-1.05).
 */
class EstadoActividadController extends Controller
{
    public function iniciar(Actividad $actividad, GestionarEjecucion $ejecucion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $actividad);

        $ejecucion->iniciar($actividad, request()->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'La actividad quedó en ejecución.']);

        return back();
    }

    public function reprogramar(Request $request, Actividad $actividad, GestionarEjecucion $ejecucion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $actividad);

        $datos = $request->validate([
            'fecha' => ['required', 'date'],
            'hora_inicio' => ['nullable', 'date_format:H:i'],
            'hora_fin' => ['nullable', 'date_format:H:i', 'after:hora_inicio'],
            'motivo' => ['nullable', 'string', 'max:255'],
        ]);

        $ejecucion->reprogramar(
            $actividad,
            $request->user(),
            $datos['fecha'],
            isset($datos['hora_inicio']) ? $datos['hora_inicio'].':00' : null,
            isset($datos['hora_fin']) ? $datos['hora_fin'].':00' : null,
            $datos['motivo'] ?? null,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad reprogramada: se guardó la fecha anterior.']);

        return back();
    }

    public function cancelar(Request $request, Actividad $actividad, GestionarEjecucion $ejecucion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $actividad);

        $datos = $request->validate(['motivo' => ['required', 'string', 'max:255']]);

        $ejecucion->cancelar($actividad, $request->user(), $datos['motivo']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad cancelada y espacio liberado.']);

        return back();
    }
}
