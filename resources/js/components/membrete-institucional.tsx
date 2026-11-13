import { cn } from '@/lib/utils';

/**
 * Encabezado institucional de los documentos impresos.
 *
 * Solo aparece al imprimir o al guardar en PDF desde el navegador: en pantalla
 * el título de la página ya cumple esa función.
 *
 * Usa una versión del logo en azul institucional: el archivo de la interfaz es
 * blanco —se colorea con una máscara según el fondo— y sobre papel blanco
 * sencillamente no se vería.
 */
export function MembreteInstitucional({
    titulo,
    periodo,
    alcance,
    className,
}: {
    titulo: string;
    periodo?: string | null;
    alcance?: string | null;
    className?: string;
}) {
    const ahora = new Date();
    const dosCifras = (numero: number) => String(numero).padStart(2, '0');
    const impreso =
        `${dosCifras(ahora.getDate())}-${dosCifras(ahora.getMonth() + 1)}-${ahora.getFullYear()}` +
        ` ${dosCifras(ahora.getHours())}:${dosCifras(ahora.getMinutes())}`;

    return (
        <header
            className={cn(
                'hidden border-b border-black pb-3 text-black print:block',
                className,
            )}
        >
            <div className="flex items-start gap-4">
                <img
                    src="/images/logo-impresion.png"
                    alt="Universidad de San Carlos de Guatemala · DIGEU"
                    className="h-14 w-auto"
                />
                <div className="flex-1">
                    <p className="text-[11pt] font-semibold">
                        Universidad de San Carlos de Guatemala
                    </p>
                    <p className="text-[10pt]">
                        Dirección General de Extensión Universitaria
                    </p>
                    <p className="text-[10pt]">
                        Sistema de Gestión de Extensión Universitaria
                    </p>
                </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-[13pt] font-semibold">{titulo}</h1>
                    {periodo && (
                        <p className="text-[10pt] first-letter:uppercase">
                            {periodo}
                        </p>
                    )}
                    {alcance && <p className="text-[10pt]">{alcance}</p>}
                </div>
                <p className="text-[9pt] whitespace-nowrap">
                    Impreso el {impreso}
                </p>
            </div>
        </header>
    );
}
