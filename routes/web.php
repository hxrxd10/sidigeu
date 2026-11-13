<?php

use App\Http\Controllers\BuscadorController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome', [
    'meta' => [
        'titulo' => 'DIGEU · Dirección General de Extensión Universitaria',
        'descripcion' => 'Actividades artísticas, deportivas y de formación de la Universidad de San Carlos '
            .'de Guatemala: agenda cultural, catálogo de espacios y solicitud de uso.',
    ],
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // Búsqueda global del encabezado
    Route::get('buscar', BuscadorController::class)->name('buscar');
});

require __DIR__.'/settings.php';
require __DIR__.'/administracion.php';
require __DIR__.'/recurso-humano.php';
require __DIR__.'/espacios.php';
require __DIR__.'/actividades.php';
require __DIR__.'/proyectos.php';
require __DIR__.'/publico.php';
