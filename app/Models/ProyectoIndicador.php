<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Indicador de un proyecto con su línea base, meta y valor final (RF-2.05).
 *
 * @property int $proyecto_id
 * @property int $indicador_id
 * @property float|null $linea_base
 * @property float|null $meta
 * @property float|null $valor_final
 */
#[Table('proyecto_indicador')]
class ProyectoIndicador extends Pivot
{
    public $incrementing = false;

    public $timestamps = false;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'linea_base' => 'float',
            'meta' => 'float',
            'valor_final' => 'float',
        ];
    }
}
