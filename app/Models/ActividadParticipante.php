<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Participante de una actividad: artista o deportista del padrón (Módulo 4) o
 * una persona externa registrada por su nombre (RF-4.06).
 *
 * @property int $id
 * @property int $actividad_id
 * @property int|null $persona_recurso_humano_id
 * @property string|null $nombre_externo
 * @property string|null $rol
 */
#[Table('actividad_participantes')]
#[Fillable(['actividad_id', 'persona_recurso_humano_id', 'nombre_externo', 'rol'])]
class ActividadParticipante extends Model
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
     * @return BelongsTo<PersonaRecursoHumano, $this>
     */
    public function persona(): BelongsTo
    {
        return $this->belongsTo(PersonaRecursoHumano::class, 'persona_recurso_humano_id');
    }

    public function nombre(): string
    {
        $persona = $this->persona;

        if ($persona instanceof PersonaRecursoHumano) {
            return $persona->nombre_completo;
        }

        return $this->nombre_externo ?? 'Participante';
    }
}
