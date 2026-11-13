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

class StoreUserRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    public function authorize(): bool
    {
        return Gate::allows('create', User::class);
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
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users', 'email')],
            'unidad_id' => ['nullable', 'integer', Rule::exists('unidades', 'id')],
            'activo' => ['boolean'],
            'roles' => ['array'],
            'roles.*' => [Rule::enum(Rol::class)],
        ];
    }
}
