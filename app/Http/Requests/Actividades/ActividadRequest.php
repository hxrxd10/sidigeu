<?php

namespace App\Http\Requests\Actividades;

use App\Concerns\NormalizaCamposOpcionales;
use App\Models\Actividad;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

/**
 * Datos de programación y clasificación de una actividad (RF-1.01).
 */
class ActividadRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    public function authorize(): bool
    {
        $actividad = $this->actividad();

        return $actividad instanceof Actividad
            ? Gate::allows('update', $actividad)
            : Gate::allows('create', Actividad::class);
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['publicar_agenda' => $this->boolean('publicar_agenda')]);
        $this->normalizarOpcionales(['espacio_id', 'lugar_externo', 'hora_inicio', 'hora_fin', 'descripcion', 'responsable_id']);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'hora_inicio' => ['nullable', 'date_format:H:i'],
            'hora_fin' => ['nullable', 'date_format:H:i', 'after:hora_inicio'],
            'espacio_id' => ['nullable', 'integer', Rule::exists('espacios', 'id')],
            'lugar_externo' => ['nullable', 'string', 'max:255'],
            'tipo_actividad_id' => ['required', 'integer', Rule::exists('tipos_actividad', 'id')],
            'linea_accion_id' => ['required', 'integer', Rule::exists('lineas_accion', 'id')],
            'responsable_id' => ['nullable', 'integer', Rule::exists('users', 'id')],
            'publicar_agenda' => ['boolean'],
            'descripcion' => ['nullable', 'string', 'max:2000'],
            'publicos' => ['array'],
            'publicos.*' => ['integer', Rule::exists('publicos_objetivo', 'id')],
            'indicadores' => ['array'],
            'indicadores.*.indicador_id' => ['required', 'integer', Rule::exists('indicadores', 'id')],
            'indicadores.*.valor_meta' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    /**
     * Toda actividad necesita un lugar: un espacio del catálogo o uno externo.
     * Si se elige un espacio, hacen falta las horas para reservarlo (RF-1.08).
     *
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $espacio = $this->input('espacio_id');
                $externo = trim((string) $this->input('lugar_externo'));

                if ($espacio === null && $externo === '') {
                    $validator->errors()->add('lugar_externo', 'Indique un espacio del catálogo o un lugar externo.');
                }

                if ($espacio !== null && ($this->input('hora_inicio') === null || $this->input('hora_fin') === null)) {
                    $validator->errors()->add('hora_inicio', 'Para reservar un espacio debe indicar la hora de inicio y de finalización.');
                }
            },
        ];
    }

    /**
     * Datos listos para guardar, con las horas en formato HH:MM:SS.
     *
     * @return array<string, mixed>
     */
    public function datos(): array
    {
        $datos = collect($this->validated())->except(['publicos', 'indicadores'])->all();

        foreach (['hora_inicio', 'hora_fin'] as $campo) {
            if (! empty($datos[$campo])) {
                $datos[$campo] = $datos[$campo].':00';
            }
        }

        return $datos;
    }

    /**
     * @return array<int, int>
     */
    public function publicos(): array
    {
        return array_map(intval(...), (array) $this->input('publicos', []));
    }

    /**
     * Indicadores con su meta ya normalizada: la casilla vacía equivale a no
     * asociar el indicador.
     *
     * @return array<int, array{indicador_id: int, valor_meta: float|null}>
     */
    public function indicadores(): array
    {
        return collect((array) $this->input('indicadores', []))
            ->map(fn (array $fila): array => [
                'indicador_id' => (int) ($fila['indicador_id'] ?? 0),
                'valor_meta' => ($fila['valor_meta'] ?? '') === ''
                    ? null
                    : (float) $fila['valor_meta'],
            ])
            ->values()
            ->all();
    }

    public function actividad(): ?Actividad
    {
        $actividad = $this->route('actividad');

        if ($actividad === null) {
            return null;
        }

        return $actividad instanceof Actividad
            ? $actividad
            : Actividad::query()->findOrFail((int) $actividad);
    }
}
