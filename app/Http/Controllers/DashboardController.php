<?php

namespace App\Http\Controllers;

use App\Enums\EstadoActividad;
use App\Enums\EstadoEspacio;
use App\Enums\EstadoProyecto;
use App\Enums\EstadoSolicitud;
use App\Enums\Rol;
use App\Enums\TipoPersona;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\PersonaRecursoHumano;
use App\Models\Proyecto;
use App\Models\SolicitudEspacio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Tablero de inicio con los indicadores clave según el rol (RF-T.08).
 */
class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $usuario = $request->user();
        $hoy = Carbon::today();

        return Inertia::render('dashboard', [
            'saludo' => [
                'nombre' => $usuario->name,
                'unidad' => $usuario->unidad?->nombre,
                'fecha' => $hoy->translatedFormat('l d \d\e F \d\e Y'),
            ],
            'actividades' => $this->actividades($usuario, $hoy),
            'proyectos' => $this->proyectos($usuario),
            'espacios' => $this->espacios($usuario, $hoy),
            'recursoHumano' => $this->recursoHumano($usuario),
            'pendientes' => $this->pendientes($usuario),
            'graficas' => $this->graficas($usuario, $hoy),
        ]);
    }

    /**
     * Actividades del mes de la unidad del usuario, o de toda la DIGEU para
     * los roles de alcance global.
     *
     * @return array<string, mixed>
     */
    private function actividades(User $usuario, Carbon $hoy): array
    {
        $delMes = Actividad::query()
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->delMes((int) $hoy->format('Y'), (int) $hoy->format('n'))
            ->get(['id', 'estado', 'fecha', 'nombre', 'unidad_id']);

        $proximas = Actividad::query()
            ->with(['unidad:id,nombre'])
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->whereIn('estado', [...EstadoActividad::programadas(), EstadoActividad::EnEjecucion])
            ->whereDate('fecha', '>=', $hoy->toDateString())
            ->orderBy('fecha')
            ->limit(5)
            ->get()
            ->map(fn (Actividad $actividad): array => [
                'id' => $actividad->id,
                'nombre' => $actividad->nombre,
                'fecha' => $actividad->fecha->toDateString(),
                'hora_inicio' => $actividad->horaInicioCorta(),
                'lugar' => $actividad->lugar,
                'unidad' => $actividad->unidad->nombre,
                'estado_nombre' => $actividad->estado->nombre(),
            ])->all();

        return [
            'total' => $delMes->count(),
            'porEstado' => collect(EstadoActividad::cases())
                ->map(fn (EstadoActividad $estado): array => [
                    'etiqueta' => $estado->nombre(),
                    'total' => $delMes->where('estado', $estado)->count(),
                ])
                ->filter(fn (array $fila): bool => $fila['total'] > 0)
                ->values()
                ->all(),
            'cerradas' => $delMes->where('estado', EstadoActividad::Cerrada)->count(),
            'enAgenda' => Actividad::query()
                ->enAgenda()
                ->delMes((int) $hoy->format('Y'), (int) $hoy->format('n'))
                ->count(),
            'proximas' => $proximas,
        ];
    }

    /**
     * Series para las gráficas del tablero: el mes en curso por tipo de
     * actividad y el comportamiento de los últimos seis meses.
     *
     * Cada gráfica lleva una sola medida; actividades y beneficiarios van
     * separadas porque sus escalas no son comparables.
     *
     * @return array<string, mixed>
     */
    private function graficas(User $usuario, Carbon $hoy): array
    {
        $primerMes = $hoy->copy()->startOfMonth()->subMonths(5);

        $historico = Actividad::query()
            ->with('tipoActividad:id,nombre')
            ->withSum('beneficiarios as beneficiarios_sumados', 'cantidad')
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->entreFechas(
                $primerMes->toDateString(),
                $hoy->copy()->endOfMonth()->toDateString(),
            )
            ->get();

        $delMes = $historico->filter(
            fn (Actividad $actividad): bool => $actividad->fecha->isSameMonth($hoy)
        );

        $meses = collect(range(0, 5))->map(
            fn (int $atras): Carbon => $primerMes->copy()->addMonths($atras)
        );

        return [
            'porTipo' => $delMes
                ->groupBy(fn (Actividad $actividad): string => $actividad->tipoActividad->nombre)
                ->map(fn (Collection $grupo, string $nombre): array => [
                    'etiqueta' => $nombre,
                    'valor' => $grupo->count(),
                ])
                ->sortByDesc('valor')
                ->take(6)
                ->values()
                ->all(),
            'actividadesPorMes' => $meses->map(fn (Carbon $mes): array => [
                'etiqueta' => $this->etiquetaDeMes($mes),
                'valor' => $historico
                    ->filter(fn (Actividad $actividad): bool => $actividad->fecha->isSameMonth($mes))
                    ->count(),
            ])->all(),
            'beneficiariosPorMes' => $meses->map(fn (Carbon $mes): array => [
                'etiqueta' => $this->etiquetaDeMes($mes),
                'valor' => (int) $historico
                    ->filter(fn (Actividad $actividad): bool => $actividad->fecha->isSameMonth($mes))
                    ->sum('beneficiarios_sumados'),
            ])->all(),
        ];
    }

    private function etiquetaDeMes(Carbon $mes): string
    {
        return Str::ucfirst($mes->translatedFormat('M'));
    }

    /**
     * @return array<string, mixed>
     */
    private function proyectos(User $usuario): array
    {
        $proyectos = Proyecto::query()
            ->with('unidad:id,nombre')
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->get();

        return [
            'enEjecucion' => $proyectos
                ->whereIn('estado', [EstadoProyecto::Aprobado, EstadoProyecto::EnEjecucion])
                ->count(),
            'enRevision' => $proyectos->where('estado', EstadoProyecto::EnRevision)->count(),
            'cerrados' => $proyectos->where('estado', EstadoProyecto::Cerrado)->count(),
            'seguimiento' => $proyectos
                ->whereIn('estado', [EstadoProyecto::Aprobado, EstadoProyecto::EnEjecucion])
                ->take(5)
                ->map(fn (Proyecto $proyecto): array => [
                    'id' => $proyecto->id,
                    'nombre' => $proyecto->nombre,
                    'unidad' => $proyecto->unidad->nombre,
                    'avance_fisico' => $proyecto->avance_fisico,
                ])
                ->values()
                ->all(),
        ];
    }

    /**
     * Ocupación de los espacios en la semana en curso (RF-T.08).
     *
     * @return array<string, mixed>
     */
    private function espacios(User $usuario, Carbon $hoy): array
    {
        $desde = $hoy->copy()->startOfWeek(Carbon::MONDAY);
        $hasta = $hoy->copy()->endOfWeek(Carbon::SUNDAY);

        $reservas = SolicitudEspacio::query()
            ->with(['espacio:id,nombre'])
            ->aprobadas()
            ->whereDate('fecha', '>=', $desde->toDateString())
            ->whereDate('fecha', '<=', $hasta->toDateString())
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get();

        return [
            'total' => Espacio::query()->count(),
            'disponibles' => Espacio::query()->where('estado', EstadoEspacio::Activo)->count(),
            'enMantenimiento' => Espacio::query()->where('estado', EstadoEspacio::Mantenimiento)->count(),
            'reservasSemana' => $reservas->count(),
            'rango' => $desde->format('d-m').' – '.$hasta->format('d-m'),
            'proximas' => $reservas->take(5)->map(fn (SolicitudEspacio $reserva): array => [
                'id' => $reserva->id,
                'espacio' => $reserva->espacio->nombre,
                'fecha' => $reserva->fecha->toDateString(),
                'hora_inicio' => $reserva->horaInicioCorta(),
                'hora_fin' => $reserva->horaFinCorta(),
                'solicitante' => $reserva->solicitante_nombre,
            ])->values()->all(),
        ];
    }

    /**
     * @return array<string, int>
     */
    private function recursoHumano(User $usuario): array
    {
        $personas = PersonaRecursoHumano::query()->get(['id', 'tipo', 'activo']);

        return [
            'activos' => $personas->where('activo', true)->count(),
            'inactivos' => $personas->where('activo', false)->count(),
            'artistas' => $personas->where('activo', true)->where('tipo', TipoPersona::Artista)->count(),
            'deportistas' => $personas->where('activo', true)->where('tipo', TipoPersona::Deportista)->count(),
        ];
    }

    /**
     * Lo que espera una acción del usuario según su rol.
     *
     * @return array<int, array{etiqueta: string, total: int, ruta: string}>
     */
    private function pendientes(User $usuario): array
    {
        $pendientes = [];

        if ($usuario->tieneRol(Rol::Validador) || $usuario->esAdministrador()) {
            $pendientes[] = [
                'etiqueta' => 'Actividades por validar',
                'total' => Actividad::query()->where('estado', EstadoActividad::Enviada)->count(),
                'ruta' => route('actividades.revision'),
            ];
        }

        if ($usuario->tieneRol(Rol::Direccion, Rol::Validador) || $usuario->esAdministrador()) {
            $pendientes[] = [
                'etiqueta' => 'Proyectos por aprobar',
                'total' => Proyecto::query()->where('estado', EstadoProyecto::EnRevision)->count(),
                'ruta' => route('proyectos.aprobacion'),
            ];
        }

        if ($usuario->tieneRol(Rol::AdministradorEspacios) || $usuario->esAdministrador()) {
            $pendientes[] = [
                'etiqueta' => 'Solicitudes de espacio',
                'total' => SolicitudEspacio::query()->where('estado', EstadoSolicitud::Pendiente)->count(),
                'ruta' => route('solicitudes.index'),
            ];
        }

        if ($usuario->tieneRol(Rol::CoordinadorUnidad)) {
            $pendientes[] = [
                'etiqueta' => 'Actividades observadas',
                'total' => Actividad::query()
                    ->where('unidad_id', $usuario->unidad_id)
                    ->where('estado', EstadoActividad::Observada)
                    ->count(),
                'ruta' => route('actividades.index'),
            ];
        }

        return $pendientes;
    }
}
