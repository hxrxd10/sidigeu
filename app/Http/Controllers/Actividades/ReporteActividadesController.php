<?php

namespace App\Http\Controllers\Actividades;

use App\Enums\EstadoActividad;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use App\Models\Indicador;
use App\Models\Unidad;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Reporte mensual y reportes acumulados de actividades (RF-1.09, RF-1.10).
 */
class ReporteActividadesController extends Controller
{
    /**
     * Reporte mensual por unidad o consolidado (RF-1.09, CU-12).
     */
    public function mensual(Request $request): Response
    {
        Gate::authorize('viewAny', Actividad::class);

        [$mes, $unidadId] = $this->parametros($request);
        $ancla = $this->ancla($mes);

        $actividades = $this->actividadesDelMes($ancla, $unidadId);

        return Inertia::render('actividades/reportes/mensual', [
            'filtros' => ['mes' => $ancla->format('Y-m'), 'unidad_id' => $unidadId],
            'periodo' => [
                'etiqueta' => $ancla->translatedFormat('F \d\e Y'),
                'anterior' => $ancla->copy()->subMonth()->format('Y-m'),
                'siguiente' => $ancla->copy()->addMonth()->format('Y-m'),
            ],
            'resumen' => $this->resumen($actividades),
            'realizadas' => $actividades
                ->where('estado', EstadoActividad::Cerrada)
                ->where('es_logro_no_programado', false)
                ->map(fn (Actividad $actividad): array => $this->aFila($actividad))
                ->values()->all(),
            'logros' => $actividades
                ->where('es_logro_no_programado', true)
                ->map(fn (Actividad $actividad): array => $this->aFila($actividad))
                ->values()->all(),
            'indicadores' => $this->indicadoresAlcanzados($actividades),
            'unidades' => $this->unidades(),
        ]);
    }

    /**
     * Reportes trimestrales, semestrales y anuales (RF-1.10, CU-13).
     */
    public function acumulado(Request $request): Response
    {
        Gate::authorize('viewAny', Actividad::class);

        $anio = $request->integer('anio') ?: (int) Carbon::today()->format('Y');
        $periodo = in_array($request->string('periodo')->toString(), ['trimestral', 'semestral', 'anual'], true)
            ? $request->string('periodo')->toString()
            : 'trimestral';
        $unidadId = $request->integer('unidad_id') ?: null;

        [$desde, $hasta] = $this->rangoAcumulado($periodo, $anio, $request->integer('bloque') ?: 1);

        $actividades = Actividad::query()
            ->with(['unidad:id,nombre', 'tipoActividad:id,nombre', 'indicadores:id,nombre,unidad_medida', 'beneficiarios'])
            ->entreFechas($desde->toDateString(), $hasta->toDateString())
            ->when($unidadId, fn ($query, $id) => $query->where('unidad_id', $id))
            ->get();

        return Inertia::render('actividades/reportes/acumulado', [
            'filtros' => [
                'anio' => $anio,
                'periodo' => $periodo,
                'bloque' => $request->integer('bloque') ?: 1,
                'unidad_id' => $unidadId,
            ],
            'rango' => [
                'desde' => $desde->toDateString(),
                'hasta' => $hasta->toDateString(),
                'etiqueta' => $desde->translatedFormat('d-m-Y').' – '.$hasta->translatedFormat('d-m-Y'),
            ],
            'resumen' => $this->resumen($actividades),
            'porMes' => $this->porMes($actividades, $desde, $hasta),
            'porUnidad' => $this->porUnidad($actividades),
            'porTipo' => $this->porTipo($actividades),
            'indicadores' => $this->indicadoresAlcanzados($actividades),
            'unidades' => $this->unidades(),
        ]);
    }

