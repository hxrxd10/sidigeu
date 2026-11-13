import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { index } from '@/routes/publico/espacios';
import { create as crearSolicitud } from '@/routes/publico/solicitud';

type Props = {
    espacio: {
        id: number;
        nombre: string;
        sede: string;
        direccion: string | null;
        tipo: string;
        ubicacion: string | null;
        capacidad: number | null;
        caracteristicas: string | null;
        condiciones_uso: string | null;
        en_mantenimiento: boolean;
        fotografias: string[];
        equipamientos: { nombre: string; cantidad: number }[];
    };
};

export default function EspacioPublico({ espacio }: Props) {
    return (
        <>
            <Head title={espacio.nombre} />

            <div className="space-y-6">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver al catálogo
                    </Link>
                </Button>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            {espacio.nombre}
                        </h1>
                        <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                            <MapPin className="size-4" />
                            {espacio.sede}
                            {espacio.direccion ? ` · ${espacio.direccion}` : ''}
                        </p>
                    </div>

                    {espacio.en_mantenimiento ? (
                        <Badge variant="secondary">En mantenimiento</Badge>
                    ) : (
                        <Button asChild>
                            <Link
                                href={crearSolicitud({
                                    query: { espacio_id: espacio.id },
                                })}
                            >
                                Solicitar este espacio
                            </Link>
                        </Button>
                    )}
                </div>

                {espacio.fotografias.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-3">
                        {espacio.fotografias.map((foto) => (
                            <img
                                key={foto}
                                src={foto}
                                alt={espacio.nombre}
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        ))}
                    </div>
                )}

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Características</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Tipo de espacio
                                    </dt>
                                    <dd className="mt-0.5">{espacio.tipo}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Capacidad
                                    </dt>
                                    <dd className="mt-0.5 flex items-center gap-2">
                                        <Users className="size-4" />
                                        {espacio.capacidad
                                            ? `${espacio.capacidad} personas`
                                            : 'No indicada'}
                                    </dd>
                                </div>
                                {espacio.ubicacion && (
                                    <div>
                                        <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                                            Ubicación
                                        </dt>
                                        <dd className="mt-0.5">
                                            {espacio.ubicacion}
                                        </dd>
                                    </div>
                                )}
                            </dl>

                            {espacio.caracteristicas && (
                                <p className="whitespace-pre-line">
                                    {espacio.caracteristicas}
                                </p>
                            )}

                            {espacio.condiciones_uso && (
                                <div>
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Condiciones de uso
                                    </h2>
                                    <p className="mt-1 whitespace-pre-line">
                                        {espacio.condiciones_uso}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Equipamiento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {espacio.equipamientos.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin equipamiento registrado.
                                </p>
                            ) : (
                                <ul className="space-y-2 text-sm">
                                    {espacio.equipamientos.map((equipo) => (
                                        <li
                                            key={equipo.nombre}
                                            className="flex items-center justify-between"
                                        >
                                            <span>{equipo.nombre}</span>
                                            <span className="text-muted-foreground tabular-nums">
                                                {equipo.cantidad}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <p className="rounded-lg border bg-secondary/40 p-4 text-sm text-muted-foreground">
                    El catálogo no muestra la disponibilidad del espacio. Envíe
                    una solicitud indicando fecha y horario; recibirá la
                    respuesta en su correo.
                </p>
            </div>
        </>
    );
}
