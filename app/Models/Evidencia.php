<?php

namespace App\Models;

use App\Enums\TipoEvidencia;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * Evidencia que respalda una actividad o un proyecto (RF-1.06, RF-T.03).
 *
 * @property int $id
 * @property string $evidenciable_type
 * @property int $evidenciable_id
 * @property TipoEvidencia $tipo
 * @property string|null $ruta
 * @property string|null $url
 * @property string|null $nombre_original
 * @property string|null $descripcion
 * @property int|null $user_id
 * @property Carbon|null $created_at
 */
#[Fillable([
    'evidenciable_type',
    'evidenciable_id',
    'tipo',
    'ruta',
    'url',
    'nombre_original',
    'descripcion',
    'user_id',
])]
class Evidencia extends Model
{
    /**
     * @return MorphTo<Model, $this>
     */
    public function evidenciable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Enlace para abrir la evidencia: el archivo almacenado o la URL externa.
     */
    public function enlace(): ?string
    {
        if ($this->ruta !== null) {
            return Storage::disk('public')->url($this->ruta);
        }

        return $this->url;
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tipo' => TipoEvidencia::class,
        ];
    }
}
