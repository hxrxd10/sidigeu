<?php

namespace App\Models;

use App\Contracts\ConEvidencias;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * Avance periódico de un proyecto, con sus evidencias (RF-2.05).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property Carbon $fecha
 * @property int $porcentaje
 * @property string $descripcion
 * @property int|null $user_id
 * @property Carbon|null $created_at
 */
#[Table('proyecto_avances')]
#[Fillable(['proyecto_id', 'fecha', 'porcentaje', 'descripcion', 'user_id'])]
class ProyectoAvance extends Model implements ConEvidencias
{
    /**
     * @return BelongsTo<Proyecto, $this>
     */
    public function proyecto(): BelongsTo
    {
        return $this->belongsTo(Proyecto::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return MorphMany<Evidencia, $this>
     */
    public function evidencias(): MorphMany
    {
        return $this->morphMany(Evidencia::class, 'evidenciable');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha' => 'date',
            'porcentaje' => 'integer',
        ];
    }
}
