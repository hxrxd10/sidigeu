<?php

namespace App\Actions\Actividades;

use App\Contracts\ConEvidencias;
use App\Enums\TipoEvidencia;
use App\Models\User;
use Illuminate\Http\UploadedFile;

/**
 * Guarda fotografías, documentos y enlaces como evidencia (RF-1.06, RF-T.03).
 */
class GuardarEvidencias
{
    private const DIRECTORIO = 'evidencias';

    /**
     * @param  array<int, UploadedFile>  $archivos
     * @param  array<int, array{url: string, descripcion?: string|null}>  $enlaces
     */
    public function guardar(ConEvidencias $entidad, array $archivos, array $enlaces, User $usuario): void
    {
        foreach ($archivos as $archivo) {
            $ruta = $archivo->store(self::DIRECTORIO, 'public');

            if ($ruta === false) {
                continue;
            }

            $entidad->evidencias()->create([
                'tipo' => $this->tipoDe($archivo),
                'ruta' => $ruta,
                'nombre_original' => $archivo->getClientOriginalName(),
                'user_id' => $usuario->id,
            ]);
        }

        foreach ($enlaces as $enlace) {
            $url = trim($enlace['url']);

            if ($url === '') {
                continue;
            }

            $entidad->evidencias()->create([
                'tipo' => TipoEvidencia::Enlace,
                'url' => $url,
                'descripcion' => $enlace['descripcion'] ?? null,
                'user_id' => $usuario->id,
            ]);
        }
    }

    private function tipoDe(UploadedFile $archivo): TipoEvidencia
    {
        return str_starts_with((string) $archivo->getMimeType(), 'image/')
            ? TipoEvidencia::Fotografia
            : TipoEvidencia::Documento;
    }
}
