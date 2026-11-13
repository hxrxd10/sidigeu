<?php

namespace App\Http\Controllers\Administracion;

use App\Enums\Rol;
use App\Http\Controllers\Controller;
use App\Http\Requests\Administracion\StoreUserRequest;
use App\Http\Requests\Administracion\UpdateUserRequest;
use App\Models\Role;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Administración de usuarios y roles (RF-T.03, CU-03).
 */
class UserController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', User::class);

        $busqueda = $request->string('busqueda')->trim()->toString();
        $rol = $request->string('rol')->toString();
        $estado = $request->string('estado')->toString();

        $usuarios = User::query()
            ->with(['unidad:id,nombre', 'roles:id,slug,nombre'])
            ->when($busqueda !== '', fn ($query) => $query->where(
                fn ($query) => $query
                    ->where('name', 'like', "%{$busqueda}%")
                    ->orWhere('email', 'like', "%{$busqueda}%")
            ))
            ->when($rol !== '', fn ($query) => $query->whereHas(
                'roles',
                fn ($query) => $query->where('slug', $rol)
            ))
            ->when($estado !== '', fn ($query) => $query->where('activo', $estado === 'activos'))
            ->orderBy('name')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (User $usuario): array => [
                'id' => $usuario->id,
                'name' => $usuario->name,
                'email' => $usuario->email,
                'activo' => $usuario->activo,
                'unidad' => $usuario->unidad?->only(['id', 'nombre']),
                'roles' => $usuario->roles->map(fn (Role $role): array => [
                    'slug' => $role->slug->value,
                    'nombre' => $role->nombre,
                ])->all(),
            ]);

        return Inertia::render('administracion/usuarios/index', [
            'usuarios' => $usuarios,
            'filtros' => ['busqueda' => $busqueda, 'rol' => $rol, 'estado' => $estado],
            'roles' => $this->rolesDisponibles(),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', User::class);

        return Inertia::render('administracion/usuarios/create', [
            'roles' => $this->rolesDisponibles(),
            'unidades' => $this->unidadesDisponibles(),
        ]);
    }

    /**
     * Crea el usuario y le envía el enlace para definir su contraseña (CU-03).
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $datos = $request->validated();

        $usuario = User::create([
            'name' => $datos['name'],
            'email' => $datos['email'],
            'unidad_id' => $datos['unidad_id'] ?? null,
            'activo' => $request->boolean('activo', true),
            'password' => Str::password(32),
        ]);

        $usuario->forceFill(['email_verified_at' => now()])->save();
        $this->sincronizarRoles($usuario, $datos['roles'] ?? []);

        Password::sendResetLink(['email' => $usuario->email]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Usuario creado. Se le envió un enlace para definir su contraseña.',
        ]);

        return to_route('usuarios.index');
    }

    public function edit(User $usuario): Response
    {
        Gate::authorize('update', $usuario);

        $usuario->load(['roles:id,slug', 'unidad:id,nombre']);

        return Inertia::render('administracion/usuarios/edit', [
            'usuario' => [
                'id' => $usuario->id,
                'name' => $usuario->name,
                'email' => $usuario->email,
                'activo' => $usuario->activo,
                'unidad_id' => $usuario->unidad_id,
                'roles' => $usuario->roles->map(fn (Role $role): string => $role->slug->value)->all(),
            ],
            'roles' => $this->rolesDisponibles(),
            'unidades' => $this->unidadesDisponibles(),
            'esSuPropioUsuario' => $usuario->is(request()->user()),
        ]);
    }

    public function update(UpdateUserRequest $request, User $usuario): RedirectResponse
    {
        $datos = $request->validated();

        $usuario->update([
            'name' => $datos['name'],
            'email' => $datos['email'],
            'unidad_id' => $datos['unidad_id'] ?? null,
            'activo' => $request->boolean('activo'),
        ]);

        $this->sincronizarRoles($usuario, $datos['roles'] ?? []);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Usuario actualizado.']);

        return to_route('usuarios.index');
    }

    /**
     * Activa o desactiva al usuario sin abrir el formulario completo.
     */
    public function cambiarEstado(Request $request, User $usuario): RedirectResponse
    {
        Gate::authorize('cambiarEstado', $usuario);

        if ($usuario->is($request->user())) {
            return back()->withErrors(['activo' => 'No puede desactivar su propio usuario.']);
        }

        $usuario->update(['activo' => ! $usuario->activo]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $usuario->activo ? 'Usuario activado.' : 'Usuario desactivado.',
        ]);

        return back();
    }

    /**
     * @param  array<int, string>  $roles
     */
    private function sincronizarRoles(User $usuario, array $roles): void
    {
        $ids = Role::query()->whereIn('slug', $roles)->pluck('id');

        $usuario->roles()->sync($ids);
    }

    /**
     * @return array<int, array{valor: string, nombre: string, descripcion: string}>
     */
    private function rolesDisponibles(): array
    {
        return array_map(fn (Rol $rol): array => [
            'valor' => $rol->value,
            'nombre' => $rol->nombre(),
            'descripcion' => $rol->descripcion(),
        ], Rol::cases());
    }

    /**
     * @return array<int, array{valor: int, nombre: string}>
     */
    private function unidadesDisponibles(): array
    {
        return Unidad::query()
            ->activas()
            ->orderBy('nombre')
            ->get()
            ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])
            ->all();
    }
}
