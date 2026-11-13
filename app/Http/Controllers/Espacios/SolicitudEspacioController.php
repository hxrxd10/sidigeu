<?php

namespace App\Http\Controllers\Espacios;

use App\Actions\Espacios\ResolverSolicitud;
use App\Enums\EstadoSolicitud;
use App\Http\Controllers\Controller;
use App\Models\Espacio;
use App\Models\SolicitudEspacio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Bandeja de solicitudes de espacio (RF-3.05).
 */
class SolicitudEspacioController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', SolicitudEspacio::class);

        $filtros = [
            'estado' => $request->string('estado')->toString() ?: EstadoSolicitud::Pendiente->value,
            'espacio_id' => $request->integer('espacio_id'),
            'desde' => $request->string('desde')->toString(),
        ];

        $solicitudes = SolicitudEspacio::query()
            ->with(['espacio:id,nombre,sede_id', 'espacio.sede:id,nombre', 'resolutor:id,name'])
            ->when($filtros['estado'] !== 'todas', fn ($query) => $query->where('estado', $filtros['estado']))
            ->when($filtros['espacio_id'], fn ($query, $id) => $query->where('espacio_id', $id))
            ->when($filtros['desde'] !== '', fn ($query) => $query->whereDate('fecha', '>=', $filtros['desde']))
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (SolicitudEspacio $solicitud): array => [
                'id' => $solicitud->id,
                'espacio' => $solicitud->espacio->nombre,
                'sede' => $solicitud->espacio->sede->nombre,
                'fecha' => $solicitud->fecha->toDateString(),
                'hora_inicio' => $solicitud->horaInicioCorta(),
                'hora_fin' => $solicitud->horaFinCorta(),
                'solicitante_nombre' => $solicitud->solicitante_nombre,
                'institucion' => $solicitud->institucion,
                'correo' => $solicitud->correo,
                'telefono' => $solicitud->telefono,
                'proposito' => $solicitud->proposito,
                'asistentes' => $solicitud->asistentes,
                'requerimientos' => $solicitud->requerimientos,
                'estado' => $solicitud->estado->value,
                'estado_nombre' => $solicitud->estado->nombre(),
                'motivo_rechazo' => $solicitud->motivo_rechazo,
                'resuelto_por' => $solicitud->resolutor?->name,
            ]);

        return Inertia::render('espacios/solicitudes', [
            'solicitudes' => $solicitudes,
            'filtros' => $filtros,
            'estados' => EstadoSolicitud::opciones(),
            'espacios' => Espacio::query()->orderBy('nombre')->get()
                ->map(fn (Espacio $espacio): array => ['valor' => $espacio->id, 'nombre' => $espacio->nombre])->all(),
            'puedeResolver' => Gate::allows('resolver', new SolicitudEspacio),
        ]);
    }

    public function aprobar(SolicitudEspacio $solicitud, ResolverSolicitud $resolver): RedirectResponse
    {
        Gate::authorize('resolver', $solicitud);

        $resolver->aprobar($solicitud, request()->user());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Solicitud aprobada: el horario quedó bloqueado y se notificó al solicitante.',
        ]);

        return back();
    }

    public function rechazar(Request $request, SolicitudEspacio $solicitud, ResolverSolicitud $resolver): RedirectResponse
    {
        Gate::authorize('resolver', $solicitud);

        $datos = $request->validate([
            'motivo_rechazo' => ['required', 'string', 'max:255'],
        ]);

        $resolver->rechazar($solicitud, $request->user(), $datos['motivo_rechazo']);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Solicitud rechazada: se notificó al solicitante.',
        ]);

        return back();
    }

    public function cancelar(Request $request, SolicitudEspacio $solicitud, ResolverSolicitud $resolver): RedirectResponse
    {
        Gate::authorize('resolver', $solicitud);

        $resolver->cancelar($solicitud, $request->user(), $request->string('motivo_rechazo')->toString() ?: null);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Solicitud cancelada.']);

        return back();
    }
}
