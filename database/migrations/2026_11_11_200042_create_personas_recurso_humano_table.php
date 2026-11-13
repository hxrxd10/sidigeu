<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Artistas y deportistas vinculados a la DIGEU (Módulo 4).
     */
    public function up(): void
    {
        Schema::create('personas_recurso_humano', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
            $table->foreignId('disciplina_id')->constrained('disciplinas');
            $table->foreignId('agrupacion_id')->nullable()->constrained('agrupaciones')->nullOnDelete();
            $table->string('nombres');
            $table->string('apellidos');
            $table->foreignId('pais_id')->constrained('paises');
            $table->date('fecha_nacimiento');
            $table->string('dpi', 13)->nullable()->unique();
            $table->string('pasaporte', 20)->nullable();
            $table->string('foto_ruta')->nullable();
            $table->date('fecha_alta');
            $table->boolean('activo')->default(true);
            $table->date('fecha_baja')->nullable();
            $table->string('motivo_baja')->nullable();
            $table->text('biografia')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // El pasaporte es único por país (RN-4.01).
            $table->unique(['pais_id', 'pasaporte']);
            $table->index(['tipo', 'activo']);
            $table->index(['apellidos', 'nombres']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personas_recurso_humano');
    }
};
