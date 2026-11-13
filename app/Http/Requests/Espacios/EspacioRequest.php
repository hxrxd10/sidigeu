<?php

namespace App\Http\Requests\Espacios;

use App\Concerns\NormalizaCamposOpcionales;
use App\Enums\EstadoEspacio;
use App\Models\Espacio;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/**
 * Alta y edición de un espacio (RF-3.02).
 */
class EspacioRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    public function authorize(): bool
    {
        $espacio = $this->espacio();

        return $espacio instanceof Espacio
            ? Gate::allows('update', $espacio)
            : Gate::allows('create', Espacio::class);
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['visible_publico' => $this->boolean('visible_publico')]);
        $this->normalizarOpcionales(['ubicacion', 'capacidad', 'caracteristicas', 'condiciones_uso']);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sede_id' => ['required', 'integer', Rule::exists('sedes', 'id')],
            'nombre' => [
                'required', 'string', 'max:255',
                Rule::unique('espacios', 'nombre')
                    ->where('sede_id', $this->input('sede_id'))
                    ->ignore($this->espacio()?->id)
                    ->whereNull('deleted_at'),
            ],
            'tipo_espacio_id' => ['required', 'integer', Rule::exists('tipos_espacio', 'id')],
            'ubicacion' => ['nullable', 'string', 'max:255'],
            'capacidad' => ['nullable', 'integer', 'min:1', 'max:100000'],
            'caracteristicas' => ['nullable', 'string', 'max:2000'],
            'condiciones_uso' => ['nullable', 'string', 'max:2000'],
            'estado' => ['required', Rule::enum(EstadoEspacio::class)],
            'visible_publico' => ['boolean'],
            'equipamientos' => ['array'],
            'equipamientos.*' => ['integer', Rule::exists('equipamientos', 'id')],
            'cantidades' => ['array'],
            'cantidades.*' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'fotografias' => ['array', 'max:6'],
            'fotografias.*' => ['image', 'mimes:jpg,jpeg,png', 'max:4096'],
        ];
    }

    public function espacio(): ?Espacio
    {
        $espacio = $this->route('espacio');

        if ($espacio === null) {
            return null;
        }

        return $espacio instanceof Espacio ? $espacio : Espacio::query()->findOrFail((int) $espacio);
    }
}
