<?php

namespace App\Http\Requests\Proyectos;

use App\Models\Proyecto;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/**
 * Cierre del proyecto (RF-2.08): no se cierra sin resultados.
 */
class CierreProyectoRequest extends FormRequest
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
            'resultados' => ['required', 'string', 'max:5000'],
            'productos' => ['nullable', 'string', 'max:5000'],
            'lecciones_aprendidas' => ['nullable', 'string', 'max:5000'],

            'indicadores' => ['array'],
            'indicadores.*.indicador_id' => ['required', 'integer', Rule::exists('indicadores', 'id')],
            'indicadores.*.valor_final' => ['nullable', 'numeric', 'min:0'],

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
