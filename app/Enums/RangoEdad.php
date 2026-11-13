<?php

namespace App\Enums;

/**
 * Rangos de edad usados en la desagregación de beneficiarios (RF-1.06).
 */
enum RangoEdad: string
{
    case Ninez = 'ninez';
    case Adolescencia = 'adolescencia';
    case Juventud = 'juventud';
    case Adultez = 'adultez';
    case AdultoMayor = 'adulto_mayor';

    public function nombre(): string
    {
        return match ($this) {
            self::Ninez => 'Niñez (0 a 12)',
            self::Adolescencia => 'Adolescencia (13 a 17)',
            self::Juventud => 'Juventud (18 a 29)',
            self::Adultez => 'Adultez (30 a 59)',
            self::AdultoMayor => 'Adulto mayor (60 o más)',
        };
    }

    /**
     * @return array<int, array{valor: string, nombre: string}>
     */
    public static function opciones(): array
    {
        return array_map(
            fn (self $rango): array => ['valor' => $rango->value, 'nombre' => $rango->nombre()],
            self::cases(),
        );
    }
}
