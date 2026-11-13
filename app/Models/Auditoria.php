<?php

namespace App\Models;

use App\Enums\AccionAuditoria;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * Registro de la bitácora de auditoría (RF-T.05). Es inmutable: solo se crea.
 *
 * @property int $id
 * @property int|null $user_id
 * @property string $auditable_type
 * @property int $auditable_id
 * @property AccionAuditoria $accion
 * @property array<string, mixed>|null $valores_antes
 * @property array<string, mixed>|null $valores_despues
 * @property string|null $ip
 * @property string|null $user_agent
 * @property Carbon|null $created_at
 */
#[Fillable([
    'user_id',
    'auditable_type',
    'auditable_id',
    'accion',
    'valores_antes',
    'valores_despues',
    'ip',
    'user_agent',
])]
class Auditoria extends Model
{
    public const UPDATED_AT = null;

    /**
     * Deja constancia de una acción sobre un modelo, con el usuario y el origen de la petición.
     *
     * @param  array<string, mixed>|null  $antes
     * @param  array<string, mixed>|null  $despues
     */
    public static function registrar(Model $modelo, AccionAuditoria $accion, ?array $antes = null, ?array $despues = null): self
    {
        $peticion = request();

        return self::create([
            'user_id' => auth()->id(),
            'auditable_type' => $modelo->getMorphClass(),
            'auditable_id' => $modelo->getKey(),
            'accion' => $accion,
            'valores_antes' => $antes,
            'valores_despues' => $despues,
            'ip' => $peticion->ip(),
            'user_agent' => Str::limit((string) $peticion->userAgent(), 250, ''),
        ]);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return MorphTo<Model, $this>
     */
    public function auditable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    #[Scope]
    protected function recientes(Builder $query): Builder
    {
        return $query->orderByDesc('created_at')->orderByDesc('id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'accion' => AccionAuditoria::class,
            'valores_antes' => 'array',
            'valores_despues' => 'array',
            'created_at' => 'datetime',
        ];
    }
}
