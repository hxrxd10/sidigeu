<?php

namespace App\Concerns;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Los selectores de la interfaz envían un valor centinela cuando no se eligió
 * nada ("sin-unidad", "sin-agrupacion", ...). Aquí se convierten a null para
 * que las reglas `nullable` funcionen como se espera.
 *
 * @phpstan-require-extends FormRequest
 */
trait NormalizaCamposOpcionales
{
    /**
     * @param  array<int, string>  $campos
     */
    protected function normalizarOpcionales(array $campos): void
    {
        foreach ($campos as $campo) {
            $valor = $this->input($campo);

            if ($valor === '' || (is_string($valor) && str_starts_with($valor, 'sin-'))) {
                $this->merge([$campo => null]);
            }
        }
    }
}
