<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Renglón del presupuesto de un proyecto (RF-2.04, RF-2.07).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property string $descripcion
 * @property float $cantidad
 * @property float $costo_unitario
 * @property float $ejecutado
 * @property int|null $fuente_financiamiento_id
 */
#[Table('proyecto_presupuestos')]
#[Fillable([
    'proyecto_id',
    'descripcion',
    'cantidad',
    'costo_unitario',
    'ejecutado',
    'fuente_financiamiento_id',
])]
class ProyectoPresupuesto extends Model
{
    public $timestamps = false;

    /**
     * @return BelongsTo<Proyecto, $this>
     */
    public function proyecto(): BelongsTo
    {
        return $this->belongsTo(Proyecto::class);
    }

    /**
     * @return BelongsTo<FuenteFinanciamiento, $this>
     */
    public function fuente(): BelongsTo
    {
        return $this->belongsTo(FuenteFinanciamiento::class, 'fuente_financiamiento_id');
    }

    public function subtotal(): float
    {
        return round($this->cantidad * $this->costo_unitario, 2);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'cantidad' => 'float',
            'costo_unitario' => 'float',
            'ejecutado' => 'float',
        ];
    }
}
