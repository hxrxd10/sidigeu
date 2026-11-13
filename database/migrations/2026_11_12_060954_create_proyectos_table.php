<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Proyectos de las unidades de la DIGEU (Módulo 2) con su formulación,
     * ejecución y cierre.
     */
    public function up(): void
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('unidad_id')->constrained('unidades');
            $table->foreignId('responsable_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('area_id')->nullable()->constrained('areas')->nullOnDelete();
            $table->foreignId('programa_id')->nullable()->constrained('programas')->nullOnDelete();
            $table->foreignId('linea_accion_id')->nullable()->constrained('lineas_accion')->nullOnDelete();
            $table->foreignId('tipo_proyecto_id')->nullable()->constrained('tipos_proyecto')->nullOnDelete();
            $table->text('justificacion')->nullable();
            $table->text('objetivo_general')->nullable();
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->string('estado')->default('registrado');

            // Cierre (RF-2.08)
            $table->text('resultados')->nullable();
            $table->text('productos')->nullable();
            $table->text('lecciones_aprendidas')->nullable();
            $table->timestamp('fecha_cierre')->nullable();
            $table->string('motivo_estado')->nullable();

            $table->foreignId('creado_por')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['unidad_id', 'estado']);
            $table->index(['estado', 'fecha_inicio']);
        });

        Schema::create('proyecto_objetivos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->text('descripcion');
            $table->unsignedInteger('orden')->default(0);
        });

        Schema::create('proyecto_beneficiarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->string('tipo');
            $table->unsignedInteger('cantidad')->default(0);
            $table->string('descripcion')->nullable();
        });

        Schema::create('proyecto_tareas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->string('tarea');
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->foreignId('responsable_id')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedTinyInteger('avance')->default(0);
            $table->unsignedInteger('orden')->default(0);
        });

        Schema::create('proyecto_presupuestos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->string('descripcion');
            $table->decimal('cantidad', 12, 2)->default(1);
            $table->decimal('costo_unitario', 12, 2)->default(0);
            $table->decimal('ejecutado', 12, 2)->default(0);
            $table->foreignId('fuente_financiamiento_id')
                ->nullable()
                ->constrained('fuentes_financiamiento', indexName: 'presupuestos_fuente_foreign')
                ->nullOnDelete();
        });

        Schema::create('proyecto_indicador', function (Blueprint $table) {
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->foreignId('indicador_id')->constrained('indicadores')->cascadeOnDelete();
            $table->decimal('linea_base', 12, 2)->nullable();
            $table->decimal('meta', 12, 2)->nullable();
            $table->decimal('valor_final', 12, 2)->nullable();

            $table->primary(['proyecto_id', 'indicador_id']);
        });

        Schema::create('proyecto_avances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->date('fecha');
            $table->unsignedTinyInteger('porcentaje')->default(0);
            $table->text('descripcion');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('proyecto_recursos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->string('tipo');
            $table->foreignId('persona_recurso_humano_id')
                ->nullable()
                ->constrained('personas_recurso_humano', indexName: 'recursos_persona_foreign')
                ->nullOnDelete();
            $table->string('descripcion')->nullable();
            $table->decimal('cantidad', 12, 2)->default(1);
            $table->decimal('costo', 12, 2)->default(0);
        });

        Schema::create('proyecto_revisiones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyecto_id')->constrained('proyectos')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('accion');
            $table->text('comentario')->nullable();
            $table->timestamps();

            $table->index(['proyecto_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proyecto_revisiones');
        Schema::dropIfExists('proyecto_recursos');
        Schema::dropIfExists('proyecto_avances');
        Schema::dropIfExists('proyecto_indicador');
        Schema::dropIfExists('proyecto_presupuestos');
        Schema::dropIfExists('proyecto_tareas');
        Schema::dropIfExists('proyecto_beneficiarios');
        Schema::dropIfExists('proyecto_objetivos');
        Schema::dropIfExists('proyectos');
    }
};
