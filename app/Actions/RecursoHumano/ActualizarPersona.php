<?php

namespace App\Actions\RecursoHumano;

use App\Models\PersonaRecursoHumano;
use App\Models\PersonaRecursoHumanoPeriodo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

/**
 * Edición de los datos de una persona; la fotografía anterior se reemplaza y el
 * período vigente sigue a la fecha de alta.
 */
class ActualizarPersona
{
    public function __construct(private GuardarFotografia $fotografia) {}

    /**
     * @param  array<string, mixed>  $datos
     */
    public function handle(PersonaRecursoHumano $persona, array $datos, ?UploadedFile $foto = null): PersonaRecursoHumano
    {
        return DB::transaction(function () use ($persona, $datos, $foto): PersonaRecursoHumano {
            if ($foto instanceof UploadedFile) {
                $this->fotografia->eliminar($persona->foto_ruta);
                $datos['foto_ruta'] = $this->fotografia->guardar($foto);
            }

            $persona->update($datos);

            $periodo = $persona->periodos()->whereNull('fecha_baja')->latest('fecha_alta')->first();

            if ($periodo instanceof PersonaRecursoHumanoPeriodo) {
                $periodo->update(['fecha_alta' => $persona->fecha_alta]);
            }

            return $persona->refresh();
        });
    }
}
