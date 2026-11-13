<?php

namespace App\Http\Requests\RecursoHumano;

use App\Models\PersonaRecursoHumano;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class ReactivarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('cambiarEstado', $this->persona());
    }

    /**
     * RN-4.04: al reactivar se registra una nueva fecha de alta, posterior a la baja.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $fechaBaja = $this->persona()->fecha_baja;

        return [
            'fecha_alta' => array_filter([
                'required',
                'date',
                $fechaBaja ? 'after_or_equal:'.$fechaBaja->toDateString() : null,
                'before_or_equal:today',
            ]),
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
