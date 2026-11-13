<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Historial de fechas de una actividad reprogramada (RF-1.05).
 *
 * @property int $id
 * @property int $actividad_id
 * @property Carbon $fecha_anterior
 * @property Carbon $fecha_nueva
 * @property string|null $motivo
 * @property int|null $user_id
 * @property Carbon|null $created_at
 */
#[Table('actividad_reprogramaciones')]
#[Fillable(['actividad_id', 'fecha_anterior', 'fecha_nueva', 'motivo', 'user_id'])]
class ActividadReprogramacion extends Model
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
            'fecha_anterior' => 'date',
            'fecha_nueva' => 'date',
        ];
    }
}
