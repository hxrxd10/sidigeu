<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Policies\CatalogoPolicy;
use Database\Factories\AreaFactory;
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
 * Área sustantiva de la DIGEU (formación, cultura, deporte, etc.).
 *
 * @property int $id
 * @property string $nombre
 * @property string $slug
 * @property string|null $descripcion
 * @property bool $activo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[UsePolicy(CatalogoPolicy::class)]
#[Fillable(['nombre', 'slug', 'descripcion', 'activo'])]
class Area extends Model
{
    /** @use HasFactory<AreaFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * Refleja el valor por defecto de la base para los modelos aún sin guardar.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'activo' => true,
    ];

    /**
     * @return HasMany<Unidad, $this>
     */
    public function unidades(): HasMany
    {
        return $this->hasMany(Unidad::class);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function activas(Builder $query): Builder
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
