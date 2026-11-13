<?php

namespace App\Http\Controllers\Actividades;

use App\Actions\Actividades\CargaMasivaDeActividades;
use App\Http\Controllers\Controller;
use App\Models\Actividad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as RespuestaHttp;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Carga masiva de la programación de actividades desde una hoja de cálculo
 * (RF-1.01).
 *
 * Son tres pasos: descargar la plantilla con las listas desplegables, subirla
 * para revisarla y confirmar. La revisión no guarda nada.
 */
class CargaMasivaActividadController extends Controller
{
    public function __construct(private CargaMasivaDeActividades $carga) {}

    public function create(Request $request): Response
    {
        Gate::authorize('create', Actividad::class);

        return Inertia::render('actividades/carga-masiva', $this->pantalla($request));
    }

    public function plantilla(Request $request): RespuestaHttp
    {
        Gate::authorize('create', Actividad::class);

        return $this->descarga(
            $this->carga->plantilla($request->user()),
            'programacion-actividades-sigeu.xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
    }

    public function plantillaCsv(): RespuestaHttp
    {
        Gate::authorize('create', Actividad::class);

        return $this->descarga(
            $this->carga->plantillaCsv(),
            'programacion-actividades-sigeu.csv',
            'text/csv; charset=utf-8',
        );
    }

    public function previsualizar(Request $request): Response
    {
        Gate::authorize('create', Actividad::class);

        $request->validate([
            'archivo' => ['required', 'file', 'mimes:xlsx,csv,txt', 'max:5120'],
        ], [], ['archivo' => 'archivo']);

        return Inertia::render('actividades/carga-masiva', [
            ...$this->pantalla($request),
            'revision' => $this->carga->previsualizar($request->file('archivo'), $request->user()),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Actividad::class);

        $request->validate(['token' => ['required', 'string']]);

        $creadas = $this->carga->confirmar($request->string('token')->toString(), $request->user());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $creadas === 1
                ? 'Se registró una actividad en borrador.'
                : "Se registraron {$creadas} actividades en borrador.",
        ]);

        return to_route('actividades.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function pantalla(Request $request): array
    {
        return [
            'columnas' => $this->carga->columnas(),
            'instrucciones' => $this->carga->instrucciones(),
            'listas' => $this->carga->listas($request->user()),
        ];
    }

    private function descarga(string $contenido, string $nombre, string $tipo): RespuestaHttp
    {
        return response($contenido, 200, [
            'Content-Type' => $tipo,
            'Content-Disposition' => 'attachment; filename="'.$nombre.'"',
        ]);
    }
}
