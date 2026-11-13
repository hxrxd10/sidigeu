<?php

use App\Actions\HojasDeCalculo\EscribirLibro;

function abrirLibro(string $contenido): ZipArchive
{
    $ruta = tempnam(sys_get_temp_dir(), 'prueba-xlsx-');
    file_put_contents($ruta, $contenido);

    $zip = new ZipArchive;
    $zip->open($ruta);

    return $zip;
}

test('el libro trae las partes que Excel necesita', function () {
    $contenido = app(EscribirLibro::class)->generar([
        ['nombre' => 'Datos', 'filas' => [['Nombre'], ['Concierto']]],
    ]);

    $zip = abrirLibro($contenido);

    expect($zip->locateName('[Content_Types].xml'))->not->toBeFalse()
        ->and($zip->locateName('_rels/.rels'))->not->toBeFalse()
        ->and($zip->locateName('xl/workbook.xml'))->not->toBeFalse()
        ->and($zip->locateName('xl/_rels/workbook.xml.rels'))->not->toBeFalse()
        ->and($zip->locateName('xl/styles.xml'))->not->toBeFalse()
        ->and($zip->locateName('xl/worksheets/sheet1.xml'))->not->toBeFalse();

    expect($zip->getFromName('xl/workbook.xml'))->toContain('name="Datos"');
});

test('la columna de catálogo queda con lista desplegable', function () {
    $contenido = app(EscribirLibro::class)->generar(
        [
            [
                'nombre' => 'Datos',
                'filas' => [['Nombre', 'Unidad']],
                'validaciones' => ['B' => 'Unidades'],
                'filasValidadas' => 300,
            ],
            ['nombre' => 'Listas', 'filas' => [['Unidades'], ['Cultura']]],
        ],
        ['Unidades' => 'Listas!$A$2:$A$10'],
    );

    $hoja = abrirLibro($contenido)->getFromName('xl/worksheets/sheet1.xml');

    expect($hoja)->toContain('<dataValidation type="list"')
        ->toContain('sqref="B2:B300"')
        ->toContain('<formula1>Unidades</formula1>')
        // `showDropDown="1"` esconde la flecha: no debe aparecer.
        ->not->toContain('showDropDown');

    expect(abrirLibro($contenido)->getFromName('xl/workbook.xml'))
        ->toContain('<definedName name="Unidades">Listas!$A$2:$A$10</definedName>');
});

test('el texto de las celdas se escapa', function () {
    $contenido = app(EscribirLibro::class)->generar([
        ['nombre' => 'Datos', 'filas' => [['Teatro & "Danza" <viva>']]],
    ]);

    expect(abrirLibro($contenido)->getFromName('xl/worksheets/sheet1.xml'))
        ->toContain('Teatro &amp; &quot;Danza&quot; &lt;viva&gt;');
});

test('traduce la posición de la columna a su letra', function () {
    expect(EscribirLibro::columna(1))->toBe('A')
        ->and(EscribirLibro::columna(26))->toBe('Z')
        ->and(EscribirLibro::columna(27))->toBe('AA')
        ->and(EscribirLibro::columna(28))->toBe('AB');
});
