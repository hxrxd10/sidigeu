<?php

use App\Http\Controllers\Espacios\CalendarioController;
use App\Http\Controllers\Espacios\EspacioController;
use App\Http\Controllers\Espacios\ReporteEspaciosController;
use App\Http\Controllers\Espacios\SolicitudEspacioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Calendario de ocupación (RF-3.07)
    Route::get('calendario', [CalendarioController::class, 'index'])->name('calendario.index');

    // Bandeja de solicitudes (RF-3.05)
    Route::get('solicitudes', [SolicitudEspacioController::class, 'index'])->name('solicitudes.index');
    Route::patch('solicitudes/{solicitud}/aprobar', [SolicitudEspacioController::class, 'aprobar'])->name('solicitudes.aprobar');
    Route::patch('solicitudes/{solicitud}/rechazar', [SolicitudEspacioController::class, 'rechazar'])->name('solicitudes.rechazar');
    Route::patch('solicitudes/{solicitud}/cancelar', [SolicitudEspacioController::class, 'cancelar'])->name('solicitudes.cancelar');

    // Gestión de espacios (RF-3.01, RF-3.02, RF-3.09, RF-3.10)
    Route::get('gestion-espacios', [EspacioController::class, 'index'])->name('espacios.index');
    Route::get('gestion-espacios/nuevo', [EspacioController::class, 'create'])->name('espacios.create');
    Route::post('gestion-espacios', [EspacioController::class, 'store'])->name('espacios.store');
    Route::get('gestion-espacios/reportes', [ReporteEspaciosController::class, 'index'])->name('espacios.reportes');
    Route::get('gestion-espacios/reportes/exportar', [ReporteEspaciosController::class, 'exportar'])->name('espacios.reportes.exportar');
    Route::get('gestion-espacios/{espacio}', [EspacioController::class, 'show'])->name('espacios.show');
    Route::get('gestion-espacios/{espacio}/editar', [EspacioController::class, 'edit'])->name('espacios.edit');
    Route::put('gestion-espacios/{espacio}', [EspacioController::class, 'update'])->name('espacios.update');
    Route::delete('gestion-espacios/{espacio}', [EspacioController::class, 'destroy'])->name('espacios.destroy');
    Route::delete('gestion-espacios/{espacio}/fotografias/{fotografia}', [EspacioController::class, 'eliminarFotografia'])
        ->name('espacios.fotografias.destroy');
});
