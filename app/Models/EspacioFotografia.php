<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Fotografía de un espacio (RF-3.01).
 *
 * @property int $id
 * @property int $espacio_id
 * @property string $ruta
 * @property string|null $descripcion
 * @property int $orden
 */
#[Table('espacio_fotografias')]
#[Fillable(['espacio_id', 'ruta', 'descripcion', 'orden'])]
class EspacioFotografia extends Model
{
    /**
     * @return BelongsTo<Espacio, $this>
     */
    public function espacio(): BelongsTo
    {
        return $this->belongsTo(Espacio::class);
    }
}
