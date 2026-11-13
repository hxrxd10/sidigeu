<?php

namespace App\Observers;

use App\Enums\AccionAuditoria;
use App\Models\Auditoria;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

/**
 * Escribe en la bitácora los cambios de los modelos que usan el trait Auditable.
 */
class AuditoriaObserver
{
    /**
     * Atributos que solo generan ruido en la bitácora.
     *
     * @var array<int, string>
     */
    private const IGNORADOS = ['created_at', 'updated_at', 'remember_token'];

    public function created(Model $model): void
    {
        Auditoria::registrar(
            $model,
            AccionAuditoria::Creado,
            despues: $this->depurar($model, $model->getAttributes()),
        );
    }

    public function updated(Model $model): void
    {
        $despues = $this->depurar($model, $model->getChanges());

        if ($despues === []) {
            return;
        }

        Auditoria::registrar(
            $model,
            AccionAuditoria::Actualizado,
            antes: $this->depurar($model, Arr::only($model->getOriginal(), array_keys($despues))),
            despues: $despues,
        );
    }

    public function deleted(Model $model): void
    {
        Auditoria::registrar(
            $model,
            AccionAuditoria::Eliminado,
            antes: $this->depurar($model, $model->getOriginal()),
        );
    }

    public function restored(Model $model): void
    {
        Auditoria::registrar($model, AccionAuditoria::Restaurado);
    }

    /**
     * Quita los atributos sin valor informativo y enmascara los sensibles.
     *
     * @param  array<string, mixed>  $valores
     * @return array<string, mixed>
     */
    private function depurar(Model $model, array $valores): array
    {
        $valores = Arr::except($valores, self::IGNORADOS);

        $enmascarados = method_exists($model, 'atributosEnmascaradosEnAuditoria')
            ? $model->atributosEnmascaradosEnAuditoria()
            : [];

        foreach ($enmascarados as $atributo) {
            if (array_key_exists($atributo, $valores)) {
                $valores[$atributo] = '********';
            }
        }

        return $valores;
    }
}
