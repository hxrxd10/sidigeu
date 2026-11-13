<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Policies\CatalogoPolicy;
use Database\Factories\EquipamientoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Equipamiento disponible en un espacio.
 *
 * @property int $id
 * @property string $nombre
 * @property bool $activo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read EspacioEquipamiento $pivot cantidad del equipamiento en el espacio
 */
#[UsePolicy(CatalogoPolicy::class)]
#[Fillable(['nombre', 'activo'])]
class Equipamiento extends Model
{
    /** @use HasFactory<EquipamientoFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'activo' => true,
    ];

    /**
     * @return BelongsToMany<Espacio, $this, EspacioEquipamiento, 'pivot'>
     */
    public function espacios(): BelongsToMany
    {
        return $this->belongsToMany(Espacio::class, 'espacio_equipamiento')
            ->using(EspacioEquipamiento::class)
            ->withPivot('cantidad');
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
