<?php

namespace App\Policies;

use App\Enums\EstadoProyecto;
use App\Enums\Rol;
use App\Models\Proyecto;
use App\Models\User;

/**
 * Los proyectos los formula el coordinador de cada unidad y los aprueba
 * Dirección o Planificación (RF-2.01 a RF-2.04).
 */
class ProyectoPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Proyecto $proyecto): bool
    {
        return $user->tieneAlcanceGlobal() || $this->esDeSuUnidad($user, $proyecto);
    }

    public function create(User $user): bool
    {
        return $user->tieneRol(Rol::CoordinadorUnidad) && $user->unidad_id !== null;
    }

    public function update(User $user, Proyecto $proyecto): bool
    {
        return $this->puedeGestionar($user, $proyecto) && $proyecto->estado->esEditable();
    }

    public function delete(User $user, Proyecto $proyecto): bool
    {
        return $this->puedeGestionar($user, $proyecto)
            && $proyecto->estado === EstadoProyecto::Registrado;
    }

    /**
     * Enviar la formulación a aprobación (RF-2.03).
     */
    public function enviar(User $user, Proyecto $proyecto): bool
    {
        return $this->puedeGestionar($user, $proyecto) && $proyecto->estado->esEditable();
    }

    /**
     * Aprobar, observar o rechazar: Dirección y Planificación (RF-2.03).
     */
    public function aprobar(User $user, Proyecto $proyecto): bool
    {
        return $user->tieneRol(Rol::Direccion, Rol::Validador)
            && $proyecto->estado === EstadoProyecto::EnRevision;
    }

    /**
     * Avances, recursos, vinculación de actividades y cierre (RF-2.05 a RF-2.08).
     */
    public function gestionarEjecucion(User $user, Proyecto $proyecto): bool
    {
        return $this->puedeGestionar($user, $proyecto) && ! $proyecto->estado->esFinal();
    }

    private function puedeGestionar(User $user, Proyecto $proyecto): bool
    {
        return $user->tieneRol(Rol::CoordinadorUnidad) && $this->esDeSuUnidad($user, $proyecto);
    }

    private function esDeSuUnidad(User $user, Proyecto $proyecto): bool
    {
        return $user->unidad_id !== null && $user->unidad_id === $proyecto->unidad_id;
    }
}
