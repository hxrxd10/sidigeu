import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { index } from '@/routes/publico/espacios';

export default function SolicitudEnviada({ numero }: { numero: number }) {
    return (
        <>
            <Head title="Solicitud enviada" />

            <div className="mx-auto max-w-xl space-y-4 py-12 text-center">
                <CheckCircle2 className="mx-auto size-12 text-digeu-green" />

                <h1 className="text-2xl font-semibold">Solicitud enviada</h1>

                <p className="text-muted-foreground">
                    Su solicitud quedó registrada con el número{' '}
                    <span className="font-medium text-foreground">
                        #{numero}
                    </span>{' '}
                    y está pendiente de confirmación. La Dirección revisará la
                    disponibilidad del espacio y le responderá al correo que
                    indicó.
                </p>

                <Button asChild>
                    <Link href={index()}>Volver al catálogo</Link>
                </Button>
            </div>
        </>
    );
}
