<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Policies\CatalogoPolicy;
use Database\Factories\IndicadorFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Indicador institucional con su unidad de medida.
 *
 * @property int $id
 * @property string $nombre
 * @property string $unidad_medida
 * @property string|null $descripcion
 * @property bool $activo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read ActividadIndicador $pivot meta y valor alcanzado en la actividad
 * @property-read ProyectoIndicador $detalleProyecto línea base, meta y valor final en el proyecto
 */
#[Table('indicadores')]
#[UsePolicy(CatalogoPolicy::class)]
#[Fillable(['nombre', 'unidad_medida', 'descripcion', 'activo'])]
class Indicador extends Model
{
    /** @use HasFactory<IndicadorFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'activo' => true,
    ];

    /**
     * @return BelongsToMany<Actividad, $this, ActividadIndicador, 'pivot'>
     */
    public function actividades(): BelongsToMany
    {
        return $this->belongsToMany(Actividad::class, 'actividad_indicador')
            ->using(ActividadIndicador::class)
            ->withPivot(['valor_meta', 'valor_alcanzado']);
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
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'activo' => 'boolean',
        ];
    }
}
