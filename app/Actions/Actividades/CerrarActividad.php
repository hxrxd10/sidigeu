<?php

namespace App\Actions\Actividades;

use App\Enums\AccionRevision;
use App\Enums\EstadoActividad;
use App\Models\Actividad;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Cierre de una actividad con participantes, beneficiarios, resultados,
 * indicadores alcanzados y evidencias (RF-1.06).
 */
class CerrarActividad
{
    public function __construct(private GuardarEvidencias $evidencias) {}

    /**
     * @param  array<string, mixed>  $datos
     */
    public function handle(Actividad $actividad, array $datos, User $usuario): Actividad
    {
        if (! $actividad->estado->permiteTransicionA(EstadoActividad::Cerrada)) {
            throw ValidationException::withMessages([
                'estado' => 'Solo se cierra una actividad que está en ejecución.',
            ]);
        }

        return DB::transaction(function () use ($actividad, $datos, $usuario): Actividad {
            $actividad->update([
                'resultados' => $datos['resultados'],
                'observaciones' => $datos['observaciones'] ?? null,
                'estado' => EstadoActividad::Cerrada,
                'fecha_cierre' => now(),
            ]);

            $this->guardarBeneficiarios($actividad, $datos['beneficiarios'] ?? []);
            $this->guardarParticipantes($actividad, $datos['participantes'] ?? []);
            $this->guardarIndicadores($actividad, $datos['indicadores'] ?? []);

            $this->evidencias->guardar(
                $actividad,
                $datos['archivos'] ?? [],
                $datos['enlaces'] ?? [],
                $usuario,
            );

            $actividad->revisiones()->create([
                'user_id' => $usuario->id,
                'accion' => AccionRevision::Cierre,
            ]);

            return $actividad->refresh();
        });
    }

    /**
     * @param  array<int, array{sexo: string, rango_edad: string, tipo_publico?: string|null, cantidad: int}>  $beneficiarios
     */
    private function guardarBeneficiarios(Actividad $actividad, array $beneficiarios): void
    {
        $actividad->beneficiarios()->delete();

        foreach ($beneficiarios as $fila) {
            if ((int) $fila['cantidad'] <= 0) {
                continue;
            }

            $actividad->beneficiarios()->create([
                'sexo' => $fila['sexo'],
                'rango_edad' => $fila['rango_edad'],
                'tipo_publico' => $fila['tipo_publico'] ?? null,
                'cantidad' => (int) $fila['cantidad'],
            ]);
        }
    }

    /**
     * @param  array<int, array{persona_recurso_humano_id?: int|null, nombre_externo?: string|null, rol?: string|null}>  $participantes
     */
    private function guardarParticipantes(Actividad $actividad, array $participantes): void
    {
        $actividad->participantes()->delete();

        foreach ($participantes as $fila) {
            $persona = $fila['persona_recurso_humano_id'] ?? null;
            $externo = trim((string) ($fila['nombre_externo'] ?? ''));

            if ($persona === null && $externo === '') {
                continue;
            }

            $actividad->participantes()->create([
                'persona_recurso_humano_id' => $persona,
                'nombre_externo' => $externo === '' ? null : $externo,
                'rol' => $fila['rol'] ?? null,
            ]);
        }
    }

    /**
     * @param  array<int, array{indicador_id: int, valor_alcanzado: float|null}>  $indicadores
     */
    private function guardarIndicadores(Actividad $actividad, array $indicadores): void
    {
        foreach ($indicadores as $fila) {
            if (empty($fila['indicador_id'])) {
                continue;
            }

            $actividad->indicadores()->updateExistingPivot(
                (int) $fila['indicador_id'],
                ['valor_alcanzado' => $fila['valor_alcanzado'] ?? null],
            );
        }
    }
}
