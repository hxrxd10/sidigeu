<?php

namespace App\Actions\Actividades;

use App\Actions\Espacios\VerificarDisponibilidad;
use App\Enums\EstadoSolicitud;
use App\Models\Actividad;
use App\Models\SolicitudEspacio;
use App\Models\User;
use Illuminate\Validation\ValidationException;

/**
 * Reserva del espacio asociada a una actividad (RF-1.08, RF-3.08).
 *
 * La reserva nace pendiente junto con la actividad y se confirma cuando el
 * validador aprueba la programación; así el calendario muestra lo pendiente en
 * amarillo y lo confirmado en rojo.
 */
class ReservarEspacio
{
    public function __construct(private VerificarDisponibilidad $disponibilidad) {}

    public function sincronizar(Actividad $actividad, ?User $usuario = null): ?SolicitudEspacio
    {
        if ($actividad->espacio_id === null || $actividad->hora_inicio === null || $actividad->hora_fin === null) {
            $actividad->reservas()->update(['estado' => EstadoSolicitud::Cancelada]);

            return null;
        }

        $this->verificarDisponibilidad($actividad);

        $reserva = $actividad->reservas()
            ->whereIn('estado', [EstadoSolicitud::Pendiente, EstadoSolicitud::Aprobada])
            ->first();

        $datos = [
            'espacio_id' => $actividad->espacio_id,
            'fecha' => $actividad->fecha->toDateString(),
            'hora_inicio' => $actividad->hora_inicio,
            'hora_fin' => $actividad->hora_fin,
            'solicitante_nombre' => $actividad->unidad->nombre,
            'institucion' => 'DIGEU',
            'correo' => $this->correoDe($usuario, $actividad),
            'proposito' => $actividad->nombre,
        ];

        if ($reserva instanceof SolicitudEspacio) {
            $reserva->update($datos);

            return $reserva;
        }

        return $actividad->reservas()->create([
            ...$datos,
            'estado' => EstadoSolicitud::Pendiente,
            'solicitado_por' => $usuario?->id,
        ]);
    }

    /**
     * Al validar la actividad, su reserva bloquea el horario.
     */
    public function confirmar(Actividad $actividad, User $resolutor): void
    {
        $reserva = $actividad->reservas()->where('estado', EstadoSolicitud::Pendiente)->first();

        if (! $reserva instanceof SolicitudEspacio) {
            return;
        }

        $this->verificarDisponibilidad($actividad, $reserva->id);

        $reserva->update([
            'estado' => EstadoSolicitud::Aprobada,
            'resuelto_por' => $resolutor->id,
            'fecha_resolucion' => now(),
        ]);
    }

    public function liberar(Actividad $actividad): void
    {
        $actividad->reservas()
            ->whereIn('estado', [EstadoSolicitud::Pendiente, EstadoSolicitud::Aprobada])
            ->update(['estado' => EstadoSolicitud::Cancelada]);
    }

    /**
     * Correo al que se avisa sobre la reserva institucional.
     */
    private function correoDe(?User $usuario, Actividad $actividad): string
    {
        if ($usuario instanceof User) {
            return $usuario->email;
        }

        $responsable = $actividad->responsable;

        return $responsable instanceof User ? $responsable->email : 'digeu@usac.edu.gt';
    }

    private function verificarDisponibilidad(Actividad $actividad, ?int $ignorar = null): void
    {
        if (! $actividad->espacio->estado->admiteReservas()) {
            throw ValidationException::withMessages([
                'espacio_id' => 'El espacio no admite reservas: está inactivo o en mantenimiento.',
            ]);
        }

        $ignorar ??= $actividad->reservas()
            ->whereIn('estado', [EstadoSolicitud::Pendiente, EstadoSolicitud::Aprobada])
            ->value('id');

        $conflictos = $this->disponibilidad->conflictos(
            $actividad->espacio_id,
            $actividad->fecha->toDateString(),
            $actividad->hora_inicio,
            $actividad->hora_fin,
            $ignorar,
        );

        if ($conflictos->isNotEmpty()) {
            throw ValidationException::withMessages([
                'espacio_id' => 'El espacio ya está reservado en ese horario: '
                    .$conflictos->first()->horaInicioCorta().' a '.$conflictos->first()->horaFinCorta().'.',
            ]);
        }
    }
}
