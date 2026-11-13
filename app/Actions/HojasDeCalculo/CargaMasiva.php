<?php

namespace App\Actions\HojasDeCalculo;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * Carga masiva desde una hoja de cálculo, en dos pasos: primero se revisa el
 * archivo y se muestra fila por fila qué entra y qué no, y solo cuando el
 * usuario acepta se guarda.
 *
 * Entre los dos pasos las filas válidas quedan en caché con un token, para no
 * pedir que suba el archivo otra vez. El token pertenece a quien lo generó.
 *
 * Las subclases describen las columnas, los catálogos y cómo se guarda cada
 * fila; aquí vive todo lo demás: la plantilla, la lectura, la validación y el
 * resumen.
 *
 * @phpstan-type ColumnaCarga array{
 *     titulo: string,
 *     clave: string,
 *     ancho?: int,
 *     lista?: string,
 *     ejemplo?: string,
 *     requerida?: bool,
 * }
 * @phpstan-type FilaRevisada array{
 *     numero: int,
 *     valores: array<int, string>,
 *     errores: array<int, string>,
 * }
 * @phpstan-type FilaNormalizada array{
 *     datos: array<string, mixed>,
 *     errores: array<string, string>,
 * }
 */
abstract class CargaMasiva
{
    /**
     * Tiempo que el archivo revisado espera la confirmación del usuario.
     */
    private const MINUTOS_EN_CACHE = 30;

    public function __construct(protected LeerHoja $lector, protected EscribirLibro $escritor) {}

    /**
     * Columnas de la plantilla, en el orden en que aparecen.
     *
     * @return array<int, ColumnaCarga>
     */
    abstract public function columnas(): array;

    /**
     * Catálogos que alimentan las listas desplegables: nombre de la lista =>
     * valores permitidos.
     *
     * @return array<string, array<int, string>>
     */
    abstract public function listas(User $usuario): array;

    /**
     * Notas que se escriben en la hoja «Instrucciones» del libro.
     *
     * @return array<int, string>
     */
    abstract public function instrucciones(): array;

    /**
     * Nombre de la hoja de datos y del archivo que se descarga.
     */
    abstract public function nombre(): string;

    /**
     * Convierte una fila del archivo en datos listos para validar. Los errores
     * que devuelve son los que la validación no puede ver, como un nombre de
     * catálogo que no existe.
     *
     * Van indexados por el campo al que corresponden, para que la validación
     * no vuelva a quejarse de lo mismo con otras palabras.
     *
     * @param  array<string, string>  $fila  valores indexados por la clave de la columna
     * @return FilaNormalizada
     */
    abstract protected function normalizar(array $fila, User $usuario): array;

    /**
     * Cómo se nombra cada campo en los mensajes de validación: el título de su
     * columna, no el nombre técnico.
     *
     * @return array<string, string>
     */
    protected function atributos(): array
    {
        return [];
    }

    /**
     * @return array<string, mixed>
     */
    abstract protected function reglas(User $usuario): array;

    /**
     * @param  array<string, mixed>  $datos
     */
    abstract protected function guardar(array $datos, User $usuario): void;

    /**
     * Errores que solo se ven comparando la fila con las anteriores del mismo
     * archivo, como un documento repetido o dos actividades que piden el mismo
     * espacio a la misma hora. La validación por fila no puede detectarlos
     * porque esos registros todavía no existen en la base.
     *
     * @param  array<string, mixed>  $datos
     * @param  array<int, array<string, mixed>>  $anteriores  filas válidas que ya se revisaron
     * @return array<int, string>
     */
    protected function erroresAdicionales(array $datos, array $anteriores, User $usuario): array
    {
        return [];
    }

    /**
     * Plantilla de Excel con los encabezados, las listas desplegables y una
     * fila de ejemplo.
     */
    public function plantilla(User $usuario): string
    {
        $columnas = $this->columnas();
        $listas = $this->listas($usuario);

        $validaciones = [];

        foreach (array_values($columnas) as $posicion => $columna) {
            if (isset($columna['lista'])) {
                $validaciones[EscribirLibro::columna($posicion + 1)] = $columna['lista'];
            }
        }

        $hojas = [
            [
                'nombre' => $this->nombre(),
                'filas' => [
                    array_map(fn (array $columna): string => $this->titulo($columna), $columnas),
                    array_map(fn (array $columna): string => $columna['ejemplo'] ?? '', $columnas),
                ],
                'anchos' => array_map(fn (array $columna): int => $columna['ancho'] ?? 22, $columnas),
                'validaciones' => $validaciones,
                'filasValidadas' => LeerHoja::MAXIMO_FILAS + 1,
            ],
            [
                'nombre' => 'Instrucciones',
                'encabezado' => false,
                'anchos' => [100],
                'filas' => array_map(
                    fn (string $linea): array => [$linea],
                    [...$this->instrucciones(), '', 'Las columnas marcadas con * son obligatorias.'],
                ),
            ],
            [
                'nombre' => 'Listas',
                'filas' => $this->filasDeListas($listas),
                'anchos' => array_fill(0, max(count($listas), 1), 32),
            ],
        ];

        return $this->escritor->generar($hojas, $this->nombresDefinidos($listas));
    }

