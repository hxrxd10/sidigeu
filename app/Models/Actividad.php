<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Contracts\ConEvidencias;
use App\Enums\EstadoActividad;
use Database\Factories\ActividadFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\Table;
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
 * Actividad de una unidad de la DIGEU (Módulo 1).
 *
 * @property int $id
 * @property string $nombre
 * @property int $unidad_id
 * @property int|null $responsable_id
 * @property Carbon $fecha
 * @property string|null $hora_inicio
 * @property string|null $hora_fin
 * @property int|null $espacio_id
 * @property string|null $lugar_externo
 * @property int $tipo_actividad_id
 * @property int $linea_accion_id
 * @property int|null $proyecto_id
 * @property bool $publicar_agenda
 * @property bool $es_logro_no_programado
 * @property EstadoActividad $estado
 * @property string|null $descripcion
 * @property string|null $resultados
 * @property string|null $observaciones
 * @property string|null $motivo_cancelacion
 * @property Carbon|null $fecha_cierre
 * @property int|null $creado_por
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read string $lugar
 * @property-read int $beneficiarios_total
 */
#[Table('actividades')]
#[Fillable([
    'nombre',
    'unidad_id',
    'responsable_id',
    'fecha',
    'hora_inicio',
    'hora_fin',
    'espacio_id',
    'lugar_externo',
    'tipo_actividad_id',
    'linea_accion_id',
    'proyecto_id',
    'publicar_agenda',
    'es_logro_no_programado',
    'estado',
    'descripcion',
    'resultados',
    'observaciones',
    'motivo_cancelacion',
    'fecha_cierre',
    'creado_por',
])]
class Actividad extends Model implements ConEvidencias
{
    /** @use HasFactory<ActividadFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'estado' => EstadoActividad::Borrador->value,
        'publicar_agenda' => false,
        'es_logro_no_programado' => false,
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
     * @return BelongsTo<Espacio, $this>
     */
    public function espacio(): BelongsTo
    {
        return $this->belongsTo(Espacio::class);
    }

    /**
     * @return BelongsTo<TipoActividad, $this>
     */
    public function tipoActividad(): BelongsTo
    {
        return $this->belongsTo(TipoActividad::class);
    }

    /**
     * @return BelongsTo<LineaAccion, $this>
     */
    public function lineaAccion(): BelongsTo
    {
        return $this->belongsTo(LineaAccion::class);
    }

    /**
     * Proyecto al que pertenece la actividad (RF-1.12, RF-2.06).
     *
     * @return BelongsTo<Proyecto, $this>
     */
    public function proyecto(): BelongsTo
    {
        return $this->belongsTo(Proyecto::class);
    }

    /**
     * @return BelongsToMany<Indicador, $this, ActividadIndicador, 'pivot'>
     */
    public function indicadores(): BelongsToMany
    {
        return $this->belongsToMany(Indicador::class, 'actividad_indicador')
            ->using(ActividadIndicador::class)
            ->withPivot(['valor_meta', 'valor_alcanzado']);
    }

    /**
     * @return BelongsToMany<PublicoObjetivo, $this>
     */
    public function publicosObjetivo(): BelongsToMany
    {
        return $this->belongsToMany(PublicoObjetivo::class, 'actividad_publico_objetivo');
    }

    /**
     * @return HasMany<ActividadBeneficiario, $this>
     */
    public function beneficiarios(): HasMany
    {
        return $this->hasMany(ActividadBeneficiario::class);
    }

    /**
     * @return HasMany<ActividadParticipante, $this>
     */
    public function participantes(): HasMany
    {
        return $this->hasMany(ActividadParticipante::class);
    }

    /**
     * @return HasMany<ActividadRevision, $this>
     */
    public function revisiones(): HasMany
    {
        return $this->hasMany(ActividadRevision::class)->latest('id');
    }

    /**
     * @return HasMany<ActividadReprogramacion, $this>
     */
    public function reprogramaciones(): HasMany
    {
        return $this->hasMany(ActividadReprogramacion::class)->latest('id');
    }

    /**
     * @return HasMany<SolicitudEspacio, $this>
     */
    public function reservas(): HasMany
    {
        return $this->hasMany(SolicitudEspacio::class);
    }

    /**
     * @return MorphMany<Evidencia, $this>
     */
    public function evidencias(): MorphMany
    {
        return $this->morphMany(Evidencia::class, 'evidenciable');
    }

    /**
     * Lugar legible: el espacio del catálogo o el lugar externo capturado.
     *
     * @return Attribute<string, never>
     */
    protected function lugar(): Attribute
    {
        return Attribute::get(function (): string {
            $espacio = $this->espacio;

            if ($espacio instanceof Espacio) {
                return $espacio->nombre;
            }

            return $this->lugar_externo ?? 'Sin lugar definido';
        });
    }

    /**
     * @return Attribute<int, never>
     */
    protected function beneficiariosTotal(): Attribute
    {
        return Attribute::get(fn (): int => (int) $this->beneficiarios->sum('cantidad'));
    }

    public function horaInicioCorta(): ?string
    {
        return $this->hora_inicio === null ? null : mb_substr($this->hora_inicio, 0, 5);
    }

    public function horaFinCorta(): ?string
    {
        return $this->hora_fin === null ? null : mb_substr($this->hora_fin, 0, 5);
    }

    /**
     * Actividades que aparecen en la Agenda Cultural (RF-1.03).
     *
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function enAgenda(Builder $query): Builder
    {
        return $query->where('publicar_agenda', true)
            ->whereIn('estado', [
                EstadoActividad::PublicadaAgenda,
                EstadoActividad::Reprogramada,
                EstadoActividad::EnEjecucion,
                EstadoActividad::Cerrada,
            ]);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function delMes(Builder $query, int $anio, int $mes): Builder
    {
        return $query->whereYear('fecha', $anio)->whereMonth('fecha', $mes);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function entreFechas(Builder $query, string $desde, string $hasta): Builder
    {
        return $query->whereDate('fecha', '>=', $desde)->whereDate('fecha', '<=', $hasta);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha' => 'date',
            'estado' => EstadoActividad::class,
            'publicar_agenda' => 'boolean',
            'es_logro_no_programado' => 'boolean',
            'fecha_cierre' => 'datetime',
        ];
    }
}
