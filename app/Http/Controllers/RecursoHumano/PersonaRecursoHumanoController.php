<?php

namespace App\Http\Controllers\RecursoHumano;

use App\Actions\RecursoHumano\ActualizarPersona;
use App\Actions\RecursoHumano\GuardarFotografia;
use App\Actions\RecursoHumano\RegistrarPersona;
use App\Enums\AccionAuditoria;
use App\Enums\TipoPersona;
use App\Http\Controllers\Controller;
use App\Http\Requests\RecursoHumano\StorePersonaRequest;
use App\Http\Requests\RecursoHumano\UpdatePersonaRequest;
use App\Models\Agrupacion;
use App\Models\Disciplina;
use App\Models\Pais;
use App\Models\PersonaRecursoHumano;
use App\Models\PersonaRecursoHumanoPeriodo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Padrón de artistas y deportistas (Módulo 4).
 */
class PersonaRecursoHumanoController extends Controller
{
    /**
     * Listado con búsqueda y filtros (RF-4.04).
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', PersonaRecursoHumano::class);

        $filtros = [
            'busqueda' => $request->string('busqueda')->trim()->toString(),
            'tipo' => $request->string('tipo')->toString(),
            'disciplina_id' => $request->integer('disciplina_id'),
            'pais_id' => $request->integer('pais_id'),
            'estado' => $request->string('estado')->toString(),
        ];

        $personas = PersonaRecursoHumano::query()
            ->with(['disciplina:id,nombre', 'agrupacion:id,nombre', 'pais:id,nombre'])
            ->buscar($filtros['busqueda'])
            ->when($filtros['tipo'] !== '', fn ($query) => $query->where('tipo', $filtros['tipo']))
            ->when($filtros['disciplina_id'], fn ($query, $id) => $query->where('disciplina_id', $id))
            ->when($filtros['pais_id'], fn ($query, $id) => $query->where('pais_id', $id))
            ->when(
                $filtros['estado'] !== '',
                fn ($query) => $query->where('activo', $filtros['estado'] === 'activos')
            )
            ->orderBy('apellidos')
            ->orderBy('nombres')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (PersonaRecursoHumano $persona): array => $this->aFila($persona));

        return Inertia::render('recurso-humano/index', [
            'personas' => $personas,
            'filtros' => $filtros,
            'opciones' => $this->opciones(),
            'puedeGestionar' => Gate::allows('create', PersonaRecursoHumano::class),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', PersonaRecursoHumano::class);

        return Inertia::render('recurso-humano/create', [
            'opciones' => $this->opciones(),
        ]);
    }

    public function store(StorePersonaRequest $request, RegistrarPersona $registrar): RedirectResponse
    {
        $persona = $registrar->handle(
            collect($request->validated())->except('foto')->all(),
            $request->file('foto'),
        );

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $persona->nombre_completo.' se agregó al padrón.',
        ]);

        return to_route('recurso-humano.show', $persona);
    }

    /**
     * Ficha individual (RF-4.05). Consultar los datos sensibles queda en la
     * bitácora (RNF-05).
     */
    public function show(PersonaRecursoHumano $persona): Response
    {
        Gate::authorize('view', $persona);

        $persona->load(['disciplina:id,nombre', 'agrupacion:id,nombre', 'pais:id,nombre', 'periodos']);

        $verDatosSensibles = Gate::allows('verDatosSensibles', $persona);

        if ($verDatosSensibles) {
            $persona->registrarAuditoria(AccionAuditoria::Consultado);
        }

        return Inertia::render('recurso-humano/show', [
            'persona' => [
                ...$this->aFila($persona),
                'biografia' => $persona->biografia,
                'fecha_nacimiento' => $persona->fecha_nacimiento->toDateString(),
                'fecha_alta' => $persona->fecha_alta->toDateString(),
                'fecha_baja' => $persona->fecha_baja?->toDateString(),
                'motivo_baja' => $persona->motivo_baja,
                'permanencia_total' => $persona->permanenciaTotal(),
                'periodos' => $persona->periodos
                    ->sortBy('fecha_alta')
                    ->values()
                    ->map(fn (PersonaRecursoHumanoPeriodo $periodo): array => [
                        'id' => $periodo->id,
                        'fecha_alta' => $periodo->fecha_alta->toDateString(),
                        'fecha_baja' => $periodo->fecha_baja?->toDateString(),
                        'motivo_baja' => $periodo->motivo_baja,
                        'dias' => $periodo->diasDuracion(),
                    ])->all(),
            ],
            'puedeGestionar' => Gate::allows('update', $persona),
        ]);
    }

