<?php

namespace App\Models;

use App\Enums\RangoEdad;
use App\Enums\SexoBeneficiario;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Beneficiarios de una actividad, desagregados (RF-1.06).
 *
 * @property int $id
 * @property int $actividad_id
 * @property SexoBeneficiario $sexo
 * @property RangoEdad $rango_edad
 * @property string|null $tipo_publico
 * @property int $cantidad
 */
#[Table('actividad_beneficiarios')]
#[Fillable(['actividad_id', 'sexo', 'rango_edad', 'tipo_publico', 'cantidad'])]
class ActividadBeneficiario extends Model
{
    public $timestamps = false;

    /**
     * @return BelongsTo<Actividad, $this>
     */
    public function actividad(): BelongsTo
    {
        return $this->belongsTo(Actividad::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sexo' => SexoBeneficiario::class,
            'rango_edad' => RangoEdad::class,
            'cantidad' => 'integer',
        ];
    }
}
