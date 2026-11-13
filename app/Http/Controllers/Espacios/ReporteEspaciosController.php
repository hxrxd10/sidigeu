<?php

namespace App\Http\Controllers\Espacios;

use App\Http\Controllers\Controller;
use App\Models\Espacio;
use App\Models\SolicitudEspacio;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Reportes de utilización de espacios (RF-3.10).
 */
class ReporteEspaciosController extends Controller
{
    /**
     * Horas al día que se consideran disponibles para calcular la ocupación.
     */
    private const HORAS_DISPONIBLES_POR_DIA = 12;

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Espacio::class);

        [$desde, $hasta] = $this->rango($request);
        $utilizacion = $this->utilizacion($desde, $hasta);

        return Inertia::render('espacios/reportes', [
            'rango' => ['desde' => $desde->toDateString(), 'hasta' => $hasta->toDateString()],
            'resumen' => [
                'reservas' => (int) $utilizacion->sum('reservas'),
                'horas' => round((float) $utilizacion->sum('horas'), 1),
                'espacios' => $utilizacion->count(),
                'ocupacion_promedio' => $utilizacion->isEmpty()
                    ? 0.0
                    : round((float) $utilizacion->avg('ocupacion'), 1),
            ],
            'utilizacion' => $utilizacion->values()->all(),
            'masUsados' => $utilizacion->sortByDesc('horas')->take(5)->values()->all(),
            'menosUsados' => $utilizacion->sortBy('horas')->take(5)->values()->all(),
        ]);
    }

    public function exportar(Request $request): StreamedResponse
    {
        Gate::authorize('viewAny', Espacio::class);

        [$desde, $hasta] = $this->rango($request);
        $utilizacion = $this->utilizacion($desde, $hasta);

        return response()->streamDownload(function () use ($utilizacion): void {
            $salida = fopen('php://output', 'wb');

            if ($salida === false) {
                return;
            }

            fwrite($salida, chr(0xEF).chr(0xBB).chr(0xBF));
            fputcsv($salida, ['Sede', 'Espacio', 'Reservas', 'Horas reservadas', 'Ocupación (%)']);

            foreach ($utilizacion as $fila) {
                fputcsv($salida, [
                    $fila['sede'],
                    $fila['espacio'],
                    $fila['reservas'],
                    $fila['horas'],
                    $fila['ocupacion'],
                ]);
            }

            fclose($salida);
        }, 'utilizacion-espacios-'.$desde->format('Y-m-d').'.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * @return array{0: Carbon, 1: Carbon}
     */
    private function rango(Request $request): array
    {
        $desde = $request->string('desde')->toString();
        $hasta = $request->string('hasta')->toString();

        return [
            $desde === '' ? Carbon::today()->startOfMonth() : Carbon::parse($desde)->startOfDay(),
            $hasta === '' ? Carbon::today()->endOfMonth() : Carbon::parse($hasta)->startOfDay(),
        ];
    }

    /**
     * Horas reservadas y tasa de ocupación por espacio en el período.
     *
     * @return Collection<int, array{espacio_id: int, espacio: string, sede: string, reservas: int, horas: float, ocupacion: float}>
     */
    private function utilizacion(Carbon $desde, Carbon $hasta): Collection
    {
        $dias = max(1, (int) abs($desde->diffInDays($hasta)) + 1);
        $horasDisponibles = $dias * self::HORAS_DISPONIBLES_POR_DIA;

        $reservas = SolicitudEspacio::query()
            ->aprobadas()
            ->whereDate('fecha', '>=', $desde->toDateString())
            ->whereDate('fecha', '<=', $hasta->toDateString())
            ->get()
            ->groupBy('espacio_id');

        return Espacio::query()
            ->with('sede:id,nombre')
            ->orderBy('nombre')
            ->get()
            ->map(function (Espacio $espacio) use ($reservas, $horasDisponibles): array {
                /** @var Collection<int, SolicitudEspacio> $delEspacio */
                $delEspacio = $reservas->get($espacio->id, collect());

                $horas = $delEspacio->sum(fn (SolicitudEspacio $solicitud): float => $this->horas($solicitud));

                return [
                    'espacio_id' => $espacio->id,
                    'espacio' => $espacio->nombre,
                    'sede' => $espacio->sede->nombre,
                    'reservas' => $delEspacio->count(),
                    'horas' => round((float) $horas, 1),
                    'ocupacion' => round((float) $horas / $horasDisponibles * 100, 1),
                ];
            });
    }

    private function horas(SolicitudEspacio $solicitud): float
    {
        $inicio = Carbon::parse($solicitud->hora_inicio);
        $fin = Carbon::parse($solicitud->hora_fin);

        return abs($inicio->diffInMinutes($fin)) / 60;
    }
}
