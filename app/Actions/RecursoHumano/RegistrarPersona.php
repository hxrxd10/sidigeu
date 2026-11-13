<?php

namespace App\Actions\RecursoHumano;

use App\Models\PersonaRecursoHumano;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

/**
 * Alta de un artista o deportista, con su primer período de permanencia (CU-28).
 */
class RegistrarPersona
{
    public function __construct(private GuardarFotografia $fotografia) {}

    /**
     * @param  array<string, mixed>  $datos
     */
    public function handle(array $datos, ?UploadedFile $foto = null): PersonaRecursoHumano
    {
        return DB::transaction(function () use ($datos, $foto): PersonaRecursoHumano {
            $datos['foto_ruta'] = $this->fotografia->guardar($foto);
            $datos['activo'] = true;

            $persona = PersonaRecursoHumano::create($datos);

            $persona->periodos()->create(['fecha_alta' => $persona->fecha_alta]);

            return $persona;
        });
    }
}
