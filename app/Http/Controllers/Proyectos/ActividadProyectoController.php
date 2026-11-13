<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\VincularActividad;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use App\Models\Proyecto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

/**
 * Vinculación de actividades del Módulo 1 con un proyecto (RF-2.06).
 */
class ActividadProyectoController extends Controller
{
    public function store(Request $request, Proyecto $proyecto, VincularActividad $vinculacion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $datos = $request->validate([
            'actividad_id' => ['required', 'integer', 'exists:actividades,id'],
        ]);

        $vinculacion->vincular($proyecto, Actividad::query()->findOrFail((int) $datos['actividad_id']));

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Actividad vinculada: sus resultados suman al proyecto.',
        ]);

        return back();
    }

    public function destroy(Proyecto $proyecto, Actividad $actividad, VincularActividad $vinculacion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $vinculacion->desvincular($proyecto, $actividad);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad desvinculada.']);

        return back();
    }
}
