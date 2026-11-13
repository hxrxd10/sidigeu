<?php

namespace App\Http\Requests\Actividades;

use App\Enums\RangoEdad;
use App\Enums\SexoBeneficiario;
use App\Models\Actividad;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/**
 * Cierre de la actividad: no se cierra sin al menos un resultado (RF-1.06).
 */
class CierreActividadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('gestionarEjecucion', $this->actividad());
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'resultados' => ['required', 'string', 'max:5000'],
            'observaciones' => ['nullable', 'string', 'max:2000'],

            'beneficiarios' => ['array'],
            'beneficiarios.*.sexo' => ['required', Rule::enum(SexoBeneficiario::class)],
            'beneficiarios.*.rango_edad' => ['required', Rule::enum(RangoEdad::class)],
            'beneficiarios.*.tipo_publico' => ['nullable', 'string', 'max:255'],
            'beneficiarios.*.cantidad' => ['required', 'integer', 'min:0', 'max:1000000'],

            'participantes' => ['array'],
            'participantes.*.persona_recurso_humano_id' => [
                'nullable', 'integer', Rule::exists('personas_recurso_humano', 'id'),
            ],
            'participantes.*.nombre_externo' => ['nullable', 'string', 'max:255'],
            'participantes.*.rol' => ['nullable', 'string', 'max:100'],

            'indicadores' => ['array'],
            'indicadores.*.indicador_id' => ['required', 'integer', Rule::exists('indicadores', 'id')],
            'indicadores.*.valor_alcanzado' => ['nullable', 'numeric', 'min:0'],

            'archivos' => ['array', 'max:10'],
            'archivos.*' => ['file', 'mimes:jpg,jpeg,png,pdf,doc,docx,xls,xlsx', 'max:10240'],

            'enlaces' => ['array', 'max:10'],
            'enlaces.*.url' => ['nullable', 'url', 'max:500'],
            'enlaces.*.descripcion' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function actividad(): Actividad
    {
        $actividad = $this->route('actividad');

        return $actividad instanceof Actividad
            ? $actividad
            : Actividad::query()->findOrFail((int) $actividad);
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
}
