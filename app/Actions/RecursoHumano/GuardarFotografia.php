<?php

namespace App\Actions\RecursoHumano;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * Almacena la fotografía del recurso humano en el disco público (RF-4.02).
 */
class GuardarFotografia
{
    private const DIRECTORIO = 'recurso-humano/fotografias';

    public function guardar(?UploadedFile $foto): ?string
    {
        if (! $foto instanceof UploadedFile) {
            return null;
        }

        $ruta = $foto->store(self::DIRECTORIO, 'public');

        return $ruta === false ? null : $ruta;
    }

    public function eliminar(?string $ruta): void
    {
        if ($ruta !== null && $ruta !== '') {
            Storage::disk('public')->delete($ruta);
        }
    }
}
