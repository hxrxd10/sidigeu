<?php

namespace App\Http\Requests\RecursoHumano;

use App\Concerns\NormalizaCamposOpcionales;
use App\Concerns\PersonaRecursoHumanoValidationRules;
use App\Models\PersonaRecursoHumano;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StorePersonaRequest extends FormRequest
{
    use NormalizaCamposOpcionales, PersonaRecursoHumanoValidationRules;

    protected function prepareForValidation(): void
    {
        $this->normalizarOpcionales(['agrupacion_id', 'dpi', 'pasaporte', 'biografia']);
    }

    public function authorize(): bool
    {
        return Gate::allows('create', PersonaRecursoHumano::class);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->personaRules();
    }

    /**
     * @return array<int, callable>
     */
    public function after(): array
    {
        return $this->personaAfterRules();
    }
}
