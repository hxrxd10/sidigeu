import { router } from '@inertiajs/react';
import { Loader2, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { buscar } from '@/routes';

type Resultado = {
    titulo: string;
    detalle: string | null;
    etiqueta: string | null;
    url: string;
};

type Grupo = {
    titulo: string;
    resultados: Resultado[];
};

const ESPERA_MS = 220;

/**
 * Búsqueda global. Se abre con ⌘K (Ctrl+K en Windows y Linux) desde cualquier
 * pantalla y lleva directo a la ficha de una actividad, un proyecto, una
 * persona del padrón, un espacio o un usuario.
 *
 * El servidor decide qué puede verse: aquí solo se pinta lo que devuelve.
 */
export function BuscadorGlobal() {
    const [abierto, setAbierto] = useState(false);
    const [termino, setTermino] = useState('');
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [buscando, setBuscando] = useState(false);
    const [activo, setActivo] = useState(0);
    const campo = useRef<HTMLInputElement>(null);

    const planos = grupos.flatMap((grupo) => grupo.resultados);

    useEffect(() => {
        const alPresionar = (evento: KeyboardEvent) => {
            if (
                evento.key.toLowerCase() === 'k' &&
                (evento.metaKey || evento.ctrlKey)
            ) {
                evento.preventDefault();
                setAbierto((anterior) => !anterior);
            }
        };

        window.addEventListener('keydown', alPresionar);

        return () => window.removeEventListener('keydown', alPresionar);
    }, []);

    useEffect(() => {
        if (!abierto) {
            setTermino('');
            setGrupos([]);
            setActivo(0);
        }
    }, [abierto]);

    useEffect(() => {
        const consulta = termino.trim();

        if (consulta.length < 2) {
            setGrupos([]);
            setBuscando(false);

            return;
        }

        const cancelar = new AbortController();
        setBuscando(true);

        const temporizador = window.setTimeout(() => {
            fetch(`${buscar().url}?q=${encodeURIComponent(consulta)}`, {
                headers: { Accept: 'application/json' },
                credentials: 'same-origin',
                signal: cancelar.signal,
            })
                .then((respuesta) =>
                    respuesta.ok ? respuesta.json() : { grupos: [] },
                )
                .then((datos: { grupos: Grupo[] }) => {
                    setGrupos(datos.grupos ?? []);
                    setActivo(0);
                })
                .catch(() => undefined)
                .finally(() => setBuscando(false));
        }, ESPERA_MS);

        return () => {
            window.clearTimeout(temporizador);
            cancelar.abort();
        };
    }, [termino]);

    const ir = useCallback((resultado: Resultado) => {
        setAbierto(false);
        router.visit(resultado.url);
    }, []);

    const navegarConTeclado = (
        evento: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (planos.length === 0) {
            return;
        }

        if (evento.key === 'ArrowDown') {
            evento.preventDefault();
            setActivo((anterior) => (anterior + 1) % planos.length);
        }

        if (evento.key === 'ArrowUp') {
            evento.preventDefault();
            setActivo(
                (anterior) => (anterior - 1 + planos.length) % planos.length,
            );
        }

        if (evento.key === 'Enter') {
            evento.preventDefault();
            ir(planos[activo]);
        }
    };

    let posicion = -1;

    return (
        <>
            <button
                type="button"
                onClick={() => setAbierto(true)}
                className="flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:w-64"
            >
                <Search className="size-4 shrink-0" />
                <span className="hidden md:inline">Buscar…</span>
                <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-sans text-xs md:inline">
                    ⌘K
                </kbd>
            </button>

            <Dialog open={abierto} onOpenChange={setAbierto}>
                <DialogContent
                    className="top-24 max-w-xl translate-y-0 gap-0 overflow-hidden p-0"
                    onOpenAutoFocus={(evento) => {
                        evento.preventDefault();
                        campo.current?.focus();
                    }}
                >
                    <DialogHeader className="sr-only">
                        <DialogTitle>Búsqueda global</DialogTitle>
                        <DialogDescription>
                            Busque actividades, proyectos, personas del padrón,
                            espacios y usuarios.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center gap-3 border-b px-4">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <input
                            ref={campo}
                            value={termino}
                            onChange={(evento) =>
                                setTermino(evento.target.value)
                            }
                            onKeyDown={navegarConTeclado}
                            placeholder="Buscar en todo el sistema…"
                            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            aria-label="Término de búsqueda"
                        />
                        {buscando && (
                            <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto p-2">
                        {termino.trim().length < 2 ? (
                            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                                Escriba al menos dos letras.
                            </p>
                        ) : planos.length === 0 && !buscando ? (
                            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                                Sin resultados para «{termino.trim()}».
                            </p>
                        ) : (
                            grupos.map((grupo) => (
                                <section key={grupo.titulo} className="mb-1">
                                    <p className="px-2 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                        {grupo.titulo}
                                    </p>
                                    {grupo.resultados.map((resultado) => {
                                        posicion += 1;
                                        const indice = posicion;

                                        return (
                                            <button
                                                key={`${grupo.titulo}-${resultado.url}`}
                                                type="button"
                                                onMouseEnter={() =>
                                                    setActivo(indice)
                                                }
                                                onClick={() => ir(resultado)}
                                                className={cn(
                                                    'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm',
                                                    indice === activo &&
                                                        'bg-accent text-accent-foreground',
                                                )}
                                            >
                                                <span className="min-w-0 flex-1">
                                                    <span className="block truncate font-medium">
                                                        {resultado.titulo}
                                                    </span>
                                                    {resultado.detalle && (
                                                        <span className="block truncate text-xs text-muted-foreground">
                                                            {resultado.detalle}
                                                        </span>
                                                    )}
                                                </span>
                                                {resultado.etiqueta && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="shrink-0"
                                                    >
                                                        {resultado.etiqueta}
                                                    </Badge>
                                                )}
                                            </button>
                                        );
                                    })}
                                </section>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
