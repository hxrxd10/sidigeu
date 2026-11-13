<?php

namespace Database\Seeders;

use App\Models\Pais;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaisSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Países para la nacionalidad del recurso humano (código ISO 3166-1 alfa-2).
     * El catálogo es administrable, así que puede ampliarse desde el sistema.
     *
     * @var array<string, string>
     */
    private const PAISES = [
        'GT' => 'Guatemala',
        'AR' => 'Argentina',
        'BZ' => 'Belice',
        'BO' => 'Bolivia',
        'BR' => 'Brasil',
        'CA' => 'Canadá',
        'CL' => 'Chile',
        'CO' => 'Colombia',
        'CR' => 'Costa Rica',
        'CU' => 'Cuba',
        'EC' => 'Ecuador',
        'SV' => 'El Salvador',
        'US' => 'Estados Unidos',
        'HT' => 'Haití',
        'HN' => 'Honduras',
        'JM' => 'Jamaica',
        'MX' => 'México',
        'NI' => 'Nicaragua',
        'PA' => 'Panamá',
        'PY' => 'Paraguay',
        'PE' => 'Perú',
        'PR' => 'Puerto Rico',
        'DO' => 'República Dominicana',
        'UY' => 'Uruguay',
        'VE' => 'Venezuela',
        'DE' => 'Alemania',
        'AT' => 'Austria',
        'BE' => 'Bélgica',
        'ES' => 'España',
        'FR' => 'Francia',
        'IT' => 'Italia',
        'NL' => 'Países Bajos',
        'PT' => 'Portugal',
        'GB' => 'Reino Unido',
        'RU' => 'Rusia',
        'CH' => 'Suiza',
        'CN' => 'China',
        'KR' => 'Corea del Sur',
        'IN' => 'India',
        'IL' => 'Israel',
        'JP' => 'Japón',
        'EG' => 'Egipto',
        'MA' => 'Marruecos',
        'NG' => 'Nigeria',
        'ZA' => 'Sudáfrica',
        'AU' => 'Australia',
    ];

    public function run(): void
    {
        foreach (self::PAISES as $codigo => $nombre) {
            Pais::updateOrCreate(['codigo' => $codigo], ['nombre' => $nombre]);
        }
    }
}
