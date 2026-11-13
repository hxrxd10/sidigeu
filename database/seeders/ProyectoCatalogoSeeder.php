<?php

namespace Database\Seeders;

use App\Models\FuenteFinanciamiento;
use App\Models\TipoProyecto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProyectoCatalogoSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Valores de partida para clasificar proyectos; la lista oficial de la
     * DIGEU está pendiente de confirmación.
     *
     * @var array<int, string>
     */
    private const TIPOS = [
        'Proyecto cultural',
        'Proyecto deportivo',
        'Proyecto de formación',
        'Proyecto de vinculación comunitaria',
        'Proyecto interdisciplinario',
    ];

    /**
     * @var array<int, string>
     */
    private const FUENTES = [
        'Presupuesto ordinario USAC',
        'Fondos propios de la unidad',
        'Cooperación externa',
        'Donación',
        'Autofinanciable',
    ];

    public function run(): void
    {
        foreach (self::TIPOS as $nombre) {
            TipoProyecto::updateOrCreate(['nombre' => $nombre], ['activo' => true]);
        }

        foreach (self::FUENTES as $nombre) {
            FuenteFinanciamiento::updateOrCreate(['nombre' => $nombre], ['activo' => true]);
        }
    }
}
