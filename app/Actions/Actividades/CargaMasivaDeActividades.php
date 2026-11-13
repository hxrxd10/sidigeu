<?php

namespace App\Actions\Actividades;

use App\Actions\Espacios\VerificarDisponibilidad;
use App\Actions\HojasDeCalculo\CargaMasiva;
use App\Actions\HojasDeCalculo\EscribirLibro;
use App\Actions\HojasDeCalculo\LeerHoja;
use App\Models\Espacio;
use App\Models\LineaAccion;
use App\Models\TipoActividad;
use App\Models\Unidad;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;

/**
 * Carga masiva de la programación de actividades (RF-1.01).
 *
 * Sirve para subir la programación de todo un mes o un semestre de una sola
 * vez. Las actividades entran en borrador, igual que si se registraran una por
 * una, y siguen después el mismo circuito de revisión y validación.
 *
 * La plantilla lleva listas desplegables con los catálogos, y la revisión
 * previa avisa de los choques de horario —tanto con lo ya reservado como entre
 * las filas del propio archivo— antes de guardar nada.
 */
class CargaMasivaDeActividades extends CargaMasiva
{
    public function __construct(
        LeerHoja $lector,
        EscribirLibro $escritor,
        private GuardarActividad $guardar,
        private VerificarDisponibilidad $disponibilidad,
    ) {
        parent::__construct($lector, $escritor);
    }

