<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\GestionarAprobacion;
use App\Enums\EstadoProyecto;
use App\Http\Controllers\Controller;
use App\Models\Proyecto;
use App\Models\Unidad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Bandeja de aprobación de proyectos (RF-2.03, CU-16).
 */
class AprobacionProyectoController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Proyecto::class);

        $filtros = [
            'estado' => $request->string('estado')->toString() ?: EstadoProyecto::EnRevision->value,
            'unidad_id' => $request->integer('unidad_id'),
        ];

        $proyectos = Proyecto::query()
            ->with(['unidad:id,nombre', 'responsable:id,name', 'tipoProyecto:id,nombre'])
            ->when($filtros['estado'] !== 'todos', fn ($query) => $query->where('estado', $filtros['estado']))
            ->when($filtros['unidad_id'], fn ($query, $id) => $query->where('unidad_id', $id))
            ->orderBy('updated_at')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Proyecto $proyecto): array => [
                'id' => $proyecto->id,
                'nombre' => $proyecto->nombre,
                'unidad' => $proyecto->unidad->nombre,
                'responsable' => $proyecto->responsable?->name,
                'tipo' => $proyecto->tipoProyecto?->nombre,
                'fecha_inicio' => $proyecto->fecha_inicio?->toDateString(),
                'estado' => $proyecto->estado->value,
                'estado_nombre' => $proyecto->estado->nombre(),
                'puede_aprobar' => Gate::allows('aprobar', $proyecto),
            ]);

        return Inertia::render('proyectos/aprobacion', [
            'proyectos' => $proyectos,
            'filtros' => $filtros,
            'estados' => EstadoProyecto::opciones(),
            'unidades' => Unidad::query()->activas()->orderBy('nombre')->get()
                ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])->all(),
        ]);
    }

    public function enviar(Proyecto $proyecto, GestionarAprobacion $aprobacion): RedirectResponse
    {
        Gate::authorize('enviar', $proyecto);

        $aprobacion->enviar($proyecto, request()->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto enviado a aprobación.']);

        return back();
    }

    public function aprobar(Request $request, Proyecto $proyecto, GestionarAprobacion $aprobacion): RedirectResponse
    {
        Gate::authorize('aprobar', $proyecto);

        $aprobacion->aprobar($proyecto, $request->user(), $request->string('comentario')->toString() ?: null);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto aprobado: ya puede ejecutarse.']);

        return back();
    }

    public function observar(Request $request, Proyecto $proyecto, GestionarAprobacion $aprobacion): RedirectResponse
    {
        Gate::authorize('aprobar', $proyecto);

        $datos = $request->validate(['comentario' => ['required', 'string', 'max:1000']]);

        $aprobacion->observar($proyecto, $request->user(), $datos['comentario']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto observado: vuelve a la unidad.']);

        return back();
    }

    public function rechazar(Request $request, Proyecto $proyecto, GestionarAprobacion $aprobacion): RedirectResponse
    {
        Gate::authorize('aprobar', $proyecto);

        $datos = $request->validate(['comentario' => ['required', 'string', 'max:1000']]);

        $aprobacion->rechazar($proyecto, $request->user(), $datos['comentario']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto rechazado.']);

        return back();
    }
}
