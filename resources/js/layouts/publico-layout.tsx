import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';

import { MarcaInstitucional } from '@/components/marca-institucional';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { home, login } from '@/routes';
import { agenda } from '@/routes/publico';
import { index as catalogoEspacios } from '@/routes/publico/espacios';
import { create as crearSolicitud } from '@/routes/publico/solicitud';

const ENLACES = [
    { titulo: 'Agenda Cultural', href: () => agenda().url },
    { titulo: 'Espacios', href: () => catalogoEspacios().url },
    { titulo: 'Solicitar un espacio', href: () => crearSolicitud().url },
];

/**
 * Indica si la página ya se desplazó, para dibujar el borde de la barra
 * superior solo cuando el contenido pasa por debajo de ella.
 */
function useDesplazada(): boolean {
    const [desplazada, setDesplazada] = useState(false);

    useEffect(() => {
        let pendiente = false;

        const alDesplazar = () => {
            if (pendiente) {
                return;
            }

            pendiente = true;
            requestAnimationFrame(() => {
                setDesplazada(window.scrollY > 8);
                pendiente = false;
            });
        };

        alDesplazar();
        window.addEventListener('scroll', alDesplazar, { passive: true });

        return () => window.removeEventListener('scroll', alDesplazar);
    }, []);

    return desplazada;
}

/**
 * Marco de las páginas abiertas al público: portada, agenda cultural, catálogo
 * de espacios y solicitud de uso.
 */
export default function PublicoLayout({
    children,
    anchoCompleto = false,
}: PropsWithChildren<{ anchoCompleto?: boolean }>) {
    const { url } = usePage();
    const desplazada = useDesplazada();

    const esActual = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <div className="flex min-h-svh flex-col bg-background">
            <header
                className={cn(
                    'sticky top-0 z-50 material-barra transition-[box-shadow,border-color] duration-300',
                    'border-b',
                    desplazada
                        ? 'border-border shadow-[0_1px_20px_-12px_rgb(0_0_0/0.45)]'
                        : 'border-transparent',
                )}
            >
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
                    <Link
                        href={home()}
                        className="shrink-0 rounded-md transition-transform duration-150 ease-out active:scale-[0.98]"
                        aria-label="Inicio"
                    >
                        <MarcaInstitucional className="h-9 text-digeu-navy sm:h-10 dark:text-white" />
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {ENLACES.map((enlace) => {
                            const href = enlace.href();

                            return (
                                <Link
                                    key={enlace.titulo}
                                    href={href}
                                    className={cn(
                                        'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out active:scale-[0.98]',
                                        esActual(href)
                                            ? 'text-foreground'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {enlace.titulo}
                                </Link>
                            );
                        })}

                        <Button size="sm" asChild className="ml-2">
                            <Link href={login()}>Ingresar</Link>
                        </Button>
                    </nav>

                    <div className="flex items-center gap-2 md:hidden">
                        <Button size="sm" variant="outline" asChild>
                            <Link href={login()}>Ingresar</Link>
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    aria-label="Abrir el menú"
                                >
                                    <Menu />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <SheetHeader>
                                    <SheetTitle className="sr-only">
                                        Menú
                                    </SheetTitle>
                                    <MarcaInstitucional className="h-9 text-digeu-navy dark:text-white" />
                                </SheetHeader>

                                <nav className="flex flex-col gap-1 px-4">
                                    {ENLACES.map((enlace) => (
                                        <SheetClose asChild key={enlace.titulo}>
                                            <Link
                                                href={enlace.href()}
                                                className="rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent"
                                            >
                                                {enlace.titulo}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main
                className={cn(
                    'flex-1',
                    anchoCompleto
                        ? ''
                        : 'mx-auto w-full max-w-6xl px-4 py-8 md:py-10',
                )}
            >
                {children}
            </main>

            <footer className="bg-digeu-navy text-white">
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <MarcaInstitucional className="h-12 text-white" />
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                            Dirección General de Extensión Universitaria de la
                            Universidad de San Carlos de Guatemala.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                            Para la comunidad
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                            {ENLACES.map((enlace) => (
                                <li key={enlace.titulo}>
                                    <Link
                                        href={enlace.href()}
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        {enlace.titulo}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                            Personal de la DIGEU
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>
                                <Link
                                    href={login()}
                                    className="text-white/80 transition-colors hover:text-white"
                                >
                                    Ingresar al sistema
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <p className="mx-auto w-full max-w-6xl px-4 py-5 text-xs text-white/50">
                        Universidad de San Carlos de Guatemala · Dirección
                        General de Extensión Universitaria
                    </p>
                </div>
            </footer>
        </div>
    );
}
