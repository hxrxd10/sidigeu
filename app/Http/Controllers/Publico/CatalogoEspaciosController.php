<?php

namespace App\Http\Controllers\Publico;

use App\Http\Controllers\Controller;
use App\Models\Equipamiento;
use App\Models\Espacio;
use App\Models\EspacioFotografia;
use App\Models\Sede;
use App\Models\TipoEspacio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catálogo público de espacios (RF-3.02, RF-3.03). No requiere sesión y no
 * muestra disponibilidad: para conocerla hay que enviar una solicitud.
 */
class CatalogoEspaciosController extends Controller
{
    public function index(Request $request): Response
    {
        $filtros = [
            'sede_id' => $request->integer('sede_id'),
            'tipo_espacio_id' => $request->integer('tipo_espacio_id'),
            'capacidad' => $request->integer('capacidad'),
        ];

        $espacios = Espacio::query()
            ->publicos()
            ->with(['sede:id,nombre,direccion', 'tipoEspacio:id,nombre', 'fotografias'])
            ->when($filtros['sede_id'], fn ($query, $id) => $query->where('sede_id', $id))
            ->when($filtros['tipo_espacio_id'], fn ($query, $id) => $query->where('tipo_espacio_id', $id))
            ->when($filtros['capacidad'], fn ($query, $capacidad) => $query->where('capacidad', '>=', $capacidad))
            ->orderBy('sede_id')
            ->orderBy('nombre')
            ->get()
            ->map(fn (Espacio $espacio): array => $this->aTarjeta($espacio))
            ->all();

        return Inertia::render('publico/espacios/index', [
            'espacios' => $espacios,
            'filtros' => $filtros,
            'opciones' => [
                'sedes' => Sede::query()->activas()->orderBy('nombre')->get()
                    ->map(fn (Sede $sede): array => ['valor' => $sede->id, 'nombre' => $sede->nombre])->all(),
                'tipos' => TipoEspacio::query()->activos()->orderBy('nombre')->get()
                    ->map(fn (TipoEspacio $tipo): array => ['valor' => $tipo->id, 'nombre' => $tipo->nombre])->all(),
            ],
        ]);
    }

    public function show(Espacio $espacio): Response
    {
        abort_unless($espacio->visible_publico, 404);

        $espacio->load(['sede', 'tipoEspacio', 'equipamientos', 'fotografias']);

        return Inertia::render('publico/espacios/show', [
            'espacio' => [
                ...$this->aTarjeta($espacio),
                'condiciones_uso' => $espacio->condiciones_uso,
                'equipamientos' => $espacio->equipamientos->map(fn (Equipamiento $equipamiento): array => [
                    'nombre' => $equipamiento->nombre,
                    'cantidad' => (int) $equipamiento->pivot->cantidad,
                ])->all(),
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function aTarjeta(Espacio $espacio): array
    {
        return [
            'id' => $espacio->id,
            'nombre' => $espacio->nombre,
            'sede' => $espacio->sede->nombre,
            'direccion' => $espacio->sede->direccion,
            'tipo' => $espacio->tipoEspacio->nombre,
            'ubicacion' => $espacio->ubicacion,
            'capacidad' => $espacio->capacidad,
            'caracteristicas' => $espacio->caracteristicas,
            'en_mantenimiento' => ! $espacio->estado->admiteReservas(),
            'fotografias' => $espacio->fotografias->map(fn (EspacioFotografia $foto): string => Storage::disk('public')->url($foto->ruta))->all(),
        ];
    }
}
