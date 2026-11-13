<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Una reserva puede nacer de una actividad del Módulo 1 (RF-3.08).
     */
    public function up(): void
    {
        Schema::table('solicitudes_espacio', function (Blueprint $table) {
            $table->foreignId('actividad_id')
                ->nullable()
                ->after('espacio_id')
                ->constrained('actividades')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('solicitudes_espacio', function (Blueprint $table) {
            $table->dropConstrainedForeignId('actividad_id');
        });
    }
};
