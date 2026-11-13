<?php

namespace App\Actions\HojasDeCalculo;

use DOMDocument;
use DOMElement;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;
use ZipArchive;

/**
 * Lee la primera hoja de un archivo de Excel (.xlsx) o un CSV y la devuelve
 * como una matriz de textos, sin depender de paquetes externos.
 *
 * Es la contraparte de `EscribirLibro`: el usuario descarga la plantilla, la
 * llena en Excel, Google Sheets o LibreOffice y la vuelve a subir. Todo se
 * entrega como texto; interpretar cada columna es trabajo de quien importa.
 */
class LeerHoja
{
    /**
     * Tope de filas de datos que se procesan de un archivo.
     */
    public const MAXIMO_FILAS = 1000;

    /**
     * @return array<int, array<int, string>>
     */
    public function filas(UploadedFile $archivo): array
    {
        $ruta = $archivo->getRealPath();

        if ($ruta === false) {
            throw ValidationException::withMessages([
                'archivo' => 'No se pudo leer el archivo que subió. Intente de nuevo.',
            ]);
        }

        $filas = $this->esLibroDeExcel($ruta)
            ? $this->desdeExcel($ruta)
            : $this->desdeCsv($ruta);

        return array_slice($this->sinFilasVacias($filas), 0, self::MAXIMO_FILAS + 1);
    }

    /**
     * Un .xlsx es un ZIP, y todo ZIP empieza con la firma «PK».
     */
    private function esLibroDeExcel(string $ruta): bool
    {
        $manejador = fopen($ruta, 'rb');

        if ($manejador === false) {
            return false;
        }

        $firma = fread($manejador, 2);
        fclose($manejador);

        return $firma === 'PK';
    }

    /**
     * @return array<int, array<int, string>>
     */
    private function desdeCsv(string $ruta): array
    {
        $manejador = fopen($ruta, 'rb');

        if ($manejador === false) {
            return [];
        }

        $primera = true;
        $separador = ',';
        $filas = [];

        while (($linea = fgets($manejador)) !== false) {
            if ($primera) {
                // Excel en español guarda el CSV con punto y coma.
                $linea = preg_replace('/^\xEF\xBB\xBF/', '', $linea) ?? $linea;
                $separador = substr_count($linea, ';') > substr_count($linea, ',') ? ';' : ',';
                $primera = false;
            }

            $campos = str_getcsv(rtrim($linea, "\r\n"), $separador, '"', '\\');
            $filas[] = array_map(fn (?string $campo): string => trim((string) $campo), $campos);
        }

        fclose($manejador);

        return $filas;
    }

    /**
     * @return array<int, array<int, string>>
     */
    private function desdeExcel(string $ruta): array
    {
        $zip = new ZipArchive;

        if ($zip->open($ruta) !== true) {
            throw ValidationException::withMessages([
                'archivo' => 'El archivo de Excel está dañado o no se pudo abrir.',
            ]);
        }

        $textos = $this->textosCompartidos($zip);
        $hoja = $zip->getFromName($this->rutaDeLaPrimeraHoja($zip));

        $zip->close();

        if ($hoja === false) {
            throw ValidationException::withMessages([
                'archivo' => 'El libro no tiene ninguna hoja que se pueda leer.',
            ]);
        }

        return $this->filasDeLaHoja($hoja, $textos);
    }

    /**
     * La primera hoja del libro no siempre es `sheet1.xml`, así que se resuelve
     * por el orden declarado en el libro y su archivo de relaciones.
     */
    private function rutaDeLaPrimeraHoja(ZipArchive $zip): string
    {
        $libro = $zip->getFromName('xl/workbook.xml');
        $relaciones = $zip->getFromName('xl/_rels/workbook.xml.rels');

        if ($libro === false || $relaciones === false) {
            return 'xl/worksheets/sheet1.xml';
        }

        $hojas = $this->elementos($libro, 'sheet');
        $identificador = $hojas === [] ? null : $hojas[0]->getAttributeNS(
            'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
            'id',
        );

        if ($identificador === null || $identificador === '') {
            return 'xl/worksheets/sheet1.xml';
        }

        foreach ($this->elementos($relaciones, 'Relationship') as $relacion) {
            if ($relacion->getAttribute('Id') === $identificador) {
                return 'xl/'.ltrim($relacion->getAttribute('Target'), '/');
            }
        }

        return 'xl/worksheets/sheet1.xml';
    }

    /**
     * @return array<int, string>
     */
    private function textosCompartidos(ZipArchive $zip): array
    {
        $contenido = $zip->getFromName('xl/sharedStrings.xml');

        if ($contenido === false) {
            return [];
        }

        return array_map(
            fn (DOMElement $elemento): string => $elemento->textContent,
            $this->elementos($contenido, 'si'),
        );
    }

    /**
     * @param  array<int, string>  $textos
     * @return array<int, array<int, string>>
     */
    private function filasDeLaHoja(string $contenido, array $textos): array
    {
        $filas = [];

        foreach ($this->elementos($contenido, 'row') as $fila) {
            $valores = [];

            foreach ($fila->getElementsByTagNameNS('*', 'c') as $celda) {
                $valores[$this->posicion($celda->getAttribute('r'))] = $this->valor($celda, $textos);
            }

            if ($valores === []) {
                $filas[] = [];

                continue;
            }

            $completa = [];

            for ($columna = 0; $columna <= max(array_keys($valores)); $columna++) {
                $completa[$columna] = $valores[$columna] ?? '';
            }

            $filas[] = $completa;
        }

        return $filas;
    }

    /**
     * @param  array<int, string>  $textos
     */
    private function valor(DOMElement $celda, array $textos): string
    {
        $tipo = $celda->getAttribute('t');

        if ($tipo === 'inlineStr') {
            return trim($celda->textContent);
        }

        $crudos = $celda->getElementsByTagNameNS('*', 'v');
        $crudo = $crudos->length === 0 ? '' : trim((string) $crudos->item(0)?->textContent);

        if ($tipo === 's') {
            return trim($textos[(int) $crudo] ?? '');
        }

        return $crudo;
    }

    /**
     * `C7` => 2. La posición se toma de la referencia porque Excel omite las
     * celdas vacías y, sin ella, los valores se correrían de columna.
     */
    private function posicion(string $referencia): int
    {
        $letras = preg_replace('/[^A-Z]/', '', mb_strtoupper($referencia)) ?? '';
        $posicion = 0;

        foreach (str_split($letras === '' ? 'A' : $letras) as $letra) {
            $posicion = $posicion * 26 + (ord($letra) - 64);
        }

        return $posicion - 1;
    }

    /**
     * @param  array<int, array<int, string>>  $filas
     * @return array<int, array<int, string>>
     */
    private function sinFilasVacias(array $filas): array
    {
        $ultima = -1;

        foreach ($filas as $indice => $fila) {
            if (implode('', $fila) !== '') {
                $ultima = $indice;
            }
        }

        return array_slice($filas, 0, $ultima + 1);
    }

    /**
     * @return array<int, DOMElement>
     */
    private function elementos(string $xml, string $etiqueta): array
    {
        $documento = new DOMDocument;
        $anterior = libxml_use_internal_errors(true);
        // El XML viene de un archivo que subió el usuario: sin entidades
        // externas ni red.
        $documento->loadXML($xml, LIBXML_NONET | LIBXML_NOENT);
        libxml_clear_errors();
        libxml_use_internal_errors($anterior);

        return iterator_to_array($documento->getElementsByTagNameNS('*', $etiqueta), false);
    }
}
