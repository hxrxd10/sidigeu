<?php

namespace App\Concerns;

use App\Enums\AccionAuditoria;
use App\Models\Auditoria;
use App\Observers\AuditoriaObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Registra en la bitácora de auditoría los cambios del modelo (RF-T.05).
 *
 * @phpstan-require-extends Model
 */
trait Auditable
{
    public static function bootAuditable(): void
    {
        // Los oyentes se registran aquí en lugar de con `observe()`, que no puede
        // invocarse mientras el modelo se está inicializando.
        static::created(fn (Model $modelo) => app(AuditoriaObserver::class)->created($modelo));
        static::updated(fn (Model $modelo) => app(AuditoriaObserver::class)->updated($modelo));
        static::deleted(fn (Model $modelo) => app(AuditoriaObserver::class)->deleted($modelo));

        if (method_exists(static::class, 'restored')) {
            static::restored(fn (Model $modelo) => app(AuditoriaObserver::class)->restored($modelo));
        }
    }

    /**
     * @return MorphMany<Auditoria, $this>
     */
    public function auditorias(): MorphMany
    {
        return $this->morphMany(Auditoria::class, 'auditable');
    }

    /**
     * Atributos cuyo valor se enmascara en la bitácora (se registra el cambio, no el dato).
     *
     * @return array<int, string>
     */
    public function atributosEnmascaradosEnAuditoria(): array
    {
        return $this->getHidden();
    }

    /**
     * Deja constancia de una acción que no genera un evento de Eloquent,
     * como la consulta de datos sensibles (RNF-05).
     */
    public function registrarAuditoria(AccionAuditoria $accion): Auditoria
    {
        return Auditoria::registrar($this, $accion);
    }
}
