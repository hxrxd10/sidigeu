<?php

use App\Http\Controllers\Actividades\ActividadController;
use App\Http\Controllers\Actividades\CargaMasivaActividadController;
use App\Http\Controllers\Actividades\CierreActividadController;
use App\Http\Controllers\Actividades\EstadoActividadController;
use App\Http\Controllers\Actividades\ReporteActividadesController;
use App\Http\Controllers\Actividades\RevisionActividadController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('actividades')
    ->name('actividades.')
    ->group(function () {
        Route::get('/', [ActividadController::class, 'index'])->name('index');
        Route::get('nueva', [ActividadController::class, 'create'])->name('create');
        Route::post('/', [ActividadController::class, 'store'])->name('store');

        // Carga masiva de la programación desde hoja de cálculo (RF-1.01)
        Route::get('carga-masiva', [CargaMasivaActividadController::class, 'create'])->name('carga-masiva.create');
        Route::get('carga-masiva/plantilla', [CargaMasivaActividadController::class, 'plantilla'])->name('carga-masiva.plantilla');
        Route::get('carga-masiva/plantilla.csv', [CargaMasivaActividadController::class, 'plantillaCsv'])->name('carga-masiva.plantilla-csv');
        Route::post('carga-masiva/revision', [CargaMasivaActividadController::class, 'previsualizar'])->name('carga-masiva.revision');
        Route::post('carga-masiva', [CargaMasivaActividadController::class, 'store'])->name('carga-masiva.store');

        // Bandeja de revisión y validación (RF-1.02)
        Route::get('revision', [RevisionActividadController::class, 'index'])->name('revision');

        // Reportes mensuales y acumulados (RF-1.09, RF-1.10)
        Route::get('reportes/mensual', [ReporteActividadesController::class, 'mensual'])->name('reportes.mensual');
        Route::get('reportes/acumulado', [ReporteActividadesController::class, 'acumulado'])->name('reportes.acumulado');
        Route::get('reportes/exportar', [ReporteActividadesController::class, 'exportar'])->name('reportes.exportar');

        Route::get('{actividad}', [ActividadController::class, 'show'])->name('show');
        Route::get('{actividad}/editar', [ActividadController::class, 'edit'])->name('edit');
        Route::put('{actividad}', [ActividadController::class, 'update'])->name('update');
        Route::delete('{actividad}', [ActividadController::class, 'destroy'])->name('destroy');

        Route::patch('{actividad}/enviar', [RevisionActividadController::class, 'enviar'])->name('enviar');
        Route::patch('{actividad}/validar', [RevisionActividadController::class, 'validar'])->name('validar');
        Route::patch('{actividad}/observar', [RevisionActividadController::class, 'observar'])->name('observar');
        Route::patch('{actividad}/rechazar', [RevisionActividadController::class, 'rechazar'])->name('rechazar');

        // Publicar en la Agenda Cultural o retirar de ella después de validada (RF-1.03)
        Route::patch('{actividad}/publicar-agenda', [RevisionActividadController::class, 'publicarAgenda'])->name('publicar-agenda');
        Route::patch('{actividad}/quitar-agenda', [RevisionActividadController::class, 'quitarAgenda'])->name('quitar-agenda');

        Route::patch('{actividad}/iniciar', [EstadoActividadController::class, 'iniciar'])->name('iniciar');
        Route::patch('{actividad}/reprogramar', [EstadoActividadController::class, 'reprogramar'])->name('reprogramar');
        Route::patch('{actividad}/cancelar', [EstadoActividadController::class, 'cancelar'])->name('cancelar');

        // Cierre con resultados y evidencias (RF-1.06)
        Route::get('{actividad}/cierre', [CierreActividadController::class, 'edit'])->name('cierre.edit');
        Route::post('{actividad}/cierre', [CierreActividadController::class, 'store'])->name('cierre.store');
    });
