<?php

namespace App\Http\Controllers\Actividades;

use App\Actions\Actividades\GestionarRevision;
use App\Enums\EstadoActividad;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use App\Models\Unidad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Bandeja de revisión y validación de actividades (RF-1.02, CU-07).
 */
class RevisionActividadController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Actividad::class);

        $filtros = [
            'unidad_id' => $request->integer('unidad_id'),
            'estado' => $request->string('estado')->toString() ?: EstadoActividad::Enviada->value,
        ];

        $actividades = Actividad::query()
            ->with(['unidad:id,nombre', 'tipoActividad:id,nombre', 'espacio:id,nombre', 'responsable:id,name'])
            ->when($filtros['unidad_id'], fn ($query, $id) => $query->where('unidad_id', $id))
            ->when($filtros['estado'] !== 'todas', fn ($query) => $query->where('estado', $filtros['estado']))
            ->orderBy('fecha')
            ->paginate(20)
            ->withQueryString()
            ->through(fn (Actividad $actividad): array => [
                'id' => $actividad->id,
                'nombre' => $actividad->nombre,
                'unidad' => $actividad->unidad->nombre,
                'fecha' => $actividad->fecha->toDateString(),
                'hora_inicio' => $actividad->horaInicioCorta(),
                'lugar' => $actividad->lugar,
                'tipo' => $actividad->tipoActividad->nombre,
                'responsable' => $actividad->responsable?->name,
                'publicar_agenda' => $actividad->publicar_agenda,
                'estado' => $actividad->estado->value,
                'estado_nombre' => $actividad->estado->nombre(),
                'puede_validar' => Gate::allows('validar', $actividad),
            ]);

        return Inertia::render('actividades/revision', [
            'actividades' => $actividades,
            'filtros' => $filtros,
            'estados' => EstadoActividad::opciones(),
            'unidades' => Unidad::query()->activas()->orderBy('nombre')->get()
                ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])->all(),
        ]);
    }

    /**
     * El coordinador envía la actividad a revisión (RF-1.02).
     */
    public function enviar(Actividad $actividad, GestionarRevision $revision): RedirectResponse
    {
        Gate::authorize('enviar', $actividad);

        $revision->enviar($actividad, request()->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad enviada a revisión.']);

        return back();
    }

    public function validar(Request $request, Actividad $actividad, GestionarRevision $revision): RedirectResponse
    {
        Gate::authorize('validar', $actividad);

        $revision->validar($actividad, $request->user(), $request->string('comentario')->toString() ?: null);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $actividad->publicar_agenda
                ? 'Actividad validada y publicada en la Agenda Cultural.'
                : 'Actividad validada.',
        ]);

        return back();
    }

    /**
     * Publica en la Agenda Cultural una actividad ya validada (RF-1.03).
     */
    public function publicarAgenda(Actividad $actividad, GestionarRevision $revision): RedirectResponse
    {
        Gate::authorize('gestionarAgenda', $actividad);

        $revision->publicarEnAgenda($actividad, request()->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad publicada en la Agenda Cultural.']);

        return back();
    }

    /**
     * Quita la actividad de la Agenda Cultural sin cancelarla (RF-1.03).
     */
    public function quitarAgenda(Actividad $actividad, GestionarRevision $revision): RedirectResponse
    {
        Gate::authorize('gestionarAgenda', $actividad);

        $revision->quitarDeAgenda($actividad, request()->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad retirada de la Agenda Cultural.']);

        return back();
    }

    public function observar(Request $request, Actividad $actividad, GestionarRevision $revision): RedirectResponse
    {
        Gate::authorize('validar', $actividad);

        $datos = $request->validate(['comentario' => ['required', 'string', 'max:1000']]);

        $revision->observar($actividad, $request->user(), $datos['comentario']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad observada: vuelve a la unidad.']);

        return back();
    }

    public function rechazar(Request $request, Actividad $actividad, GestionarRevision $revision): RedirectResponse
    {
        Gate::authorize('validar', $actividad);

        $datos = $request->validate(['comentario' => ['required', 'string', 'max:1000']]);

        $revision->rechazar($actividad, $request->user(), $datos['comentario']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad rechazada.']);

        return back();
    }
}
