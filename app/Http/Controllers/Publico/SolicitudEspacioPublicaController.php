<?php

namespace App\Http\Controllers\Publico;

use App\Actions\Espacios\RegistrarSolicitud;
use App\Http\Controllers\Controller;
use App\Http\Requests\Espacios\SolicitudEspacioRequest;
use App\Models\Espacio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Formulario público de solicitud de espacio (RF-3.04). El catálogo no muestra
 * disponibilidad, así que es aquí donde se valida el horario.
 */
class SolicitudEspacioPublicaController extends Controller
{
    public function create(Request $request): Response
    {
        $espacios = Espacio::query()
            ->publicos()
            ->reservables()
            ->with('sede:id,nombre')
            ->orderBy('nombre')
            ->get()
            ->map(fn (Espacio $espacio): array => [
                'valor' => $espacio->id,
                'nombre' => $espacio->nombre.' — '.$espacio->sede->nombre,
            ])->all();

        return Inertia::render('publico/solicitud/create', [
            'espacios' => $espacios,
            'espacioSeleccionado' => $request->integer('espacio_id') ?: null,
            'usuario' => $request->user()?->only(['name', 'email']),
        ]);
    }

    public function store(SolicitudEspacioRequest $request, RegistrarSolicitud $registrar): RedirectResponse
    {
        $solicitud = $registrar->handle($request->datos(), $request->user());

        return to_route('publico.solicitud.confirmacion', ['solicitud' => $solicitud->id]);
    }

    public function confirmacion(Request $request): Response
    {
        return Inertia::render('publico/solicitud/confirmacion', [
            'numero' => $request->integer('solicitud'),
        ]);
    }
}