    /**
     * La misma plantilla en CSV, para quien prefiera llenarla en un editor de
     * texto o generarla desde otro sistema. Sin listas desplegables: el valor
     * se escribe tal como aparece en el catálogo.
     */
    public function plantillaCsv(): string
    {
        $columnas = $this->columnas();

        $lineas = [
            $this->aCsv(array_map(fn (array $columna): string => $this->titulo($columna), $columnas)),
            $this->aCsv(array_map(fn (array $columna): string => $columna['ejemplo'] ?? '', $columnas)),
        ];

        // El BOM hace que Excel abra el archivo en UTF-8 y no rompa las tildes.
        return "\u{FEFF}".implode("\r\n", $lineas)."\r\n";
    }

    /**
     * Revisa el archivo y devuelve el detalle fila por fila, sin guardar nada.
     *
     * @return array{
     *     columnas: array<int, string>,
     *     filas: array<int, FilaRevisada>,
     *     resumen: array{total: int, validas: int, conError: int},
     *     token: string|null,
     * }
     */
    public function previsualizar(UploadedFile $archivo, User $usuario): array
    {
        $filas = $this->lector->filas($archivo);
        $columnas = $this->columnas();

        if (count($filas) < 2) {
            throw ValidationException::withMessages([
                'archivo' => 'El archivo no tiene filas de datos. Use la plantilla y llénela a partir de la segunda fila.',
            ]);
        }

        array_shift($filas);

        $revisadas = [];
        $validas = [];

        foreach ($filas as $indice => $fila) {
            if (implode('', $fila) === '') {
                continue;
            }

            $asociada = [];

            foreach (array_values($columnas) as $posicion => $columna) {
                $asociada[$columna['clave']] = trim($fila[$posicion] ?? '');
            }

            ['datos' => $datos, 'errores' => $propios] = $this->normalizar($asociada, $usuario);

            // De la validación se descarta lo que ya quedó explicado arriba:
            // «El campo fecha es obligatorio» no agrega nada cuando el error
            // dice que «el jueves» no es una fecha.
            $deLaValidacion = collect(
                Validator::make($datos, $this->reglas($usuario), [], $this->atributos())
                    ->errors()
                    ->messages()
            )
                ->except(array_keys($propios))
                ->flatten()
                ->all();

            $errores = [
                ...array_values($propios),
                ...$deLaValidacion,
                ...$this->erroresAdicionales($datos, $validas, $usuario),
            ];

            // La primera fila de datos es la 2 del archivo, porque la 1 son los
            // encabezados.
            $revisadas[] = [
                'numero' => $indice + 2,
                'valores' => array_values($asociada),
                'errores' => $errores,
            ];

            if ($errores === []) {
                $validas[] = $datos;
            }
        }

        return [
            'columnas' => array_map(fn (array $columna): string => $this->titulo($columna), $columnas),
            'filas' => $revisadas,
            'resumen' => [
                'total' => count($revisadas),
                'validas' => count($validas),
                'conError' => count($revisadas) - count($validas),
            ],
            'token' => $validas === [] ? null : $this->guardarEnCache($validas, $usuario),
        ];
    }

    /**
     * Guarda las filas válidas que se revisaron con ese token.
     *
     * @return int cuántos registros se crearon
     */
    public function confirmar(string $token, User $usuario): int
    {
        $filas = Cache::pull($this->llave($token, $usuario));

        if (! is_array($filas) || $filas === []) {
            throw ValidationException::withMessages([
                'archivo' => 'La revisión del archivo ya expiró. Vuelva a subirlo para confirmar la carga.',
            ]);
        }

        return DB::transaction(function () use ($filas, $usuario): int {
            foreach ($filas as $datos) {
                $this->guardar($datos, $usuario);
            }

            return count($filas);
        });
    }

    /**
     * Busca un valor en un catálogo por su nombre, sin distinguir mayúsculas
     * ni tildes: el nombre viene escrito a mano con frecuencia.
     *
     * @template TValor
     *
     * @param  array<string, TValor>  $catalogo  nombre => valor
     * @return TValor|null
     */
    protected function coincidencia(string $valor, array $catalogo): mixed
    {
        $buscado = $this->comparable($valor);

        foreach ($catalogo as $nombre => $encontrado) {
            if ($this->comparable((string) $nombre) === $buscado) {
                return $encontrado;
            }
        }

        return null;
    }

