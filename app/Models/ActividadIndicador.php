<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Indicador asociado a una actividad, con su meta y su valor alcanzado.
 *
 * @property int $actividad_id
 * @property int $indicador_id
 * @property float|null $valor_meta
 * @property float|null $valor_alcanzado
 */
#[Table('actividad_indicador')]
class ActividadIndicador extends Pivot
{
    public $incrementing = false;

    public $timestamps = false;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'valor_meta' => 'float',
            'valor_alcanzado' => 'float',
        ];
    }
}
