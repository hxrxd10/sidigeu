<?php

namespace App\Http\Controllers\Proyectos;

use App\Actions\Proyectos\VincularActividad;
use App\Enums\EstadoProyecto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proyectos\ProyectoRequest;
use App\Models\Actividad;
use App\Models\Area;
use App\Models\Indicador;
use App\Models\LineaAccion;
use App\Models\PersonaRecursoHumano;
use App\Models\Programa;
use App\Models\Proyecto;
use App\Models\ProyectoAvance;
use App\Models\ProyectoPresupuesto;
use App\Models\ProyectoRevision;
use App\Models\ProyectoTarea;
use App\Models\TipoProyecto;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Registro y seguimiento de proyectos (Módulo 2).
 */
class ProyectoController extends Controller
{
    public function __construct(private VincularActividad $vinculacion) {}

    /**
     * Histórico de proyectos con filtros (RF-2.10).
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Proyecto::class);

        $usuario = $request->user();

        $filtros = [
            'busqueda' => $request->string('busqueda')->trim()->toString(),
            'estado' => $request->string('estado')->toString(),
            'unidad_id' => $request->integer('unidad_id'),
            'area_id' => $request->integer('area_id'),
            'programa_id' => $request->integer('programa_id'),
            'anio' => $request->integer('anio'),
        ];

        $proyectos = Proyecto::query()
            ->with(['unidad:id,nombre', 'responsable:id,name', 'tipoProyecto:id,nombre', 'programa:id,nombre'])
            ->withCount('actividades')
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->when($filtros['busqueda'] !== '', fn ($query) => $query->where('nombre', 'like', "%{$filtros['busqueda']}%"))
            ->when($filtros['estado'] !== '', fn ($query) => $query->where('estado', $filtros['estado']))
            ->when($filtros['unidad_id'], fn ($query, $id) => $query->where('unidad_id', $id))
            ->when($filtros['area_id'], fn ($query, $id) => $query->where('area_id', $id))
            ->when($filtros['programa_id'], fn ($query, $id) => $query->where('programa_id', $id))
            ->when($filtros['anio'], fn ($query, $anio) => $query->whereYear('fecha_inicio', $anio))
            ->orderByDesc('fecha_inicio')
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Proyecto $proyecto): array => $this->aFila($proyecto));

        return Inertia::render('proyectos/index', [
            'proyectos' => $proyectos,
            'filtros' => $filtros,
            'opciones' => $this->opciones($request),
            'puedeRegistrar' => Gate::allows('create', Proyecto::class),
        ]);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Proyecto::class);

        return Inertia::render('proyectos/create', ['opciones' => $this->opciones($request)]);
    }

    public function store(ProyectoRequest $request): RedirectResponse
    {
        $usuario = $request->user();

        $proyecto = Proyecto::create([
            ...$request->validated(),
            'unidad_id' => $usuario->unidad_id,
            'creado_por' => $usuario->id,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto registrado. Continúe con la formulación.']);

        return to_route('proyectos.formulacion.edit', $proyecto);
    }

    /**
     * Ficha del proyecto con su tablero de seguimiento (RF-2.07).
     */
    public function show(Proyecto $proyecto): Response
    {
        Gate::authorize('view', $proyecto);

        $proyecto->load([
            'unidad:id,nombre',
            'responsable:id,name',
            'area:id,nombre',
            'programa:id,nombre',
            'lineaAccion:id,nombre',
            'tipoProyecto:id,nombre',
            'objetivos',
            'beneficiarios',
            'cronograma.responsable:id,name',
            'presupuesto.fuente:id,nombre',
            'indicadores:id,nombre,unidad_medida',
            'avances.usuario:id,name',
            'avances.evidencias',
            'recursos.persona:id,nombres,apellidos',
            'revisiones.usuario:id,name',
            'evidencias',
            'actividades:id,nombre,fecha,estado,proyecto_id,unidad_id',
        ]);

        $consolidado = $this->vinculacion->consolidado($proyecto);

        return Inertia::render('proyectos/show', [
            'proyecto' => [
                ...$this->aFila($proyecto),
                'justificacion' => $proyecto->justificacion,
                'objetivo_general' => $proyecto->objetivo_general,
                'area' => $proyecto->area?->nombre,
                'programa' => $proyecto->programa?->nombre,
                'linea_accion' => $proyecto->lineaAccion?->nombre,
                'motivo_estado' => $proyecto->motivo_estado,
                'resultados' => $proyecto->resultados,
                'productos' => $proyecto->productos,
                'lecciones_aprendidas' => $proyecto->lecciones_aprendidas,
                'fecha_cierre' => $proyecto->fecha_cierre?->toDateTimeString(),
                'objetivos' => $proyecto->objetivos->pluck('descripcion')->all(),
                'beneficiarios' => $proyecto->beneficiarios->map(fn ($beneficiario): array => [
                    'tipo' => $beneficiario->tipo,
                    'cantidad' => $beneficiario->cantidad,
                    'descripcion' => $beneficiario->descripcion,
                ])->all(),
                'cronograma' => $proyecto->cronograma->map(fn (ProyectoTarea $tarea): array => [
                    'id' => $tarea->id,
                    'tarea' => $tarea->tarea,
                    'fecha_inicio' => $tarea->fecha_inicio?->toDateString(),
                    'fecha_fin' => $tarea->fecha_fin?->toDateString(),
                    'responsable' => $tarea->responsable?->name,
                    'avance' => $tarea->avance,
                ])->all(),
                'presupuesto' => $proyecto->presupuesto->map(fn (ProyectoPresupuesto $renglon): array => [
                    'id' => $renglon->id,
                    'descripcion' => $renglon->descripcion,
                    'cantidad' => $renglon->cantidad,
                    'costo_unitario' => $renglon->costo_unitario,
                    'subtotal' => $renglon->subtotal(),
                    'ejecutado' => $renglon->ejecutado,
                    'fuente' => $renglon->fuente?->nombre,
                ])->all(),
                'indicadores' => $proyecto->indicadores->map(fn (Indicador $indicador): array => [
                    'id' => $indicador->id,
                    'nombre' => $indicador->nombre,
                    'unidad_medida' => $indicador->unidad_medida,
                    'linea_base' => $indicador->detalleProyecto->linea_base,
                    'meta' => $indicador->detalleProyecto->meta,
                    'valor_final' => $indicador->detalleProyecto->valor_final,
                    'aporte_actividades' => $consolidado['indicadores'][$indicador->id] ?? 0,
                ])->all(),
                'avances' => $proyecto->avances->map(fn (ProyectoAvance $avance): array => [
                    'id' => $avance->id,
                    'fecha' => $avance->fecha->toDateString(),
                    'porcentaje' => $avance->porcentaje,
                    'descripcion' => $avance->descripcion,
                    'usuario' => $avance->usuario?->name,
                    'evidencias' => $avance->evidencias->map(fn ($evidencia): array => [
                        'id' => $evidencia->id,
                        'nombre' => $evidencia->nombre_original ?? $evidencia->descripcion ?? $evidencia->url,
                        'enlace' => $evidencia->enlace(),
                    ])->all(),
                ])->all(),
                'recursos' => $proyecto->recursos->map(fn ($recurso): array => [
                    'id' => $recurso->id,
                    'tipo' => $recurso->tipo->nombre(),
                    'descripcion' => $recurso->persona instanceof PersonaRecursoHumano
                        ? $recurso->persona->nombre_completo
                        : $recurso->descripcion,
                    'cantidad' => $recurso->cantidad,
                    'costo' => $recurso->costo,
                ])->all(),
                'actividades' => $proyecto->actividades->map(fn (Actividad $actividad): array => [
                    'id' => $actividad->id,
                    'nombre' => $actividad->nombre,
                    'fecha' => $actividad->fecha->toDateString(),
                    'estado' => $actividad->estado->value,
                    'estado_nombre' => $actividad->estado->nombre(),
                ])->all(),
                'evidencias' => $proyecto->evidencias->map(fn ($evidencia): array => [
                    'id' => $evidencia->id,
                    'nombre' => $evidencia->nombre_original ?? $evidencia->descripcion ?? $evidencia->url,
                    'enlace' => $evidencia->enlace(),
                ])->all(),
                'revisiones' => $proyecto->revisiones->map(fn (ProyectoRevision $revision): array => [
                    'id' => $revision->id,
                    'accion' => $revision->accion->nombre(),
                    'comentario' => $revision->comentario,
                    'usuario' => $revision->usuario?->name,
                    'fecha' => $revision->created_at?->format('d-m-Y H:i'),
                ])->all(),
                'seguimiento' => [
                    'avance_fisico' => $proyecto->avance_fisico,
                    'presupuesto_total' => $proyecto->presupuesto_total,
                    'presupuesto_ejecutado' => $proyecto->presupuesto_ejecutado,
                    'avance_financiero' => $proyecto->presupuesto_total > 0
                        ? round($proyecto->presupuesto_ejecutado / $proyecto->presupuesto_total * 100, 1)
                        : 0.0,
                    'actividades_cerradas' => $consolidado['actividades'],
                    'beneficiarios_actividades' => $consolidado['beneficiarios'],
                ],
            ],
            'permisos' => [
                'editar' => Gate::allows('update', $proyecto) && $proyecto->estado->esEditable(),
                'enviar' => Gate::allows('enviar', $proyecto) && $proyecto->estado->esEditable(),
                'aprobar' => Gate::allows('aprobar', $proyecto)
                    && $proyecto->estado === EstadoProyecto::EnRevision,
                'gestionar' => Gate::allows('gestionarEjecucion', $proyecto)
                    && $proyecto->estado->admiteEjecucion(),
            ],
            'actividadesDisponibles' => Gate::allows('gestionarEjecucion', $proyecto)
                ? Actividad::query()
                    ->where('unidad_id', $proyecto->unidad_id)
                    ->whereNull('proyecto_id')
                    ->orderByDesc('fecha')
                    ->limit(50)
                    ->get()
                    ->map(fn (Actividad $actividad): array => [
                        'valor' => $actividad->id,
                        'nombre' => $actividad->nombre.' ('.$actividad->fecha->format('d-m-Y').')',
                    ])->all()
                : [],
        ]);
    }

