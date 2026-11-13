<?php

namespace App\Http\Requests\Catalogos;

use App\Concerns\NormalizaCamposOpcionales;
use App\Enums\Catalogo;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CatalogoRequest extends FormRequest
{
    use NormalizaCamposOpcionales;

    public function authorize(): bool
    {
        $registro = $this->registro();

        return $registro instanceof Model
            ? Gate::allows('update', $registro)
            : Gate::allows('create', $this->catalogo()->modelo());
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['activo' => $this->boolean('activo')]);

        $this->normalizarOpcionales(['area_id']);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->catalogo()->reglas($this->registro(), $this->all());
    }

    public function catalogo(): Catalogo
    {
        $catalogo = $this->route('catalogo');

        return $catalogo instanceof Catalogo ? $catalogo : Catalogo::from((string) $catalogo);
    }

    /**
     * Registro que se está editando, si la ruta lo trae.
     */
    public function registro(): ?Model
    {
        $id = $this->route('registro');

        if ($id === null) {
            return null;
        }

        /** @var class-string<Model> $modelo */
        $modelo = $this->catalogo()->modelo();

        return $modelo::query()->findOrFail((int) $id);
    }

    /**
     * @return array<string, mixed>
     */
    public function datos(): array
    {
        $datos = $this->validated();
        $datos['activo'] = $this->boolean('activo');

        return $datos;
    }
}
