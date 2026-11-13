<?php

namespace App\Http\Requests\Proyectos;

use App\Concerns\NormalizaCamposOpcionales;
use App\Models\Proyecto;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/**
 * Datos generales y clasificación de un proyecto (RF-2.01).
 */
class ProyectoRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    public function authorize(): bool
    {
        $proyecto = $this->proyecto();

        return $proyecto instanceof Proyecto
            ? Gate::allows('update', $proyecto)
            : Gate::allows('create', Proyecto::class);
    }

    protected function prepareForValidation(): void
    {
        $this->normalizarOpcionales([
            'responsable_id', 'area_id', 'programa_id', 'linea_accion_id',
            'tipo_proyecto_id', 'fecha_inicio', 'fecha_fin',
        ]);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'responsable_id' => ['nullable', 'integer', Rule::exists('users', 'id')],
            'area_id' => ['nullable', 'integer', Rule::exists('areas', 'id')],
            'programa_id' => ['nullable', 'integer', Rule::exists('programas', 'id')],
            'linea_accion_id' => ['nullable', 'integer', Rule::exists('lineas_accion', 'id')],
            'tipo_proyecto_id' => ['nullable', 'integer', Rule::exists('tipos_proyecto', 'id')],
            'justificacion' => ['nullable', 'string', 'max:5000'],
            'objetivo_general' => ['required', 'string', 'max:2000'],
            'fecha_inicio' => ['nullable', 'date'],
            'fecha_fin' => ['nullable', 'date', 'after_or_equal:fecha_inicio'],
        ];
    }

    public function proyecto(): ?Proyecto
    {
        $proyecto = $this->route('proyecto');

        if ($proyecto === null) {
            return null;
        }

        return $proyecto instanceof Proyecto
            ? $proyecto
            : Proyecto::query()->findOrFail((int) $proyecto);
    }
}
