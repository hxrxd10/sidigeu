<?php

namespace App\Http\Controllers\Catalogos;

use App\Enums\Catalogo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalogos\CatalogoRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CatalogoController extends Controller
{
    /**
     * Lista los catálogos administrables (RF-T.04).
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Catalogo::Areas->modelo());

        return Inertia::render('catalogos/index', [
            'catalogos' => array_map(
                fn (Catalogo $catalogo): array => [
                    'clave' => $catalogo->value,
                    'etiqueta' => $catalogo->etiqueta(),
                    'descripcion' => $catalogo->descripcion(),
                    'total' => $catalogo->modelo()::query()->count(),
                ],
                Catalogo::administrables(),
            ),
        ]);
    }

    /**
     * Muestra los valores de un catálogo.
     */
    public function show(Catalogo $catalogo): Response
    {
        Gate::authorize('viewAny', $catalogo->modelo());

        return Inertia::render('catalogos/show', [
            'catalogo' => [
                'clave' => $catalogo->value,
                'etiqueta' => $catalogo->etiqueta(),
                'etiquetaSingular' => $catalogo->etiquetaSingular(),
                'descripcion' => $catalogo->descripcion(),
                'campos' => $catalogo->campos(),
                'opciones' => $catalogo->opciones(),
            ],
            'registros' => $catalogo->modelo()::query()
                ->orderBy('nombre')
                ->get()
                ->map(fn (Model $registro): array => $this->aArreglo($catalogo, $registro))
                ->all(),
            'puedeAdministrar' => Gate::allows('create', $catalogo->modelo()),
        ]);
    }

    public function store(CatalogoRequest $request, Catalogo $catalogo): RedirectResponse
    {
        $catalogo->modelo()::query()->create($request->datos());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $catalogo->etiquetaSingular().' agregada al catálogo.',
        ]);

        return to_route('catalogos.show', $catalogo->value);
    }

    public function update(CatalogoRequest $request, Catalogo $catalogo, int $registro): RedirectResponse
    {
        $modelo = $catalogo->modelo()::query()->findOrFail($registro);
        $modelo->update($request->datos());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $catalogo->etiquetaSingular().' actualizada.',
        ]);

        return to_route('catalogos.show', $catalogo->value);
    }

    /**
     * Un valor en uso no se elimina: se desactiva (RF-T.04).
     */
    public function destroy(Catalogo $catalogo, int $registro): RedirectResponse
    {
        $modelo = $catalogo->modelo()::query()->findOrFail($registro);

        Gate::authorize('delete', $modelo);

        if ($this->estaEnUso($catalogo, $modelo)) {
            $modelo->update(['activo' => false]);

            Inertia::flash('toast', [
                'type' => 'info',
                'message' => $catalogo->etiquetaSingular().' está en uso: se desactivó en lugar de eliminarse.',
            ]);

            return to_route('catalogos.show', $catalogo->value);
        }

        $modelo->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $catalogo->etiquetaSingular().' eliminada del catálogo.',
        ]);

        return to_route('catalogos.show', $catalogo->value);
    }

    private function estaEnUso(Catalogo $catalogo, Model $registro): bool
    {
        foreach ($catalogo->relacionesDeUso() as $relacion) {
            if ($registro->{$relacion}()->exists()) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return array<string, mixed>
     */
    private function aArreglo(Catalogo $catalogo, Model $registro): array
    {
        $fila = ['id' => $registro->getKey()];

        foreach ($catalogo->campos() as $campo) {
            $valor = $registro->getAttribute($campo['nombre']);
            $fila[$campo['nombre']] = $valor instanceof \BackedEnum ? $valor->value : $valor;
        }

        return $fila;
    }
}
