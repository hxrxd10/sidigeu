<?php

namespace App\Http\Requests\Administracion;

use App\Concerns\NormalizaCamposOpcionales;
use App\Enums\Rol;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateUserRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    public function authorize(): bool
    {
        return Gate::allows('update', $this->usuario());
    }

    protected function prepareForValidation(): void
    {
        if (config('fortify.lowercase_usernames') && is_string($this->input('email'))) {
            $this->merge(['email' => Str::lower($this->input('email'))]);
        }

        // Las casillas HTML envían "on"; el validador espera un booleano.
        $this->merge(['activo' => $this->boolean('activo')]);

        $this->normalizarOpcionales(['unidad_id']);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 'string', 'lowercase', 'email', 'max:255',
                Rule::unique('users', 'email')->ignore($this->usuario()->id),
            ],
            'unidad_id' => ['nullable', 'integer', Rule::exists('unidades', 'id')],
            'activo' => ['boolean'],
            'roles' => ['array'],
            'roles.*' => [Rule::enum(Rol::class)],
        ];
    }

    /**
     * Un administrador no puede desactivarse ni quitarse el rol a sí mismo:
     * el sistema quedaría sin quien lo administre.
     *
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($this->user()->isNot($this->usuario())) {
                    return;
                }

                if (! $this->boolean('activo')) {
                    $validator->errors()->add('activo', 'No puede desactivar su propio usuario.');
                }

                $roles = array_map(strval(...), (array) $this->input('roles', []));

                if (! in_array(Rol::Administrador->value, $roles, true)) {
                    $validator->errors()->add('roles', 'No puede quitarse a sí mismo el rol de Administrador.');
                }
            },
        ];
    }

    public function usuario(): User
    {
        $usuario = $this->route('usuario');

        return $usuario instanceof User ? $usuario : User::query()->findOrFail((int) $usuario);
    }
}
