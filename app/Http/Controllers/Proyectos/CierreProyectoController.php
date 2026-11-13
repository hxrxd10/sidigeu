<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\CerrarProyecto;
use App\Actions\Proyectos\VincularActividad;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proyectos\CierreProyectoRequest;
use App\Models\Indicador;
use App\Models\Proyecto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Cierre del proyecto con resultados, productos y evidencias (RF-2.08).
 */
class CierreProyectoController extends Controller
{
    public function __construct(private VincularActividad $vinculacion) {}

    public function edit(Proyecto $proyecto): Response
    {
        Gate::authorize('gestionarEjecucion', $proyecto);

        $proyecto->load('indicadores:id,nombre,unidad_medida');
        $consolidado = $this->vinculacion->consolidado($proyecto);

        return Inertia::render('proyectos/cierre', [
            'proyecto' => [
                'id' => $proyecto->id,
                'nombre' => $proyecto->nombre,
                'estado_nombre' => $proyecto->estado->nombre(),
                'resultados' => $proyecto->resultados,
                'productos' => $proyecto->productos,
                'lecciones_aprendidas' => $proyecto->lecciones_aprendidas,
                'indicadores' => $proyecto->indicadores->map(fn (Indicador $indicador): array => [
                    'indicador_id' => $indicador->id,
                    'nombre' => $indicador->nombre,
                    'unidad_medida' => $indicador->unidad_medida,
                    'meta' => $indicador->detalleProyecto->meta,
                    // El aporte de las actividades cerradas se propone como
                    // valor final y el coordinador puede ajustarlo (RF-2.06).
                    'valor_final' => $indicador->detalleProyecto->valor_final
                        ?? ($consolidado['indicadores'][$indicador->id] ?? null),
                ])->all(),
            ],
        ]);
    }

    public function store(CierreProyectoRequest $request, Proyecto $proyecto, CerrarProyecto $cerrar): RedirectResponse
    {
        $cerrar->handle($proyecto, $request->datos(), $request->user());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto cerrado.']);

        return to_route('proyectos.show', $proyecto);
    }
}
