<?php

namespace App\Models;

use App\Enums\AccionRevision;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Historial de revisión de un proyecto (RF-2.03).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property int|null $user_id
 * @property AccionRevision $accion
 * @property string|null $comentario
 * @property Carbon|null $created_at
 */
#[Table('proyecto_revisiones')]
#[Fillable(['proyecto_id', 'user_id', 'accion', 'comentario'])]
class ProyectoRevision extends Model
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
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['accion' => AccionRevision::class];
    }
}
