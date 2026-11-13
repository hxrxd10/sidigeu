<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Áreas que impulsa la DIGEU según su material institucional.
     *
     * @var array<int, array{nombre: string, slug: string, descripcion: string}>
     */
    private const AREAS = [
        [
            'nombre' => 'Formación y actualización',
            'slug' => 'formacion',
            'descripcion' => 'Formación y actualización de estudiantes, docentes y personal administrativo.',
        ],
        [
            'nombre' => 'Cultura',
            'slug' => 'cultura',
            'descripcion' => 'Manifestaciones artísticas y culturales de la Universidad.',
        ],
        [
            'nombre' => 'Deporte',
            'slug' => 'deporte',
            'descripcion' => 'Actividades y selecciones deportivas universitarias.',
        ],
        [
            'nombre' => 'Vinculación con la sociedad',
            'slug' => 'vinculacion',
            'descripcion' => 'Proyección popular y vínculo de la Universidad con la sociedad.',
        ],
        [
            'nombre' => 'Interdisciplinariedad',
            'slug' => 'interdisciplinariedad',
            'descripcion' => 'Actividades interdisciplinarias entre unidades académicas y administrativas.',
        ],
    ];

    public function run(): void
    {
        foreach (self::AREAS as $area) {
            Area::updateOrCreate(['slug' => $area['slug']], $area);
        }
    }
}
