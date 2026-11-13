<?php

namespace App\Http\Controllers\Espacios;

use App\Enums\EstadoEspacio;
use App\Enums\EstadoSolicitud;
use App\Http\Controllers\Controller;
use App\Http\Requests\Espacios\EspacioRequest;
use App\Models\Equipamiento;
use App\Models\Espacio;
use App\Models\EspacioFotografia;
use App\Models\Sede;
use App\Models\SolicitudEspacio;
use App\Models\TipoEspacio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Gestión interna de sedes y espacios (RF-3.01, RF-3.02, RF-3.09).
 */
class EspacioController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Espacio::class);

        $filtros = [
            'busqueda' => $request->string('busqueda')->trim()->toString(),
            'sede_id' => $request->integer('sede_id'),
            'tipo_espacio_id' => $request->integer('tipo_espacio_id'),
            'estado' => $request->string('estado')->toString(),
        ];

        $espacios = Espacio::query()
            ->with(['sede:id,nombre', 'tipoEspacio:id,nombre'])
            ->withCount(['solicitudes as reservas_aprobadas' => fn ($query) => $query->aprobadas()])
            ->when($filtros['busqueda'] !== '', fn ($query) => $query->where('nombre', 'like', "%{$filtros['busqueda']}%"))
            ->when($filtros['sede_id'], fn ($query, $id) => $query->where('sede_id', $id))
            ->when($filtros['tipo_espacio_id'], fn ($query, $id) => $query->where('tipo_espacio_id', $id))
            ->when($filtros['estado'] !== '', fn ($query) => $query->where('estado', $filtros['estado']))
            ->orderBy('sede_id')
            ->orderBy('nombre')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Espacio $espacio): array => [
                'id' => $espacio->id,
                'nombre' => $espacio->nombre,
                'sede' => $espacio->sede->nombre,
                'tipo' => $espacio->tipoEspacio->nombre,
                'capacidad' => $espacio->capacidad,
                'estado' => $espacio->estado->value,
                'estado_nombre' => $espacio->estado->nombre(),
                'visible_publico' => $espacio->visible_publico,
                'reservas_aprobadas' => $espacio->reservas_aprobadas,
            ]);

        return Inertia::render('espacios/index', [
            'espacios' => $espacios,
            'filtros' => $filtros,
            'opciones' => $this->opciones(),
            'puedeGestionar' => Gate::allows('create', Espacio::class),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Espacio::class);

        return Inertia::render('espacios/create', ['opciones' => $this->opciones()]);
    }

    public function store(EspacioRequest $request): RedirectResponse
    {
        $espacio = DB::transaction(function () use ($request): Espacio {
            $espacio = Espacio::create($request->safe()->except(['equipamientos', 'cantidades', 'fotografias']));

            $this->sincronizarEquipamiento($espacio, $request);
            $this->guardarFotografias($espacio, $request->file('fotografias', []));

            return $espacio;
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Espacio registrado.']);

        return to_route('espacios.show', $espacio);
    }

    /**
     * Ficha del espacio con su historial de uso (RF-3.09).
     */
    public function show(Espacio $espacio): Response
    {
        Gate::authorize('view', $espacio);

        $espacio->load(['sede', 'tipoEspacio', 'equipamientos', 'fotografias']);

        $historial = $espacio->solicitudes()
            ->whereIn('estado', [EstadoSolicitud::Aprobada, EstadoSolicitud::Rechazada])
            ->orderByDesc('fecha')
            ->orderByDesc('hora_inicio')
            ->limit(50)
            ->get()
            ->map(fn (SolicitudEspacio $solicitud): array => [
                'id' => $solicitud->id,
                'fecha' => $solicitud->fecha->toDateString(),
                'hora_inicio' => $solicitud->horaInicioCorta(),
                'hora_fin' => $solicitud->horaFinCorta(),
                'solicitante' => $solicitud->solicitante_nombre,
                'institucion' => $solicitud->institucion,
                'asistentes' => $solicitud->asistentes,
                'proposito' => $solicitud->proposito,
                'estado' => $solicitud->estado->value,
                'estado_nombre' => $solicitud->estado->nombre(),
            ])->all();

        return Inertia::render('espacios/show', [
            'espacio' => $this->aFicha($espacio),
            'historial' => $historial,
            'puedeGestionar' => Gate::allows('update', $espacio),
        ]);
    }

    public function edit(Espacio $espacio): Response
    {
        Gate::authorize('update', $espacio);

        $espacio->load(['equipamientos', 'fotografias']);

        return Inertia::render('espacios/edit', [
            'espacio' => $this->aFicha($espacio),
            'opciones' => $this->opciones(),
        ]);
    }

    public function update(EspacioRequest $request, Espacio $espacio): RedirectResponse
    {
        DB::transaction(function () use ($request, $espacio): void {
            $espacio->update($request->safe()->except(['equipamientos', 'cantidades', 'fotografias']));

            $this->sincronizarEquipamiento($espacio, $request);
            $this->guardarFotografias($espacio, $request->file('fotografias', []));
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Espacio actualizado.']);

        return to_route('espacios.show', $espacio);
    }

    public function destroy(Espacio $espacio): RedirectResponse
    {
        Gate::authorize('delete', $espacio);

        $espacio->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Espacio eliminado.']);

        return to_route('espacios.index');
    }

    public function eliminarFotografia(Espacio $espacio, EspacioFotografia $fotografia): RedirectResponse
    {
        Gate::authorize('update', $espacio);
        abort_unless($fotografia->espacio_id === $espacio->id, 404);

        Storage::disk('public')->delete($fotografia->ruta);
        $fotografia->delete();

        return back();
    }

    private function sincronizarEquipamiento(Espacio $espacio, EspacioRequest $request): void
    {
        /** @var array<int, int> $seleccionados */
        $seleccionados = $request->input('equipamientos', []);
        /** @var array<int|string, int|null> $cantidades */
        $cantidades = $request->input('cantidades', []);

        $espacio->equipamientos()->sync(
            collect($seleccionados)
                ->mapWithKeys(fn (int $id): array => [
                    $id => ['cantidad' => (int) ($cantidades[$id] ?? 1)],
                ])
                ->all()
        );
    }

    /**
     * @param  array<int, UploadedFile>  $fotografias
     */
    private function guardarFotografias(Espacio $espacio, array $fotografias): void
    {
        $orden = (int) $espacio->fotografias()->max('orden');

        foreach ($fotografias as $fotografia) {
            $ruta = $fotografia->store('espacios/fotografias', 'public');

            if ($ruta === false) {
                continue;
            }

            $espacio->fotografias()->create(['ruta' => $ruta, 'orden' => ++$orden]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function aFicha(Espacio $espacio): array
    {
        return [
            'id' => $espacio->id,
            'nombre' => $espacio->nombre,
            'sede_id' => $espacio->sede_id,
            'sede' => $espacio->sede->nombre,
            'direccion_sede' => $espacio->sede->direccion,
            'tipo_espacio_id' => $espacio->tipo_espacio_id,
            'tipo' => $espacio->tipoEspacio->nombre,
            'ubicacion' => $espacio->ubicacion,
            'capacidad' => $espacio->capacidad,
            'caracteristicas' => $espacio->caracteristicas,
            'condiciones_uso' => $espacio->condiciones_uso,
            'estado' => $espacio->estado->value,
            'estado_nombre' => $espacio->estado->nombre(),
            'visible_publico' => $espacio->visible_publico,
            'equipamientos' => $espacio->equipamientos->map(fn (Equipamiento $equipamiento): array => [
                'id' => $equipamiento->id,
                'nombre' => $equipamiento->nombre,
                'cantidad' => (int) $equipamiento->pivot->cantidad,
            ])->all(),
            'fotografias' => $espacio->fotografias->map(fn (EspacioFotografia $foto): array => [
                'id' => $foto->id,
                'url' => Storage::disk('public')->url($foto->ruta),
            ])->all(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function opciones(): array
    {
        return [
            'sedes' => Sede::query()->activas()->orderBy('nombre')->get()
                ->map(fn (Sede $sede): array => ['valor' => $sede->id, 'nombre' => $sede->nombre])->all(),
            'tipos' => TipoEspacio::query()->activos()->orderBy('nombre')->get()
                ->map(fn (TipoEspacio $tipo): array => ['valor' => $tipo->id, 'nombre' => $tipo->nombre])->all(),
            'equipamientos' => Equipamiento::query()->activos()->orderBy('nombre')->get()
                ->map(fn (Equipamiento $equipamiento): array => ['valor' => $equipamiento->id, 'nombre' => $equipamiento->nombre])->all(),
            'estados' => EstadoEspacio::opciones(),
        ];
    }
}