    public function edit(Proyecto $proyecto, Request $request): Response
    {
        Gate::authorize('update', $proyecto);

        return Inertia::render('proyectos/edit', [
            'proyecto' => [
                'id' => $proyecto->id,
                'nombre' => $proyecto->nombre,
                'responsable_id' => $proyecto->responsable_id,
                'area_id' => $proyecto->area_id,
                'programa_id' => $proyecto->programa_id,
                'linea_accion_id' => $proyecto->linea_accion_id,
                'tipo_proyecto_id' => $proyecto->tipo_proyecto_id,
                'justificacion' => $proyecto->justificacion,
                'objetivo_general' => $proyecto->objetivo_general,
                'fecha_inicio' => $proyecto->fecha_inicio?->toDateString(),
                'fecha_fin' => $proyecto->fecha_fin?->toDateString(),
            ],
            'opciones' => $this->opciones($request),
        ]);
    }

    public function update(ProyectoRequest $request, Proyecto $proyecto): RedirectResponse
    {
        $proyecto->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto actualizado.']);

        return to_route('proyectos.show', $proyecto);
    }

    public function destroy(Proyecto $proyecto): RedirectResponse
    {
        Gate::authorize('delete', $proyecto);

        $proyecto->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto eliminado.']);

        return to_route('proyectos.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function aFila(Proyecto $proyecto): array
    {
        return [
            'id' => $proyecto->id,
            'nombre' => $proyecto->nombre,
            'unidad' => $proyecto->unidad->nombre,
            'unidad_id' => $proyecto->unidad_id,
            'responsable' => $proyecto->responsable?->name,
            'tipo' => $proyecto->tipoProyecto?->nombre,
            'programa_nombre' => $proyecto->programa?->nombre,
            'fecha_inicio' => $proyecto->fecha_inicio?->toDateString(),
            'fecha_fin' => $proyecto->fecha_fin?->toDateString(),
            'estado' => $proyecto->estado->value,
            'estado_nombre' => $proyecto->estado->nombre(),
            'actividades_count' => $proyecto->actividades_count ?? $proyecto->actividades()->count(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function opciones(Request $request): array
    {
        return [
            'unidades' => Unidad::query()->activas()->orderBy('nombre')->get()
                ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])->all(),
            'areas' => Area::query()->activas()->orderBy('nombre')->get()
                ->map(fn (Area $area): array => ['valor' => $area->id, 'nombre' => $area->nombre])->all(),
            'programas' => Programa::query()->activos()->orderBy('nombre')->get()
                ->map(fn (Programa $programa): array => ['valor' => $programa->id, 'nombre' => $programa->nombre])->all(),
            'lineas' => LineaAccion::query()->activos()->orderBy('nombre')->get()
                ->map(fn (LineaAccion $linea): array => ['valor' => $linea->id, 'nombre' => $linea->nombre])->all(),
            'tipos' => TipoProyecto::query()->activos()->orderBy('nombre')->get()
                ->map(fn (TipoProyecto $tipo): array => ['valor' => $tipo->id, 'nombre' => $tipo->nombre])->all(),
            'responsables' => User::query()->activos()
                ->when(
                    ! $request->user()->tieneAlcanceGlobal(),
                    fn ($query) => $query->where('unidad_id', $request->user()->unidad_id)
                )
                ->orderBy('name')
                ->get()
                ->map(fn (User $usuario): array => ['valor' => $usuario->id, 'nombre' => $usuario->name])->all(),
            'estados' => EstadoProyecto::opciones(),
        ];
    }
}
