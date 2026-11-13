<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Evidencias de cualquier entidad: fotografías, documentos y enlaces
     * (RF-1.06, RF-T.03).
     */
    public function up(): void
    {
        Schema::create('evidencias', function (Blueprint $table) {
            $table->id();
            $table->morphs('evidenciable');
            $table->string('tipo');
            $table->string('ruta')->nullable();
            $table->string('url')->nullable();
            $table->string('nombre_original')->nullable();
            $table->string('descripcion')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evidencias');
    }
};
