<?php

namespace App\Actions\RecursoHumano;

use App\Models\PersonaRecursoHumano;
use App\Models\PersonaRecursoHumanoPeriodo;
use Illuminate\Support\Facades\DB;

/**
 * Da de baja a una persona y cierra su período vigente (RF-4.03, RN-4.04).
 */
class DarDeBajaPersona
{
    public function handle(PersonaRecursoHumano $persona, string $fechaBaja, ?string $motivo = null): PersonaRecursoHumano
    {
        return DB::transaction(function () use ($persona, $fechaBaja, $motivo): PersonaRecursoHumano {
            $persona->update([
                'activo' => false,
                'fecha_baja' => $fechaBaja,
                'motivo_baja' => $motivo,
            ]);

            $periodo = $persona->periodos()->whereNull('fecha_baja')->latest('fecha_alta')->first();

            if ($periodo instanceof PersonaRecursoHumanoPeriodo) {
                $periodo->update(['fecha_baja' => $fechaBaja, 'motivo_baja' => $motivo]);
            }

            return $persona->refresh();
        });
    }
}
