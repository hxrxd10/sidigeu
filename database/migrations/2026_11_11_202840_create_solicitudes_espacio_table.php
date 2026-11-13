<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Solicitudes de uso de un espacio (RF-3.04, RF-3.05).
     *
     * Una solicitud aprobada es la que bloquea el horario en el calendario.
     * El vínculo con una actividad del Módulo 1 se agregará en su fase.
     */
    public function up(): void
    {
        Schema::create('solicitudes_espacio', function (Blueprint $table) {
            $table->id();
            $table->foreignId('espacio_id')->constrained('espacios');
            $table->date('fecha');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->string('solicitante_nombre');
            $table->string('institucion')->nullable();
            $table->string('correo');
            $table->string('telefono')->nullable();
            $table->text('proposito');
            $table->unsignedInteger('asistentes')->nullable();
            $table->text('requerimientos')->nullable();
            $table->string('estado')->default('pendiente');
            $table->foreignId('solicitado_por')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('resuelto_por')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('fecha_resolucion')->nullable();
            $table->string('motivo_rechazo')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['espacio_id', 'fecha', 'estado']);
            $table->index(['estado', 'fecha']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitudes_espacio');
    }
};
