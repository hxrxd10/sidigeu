import { Head, Link, router } from '@inertiajs/react';
import { Bell, CheckCheck } from 'lucide-react';

import NotificacionController from '@/actions/App/Http/Controllers/NotificacionController';
import Heading from '@/components/heading';
import { Paginacion } from '@/components/paginacion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { index } from '@/routes/notificaciones';
import type { Paginado } from '@/types';

type Notificacion = {
    id: string;
    titulo: string;
    mensaje: string;
    ruta: string | null;
    leida: boolean;
    fecha: string | null;
};

type Props = {
    notificaciones: Paginado<Notificacion>;
    noLeidas: number;
};

export default function Notificaciones({ notificaciones, noLeidas }: Props) {
    return (
        <>
            <Head title="Notificaciones" />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Notificaciones"
                        description="Validaciones, aprobaciones y solicitudes que le competen"
                    />

                    {noLeidas > 0 && (
                        <Button
                            variant="outline"
                            onClick={() =>
                                router.patch(
                                    NotificacionController.marcarTodas.url(),
                                    {},
                                    { preserveScroll: true },
                                )
                            }
                        >
                            <CheckCheck />
                            Marcar todas como leídas
                        </Button>
                    )}
                </div>

                <div className="rounded-xl border">
                    {notificaciones.data.length === 0 ? (
                        <p className="py-16 text-center text-muted-foreground">
                            No tiene notificaciones.
                        </p>
                    ) : (
                        <ul className="divide-y">
                            {notificaciones.data.map((notificacion) => (
                                <li
                                    key={notificacion.id}
                                    className={cn(
                                        'flex items-start gap-4 p-4',
                                        !notificacion.leida && 'bg-accent/40',
                                    )}
                                >
                                    <Bell className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-medium">
                                                {notificacion.titulo}
                                            </span>
                                            {!notificacion.leida && (
                                                <Badge variant="secondary">
                                                    Nueva
                                                </Badge>
                                            )}
                                            <span className="text-xs text-muted-foreground">
                                                {notificacion.fecha}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {notificacion.mensaje}
                                        </p>

                                        <div className="mt-2 flex gap-2">
                                            {notificacion.ruta && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={notificacion.ruta}
                                                    >
                                                        Abrir
                                                    </Link>
                                                </Button>
                                            )}

                                            {!notificacion.leida && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.patch(
                                                            NotificacionController.marcar.url(
                                                                notificacion.id,
                                                            ),
                                                            {},
                                                            {
                                                                preserveScroll: true,
                                                            },
                                                        )
                                                    }
                                                >
                                                    Marcar como leída
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Paginacion
                    paginado={notificaciones}
                    etiqueta="notificaciones"
                />
            </div>
        </>
    );
}

Notificaciones.layout = {
    breadcrumbs: [{ title: 'Notificaciones', href: index() }],
};
