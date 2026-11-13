<?php

namespace App\Http\Controllers\Publico;

use App\Http\Controllers\Controller;
use App\Models\Actividad;
use App\Models\Espacio;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

/**
 * Mapa del sitio para los buscadores.
 *
 * Lista solo lo que ya es público: la portada, la Agenda Cultural con sus
 * actividades publicadas y el catálogo de espacios. Nada de lo que vive detrás
 * del inicio de sesión aparece aquí.
 */
class SitemapController extends Controller
{
    /**
     * Secciones que viven detrás del inicio de sesión y no tiene sentido
     * rastrear.
     *
     * @var array<int, string>
     */
    private const PRIVADAS = [
        '/dashboard', '/actividades', '/proyectos', '/recurso-humano',
        '/gestion-espacios', '/solicitudes', '/calendario', '/catalogos',
        '/usuarios', '/bitacora', '/notificaciones', '/settings', '/buscar',
    ];

    public function __invoke(): Response
    {
        $enlaces = [
            ['url' => route('home'), 'cambio' => 'weekly', 'peso' => '1.0'],
            ['url' => route('publico.agenda'), 'cambio' => 'daily', 'peso' => '0.9'],
            ['url' => route('publico.espacios.index'), 'cambio' => 'monthly', 'peso' => '0.7'],
            ['url' => route('publico.solicitud.create'), 'cambio' => 'monthly', 'peso' => '0.5'],
        ];

        foreach ($this->actividades() as $actividad) {
            $enlaces[] = [
                'url' => route('publico.agenda.show', $actividad),
                'cambio' => 'weekly',
                'peso' => '0.8',
                'fecha' => $actividad->updated_at?->toAtomString(),
            ];
        }

        foreach (Espacio::query()->publicos()->get(['id', 'updated_at']) as $espacio) {
            $enlaces[] = [
                'url' => route('publico.espacios.show', $espacio),
                'cambio' => 'monthly',
                'peso' => '0.6',
                'fecha' => $espacio->updated_at?->toAtomString(),
            ];
        }

        return response($this->xml($enlaces), 200, ['Content-Type' => 'application/xml; charset=utf-8']);
    }

    /**
     * `robots.txt`. Se sirve desde aquí, y no como archivo estático, para que
     * la dirección del mapa del sitio salga completa con el dominio real de
     * cada despliegue.
     */
    public function robots(): Response
    {
        $lineas = [
            '# Universidad de San Carlos de Guatemala — DIGEU',
            '# Lo que está detrás del inicio de sesión no se indexa.',
            '',
            'User-agent: *',
            ...array_map(fn (string $ruta): string => 'Disallow: '.$ruta, self::PRIVADAS),
            'Allow: /',
            '',
            'Sitemap: '.route('publico.sitemap'),
            '',
        ];

        return response(implode("\n", $lineas), 200, ['Content-Type' => 'text/plain; charset=utf-8']);
    }

    /**
     * Las actividades del último año y las que vienen: una agenda de hace
     * cinco años no le sirve a nadie.
     *
     * @return Collection<int, Actividad>
     */
    private function actividades(): Collection
    {
        return Actividad::query()
            ->enAgenda()
            ->whereDate('fecha', '>=', Carbon::today()->subYear()->toDateString())
            ->orderByDesc('fecha')
            ->get(['id', 'updated_at']);
    }

    /**
     * @param  array<int, array<string, string|null>>  $enlaces
     */
    private function xml(array $enlaces): string
    {
        $cuerpo = '';

        foreach ($enlaces as $enlace) {
            $cuerpo .= '<url>'
                .'<loc>'.htmlspecialchars((string) $enlace['url'], ENT_XML1).'</loc>'
                .(isset($enlace['fecha']) ? '<lastmod>'.$enlace['fecha'].'</lastmod>' : '')
                .'<changefreq>'.$enlace['cambio'].'</changefreq>'
                .'<priority>'.$enlace['peso'].'</priority>'
                .'</url>';
        }

        return '<?xml version="1.0" encoding="UTF-8"?>'
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            .$cuerpo
            .'</urlset>';
    }
}
