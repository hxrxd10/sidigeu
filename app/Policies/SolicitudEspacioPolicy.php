<?php

namespace App\Policies;

use App\Enums\Rol;
use App\Models\SolicitudEspacio;
use App\Models\User;

/**
 * Las solicitudes las atiende el Administrador de espacios; Dirección puede
 * consultarlas (RF-3.05).
 */
class SolicitudEspacioPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->tieneRol(Rol::AdministradorEspacios, Rol::Direccion);
    }

    public function view(User $user, SolicitudEspacio $solicitud): bool
    {
        return $this->viewAny($user);
    }

    /**
     * Aprobar, rechazar o cancelar una solicitud.
     */
    public function resolver(User $user, SolicitudEspacio $solicitud): bool
    {
        return $user->tieneRol(Rol::AdministradorEspacios);
    }
}
