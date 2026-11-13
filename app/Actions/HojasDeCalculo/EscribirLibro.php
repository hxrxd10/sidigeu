<?php

namespace App\Actions\HojasDeCalculo;

use RuntimeException;
use ZipArchive;

/**
 * Escribe un libro de Excel (.xlsx) sin depender de paquetes externos.
 *
 * Un .xlsx es un ZIP con varios XML, así que se arma a mano con `ZipArchive`.
 * Cubre lo que necesitan las plantillas de carga masiva: varias hojas, la fila
 * de encabezados en negrita, el ancho de las columnas y —lo importante— listas
 * desplegables en las columnas de catálogo, para que quien llena la plantilla
 * elija de una lista en vez de teclear el nombre.
 *
 * @phpstan-type Hoja array{
 *     nombre: string,
 *     filas: array<int, array<int, string>>,
 *     encabezado?: bool,
 *     anchos?: array<int, int>,
 *     validaciones?: array<string, string>,
 *     filasValidadas?: int,
 * }
 */
class EscribirLibro
{
    private const ESPACIO_XML = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';

    private const ESPACIO_RELACIONES = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

    /**
     * @param  array<int, Hoja>  $hojas
     * @param  array<string, string>  $nombresDefinidos  nombre => referencia, p. ej. `Unidades` => `Listas!$A$2:$A$40`
     */
    public function generar(array $hojas, array $nombresDefinidos = []): string
    {
        $archivo = tempnam(sys_get_temp_dir(), 'sigeu-xlsx-');

        if ($archivo === false) {
            throw new RuntimeException('No se pudo crear el archivo temporal del libro.');
        }

        $zip = new ZipArchive;

        if ($zip->open($archivo, ZipArchive::OVERWRITE | ZipArchive::CREATE) !== true) {
            throw new RuntimeException('No se pudo abrir el libro para escribirlo.');
        }

        $zip->addFromString('[Content_Types].xml', $this->tiposDeContenido(count($hojas)));
        $zip->addFromString('_rels/.rels', $this->relacionesRaiz());
        $zip->addFromString('xl/workbook.xml', $this->libro($hojas, $nombresDefinidos));
        $zip->addFromString('xl/_rels/workbook.xml.rels', $this->relacionesDelLibro(count($hojas)));
        $zip->addFromString('xl/styles.xml', $this->estilos());

        foreach (array_values($hojas) as $indice => $hoja) {
            $zip->addFromString('xl/worksheets/sheet'.($indice + 1).'.xml', $this->hoja($hoja));
        }

        $zip->close();

        $contenido = file_get_contents($archivo);
        unlink($archivo);

        if ($contenido === false) {
            throw new RuntimeException('No se pudo leer el libro generado.');
        }

        return $contenido;
    }

    /**
     * Letra de columna de Excel a partir de su posición: 1 => A, 27 => AA.
     */
    public static function columna(int $posicion): string
    {
        $letra = '';

        while ($posicion > 0) {
            $resto = ($posicion - 1) % 26;
            $letra = chr(65 + $resto).$letra;
            $posicion = (int) (($posicion - $resto - 1) / 26);
        }

        return $letra;
    }

    private function tiposDeContenido(int $hojas): string
    {
        $overrides = '';

        for ($indice = 1; $indice <= $hojas; $indice++) {
            $overrides .= '<Override PartName="/xl/worksheets/sheet'.$indice.'.xml" '
                .'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';
        }

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            .'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            .'<Default Extension="xml" ContentType="application/xml"/>'
            .'<Override PartName="/xl/workbook.xml" '
            .'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
            .$overrides
            .'<Override PartName="/xl/styles.xml" '
            .'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
            .'</Types>';
    }

    private function relacionesRaiz(): string
    {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            .'<Relationship Id="rId1" Type="'.self::ESPACIO_RELACIONES.'/officeDocument" Target="xl/workbook.xml"/>'
            .'</Relationships>';
    }

    /**
     * @param  array<int, Hoja>  $hojas
     * @param  array<string, string>  $nombresDefinidos
     */
    private function libro(array $hojas, array $nombresDefinidos): string
    {
        $referencias = '';

        foreach (array_values($hojas) as $indice => $hoja) {
            $referencias .= '<sheet name="'.$this->texto($hoja['nombre']).'" sheetId="'.($indice + 1).'" '
                .'r:id="rId'.($indice + 1).'"/>';
        }

        $nombres = '';

        foreach ($nombresDefinidos as $nombre => $referencia) {
            $nombres .= '<definedName name="'.$this->texto($nombre).'">'.$this->texto($referencia).'</definedName>';
        }

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<workbook xmlns="'.self::ESPACIO_XML.'" xmlns:r="'.self::ESPACIO_RELACIONES.'">'
            .'<sheets>'.$referencias.'</sheets>'
            .($nombres === '' ? '' : '<definedNames>'.$nombres.'</definedNames>')
            .'</workbook>';
    }

