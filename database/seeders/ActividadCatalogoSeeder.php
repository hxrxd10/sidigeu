<?php

namespace Database\Seeders;

use App\Models\Indicador;
use App\Models\LineaAccion;
use App\Models\PublicoObjetivo;
use App\Models\TipoActividad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActividadCatalogoSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Valores de partida para clasificar actividades. La lista oficial de la
     * DIGEU está pendiente de confirmación (sección 15 del documento).
     *
     * @var array<int, string>
     */
    private const TIPOS = [
        'Taller',
        'Conferencia',
        'Conversatorio',
        'Curso',
        'Exposición',
        'Concierto',
        'Presentación artística',
        'Competencia deportiva',
        'Festival',
        'Jornada comunitaria',
    ];

    /**
     * @var array<int, string>
     */
    private const LINEAS = [
        'Formación y actualización',
        'Difusión cultural',
        'Promoción del deporte',
        'Vinculación con la sociedad',
        'Interdisciplinariedad',
    ];

    /**
     * @var array<int, string>
     */
    private const PUBLICOS = [
        'Estudiantes universitarios',
        'Docentes',
        'Personal administrativo',
        'Comunidad en general',
        'Niñez y adolescencia',
        'Organizaciones comunitarias',
    ];

    /**
     * @var array<string, string>
     */
    private const INDICADORES = [
        'Actividades realizadas' => 'Actividades',
        'Personas beneficiadas' => 'Personas',
        'Participantes en actividades artísticas' => 'Personas',
        'Participantes en actividades deportivas' => 'Personas',
        'Horas de formación impartidas' => 'Horas',
        'Comunidades atendidas' => 'Comunidades',
    ];

    public function run(): void
    {
        foreach (self::TIPOS as $nombre) {
            TipoActividad::updateOrCreate(['nombre' => $nombre], ['activo' => true]);
        }

        foreach (self::LINEAS as $nombre) {
            LineaAccion::updateOrCreate(['nombre' => $nombre], ['activo' => true]);
        }

        foreach (self::PUBLICOS as $nombre) {
            PublicoObjetivo::updateOrCreate(['nombre' => $nombre], ['activo' => true]);
        }

        foreach (self::INDICADORES as $nombre => $unidad) {
            Indicador::updateOrCreate(['nombre' => $nombre], ['unidad_medida' => $unidad, 'activo' => true]);
        }
    }
}
