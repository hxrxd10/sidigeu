<?php

namespace App\Actions\Actividades;

use App\Models\Actividad;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * Arma el archivo iCalendar (.ics) de una actividad publicada en la Agenda
 * Cultural, para que el público la agregue a su propio calendario (RF-1.04).
 *
 * El formato es el de la RFC 5545 y lo entienden Google Calendar, el calendario
 * de Apple y Outlook sin necesidad de una integración con cada uno.
 */
class InvitacionDeCalendario
{
    /**
     * Guatemala no cambia de hora, así que las fechas se escriben en UTC y se
     * evita tener que incluir la definición de la zona horaria en el archivo.
     */
    private const ZONA = 'America/Guatemala';

    public function para(Actividad $actividad): string
    {
        return $this->plegar([
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//USAC DIGEU//SIGEU//ES',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:'.$this->identificador($actividad),
            'DTSTAMP:'.$this->momento($actividad->updated_at ?? Carbon::now()),
            ...$this->fechas($actividad),
            'SUMMARY:'.$this->texto($actividad->nombre),
            ...$this->opcional('DESCRIPTION', $this->descripcion($actividad)),
            ...$this->opcional('LOCATION', $this->ubicacion($actividad)),
            'URL:'.$this->texto(route('publico.agenda', ['mes' => $actividad->fecha->format('Y-m')])),
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR',
        ]);
    }

    /**
     * Nombre con el que se descarga el archivo.
     */
    public function nombreDeArchivo(Actividad $actividad): string
    {
        $base = Str::slug($actividad->nombre);

        return ($base === '' ? 'actividad-'.$actividad->id : $base).'.ics';
    }

    /**
     * Fecha y hora del evento. Sin hora de inicio la actividad ocupa todo el
     * día; sin hora de finalización solo se anota cuándo empieza.
     *
     * @return array<int, string>
     */
    private function fechas(Actividad $actividad): array
    {
        if ($actividad->hora_inicio === null) {
            return [
                'DTSTART;VALUE=DATE:'.$actividad->fecha->format('Ymd'),
                'DTEND;VALUE=DATE:'.$actividad->fecha->copy()->addDay()->format('Ymd'),
            ];
        }

        $lineas = ['DTSTART:'.$this->momento($this->enZona($actividad, $actividad->hora_inicio))];

        if ($actividad->hora_fin !== null) {
            $lineas[] = 'DTEND:'.$this->momento($this->enZona($actividad, $actividad->hora_fin));
        }

        return $lineas;
    }

    private function enZona(Actividad $actividad, string $hora): Carbon
    {
        return Carbon::parse($actividad->fecha->format('Y-m-d').' '.$hora, self::ZONA);
    }

    private function momento(\DateTimeInterface $momento): string
    {
        return Carbon::instance($momento)->utc()->format('Ymd\THis\Z');
    }

    /**
     * Descripción visible en el calendario: el texto de la actividad y la
     * unidad que la organiza.
     */
    private function descripcion(Actividad $actividad): string
    {
        return collect([
            $actividad->descripcion,
            $actividad->unidad->nombre,
        ])->filter()->implode("\n\n");
    }

    /**
     * Ubicación lo más completa posible, para que el calendario pueda buscarla
     * en un mapa: del espacio del catálogo se toman también su ubicación
     * dentro de la sede y el nombre de la sede.
     */
    private function ubicacion(Actividad $actividad): string
    {
        $espacio = $actividad->espacio;

        if ($espacio === null) {
            return (string) $actividad->lugar_externo;
        }

        return collect([$espacio->nombre, $espacio->ubicacion, $espacio->sede->nombre])
            ->filter()
            ->implode(', ');
    }

    private function identificador(Actividad $actividad): string
    {
        $dominio = parse_url((string) config('app.url'), PHP_URL_HOST);

        return 'actividad-'.$actividad->id.'@'.(is_string($dominio) ? $dominio : 'sigeu.digeu.usac.edu.gt');
    }

    /**
     * @return array<int, string>
     */
    private function opcional(string $propiedad, ?string $valor): array
    {
        $valor = trim((string) $valor);

        return $valor === '' ? [] : [$propiedad.':'.$this->texto($valor)];
    }

    /**
     * Escapa los caracteres con significado propio dentro del formato.
     */
    private function texto(string $valor): string
    {
        return str_replace(
            ['\\', "\r\n", "\n", "\r", ';', ','],
            ['\\\\', '\n', '\n', '\n', '\;', '\,'],
            $valor,
        );
    }

    /**
     * Las líneas no pueden pasar de 75 octetos: las más largas se parten y
     * continúan en la siguiente con un espacio al inicio.
     *
     * @param  array<int, string>  $lineas
     */
    private function plegar(array $lineas): string
    {
        $salida = [];

        foreach ($lineas as $linea) {
            while (strlen($linea) > 75) {
                $corte = $this->corteSeguro($linea);
                $salida[] = substr($linea, 0, $corte);
                $linea = ' '.substr($linea, $corte);
            }

            $salida[] = $linea;
        }

        return implode("\r\n", $salida)."\r\n";
    }

    /**
     * Retrocede hasta el inicio del carácter UTF-8 para no partirlo a la mitad.
     */
    private function corteSeguro(string $linea): int
    {
        $corte = 75;

        while ($corte > 1 && (ord($linea[$corte]) & 0xC0) === 0x80) {
            $corte--;
        }

        return $corte;
    }
}
