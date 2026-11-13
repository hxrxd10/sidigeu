<?php

namespace App\Http\Controllers\RecursoHumano;

use App\Actions\RecursoHumano\CargaMasivaDelPadron;
use App\Http\Controllers\Controller;
use App\Models\PersonaRecursoHumano;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as RespuestaHttp;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Carga masiva del padrón desde una hoja de cálculo (RF-4.01).
 *
 * Son tres pasos: descargar la plantilla, subirla para revisarla y confirmar.
 * La revisión no guarda nada.
 */
class CargaMasivaPadronController extends Controller
{
    public function __construct(private CargaMasivaDelPadron $carga) {}

    public function create(Request $request): Response
    {
        Gate::authorize('create', PersonaRecursoHumano::class);

        return Inertia::render('recurso-humano/carga-masiva', $this->pantalla($request));
    }

    public function plantilla(Request $request): RespuestaHttp
    {
        Gate::authorize('create', PersonaRecursoHumano::class);

        return $this->descarga(
            $this->carga->plantilla($request->user()),
            'padron-sigeu.xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
    }

    public function plantillaCsv(): RespuestaHttp
    {
        Gate::authorize('create', PersonaRecursoHumano::class);

        return $this->descarga($this->carga->plantillaCsv(), 'padron-sigeu.csv', 'text/csv; charset=utf-8');
    }

    public function previsualizar(Request $request): Response
    {
        Gate::authorize('create', PersonaRecursoHumano::class);

        $request->validate([
            'archivo' => ['required', 'file', 'mimes:xlsx,csv,txt', 'max:5120'],
        ], [], ['archivo' => 'archivo']);

        return Inertia::render('recurso-humano/carga-masiva', [
            ...$this->pantalla($request),
            'revision' => $this->carga->previsualizar($request->file('archivo'), $request->user()),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', PersonaRecursoHumano::class);

        $request->validate(['token' => ['required', 'string']]);

        $creadas = $this->carga->confirmar($request->string('token')->toString(), $request->user());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $creadas === 1
                ? 'Se agregó una persona al padrón.'
                : "Se agregaron {$creadas} personas al padrón.",
        ]);

        return to_route('recurso-humano.index');
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
