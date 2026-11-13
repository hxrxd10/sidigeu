<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Objetivo específico de un proyecto (RF-2.02).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property string $descripcion
 * @property int $orden
 */
#[Table('proyecto_objetivos')]
#[Fillable(['proyecto_id', 'descripcion', 'orden'])]
class ProyectoObjetivo extends Model
{
    public $timestamps = false;

    /**
     * @return BelongsTo<Proyecto, $this>
     */
    public function proyecto(): BelongsTo
    {
        return $this->belongsTo(Proyecto::class);
    }
}
