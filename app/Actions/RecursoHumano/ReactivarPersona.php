<?php

namespace App\Actions\RecursoHumano;

use App\Models\PersonaRecursoHumano;
use App\Models\PersonaRecursoHumanoPeriodo;
use Illuminate\Support\Facades\DB;

/**
 * Reactiva a una persona: cierra lo que haya quedado abierto, limpia la baja y
 * abre un período nuevo (RF-4.05, RN-4.04, RN-4.05).
 */
class ReactivarPersona
{
    public function handle(PersonaRecursoHumano $persona, string $fechaAlta): PersonaRecursoHumano
    {
        return DB::transaction(function () use ($persona, $fechaAlta): PersonaRecursoHumano {
            $abierto = $persona->periodos()->whereNull('fecha_baja')->latest('fecha_alta')->first();

            if ($abierto instanceof PersonaRecursoHumanoPeriodo) {
                $abierto->update([
                    'fecha_baja' => $persona->fecha_baja ?? $fechaAlta,
                    'motivo_baja' => $persona->motivo_baja,
                ]);
            }

            $persona->update([
                'activo' => true,
                'fecha_alta' => $fechaAlta,
                'fecha_baja' => null,
                'motivo_baja' => null,
            ]);

            $persona->periodos()->create(['fecha_alta' => $fechaAlta]);

            return $persona->refresh();
        });
    }
}
