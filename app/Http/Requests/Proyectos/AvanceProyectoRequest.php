<?php

namespace App\Http\Requests\Proyectos;

use App\Enums\TipoRecurso;
use App\Models\Proyecto;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/**
 * Avance periódico del proyecto con sus evidencias y recursos (RF-2.05).
 */
class AvanceProyectoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('gestionarEjecucion', $this->proyecto());
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fecha' => ['required', 'date', 'before_or_equal:today'],
            'porcentaje' => ['required', 'integer', 'min:0', 'max:100'],
            'descripcion' => ['required', 'string', 'max:2000'],

            'tareas' => ['array'],
            'tareas.*.id' => ['required', 'integer', Rule::exists('proyecto_tareas', 'id')],
            'tareas.*.avance' => ['required', 'integer', 'min:0', 'max:100'],

            'renglones' => ['array'],
            'renglones.*.id' => ['required', 'integer', Rule::exists('proyecto_presupuestos', 'id')],
            'renglones.*.ejecutado' => ['required', 'numeric', 'min:0'],

            'recursos' => ['array'],
            'recursos.*.tipo' => ['required', Rule::enum(TipoRecurso::class)],
            'recursos.*.persona_recurso_humano_id' => [
                'nullable', 'integer', Rule::exists('personas_recurso_humano', 'id'),
            ],
            'recursos.*.descripcion' => ['nullable', 'string', 'max:255'],
            'recursos.*.cantidad' => ['nullable', 'numeric', 'min:0'],
            'recursos.*.costo' => ['nullable', 'numeric', 'min:0'],

            'archivos' => ['array', 'max:10'],
            'archivos.*' => ['file', 'mimes:jpg,jpeg,png,pdf,doc,docx,xls,xlsx', 'max:10240'],

            'enlaces' => ['array', 'max:10'],
            'enlaces.*.url' => ['nullable', 'url', 'max:500'],
            'enlaces.*.descripcion' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function datos(): array
    {
        return [
            ...$this->validated(),
            'archivos' => $this->file('archivos', []),
        ];
    }

    public function proyecto(): Proyecto
    {
        $proyecto = $this->route('proyecto');

        return $proyecto instanceof Proyecto
            ? $proyecto
            : Proyecto::query()->findOrFail((int) $proyecto);
    }
}
