<?php

namespace App\Actions\Espacios;

use App\Enums\EstadoSolicitud;
use App\Enums\Rol;
use App\Models\SolicitudEspacio;
use App\Models\User;
use App\Notifications\SolicitudEspacioRecibida;
use Illuminate\Support\Facades\Notification;

/**
 * Registra una solicitud en estado pendiente y avisa a quien administra los
 * espacios (RF-3.04).
 */
class RegistrarSolicitud
{
    /**
     * @param  array<string, mixed>  $datos
     */
    public function handle(array $datos, ?User $solicitante = null): SolicitudEspacio
    {
        $solicitud = SolicitudEspacio::create([
            ...$datos,
            'estado' => EstadoSolicitud::Pendiente,
            'solicitado_por' => $solicitante?->id,
        ]);

        $administradores = User::query()
            ->activos()
            ->whereHas('roles', fn ($query) => $query->whereIn('slug', [
                Rol::AdministradorEspacios->value,
                Rol::Administrador->value,
            ]))
            ->get();

        Notification::send($administradores, new SolicitudEspacioRecibida($solicitud));

        return $solicitud->load('espacio.sede');
    }
}