    /**
     * @param  array<string, int>  $catalogo  nombre => identificador
     */
    protected function enCatalogo(string $valor, array $catalogo): ?int
    {
        return $this->coincidencia($valor, $catalogo);
    }

    /**
     * Acepta la fecha como la escribe la gente en Guatemala (dd-mm-yyyy o
     * dd/mm/yyyy), en formato ISO, y también como el número de serie que usa
     * Excel cuando la celda tiene formato de fecha.
     */
    protected function comoFecha(string $valor): ?string
    {
        $valor = trim($valor);

        if ($valor === '') {
            return null;
        }

        if (preg_match('/^\d{5}(\.\d+)?$/', $valor) === 1) {
            // El día 1 de Excel es el 1 de enero de 1900, con el error
            // histórico de 1900 como año bisiesto: de ahí los dos días.
            return Carbon::create(1899, 12, 30)->addDays((int) (float) $valor)->toDateString();
        }

        foreach (['d-m-Y', 'd/m/Y', 'Y-m-d', 'd-m-y', 'd/m/y'] as $formato) {
            try {
                $fecha = Carbon::createFromFormat($formato.'|', $valor);
            } catch (\Exception) {
                continue;
            }

            // PHP no falla ante un día que no existe: «32-12-2026» se
            // convierte solo en el 1 de enero. Se descarta para que la
            // revisión previa lo marque en vez de guardar otra fecha.
            $avisos = Carbon::getLastErrors();

            if (is_array($avisos) && $avisos['warning_count'] > 0) {
                continue;
            }

            return $fecha->toDateString();
        }

        return null;
    }

    /**
     * Acepta la hora como texto (9:00, 09:00, 09:00:00) y como la fracción de
     * día que guarda Excel (0.375 son las 09:00).
     */
    protected function comoHora(string $valor): ?string
    {
        $valor = trim($valor);

        if ($valor === '') {
            return null;
        }

        if (preg_match('/^0?\.\d+$/', $valor) === 1) {
            $minutos = (int) round((float) $valor * 24 * 60);

            return sprintf('%02d:%02d', intdiv($minutos, 60) % 24, $minutos % 60);
        }

        if (preg_match('/^(\d{1,2}):(\d{2})(?::\d{2})?$/', $valor, $partes) === 1) {
            return sprintf('%02d:%02d', (int) $partes[1], (int) $partes[2]);
        }

        return null;
    }

    protected function comoBooleano(string $valor): bool
    {
        return in_array($this->comparable($valor), ['si', 'sí', 'x', '1', 'true', 'verdadero'], true);
    }

    private function comparable(string $valor): string
    {
        return mb_strtolower(trim(Str::ascii($valor)));
    }

    /**
     * @param  ColumnaCarga  $columna
     */
    private function titulo(array $columna): string
    {
        return ($columna['requerida'] ?? false)
            ? $columna['titulo'].' *'
            : $columna['titulo'];
    }

    /**
     * Las listas se escriben una por columna en la hoja «Listas», con su
     * nombre como encabezado.
     *
     * @param  array<string, array<int, string>>  $listas
     * @return array<int, array<int, string>>
     */
    private function filasDeListas(array $listas): array
    {
        $nombres = array_keys($listas);
        $alto = max(array_map(intval(...), array_map('count', $listas)) ?: [0]);

        $filas = [$nombres];

        for ($fila = 0; $fila < $alto; $fila++) {
            $filas[] = array_map(
                fn (string $nombre): string => $listas[$nombre][$fila] ?? '',
                $nombres,
            );
        }

        return $filas;
    }

    /**
     * @param  array<string, array<int, string>>  $listas
     * @return array<string, string>
     */
    private function nombresDefinidos(array $listas): array
    {
        $nombres = [];

        foreach (array_keys($listas) as $posicion => $nombre) {
            $columna = EscribirLibro::columna($posicion + 1);
            $alto = max(count($listas[$nombre]) + 1, 2);
            $nombres[$nombre] = "Listas!\${$columna}\$2:\${$columna}\${$alto}";
        }

        return $nombres;
    }

    /**
     * @param  array<int, array<string, mixed>>  $filas
     */
    private function guardarEnCache(array $filas, User $usuario): string
    {
        $token = (string) Str::uuid();

        Cache::put($this->llave($token, $usuario), $filas, now()->addMinutes(self::MINUTOS_EN_CACHE));

        return $token;
    }

    private function llave(string $token, User $usuario): string
    {
        return 'carga-masiva:'.static::class.':'.$usuario->id.':'.$token;
    }

    /**
     * @param  array<int, string>  $valores
     */
    private function aCsv(array $valores): string
    {
        return implode(',', array_map(
            fn (string $valor): string => '"'.str_replace('"', '""', $valor).'"',
            $valores,
        ));
    }
}
