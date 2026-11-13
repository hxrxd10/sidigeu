<?php

namespace App\Policies;

use App\Models\User;

/**
 * La administración de usuarios y roles es exclusiva del Administrador (RF-T.03).
 */
class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->esAdministrador();
    }

    public function view(User $user, User $usuario): bool
    {
        return $user->esAdministrador();
    }

    public function create(User $user): bool
    {
        return $user->esAdministrador();
    }

    public function update(User $user, User $usuario): bool
    {
        return $user->esAdministrador();
    }

    /**
     * La regla de no desactivarse a sí mismo se valida en la petición, porque
     * `Gate::before` concede todo al Administrador y omitiría esta policy.
     */
    public function cambiarEstado(User $user, User $usuario): bool
    {
        return $user->esAdministrador();
    }
}
