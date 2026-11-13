<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Enums\TipoPersona;
use App\Policies\CatalogoPolicy;
use Database\Factories\DisciplinaFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Disciplina artística o deportiva.
 *
 * @property int $id
 * @property string $nombre
 * @property TipoPersona $tipo
 * @property bool $activo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[UsePolicy(CatalogoPolicy::class)]
#[Fillable(['nombre', 'tipo', 'activo'])]
class Disciplina extends Model
{
    /** @use HasFactory<DisciplinaFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'activo' => true,
    ];

    /**
     * @return HasMany<PersonaRecursoHumano, $this>
     */
    public function personas(): HasMany
    {
        return $this->hasMany(PersonaRecursoHumano::class);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function activos(Builder $query): Builder
    {
        return $query->where('activo', true);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function deTipo(Builder $query, TipoPersona $tipo): Builder
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tipo' => TipoPersona::class,
            'activo' => 'boolean',
        ];
    }
}
