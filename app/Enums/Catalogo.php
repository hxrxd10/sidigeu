<?php

namespace App\Enums;

use App\Models\Agrupacion;
use App\Models\Area;
use App\Models\Disciplina;
use App\Models\Equipamiento;
use App\Models\FuenteFinanciamiento;
use App\Models\Indicador;
use App\Models\LineaAccion;
use App\Models\Pais;
use App\Models\Programa;
use App\Models\PublicoObjetivo;
use App\Models\Sede;
use App\Models\TipoActividad;
use App\Models\TipoEspacio;
use App\Models\TipoProyecto;
use App\Models\Unidad;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

/**
 * Catálogos administrables del sistema (RF-T.04). Cada caso describe su modelo,
 * los campos que se capturan y cómo se validan, para que una sola pantalla
 * administre todos.
 */
enum Catalogo: string
{
    case Areas = 'areas';
    case Unidades = 'unidades';
    case Disciplinas = 'disciplinas';
    case Agrupaciones = 'agrupaciones';
    case Paises = 'paises';
    case Sedes = 'sedes';
    case TiposEspacio = 'tipos-espacio';
    case Equipamientos = 'equipamientos';
    case TiposActividad = 'tipos-actividad';
    case LineasAccion = 'lineas-accion';
    case PublicosObjetivo = 'publicos-objetivo';
    case Indicadores = 'indicadores';
    case Programas = 'programas';
    case TiposProyecto = 'tipos-proyecto';
    case FuentesFinanciamiento = 'fuentes-financiamiento';

    /**
     * @return class-string<Model>
     */
    public function modelo(): string
    {
        return match ($this) {
            self::Areas => Area::class,
            self::Unidades => Unidad::class,
            self::Disciplinas => Disciplina::class,
            self::Agrupaciones => Agrupacion::class,
            self::Paises => Pais::class,
            self::Sedes => Sede::class,
            self::TiposEspacio => TipoEspacio::class,
            self::Equipamientos => Equipamiento::class,
            self::TiposActividad => TipoActividad::class,
            self::LineasAccion => LineaAccion::class,
            self::PublicosObjetivo => PublicoObjetivo::class,
            self::Indicadores => Indicador::class,
            self::Programas => Programa::class,
            self::TiposProyecto => TipoProyecto::class,
            self::FuentesFinanciamiento => FuenteFinanciamiento::class,
        };
    }

    public function etiqueta(): string
    {
        return match ($this) {
            self::Areas => 'Áreas',
            self::Unidades => 'Unidades administrativas',
            self::Disciplinas => 'Disciplinas',
            self::Agrupaciones => 'Agrupaciones',
            self::Paises => 'Países',
            self::Sedes => 'Sedes',
            self::TiposEspacio => 'Tipos de espacio',
            self::Equipamientos => 'Equipamiento',
            self::TiposActividad => 'Tipos de actividad',
            self::LineasAccion => 'Líneas de acción',
            self::PublicosObjetivo => 'Públicos objetivo',
            self::Indicadores => 'Indicadores',
            self::Programas => 'Programas',
            self::TiposProyecto => 'Tipos de proyecto',
            self::FuentesFinanciamiento => 'Fuentes de financiamiento',
        };
    }

    public function etiquetaSingular(): string
    {
        return match ($this) {
            self::Areas => 'Área',
            self::Unidades => 'Unidad administrativa',
            self::Disciplinas => 'Disciplina',
            self::Agrupaciones => 'Agrupación',
            self::Paises => 'País',
            self::Sedes => 'Sede',
            self::TiposEspacio => 'Tipo de espacio',
            self::Equipamientos => 'Equipamiento',
            self::TiposActividad => 'Tipo de actividad',
            self::LineasAccion => 'Línea de acción',
            self::PublicosObjetivo => 'Público objetivo',
            self::Indicadores => 'Indicador',
            self::Programas => 'Programa',
            self::TiposProyecto => 'Tipo de proyecto',
            self::FuentesFinanciamiento => 'Fuente de financiamiento',
        };
    }

    public function descripcion(): string
    {
        return match ($this) {
            self::Areas => 'Áreas sustantivas que impulsa la DIGEU.',
            self::Unidades => 'Unidades que registran actividades y proyectos.',
            self::Disciplinas => 'Disciplinas artísticas y deportivas del recurso humano.',
            self::Agrupaciones => 'Coros, orquestas, selecciones y demás agrupaciones.',
            self::Paises => 'Países disponibles como nacionalidad.',
            self::Sedes => 'Sedes de la DIGEU que albergan espacios.',
            self::TiposEspacio => 'Salón, auditorio, patio, cancha, sala...',
            self::Equipamientos => 'Equipo disponible en los espacios.',
            self::TiposActividad => 'Clasificación de las actividades de extensión.',
            self::LineasAccion => 'Líneas de acción institucionales.',
            self::PublicosObjetivo => 'Público al que se dirigen las actividades.',
            self::Indicadores => 'Indicadores institucionales y su unidad de medida.',
            self::Programas => 'Programas a los que responden los proyectos.',
            self::TiposProyecto => 'Clasificación de los proyectos.',
            self::FuentesFinanciamiento => 'Origen de los recursos del presupuesto.',
        };
    }

