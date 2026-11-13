<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Un usuario pertenece a una unidad y puede ser desactivado sin borrarlo.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('unidad_id')->nullable()->after('email')->constrained('unidades')->nullOnDelete();
            $table->boolean('activo')->default(true)->after('unidad_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('unidad_id');
            $table->dropColumn('activo');
        });
    }
};
