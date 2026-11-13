<?php

namespace App\Http\Controllers;

use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\PersonaRecursoHumano;
use App\Models\Proyecto;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

/**
 * Búsqueda global del sistema: un solo cuadro para llegar a una actividad, un
 * proyecto, una persona del padrón, un espacio o un usuario.
 *
 * Devuelve JSON porque la consume el buscador del encabezado sin recargar la
 * página. Cada grupo se consulta solo si el usuario puede verlo, y se respeta
 * el alcance de su unidad igual que en los listados.
 */
class BuscadorController extends Controller
{
    /**
     * Resultados por grupo. Pocos y de un vistazo: la idea es llegar rápido,
     * no reemplazar los listados con sus filtros.
     */
    private const POR_GRUPO = 5;

    public function __invoke(Request $request): JsonResponse
    {
        $termino = $request->string('q')->trim()->toString();

        if (mb_strlen($termino) < 2) {
            return response()->json(['grupos' => []]);
        }

        $grupos = collect([
            $this->actividades($request, $termino),
            $this->proyectos($request, $termino),
            $this->personas($termino),
            $this->espacios($termino),
            $this->usuarios($termino),
        ])
            ->filter(fn (?array $grupo): bool => $grupo !== null && $grupo['resultados'] !== [])
            ->values()
            ->all();

        return response()->json(['grupos' => $grupos]);
    }

    /**
     * @return array{titulo: string, resultados: array<int, array<string, mixed>>}|null
     */
    private function actividades(Request $request, string $termino): ?array
    {
        if (! Gate::allows('viewAny', Actividad::class)) {
            return null;
        }

        $usuario = $request->user();

        $actividades = Actividad::query()
            ->with(['unidad:id,nombre'])
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->where('nombre', 'like', "%{$termino}%")
            ->orderByDesc('fecha')
            ->limit(self::POR_GRUPO)
            ->get();

        return [
            'titulo' => 'Actividades',
            'resultados' => $actividades->map(fn (Actividad $actividad): array => [
                'titulo' => $actividad->nombre,
                'detalle' => $actividad->fecha->format('d-m-Y').' · '.$actividad->unidad->nombre,
                'etiqueta' => $actividad->estado->nombre(),
                'url' => route('actividades.show', $actividad),
            ])->all(),
        ];
    }

    /**
     * @return array{titulo: string, resultados: array<int, array<string, mixed>>}|null
     */
    private function proyectos(Request $request, string $termino): ?array
    {
        if (! Gate::allows('viewAny', Proyecto::class)) {
            return null;
        }

        $usuario = $request->user();

        $proyectos = Proyecto::query()
            ->with(['unidad:id,nombre'])
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->where('nombre', 'like', "%{$termino}%")
            ->orderByDesc('id')
            ->limit(self::POR_GRUPO)
            ->get();

        return [
            'titulo' => 'Proyectos',
            'resultados' => $proyectos->map(fn (Proyecto $proyecto): array => [
                'titulo' => $proyecto->nombre,
                'detalle' => $proyecto->unidad->nombre,
                'etiqueta' => $proyecto->estado->nombre(),
                'url' => route('proyectos.show', $proyecto),
            ])->all(),
        ];
    }

    /**
     * Padrón: solo por nombre. El DPI y el pasaporte no se buscan ni se
     * devuelven aquí, aunque el listado sí los admita para quien tenga
     * permiso de verlos (RNF-05).
     *
     * @return array{titulo: string, resultados: array<int, array<string, mixed>>}|null
     */
    private function personas(string $termino): ?array
    {
        if (! Gate::allows('viewAny', PersonaRecursoHumano::class)) {
            return null;
        }

        $personas = PersonaRecursoHumano::query()
            ->with(['disciplina:id,nombre'])
            ->where(function ($query) use ($termino): void {
                $query->where('nombres', 'like', "%{$termino}%")
                    ->orWhere('apellidos', 'like', "%{$termino}%");
            })
            ->orderBy('apellidos')
            ->limit(self::POR_GRUPO)
            ->get();

        return [
            'titulo' => 'Recurso humano',
            'resultados' => $personas->map(fn (PersonaRecursoHumano $persona): array => [
                'titulo' => $persona->nombre_completo,
                'detalle' => $persona->disciplina->nombre.' · '.$persona->tipo->nombre(),
                'etiqueta' => $persona->activo ? null : 'Inactivo',
                'url' => route('recurso-humano.show', $persona),
            ])->all(),
        ];
    }

    /**
     * @return array{titulo: string, resultados: array<int, array<string, mixed>>}|null
     */
    private function espacios(string $termino): ?array
    {
        if (! Gate::allows('viewAny', Espacio::class)) {
            return null;
        }

        $espacios = Espacio::query()
            ->with(['sede:id,nombre'])
            ->where('nombre', 'like', "%{$termino}%")
            ->orderBy('nombre')
            ->limit(self::POR_GRUPO)
            ->get();

        return [
            'titulo' => 'Espacios',
            'resultados' => $espacios->map(fn (Espacio $espacio): array => [
                'titulo' => $espacio->nombre,
                'detalle' => $espacio->sede->nombre,
                'etiqueta' => $espacio->estado->nombre(),
                'url' => route('espacios.show', $espacio),
            ])->all(),
        ];
    }

    /**
     * @return array{titulo: string, resultados: array<int, array<string, mixed>>}|null
     */
    private function usuarios(string $termino): ?array
    {
        if (! Gate::allows('viewAny', User::class)) {
            return null;
        }

        $usuarios = User::query()
            ->with(['unidad:id,nombre'])
            ->where(function ($query) use ($termino): void {
                $query->where('name', 'like', "%{$termino}%")
                    ->orWhere('email', 'like', "%{$termino}%");
            })
            ->orderBy('name')
            ->limit(self::POR_GRUPO)
            ->get();

        return [
            'titulo' => 'Usuarios',
            'resultados' => $usuarios->map(fn (User $usuario): array => [
                'titulo' => $usuario->name,
                'detalle' => $usuario->unidad instanceof Unidad
                    ? $usuario->unidad->nombre
                    : $usuario->email,
                'etiqueta' => $usuario->activo ? null : 'Inactivo',
                'url' => route('usuarios.edit', $usuario),
            ])->all(),
        ];
    }
}
