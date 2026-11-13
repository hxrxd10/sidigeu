<?php

namespace App\Http\Requests\RecursoHumano;

use App\Models\PersonaRecursoHumano;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class DarDeBajaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('cambiarEstado', $this->persona());
    }

    /**
     * RN-4.04: la baja exige fecha y esta no puede ser anterior al alta.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fecha_baja' => [
                'required',
                'date',
                'after_or_equal:'.$this->persona()->fecha_alta->toDateString(),
                'before_or_equal:today',
            ],
            'motivo_baja' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function persona(): PersonaRecursoHumano
    {
        $persona = $this->route('persona');

        return $persona instanceof PersonaRecursoHumano
            ? $persona
            : PersonaRecursoHumano::query()->findOrFail((int) $persona);
    }
}
