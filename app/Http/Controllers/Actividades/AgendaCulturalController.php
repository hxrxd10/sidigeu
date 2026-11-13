<?php

namespace App\Http\Controllers\Actividades;

use App\Actions\Actividades\InvitacionDeCalendario;
use App\Enums\EstadoActividad;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\TipoActividad;
use App\Models\Unidad;
use Illuminate\Http\Request;
use Illuminate\Http\Response as RespuestaHttp;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Agenda Cultural: actividades validadas con bandera de publicación
 * (RF-1.03, RF-1.04). Es pública, como el catálogo de espacios.
 */
class AgendaCulturalController extends Controller
{
    public function index(Request $request): Response
    {
        $mes = $request->string('mes')->toString() ?: Carbon::today()->format('Y-m');
        $ancla = $this->ancla($mes);

        $filtros = [
            'mes' => $ancla->format('Y-m'),
            'unidad_id' => $request->integer('unidad_id'),
            'tipo_actividad_id' => $request->integer('tipo_actividad_id'),
            'espacio_id' => $request->integer('espacio_id'),
        ];

        $actividades = Actividad::query()
            ->enAgenda()
            ->with(['unidad:id,nombre', 'tipoActividad:id,nombre', 'espacio:id,nombre,sede_id', 'espacio.sede:id,nombre'])
            ->delMes((int) $ancla->format('Y'), (int) $ancla->format('n'))
            ->when($filtros['unidad_id'], fn ($query, $id) => $query->where('unidad_id', $id))
            ->when($filtros['tipo_actividad_id'], fn ($query, $id) => $query->where('tipo_actividad_id', $id))
            ->when($filtros['espacio_id'], fn ($query, $id) => $query->where('espacio_id', $id))
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get()
            ->map(fn (Actividad $actividad): array => $this->aTarjeta($actividad))
            ->all();

        return Inertia::render('publico/agenda/index', [
            'actividades' => $actividades,
            'filtros' => $filtros,
            'rango' => [
                'etiqueta' => $ancla->translatedFormat('F \d\e Y'),
                'anterior' => $ancla->copy()->subMonth()->format('Y-m'),
                'siguiente' => $ancla->copy()->addMonth()->format('Y-m'),
                'actual' => Carbon::today()->format('Y-m'),
            ],
            'meta' => [
                'titulo' => 'Agenda Cultural · '.Str::ucfirst($ancla->translatedFormat('F \d\e Y')),
                'descripcion' => 'Actividades artísticas, deportivas y de formación que la DIGEU abre a la '
                    .'comunidad universitaria y al público en '
                    .mb_strtolower($ancla->translatedFormat('F \d\e Y')).'.',
            ],
            'opciones' => [
                'unidades' => Unidad::query()->activas()->orderBy('nombre')->get()
                    ->map(fn (Unidad $unidad): array => ['valor' => $unidad->id, 'nombre' => $unidad->nombre])->all(),
                'tipos' => TipoActividad::query()->activos()->orderBy('nombre')->get()
                    ->map(fn (TipoActividad $tipo): array => ['valor' => $tipo->id, 'nombre' => $tipo->nombre])->all(),
                'espacios' => Espacio::query()->publicos()->orderBy('nombre')->get()
                    ->map(fn (Espacio $espacio): array => ['valor' => $espacio->id, 'nombre' => $espacio->nombre])->all(),
            ],
        ]);
    }

    /**
     * Ficha pública de una actividad de la agenda, con su propia dirección.
     *
     * Tener una dirección por actividad es lo que permite compartirla: al
     * pegar el enlace en WhatsApp o en Facebook, los metadatos que se arman
     * aquí hacen que salga con su título, su fecha y su lugar (RF-1.04).
     */
    public function show(Actividad $actividad): Response
    {
        abort_unless($this->estaEnLaAgenda($actividad), 404);

        $actividad->load([
            'unidad:id,nombre',
            'tipoActividad:id,nombre',
            'espacio:id,nombre,ubicacion,sede_id',
            'espacio.sede:id,nombre,direccion',
        ]);

        return Inertia::render('publico/agenda/show', [
            'actividad' => [
                ...$this->aTarjeta($actividad),
                'fecha_larga' => Str::ucfirst($actividad->fecha->translatedFormat('l d \d\e F \d\e Y')),
                'ubicacion' => $actividad->espacio?->ubicacion,
                'estado_nombre' => $actividad->estado->nombre(),
                'calendario' => route('publico.agenda.calendario', $actividad),
                'enlace' => route('publico.agenda.show', $actividad),
                'mes' => $actividad->fecha->format('Y-m'),
            ],
            'meta' => $this->metaDeLaActividad($actividad),
        ]);
    }

