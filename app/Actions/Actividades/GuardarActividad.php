<?php

namespace App\Actions\Actividades;

use App\Models\Actividad;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * Alta y edición de una actividad con su clasificación (RF-1.01, RF-1.02).
 */
class GuardarActividad
{
    public function __construct(private ReservarEspacio $reserva) {}

    /**
     * @param  array<string, mixed>  $datos
     * @param  array<int, int>  $publicos
     * @param  array<int, array{indicador_id: int, valor_meta: float|null}>  $indicadores
     */
    public function crear(array $datos, array $publicos, array $indicadores, User $usuario): Actividad
    {
        return DB::transaction(function () use ($datos, $publicos, $indicadores, $usuario): Actividad {
            $actividad = Actividad::create([
                ...$datos,
                'creado_por' => $usuario->id,
            ]);

            $this->sincronizarClasificacion($actividad, $publicos, $indicadores);
            $this->reserva->sincronizar($actividad->load(['espacio', 'unidad', 'responsable']), $usuario);

            return $actividad;
        });
    }

    /**
     * @param  array<string, mixed>  $datos
     * @param  array<int, int>  $publicos
     * @param  array<int, array{indicador_id: int, valor_meta: float|null}>  $indicadores
     */
    public function actualizar(
        Actividad $actividad,
        array $datos,
        array $publicos,
        array $indicadores,
        User $usuario,
    ): Actividad {
        return DB::transaction(function () use ($actividad, $datos, $publicos, $indicadores, $usuario): Actividad {
            $actividad->update($datos);

            $this->sincronizarClasificacion($actividad, $publicos, $indicadores);
            $this->reserva->sincronizar($actividad->refresh()->load(['espacio', 'unidad', 'responsable']), $usuario);

            return $actividad;
        });
    }

    /**
     * @param  array<int, int>  $publicos
     * @param  array<int, array{indicador_id: int, valor_meta: float|null}>  $indicadores
     */
    private function sincronizarClasificacion(Actividad $actividad, array $publicos, array $indicadores): void
    {
        $actividad->publicosObjetivo()->sync($publicos);

        // Un indicador queda asociado cuando se le fija una meta.
        $actividad->indicadores()->sync(
            collect($indicadores)
                ->filter(fn (array $fila): bool => $fila['indicador_id'] > 0
                    && $fila['valor_meta'] !== null)
                ->mapWithKeys(fn (array $fila): array => [
                    (int) $fila['indicador_id'] => ['valor_meta' => $fila['valor_meta']],
                ])
                ->all()
        );
    }
}
