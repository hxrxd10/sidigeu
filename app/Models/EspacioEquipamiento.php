<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Equipamiento asignado a un espacio, con su cantidad.
 *
 * @property int $espacio_id
 * @property int $equipamiento_id
 * @property int $cantidad
 */
#[Table('espacio_equipamiento')]
class EspacioEquipamiento extends Pivot
{
    public $incrementing = false;

    public $timestamps = false;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'cantidad' => 'integer',
        ];
    }
}
