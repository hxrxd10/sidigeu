<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Enums\EstadoSolicitud;
use Database\Factories\SolicitudEspacioFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Solicitud de uso de un espacio (RF-3.04). Solo las aprobadas bloquean el
 * horario en el calendario de ocupación.
 *
 * @property int $id
 * @property int $espacio_id
 * @property Carbon $fecha
 * @property string $hora_inicio
 * @property string $hora_fin
 * @property string $solicitante_nombre
 * @property string|null $institucion
 * @property string $correo
 * @property string|null $telefono
 * @property string $proposito
 * @property int|null $asistentes
 * @property string|null $requerimientos
 * @property EstadoSolicitud $estado
 * @property int|null $solicitado_por
 * @property int|null $resuelto_por
 * @property Carbon|null $fecha_resolucion
 * @property string|null $motivo_rechazo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Table('solicitudes_espacio')]
#[Fillable([
    'espacio_id',
    'fecha',
    'hora_inicio',
    'hora_fin',
    'solicitante_nombre',
    'institucion',
    'correo',
    'telefono',
    'proposito',
    'asistentes',
    'requerimientos',
    'estado',
    'solicitado_por',
    'resuelto_por',
    'fecha_resolucion',
    'motivo_rechazo',
])]
class SolicitudEspacio extends Model
{
    /** @use HasFactory<SolicitudEspacioFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'estado' => EstadoSolicitud::Pendiente->value,
    ];

    /**
     * El correo y el teléfono del solicitante no se copian a la bitácora.
     *
     * @return array<int, string>
     */
    public function atributosEnmascaradosEnAuditoria(): array
    {
        return ['correo', 'telefono'];
    }

    /**
     * @return BelongsTo<Espacio, $this>
     */
    public function espacio(): BelongsTo
    {
        return $this->belongsTo(Espacio::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function solicitante(): BelongsTo
    {
        return $this->belongsTo(User::class, 'solicitado_por');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function resolutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resuelto_por');
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function pendientes(Builder $query): Builder
    {
        return $query->where('estado', EstadoSolicitud::Pendiente);
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function aprobadas(Builder $query): Builder
    {
        return $query->where('estado', EstadoSolicitud::Aprobada);
    }

    /**
     * Solicitudes que ocupan el mismo espacio y se cruzan con el horario dado
     * (RF-3.06). Dos reservas se traslapan si una empieza antes de que termine
     * la otra y termina después de que la otra empieza.
     *
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function queSeTraslapanCon(
        Builder $query,
        int $espacioId,
        string $fecha,
        string $horaInicio,
        string $horaFin,
    ): Builder {
        return $query->where('espacio_id', $espacioId)
            ->whereDate('fecha', $fecha)
            ->where('hora_inicio', '<', $horaFin)
            ->where('hora_fin', '>', $horaInicio);
    }

    public function horaInicioCorta(): string
    {
        return mb_substr($this->hora_inicio, 0, 5);
    }

    public function horaFinCorta(): string
    {
        return mb_substr($this->hora_fin, 0, 5);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha' => 'date',
            'estado' => EstadoSolicitud::class,
            'fecha_resolucion' => 'datetime',
            'asistentes' => 'integer',
        ];
    }
}
