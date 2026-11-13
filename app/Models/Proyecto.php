<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Contracts\ConEvidencias;
use App\Enums\EstadoProyecto;
use Database\Factories\ProyectoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Proyecto de una unidad de la DIGEU (Módulo 2).
 *
 * @property int $id
 * @property string $nombre
 * @property int $unidad_id
 * @property int|null $responsable_id
 * @property int|null $area_id
 * @property int|null $programa_id
 * @property int|null $linea_accion_id
 * @property int|null $tipo_proyecto_id
 * @property string|null $justificacion
 * @property string|null $objetivo_general
 * @property Carbon|null $fecha_inicio
 * @property Carbon|null $fecha_fin
 * @property EstadoProyecto $estado
 * @property string|null $resultados
 * @property string|null $productos
 * @property string|null $lecciones_aprendidas
 * @property Carbon|null $fecha_cierre
 * @property string|null $motivo_estado
 * @property int|null $creado_por
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read float $presupuesto_total
 * @property-read float $presupuesto_ejecutado
 * @property-read int $avance_fisico
 */
#[Fillable([
    'nombre',
    'unidad_id',
    'responsable_id',
    'area_id',
    'programa_id',
    'linea_accion_id',
    'tipo_proyecto_id',
    'justificacion',
    'objetivo_general',
    'fecha_inicio',
    'fecha_fin',
    'estado',
    'resultados',
    'productos',
    'lecciones_aprendidas',
    'fecha_cierre',
    'motivo_estado',
    'creado_por',
])]
class Proyecto extends Model implements ConEvidencias
{
    /** @use HasFactory<ProyectoFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'estado' => EstadoProyecto::Registrado->value,
    ];

    /**
     * @return BelongsTo<Unidad, $this>
     */
    public function unidad(): BelongsTo
    {
        return $this->belongsTo(Unidad::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function responsable(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    /**
     * @return BelongsTo<Area, $this>
     */
    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    /**
     * @return BelongsTo<Programa, $this>
     */
    public function programa(): BelongsTo
    {
        return $this->belongsTo(Programa::class);
    }

    /**
     * @return BelongsTo<LineaAccion, $this>
     */
    public function lineaAccion(): BelongsTo
    {
        return $this->belongsTo(LineaAccion::class);
    }

    /**
     * @return BelongsTo<TipoProyecto, $this>
     */
    public function tipoProyecto(): BelongsTo
    {
        return $this->belongsTo(TipoProyecto::class);
    }

    /**
     * @return HasMany<ProyectoObjetivo, $this>
     */
    public function objetivos(): HasMany
    {
        return $this->hasMany(ProyectoObjetivo::class)->orderBy('orden');
    }

    /**
     * @return HasMany<ProyectoBeneficiario, $this>
     */
    public function beneficiarios(): HasMany
    {
        return $this->hasMany(ProyectoBeneficiario::class);
    }

    /**
     * @return HasMany<ProyectoTarea, $this>
     */
    public function cronograma(): HasMany
    {
        return $this->hasMany(ProyectoTarea::class)->orderBy('orden');
    }

    /**
     * @return HasMany<ProyectoPresupuesto, $this>
     */
    public function presupuesto(): HasMany
    {
        return $this->hasMany(ProyectoPresupuesto::class);
    }

    /**
     * @return BelongsToMany<Indicador, $this, ProyectoIndicador, 'detalleProyecto'>
     */
    public function indicadores(): BelongsToMany
    {
        return $this->belongsToMany(Indicador::class, 'proyecto_indicador')
            ->using(ProyectoIndicador::class)
            ->as('detalleProyecto')
            ->withPivot(['linea_base', 'meta', 'valor_final']);
    }

    /**
     * @return HasMany<ProyectoAvance, $this>
     */
    public function avances(): HasMany
    {
        return $this->hasMany(ProyectoAvance::class)->latest('fecha');
    }

    /**
     * @return HasMany<ProyectoRecurso, $this>
     */
    public function recursos(): HasMany
    {
        return $this->hasMany(ProyectoRecurso::class);
    }

    /**
     * @return HasMany<ProyectoRevision, $this>
     */
    public function revisiones(): HasMany
    {
        return $this->hasMany(ProyectoRevision::class)->latest('id');
    }

    /**
     * Actividades del Módulo 1 vinculadas al proyecto (RF-2.06).
     *
     * @return HasMany<Actividad, $this>
     */
    public function actividades(): HasMany
    {
        return $this->hasMany(Actividad::class);
    }

    /**
     * @return MorphMany<Evidencia, $this>
     */
    public function evidencias(): MorphMany
    {
        return $this->morphMany(Evidencia::class, 'evidenciable');
    }

    /**
     * @return Attribute<float, never>
     */
    protected function presupuestoTotal(): Attribute
    {
        return Attribute::get(fn (): float => (float) $this->presupuesto->sum(
            fn (ProyectoPresupuesto $renglon): float => $renglon->subtotal()
        ));
    }

    /**
     * @return Attribute<float, never>
     */
    protected function presupuestoEjecutado(): Attribute
    {
        return Attribute::get(fn (): float => (float) $this->presupuesto->sum('ejecutado'));
    }

    /**
     * Avance físico: promedio del avance de las tareas del cronograma (RF-2.07).
     *
     * @return Attribute<int, never>
     */
    protected function avanceFisico(): Attribute
    {
        return Attribute::get(function (): int {
            $tareas = $this->cronograma;

            if ($tareas->isEmpty()) {
                $ultimo = $this->avances->first();

                return $ultimo instanceof ProyectoAvance ? $ultimo->porcentaje : 0;
            }

            return (int) round($tareas->avg('avance'));
        });
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function enEjecucion(Builder $query): Builder
    {
        return $query->whereIn('estado', [EstadoProyecto::Aprobado, EstadoProyecto::EnEjecucion]);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_inicio' => 'date',
            'fecha_fin' => 'date',
            'fecha_cierre' => 'datetime',
            'estado' => EstadoProyecto::class,
        ];
    }
}
