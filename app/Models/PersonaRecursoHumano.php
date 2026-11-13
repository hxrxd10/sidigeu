<?php

namespace App\Models;

use App\Concerns\Auditable;
use App\Enums\TipoPersona;
use Carbon\CarbonInterface;
use Database\Factories\PersonaRecursoHumanoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * Artista o deportista vinculado a la DIGEU (Módulo 4).
 *
 * @property int $id
 * @property TipoPersona $tipo
 * @property int $disciplina_id
 * @property int|null $agrupacion_id
 * @property string $nombres
 * @property string $apellidos
 * @property int $pais_id
 * @property Carbon $fecha_nacimiento
 * @property string|null $dpi
 * @property string|null $pasaporte
 * @property string|null $foto_ruta
 * @property Carbon $fecha_alta
 * @property bool $activo
 * @property Carbon|null $fecha_baja
 * @property string|null $motivo_baja
 * @property string|null $biografia
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read string $nombre_completo
 * @property-read int $edad
 */
#[Table('personas_recurso_humano')]
#[Fillable([
    'tipo',
    'disciplina_id',
    'agrupacion_id',
    'nombres',
    'apellidos',
    'pais_id',
    'fecha_nacimiento',
    'dpi',
    'pasaporte',
    'foto_ruta',
    'fecha_alta',
    'activo',
    'fecha_baja',
    'motivo_baja',
    'biografia',
])]
class PersonaRecursoHumano extends Model
{
    /** @use HasFactory<PersonaRecursoHumanoFactory> */
    use Auditable, HasFactory, SoftDeletes;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'activo' => true,
    ];

    /**
     * El documento de identificación no se copia a la bitácora (RNF-05).
     *
     * @return array<int, string>
     */
    public function atributosEnmascaradosEnAuditoria(): array
    {
        return ['dpi', 'pasaporte'];
    }

    /**
     * @return BelongsTo<Disciplina, $this>
     */
    public function disciplina(): BelongsTo
    {
        return $this->belongsTo(Disciplina::class);
    }

    /**
     * @return BelongsTo<Agrupacion, $this>
     */
    public function agrupacion(): BelongsTo
    {
        return $this->belongsTo(Agrupacion::class);
    }

    /**
     * @return BelongsTo<Pais, $this>
     */
    public function pais(): BelongsTo
    {
        return $this->belongsTo(Pais::class);
    }

    /**
     * @return HasMany<PersonaRecursoHumanoPeriodo, $this>
     */
    public function periodos(): HasMany
    {
        return $this->hasMany(PersonaRecursoHumanoPeriodo::class, 'persona_id');
    }

    /**
     * @return Attribute<string, never>
     */
    protected function nombreCompleto(): Attribute
    {
        return Attribute::get(fn (): string => trim($this->nombres.' '.$this->apellidos));
    }

    /**
     * @return Attribute<int, never>
     */
    protected function edad(): Attribute
    {
        return Attribute::get(fn (): int => (int) abs(
            $this->fecha_nacimiento->startOfDay()->diffInYears(Carbon::today())
        ));
    }

    /**
     * Permanencia del período vigente o del último cerrado (RN-4.03).
     *
     * @return array{anios: int, meses: int, dias: int, dias_totales: int, texto: string}
     */
    public function permanencia(): array
    {
        $fin = $this->activo ? Carbon::today() : ($this->fecha_baja ?? Carbon::today());

        return $this->desglosar($this->diasEntre($this->fecha_alta, $fin));
    }

    /**
     * Suma de todos los períodos, para quien se ha reincorporado (RN-4.05).
     *
     * @return array{anios: int, meses: int, dias: int, dias_totales: int, texto: string}
     */
    public function permanenciaTotal(): array
    {
        $dias = $this->periodos
            ->sum(fn (PersonaRecursoHumanoPeriodo $periodo): int => $periodo->diasDuracion());

        return $this->desglosar((int) $dias);
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
     * Busca por nombres, apellidos, DPI o pasaporte (RF-4.04).
     *
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function buscar(Builder $query, ?string $termino): Builder
    {
        $termino = trim((string) $termino);

        if ($termino === '') {
            return $query;
        }

        return $query->where(function (Builder $query) use ($termino): void {
            $query->where('nombres', 'like', "%{$termino}%")
                ->orWhere('apellidos', 'like', "%{$termino}%")
                ->orWhere('dpi', 'like', "%{$termino}%")
                ->orWhere('pasaporte', 'like', "%{$termino}%");
        });
    }

    /**
     * Días completos entre dos fechas, sin signo.
     */
    private function diasEntre(CarbonInterface $inicio, CarbonInterface $fin): int
    {
        return (int) abs($inicio->startOfDay()->diffInDays($fin->startOfDay()));
    }

    /**
     * Convierte una cantidad de días en años, meses y días legibles.
     *
     * @return array{anios: int, meses: int, dias: int, dias_totales: int, texto: string}
     */
    private function desglosar(int $dias): array
    {
        $fin = Carbon::today();
        $diferencia = $fin->copy()->subDays($dias)->diff($fin);

        $partes = array_filter([
            $diferencia->y > 0 ? $diferencia->y.' '.($diferencia->y === 1 ? 'año' : 'años') : null,
            $diferencia->m > 0 ? $diferencia->m.' '.($diferencia->m === 1 ? 'mes' : 'meses') : null,
            $diferencia->d > 0 ? $diferencia->d.' '.($diferencia->d === 1 ? 'día' : 'días') : null,
        ]);

        return [
            'anios' => $diferencia->y,
            'meses' => $diferencia->m,
            'dias' => $diferencia->d,
            'dias_totales' => $dias,
            'texto' => $partes === [] ? 'Menos de un día' : implode(', ', $partes),
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tipo' => TipoPersona::class,
            'fecha_nacimiento' => 'date',
            'fecha_alta' => 'date',
            'fecha_baja' => 'date',
            'activo' => 'boolean',
        ];
    }
}
