<?php

namespace Database\Seeders;

use App\Models\Equipamiento;
use App\Models\Espacio;
use App\Models\Sede;
use App\Models\TipoEspacio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EspacioSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Sedes y espacios de referencia de la sección 6.1 de los requerimientos.
     *
     * @var array<string, array<string, string>>
     */
    private const SEDES = [
        'Paraninfo' => [
            'Salón Mayor' => 'Salón',
            'Cátedra I' => 'Salón',
            'Cátedra II' => 'Salón',
            'Salón de Ensayos' => 'Sala',
            'Sala TAU' => 'Sala',
        ],
        'MUSAC' => [
            'Salón Mayor' => 'Salón',
            'Patio Central' => 'Patio',
        ],
        'Casa Flavio Herrera' => [
            'Auditorio' => 'Auditorio',
        ],
        'Colegio Santo Tomás' => [
            'Salón Mayor' => 'Salón',
            'Sala de Música' => 'Sala',
            'Patio Central' => 'Patio',
        ],
        'Instalaciones Zona 14' => [
            'Fútbol 11' => 'Cancha',
            'Fútbol 5 – Cancha 1' => 'Cancha',
            'Fútbol 5 – Cancha 2' => 'Cancha',
            'Basket techado' => 'Cancha',
        ],
    ];

    /**
     * @var array<int, string>
     */
    private const TIPOS = ['Salón', 'Auditorio', 'Patio', 'Cancha', 'Sala'];

    /**
     * @var array<int, string>
     */
    private const EQUIPAMIENTOS = [
        'Sonido',
        'Proyector',
        'Pantalla',
        'Iluminación',
        'Micrófonos',
        'Sillas',
        'Mesas',
        'Aire acondicionado',
        'Graderío',
        'Vestidores',
    ];

    public function run(): void
    {
        foreach (self::TIPOS as $tipo) {
            TipoEspacio::updateOrCreate(['nombre' => $tipo], ['activo' => true]);
        }

        foreach (self::EQUIPAMIENTOS as $equipamiento) {
            Equipamiento::updateOrCreate(['nombre' => $equipamiento], ['activo' => true]);
        }

        foreach (self::SEDES as $nombreSede => $espacios) {
            $sede = Sede::updateOrCreate(['nombre' => $nombreSede], ['activo' => true]);

            foreach ($espacios as $nombreEspacio => $tipo) {
                Espacio::updateOrCreate(
                    ['sede_id' => $sede->id, 'nombre' => $nombreEspacio],
                    ['tipo_espacio_id' => TipoEspacio::where('nombre', $tipo)->value('id')],
                );
            }
        }
    }
}
