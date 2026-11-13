import { useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export type PuntoTendencia = {
    etiqueta: string;
    valor: number;
    detalle?: string;
};

const ANCHO_MINIMO = 220;
const ALTO = 150;

/**
 * Ancho real del contenedor.
 *
 * El `viewBox` se dibuja con esa misma medida para que el dibujo no se escale:
 * si se escalara, el texto de los ejes se encogería con él y en una tarjeta
 * angosta quedaría ilegible.
 */
function useAnchoDisponible(): [
    React.RefObject<HTMLDivElement | null>,
    number,
] {
    const contenedor = useRef<HTMLDivElement>(null);
    const [ancho, setAncho] = useState(ANCHO_MINIMO);

    useEffect(() => {
        const elemento = contenedor.current;

        if (!elemento) {
            return;
        }

        const observador = new ResizeObserver(([entrada]) => {
            setAncho(Math.max(entrada.contentRect.width, ANCHO_MINIMO));
        });

        observador.observe(elemento);

        return () => observador.disconnect();
    }, []);

    return [contenedor, ancho];
}
const MARGEN = { arriba: 12, derecha: 8, abajo: 24, izquierda: 38 };
const COLUMNA_MAXIMA = 24;
const RADIO = 4;

/**
 * Techo del eje redondeado a una cifra limpia.
 *
 * Se redondea a un múltiplo de dos pasos para que la guía de en medio caiga
 * siempre en un número entero: en un conteo de actividades, «3.5» no existe.
 */
function techo(maximo: number): number {
    if (maximo <= 4) {
        return 4;
    }

    const magnitud = 10 ** Math.floor(Math.log10(maximo));
    const paso = Math.max(magnitud / 2, 2);

    return Math.ceil(maximo / (paso * 2)) * paso * 2;
}

function numeroCorto(valor: number): string {
    return valor >= 10000
        ? `${Math.round(valor / 1000)}K`
        : valor.toLocaleString('es-GT');
}

/** Columna con las esquinas superiores redondeadas y la base cuadrada. */
function caminoColumna(
    x: number,
    y: number,
    ancho: number,
    alto: number,
): string {
    const radio = Math.min(RADIO, ancho / 2, alto);

    return [
        `M ${x} ${y + alto}`,
        `V ${y + radio}`,
        `A ${radio} ${radio} 0 0 1 ${x + radio} ${y}`,
        `H ${x + ancho - radio}`,
        `A ${radio} ${radio} 0 0 1 ${x + ancho} ${y + radio}`,
        `V ${y + alto}`,
        'Z',
    ].join(' ');
}

/**
 * Serie de una sola medida a lo largo del tiempo.
 *
 * `columnas` para conteos por mes y `area` para volúmenes acumulados. Nunca
 * mezcla dos medidas en un mismo plano: dos escalas distintas van en dos
 * gráficas distintas.
 */
export function GraficaTendencia({
    puntos,
    variante = 'columnas',
    etiquetaValor = 'Total',
    descripcion,
    className,
}: {
    puntos: PuntoTendencia[];
    variante?: 'columnas' | 'area';
    etiquetaValor?: string;
    descripcion: string;
    className?: string;
}) {
    const idTabla = useId();
    const [resaltado, setResaltado] = useState<number | null>(null);
    const [contenedor, anchoTotal] = useAnchoDisponible();

    const alto = ALTO - MARGEN.arriba - MARGEN.abajo;
    const ancho = anchoTotal - MARGEN.izquierda - MARGEN.derecha;
    const limite = techo(Math.max(...puntos.map((punto) => punto.valor), 0));
    const banda = ancho / Math.max(puntos.length, 1);

    const enY = (valor: number): number =>
        MARGEN.arriba + alto - (valor / limite) * alto;
    const enX = (indice: number): number =>
        MARGEN.izquierda + banda * (indice + 0.5);

    const guias = [0, limite / 2, limite];

    const linea = puntos
        .map((punto, indice) => `${enX(indice)} ${enY(punto.valor)}`)
        .join(' L ');

    const area = `M ${MARGEN.izquierda + banda * 0.5} ${MARGEN.arriba + alto} L ${linea} L ${enX(puntos.length - 1)} ${MARGEN.arriba + alto} Z`;

    const activo = resaltado === null ? null : puntos[resaltado];

    return (
        <div className={cn('space-y-2', className)}>
            <div className="relative" ref={contenedor}>
                <svg
                    viewBox={`0 0 ${anchoTotal} ${ALTO}`}
                    width={anchoTotal}
                    height={ALTO}
                    className="overflow-visible"
                    role="img"
                    aria-label={descripcion}
                    aria-describedby={idTabla}
                >
                    {guias.map((guia) => (
                        <g key={guia}>
                            <line
                                x1={MARGEN.izquierda}
                                x2={anchoTotal - MARGEN.derecha}
                                y1={enY(guia)}
                                y2={enY(guia)}
                                className="stroke-border"
                                strokeWidth={1}
                            />
                            <text
                                x={MARGEN.izquierda - 6}
                                y={enY(guia)}
                                dominantBaseline="middle"
                                textAnchor="end"
                                className="fill-muted-foreground text-[10px] tabular-nums"
                            >
                                {numeroCorto(guia)}
                            </text>
                        </g>
                    ))}

                    {variante === 'area' ? (
                        <>
                            <path d={area} className="fill-primary/10" />
                            <path
                                d={`M ${linea}`}
                                fill="none"
                                className="stroke-primary"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {puntos.map((punto, indice) => (
                                <circle
                                    key={punto.etiqueta}
                                    cx={enX(indice)}
                                    cy={enY(punto.valor)}
                                    r={4}
                                    className="fill-primary stroke-card"
                                    strokeWidth={2}
                                    opacity={
                                        resaltado === null ||
                                        resaltado === indice
                                            ? 1
                                            : 0.45
                                    }
                                />
                            ))}
                        </>
                    ) : (
                        puntos.map((punto, indice) => {
                            const grosor = Math.min(banda - 2, COLUMNA_MAXIMA);
                            const altura = (punto.valor / limite) * alto;

                            return (
                                <path
                                    key={punto.etiqueta}
                                    d={caminoColumna(
                                        enX(indice) - grosor / 2,
                                        MARGEN.arriba + alto - altura,
                                        grosor,
                                        Math.max(
                                            altura,
                                            punto.valor > 0 ? 2 : 0,
                                        ),
                                    )}
                                    className="fill-primary"
                                    opacity={
                                        resaltado === null ||
                                        resaltado === indice
                                            ? 1
                                            : 0.45
                                    }
                                />
                            );
                        })
                    )}

                    {puntos.map((punto, indice) => (
                        <text
                            key={punto.etiqueta}
                            x={enX(indice)}
                            y={ALTO - 6}
                            textAnchor="middle"
                            className="fill-muted-foreground text-[10px]"
                        >
                            {punto.etiqueta}
                        </text>
                    ))}

                    {puntos.map((punto, indice) => (
                        <rect
                            key={punto.etiqueta}
                            x={MARGEN.izquierda + banda * indice}
                            y={MARGEN.arriba}
                            width={banda}
                            height={alto + MARGEN.abajo}
                            fill="transparent"
                            onMouseEnter={() => setResaltado(indice)}
                            onMouseLeave={() => setResaltado(null)}
                        />
                    ))}
                </svg>

                {activo && (
                    <div
                        className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-md border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground shadow-sm"
                        style={{ left: `${enX(resaltado ?? 0)}px` }}
                    >
                        <span className="font-medium">{activo.etiqueta}</span>
                        {' · '}
                        <span className="tabular-nums">
                            {activo.valor.toLocaleString('es-GT')}
                        </span>
                        {activo.detalle ? ` ${activo.detalle}` : ''}
                    </div>
                )}
            </div>

            <table id={idTabla} className="sr-only">
                <caption>{descripcion}</caption>
                <thead>
                    <tr>
                        <th scope="col">Período</th>
                        <th scope="col">{etiquetaValor}</th>
                    </tr>
                </thead>
                <tbody>
                    {puntos.map((punto) => (
                        <tr key={punto.etiqueta}>
                            <th scope="row">{punto.etiqueta}</th>
                            <td>{punto.valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