    /**
     * Campos que se capturan, en el orden en que se muestran.
     *
     * @return array<int, array{nombre: string, etiqueta: string, tipo: string, requerido: bool}>
     */
    public function campos(): array
    {
        $comunes = [
            ['nombre' => 'nombre', 'etiqueta' => 'Nombre', 'tipo' => 'texto', 'requerido' => true],
        ];

        $propios = match ($this) {
            self::Areas => [
                ['nombre' => 'slug', 'etiqueta' => 'Identificador', 'tipo' => 'texto', 'requerido' => true],
                ['nombre' => 'descripcion', 'etiqueta' => 'Descripción', 'tipo' => 'texto_largo', 'requerido' => false],
            ],
            self::Unidades, self::Programas => [
                ['nombre' => 'area_id', 'etiqueta' => 'Área', 'tipo' => 'seleccion', 'requerido' => false],
            ],
            self::Disciplinas => [
                ['nombre' => 'tipo', 'etiqueta' => 'Tipo', 'tipo' => 'seleccion', 'requerido' => true],
            ],
            self::Paises => [
                ['nombre' => 'codigo', 'etiqueta' => 'Código ISO', 'tipo' => 'texto', 'requerido' => true],
            ],
            self::Sedes => [
                ['nombre' => 'direccion', 'etiqueta' => 'Dirección', 'tipo' => 'texto', 'requerido' => false],
            ],
            self::Indicadores => [
                ['nombre' => 'unidad_medida', 'etiqueta' => 'Unidad de medida', 'tipo' => 'texto', 'requerido' => true],
                ['nombre' => 'descripcion', 'etiqueta' => 'Descripción', 'tipo' => 'texto_largo', 'requerido' => false],
            ],
            self::Agrupaciones, self::TiposEspacio, self::Equipamientos,
            self::TiposActividad, self::LineasAccion, self::PublicosObjetivo,
            self::TiposProyecto, self::FuentesFinanciamiento => [],
        };

        return [
            ...$comunes,
            ...$propios,
            ['nombre' => 'activo', 'etiqueta' => 'Activo', 'tipo' => 'booleano', 'requerido' => false],
        ];
    }

    /**
     * Opciones de los campos de selección.
     *
     * @return array<string, array<int, array{valor: string|int, nombre: string}>>
     */
    public function opciones(): array
    {
        return match ($this) {
            self::Unidades, self::Programas => [
                'area_id' => Area::query()
                    ->activas()
                    ->orderBy('nombre')
                    ->get()
                    ->map(fn (Area $area): array => ['valor' => $area->id, 'nombre' => $area->nombre])
                    ->all(),
            ],
            self::Disciplinas => ['tipo' => TipoPersona::opciones()],
            default => [],
        };
    }

    /**
     * @param  array<string, mixed>  $datos
     * @return array<string, array<int, mixed>>
     */
    public function reglas(?Model $registro = null, array $datos = []): array
    {
        $tabla = (new ($this->modelo()))->getTable();
        $id = $registro?->getKey();

        $reglas = [
            'activo' => ['boolean'],
        ];

        return match ($this) {
            self::Areas => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                'slug' => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique($tabla, 'slug')->ignore($id)],
                'descripcion' => ['nullable', 'string', 'max:1000'],
                ...$reglas,
            ],
            self::Unidades => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                'area_id' => ['nullable', 'integer', Rule::exists('areas', 'id')],
                ...$reglas,
            ],
            self::Disciplinas => [
                'nombre' => [
                    'required', 'string', 'max:255',
                    Rule::unique($tabla, 'nombre')
                        ->where('tipo', $datos['tipo'] ?? null)
                        ->ignore($id),
                ],
                'tipo' => ['required', Rule::enum(TipoPersona::class)],
                ...$reglas,
            ],
            self::Agrupaciones, self::TiposEspacio, self::Equipamientos,
            self::TiposActividad, self::LineasAccion, self::PublicosObjetivo,
            self::TiposProyecto, self::FuentesFinanciamiento => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                ...$reglas,
            ],
            self::Programas => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                'area_id' => ['nullable', 'integer', Rule::exists('areas', 'id')],
                ...$reglas,
            ],
            self::Indicadores => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                'unidad_medida' => ['required', 'string', 'max:100'],
                'descripcion' => ['nullable', 'string', 'max:1000'],
                ...$reglas,
            ],
            self::Sedes => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                'direccion' => ['nullable', 'string', 'max:255'],
                ...$reglas,
            ],
            self::Paises => [
                'nombre' => ['required', 'string', 'max:255', Rule::unique($tabla, 'nombre')->ignore($id)],
                'codigo' => ['required', 'string', 'size:2', 'alpha', Rule::unique($tabla, 'codigo')->ignore($id)],
                ...$reglas,
            ],
        };
    }

    /**
     * Relaciones que impiden eliminar un valor en uso (RF-T.04).
     *
     * @return array<int, string>
     */
    public function relacionesDeUso(): array
    {
        return match ($this) {
            self::Areas => ['unidades'],
            self::Unidades => ['usuarios'],
            self::Disciplinas, self::Agrupaciones, self::Paises => ['personas'],
            self::Sedes, self::TiposEspacio => ['espacios'],
            self::Equipamientos => ['espacios'],
            self::TiposActividad, self::LineasAccion, self::PublicosObjetivo, self::Indicadores => ['actividades'],
            self::Programas, self::TiposProyecto => ['proyectos'],
            self::FuentesFinanciamiento => ['presupuestos'],
        };
    }

    /**
     * @return array<int, self>
     */
    public static function administrables(): array
    {
        return self::cases();
    }
}