    /**
     * Archivo iCalendar de una actividad publicada, para agregarla al
     * calendario propio (RF-1.04). Solo se entrega lo que ya es público.
     */
    public function calendario(Actividad $actividad, InvitacionDeCalendario $invitacion): RespuestaHttp
    {
        abort_unless($this->estaEnLaAgenda($actividad), 404);

        return response($invitacion->para($actividad->load('unidad:id,nombre', 'espacio:id,nombre,ubicacion,sede_id', 'espacio.sede:id,nombre')), 200, [
            'Content-Type' => 'text/calendar; charset=utf-8',
            'Content-Disposition' => 'attachment; filename="'.$invitacion->nombreDeArchivo($actividad).'"',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function aTarjeta(Actividad $actividad): array
    {
        return [
            'id' => $actividad->id,
            'nombre' => $actividad->nombre,
            'descripcion' => $actividad->descripcion,
            'fecha' => $actividad->fecha->toDateString(),
            'dia' => $actividad->fecha->translatedFormat('D d'),
            'hora_inicio' => $actividad->horaInicioCorta(),
            'hora_fin' => $actividad->horaFinCorta(),
            'lugar' => $actividad->lugar,
            'sede' => $actividad->espacio?->sede->nombre,
            'unidad' => $actividad->unidad->nombre,
            'tipo' => $actividad->tipoActividad->nombre,
            'estado' => $actividad->estado->value,
        ];
    }

    private function estaEnLaAgenda(Actividad $actividad): bool
    {
        return Actividad::query()->enAgenda()->whereKey($actividad->id)->exists();
    }

    /**
     * Metadatos para compartir y para los buscadores. El bloque `estructurado`
     * es un evento de schema.org: con él Google puede mostrar la actividad con
     * su fecha y su lugar.
     *
     * @return array<string, mixed>
     */
    private function metaDeLaActividad(Actividad $actividad): array
    {
        $cuando = Str::ucfirst($actividad->fecha->translatedFormat('l d \d\e F'));
        $hora = $actividad->horaInicioCorta();

        $resumen = trim((string) $actividad->descripcion) !== ''
            ? (string) $actividad->descripcion
            : $actividad->tipoActividad->nombre.' organizado por '.$actividad->unidad->nombre.'.';

        return [
            'titulo' => $actividad->nombre,
            'descripcion' => $cuando.($hora === null ? '' : ', '.$hora).' · '.$actividad->lugar.'. '.$resumen,
            'tipo' => 'article',
            'estructurado' => array_filter([
                '@context' => 'https://schema.org',
                '@type' => 'Event',
                'name' => $actividad->nombre,
                'description' => $resumen,
                'startDate' => $this->enIso($actividad, $actividad->hora_inicio),
                'endDate' => $actividad->hora_fin === null
                    ? null
                    : $this->enIso($actividad, $actividad->hora_fin),
                'eventStatus' => $actividad->estado === EstadoActividad::Reprogramada
                    ? 'https://schema.org/EventRescheduled'
                    : 'https://schema.org/EventScheduled',
                'eventAttendanceMode' => 'https://schema.org/OfflineEventAttendanceMode',
                'isAccessibleForFree' => true,
                'url' => route('publico.agenda.show', $actividad),
                'image' => [url('/images/og-sigeu.png')],
                'location' => array_filter([
                    '@type' => 'Place',
                    'name' => $actividad->lugar,
                    'address' => $actividad->espacio?->sede->direccion
                        ?? $actividad->espacio?->sede->nombre
                        ?? 'Guatemala',
                ]),
                'organizer' => [
                    '@type' => 'Organization',
                    'name' => $actividad->unidad->nombre.' · DIGEU, Universidad de San Carlos de Guatemala',
                    'url' => route('publico.agenda'),
                ],
            ]),
        ];
    }

    /**
     * Fecha y hora con la zona de Guatemala, como la espera schema.org.
     */
    private function enIso(Actividad $actividad, ?string $hora): string
    {
        if ($hora === null) {
            return $actividad->fecha->toDateString();
        }

        return Carbon::parse($actividad->fecha->format('Y-m-d').' '.$hora, 'America/Guatemala')
            ->toIso8601String();
    }

    private function ancla(string $mes): Carbon
    {
        try {
            return Carbon::createFromFormat('Y-m', $mes)->startOfMonth();
        } catch (\Exception) {
            return Carbon::today()->startOfMonth();
        }
    }
}
