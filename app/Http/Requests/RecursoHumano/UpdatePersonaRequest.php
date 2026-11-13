<?php

namespace App\Http\Requests\RecursoHumano;

use App\Concerns\NormalizaCamposOpcionales;
use App\Concerns\PersonaRecursoHumanoValidationRules;
use App\Models\PersonaRecursoHumano;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdatePersonaRequest extends FormRequest
{
    use NormalizaCamposOpcionales, PersonaRecursoHumanoValidationRules;

    protected function prepareForValidation(): void
    {
        $this->normalizarOpcionales(['agrupacion_id', 'dpi', 'pasaporte', 'biografia']);
    }

    public function authorize(): bool
    {
        return Gate::allows('update', $this->persona());
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->personaRules($this->persona()->id);
    }

    /**
     * @return array<int, callable>
     */
    public function after(): array
    {
        return $this->personaAfterRules();
    }

    public function persona(): PersonaRecursoHumano
    {
        $persona = $this->route('persona');

        return $persona instanceof PersonaRecursoHumano
            ? $persona
            : PersonaRecursoHumano::query()->findOrFail((int) $persona);
    }
}
