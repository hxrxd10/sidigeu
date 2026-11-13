<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\GuardarFormulacion;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proyectos\FormulacionRequest;
use App\Models\FuenteFinanciamiento;
use App\Models\Indicador;
use App\Models\Proyecto;
use App\Models\ProyectoPresupuesto;
use App\Models\ProyectoTarea;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Formulación del proyecto: objetivos, beneficiarios, cronograma, presupuesto
 * e indicadores (RF-2.02 a RF-2.05).
 */
class FormulacionController extends Controller
{
    public function edit(Proyecto $proyecto, Request $request): Response
    {
        Gate::authorize('update', $proyecto);

        $proyecto->load(['objetivos', 'beneficiarios', 'cronograma', 'presupuesto', 'indicadores']);

        return Inertia::render('proyectos/formulacion', [
            'proyecto' => [
                'id' => $proyecto->id,
                'nombre' => $proyecto->nombre,
                'estado_nombre' => $proyecto->estado->nombre(),
                'objetivos' => $proyecto->objetivos->map(fn ($objetivo): array => [
                    'descripcion' => $objetivo->descripcion,
                ])->all(),
                'beneficiarios' => $proyecto->beneficiarios->map(fn ($beneficiario): array => [
                    'tipo' => $beneficiario->tipo,
                    'cantidad' => $beneficiario->cantidad,
                    'descripcion' => $beneficiario->descripcion,
                ])->all(),
                'cronograma' => $proyecto->cronograma->map(fn (ProyectoTarea $tarea): array => [
                    'tarea' => $tarea->tarea,
                    'fecha_inicio' => $tarea->fecha_inicio?->toDateString(),
                    'fecha_fin' => $tarea->fecha_fin?->toDateString(),
                    'responsable_id' => $tarea->responsable_id,
                    'avance' => $tarea->avance,
                ])->all(),
                'presupuesto' => $proyecto->presupuesto->map(fn (ProyectoPresupuesto $renglon): array => [
                    'descripcion' => $renglon->descripcion,
                    'cantidad' => $renglon->cantidad,
                    'costo_unitario' => $renglon->costo_unitario,
                    'fuente_financiamiento_id' => $renglon->fuente_financiamiento_id,
                ])->all(),
                'indicadores' => $proyecto->indicadores->map(fn (Indicador $indicador): array => [
                    'indicador_id' => $indicador->id,
                    'linea_base' => $indicador->detalleProyecto->linea_base,
                    'meta' => $indicador->detalleProyecto->meta,
                ])->all(),
            ],
            'opciones' => [
                'indicadores' => Indicador::query()->activos()->orderBy('nombre')->get()
                    ->map(fn (Indicador $indicador): array => [
                        'valor' => $indicador->id,
                        'nombre' => $indicador->nombre,
                        'unidad_medida' => $indicador->unidad_medida,
                    ])->all(),
                'fuentes' => FuenteFinanciamiento::query()->activos()->orderBy('nombre')->get()
                    ->map(fn (FuenteFinanciamiento $fuente): array => [
                        'valor' => $fuente->id,
                        'nombre' => $fuente->nombre,
                    ])->all(),
                'responsables' => User::query()->activos()
                    ->where('unidad_id', $proyecto->unidad_id)
                    ->orderBy('name')
                    ->get()
                    ->map(fn (User $usuario): array => ['valor' => $usuario->id, 'nombre' => $usuario->name])->all(),
            ],
        ]);
    }

    public function store(FormulacionRequest $request, Proyecto $proyecto, GuardarFormulacion $guardar): RedirectResponse
    {
        $guardar->handle($proyecto, $request->datos());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Formulación guardada.']);

        return to_route('proyectos.show', $proyecto);
    }
}
