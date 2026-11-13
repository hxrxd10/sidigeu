<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Enums\EstadoEspacio;
use Database\Factories\EspacioFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Espacio físico bajo gestión de la DIGEU (Módulo 3).
 *
 * @property int $id
 * @property int $sede_id
 * @property string $nombre
 * @property int $tipo_espacio_id
 * @property string|null $ubicacion
 * @property int|null $capacidad
 * @property string|null $caracteristicas
 * @property string|null $condiciones_uso
 * @property EstadoEspacio $estado
 * @property bool $visible_publico
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read int $reservas_aprobadas conteo que agrega `withCount`
 */
#[Fillable([
    'sede_id',
    'nombre',
    'tipo_espacio_id',
    'ubicacion',
    'capacidad',
    'caracteristicas',
    'condiciones_uso',
    'estado',
    'visible_publico',
])]
class Espacio extends Model
{
    /** @use HasFactory<EspacioFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'estado' => EstadoEspacio::Activo->value,
        'visible_publico' => true,
    ];

    /**
     * @return BelongsTo<Sede, $this>
     */
    public function sede(): BelongsTo
    {
        return $this->belongsTo(Sede::class);
    }

    /**
     * @return BelongsTo<TipoEspacio, $this>
     */
    public function tipoEspacio(): BelongsTo
    {
        return $this->belongsTo(TipoEspacio::class);
    }

    /**
     * @return BelongsToMany<Equipamiento, $this, EspacioEquipamiento, 'pivot'>
     */
    public function equipamientos(): BelongsToMany
    {
        return $this->belongsToMany(Equipamiento::class, 'espacio_equipamiento')
            ->using(EspacioEquipamiento::class)
            ->withPivot('cantidad');
    }

    /**
     * @return HasMany<EspacioFotografia, $this>
     */
    public function fotografias(): HasMany
    {
        return $this->hasMany(EspacioFotografia::class)->orderBy('orden');
    }

    /**
     * @return HasMany<SolicitudEspacio, $this>
     */
    public function solicitudes(): HasMany
    {
        return $this->hasMany(SolicitudEspacio::class);
    }

    /**
     * Espacios que aparecen en el catálogo público (RF-3.02, RF-3.03).
     *
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function publicos(Builder $query): Builder
    {
        return $query->where('visible_publico', true)
            ->whereIn('estado', [EstadoEspacio::Activo, EstadoEspacio::Mantenimiento]);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function reservables(Builder $query): Builder
    {
        return $query->where('estado', EstadoEspacio::Activo);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'estado' => EstadoEspacio::class,
            'visible_publico' => 'boolean',
            'capacidad' => 'integer',
        ];
    }
}
