<?php

namespace App\Enums;

/**
 * Roles del sistema (sección 8.1 de los requerimientos).
 */
enum Rol: string
{
    case Administrador = 'administrador';
    case Direccion = 'direccion';
    case Validador = 'validador';
    case CoordinadorUnidad = 'coordinador-unidad';
    case AdministradorEspacios = 'administrador-espacios';
    case GestorRecursoHumano = 'gestor-recurso-humano';
    case Consulta = 'consulta';

    public function nombre(): string
    {
        return match ($this) {
            self::Administrador => 'Administrador',
            self::Direccion => 'Dirección',
            self::Validador => 'Validador',
            self::CoordinadorUnidad => 'Coordinador de unidad',
            self::AdministradorEspacios => 'Administrador de espacios',
            self::GestorRecursoHumano => 'Gestor de recurso humano',
            self::Consulta => 'Consulta',
        };
    }

    public function descripcion(): string
    {
        return match ($this) {
            self::Administrador => 'Gestiona usuarios, roles, catálogos y configuración general.',
            self::Direccion => 'Consulta global, aprueba proyectos y consulta todos los reportes.',
            self::Validador => 'Revisa y valida actividades y revisa proyectos.',
            self::CoordinadorUnidad => 'Registra y gestiona las actividades y proyectos de su unidad.',
            self::AdministradorEspacios => 'Gestiona sedes, espacios, solicitudes y el calendario de ocupación.',
            self::GestorRecursoHumano => 'Gestiona el registro de artistas y deportistas.',
            self::Consulta => 'Acceso de solo lectura a la información institucional.',
        };
    }

    /**
     * Roles cuyo alcance es toda la DIGEU y no una sola unidad.
     *
     * @return array<int, self>
     */
    public static function globales(): array
    {
        return [self::Administrador, self::Direccion, self::Validador];
    }
}
