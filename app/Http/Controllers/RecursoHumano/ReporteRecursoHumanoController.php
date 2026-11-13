<?php

namespace App\Http\Controllers\RecursoHumano;

use App\Enums\TipoPersona;
use App\Http\Controllers\Controller;
use App\Models\PersonaRecursoHumano;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Estadísticas del padrón de recurso humano (RF-4.07, RF-4.10).
 */
class ReporteRecursoHumanoController extends Controller
{
    /**
     * Rangos de edad usados en los informes institucionales.
     *
     * @var array<string, array{0: int, 1: int|null}>
     */
    private const RANGOS_EDAD = [
        'Menores de 18' => [0, 17],
        'De 18 a 25' => [18, 25],
        'De 26 a 35' => [26, 35],
        'De 36 a 50' => [36, 50],
        'Mayores de 50' => [51, null],
    ];

    public function index(): Response
    {
        Gate::authorize('viewAny', PersonaRecursoHumano::class);

        $personas = PersonaRecursoHumano::query()
            ->with(['disciplina:id,nombre', 'pais:id,nombre'])
            ->get();

        return Inertia::render('recurso-humano/reportes', [
            'resumen' => [
                'total' => $personas->count(),
                'activos' => $personas->where('activo', true)->count(),
                'inactivos' => $personas->where('activo', false)->count(),
                'promedio_permanencia' => $this->promedioPermanencia($personas),
            ],
            'porTipo' => $this->porTipo($personas),
            'porDisciplina' => $this->agrupar($personas, fn (PersonaRecursoHumano $p): string => $p->disciplina->nombre),
            'porNacionalidad' => $this->agrupar($personas, fn (PersonaRecursoHumano $p): string => $p->pais->nombre),
            'porRangoEdad' => $this->porRangoEdad($personas),
        ]);
    }

    /**
     * Padrón en CSV, que Excel abre directamente (RF-4.07).
     *
     * La exportación a PDF y Excel con formato institucional queda pendiente de
     * aprobar las dependencias correspondientes.
     */
    public function exportar(Request $request): StreamedResponse
    {
        Gate::authorize('viewAny', PersonaRecursoHumano::class);

        $verDatosSensibles = Gate::allows('verDatosSensibles', new PersonaRecursoHumano);

        $personas = PersonaRecursoHumano::query()
            ->with(['disciplina:id,nombre', 'agrupacion:id,nombre', 'pais:id,nombre'])
            ->buscar($request->string('busqueda')->trim()->toString())
            ->orderBy('apellidos')
            ->orderBy('nombres')
            ->get();

        $encabezados = ['Tipo', 'Apellidos', 'Nombres', 'Disciplina', 'Agrupación', 'Nacionalidad', 'Edad', 'Estado', 'Fecha de alta', 'Fecha de baja', 'Permanencia'];

        if ($verDatosSensibles) {
            $encabezados[] = 'DPI';
            $encabezados[] = 'Pasaporte';
        }

        return response()->streamDownload(function () use ($personas, $encabezados, $verDatosSensibles): void {
            $salida = fopen('php://output', 'wb');

            if ($salida === false) {
                return;
            }

            // BOM para que Excel reconozca el UTF-8.
            fwrite($salida, chr(0xEF).chr(0xBB).chr(0xBF));
            fputcsv($salida, $encabezados);

            foreach ($personas as $persona) {
                $fila = [
                    $persona->tipo->nombre(),
                    $persona->apellidos,
                    $persona->nombres,
                    $persona->disciplina?->nombre,
                    $persona->agrupacion?->nombre,
                    $persona->pais?->nombre,
                    $persona->edad,
                    $persona->activo ? 'Activo' : 'Inactivo',
                    $persona->fecha_alta->format('d-m-Y'),
                    $persona->fecha_baja?->format('d-m-Y'),
                    $persona->permanencia()['texto'],
                ];

                if ($verDatosSensibles) {
                    $fila[] = $persona->dpi;
                    $fila[] = $persona->pasaporte;
                }

                fputcsv($salida, $fila);
            }

            fclose($salida);
        }, 'padron-recurso-humano-'.now()->format('Y-m-d').'.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * @param  Collection<int, PersonaRecursoHumano>  $personas
     * @return array<int, array{etiqueta: string, total: int}>
     */
    private function porTipo(Collection $personas): array
    {
        return array_map(fn (TipoPersona $tipo): array => [
            'etiqueta' => $tipo->plural(),
            'total' => $personas->where('tipo', $tipo)->count(),
        ], TipoPersona::cases());
    }

    /**
     * @param  Collection<int, PersonaRecursoHumano>  $personas
     * @param  \Closure(PersonaRecursoHumano): string  $clave
     * @return array<int, array{etiqueta: string, total: int}>
     */
    private function agrupar(Collection $personas, \Closure $clave): array
    {
        return $personas
            ->groupBy(fn (PersonaRecursoHumano $persona): string => $clave($persona))
            ->map(fn (Collection $grupo, string $etiqueta): array => [
                'etiqueta' => $etiqueta,
                'total' => $grupo->count(),
            ])
            ->sortByDesc('total')
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, PersonaRecursoHumano>  $personas
     * @return array<int, array{etiqueta: string, total: int}>
     */
    private function porRangoEdad(Collection $personas): array
    {
        $resultado = [];

        foreach (self::RANGOS_EDAD as $etiqueta => [$desde, $hasta]) {
            $resultado[] = [
                'etiqueta' => $etiqueta,
                'total' => $personas
                    ->filter(fn (PersonaRecursoHumano $persona): bool => $persona->edad >= $desde
                        && ($hasta === null || $persona->edad <= $hasta))
                    ->count(),
            ];
        }

        return $resultado;
    }

    /**
     * @param  Collection<int, PersonaRecursoHumano>  $personas
     * @return array{dias: int, texto: string}
     */
    private function promedioPermanencia(Collection $personas): array
    {
        if ($personas->isEmpty()) {
            return ['dias' => 0, 'texto' => 'Sin registros'];
        }

        $promedio = (int) round($personas->avg(
            fn (PersonaRecursoHumano $persona): int => $persona->permanencia()['dias_totales']
        ));

        $anios = intdiv($promedio, 365);
        $meses = intdiv($promedio % 365, 30);

        $partes = array_filter([
            $anios > 0 ? $anios.' '.($anios === 1 ? 'año' : 'años') : null,
            $meses > 0 ? $meses.' '.($meses === 1 ? 'mes' : 'meses') : null,
        ]);

        return [
            'dias' => $promedio,
            'texto' => $partes === [] ? $promedio.' días' : implode(', ', $partes),
        ];
    }
}
