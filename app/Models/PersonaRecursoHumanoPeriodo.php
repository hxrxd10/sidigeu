<?php

namespace App\Models;

use Database\Factories\PersonaRecursoHumanoPeriodoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Período de permanencia de una persona en la DIGEU (RN-4.05).
 *
 * @property int $id
 * @property int $persona_id
 * @property Carbon $fecha_alta
 * @property Carbon|null $fecha_baja
 * @property string|null $motivo_baja
 */
#[Table('periodos_recurso_humano')]
#[Fillable(['persona_id', 'fecha_alta', 'fecha_baja', 'motivo_baja'])]
class PersonaRecursoHumanoPeriodo extends Model
{
    /** @use HasFactory<PersonaRecursoHumanoPeriodoFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<PersonaRecursoHumano, $this>
     */
    public function persona(): BelongsTo
    {
        return $this->belongsTo(PersonaRecursoHumano::class, 'persona_id');
    }

    /**
     * Días completos que duró el período; si sigue abierto, hasta hoy.
     */
    public function diasDuracion(): int
    {
        $fin = $this->fecha_baja ?? Carbon::today();

        return (int) $this->fecha_alta->startOfDay()->diffInDays($fin->startOfDay());
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_alta' => 'date',
            'fecha_baja' => 'date',
        ];
    }
}
