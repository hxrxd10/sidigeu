<?php

namespace App\Http\Controllers\RecursoHumano;

use App\Actions\RecursoHumano\DarDeBajaPersona;
use App\Actions\RecursoHumano\ReactivarPersona;
use App\Http\Controllers\Controller;
use App\Http\Requests\RecursoHumano\DarDeBajaRequest;
use App\Http\Requests\RecursoHumano\ReactivarRequest;
use App\Models\PersonaRecursoHumano;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

/**
 * Baja y reactivación de una persona del padrón (RF-4.03, RF-4.05).
 */
class EstadoPersonaController extends Controller
{
    public function store(
        DarDeBajaRequest $request,
        PersonaRecursoHumano $persona,
        DarDeBajaPersona $darDeBaja,
    ): RedirectResponse {
        $darDeBaja->handle(
            $persona,
            $request->string('fecha_baja')->toString(),
            $request->string('motivo_baja')->toString() ?: null,
        );

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $persona->nombre_completo.' quedó dado de baja.',
        ]);

        return to_route('recurso-humano.show', $persona);
    }

    public function update(
        ReactivarRequest $request,
        PersonaRecursoHumano $persona,
        ReactivarPersona $reactivar,
    ): RedirectResponse {
        $reactivar->handle($persona, $request->string('fecha_alta')->toString());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $persona->nombre_completo.' quedó reactivado.',
        ]);

        return to_route('recurso-humano.show', $persona);
    }
}
