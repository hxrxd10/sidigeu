import { useId, useState } from 'react';

import { cn } from '@/lib/utils';

export type FilaBarra = {
    etiqueta: string;
    valor: number;
    detalle?: string;
};

/**
 * Barras horizontales de una sola serie: comparar magnitudes entre categorías.
 *
 * Una sola serie significa un solo color, así que no lleva leyenda: el título
 * de la tarjeta dice qué se está midiendo. El valor va rotulado en la punta de
 * la barra y la tabla equivalente queda disponible para lectores de pantalla.
 */
export function GraficaBarras({
    filas,
    etiquetaValor = 'Total',
    descripcion,
    className,
}: {
    filas: FilaBarra[];
    etiquetaValor?: string;
    descripcion: string;
    className?: string;
}) {
    const idTabla = useId();
    const [resaltada, setResaltada] = useState<number | null>(null);

    const maximo = Math.max(...filas.map((fila) => fila.valor), 1);

    return (
        <div className={cn('space-y-2.5', className)}>
            <div
                role="img"
                aria-label={descripcion}
                aria-describedby={idTabla}
                className="space-y-2.5"
            >
                {filas.map((fila, indice) => (
                    <div
                        key={fila.etiqueta}
                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1"
                        onMouseEnter={() => setResaltada(indice)}
                        onMouseLeave={() => setResaltada(null)}
                    >
                        <p className="truncate text-sm text-foreground">
                            {fila.etiqueta}
                        </p>
                        <p className="text-sm font-medium text-foreground tabular-nums">
                            {fila.valor.toLocaleString('es-GT')}
                        </p>

                        <div className="col-span-2 h-2.5 rounded-sm bg-muted">
                            <div
                                className={cn(
                                    'h-full rounded-r-[4px] bg-primary transition-opacity duration-150',
                                    resaltada !== null &&
                                        resaltada !== indice &&
                                        'opacity-45',
                                )}
                                style={{
                                    width: `${Math.max((fila.valor / maximo) * 100, fila.valor > 0 ? 2 : 0)}%`,
                                }}
                            />
                        </div>

                        {fila.detalle && (
                            <p className="col-span-2 text-xs text-muted-foreground">
                                {fila.detalle}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <table id={idTabla} className="sr-only">
                <caption>{descripcion}</caption>
                <thead>
                    <tr>
                        <th scope="col">Categoría</th>
                        <th scope="col">{etiquetaValor}</th>
                    </tr>
                </thead>
                <tbody>
                    {filas.map((fila) => (
                        <tr key={fila.etiqueta}>
                            <th scope="row">{fila.etiqueta}</th>
                            <td>{fila.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
