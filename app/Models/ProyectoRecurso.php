<?php

namespace App\Models;

use App\Enums\TipoRecurso;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Recurso ejecutado en un proyecto: humano, material o financiero (RF-2.08).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property TipoRecurso $tipo
 * @property int|null $persona_recurso_humano_id
 * @property string|null $descripcion
 * @property float $cantidad
 * @property float $costo
 */
#[Table('proyecto_recursos')]
#[Fillable([
    'proyecto_id',
    'tipo',
    'persona_recurso_humano_id',
    'descripcion',
    'cantidad',
    'costo',
])]
class ProyectoRecurso extends Model
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
     * @return BelongsTo<PersonaRecursoHumano, $this>
     */
    public function persona(): BelongsTo
    {
        return $this->belongsTo(PersonaRecursoHumano::class, 'persona_recurso_humano_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tipo' => TipoRecurso::class,
            'cantidad' => 'float',
            'costo' => 'float',
        ];
    }
}
