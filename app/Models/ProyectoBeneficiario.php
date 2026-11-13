<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Beneficiarios estimados de un proyecto (RF-2.02).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property string $tipo
 * @property int $cantidad
 * @property string|null $descripcion
 */
#[Table('proyecto_beneficiarios')]
#[Fillable(['proyecto_id', 'tipo', 'cantidad', 'descripcion'])]
class ProyectoBeneficiario extends Model
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
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['cantidad' => 'integer'];
    }
}
