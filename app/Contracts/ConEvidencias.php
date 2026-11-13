<?php

namespace App\Contracts;

use App\Models\Evidencia;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Entidad que admite evidencias: fotografías, documentos y enlaces.
 */
interface ConEvidencias
{
    /**
     * @return MorphMany<Evidencia, covariant \Illuminate\Database\Eloquent\Model>
     */
    public function evidencias(): MorphMany;
}
