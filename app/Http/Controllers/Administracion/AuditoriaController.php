<?php

namespace App\Http\Controllers\Administracion;

use App\Enums\AccionAuditoria;
use App\Http\Controllers\Controller;
use App\Models\Auditoria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Consulta de la bitácora de auditoría (RF-T.05).
 */
class AuditoriaController extends Controller
{
    public function index(Request $request): Response
    {
        // La bitácora es parte de la administración del sistema.
        Gate::authorize('viewAny', User::class);

        $filtros = [
            'user_id' => $request->integer('user_id'),
            'entidad' => $request->string('entidad')->toString(),
            'accion' => $request->string('accion')->toString(),
            'desde' => $request->string('desde')->toString(),
            'hasta' => $request->string('hasta')->toString(),
        ];

        $registros = Auditoria::query()
            ->with('usuario:id,name')
            ->when($filtros['user_id'], fn ($query, $id) => $query->where('user_id', $id))
            ->when($filtros['entidad'] !== '', fn ($query) => $query->where('auditable_type', $filtros['entidad']))
            ->when($filtros['accion'] !== '', fn ($query) => $query->where('accion', $filtros['accion']))
            ->when($filtros['desde'] !== '', fn ($query) => $query->whereDate('created_at', '>=', $filtros['desde']))
            ->when($filtros['hasta'] !== '', fn ($query) => $query->whereDate('created_at', '<=', $filtros['hasta']))
            ->recientes()
            ->paginate(25)
            ->withQueryString()
            ->through(fn (Auditoria $auditoria): array => [
                'id' => $auditoria->id,
                'fecha' => $auditoria->created_at?->format('d-m-Y H:i:s'),
                'usuario' => $auditoria->user_id === null ? 'Sistema' : $auditoria->usuario->name,
                'entidad' => class_basename($auditoria->auditable_type),
                'entidad_id' => $auditoria->auditable_id,
                'accion' => $auditoria->accion->value,
                'accion_nombre' => $auditoria->accion->nombre(),
                'ip' => $auditoria->ip,
                'valores_antes' => $auditoria->valores_antes,
                'valores_despues' => $auditoria->valores_despues,
            ]);

        return Inertia::render('administracion/bitacora', [
            'registros' => $registros,
            'filtros' => $filtros,
            'opciones' => [
                'usuarios' => User::query()->orderBy('name')->get()
                    ->map(fn (User $usuario): array => ['valor' => $usuario->id, 'nombre' => $usuario->name])->all(),
                'entidades' => Auditoria::query()
                    ->distinct()
                    ->orderBy('auditable_type')
                    ->pluck('auditable_type')
                    ->map(fn (string $clase): array => [
                        'valor' => $clase,
                        'nombre' => Str::headline(class_basename($clase)),
                    ])->all(),
                'acciones' => array_map(
                    fn (AccionAuditoria $accion): array => [
                        'valor' => $accion->value,
                        'nombre' => $accion->nombre(),
                    ],
                    AccionAuditoria::cases(),
                ),
            ],
        ]);
    }
}
