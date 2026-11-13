<?php

namespace Database\Seeders;

use App\Enums\TipoPersona;
use App\Models\Disciplina;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DisciplinaSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Disciplinas de partida; el catálogo se administra desde el sistema y la
     * lista oficial de la DIGEU está pendiente de confirmación.
     *
     * @var array<string, array<int, string>>
     */
    private const DISCIPLINAS = [
        TipoPersona::Artista->value => [
            'Música',
            'Canto',
            'Marimba',
            'Danza',
            'Danza folklórica',
            'Teatro',
            'Artes plásticas',
            'Literatura',
            'Fotografía',
            'Cine y audiovisuales',
        ],
        TipoPersona::Deportista->value => [
            'Fútbol',
            'Baloncesto',
            'Voleibol',
            'Atletismo',
            'Natación',
            'Ajedrez',
            'Tae Kwon Do',
            'Tenis de mesa',
            'Levantamiento de pesas',
            'Ciclismo',
        ],
    ];

    public function run(): void
    {
        foreach (self::DISCIPLINAS as $tipo => $disciplinas) {
            foreach ($disciplinas as $nombre) {
                Disciplina::updateOrCreate(
                    ['nombre' => $nombre, 'tipo' => TipoPersona::from($tipo)],
                    ['activo' => true],
                );
            }
        }
    }
}
