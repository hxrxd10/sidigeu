import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';
import type { Paginado } from '@/types';

type Props = {
    paginado: Paginado<unknown>;
    etiqueta: string;
};

/**
 * Navegación entre páginas de un listado, con el conteo de registros.
 */
export function Paginacion({ paginado, etiqueta }: Props) {
    if (paginado.total === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Mostrando {paginado.from ?? 0}–{paginado.to ?? 0} de{' '}
                {paginado.total} {etiqueta}
            </p>

            {paginado.last_page > 1 && (
                <nav className="flex flex-wrap gap-1" aria-label="Paginación">
                    {paginado.links.map((enlace, indice) =>
                        enlace.url === null ? (
                            <span
                                key={`${enlace.label}-${indice}`}
                                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground"
                                dangerouslySetInnerHTML={{
                                    __html: enlace.label,
                                }}
                            />
                        ) : (
                            <Link
                                key={`${enlace.label}-${indice}`}
                                href={enlace.url}
                                preserveScroll
                                preserveState
                                className={cn(
                                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                                    enlace.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-accent hover:text-accent-foreground',
                                )}
                                dangerouslySetInnerHTML={{
                                    __html: enlace.label,
                                }}
                            />
                        ),
                    )}
                </nav>
            )}
        </div>
    );
}
