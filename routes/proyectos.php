<?php

use App\Http\Controllers\Proyectos\ActividadProyectoController;
use App\Http\Controllers\Proyectos\AprobacionProyectoController;
use App\Http\Controllers\Proyectos\CierreProyectoController;
use App\Http\Controllers\Proyectos\EjecucionProyectoController;
use App\Http\Controllers\Proyectos\FormulacionController;
use App\Http\Controllers\Proyectos\InformeProyectoController;
use App\Http\Controllers\Proyectos\ProyectoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('proyectos')
    ->name('proyectos.')
    ->group(function () {
        Route::get('/', [ProyectoController::class, 'index'])->name('index');
        Route::get('nuevo', [ProyectoController::class, 'create'])->name('create');
        Route::post('/', [ProyectoController::class, 'store'])->name('store');

        // Bandeja de aprobación (RF-2.03)
        Route::get('aprobacion', [AprobacionProyectoController::class, 'index'])->name('aprobacion');

        Route::get('{proyecto}', [ProyectoController::class, 'show'])->name('show');
        Route::get('{proyecto}/editar', [ProyectoController::class, 'edit'])->name('edit');
        Route::put('{proyecto}', [ProyectoController::class, 'update'])->name('update');
        Route::delete('{proyecto}', [ProyectoController::class, 'destroy'])->name('destroy');

        // Formulación (RF-2.02)
        Route::get('{proyecto}/formulacion', [FormulacionController::class, 'edit'])->name('formulacion.edit');
        Route::post('{proyecto}/formulacion', [FormulacionController::class, 'store'])->name('formulacion.store');

        Route::patch('{proyecto}/enviar', [AprobacionProyectoController::class, 'enviar'])->name('enviar');
        Route::patch('{proyecto}/aprobar', [AprobacionProyectoController::class, 'aprobar'])->name('aprobar');
        Route::patch('{proyecto}/observar', [AprobacionProyectoController::class, 'observar'])->name('observar');
        Route::patch('{proyecto}/rechazar', [AprobacionProyectoController::class, 'rechazar'])->name('rechazar');

        // Ejecución (RF-2.05, RF-2.07)
        Route::get('{proyecto}/avance', [EjecucionProyectoController::class, 'create'])->name('avance.create');
        Route::post('{proyecto}/avance', [EjecucionProyectoController::class, 'store'])->name('avance.store');
        Route::patch('{proyecto}/iniciar', [EjecucionProyectoController::class, 'iniciar'])->name('iniciar');
        Route::patch('{proyecto}/suspender', [EjecucionProyectoController::class, 'suspender'])->name('suspender');
        Route::patch('{proyecto}/cancelar', [EjecucionProyectoController::class, 'cancelar'])->name('cancelar');

        // Actividades vinculadas (RF-2.06)
        Route::post('{proyecto}/actividades', [ActividadProyectoController::class, 'store'])->name('actividades.store');
        Route::delete('{proyecto}/actividades/{actividad}', [ActividadProyectoController::class, 'destroy'])
            ->name('actividades.destroy');

        // Cierre e informe (RF-2.08, RF-2.09)
        Route::get('{proyecto}/cierre', [CierreProyectoController::class, 'edit'])->name('cierre.edit');
        Route::post('{proyecto}/cierre', [CierreProyectoController::class, 'store'])->name('cierre.store');
        Route::get('{proyecto}/informe', InformeProyectoController::class)->name('informe');
    });
