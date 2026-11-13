<?php

namespace App\Http\Requests\Proyectos;

use App\Models\Proyecto;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/**
 * Formulación del proyecto (RF-2.02 a RF-2.05).
 */
class FormulacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('update', $this->proyecto());
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'objetivos' => ['array'],
            'objetivos.*.descripcion' => ['nullable', 'string', 'max:1000'],

            'beneficiarios' => ['array'],
            'beneficiarios.*.tipo' => ['nullable', 'string', 'max:255'],
            'beneficiarios.*.cantidad' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'beneficiarios.*.descripcion' => ['nullable', 'string', 'max:500'],

            'cronograma' => ['array'],
            'cronograma.*.tarea' => ['nullable', 'string', 'max:255'],
            'cronograma.*.fecha_inicio' => ['nullable', 'date'],
            'cronograma.*.fecha_fin' => ['nullable', 'date', 'after_or_equal:cronograma.*.fecha_inicio'],
            'cronograma.*.responsable_id' => ['nullable', 'integer', Rule::exists('users', 'id')],
            'cronograma.*.avance' => ['nullable', 'integer', 'min:0', 'max:100'],

            'presupuesto' => ['array'],
            'presupuesto.*.descripcion' => ['nullable', 'string', 'max:255'],
            'presupuesto.*.cantidad' => ['nullable', 'numeric', 'min:0'],
            'presupuesto.*.costo_unitario' => ['nullable', 'numeric', 'min:0'],
            'presupuesto.*.fuente_financiamiento_id' => [
                'nullable', 'integer', Rule::exists('fuentes_financiamiento', 'id'),
            ],

            'indicadores' => ['array'],
            'indicadores.*.indicador_id' => ['required', 'integer', Rule::exists('indicadores', 'id')],
            'indicadores.*.linea_base' => ['nullable', 'numeric'],
            'indicadores.*.meta' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    /**
     * Normaliza los indicadores: sin meta no se asocia el indicador.
     *
     * @return array<string, mixed>
     */
    public function datos(): array
    {
        $datos = $this->validated();

        /** @var array<int, array<string, mixed>> $indicadores */
        $indicadores = $datos['indicadores'] ?? [];

        $datos['indicadores'] = array_values(array_map(
            fn (array $fila): array => [
                'indicador_id' => (int) $fila['indicador_id'],
                'linea_base' => ($fila['linea_base'] ?? '') === '' ? null : (float) $fila['linea_base'],
                'meta' => ($fila['meta'] ?? '') === '' ? null : (float) $fila['meta'],
            ],
            $indicadores,
        ));

        return $datos;
    }

    public function proyecto(): Proyecto
    {
        $proyecto = $this->route('proyecto');

        return $proyecto instanceof Proyecto
            ? $proyecto
            : Proyecto::query()->findOrFail((int) $proyecto);
    }
}
