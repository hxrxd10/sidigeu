<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Actividades de las unidades de la DIGEU (Módulo 1), con su revisión,
     * participantes, beneficiarios e indicadores.
     *
     * El vínculo con un proyecto (RF-1.12) se agregará con el Módulo 2.
     */
    public function up(): void
    {
        Schema::create('actividades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('unidad_id')->constrained('unidades');
            $table->foreignId('responsable_id')->nullable()->constrained('users')->nullOnDelete();
            $table->date('fecha');
            $table->time('hora_inicio')->nullable();
            $table->time('hora_fin')->nullable();
            $table->foreignId('espacio_id')->nullable()->constrained('espacios')->nullOnDelete();
            $table->string('lugar_externo')->nullable();
            $table->foreignId('tipo_actividad_id')->constrained('tipos_actividad');
            $table->foreignId('linea_accion_id')->constrained('lineas_accion');
            $table->boolean('publicar_agenda')->default(false);
            $table->boolean('es_logro_no_programado')->default(false);
            $table->string('estado')->default('borrador');
            $table->text('descripcion')->nullable();
            $table->text('resultados')->nullable();
            $table->text('observaciones')->nullable();
            $table->string('motivo_cancelacion')->nullable();
            $table->timestamp('fecha_cierre')->nullable();
            $table->foreignId('creado_por')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['unidad_id', 'fecha']);
            $table->index(['estado', 'fecha']);
            $table->index(['publicar_agenda', 'fecha']);
        });

        Schema::create('actividad_indicador', function (Blueprint $table) {
            $table->foreignId('actividad_id')->constrained('actividades')->cascadeOnDelete();
            $table->foreignId('indicador_id')->constrained('indicadores')->cascadeOnDelete();
            $table->decimal('valor_meta', 12, 2)->nullable();
            $table->decimal('valor_alcanzado', 12, 2)->nullable();

            $table->primary(['actividad_id', 'indicador_id']);
        });

        Schema::create('actividad_publico_objetivo', function (Blueprint $table) {
            $table->foreignId('actividad_id')->constrained('actividades')->cascadeOnDelete();
            $table->foreignId('publico_objetivo_id')->constrained('publicos_objetivo')->cascadeOnDelete();

            $table->primary(['actividad_id', 'publico_objetivo_id'], 'actividad_publico_primary');
        });

        Schema::create('actividad_beneficiarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actividad_id')->constrained('actividades')->cascadeOnDelete();
            $table->string('sexo');
            $table->string('rango_edad');
            $table->string('tipo_publico')->nullable();
            $table->unsignedInteger('cantidad');

            $table->index('actividad_id');
        });

        Schema::create('actividad_participantes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actividad_id')->constrained('actividades')->cascadeOnDelete();
            $table->foreignId('persona_recurso_humano_id')
                ->nullable()
                ->constrained('personas_recurso_humano', indexName: 'participantes_persona_foreign')
                ->nullOnDelete();
            $table->string('nombre_externo')->nullable();
            $table->string('rol')->nullable();

            $table->index('actividad_id');
        });

        Schema::create('actividad_revisiones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actividad_id')->constrained('actividades')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('accion');
            $table->text('comentario')->nullable();
            $table->timestamps();

            $table->index(['actividad_id', 'created_at']);
        });

        Schema::create('actividad_reprogramaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actividad_id')->constrained('actividades')->cascadeOnDelete();
            $table->date('fecha_anterior');
            $table->date('fecha_nueva');
            $table->string('motivo')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('actividad_reprogramaciones');
        Schema::dropIfExists('actividad_revisiones');
        Schema::dropIfExists('actividad_participantes');
        Schema::dropIfExists('actividad_beneficiarios');
        Schema::dropIfExists('actividad_publico_objetivo');
        Schema::dropIfExists('actividad_indicador');
        Schema::dropIfExists('actividades');
    }
};
