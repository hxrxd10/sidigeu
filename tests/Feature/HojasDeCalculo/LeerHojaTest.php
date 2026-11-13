<?php

use App\Actions\HojasDeCalculo\EscribirLibro;
use App\Actions\HojasDeCalculo\LeerHoja;
use Illuminate\Http\UploadedFile;

function comoArchivo(string $contenido, string $nombre): UploadedFile
{
    return UploadedFile::fake()->createWithContent($nombre, $contenido);
}

test('lee la hoja de un libro de Excel', function () {
    $libro = app(EscribirLibro::class)->generar([
        [
            'nombre' => 'Actividades',
            'filas' => [
                ['Nombre', 'Fecha', 'Unidad'],
                ['Concierto de marimba', '15-03-2026', 'Cultura'],
                ['Torneo de ajedrez', '20-03-2026', 'Deportes'],
            ],
        ],
    ]);

    $filas = app(LeerHoja::class)->filas(comoArchivo($libro, 'plantilla.xlsx'));

    expect($filas)->toHaveCount(3)
        ->and($filas[0])->toBe(['Nombre', 'Fecha', 'Unidad'])
        ->and($filas[1])->toBe(['Concierto de marimba', '15-03-2026', 'Cultura'])
        ->and($filas[2][2])->toBe('Deportes');
});

test('respeta la posición de las columnas aunque haya celdas vacías', function () {
    $libro = app(EscribirLibro::class)->generar([
        [
            'nombre' => 'Actividades',
            'filas' => [
                ['Nombre', 'Hora', 'Unidad'],
                ['Concierto', '', 'Cultura'],
            ],
        ],
    ]);

    $filas = app(LeerHoja::class)->filas(comoArchivo($libro, 'plantilla.xlsx'));

    expect($filas[1])->toBe(['Concierto', '', 'Cultura']);
});

test('lee un CSV separado por comas', function () {
    $csv = "Nombre,Fecha,Unidad\nConcierto de marimba,15-03-2026,Cultura\n";

    $filas = app(LeerHoja::class)->filas(comoArchivo($csv, 'padron.csv'));

    expect($filas)->toHaveCount(2)
        ->and($filas[1])->toBe(['Concierto de marimba', '15-03-2026', 'Cultura']);
});

test('lee un CSV separado por punto y coma y con BOM', function () {
    $csv = "\xEF\xBB\xBFNombres;Apellidos\nLucía;Marroquín\n";

    $filas = app(LeerHoja::class)->filas(comoArchivo($csv, 'padron.csv'));

    expect($filas[0])->toBe(['Nombres', 'Apellidos'])
        ->and($filas[1])->toBe(['Lucía', 'Marroquín']);
});

test('descarta las filas vacías del final', function () {
    $csv = "Nombre\nConcierto\n\n\n";

    expect(app(LeerHoja::class)->filas(comoArchivo($csv, 'datos.csv')))->toHaveCount(2);
});

test('no procesa más filas que el tope', function () {
    $lineas = collect(range(1, LeerHoja::MAXIMO_FILAS + 50))
        ->map(fn (int $numero): string => "Actividad {$numero}")
        ->prepend('Nombre')
        ->implode("\n");

    expect(app(LeerHoja::class)->filas(comoArchivo($lineas, 'datos.csv')))
        ->toHaveCount(LeerHoja::MAXIMO_FILAS + 1);
});