    public function edit(PersonaRecursoHumano $persona): Response
    {
        Gate::authorize('update', $persona);

        return Inertia::render('recurso-humano/edit', [
            'persona' => [
                'id' => $persona->id,
                'tipo' => $persona->tipo->value,
                'disciplina_id' => $persona->disciplina_id,
                'agrupacion_id' => $persona->agrupacion_id,
                'nombres' => $persona->nombres,
                'apellidos' => $persona->apellidos,
                'pais_id' => $persona->pais_id,
                'fecha_nacimiento' => $persona->fecha_nacimiento->toDateString(),
                'dpi' => $persona->dpi,
                'pasaporte' => $persona->pasaporte,
                'fecha_alta' => $persona->fecha_alta->toDateString(),
                'biografia' => $persona->biografia,
                'foto_url' => $this->urlFoto($persona),
                'nombre_completo' => $persona->nombre_completo,
            ],
            'opciones' => $this->opciones(),
        ]);
    }

    public function update(
        UpdatePersonaRequest $request,
        PersonaRecursoHumano $persona,
        ActualizarPersona $actualizar,
    ): RedirectResponse {
        $actualizar->handle(
            $persona,
            collect($request->validated())->except('foto')->all(),
            $request->file('foto'),
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Registro actualizado.']);

        return to_route('recurso-humano.show', $persona);
    }

    public function destroy(PersonaRecursoHumano $persona, GuardarFotografia $fotografia): RedirectResponse
    {
        Gate::authorize('delete', $persona);

        $persona->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $persona->nombre_completo.' se eliminó del padrón.',
        ]);

        return to_route('recurso-humano.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function aFila(PersonaRecursoHumano $persona): array
    {
        $verDatosSensibles = Gate::allows('verDatosSensibles', $persona);

        return [
            'id' => $persona->id,
            'nombres' => $persona->nombres,
            'apellidos' => $persona->apellidos,
            'nombre_completo' => $persona->nombre_completo,
            'tipo' => $persona->tipo->value,
            'tipo_nombre' => $persona->tipo->nombre(),
            'disciplina' => $persona->disciplina?->nombre,
            'agrupacion' => $persona->agrupacion?->nombre,
            'pais' => $persona->pais?->nombre,
            'edad' => $persona->edad,
            'activo' => $persona->activo,
            'permanencia' => $persona->permanencia(),
            'foto_url' => $this->urlFoto($persona),
            'dpi' => $verDatosSensibles ? $persona->dpi : null,
            'pasaporte' => $verDatosSensibles ? $persona->pasaporte : null,
            'documento_oculto' => ! $verDatosSensibles,
        ];
    }

    private function urlFoto(PersonaRecursoHumano $persona): ?string
    {
        return $persona->foto_ruta === null ? null : Storage::disk('public')->url($persona->foto_ruta);
    }

    /**
     * Catálogos que alimentan los formularios y filtros.
     *
     * @return array<string, mixed>
     */
    private function opciones(): array
    {
        return [
            'tipos' => TipoPersona::opciones(),
            'disciplinas' => Disciplina::query()
                ->activos()
                ->orderBy('nombre')
                ->get()
                ->map(fn (Disciplina $disciplina): array => [
                    'valor' => $disciplina->id,
                    'nombre' => $disciplina->nombre,
                    'tipo' => $disciplina->tipo->value,
                ])->all(),
            'agrupaciones' => Agrupacion::query()
                ->activos()
                ->orderBy('nombre')
                ->get()
                ->map(fn (Agrupacion $agrupacion): array => [
                    'valor' => $agrupacion->id,
                    'nombre' => $agrupacion->nombre,
                ])->all(),
            'paises' => Pais::query()
                ->activos()
                ->orderBy('nombre')
                ->get()
                ->map(fn (Pais $pais): array => [
                    'valor' => $pais->id,
                    'nombre' => $pais->nombre,
                    'codigo' => $pais->codigo,
                ])->all(),
        ];
    }
}
