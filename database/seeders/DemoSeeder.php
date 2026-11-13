<?php

namespace Database\Seeders;

use App\Enums\EstadoActividad;
use App\Enums\EstadoProyecto;
use App\Enums\EstadoSolicitud;
use App\Enums\RangoEdad;
use App\Enums\Rol;
use App\Enums\SexoBeneficiario;
use App\Enums\TipoPersona;
use App\Models\Actividad;
use App\Models\Area;
use App\Models\Disciplina;
use App\Models\Espacio;
use App\Models\Indicador;
use App\Models\LineaAccion;
use App\Models\Pais;
use App\Models\PersonaRecursoHumano;
use App\Models\Proyecto;
use App\Models\PublicoObjetivo;
use App\Models\Role;
use App\Models\SolicitudEspacio;
use App\Models\TipoActividad;
use App\Models\TipoProyecto;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

/**
 * Datos de demostración para recorrer el sistema: unidades, usuarios de cada
 * rol, actividades en todos sus estados, un proyecto en ejecución, padrón de
 * recurso humano y una solicitud de espacio pendiente.
 *
 * No forma parte de `db:seed`. Se ejecuta a propósito con
 * `php artisan db:seed --class=DemoSeeder` y se puede repetir sin duplicar
 * nada. Nunca debe correrse en el servidor de producción.
 */
