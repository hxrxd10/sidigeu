<?php

namespace App\Policies;

use App\Enums\Rol;
use App\Models\Espacio;
use App\Models\User;

/**
 * Los espacios los consulta cualquier usuario interno y los administra el rol
 * Administrador de espacios (RF-3.01, RF-3.02).
 */
class EspacioPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Espacio $espacio): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->tieneRol(Rol::AdministradorEspacios);
    }

    public function update(User $user, Espacio $espacio): bool
    {
        return $user->tieneRol(Rol::AdministradorEspacios);
    }

    public function delete(User $user, Espacio $espacio): bool
    {
        return $user->tieneRol(Rol::AdministradorEspacios);
    }
}
