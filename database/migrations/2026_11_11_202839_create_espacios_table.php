<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Espacios físicos bajo gestión de la DIGEU (RF-3.02).
     */
    public function up(): void
    {
        Schema::create('espacios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sede_id')->constrained('sedes');
            $table->string('nombre');
            $table->foreignId('tipo_espacio_id')->constrained('tipos_espacio');
            $table->string('ubicacion')->nullable();
            $table->unsignedInteger('capacidad')->nullable();
            $table->text('caracteristicas')->nullable();
            $table->text('condiciones_uso')->nullable();
            $table->string('estado')->default('activo');
            $table->boolean('visible_publico')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['sede_id', 'nombre']);
            $table->index(['estado', 'visible_publico']);
        });

        Schema::create('espacio_equipamiento', function (Blueprint $table) {
            $table->foreignId('espacio_id')->constrained()->cascadeOnDelete();
            $table->foreignId('equipamiento_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('cantidad')->default(1);

            $table->primary(['espacio_id', 'equipamiento_id']);
        });

        Schema::create('espacio_fotografias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('espacio_id')->constrained()->cascadeOnDelete();
            $table->string('ruta');
            $table->string('descripcion')->nullable();
            $table->unsignedInteger('orden')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('espacio_fotografias');
        Schema::dropIfExists('espacio_equipamiento');
        Schema::dropIfExists('espacios');
    }
};
