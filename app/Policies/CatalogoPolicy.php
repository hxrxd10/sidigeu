<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Los catálogos los consulta cualquier usuario autenticado y los administra
 * el rol Administrador (RF-T.04).
 */
class CatalogoPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Model $catalogo): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->esAdministrador();
    }

    public function update(User $user, Model $catalogo): bool
    {
        return $user->esAdministrador();
    }

    public function delete(User $user, Model $catalogo): bool
    {
        return $user->esAdministrador();
    }
}
