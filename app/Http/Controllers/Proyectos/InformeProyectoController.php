<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\VincularActividad;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use App\Models\Indicador;
use App\Models\Proyecto;
use App\Models\ProyectoPresupuesto;
use App\Models\ProyectoTarea;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Informe del proyecto (RF-2.09). Se entrega en CSV mientras no se aprueben
 * las dependencias de PDF y Word de la sección 12.3.
 */
class InformeProyectoController extends Controller
{
    public function __construct(private VincularActividad $vinculacion) {}

    public function __invoke(Proyecto $proyecto): StreamedResponse
    {
        Gate::authorize('view', $proyecto);

        $proyecto->load([
            'unidad:id,nombre',
            'responsable:id,name',
            'objetivos',
            'cronograma',
            'presupuesto',
            'indicadores',
            'actividades:id,nombre,fecha,estado,proyecto_id',
        ]);

        $consolidado = $this->vinculacion->consolidado($proyecto);

        return response()->streamDownload(function () use ($proyecto, $consolidado): void {
            $salida = fopen('php://output', 'wb');

            if ($salida === false) {
                return;
            }

            fwrite($salida, chr(0xEF).chr(0xBB).chr(0xBF));

            $escribir = function (array $filas) use ($salida): void {
                foreach ($filas as $fila) {
                    fputcsv($salida, $fila);
                }
            };

            $escribir([
                ['INFORME DE PROYECTO'],
                ['Nombre', $proyecto->nombre],
                ['Unidad', $proyecto->unidad->nombre],
                ['Responsable', $proyecto->responsable?->name],
                ['Estado', $proyecto->estado->nombre()],
                ['Período', $proyecto->fecha_inicio?->format('d-m-Y').' – '.$proyecto->fecha_fin?->format('d-m-Y')],
                ['Objetivo general', $proyecto->objetivo_general],
                [],
                ['OBJETIVOS ESPECÍFICOS'],
            ]);

            foreach ($proyecto->objetivos as $objetivo) {
                fputcsv($salida, [$objetivo->descripcion]);
            }

            $escribir([[], ['CRONOGRAMA'], ['Tarea', 'Inicio', 'Fin', 'Avance (%)']]);

            foreach ($proyecto->cronograma as $tarea) {
                /** @var ProyectoTarea $tarea */
                fputcsv($salida, [
                    $tarea->tarea,
                    $tarea->fecha_inicio?->format('d-m-Y'),
                    $tarea->fecha_fin?->format('d-m-Y'),
                    $tarea->avance,
                ]);
            }

            $escribir([[], ['PRESUPUESTO'], ['Renglón', 'Cantidad', 'Costo unitario', 'Subtotal', 'Ejecutado']]);

            foreach ($proyecto->presupuesto as $renglon) {
                /** @var ProyectoPresupuesto $renglon */
                fputcsv($salida, [
                    $renglon->descripcion,
                    $renglon->cantidad,
                    $renglon->costo_unitario,
                    $renglon->subtotal(),
                    $renglon->ejecutado,
                ]);
            }

            $escribir([
                ['Total', '', '', $proyecto->presupuesto_total, $proyecto->presupuesto_ejecutado],
                [],
                ['INDICADORES'],
                ['Indicador', 'Unidad de medida', 'Línea base', 'Meta', 'Valor final', 'Aporte de actividades'],
            ]);

            foreach ($proyecto->indicadores as $indicador) {
                /** @var Indicador $indicador */
                fputcsv($salida, [
                    $indicador->nombre,
                    $indicador->unidad_medida,
                    $indicador->detalleProyecto->linea_base,
                    $indicador->detalleProyecto->meta,
                    $indicador->detalleProyecto->valor_final,
                    $consolidado['indicadores'][$indicador->id] ?? 0,
                ]);
            }

            $escribir([[], ['ACTIVIDADES VINCULADAS'], ['Fecha', 'Actividad', 'Estado']]);

            foreach ($proyecto->actividades as $actividad) {
                /** @var Actividad $actividad */
                fputcsv($salida, [
                    $actividad->fecha->format('d-m-Y'),
                    $actividad->nombre,
                    $actividad->estado->nombre(),
                ]);
            }

            $escribir([
                [],
                ['CIERRE'],
                ['Resultados', $proyecto->resultados],
                ['Productos', $proyecto->productos],
                ['Lecciones aprendidas', $proyecto->lecciones_aprendidas],
                ['Beneficiarios de las actividades', $consolidado['beneficiarios']],
            ]);

            fclose($salida);
        }, 'informe-proyecto-'.$proyecto->id.'.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }
}