class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $unidades = $this->unidades();
        $usuarios = $this->usuarios($unidades);

        $this->recursoHumano();
        $this->actividades($unidades, $usuarios);
        $this->proyecto($unidades, $usuarios);
        $this->solicitud();
    }

    /**
     * Una unidad por área de la DIGEU.
     *
     * @return array<string, Unidad>
     */
    private function unidades(): array
    {
        $porArea = [
            'Unidad de Cultura' => 'Cultura',
            'Unidad de Deportes' => 'Deporte',
            'Unidad de Formación' => 'Formación y actualización',
            'Unidad de Vinculación' => 'Vinculación con la sociedad',
        ];

        $unidades = [];

        foreach ($porArea as $nombre => $area) {
            $unidades[$nombre] = Unidad::firstOrCreate(
                ['nombre' => $nombre],
                ['area_id' => Area::where('nombre', $area)->value('id'), 'activo' => true],
            );
        }

        return $unidades;
    }

    /**
     * Un usuario por rol, todos con la contraseña `password`.
     *
     * @param  array<string, Unidad>  $unidades
     * @return array<string, User>
     */
    private function usuarios(array $unidades): array
    {
        $definiciones = [
            'cultura@digeu.test' => ['Rosa Alvarado', Rol::CoordinadorUnidad, 'Unidad de Cultura'],
            'deportes@digeu.test' => ['Mario Chávez', Rol::CoordinadorUnidad, 'Unidad de Deportes'],
            'validacion@digeu.test' => ['Ana Paredes', Rol::Validador, null],
            'direccion@digeu.test' => ['Luis Barrios', Rol::Direccion, null],
            'espacios@digeu.test' => ['Carmen Ixcot', Rol::AdministradorEspacios, null],
            'padron@digeu.test' => ['Jorge Monzón', Rol::GestorRecursoHumano, null],
            'consulta@digeu.test' => ['Elena Rivas', Rol::Consulta, null],
        ];

        $usuarios = [];

        foreach ($definiciones as $correo => [$nombre, $rol, $unidad]) {
            $usuario = User::firstOrCreate(
                ['email' => $correo],
                [
                    'name' => $nombre,
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'unidad_id' => $unidad === null ? null : $unidades[$unidad]->id,
                    'activo' => true,
                ],
            );

            $usuario->roles()->sync(Role::where('slug', $rol->value)->pluck('id'));
            $usuarios[$correo] = $usuario;
        }

        return $usuarios;
    }

    /**
     * Padrón de artistas y deportistas, uno de ellos dado de baja.
     */
    private function recursoHumano(): void
    {
        $guatemala = Pais::where('nombre', 'Guatemala')->value('id') ?? Pais::value('id');

        $personas = [
            ['Ingrid', 'Castañeda', TipoPersona::Artista, 'Marimba', '1990-04-12', true],
            ['Byron', 'Sosa', TipoPersona::Artista, 'Teatro', '1986-09-03', true],
            ['Lucía', 'Ramírez', TipoPersona::Artista, 'Danza folklórica', '1995-01-28', true],
            ['Héctor', 'Pineda', TipoPersona::Deportista, 'Fútbol', '1998-07-15', true],
            ['Sofía', 'Gómez', TipoPersona::Deportista, 'Atletismo', '1993-11-02', false],
        ];

        foreach ($personas as [$nombres, $apellidos, $tipo, $disciplina, $nacimiento, $activo]) {
            PersonaRecursoHumano::firstOrCreate(
                ['nombres' => $nombres, 'apellidos' => $apellidos],
                [
                    'tipo' => $tipo,
                    'disciplina_id' => Disciplina::where('nombre', $disciplina)->value('id') ?? Disciplina::value('id'),
                    'pais_id' => $guatemala,
                    'fecha_nacimiento' => $nacimiento,
                    'fecha_alta' => Carbon::today()->subYears(2)->toDateString(),
                    'activo' => $activo,
                    'fecha_baja' => $activo ? null : Carbon::today()->subMonths(3)->toDateString(),
                    'motivo_baja' => $activo ? null : 'Cierre de contrato.',
                ],
            );
        }
    }

    /**
     * Actividades del mes en curso, una por cada estado del ciclo de vida.
     *
     * @param  array<string, Unidad>  $unidades
     * @param  array<string, User>  $usuarios
     */
    private function actividades(array $unidades, array $usuarios): void
    {
        $mes = Carbon::today()->startOfMonth();
        $salon = Espacio::where('nombre', 'Salón Mayor')->first();
        $cancha = Espacio::where('nombre', 'Fútbol 11')->first();

        $definiciones = [
            [
                'nombre' => 'Concierto de marimba: Música de Guatemala',
                'unidad' => 'Unidad de Cultura',
                'correo' => 'cultura@digeu.test',
                'dia' => 17,
                'horas' => ['16:00:00', '19:00:00'],
                'espacio' => null,
                'lugar_externo' => 'Parque Central, Ciudad de Guatemala',
                'tipo' => 'Concierto',
                'linea' => 'Difusión cultural',
                'estado' => EstadoActividad::PublicadaAgenda,
                'agenda' => true,
                'descripcion' => 'Presentación de la marimba universitaria con repertorio guatemalteco. Entrada libre.',
            ],
            [
                'nombre' => 'Exposición de fotografía universitaria',
                'unidad' => 'Unidad de Cultura',
                'correo' => 'cultura@digeu.test',
                'dia' => 20,
                'horas' => [null, null],
                'espacio' => $salon,
                'lugar_externo' => null,
                'tipo' => 'Exposición',
                'linea' => 'Difusión cultural',
                'estado' => EstadoActividad::PublicadaAgenda,
                'agenda' => true,
                'descripcion' => 'Muestra abierta todo el día con trabajos de estudiantes de la USAC.',
            ],
            [
                'nombre' => 'Torneo relámpago de fútbol',
                'unidad' => 'Unidad de Deportes',
                'correo' => 'deportes@digeu.test',
                'dia' => 22,
                'horas' => ['08:00:00', '13:00:00'],
                'espacio' => $cancha,
                'lugar_externo' => null,
                'tipo' => 'Competencia deportiva',
                'linea' => 'Promoción del deporte',
                'estado' => EstadoActividad::PublicadaAgenda,
                'agenda' => true,
                'descripcion' => 'Encuentro abierto a equipos de las unidades académicas.',
            ],
            [
                'nombre' => 'Taller de redacción académica',
                'unidad' => 'Unidad de Formación',
                'correo' => 'cultura@digeu.test',
                'dia' => 19,
                'horas' => ['09:00:00', '12:00:00'],
                'espacio' => null,
                'lugar_externo' => 'Sala de capacitación de la DIGEU',
                'tipo' => 'Taller',
                'linea' => 'Formación y actualización',
                'estado' => EstadoActividad::Validada,
                'agenda' => false,
                'descripcion' => 'Actividad interna del personal: validada, pero no se publica en la agenda.',
            ],
            [
                'nombre' => 'Conversatorio sobre extensión universitaria',
                'unidad' => 'Unidad de Vinculación',
                'correo' => 'cultura@digeu.test',
                'dia' => 25,
                'horas' => ['15:00:00', '17:00:00'],
                'espacio' => null,
                'lugar_externo' => 'Auditorio de la Facultad de Humanidades',
                'tipo' => 'Conversatorio',
                'linea' => 'Vinculación con la sociedad',
                'estado' => EstadoActividad::Enviada,
                'agenda' => true,
                'descripcion' => 'Pendiente de validación: aparece en la bandeja de revisión.',
            ],
            [
                'nombre' => 'Jornada de salud comunitaria',
                'unidad' => 'Unidad de Vinculación',
                'correo' => 'cultura@digeu.test',
                'dia' => 6,
                'horas' => ['07:00:00', '15:00:00'],
                'espacio' => null,
                'lugar_externo' => 'Aldea El Rosario, Villa Nueva',
                'tipo' => 'Jornada comunitaria',
                'linea' => 'Vinculación con la sociedad',
                'estado' => EstadoActividad::Cerrada,
                'agenda' => true,
                'descripcion' => 'Actividad ya ejecutada, con beneficiarios e indicadores registrados.',
            ],
            [
                'nombre' => 'Curso libre de guitarra',
                'unidad' => 'Unidad de Cultura',
                'correo' => 'cultura@digeu.test',
                'dia' => 27,
                'horas' => ['17:00:00', '19:00:00'],
                'espacio' => null,
                'lugar_externo' => 'Sala de Música de la DIGEU',
                'tipo' => 'Curso',
                'linea' => 'Formación y actualización',
                'estado' => EstadoActividad::Borrador,
                'agenda' => false,
                'descripcion' => 'Borrador en preparación por la unidad.',
            ],
        ];

        foreach ($definiciones as $fila) {
            $actividad = Actividad::firstOrCreate(
                ['nombre' => $fila['nombre']],
                [
                    'unidad_id' => $unidades[$fila['unidad']]->id,
                    'responsable_id' => $usuarios[$fila['correo']]->id,
                    'creado_por' => $usuarios[$fila['correo']]->id,
                    'fecha' => $mes->copy()->addDays($fila['dia'] - 1)->toDateString(),
                    'hora_inicio' => $fila['horas'][0],
                    'hora_fin' => $fila['horas'][1],
                    'espacio_id' => $fila['espacio']?->id,
                    'lugar_externo' => $fila['lugar_externo'],
                    'tipo_actividad_id' => TipoActividad::where('nombre', $fila['tipo'])->value('id'),
                    'linea_accion_id' => LineaAccion::where('nombre', $fila['linea'])->value('id'),
                    'publicar_agenda' => $fila['agenda'],
                    'estado' => $fila['estado'],
                    'descripcion' => $fila['descripcion'],
                ],
            );

            if (! $actividad->wasRecentlyCreated) {
                continue;
            }

            $actividad->publicosObjetivo()->sync(
                PublicoObjetivo::whereIn('nombre', ['Estudiantes universitarios', 'Comunidad en general'])->pluck('id')
            );

            $this->cerrarSiCorresponde($actividad, $fila['estado']);
            $this->reservarSiCorresponde($actividad, $fila['espacio'], $fila['estado']);
        }
    }

    /**
     * La actividad cerrada lleva resultados, beneficiarios e indicadores.
     */
    private function cerrarSiCorresponde(Actividad $actividad, EstadoActividad $estado): void
    {
        if ($estado !== EstadoActividad::Cerrada) {
            return;
        }

        $actividad->update([
            'resultados' => 'Se atendió a 180 personas con servicios de salud preventiva y orientación.',
            'fecha_cierre' => now(),
        ]);

        $beneficiarios = [
            [SexoBeneficiario::Mujer, RangoEdad::Juventud, 70],
            [SexoBeneficiario::Hombre, RangoEdad::Juventud, 55],
            [SexoBeneficiario::Mujer, RangoEdad::Adultez, 35],
            [SexoBeneficiario::Hombre, RangoEdad::Adultez, 20],
        ];

        foreach ($beneficiarios as [$sexo, $rango, $cantidad]) {
            $actividad->beneficiarios()->create([
                'sexo' => $sexo,
                'rango_edad' => $rango,
                'cantidad' => $cantidad,
            ]);
        }

        $indicador = Indicador::where('nombre', 'Personas beneficiadas')->first();

        if ($indicador !== null) {
            $actividad->indicadores()->syncWithoutDetaching([
                $indicador->id => ['valor_meta' => 150, 'valor_alcanzado' => 180],
            ]);
        }
    }

    /**
     * Las actividades en un espacio propio bloquean el horario en el calendario.
     */
    private function reservarSiCorresponde(Actividad $actividad, ?Espacio $espacio, EstadoActividad $estado): void
    {
        if ($espacio === null || $actividad->hora_inicio === null || $actividad->hora_fin === null) {
            return;
        }

        $actividad->reservas()->create([
            'espacio_id' => $espacio->id,
            'fecha' => $actividad->fecha->toDateString(),
            'hora_inicio' => $actividad->hora_inicio,
            'hora_fin' => $actividad->hora_fin,
            'solicitante_nombre' => $actividad->unidad->nombre,
            'institucion' => 'DIGEU',
            'correo' => 'digeu@usac.edu.gt',
            'proposito' => $actividad->nombre,
            'estado' => $estado->esEditable() ? EstadoSolicitud::Pendiente : EstadoSolicitud::Aprobada,
            'solicitado_por' => $actividad->creado_por,
        ]);
    }

    /**
     * Un proyecto en ejecución con objetivos, cronograma e indicadores.
     *
     * @param  array<string, Unidad>  $unidades
     * @param  array<string, User>  $usuarios
     */
    private function proyecto(array $unidades, array $usuarios): void
    {
        $proyecto = Proyecto::firstOrCreate(
            ['nombre' => 'Escuela de formación artística comunitaria'],
            [
                'unidad_id' => $unidades['Unidad de Cultura']->id,
                'responsable_id' => $usuarios['cultura@digeu.test']->id,
                'creado_por' => $usuarios['cultura@digeu.test']->id,
                'area_id' => Area::where('nombre', 'Cultura')->value('id'),
                'linea_accion_id' => LineaAccion::where('nombre', 'Difusión cultural')->value('id'),
                'tipo_proyecto_id' => TipoProyecto::where('nombre', 'Proyecto cultural')->value('id'),
                'justificacion' => 'Acercar la formación artística a comunidades sin acceso a oferta cultural.',
                'objetivo_general' => 'Formar a 200 personas en disciplinas artísticas durante el año.',
                'fecha_inicio' => Carbon::today()->startOfYear()->toDateString(),
                'fecha_fin' => Carbon::today()->endOfYear()->toDateString(),
                'estado' => EstadoProyecto::EnEjecucion,
            ],
        );

        if (! $proyecto->wasRecentlyCreated) {
            return;
        }

        foreach ([
            'Instalar tres sedes comunitarias de formación artística.',
            'Formar a 200 personas en música, danza y teatro.',
            'Presentar una muestra final abierta al público.',
        ] as $orden => $descripcion) {
            $proyecto->objetivos()->create(['descripcion' => $descripcion, 'orden' => $orden]);
        }

        foreach ([
            ['Convocatoria y selección de participantes', 100],
            ['Ciclo de talleres en las sedes comunitarias', 60],
            ['Muestra final y memoria del proyecto', 0],
        ] as $orden => [$tarea, $avance]) {
            $proyecto->cronograma()->create([
                'tarea' => $tarea,
                'orden' => $orden,
                'avance' => $avance,
                'fecha_inicio' => Carbon::today()->startOfYear()->addMonths($orden * 4)->toDateString(),
                'fecha_fin' => Carbon::today()->startOfYear()->addMonths(($orden + 1) * 4)->toDateString(),
            ]);
        }

        $indicador = Indicador::where('nombre', 'Personas beneficiadas')->first();

        if ($indicador !== null) {
            $proyecto->indicadores()->syncWithoutDetaching([
                $indicador->id => ['linea_base' => 0, 'meta' => 200, 'valor_final' => null],
            ]);
        }
    }

    /**
     * Una solicitud pública de espacio pendiente de resolver.
     */
    private function solicitud(): void
    {
        $espacio = Espacio::where('nombre', 'Auditorio')->first() ?? Espacio::first();

        if ($espacio === null) {
            return;
        }

        SolicitudEspacio::firstOrCreate(
            ['correo' => 'asociacion@ejemplo.org', 'espacio_id' => $espacio->id],
            [
                'fecha' => Carbon::today()->addWeeks(2)->toDateString(),
                'hora_inicio' => '14:00:00',
                'hora_fin' => '17:00:00',
                'solicitante_nombre' => 'Patricia Set',
                'institucion' => 'Asociación Cultural Xelajú',
                'telefono' => '5555-0000',
                'proposito' => 'Presentación de un documental sobre tradiciones del altiplano.',
                'asistentes' => 120,
                'requerimientos' => 'Proyector y sonido.',
                'estado' => EstadoSolicitud::Pendiente,
            ],
        );
    }
}
