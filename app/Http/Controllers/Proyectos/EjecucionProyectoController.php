<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\GestionarEjecucionProyecto;
use App\Enums\TipoRecurso;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proyectos\AvanceProyectoRequest;
use App\Models\PersonaRecursoHumano;
use App\Models\Proyecto;
use App\Models\ProyectoPresupuesto;
use App\Models\ProyectoTarea;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Avances, recursos y estado de ejecución del proyecto (RF-2.05, RF-2.07).
 */
class EjecucionProyectoController extends Controller
{
    public function create(Proyecto $proyecto): Response
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $proyecto->load(['cronograma.responsable:id,name', 'presupuesto.fuente:id,nombre']);

        return Inertia::render('proyectos/avance', [
            'proyecto' => [
                'id' => $proyecto->id,
                'nombre' => $proyecto->nombre,
                'estado_nombre' => $proyecto->estado->nombre(),
                'avance_fisico' => $proyecto->avance_fisico,
                'cronograma' => $proyecto->cronograma->map(fn (ProyectoTarea $tarea): array => [
                    'id' => $tarea->id,
                    'tarea' => $tarea->tarea,
                    'avance' => $tarea->avance,
                    'responsable' => $tarea->responsable?->name,
                ])->all(),
                'presupuesto' => $proyecto->presupuesto->map(fn (ProyectoPresupuesto $renglon): array => [
                    'id' => $renglon->id,
                    'descripcion' => $renglon->descripcion,
                    'subtotal' => $renglon->subtotal(),
                    'ejecutado' => $renglon->ejecutado,
                ])->all(),
            ],
            'opciones' => [
                'tipos' => TipoRecurso::opciones(),
                'personas' => PersonaRecursoHumano::query()->activos()->orderBy('apellidos')->get()
                    ->map(fn (PersonaRecursoHumano $persona): array => [
                        'valor' => $persona->id,
                        'nombre' => $persona->nombre_completo,
                    ])->all(),
            ],
        ]);
    }

    public function store(
        AvanceProyectoRequest $request,
        Proyecto $proyecto,
        GestionarEjecucionProyecto $ejecucion,
    ): RedirectResponse {
        $ejecucion->registrarAvance($proyecto, $request->datos(), $request->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Avance registrado.']);

        return to_route('proyectos.show', $proyecto);
    }

    public function iniciar(Proyecto $proyecto, GestionarEjecucionProyecto $ejecucion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $ejecucion->iniciar($proyecto, request()->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'El proyecto quedó en ejecución.']);

        return back();
    }

    public function suspender(Request $request, Proyecto $proyecto, GestionarEjecucionProyecto $ejecucion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $datos = $request->validate(['motivo' => ['required', 'string', 'max:255']]);

        $ejecucion->suspender($proyecto, $request->user(), $datos['motivo']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto suspendido.']);

        return back();
    }

    public function cancelar(Request $request, Proyecto $proyecto, GestionarEjecucionProyecto $ejecucion): RedirectResponse
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $datos = $request->validate(['motivo' => ['required', 'string', 'max:255']]);

        $ejecucion->cancelar($proyecto, $request->user(), $datos['motivo']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto cancelado.']);

        return back();
    }
}
