<?php

namespace App\Policies;

use App\Enums\EstadoActividad;
use App\Enums\Rol;
use App\Models\Actividad;
use App\Models\User;

/**
 * Las actividades las registra el coordinador de cada unidad y las valida el
 * rol Validador (RF-1.01, RF-1.02). Los roles globales ven todas las unidades.
 */
class ActividadPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Actividad $actividad): bool
    {
        return $user->tieneAlcanceGlobal() || $this->esDeSuUnidad($user, $actividad);
    }

    public function create(User $user): bool
    {
        return $user->tieneRol(Rol::CoordinadorUnidad) && $user->unidad_id !== null;
    }

    public function update(User $user, Actividad $actividad): bool
    {
        return $this->puedeGestionar($user, $actividad) && $actividad->estado->esEditable();
    }

    public function delete(User $user, Actividad $actividad): bool
    {
        return $this->puedeGestionar($user, $actividad)
            && $actividad->estado === EstadoActividad::Borrador;
    }

    /**
     * Enviar la programación a revisión (RF-1.02).
     */
    public function enviar(User $user, Actividad $actividad): bool
    {
        return $this->puedeGestionar($user, $actividad) && $actividad->estado->esEditable();
    }

    /**
     * Validar, observar o rechazar: corresponde a planificación (RF-1.02).
     */
    public function validar(User $user, Actividad $actividad): bool
    {
        return $user->tieneRol(Rol::Validador)
            && $actividad->estado === EstadoActividad::Enviada;
    }

    /**
     * Publicar la actividad en la Agenda Cultural o quitarla de ella después de
     * validada (RF-1.03). Es la misma decisión que la validación, así que
     * corresponde al mismo rol.
     */
    public function gestionarAgenda(User $user, Actividad $actividad): bool
    {
        return $user->tieneRol(Rol::Validador)
            && $actividad->estado->admiteCambioDeAgenda();
    }

    /**
     * Iniciar ejecución, reprogramar, cancelar o cerrar (RF-1.05, RF-1.06).
     */
    public function gestionarEjecucion(User $user, Actividad $actividad): bool
    {
        return $this->puedeGestionar($user, $actividad) && ! $actividad->estado->esFinal();
    }

    private function puedeGestionar(User $user, Actividad $actividad): bool
    {
        return $user->tieneRol(Rol::CoordinadorUnidad) && $this->esDeSuUnidad($user, $actividad);
    }

    private function esDeSuUnidad(User $user, Actividad $actividad): bool
    {
        return $user->unidad_id !== null && $user->unidad_id === $actividad->unidad_id;
    }
}
