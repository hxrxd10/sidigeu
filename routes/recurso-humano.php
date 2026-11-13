<?php

use App\Http\Controllers\RecursoHumano\CargaMasivaPadronController;
use App\Http\Controllers\RecursoHumano\EstadoPersonaController;
use App\Http\Controllers\RecursoHumano\PersonaRecursoHumanoController;
use App\Http\Controllers\RecursoHumano\ReporteRecursoHumanoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('recurso-humano')
    ->name('recurso-humano.')
    ->group(function () {
        Route::get('/', [PersonaRecursoHumanoController::class, 'index'])->name('index');

        Route::get('reportes', [ReporteRecursoHumanoController::class, 'index'])->name('reportes');
        Route::get('reportes/exportar', [ReporteRecursoHumanoController::class, 'exportar'])->name('reportes.exportar');

        // Carga masiva desde hoja de cálculo (RF-4.01)
        Route::get('carga-masiva', [CargaMasivaPadronController::class, 'create'])->name('carga-masiva.create');
        Route::get('carga-masiva/plantilla', [CargaMasivaPadronController::class, 'plantilla'])->name('carga-masiva.plantilla');
        Route::get('carga-masiva/plantilla.csv', [CargaMasivaPadronController::class, 'plantillaCsv'])->name('carga-masiva.plantilla-csv');
        Route::post('carga-masiva/revision', [CargaMasivaPadronController::class, 'previsualizar'])->name('carga-masiva.revision');
        Route::post('carga-masiva', [CargaMasivaPadronController::class, 'store'])->name('carga-masiva.store');

        Route::get('nuevo', [PersonaRecursoHumanoController::class, 'create'])->name('create');
        Route::post('/', [PersonaRecursoHumanoController::class, 'store'])->name('store');

        Route::get('{persona}', [PersonaRecursoHumanoController::class, 'show'])->name('show');
        Route::get('{persona}/editar', [PersonaRecursoHumanoController::class, 'edit'])->name('edit');
        Route::put('{persona}', [PersonaRecursoHumanoController::class, 'update'])->name('update');
        Route::delete('{persona}', [PersonaRecursoHumanoController::class, 'destroy'])->name('destroy');

        // Baja y reactivación (RF-4.03, RF-4.05)
        Route::post('{persona}/baja', [EstadoPersonaController::class, 'store'])->name('baja');
        Route::put('{persona}/reactivar', [EstadoPersonaController::class, 'update'])->name('reactivar');
    });