    private function relacionesDelLibro(int $hojas): string
    {
        $relaciones = '';

        for ($indice = 1; $indice <= $hojas; $indice++) {
            $relaciones .= '<Relationship Id="rId'.$indice.'" Type="'.self::ESPACIO_RELACIONES.'/worksheet" '
                .'Target="worksheets/sheet'.$indice.'.xml"/>';
        }

        $relaciones .= '<Relationship Id="rId'.($hojas + 1).'" Type="'.self::ESPACIO_RELACIONES.'/styles" '
            .'Target="styles.xml"/>';

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            .$relaciones
            .'</Relationships>';
    }

    /**
     * Dos estilos: el normal y el de la fila de encabezados, en negrita y con
     * fondo gris claro.
     */
    private function estilos(): string
    {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<styleSheet xmlns="'.self::ESPACIO_XML.'">'
            .'<fonts count="2">'
            .'<font><sz val="11"/><name val="Calibri"/></font>'
            .'<font><b/><sz val="11"/><name val="Calibri"/></font>'
            .'</fonts>'
            .'<fills count="3">'
            .'<fill><patternFill patternType="none"/></fill>'
            .'<fill><patternFill patternType="gray125"/></fill>'
            .'<fill><patternFill patternType="solid"><fgColor rgb="FFE6EFF7"/><bgColor indexed="64"/></patternFill></fill>'
            .'</fills>'
            .'<borders count="1"><border/></borders>'
            .'<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
            .'<cellXfs count="3">'
            .'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
            .'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>'
            .'<xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
            .'</cellXfs>'
            // Excel espera que el libro declare su estilo predeterminado.
            .'<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
            .'</styleSheet>';
    }

    /**
     * @param  Hoja  $hoja
     */
    private function hoja(array $hoja): string
    {
        $anchos = '';

        foreach ($hoja['anchos'] ?? [] as $posicion => $ancho) {
            $columna = $posicion + 1;
            $anchos .= '<col min="'.$columna.'" max="'.$columna.'" width="'.$ancho.'" customWidth="1"/>';
        }

        $filas = '';
        $conEncabezado = $hoja['encabezado'] ?? true;

        foreach (array_values($hoja['filas']) as $indice => $valores) {
            $numero = $indice + 1;
            $estilo = $conEncabezado && $numero === 1 ? 1 : 0;
            $celdas = '';

            foreach (array_values($valores) as $posicion => $valor) {
                if ($valor === '') {
                    continue;
                }

                $referencia = self::columna($posicion + 1).$numero;
                $celdas .= '<c r="'.$referencia.'" s="'.$estilo.'" t="inlineStr">'
                    .'<is><t xml:space="preserve">'.$this->texto($valor).'</t></is></c>';
            }

            $filas .= '<row r="'.$numero.'">'.$celdas.'</row>';
        }

        $validaciones = '';
        $cuantas = 0;
        $ultimaFila = max($hoja['filasValidadas'] ?? 200, 2);

        foreach ($hoja['validaciones'] ?? [] as $columna => $nombreDeLista) {
            $cuantas++;
            // `showDropDown` se omite a propósito: en el formato de Excel ese
            // atributo en «1» esconde la flecha del desplegable.
            $validaciones .= '<dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1" '
                .'errorTitle="Valor no permitido" '
                .'error="Elija uno de los valores de la lista." '
                .'sqref="'.$columna.'2:'.$columna.$ultimaFila.'">'
                .'<formula1>'.$this->texto($nombreDeLista).'</formula1>'
                .'</dataValidation>';
        }

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<worksheet xmlns="'.self::ESPACIO_XML.'">'
            .'<sheetViews><sheetView workbookViewId="0">'
            .($conEncabezado ? '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>' : '')
            .'</sheetView></sheetViews>'
            .($anchos === '' ? '' : '<cols>'.$anchos.'</cols>')
            .'<sheetData>'.$filas.'</sheetData>'
            .($cuantas === 0 ? '' : '<dataValidations count="'.$cuantas.'">'.$validaciones.'</dataValidations>')
            .'</worksheet>';
    }

    private function texto(string $valor): string
    {
        return htmlspecialchars($valor, ENT_QUOTES | ENT_XML1, 'UTF-8');
    }
}
