<?php

namespace App\Models;

use App\Enums\AccionRevision;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Historial de revisión de una actividad (RF-1.02).
 *
 * @property int $id
 * @property int $actividad_id
 * @property int|null $user_id
 * @property AccionRevision $accion
 * @property string|null $comentario
 * @property Carbon|null $created_at
 */
#[Table('actividad_revisiones')]
#[Fillable(['actividad_id', 'user_id', 'accion', 'comentario'])]
class ActividadRevision extends Model
{
    /**
     * @return BelongsTo<Actividad, $this>
     */
    public function actividad(): BelongsTo
    {
        return $this->belongsTo(Actividad::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'accion' => AccionRevision::class,
        ];
    }
}
