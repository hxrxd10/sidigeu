<?php

namespace App\Http\Controllers\Actividades;

use App\Actions\Actividades\CerrarActividad;
use App\Enums\RangoEdad;
use App\Enums\SexoBeneficiario;
use App\Http\Controllers\Controller;
use App\Http\Requests\Actividades\CierreActividadRequest;
use App\Models\Actividad;
use App\Models\Indicador;
use App\Models\PersonaRecursoHumano;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Cierre de la actividad con resultados, beneficiarios y evidencias (RF-1.06).
 */
class CierreActividadController extends Controller
{
    public function edit(Actividad $actividad): Response
    {
        Gate::authorize('gestionarEjecucion', $actividad);

        $actividad->load(['indicadores:id,nombre,unidad_medida', 'beneficiarios', 'participantes']);

        return Inertia::render('actividades/cierre', [
            'actividad' => [
                'id' => $actividad->id,
                'nombre' => $actividad->nombre,
                'fecha' => $actividad->fecha->toDateString(),
                'estado' => $actividad->estado->value,
                'estado_nombre' => $actividad->estado->nombre(),
                'resultados' => $actividad->resultados,
                'observaciones' => $actividad->observaciones,
                'indicadores' => $actividad->indicadores->map(fn (Indicador $indicador): array => [
                    'indicador_id' => $indicador->id,
                    'nombre' => $indicador->nombre,
                    'unidad_medida' => $indicador->unidad_medida,
                    'valor_meta' => $indicador->pivot->valor_meta,
                    'valor_alcanzado' => $indicador->pivot->valor_alcanzado,
                ])->all(),
                'beneficiarios' => $actividad->beneficiarios->map(fn ($beneficiario): array => [
                    'sexo' => $beneficiario->sexo->value,
                    'rango_edad' => $beneficiario->rango_edad->value,
                    'tipo_publico' => $beneficiario->tipo_publico,
                    'cantidad' => $beneficiario->cantidad,
                ])->all(),
                'participantes' => $actividad->participantes->map(fn ($participante): array => [
                    'persona_recurso_humano_id' => $participante->persona_recurso_humano_id,
                    'nombre_externo' => $participante->nombre_externo,
                    'rol' => $participante->rol,
                ])->all(),
            ],
            'opciones' => [
                'sexos' => SexoBeneficiario::opciones(),
                'rangos' => RangoEdad::opciones(),
                'personas' => PersonaRecursoHumano::query()
                    ->activos()
                    ->orderBy('apellidos')
                    ->get()
                    ->map(fn (PersonaRecursoHumano $persona): array => [
                        'valor' => $persona->id,
                        'nombre' => $persona->nombre_completo,
                    ])->all(),
            ],
        ]);
    }

    public function store(CierreActividadRequest $request, Actividad $actividad, CerrarActividad $cerrar): RedirectResponse
    {
        $cerrar->handle($actividad, $request->datos(), $request->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad cerrada con sus resultados y evidencias.']);

        return to_route('actividades.show', $actividad);
    }
}
