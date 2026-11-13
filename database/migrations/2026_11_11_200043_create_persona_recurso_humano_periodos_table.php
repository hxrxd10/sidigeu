<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Períodos de permanencia de cada persona (RN-4.05): se cierra uno al dar de
     * baja y se abre otro al reactivar.
     *
     * Los índices llevan nombre propio porque el que genera Laravel supera los
     * 64 caracteres que admite MySQL.
     */
    public function up(): void
    {
        Schema::create('periodos_recurso_humano', function (Blueprint $table) {
            $table->id();
            $table->foreignId('persona_id')
                ->constrained('personas_recurso_humano', indexName: 'periodos_rh_persona_id_foreign')
                ->cascadeOnDelete();
            $table->date('fecha_alta');
            $table->date('fecha_baja')->nullable();
            $table->string('motivo_baja')->nullable();
            $table->timestamps();

            $table->index(['persona_id', 'fecha_alta'], 'periodos_rh_persona_fecha_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('periodos_recurso_humano');
    }
};
