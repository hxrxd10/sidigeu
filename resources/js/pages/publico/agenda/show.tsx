import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    CalendarDays,
    CalendarPlus,
    Clock,
    MapPin,
} from 'lucide-react';

import { BotonesCompartir } from '@/components/botones-compartir';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { agenda } from '@/routes/publico';

type Props = {
    actividad: {
        id: number;
        nombre: string;
        descripcion: string | null;
        fecha: string;
        fecha_larga: string;
        hora_inicio: string | null;
        hora_fin: string | null;
        lugar: string;
        ubicacion: string | null;
        sede: string | null;
        unidad: string;
        tipo: string;
        estado_nombre: string;
        calendario: string;
        enlace: string;
        mes: string;
    };
};

function Dato({
    icono: Icono,
    etiqueta,
    children,
}: {
    icono: typeof CalendarDays;
    etiqueta: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-3">
            <Icono className="mt-0.5 size-5 shrink-0 text-digeu-azure dark:text-digeu-teal" />
            <div>
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {etiqueta}
                </p>
                <p className="font-medium">{children}</p>
            </div>
        </div>
    );
}

export default function ActividadDeLaAgenda({ actividad }: Props) {
    const horario = actividad.hora_inicio
        ? actividad.hora_fin
            ? `${actividad.hora_inicio} – ${actividad.hora_fin}`
            : `Desde las ${actividad.hora_inicio}`
        : 'Todo el día';

    return (
        <>
            <Head title={actividad.nombre} />

            <article className="mx-auto max-w-3xl space-y-8">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={agenda({ query: { mes: actividad.mes } })}>
                        <ArrowLeft />
                        Volver a la Agenda Cultural
                    </Link>
                </Button>

                <header className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{actividad.tipo}</Badge>
                        <Badge variant="secondary">
                            {actividad.estado_nombre}
                        </Badge>
                    </div>
                    <h1 className="text-3xl font-semibold text-balance">
                        {actividad.nombre}
                    </h1>
                    <p className="text-muted-foreground">
                        {actividad.fecha_larga}
                    </p>
                </header>

                <Card>
                    <CardContent className="grid gap-5 sm:grid-cols-2">
                        <Dato icono={CalendarDays} etiqueta="Fecha">
                            {actividad.fecha_larga}
                        </Dato>
                        <Dato icono={Clock} etiqueta="Horario">
                            {horario}
                        </Dato>
                        <Dato icono={MapPin} etiqueta="Lugar">
                            {actividad.lugar}
                            {actividad.ubicacion && (
                                <span className="block text-sm font-normal text-muted-foreground">
                                    {actividad.ubicacion}
                                </span>
                            )}
                            {actividad.sede && (
                                <span className="block text-sm font-normal text-muted-foreground">
                                    {actividad.sede}
                                </span>
                            )}
                        </Dato>
                        <Dato icono={Building2} etiqueta="Organiza">
                            {actividad.unidad}
                        </Dato>
                    </CardContent>
                </Card>

                {actividad.descripcion && (
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            Sobre la actividad
                        </h2>
                        <p className="leading-relaxed text-pretty whitespace-pre-line">
                            {actividad.descripcion}
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3 border-t pt-6">
                    <Button asChild>
                        <a href={actividad.calendario}>
                            <CalendarPlus />
                            Agregar a mi calendario
                        </a>
                    </Button>

                    <BotonesCompartir
                        enlace={actividad.enlace}
                        titulo={actividad.nombre}
                    />
                </div>
            </article>
        </>
    );
}
