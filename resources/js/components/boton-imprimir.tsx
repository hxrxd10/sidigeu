import { Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Manda la vista a la impresora del sistema, que es también la forma de
 * guardarla en PDF. La hoja impresa lleva el membrete institucional y deja
 * fuera la navegación (ver `@media print` en app.css).
 */
export function BotonImprimir({
    etiqueta = 'Imprimir',
}: {
    etiqueta?: string;
}) {
    return (
        <Button
            variant="outline"
            onClick={() => window.print()}
            className="print:hidden"
        >
            <Printer />
            {etiqueta}
        </Button>
    );
}
