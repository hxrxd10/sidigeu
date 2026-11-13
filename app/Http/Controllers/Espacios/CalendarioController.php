<?php

namespace App\Http\Controllers\Espacios;

use App\Enums\EstadoEspacio;
use App\Enums\EstadoSolicitud;
use App\Http\Controllers\Controller;
use App\Models\Espacio;
use App\Models\Sede;
use App\Models\SolicitudEspacio;
use App\Models\TipoEspacio;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Calendario interno de ocupación: filas por espacio y columnas por día
 * (RF-3.07), con vistas de día, semana y mes.
 */
class CalendarioController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Espacio::class);

        $vista = in_array($request->string('vista')->toString(), ['dia', 'semana', 'mes'], true)
            ? $request->string('vista')->toString()
            : 'semana';

        $ancla = $this->fechaAncla($request->string('fecha')->toString());
        [$desde, $hasta] = $this->rango($vista, $ancla);

        $filtros = [
            'vista' => $vista,
            'fecha' => $ancla->toDateString(),
            'sede_id' => $request->integer('sede_id'),
            'tipo_espacio_id' => $request->integer('tipo_espacio_id'),
            'estado' => $request->string('estado')->toString(),
        ];

        $espacios = Espacio::query()
            ->with(['sede:id,nombre', 'tipoEspacio:id,nombre'])
            ->when($filtros['sede_id'], fn ($query, $id) => $query->where('sede_id', $id))
            ->when($filtros['tipo_espacio_id'], fn ($query, $id) => $query->where('tipo_espacio_id', $id))
            ->when($filtros['estado'] !== '', fn ($query) => $query->where('estado', $filtros['estado']))
            ->orderBy('sede_id')
            ->orderBy('nombre')
            ->get();

        $reservas = SolicitudEspacio::query()
            ->whereIn('estado', [EstadoSolicitud::Pendiente, EstadoSolicitud::Aprobada])
            ->whereIn('espacio_id', $espacios->pluck('id'))
            ->whereDate('fecha', '>=', $desde->toDateString())
            ->whereDate('fecha', '<=', $hasta->toDateString())
            ->orderBy('hora_inicio')
            ->get()
            ->map(fn (SolicitudEspacio $solicitud): array => [
                'id' => $solicitud->id,
                'espacio_id' => $solicitud->espacio_id,
                'fecha' => $solicitud->fecha->toDateString(),
                'hora_inicio' => $solicitud->horaInicioCorta(),
                'hora_fin' => $solicitud->horaFinCorta(),
                'solicitante' => $solicitud->solicitante_nombre,
                'proposito' => $solicitud->proposito,
                'estado' => $solicitud->estado->value,
                'estado_nombre' => $solicitud->estado->nombre(),
            ])->all();

        return Inertia::render('espacios/calendario', [
            'filtros' => $filtros,
            'rango' => [
                'desde' => $desde->toDateString(),
                'hasta' => $hasta->toDateString(),
                'etiqueta' => $this->etiquetaRango($vista, $desde, $hasta),
                'dias' => $this->dias($desde, $hasta),
            ],
            'navegacion' => [
                'anterior' => $this->desplazar($vista, $ancla, -1)->toDateString(),
                'siguiente' => $this->desplazar($vista, $ancla, 1)->toDateString(),
                'hoy' => Carbon::today()->toDateString(),
            ],
            'espacios' => $espacios->map(fn (Espacio $espacio): array => [
                'id' => $espacio->id,
                'nombre' => $espacio->nombre,
                'sede' => $espacio->sede->nombre,
                'tipo' => $espacio->tipoEspacio->nombre,
                'estado' => $espacio->estado->value,
                'estado_nombre' => $espacio->estado->nombre(),
                'admite_reservas' => $espacio->estado->admiteReservas(),
            ])->all(),
            'reservas' => $reservas,
            'opciones' => [
                'sedes' => Sede::query()->activas()->orderBy('nombre')->get()
                    ->map(fn (Sede $sede): array => ['valor' => $sede->id, 'nombre' => $sede->nombre])->all(),
                'tipos' => TipoEspacio::query()->activos()->orderBy('nombre')->get()
                    ->map(fn (TipoEspacio $tipo): array => ['valor' => $tipo->id, 'nombre' => $tipo->nombre])->all(),
                'estados' => EstadoEspacio::opciones(),
            ],
        ]);
    }

    private function fechaAncla(string $fecha): Carbon
    {
        try {
            return $fecha === '' ? Carbon::today() : Carbon::parse($fecha)->startOfDay();
        } catch (\Exception) {
            return Carbon::today();
        }
    }

    /**
     * @return array{0: Carbon, 1: Carbon}
     */
    private function rango(string $vista, Carbon $ancla): array
    {
        return match ($vista) {
            'dia' => [$ancla->copy(), $ancla->copy()],
            'mes' => [$ancla->copy()->startOfMonth(), $ancla->copy()->endOfMonth()],
            default => [$ancla->copy()->startOfWeek(Carbon::MONDAY), $ancla->copy()->endOfWeek(Carbon::SUNDAY)],
        };
    }

    private function desplazar(string $vista, Carbon $ancla, int $pasos): Carbon
    {
        return match ($vista) {
            'dia' => $ancla->copy()->addDays($pasos),
            'mes' => $ancla->copy()->addMonths($pasos),
            default => $ancla->copy()->addWeeks($pasos),
        };
    }

    /**
     * @return array<int, array{fecha: string, etiqueta: string, es_hoy: bool}>
     */
    private function dias(Carbon $desde, Carbon $hasta): array
    {
        $dias = [];
        $cursor = $desde->copy();

        while ($cursor->lessThanOrEqualTo($hasta)) {
            $dias[] = [
                'fecha' => $cursor->toDateString(),
                'etiqueta' => $cursor->translatedFormat('D d-m'),
                'es_hoy' => $cursor->isToday(),
            ];

            $cursor = $cursor->addDay();
        }

        return $dias;
    }

    private function etiquetaRango(string $vista, Carbon $desde, Carbon $hasta): string
    {
        return match ($vista) {
            'dia' => $desde->translatedFormat('l d \d\e F \d\e Y'),
            'mes' => $desde->translatedFormat('F \d\e Y'),
            default => $desde->format('d-m-Y').' – '.$hasta->format('d-m-Y'),
        };
    }
}
