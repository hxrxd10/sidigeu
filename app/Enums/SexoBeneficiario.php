<?php

namespace App\Enums;

/**
 * Desagregación por sexo de los beneficiarios (RF-1.06).
 */
enum SexoBeneficiario: string
{
    case Hombre = 'hombre';
    case Mujer = 'mujer';
    case NoIndica = 'no_indica';

    public function nombre(): string
    {
        return match ($this) {
            self::Hombre => 'Hombres',
            self::Mujer => 'Mujeres',
            self::NoIndica => 'No indica',
        };
    }

    /**
     * @return array<int, array{valor: string, nombre: string}>
     */
    public static function opciones(): array
    {
        return array_map(
            fn (self $sexo): array => ['valor' => $sexo->value, 'nombre' => $sexo->nombre()],
            self::cases(),
        );
    }
}