    public function nombre(): string
    {
        return 'Actividades';
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function columnas(): array
    {
        return [
            ['titulo' => 'Nombre de la actividad', 'clave' => 'nombre', 'requerida' => true, 'ancho' => 38, 'ejemplo' => 'Concierto de marimba'],
            ['titulo' => 'Fecha', 'clave' => 'fecha', 'requerida' => true, 'ancho' => 14, 'ejemplo' => '15-03-2026'],
            ['titulo' => 'Hora de inicio', 'clave' => 'hora_inicio', 'ancho' => 15, 'ejemplo' => '17:00'],
            ['titulo' => 'Hora de finalización', 'clave' => 'hora_fin', 'ancho' => 19, 'ejemplo' => '19:00'],
            ['titulo' => 'Unidad', 'clave' => 'unidad', 'lista' => 'Unidades', 'requerida' => true, 'ancho' => 30, 'ejemplo' => ''],
            ['titulo' => 'Tipo de actividad', 'clave' => 'tipo_actividad', 'lista' => 'Tipos', 'requerida' => true, 'ancho' => 26, 'ejemplo' => ''],
            ['titulo' => 'Línea de acción', 'clave' => 'linea_accion', 'lista' => 'Lineas', 'requerida' => true, 'ancho' => 30, 'ejemplo' => ''],
            ['titulo' => 'Espacio', 'clave' => 'espacio', 'lista' => 'Espacios', 'ancho' => 30, 'ejemplo' => ''],
            ['titulo' => 'Lugar externo', 'clave' => 'lugar_externo', 'ancho' => 30, 'ejemplo' => ''],
            ['titulo' => 'Responsable', 'clave' => 'responsable', 'lista' => 'Responsables', 'ancho' => 26, 'ejemplo' => ''],
            ['titulo' => 'Publicar en la Agenda Cultural', 'clave' => 'publicar_agenda', 'lista' => 'SiNo', 'ancho' => 30, 'ejemplo' => 'No'],
            ['titulo' => 'Descripción', 'clave' => 'descripcion', 'ancho' => 48, 'ejemplo' => ''],
        ];
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function listas(User $usuario): array
    {
        return [
            'Unidades' => $this->unidades($usuario)->values()->all(),
            'Tipos' => TipoActividad::query()->activos()->orderBy('nombre')->pluck('nombre')->all(),
            'Lineas' => LineaAccion::query()->activos()->orderBy('nombre')->pluck('nombre')->all(),
            'Espacios' => Espacio::query()->reservables()->orderBy('nombre')->pluck('nombre')->all(),
            'Responsables' => $this->responsables($usuario)->values()->all(),
            'SiNo' => ['Sí', 'No'],
        ];
    }

    /**
     * @return array<int, string>
     */
    public function instrucciones(): array
    {
        return [
            'Carga masiva de la programación de actividades',
            '',
            'Llene una fila por actividad a partir de la fila 2 de la hoja «Actividades». La fila de ejemplo puede sobrescribirse.',
            'Las columnas Unidad, Tipo de actividad, Línea de acción, Espacio, Responsable y Publicar tienen lista desplegable: elija el valor, no lo escriba.',
            'Las fechas van como dd-mm-aaaa y las horas como HH:MM en formato de 24 horas.',
            'Toda actividad necesita un lugar: un espacio del catálogo o un lugar externo. Si elige un espacio, la hora de inicio y la de finalización son obligatorias, porque se reserva.',
            'Si la actividad es fuera de las instalaciones de la DIGEU, deje el espacio vacío y escriba el lugar en «Lugar externo».',
            'Los públicos objetivo y las metas por indicador no se cargan aquí: se agregan después en la ficha de cada actividad.',
            'Las actividades entran en borrador; desde el listado se envían a revisión como siempre.',
            'Al subir el archivo se muestra fila por fila qué entra y qué no, incluidos los choques de horario. Nada se guarda hasta que usted confirme.',
        ];
    }

    /**
     * @param  array<string, string>  $fila
     * @return array{datos: array<string, mixed>, errores: array<string, string>}
     */
    protected function normalizar(array $fila, User $usuario): array
    {
        $errores = [];

        $unidadId = $this->enCatalogo($fila['unidad'], $this->unidades($usuario)->flip()->all());

        if ($unidadId === null) {
            $errores['unidad_id'] = $fila['unidad'] === ''
                ? 'Unidad: indique la unidad responsable.'
                : 'Unidad: «'.$fila['unidad'].'» no está entre las unidades que puede programar.';
        }

        $tipoId = $this->enCatalogo($fila['tipo_actividad'], TipoActividad::query()->pluck('id', 'nombre')->all());

        if ($tipoId === null) {
            $errores['tipo_actividad_id'] = $fila['tipo_actividad'] === ''
                ? 'Tipo de actividad: indique el tipo.'
                : 'Tipo de actividad: «'.$fila['tipo_actividad'].'» no está en el catálogo.';
        }

        $lineaId = $this->enCatalogo($fila['linea_accion'], LineaAccion::query()->pluck('id', 'nombre')->all());

        if ($lineaId === null) {
            $errores['linea_accion_id'] = $fila['linea_accion'] === ''
                ? 'Línea de acción: indique la línea.'
                : 'Línea de acción: «'.$fila['linea_accion'].'» no está en el catálogo.';
        }

        $espacioId = null;

        if ($fila['espacio'] !== '') {
            $espacioId = $this->enCatalogo($fila['espacio'], Espacio::query()->pluck('id', 'nombre')->all());

            if ($espacioId === null) {
                $errores['espacio_id'] = 'Espacio: «'.$fila['espacio'].'» no está en el catálogo.';
            }
        }

        $responsableId = null;

        if ($fila['responsable'] !== '') {
            $responsableId = $this->enCatalogo($fila['responsable'], $this->responsables($usuario)->flip()->all());

            if ($responsableId === null) {
                $errores['responsable_id'] = 'Responsable: «'.$fila['responsable']
                    .'» no es un usuario activo de esa unidad.';
            }
        }

        $fecha = $this->comoFecha($fila['fecha']);

        if ($fila['fecha'] !== '' && $fecha === null) {
            $errores['fecha'] = 'Fecha: «'.$fila['fecha'].'» no es una fecha válida (use dd-mm-aaaa).';
        }

        $horaInicio = $this->comoHora($fila['hora_inicio']);
        $horaFin = $this->comoHora($fila['hora_fin']);

        foreach (['hora_inicio' => 'Hora de inicio', 'hora_fin' => 'Hora de finalización'] as $campo => $etiqueta) {
            if ($fila[$campo] !== '' && $this->comoHora($fila[$campo]) === null) {
                $errores[$campo] = $etiqueta.': «'.$fila[$campo].'» no es una hora válida (use HH:MM).';
            }
        }

        $lugarExterno = trim($fila['lugar_externo']);

        if ($espacioId === null && $lugarExterno === '') {
            $errores['lugar_externo'] = 'Lugar: indique un espacio del catálogo o un lugar externo.';
        }

        if ($espacioId !== null && ($horaInicio === null || $horaFin === null)) {
            $errores['horario'] = 'Horario: para reservar un espacio debe indicar la hora de inicio '
                .'y la de finalización.';
        }

        $datos = [
            'nombre' => $fila['nombre'],
            'fecha' => $fecha,
            'hora_inicio' => $horaInicio === null ? null : $horaInicio.':00',
            'hora_fin' => $horaFin === null ? null : $horaFin.':00',
            'unidad_id' => $unidadId,
            'tipo_actividad_id' => $tipoId,
            'linea_accion_id' => $lineaId,
            'espacio_id' => $espacioId,
            'lugar_externo' => $lugarExterno === '' ? null : $lugarExterno,
            'responsable_id' => $responsableId,
            'publicar_agenda' => $this->comoBooleano($fila['publicar_agenda']),
            'descripcion' => trim($fila['descripcion']) === '' ? null : trim($fila['descripcion']),
        ];

        return [
            'datos' => $datos,
            'errores' => [...$errores, ...$this->erroresDeEspacio($datos)],
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function atributos(): array
    {
        return [
            'nombre' => 'nombre de la actividad',
            'fecha' => 'fecha',
            'hora_inicio' => 'hora de inicio',
            'hora_fin' => 'hora de finalización',
            'unidad_id' => 'unidad',
            'tipo_actividad_id' => 'tipo de actividad',
            'linea_accion_id' => 'línea de acción',
            'espacio_id' => 'espacio',
            'lugar_externo' => 'lugar externo',
            'responsable_id' => 'responsable',
            'descripcion' => 'descripción',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function reglas(User $usuario): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'hora_inicio' => ['nullable', 'date_format:H:i:s'],
            'hora_fin' => ['nullable', 'date_format:H:i:s', 'after:hora_inicio'],
            'unidad_id' => ['required', 'integer', Rule::exists('unidades', 'id')],
            'tipo_actividad_id' => ['required', 'integer', Rule::exists('tipos_actividad', 'id')],
            'linea_accion_id' => ['required', 'integer', Rule::exists('lineas_accion', 'id')],
            'espacio_id' => ['nullable', 'integer', Rule::exists('espacios', 'id')],
            'lugar_externo' => ['nullable', 'string', 'max:255'],
            'responsable_id' => ['nullable', 'integer', Rule::exists('users', 'id')],
            'descripcion' => ['nullable', 'string', 'max:2000'],
        ];
    }

    /**
     * Dos filas del mismo archivo que piden el mismo espacio a la misma hora.
     * Sin esto el choque aparecería hasta el momento de guardar, cuando ya se
     * creó la primera.
     *
     * @param  array<string, mixed>  $datos
     * @param  array<int, array<string, mixed>>  $anteriores
     * @return array<int, string>
     */
    protected function erroresAdicionales(array $datos, array $anteriores, User $usuario): array
    {
        if ($datos['espacio_id'] === null || $datos['hora_inicio'] === null || $datos['hora_fin'] === null) {
            return [];
        }

        $choque = collect($anteriores)->first(fn (array $fila): bool => $fila['espacio_id'] === $datos['espacio_id']
            && $fila['fecha'] === $datos['fecha']
            && $fila['hora_inicio'] !== null
            && $fila['hora_fin'] !== null
            && $fila['hora_inicio'] < $datos['hora_fin']
            && $datos['hora_inicio'] < $fila['hora_fin']);

        return $choque === null
            ? []
            : ['Espacio: otra fila de este archivo ya pidió ese espacio a esa hora («'.$choque['nombre'].'»).'];
    }

    /**
     * @param  array<string, mixed>  $datos
     */
    protected function guardar(array $datos, User $usuario): void
    {
        $this->guardar->crear($datos, [], [], $usuario);
    }

    /**
     * Choques con lo que ya está reservado y espacios que no admiten reservas.
     *
     * @param  array<string, mixed>  $datos
     * @return array<string, string>
     */
    private function erroresDeEspacio(array $datos): array
    {
        if ($datos['espacio_id'] === null || $datos['fecha'] === null
            || $datos['hora_inicio'] === null || $datos['hora_fin'] === null) {
            return [];
        }

        $espacio = Espacio::query()->find($datos['espacio_id']);

        if (! $espacio instanceof Espacio) {
            return [];
        }

        if (! $espacio->estado->admiteReservas()) {
            return ['espacio_id' => 'Espacio: «'.$espacio->nombre
                .'» no admite reservas (está inactivo o en mantenimiento).'];
        }

        $conflictos = $this->disponibilidad->conflictos(
            $espacio->id,
            $datos['fecha'],
            $datos['hora_inicio'],
            $datos['hora_fin'],
        );

        if ($conflictos->isEmpty()) {
            return [];
        }

        return ['espacio_id' => 'Espacio: «'.$espacio->nombre.'» ya está reservado el '
            .Carbon::parse($datos['fecha'])->format('d-m-Y')
            .' de '.$conflictos->first()->horaInicioCorta()
            .' a '.$conflictos->first()->horaFinCorta().'.'];
    }

    /**
     * Unidades en las que el usuario puede programar: la suya, o todas si su
     * rol tiene alcance global.
     *
     * @return Collection<int, string>
     */
    private function unidades(User $usuario): Collection
    {
        return Unidad::query()
            ->activas()
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->whereKey($usuario->unidad_id)
            )
            ->orderBy('nombre')
            ->pluck('nombre', 'id');
    }

    /**
     * @return Collection<int, string>
     */
    private function responsables(User $usuario): Collection
    {
        return User::query()
            ->activos()
            ->when(
                ! $usuario->tieneAlcanceGlobal(),
                fn ($query) => $query->where('unidad_id', $usuario->unidad_id)
            )
            ->orderBy('name')
            ->pluck('name', 'id');
    }
}
