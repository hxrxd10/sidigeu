<?php

namespace App\Http\Requests\Espacios;

use App\Actions\Espacios\VerificarDisponibilidad;
use App\Concerns\NormalizaCamposOpcionales;
use App\Models\Espacio;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

/**
 * Formulario de solicitud de espacio, público o interno (RF-3.04).
 */
class SolicitudEspacioRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    /**
     * Cualquier persona puede solicitar un espacio, incluso sin cuenta.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->normalizarOpcionales(['institucion', 'telefono', 'asistentes', 'requerimientos']);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'espacio_id' => ['required', 'integer', 'exists:espacios,id'],
            'fecha' => ['required', 'date', 'after_or_equal:today'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'hora_fin' => ['required', 'date_format:H:i', 'after:hora_inicio'],
            'solicitante_nombre' => ['required', 'string', 'max:255'],
            'institucion' => ['nullable', 'string', 'max:255'],
            'correo' => ['required', 'email', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:30'],
            'proposito' => ['required', 'string', 'max:1000'],
            'asistentes' => ['nullable', 'integer', 'min:1', 'max:100000'],
            'requerimientos' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * El espacio debe admitir reservas y el horario debe estar libre (RF-3.06,
     * RF-3.12). El catálogo público no muestra disponibilidad, así que este es
     * el momento en que el solicitante se entera del choque.
     *
     * @return array<int, callable>
     */
    public function after(VerificarDisponibilidad $disponibilidad): array
    {
        return [
            function (Validator $validator) use ($disponibilidad): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $espacio = Espacio::query()->find((int) $this->input('espacio_id'));

                if (! $espacio instanceof Espacio || ! $espacio->estado->admiteReservas()) {
                    $validator->errors()->add('espacio_id', 'El espacio no está disponible para reservas.');

                    return;
                }

                $libre = $disponibilidad->estaLibre(
                    $espacio->id,
                    $this->string('fecha')->toString(),
                    $this->horaConSegundos('hora_inicio'),
                    $this->horaConSegundos('hora_fin'),
                );

                if (! $libre) {
                    $validator->errors()->add(
                        'hora_inicio',
                        'El espacio ya tiene una reserva aprobada que se cruza con ese horario.'
                    );
                }
            },
        ];
    }

    /**
     * Datos listos para guardar, con las horas normalizadas a HH:MM:SS.
     *
     * @return array<string, mixed>
     */
    public function datos(): array
    {
        return [
            ...$this->validated(),
            'hora_inicio' => $this->horaConSegundos('hora_inicio'),
            'hora_fin' => $this->horaConSegundos('hora_fin'),
        ];
    }

    private function horaConSegundos(string $campo): string
    {
        return $this->string($campo)->toString().':00';
    }
}
