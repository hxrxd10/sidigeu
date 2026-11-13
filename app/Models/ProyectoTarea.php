<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Tarea o hito del cronograma de un proyecto (RF-2.03, RF-2.07).
 *
 * @property int $id
 * @property int $proyecto_id
 * @property string $tarea
 * @property Carbon|null $fecha_inicio
 * @property Carbon|null $fecha_fin
 * @property int|null $responsable_id
 * @property int $avance
 * @property int $orden
 */
#[Table('proyecto_tareas')]
#[Fillable(['proyecto_id', 'tarea', 'fecha_inicio', 'fecha_fin', 'responsable_id', 'avance', 'orden'])]
class ProyectoTarea extends Model
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
     * @return BelongsTo<User, $this>
     */
    public function responsable(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_inicio' => 'date',
            'fecha_fin' => 'date',
            'avance' => 'integer',
        ];
    }
}
