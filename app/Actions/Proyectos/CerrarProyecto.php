<?php

namespace App\Actions\Proyectos;

use App\Actions\Actividades\GuardarEvidencias;
use App\Enums\AccionRevision;
use App\Enums\EstadoProyecto;
use App\Models\Proyecto;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Cierre del proyecto con resultados, productos, lecciones aprendidas, valores
 * finales de los indicadores y evidencias (RF-2.08).
 */
class CerrarProyecto
{
    public function __construct(private GuardarEvidencias $evidencias) {}

    /**
     * @param  array<string, mixed>  $datos
     */
    public function handle(Proyecto $proyecto, array $datos, User $usuario): Proyecto
    {
        if (! $proyecto->estado->permiteTransicionA(EstadoProyecto::Cerrado)) {
            throw ValidationException::withMessages([
                'estado' => 'Solo se cierra un proyecto que está en ejecución.',
            ]);
        }

        return DB::transaction(function () use ($proyecto, $datos, $usuario): Proyecto {
            $proyecto->update([
                'resultados' => $datos['resultados'],
                'productos' => $datos['productos'] ?? null,
                'lecciones_aprendidas' => $datos['lecciones_aprendidas'] ?? null,
                'estado' => EstadoProyecto::Cerrado,
                'fecha_cierre' => now(),
            ]);

            foreach ($datos['indicadores'] ?? [] as $indicador) {
                if (empty($indicador['indicador_id'])) {
                    continue;
                }

                $proyecto->indicadores()->updateExistingPivot(
                    (int) $indicador['indicador_id'],
                    ['valor_final' => $indicador['valor_final'] ?? null],
                );
            }

            $this->evidencias->guardar(
                $proyecto,
                $datos['archivos'] ?? [],
                $datos['enlaces'] ?? [],
                $usuario,
            );

            $proyecto->revisiones()->create([
                'user_id' => $usuario->id,
                'accion' => AccionRevision::Cierre,
            ]);

            return $proyecto->refresh();
        });
    }
}