    /**
     * Reporte mensual en CSV (RF-1.11; PDF y Excel quedan pendientes de
     * aprobar las dependencias correspondientes).
     */
    public function exportar(Request $request): StreamedResponse
    {
        Gate::authorize('viewAny', Actividad::class);

        [$mes, $unidadId] = $this->parametros($request);
        $ancla = $this->ancla($mes);
        $actividades = $this->actividadesDelMes($ancla, $unidadId);

        return response()->streamDownload(function () use ($actividades): void {
            $salida = fopen('php://output', 'wb');

            if ($salida === false) {
                return;
            }

            fwrite($salida, chr(0xEF).chr(0xBB).chr(0xBF));
            fputcsv($salida, [
                'Fecha', 'Actividad', 'Unidad', 'Tipo', 'Lugar', 'Estado',
                'Beneficiarios', 'Participantes', 'Logro no programado', 'Resultados',
            ]);

            foreach ($actividades as $actividad) {
                fputcsv($salida, [
                    $actividad->fecha->format('d-m-Y'),
                    $actividad->nombre,
                    $actividad->unidad->nombre,
                    $actividad->tipoActividad->nombre,
                    $actividad->lugar,
                    $actividad->estado->nombre(),
                    $actividad->beneficiarios_total,
                    $actividad->participantes->count(),
                    $actividad->es_logro_no_programado ? 'Sí' : 'No',
                    $actividad->resultados,
                ]);
            }

            fclose($salida);
        }, 'reporte-actividades-'.$ancla->format('Y-m').'.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * @return Collection<int, Actividad>
     */
    private function actividadesDelMes(Carbon $ancla, ?int $unidadId): Collection
    {
        return Actividad::query()
            ->with([
                'unidad:id,nombre',
                'tipoActividad:id,nombre',
                'espacio:id,nombre',
                'indicadores:id,nombre,unidad_medida',
                'beneficiarios',
                'participantes',
            ])
            ->delMes((int) $ancla->format('Y'), (int) $ancla->format('n'))
            ->when($unidadId, fn ($query, $id) => $query->where('unidad_id', $id))
            ->orderBy('fecha')
            ->get();
    }

    /**
     * @return array{0: string, 1: int|null}
     */
    private function parametros(Request $request): array
    {
        $usuario = $request->user();

        $unidadId = $request->integer('unidad_id')
            ?: ($usuario->tieneAlcanceGlobal() ? null : $usuario->unidad_id);

        return [$request->string('mes')->toString() ?: Carbon::today()->format('Y-m'), $unidadId];
    }

    /**
     * @param  Collection<int, Actividad>  $actividades
     * @return array<string, int>
     */
    private function resumen(Collection $actividades): array
    {
        return [
            'programadas' => $actividades->where('es_logro_no_programado', false)->count(),
            'cerradas' => $actividades->where('estado', EstadoActividad::Cerrada)->count(),
            'canceladas' => $actividades->where('estado', EstadoActividad::Cancelada)->count(),
            'logros' => $actividades->where('es_logro_no_programado', true)->count(),
            'beneficiarios' => (int) $actividades->sum(
                fn (Actividad $actividad): int => $actividad->beneficiarios_total
            ),
            'participantes' => (int) $actividades->sum(
                fn (Actividad $actividad): int => $actividad->participantes->count()
            ),
        ];
    }

    /**
     * @param  Collection<int, Actividad>  $actividades
     * @return array<int, array{nombre: string, unidad_medida: string, meta: float, alcanzado: float}>
     */
    private function indicadoresAlcanzados(Collection $actividades): array
    {
        $resumen = [];

        foreach ($actividades as $actividad) {
            foreach ($actividad->indicadores as $indicador) {
                /** @var Indicador $indicador */
                $clave = $indicador->id;

                $resumen[$clave] ??= [
                    'nombre' => $indicador->nombre,
                    'unidad_medida' => $indicador->unidad_medida,
                    'meta' => 0.0,
                    'alcanzado' => 0.0,
                ];

                $resumen[$clave]['meta'] += (float) $indicador->pivot->valor_meta;
                $resumen[$clave]['alcanzado'] += (float) $indicador->pivot->valor_alcanzado;
            }
        }

        return array_values($resumen);
    }

    /**
     * @param  Collection<int, Actividad>  $actividades
     * @return array<int, array{etiqueta: string, total: int, cerradas: int}>
     */
    private function porMes(Collection $actividades, Carbon $desde, Carbon $hasta): array
    {
        $meses = [];
        $cursor = $desde->copy()->startOfMonth();

        while ($cursor->lessThanOrEqualTo($hasta)) {
            $delMes = $actividades->filter(
                fn (Actividad $actividad): bool => $actividad->fecha->format('Y-m') === $cursor->format('Y-m')
            );

            $meses[] = [
                'etiqueta' => $cursor->translatedFormat('M Y'),
                'total' => $delMes->count(),
                'cerradas' => $delMes->where('estado', EstadoActividad::Cerrada)->count(),
            ];

            $cursor = $cursor->addMonth();
        }

        return $meses;
    }

    /**
     * @param  Collection<int, Actividad>  $actividades
     * @return array<int, array{etiqueta: string, total: int}>
     */
    private function porUnidad(Collection $actividades): array
    {
        return $actividades
            ->groupBy(fn (Actividad $actividad): string => $actividad->unidad->nombre)
            ->map(fn (Collection $grupo, string $nombre): array => ['etiqueta' => $nombre, 'total' => $grupo->count()])
            ->sortByDesc('total')
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, Actividad>  $actividades
     * @return array<int, array{etiqueta: string, total: int}>
     */
    private function porTipo(Collection $actividades): array
    {
        return $actividades
            ->groupBy(fn (Actividad $actividad): string => $actividad->tipoActividad->nombre)
            ->map(fn (Collection $grupo, string $nombre): array => ['etiqueta' => $nombre, 'total' => $grupo->count()])
            ->sortByDesc('total')
            ->values()
            ->all();
    }

    /**
     * @return array{0: Carbon, 1: Carbon}
     */
    private function rangoAcumulado(string $periodo, int $anio, int $bloque): array
    {
        $inicio = Carbon::create($anio, 1, 1)->startOfDay();

        return match ($periodo) {
            'trimestral' => [
                $inicio->copy()->addMonths(3 * (max(1, min(4, $bloque)) - 1))->startOfMonth(),
                $inicio->copy()->addMonths(3 * max(1, min(4, $bloque)) - 1)->endOfMonth(),
            ],
            'semestral' => [
                $inicio->copy()->addMonths(6 * (max(1, min(2, $bloque)) - 1))->startOfMonth(),
                $inicio->copy()->addMonths(6 * max(1, min(2, $bloque)) - 1)->endOfMonth(),
            ],
            default => [$inicio->copy()->startOfYear(), $inicio->copy()->endOfYear()],
        };
    }

    private function ancla(string $mes): Carbon
    {
        try {
            return Carbon::createFromFormat('Y-m', $mes)->startOfMonth();
        } catch (\Exception) {
            return Carbon::today()->startOfMonth();
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function aFila(Actividad $actividad): array
    {
        return [
            'id' => $actividad->id,
            'nombre' => $actividad->nombre,
            'fecha' => $actividad->fecha->toDateString(),
            'unidad' => $actividad->unidad->nombre,
            'tipo' => $actividad->tipoActividad->nombre,
            'lugar' => $actividad->lugar,
            'beneficiarios' => $actividad->beneficiarios_total,
            'participantes' => $actividad->participantes->count(),
            'resultados' => $actividad->resultados,
        ];
    }

    /**
     * @return array<int, array{valor: int, nombre: string}>
     */
    private function unidades(): array
    {
        return Unidad::query()->activas()->orderBy('nombre')->get()
            ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])
            ->all();
    }
}
