<?php

namespace App\Concerns;

use App\Enums\TipoPersona;
use App\Models\Disciplina;
use App\Models\Pais;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

/**
 * Reglas de los datos del recurso humano (sección 7 de los requerimientos).
 */
trait PersonaRecursoHumanoValidationRules
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    protected function personaRules(?int $personaId = null): array
    {
        return [
            'tipo' => ['required', Rule::enum(TipoPersona::class)],
            'disciplina_id' => ['required', 'integer', Rule::exists('disciplinas', 'id')],
            'agrupacion_id' => ['nullable', 'integer', Rule::exists('agrupaciones', 'id')],
            'nombres' => ['required', 'string', 'max:255'],
            'apellidos' => ['required', 'string', 'max:255'],
            'pais_id' => ['required', 'integer', Rule::exists('paises', 'id')],
            'fecha_nacimiento' => ['required', 'date', 'before:today'],
            'dpi' => [
                'nullable',
                'digits:13',
                Rule::unique('personas_recurso_humano', 'dpi')->ignore($personaId),
            ],
            'pasaporte' => [
                'nullable',
                'string',
                'max:20',
                Rule::unique('personas_recurso_humano', 'pasaporte')
                    ->where('pais_id', $this->input('pais_id'))
                    ->ignore($personaId),
            ],
            'foto' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'fecha_alta' => ['required', 'date', 'after_or_equal:fecha_nacimiento', 'before_or_equal:today'],
            'biografia' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /**
     * Validaciones que dependen de varios campos a la vez.
     *
     * @return array<int, callable>
     */
    protected function personaAfterRules(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $this->validarDocumento($validator);
                $this->validarDisciplina($validator);
            },
        ];
    }

    /**
     * RN-4.01 y RN-4.02: todo registro necesita documento, y el DPI es
     * obligatorio para las personas guatemaltecas.
     */
    private function validarDocumento(Validator $validator): void
    {
        $dpi = trim((string) $this->input('dpi'));
        $pasaporte = trim((string) $this->input('pasaporte'));

        if ($dpi === '' && $pasaporte === '') {
            $validator->errors()->add('dpi', 'Debe registrar al menos un documento: DPI o pasaporte.');

            return;
        }

        $esGuatemalteca = Pais::query()
            ->whereKey($this->input('pais_id'))
            ->where('codigo', 'GT')
            ->exists();

        if ($esGuatemalteca && $dpi === '') {
            $validator->errors()->add('dpi', 'El DPI es obligatorio para las personas guatemaltecas.');
        }
    }

    /**
     * La disciplina debe corresponder al tipo de persona.
     */
    private function validarDisciplina(Validator $validator): void
    {
        $disciplina = Disciplina::query()->find((int) $this->input('disciplina_id'));
        $tipo = TipoPersona::tryFrom((string) $this->input('tipo'));

        if ($disciplina && $tipo && $disciplina->tipo !== $tipo) {
            $validator->errors()->add(
                'disciplina_id',
                'La disciplina seleccionada no corresponde a un '.mb_strtolower($tipo->nombre()).'.'
            );
        }
    }
}
