import { Check, Facebook, Link2, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useClipboard } from '@/hooks/use-clipboard';

/**
 * Compartir una actividad de la Agenda Cultural.
 *
 * Son enlaces normales a los repartidores de cada red, sin ningún script de
 * terceros: así la página pública no carga rastreadores ajenos.
 */
export function BotonesCompartir({
    enlace,
    titulo,
}: {
    enlace: string;
    titulo: string;
}) {
    const [copiado, copiar] = useClipboard();

    const texto = encodeURIComponent(`${titulo} — ${enlace}`);
    const direccion = encodeURIComponent(enlace);

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
                <a
                    href={`https://wa.me/?text=${texto}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MessageCircle />
                    WhatsApp
                </a>
            </Button>

            <Button variant="outline" size="sm" asChild>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${direccion}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Facebook />
                    Facebook
                </a>
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => void copiar(enlace)}
            >
                {copiado === enlace ? <Check /> : <Link2 />}
                {copiado === enlace ? 'Enlace copiado' : 'Copiar enlace'}
            </Button>
        </div>
    );
}
