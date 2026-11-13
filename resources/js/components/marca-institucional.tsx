import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

const ETIQUETA_COMPLETA =
    'Universidad de San Carlos de Guatemala · Dirección General de Extensión Universitaria';

/**
 * La imagen se aplica en línea y no desde la hoja de estilos: así la ruta se
 * resuelve contra el sitio y no contra el servidor de Vite, que no sirve los
 * archivos de public/.
 */
const MASCARA: CSSProperties = {
    maskImage: 'url(/images/logo.png)',
    WebkitMaskImage: 'url(/images/logo.png)',
};

/**
 * Logotipo oficial USAC · DIGEU. El archivo original es blanco sobre fondo
 * transparente y se aplica como máscara, de modo que la marca toma el color del
 * texto que hereda: blanca sobre el azul institucional y azul sobre fondos
 * claros, sin necesidad de mantener dos archivos.
 */
export function MarcaInstitucional({ className }: { className?: string }) {
    return (
        <span
            role="img"
            aria-label={ETIQUETA_COMPLETA}
            style={MASCARA}
            className={cn('marca-institucional', className)}
        />
    );
}

/**
 * Sello de la USAC, recortado del mismo archivo, para los lugares donde no cabe
 * el logotipo completo (la barra lateral plegada, por ejemplo).
 */
export function SelloUsac({ className }: { className?: string }) {
    return (
        <span
            role="img"
            aria-label="Universidad de San Carlos de Guatemala"
            style={MASCARA}
            className={cn('sello-usac', className)}
        />
    );
}
