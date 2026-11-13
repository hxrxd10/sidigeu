<?php

namespace App\Actions\RecursoHumano;

use App\Actions\HojasDeCalculo\CargaMasiva;
use App\Actions\HojasDeCalculo\EscribirLibro;
use App\Actions\HojasDeCalculo\LeerHoja;
use App\Enums\TipoPersona;
use App\Models\Agrupacion;
use App\Models\Disciplina;
use App\Models\Pais;
use App\Models\User;
use Illuminate\Validation\Rule;

/**
 * Carga masiva del padrón de artistas y deportistas (RF-4.01).
 *
 * Pensada para el arranque del sistema, cuando el padrón ya existe en una hoja
 * de cálculo y capturarlo uno por uno no es viable. Los datos y las reglas son
 * los mismos del formulario individual: documento obligatorio, DPI para las
 * personas guatemaltecas y disciplina del tipo que corresponde.
 *
 * La fotografía y la biografía larga no se cargan aquí; se agregan después en
 * la ficha de cada persona.
 */
class CargaMasivaDelPadron extends CargaMasiva
{
    public function __construct(
        LeerHoja $lector,
        EscribirLibro $escritor,
        private RegistrarPersona $registrar,
    ) {
        parent::__construct($lector, $escritor);
    }

    public function nombre(): string
    {
        return 'Padrón';
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function columnas(): array
    {
        return [
            ['titulo' => 'Tipo', 'clave' => 'tipo', 'lista' => 'Tipos', 'requerida' => true, 'ancho' => 14, 'ejemplo' => 'Artista'],
            ['titulo' => 'Nombres', 'clave' => 'nombres', 'requerida' => true, 'ancho' => 26, 'ejemplo' => 'María José'],
            ['titulo' => 'Apellidos', 'clave' => 'apellidos', 'requerida' => true, 'ancho' => 26, 'ejemplo' => 'Ramírez López'],
            ['titulo' => 'Disciplina', 'clave' => 'disciplina', 'lista' => 'Disciplinas', 'requerida' => true, 'ancho' => 28, 'ejemplo' => ''],
            ['titulo' => 'Agrupación', 'clave' => 'agrupacion', 'lista' => 'Agrupaciones', 'ancho' => 28, 'ejemplo' => ''],
            ['titulo' => 'País', 'clave' => 'pais', 'lista' => 'Paises', 'requerida' => true, 'ancho' => 20, 'ejemplo' => 'Guatemala'],
            ['titulo' => 'Fecha de nacimiento', 'clave' => 'fecha_nacimiento', 'requerida' => true, 'ancho' => 20, 'ejemplo' => '14-05-2001'],
            ['titulo' => 'DPI', 'clave' => 'dpi', 'ancho' => 18, 'ejemplo' => '1234567890101'],
            ['titulo' => 'Pasaporte', 'clave' => 'pasaporte', 'ancho' => 18, 'ejemplo' => ''],
            ['titulo' => 'Fecha de alta', 'clave' => 'fecha_alta', 'requerida' => true, 'ancho' => 16, 'ejemplo' => '01-02-2026'],
        ];
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function listas(User $usuario): array
    {
        return [
            'Tipos' => array_map(
                fn (TipoPersona $tipo): string => $tipo->nombre(),
                TipoPersona::cases(),
            ),
            'Disciplinas' => Disciplina::query()->activos()->orderBy('nombre')->pluck('nombre')->all(),
            'Agrupaciones' => Agrupacion::query()->activos()->orderBy('nombre')->pluck('nombre')->all(),
            'Paises' => Pais::query()->activos()->orderBy('nombre')->pluck('nombre')->all(),
        ];
    }

    /**
     * @return array<int, string>
     */
    public function instrucciones(): array
    {
        return [
            'Carga masiva del padrón de artistas y deportistas',
            '',
            'Llene una fila por persona a partir de la fila 2 de la hoja «Padrón». La fila de ejemplo puede sobrescribirse.',
            'Las columnas Tipo, Disciplina, Agrupación y País tienen lista desplegable: elija el valor, no lo escriba.',
            'Las fechas van como dd-mm-aaaa. Si la celda tiene formato de fecha de Excel, también se entiende.',
            'Toda persona necesita DPI o pasaporte. Para las personas guatemaltecas el DPI es obligatorio y lleva 13 dígitos.',
            'La disciplina debe corresponder al tipo: una disciplina artística para un artista y una deportiva para un deportista.',
            'La fotografía y la biografía no se cargan aquí: se agregan después en la ficha de cada persona.',
            'Al subir el archivo se muestra fila por fila qué entra y qué no. Nada se guarda hasta que usted confirme.',
        ];
    }

    /**
     * @param  array<string, string>  $fila
     * @return array{datos: array<string, mixed>, errores: array<string, string>}
     */
    protected function normalizar(array $fila, User $usuario): array
    {
        $errores = [];

        $tipo = $this->coincidencia($fila['tipo'], $this->tiposPorNombre());

        if (! $tipo instanceof TipoPersona) {
            $errores['tipo'] = $fila['tipo'] === ''
                ? 'Tipo: indique si es Artista o Deportista.'
                : 'Tipo: «'.$fila['tipo'].'» no es Artista ni Deportista.';
        }

        $disciplinaId = $this->enCatalogo(
            $fila['disciplina'],
            Disciplina::query()->pluck('id', 'nombre')->all(),
        );

        if ($disciplinaId === null) {
            $errores['disciplina_id'] = $fila['disciplina'] === ''
                ? 'Disciplina: indique la disciplina.'
                : 'Disciplina: «'.$fila['disciplina'].'» no está en el catálogo.';
        }

        $paisId = $this->enCatalogo($fila['pais'], Pais::query()->pluck('id', 'nombre')->all());

        if ($paisId === null) {
            $errores['pais_id'] = $fila['pais'] === ''
                ? 'País: indique el país.'
                : 'País: «'.$fila['pais'].'» no está en el catálogo.';
        }

        $agrupacionId = null;

        if ($fila['agrupacion'] !== '') {
            $agrupacionId = $this->enCatalogo(
                $fila['agrupacion'],
                Agrupacion::query()->pluck('id', 'nombre')->all(),
            );

            if ($agrupacionId === null) {
                $errores['agrupacion_id'] = 'Agrupación: «'.$fila['agrupacion'].'» no está en el catálogo.';
            }
        }

        $nacimiento = $this->comoFecha($fila['fecha_nacimiento']);
        $alta = $this->comoFecha($fila['fecha_alta']);

        if ($fila['fecha_nacimiento'] !== '' && $nacimiento === null) {
            $errores['fecha_nacimiento'] = 'Fecha de nacimiento: «'.$fila['fecha_nacimiento']
                .'» no es una fecha válida (use dd-mm-aaaa).';
        }

        if ($fila['fecha_alta'] !== '' && $alta === null) {
            $errores['fecha_alta'] = 'Fecha de alta: «'.$fila['fecha_alta']
                .'» no es una fecha válida (use dd-mm-aaaa).';
        }

        $dpi = trim($fila['dpi']);
        $pasaporte = trim($fila['pasaporte']);

        if ($dpi === '' && $pasaporte === '') {
            $errores['documento'] = 'Documento: registre el DPI o el pasaporte.';
        }

        if ($dpi === '' && $paisId !== null && $this->esGuatemala($paisId)) {
            $errores['dpi'] = 'DPI: es obligatorio para las personas guatemaltecas.';
        }

        if ($tipo instanceof TipoPersona && $disciplinaId !== null && ! $this->disciplinaCorresponde($disciplinaId, $tipo)) {
            $errores['disciplina_id'] = 'Disciplina: «'.$fila['disciplina'].'» no corresponde a un '
                .mb_strtolower($tipo->nombre()).'.';
        }

        return [
            'datos' => [
                'tipo' => $tipo?->value,
                'nombres' => $fila['nombres'],
                'apellidos' => $fila['apellidos'],
                'disciplina_id' => $disciplinaId,
                'agrupacion_id' => $agrupacionId,
                'pais_id' => $paisId,
                'fecha_nacimiento' => $nacimiento,
                'dpi' => $dpi === '' ? null : $dpi,
                'pasaporte' => $pasaporte === '' ? null : $pasaporte,
                'fecha_alta' => $alta,
            ],
            'errores' => $errores,
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function atributos(): array
    {
        return [
            'tipo' => 'tipo',
            'nombres' => 'nombres',
            'apellidos' => 'apellidos',
            'disciplina_id' => 'disciplina',
            'agrupacion_id' => 'agrupación',
            'pais_id' => 'país',
            'fecha_nacimiento' => 'fecha de nacimiento',
            'dpi' => 'DPI',
            'pasaporte' => 'pasaporte',
            'fecha_alta' => 'fecha de alta',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function reglas(User $usuario): array
    {
        return [
            'tipo' => ['required', Rule::enum(TipoPersona::class)],
            'nombres' => ['required', 'string', 'max:255'],
            'apellidos' => ['required', 'string', 'max:255'],
            'disciplina_id' => ['required', 'integer'],
            'pais_id' => ['required', 'integer'],
            'fecha_nacimiento' => ['required', 'date', 'before:today'],
            'dpi' => ['nullable', 'digits:13', Rule::unique('personas_recurso_humano', 'dpi')],
            'pasaporte' => ['nullable', 'string', 'max:20'],
            'fecha_alta' => ['required', 'date', 'after_or_equal:fecha_nacimiento', 'before_or_equal:today'],
        ];
    }

    /**
     * Un documento repetido dentro del mismo archivo: la validación por fila no
     * lo ve porque todavía no existe en la base.
     *
     * @param  array<string, mixed>  $datos
     * @param  array<int, array<string, mixed>>  $anteriores
     * @return array<int, string>
     */
    protected function erroresAdicionales(array $datos, array $anteriores, User $usuario): array
    {
        $errores = [];

        foreach (['dpi' => 'DPI', 'pasaporte' => 'Pasaporte'] as $campo => $etiqueta) {
            if ($datos[$campo] === null) {
                continue;
            }

            $repetido = collect($anteriores)->contains(
                fn (array $fila): bool => $fila[$campo] === $datos[$campo]
            );

            if ($repetido) {
                $errores[] = $etiqueta.': «'.$datos[$campo].'» ya viene en otra fila de este archivo.';
            }
        }

        return $errores;
    }

    /**
     * @param  array<string, mixed>  $datos
     */
    protected function guardar(array $datos, User $usuario): void
    {
        $this->registrar->handle($datos);
    }

    /**
     * Se acepta el nombre que ve el usuario («Artista») y también el valor que
     * se guarda («artista»), por si el archivo viene de otro sistema.
     *
     * @return array<string, TipoPersona>
     */
    private function tiposPorNombre(): array
    {
        $tipos = [];

        foreach (TipoPersona::cases() as $caso) {
            $tipos[$caso->nombre()] = $caso;
            $tipos[$caso->value] = $caso;
        }

        return $tipos;
    }

    private function esGuatemala(int $paisId): bool
    {
        return Pais::query()->whereKey($paisId)->where('codigo', 'GT')->exists();
    }

    private function disciplinaCorresponde(int $disciplinaId, TipoPersona $tipo): bool
    {
        return Disciplina::query()->whereKey($disciplinaId)->where('tipo', $tipo)->exists();
    }
}
