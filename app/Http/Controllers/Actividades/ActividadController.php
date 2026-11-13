<?php

namespace App\Http\Controllers\Actividades;

use App\Actions\Actividades\GuardarActividad;
use App\Enums\EstadoActividad;
use App\Http\Controllers\Controller;
use App\Http\Requests\Actividades\ActividadRequest;
use App\Models\Actividad;
use App\Models\ActividadParticipante;
use App\Models\ActividadRevision;
use App\Models\Espacio;
use App\Models\Evidencia;
use App\Models\Indicador;
use App\Models\LineaAccion;
use App\Models\PublicoObjetivo;
use App\Models\TipoActividad;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Programación mensual de actividades (Módulo 1).
 */
class ActividadController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Actividad::class);

        $usuario = $request->user();
        $mes = $request->string('mes')->toString() ?: Carbon::today()->format('Y-m');
        [$anio, $numeroMes] = $this->partirMes($mes);

        $filtros = [
            'mes' => $mes,
            'unidad_id' => $request->integer('unidad_id') ?: ($usuario->tieneAlcanceGlobal() ? null : $usuario->unidad_id),
            'estado' => $request->string('estado')->toString(),
            'busqueda' => $request->string('busqueda')->trim()->toString(),
        ];

        $actividades = Actividad::query()
            ->with(['unidad:id,nombre', 'tipoActividad:id,nombre', 'espacio:id,nombre', 'responsable:id,name'])
            ->delMes($anio, $numeroMes)
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->when($filtros['unidad_id'], fn ($query, $id) => $query->where('unidad_id', $id))
            ->when($filtros['estado'] !== '', fn ($query) => $query->where('estado', $filtros['estado']))
            ->when(
                $filtros['busqueda'] !== '',
                fn ($query) => $query->where('nombre', 'like', "%{$filtros['busqueda']}%")
            )
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->paginate(20)
            ->withQueryString()
            ->through(fn (Actividad $actividad): array => $this->aFila($actividad));

        return Inertia::render('actividades/index', [
            'actividades' => $actividades,
            'filtros' => $filtros,
            'opciones' => $this->opciones($request),
            'puedeRegistrar' => Gate::allows('create', Actividad::class),
        ]);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Actividad::class);

        return Inertia::render('actividades/create', [
            'opciones' => $this->opciones($request),
            'esLogro' => $request->boolean('logro'),
        ]);
    }

    public function store(ActividadRequest $request, GuardarActividad $guardar): RedirectResponse
    {
        $usuario = $request->user();

        $actividad = $guardar->crear(
            [...$request->datos(), 'unidad_id' => $usuario->unidad_id],
            $request->publicos(),
            $request->indicadores(),
            $usuario,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad registrada en borrador.']);

        return to_route('actividades.show', $actividad);
    }

    public function show(Actividad $actividad): Response
    {
        Gate::authorize('view', $actividad);

        $actividad->load([
            'unidad:id,nombre',
            'tipoActividad:id,nombre',
            'lineaAccion:id,nombre',
            'espacio:id,nombre,sede_id',
            'espacio.sede:id,nombre',
            'responsable:id,name',
            'publicosObjetivo:id,nombre',
            'indicadores:id,nombre,unidad_medida',
            'beneficiarios',
            'participantes.persona:id,nombres,apellidos',
            'revisiones.usuario:id,name',
            'reprogramaciones.usuario:id,name',
            'evidencias',
        ]);

        return Inertia::render('actividades/show', [
            'actividad' => [
                ...$this->aFila($actividad),
                'descripcion' => $actividad->descripcion,
                'linea_accion' => $actividad->lineaAccion->nombre,
                'resultados' => $actividad->resultados,
                'observaciones' => $actividad->observaciones,
                'motivo_cancelacion' => $actividad->motivo_cancelacion,
                'fecha_cierre' => $actividad->fecha_cierre?->toDateTimeString(),
                'publicos' => $actividad->publicosObjetivo->pluck('nombre')->all(),
                'indicadores' => $actividad->indicadores->map(fn (Indicador $indicador): array => [
                    'id' => $indicador->id,
                    'nombre' => $indicador->nombre,
                    'unidad_medida' => $indicador->unidad_medida,
                    'valor_meta' => $indicador->pivot->valor_meta,
                    'valor_alcanzado' => $indicador->pivot->valor_alcanzado,
                ])->all(),
                'beneficiarios' => $actividad->beneficiarios->map(fn ($beneficiario): array => [
                    'sexo' => $beneficiario->sexo->nombre(),
                    'rango_edad' => $beneficiario->rango_edad->nombre(),
                    'tipo_publico' => $beneficiario->tipo_publico,
                    'cantidad' => $beneficiario->cantidad,
                ])->all(),
                'beneficiarios_total' => $actividad->beneficiarios_total,
                'participantes' => $actividad->participantes
                    ->map(fn (ActividadParticipante $participante): array => [
                        'nombre' => $participante->nombre(),
                        'rol' => $participante->rol,
                        'del_padron' => $participante->persona_recurso_humano_id !== null,
                    ])->all(),
                'evidencias' => $actividad->evidencias->map(fn (Evidencia $evidencia): array => [
                    'id' => $evidencia->id,
                    'tipo' => $evidencia->tipo->value,
                    'tipo_nombre' => $evidencia->tipo->nombre(),
                    'nombre' => $evidencia->nombre_original ?? $evidencia->descripcion ?? $evidencia->url,
                    'enlace' => $evidencia->enlace(),
                ])->all(),
                'revisiones' => $actividad->revisiones->map(fn (ActividadRevision $revision): array => [
                    'id' => $revision->id,
                    'accion' => $revision->accion->nombre(),
                    'comentario' => $revision->comentario,
                    'usuario' => $revision->usuario?->name,
                    'fecha' => $revision->created_at?->format('d-m-Y H:i'),
                ])->all(),
                'reprogramaciones' => $actividad->reprogramaciones->map(fn ($reprogramacion): array => [
                    'id' => $reprogramacion->id,
                    'fecha_anterior' => $reprogramacion->fecha_anterior->toDateString(),
                    'fecha_nueva' => $reprogramacion->fecha_nueva->toDateString(),
                    'motivo' => $reprogramacion->motivo,
                    'usuario' => $reprogramacion->usuario?->name,
                ])->all(),
            ],
            // El estado se comprueba también aquí: `Gate::before` concede todo al
            // Administrador y la interfaz no debe ofrecer acciones imposibles.
            'permisos' => [
                'editar' => Gate::allows('update', $actividad) && $actividad->estado->esEditable(),
                'enviar' => Gate::allows('enviar', $actividad) && $actividad->estado->esEditable(),
                'validar' => Gate::allows('validar', $actividad)
                    && $actividad->estado === EstadoActividad::Enviada,
                'gestionar' => Gate::allows('gestionarEjecucion', $actividad)
                    && ! $actividad->estado->esFinal()
                    && ! $actividad->estado->esEditable(),
                'publicarAgenda' => Gate::allows('gestionarAgenda', $actividad)
                    && $actividad->estado->admiteCambioDeAgenda()
                    && ! $actividad->publicar_agenda,
                'quitarAgenda' => Gate::allows('gestionarAgenda', $actividad)
                    && $actividad->estado->admiteCambioDeAgenda()
                    && $actividad->publicar_agenda,
            ],
        ]);
    }

    public function edit(Actividad $actividad, Request $request): Response
    {
        Gate::authorize('update', $actividad);

        $actividad->load(['publicosObjetivo:id', 'indicadores:id']);

        return Inertia::render('actividades/edit', [
            'actividad' => [
                'id' => $actividad->id,
                'nombre' => $actividad->nombre,
                'fecha' => $actividad->fecha->toDateString(),
                'hora_inicio' => $actividad->horaInicioCorta(),
                'hora_fin' => $actividad->horaFinCorta(),
                'espacio_id' => $actividad->espacio_id,
                'lugar_externo' => $actividad->lugar_externo,
                'tipo_actividad_id' => $actividad->tipo_actividad_id,
                'linea_accion_id' => $actividad->linea_accion_id,
                'responsable_id' => $actividad->responsable_id,
                'publicar_agenda' => $actividad->publicar_agenda,
                'descripcion' => $actividad->descripcion,
                'publicos' => $actividad->publicosObjetivo->pluck('id')->all(),
                'indicadores' => $actividad->indicadores->map(fn (Indicador $indicador): array => [
                    'indicador_id' => $indicador->id,
                    'valor_meta' => $indicador->pivot->valor_meta,
                ])->all(),
            ],
            'opciones' => $this->opciones($request),
        ]);
    }

    public function update(ActividadRequest $request, Actividad $actividad, GuardarActividad $guardar): RedirectResponse
    {
        $guardar->actualizar(
            $actividad,
            $request->datos(),
            $request->publicos(),
            $request->indicadores(),
            $request->user(),
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad actualizada.']);

        return to_route('actividades.show', $actividad);
    }

    public function destroy(Actividad $actividad): RedirectResponse
    {
        Gate::authorize('delete', $actividad);

        $actividad->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Borrador eliminado.']);

        return to_route('actividades.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function aFila(Actividad $actividad): array
    {
        return [
            'id' => $actividad->id,
            'nombre' => $actividad->nombre,
            'unidad' => $actividad->unidad->nombre,
            'unidad_id' => $actividad->unidad_id,
            'fecha' => $actividad->fecha->toDateString(),
            'hora_inicio' => $actividad->horaInicioCorta(),
            'hora_fin' => $actividad->horaFinCorta(),
            'lugar' => $actividad->lugar,
            'tipo' => $actividad->tipoActividad->nombre,
            'responsable' => $actividad->responsable?->name,
            'estado' => $actividad->estado->value,
            'estado_nombre' => $actividad->estado->nombre(),
            'publicar_agenda' => $actividad->publicar_agenda,
            'es_logro_no_programado' => $actividad->es_logro_no_programado,
        ];
    }

    /**
     * @return array{0: int, 1: int}
     */
    private function partirMes(string $mes): array
    {
        try {
            $fecha = Carbon::createFromFormat('Y-m', $mes);
        } catch (\Exception) {
            $fecha = Carbon::today();
        }

        return [(int) $fecha->format('Y'), (int) $fecha->format('n')];
    }

    /**
     * @return array<string, mixed>
     */
    private function opciones(Request $request): array
    {
        return [
            'unidades' => Unidad::query()->activas()->orderBy('nombre')->get()
                ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])->all(),
            'tipos' => TipoActividad::query()->activos()->orderBy('nombre')->get()
                ->map(fn (TipoActividad $tipo): array => ['valor' => $tipo->id, 'nombre' => $tipo->nombre])->all(),
            'lineas' => LineaAccion::query()->activos()->orderBy('nombre')->get()
                ->map(fn (LineaAccion $linea): array => ['valor' => $linea->id, 'nombre' => $linea->nombre])->all(),
            'publicos' => PublicoObjetivo::query()->activos()->orderBy('nombre')->get()
                ->map(fn (PublicoObjetivo $publico): array => ['valor' => $publico->id, 'nombre' => $publico->nombre])->all(),
            'indicadores' => Indicador::query()->activos()->orderBy('nombre')->get()
                ->map(fn (Indicador $indicador): array => [
                    'valor' => $indicador->id,
                    'nombre' => $indicador->nombre,
                    'unidad_medida' => $indicador->unidad_medida,
                ])->all(),
            'espacios' => Espacio::query()->reservables()->with('sede:id,nombre')->orderBy('nombre')->get()
                ->map(fn (Espacio $espacio): array => [
                    'valor' => $espacio->id,
                    'nombre' => $espacio->nombre.' — '.$espacio->sede->nombre,
                ])->all(),
            'responsables' => User::query()->activos()
                ->when(
                    ! $request->user()->tieneAlcanceGlobal(),
                    fn ($query) => $query->where('unidad_id', $request->user()->unidad_id)
                )
                ->orderBy('name')
                ->get()
                ->map(fn (User $usuario): array => ['valor' => $usuario->id, 'nombre' => $usuario->name])->all(),
            'estados' => EstadoActividad::opciones(),
        ];
    }
}
