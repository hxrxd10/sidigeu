<?php

use App\Http\Controllers\Actividades\AgendaCulturalController;
use App\Http\Controllers\Publico\CatalogoEspaciosController;
use App\Http\Controllers\Publico\SitemapController;
use App\Http\Controllers\Publico\SolicitudEspacioPublicaController;
use Illuminate\Support\Facades\Route;

/*
 * Rutas sin autenticación: catálogo público de espacios y solicitud de uso
 * (RF-3.03, RF-3.04).
 */
Route::name('publico.')->group(function () {
    // Agenda Cultural (RF-1.04): abierta, igual que el catálogo de espacios.
    Route::get('agenda', [AgendaCulturalController::class, 'index'])->name('agenda');
    Route::get('agenda/{actividad}/calendario.ics', [AgendaCulturalController::class, 'calendario'])
        ->name('agenda.calendario');
    Route::get('agenda/{actividad}', [AgendaCulturalController::class, 'show'])->name('agenda.show');

    Route::get('espacios', [CatalogoEspaciosController::class, 'index'])->name('espacios.index');

    Route::get('solicitud-espacio', [SolicitudEspacioPublicaController::class, 'create'])->name('solicitud.create');
    Route::post('solicitud-espacio', [SolicitudEspacioPublicaController::class, 'store'])
        ->middleware('throttle:10,1')
        ->name('solicitud.store');
    Route::get('solicitud-espacio/enviada', [SolicitudEspacioPublicaController::class, 'confirmacion'])->name('solicitud.confirmacion');

    Route::get('espacios/{espacio}', [CatalogoEspaciosController::class, 'show'])->name('espacios.show');

    // Mapa del sitio y robots.txt para los buscadores
    Route::get('sitemap.xml', SitemapController::class)->name('sitemap');
    Route::get('robots.txt', [SitemapController::class, 'robots'])->name('robots');
});
