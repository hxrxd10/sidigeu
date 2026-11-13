<?php

namespace App\Actions\Proyectos;

use App\Enums\EstadoProyecto;
use App\Models\Proyecto;
use Illuminate\Support\Facades\DB;

/**
 * Formulación del proyecto: objetivos, beneficiarios, cronograma, presupuesto
 * e indicadores con sus metas (RF-2.02 a RF-2.05).
 */
class GuardarFormulacion
{
    /**
     * @param  array<string, mixed>  $datos
     */
    public function handle(Proyecto $proyecto, array $datos): Proyecto
    {
        return DB::transaction(function () use ($proyecto, $datos): Proyecto {
            $this->guardarObjetivos($proyecto, $datos['objetivos'] ?? []);
            $this->guardarBeneficiarios($proyecto, $datos['beneficiarios'] ?? []);
            $this->guardarCronograma($proyecto, $datos['cronograma'] ?? []);
            $this->guardarPresupuesto($proyecto, $datos['presupuesto'] ?? []);
            $this->guardarIndicadores($proyecto, $datos['indicadores'] ?? []);

            if ($proyecto->estado === EstadoProyecto::Registrado) {
                $proyecto->update(['estado' => EstadoProyecto::EnFormulacion]);
            }

            return $proyecto->refresh();
        });
    }

    /**
     * @param  array<int, array{descripcion: string|null}>  $objetivos
     */
    private function guardarObjetivos(Proyecto $proyecto, array $objetivos): void
    {
        $proyecto->objetivos()->delete();

        foreach (array_values($objetivos) as $orden => $objetivo) {
            $descripcion = trim((string) ($objetivo['descripcion'] ?? ''));

            if ($descripcion === '') {
                continue;
            }

            $proyecto->objetivos()->create(['descripcion' => $descripcion, 'orden' => $orden]);
        }
    }

    /**
     * @param  array<int, array{tipo: string|null, cantidad: int|null, descripcion: string|null}>  $beneficiarios
     */
    private function guardarBeneficiarios(Proyecto $proyecto, array $beneficiarios): void
    {
        $proyecto->beneficiarios()->delete();

        foreach ($beneficiarios as $beneficiario) {
            $tipo = trim((string) ($beneficiario['tipo'] ?? ''));

            if ($tipo === '') {
                continue;
            }

            $proyecto->beneficiarios()->create([
                'tipo' => $tipo,
                'cantidad' => (int) ($beneficiario['cantidad'] ?? 0),
                'descripcion' => $beneficiario['descripcion'] ?? null,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $cronograma
     */
    private function guardarCronograma(Proyecto $proyecto, array $cronograma): void
    {
        $proyecto->cronograma()->delete();

        foreach (array_values($cronograma) as $orden => $tarea) {
            $nombre = trim((string) ($tarea['tarea'] ?? ''));

            if ($nombre === '') {
                continue;
            }

            $proyecto->cronograma()->create([
                'tarea' => $nombre,
                'fecha_inicio' => $tarea['fecha_inicio'] ?? null,
                'fecha_fin' => $tarea['fecha_fin'] ?? null,
                'responsable_id' => $tarea['responsable_id'] ?? null,
                'avance' => (int) ($tarea['avance'] ?? 0),
                'orden' => $orden,
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $presupuesto
     */
    private function guardarPresupuesto(Proyecto $proyecto, array $presupuesto): void
    {
        $proyecto->presupuesto()->delete();

        foreach ($presupuesto as $renglon) {
            $descripcion = trim((string) ($renglon['descripcion'] ?? ''));

            if ($descripcion === '') {
                continue;
            }

            $proyecto->presupuesto()->create([
                'descripcion' => $descripcion,
                'cantidad' => (float) ($renglon['cantidad'] ?? 1),
                'costo_unitario' => (float) ($renglon['costo_unitario'] ?? 0),
                'ejecutado' => (float) ($renglon['ejecutado'] ?? 0),
                'fuente_financiamiento_id' => $renglon['fuente_financiamiento_id'] ?? null,
            ]);
        }
    }

    /**
     * @param  array<int, array{indicador_id: int, linea_base: float|null, meta: float|null}>  $indicadores
     */
    private function guardarIndicadores(Proyecto $proyecto, array $indicadores): void
    {
        $proyecto->indicadores()->sync(
            collect($indicadores)
                ->filter(fn (array $fila): bool => $fila['indicador_id'] > 0 && $fila['meta'] !== null)
                ->mapWithKeys(fn (array $fila): array => [
                    $fila['indicador_id'] => [
                        'linea_base' => $fila['linea_base'],
                        'meta' => $fila['meta'],
                    ],
                ])
                ->all()
        );
    }
}
