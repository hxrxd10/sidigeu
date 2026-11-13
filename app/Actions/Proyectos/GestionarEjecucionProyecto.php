<?php

namespace App\Actions\Proyectos;

use App\Actions\Actividades\GuardarEvidencias;
use App\Enums\AccionRevision;
use App\Enums\EstadoProyecto;
use App\Models\Proyecto;
use App\Models\ProyectoAvance;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Ejecución del proyecto: avances, recursos y cambios de estado
 * (RF-2.05, RF-2.07, RF-2.08).
 */
class GestionarEjecucionProyecto
{
    public function __construct(private GuardarEvidencias $evidencias) {}

    public function iniciar(Proyecto $proyecto, User $usuario): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::EnEjecucion);

        $proyecto->update(['estado' => EstadoProyecto::EnEjecucion]);

        return $proyecto;
    }

    /**
     * Registra un avance con su porcentaje, evidencias y el estado del
     * cronograma (RF-2.05, RF-2.07).
     *
     * @param  array<string, mixed>  $datos
     */
    public function registrarAvance(Proyecto $proyecto, array $datos, User $usuario): ProyectoAvance
    {
        if (! $proyecto->estado->admiteEjecucion()) {
            throw ValidationException::withMessages([
                'estado' => 'Solo un proyecto aprobado o en ejecución registra avances.',
            ]);
        }

        return DB::transaction(function () use ($proyecto, $datos, $usuario): ProyectoAvance {
            if ($proyecto->estado === EstadoProyecto::Aprobado) {
                $proyecto->update(['estado' => EstadoProyecto::EnEjecucion]);
            }

            $avance = $proyecto->avances()->create([
                'fecha' => $datos['fecha'],
                'porcentaje' => (int) $datos['porcentaje'],
                'descripcion' => $datos['descripcion'],
                'user_id' => $usuario->id,
            ]);

            $this->evidencias->guardar(
                $avance,
                $datos['archivos'] ?? [],
                $datos['enlaces'] ?? [],
                $usuario,
            );

            $this->actualizarCronograma($proyecto, $datos['tareas'] ?? []);
            $this->actualizarPresupuesto($proyecto, $datos['renglones'] ?? []);
            $this->guardarRecursos($proyecto, $datos['recursos'] ?? []);

            return $avance;
        });
    }

    public function suspender(Proyecto $proyecto, User $usuario, string $motivo): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::Suspendido);

        return DB::transaction(function () use ($proyecto, $usuario, $motivo): Proyecto {
            $proyecto->update(['estado' => EstadoProyecto::Suspendido, 'motivo_estado' => $motivo]);

            $proyecto->revisiones()->create([
                'user_id' => $usuario->id,
                'accion' => AccionRevision::Cancelacion,
                'comentario' => 'Suspendido: '.$motivo,
            ]);

            return $proyecto;
        });
    }

    public function cancelar(Proyecto $proyecto, User $usuario, string $motivo): Proyecto
    {
        $this->exigirTransicion($proyecto, EstadoProyecto::Cancelado);

        return DB::transaction(function () use ($proyecto, $usuario, $motivo): Proyecto {
            $proyecto->update(['estado' => EstadoProyecto::Cancelado, 'motivo_estado' => $motivo]);

            $proyecto->revisiones()->create([
                'user_id' => $usuario->id,
                'accion' => AccionRevision::Cancelacion,
                'comentario' => $motivo,
            ]);

            return $proyecto;
        });
    }

    /**
     * @param  array<int, array{id: int, avance: int}>  $tareas
     */
    private function actualizarCronograma(Proyecto $proyecto, array $tareas): void
    {
        foreach ($tareas as $tarea) {
            $proyecto->cronograma()
                ->whereKey($tarea['id'])
                ->update(['avance' => max(0, min(100, (int) $tarea['avance']))]);
        }
    }

    /**
     * @param  array<int, array{id: int, ejecutado: float}>  $renglones
     */
    private function actualizarPresupuesto(Proyecto $proyecto, array $renglones): void
    {
        foreach ($renglones as $renglon) {
            $proyecto->presupuesto()
                ->whereKey($renglon['id'])
                ->update(['ejecutado' => max(0, (float) $renglon['ejecutado'])]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $recursos
     */
    private function guardarRecursos(Proyecto $proyecto, array $recursos): void
    {
        foreach ($recursos as $recurso) {
            $persona = $recurso['persona_recurso_humano_id'] ?? null;
            $descripcion = trim((string) ($recurso['descripcion'] ?? ''));

            if ($persona === null && $descripcion === '') {
                continue;
            }

            $proyecto->recursos()->create([
                'tipo' => $recurso['tipo'],
                'persona_recurso_humano_id' => $persona,
                'descripcion' => $descripcion === '' ? null : $descripcion,
                'cantidad' => (float) ($recurso['cantidad'] ?? 1),
                'costo' => (float) ($recurso['costo'] ?? 0),
            ]);
        }
    }

    private function exigirTransicion(Proyecto $proyecto, EstadoProyecto $destino): void
    {
        if (! $proyecto->estado->permiteTransicionA($destino)) {
            throw ValidationException::withMessages([
                'estado' => 'El proyecto está '.mb_strtolower($proyecto->estado->nombre())
                    .' y no puede pasar a '.mb_strtolower($destino->nombre()).'.',
            ]);
        }
    }
}
