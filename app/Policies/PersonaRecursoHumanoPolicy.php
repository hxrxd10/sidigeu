<?php

namespace App\Policies;

use App\Enums\Rol;
use App\Models\PersonaRecursoHumano;
use App\Models\User;

/**
 * El padrón lo consulta cualquier usuario interno y lo gestiona el Gestor de
 * recurso humano (RF-4.01 a RF-4.08).
 */
class PersonaRecursoHumanoPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, PersonaRecursoHumano $persona): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->tieneRol(Rol::GestorRecursoHumano);
    }

    public function update(User $user, PersonaRecursoHumano $persona): bool
    {
        return $user->tieneRol(Rol::GestorRecursoHumano);
    }

    public function delete(User $user, PersonaRecursoHumano $persona): bool
    {
        return $user->tieneRol(Rol::GestorRecursoHumano);
    }

    /**
     * Dar de baja o reactivar a una persona (RF-4.03).
     */
    public function cambiarEstado(User $user, PersonaRecursoHumano $persona): bool
    {
        return $user->tieneRol(Rol::GestorRecursoHumano);
    }

    /**
     * DPI y pasaporte solo son visibles para roles autorizados (RF-4.08, RNF-05).
     */
    public function verDatosSensibles(User $user, PersonaRecursoHumano $persona): bool
    {
        return $user->tieneRol(Rol::GestorRecursoHumano, Rol::Direccion);
    }
}
