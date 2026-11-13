<?php

use App\Http\Controllers\Administracion\AuditoriaController;
use App\Http\Controllers\Administracion\UserController;
use App\Http\Controllers\Catalogos\CatalogoController;
use App\Http\Controllers\NotificacionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Usuarios y roles (RF-T.03)
    Route::get('usuarios', [UserController::class, 'index'])->name('usuarios.index');
    Route::get('usuarios/nuevo', [UserController::class, 'create'])->name('usuarios.create');
    Route::post('usuarios', [UserController::class, 'store'])->name('usuarios.store');
    Route::get('usuarios/{usuario}/editar', [UserController::class, 'edit'])->name('usuarios.edit');
    Route::put('usuarios/{usuario}', [UserController::class, 'update'])->name('usuarios.update');
    Route::patch('usuarios/{usuario}/estado', [UserController::class, 'cambiarEstado'])->name('usuarios.estado');

    // Notificaciones del usuario (RF-T.07)
    Route::get('notificaciones', [NotificacionController::class, 'index'])->name('notificaciones.index');
    Route::patch('notificaciones/leidas', [NotificacionController::class, 'marcarTodas'])->name('notificaciones.leidas');
    Route::patch('notificaciones/{notificacion}', [NotificacionController::class, 'marcar'])->name('notificaciones.marcar');

    // Bitácora de auditoría (RF-T.05)
    Route::get('bitacora', [AuditoriaController::class, 'index'])->name('bitacora.index');

    // Catálogos administrables (RF-T.04)
    Route::get('catalogos', [CatalogoController::class, 'index'])->name('catalogos.index');
    Route::get('catalogos/{catalogo}', [CatalogoController::class, 'show'])->name('catalogos.show');
    Route::post('catalogos/{catalogo}', [CatalogoController::class, 'store'])->name('catalogos.store');
    Route::put('catalogos/{catalogo}/{registro}', [CatalogoController::class, 'update'])->name('catalogos.update');
    Route::delete('catalogos/{catalogo}/{registro}', [CatalogoController::class, 'destroy'])->name('catalogos.destroy');
});
