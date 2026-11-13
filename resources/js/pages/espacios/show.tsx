import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Pencil, Trash2 } from 'lucide-react';

import EspacioController from '@/actions/App/Http/Controllers/Espacios/EspacioController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { edit, index } from '@/routes/espacios';
import { show as verEnPublico } from '@/routes/publico/espacios';
import type { EspacioFicha, UsoEspacio } from './tipos';
import { fechaLegible } from '@/lib/fecha';

type Props = {
    espacio: EspacioFicha;
    historial: UsoEspacio[];
    puedeGestionar: boolean;
};

function Dato({
    etiqueta,
    valor,
}: {
    etiqueta: string;
    valor: string | number;
}) {
    return (
        <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                {etiqueta}
            </dt>
            <dd className="mt-0.5 text-sm">{valor}</dd>
        </div>
    );
}

export default function FichaEspacio({
    espacio,
    historial,
    puedeGestionar,
}: Props) {
    return (
        <>
            <Head title={espacio.nombre} />

            <div className="space-y-6 px-4 py-6">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver a espacios
                    </Link>
                </Button>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {espacio.nombre}
                        </h1>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{espacio.sede}</Badge>
                            <Badge variant="outline">{espacio.tipo}</Badge>
                            <Badge
                                variant={
                                    espacio.estado === 'activo'
                                        ? 'default'
                                        : 'outline'
                                }
                            >
                                {espacio.estado_nombre}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {espacio.visible_publico && (
                            <Button variant="outline" asChild>
                                <a
                                    href={verEnPublico(espacio.id).url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink />
                                    Ver en el catálogo público
                                </a>
                            </Button>
                        )}

                        {puedeGestionar && (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={edit(espacio.id)}>
                                        <Pencil />
                                        Editar
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.delete(
                                            EspacioController.destroy.url(
                                                espacio.id,
                                            ),
                                        )
                                    }
                                >
                                    <Trash2 />
                                    Eliminar
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {espacio.fotografias.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-4">
                        {espacio.fotografias.map((foto) => (
                            <img
                                key={foto.id}
                                src={foto.url}
                                alt={espacio.nombre}
                                className="h-36 w-full rounded-lg object-cover"
                            />
                        ))}
                    </div>
                )}

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Datos del espacio</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <Dato
                                    etiqueta="Capacidad"
                                    valor={
                                        espacio.capacidad
                                            ? `${espacio.capacidad} personas`
                                            : 'No indicada'
                                    }
                                />
                                <Dato
                                    etiqueta="Ubicación"
                                    valor={espacio.ubicacion ?? '—'}
                                />
                                <Dato
                                    etiqueta="Dirección de la sede"
                                    valor={espacio.direccion_sede ?? '—'}
                                />
                                <Dato
                                    etiqueta="Catálogo público"
                                    valor={
                                        espacio.visible_publico
                                            ? 'Visible'
                                            : 'Oculto'
                                    }
                                />
                            </dl>

                            {espacio.caracteristicas && (
                                <p className="text-sm whitespace-pre-line">
                                    {espacio.caracteristicas}
                                </p>
                            )}

                            {espacio.condiciones_uso && (
                                <div>
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Condiciones de uso
                                    </h2>
                                    <p className="mt-1 text-sm whitespace-pre-line">
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
                                            key={equipo.id}
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

                <Card>
                    <CardHeader>
                        <CardTitle>Historial de uso</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Horario</TableHead>
                                    <TableHead>Solicitante</TableHead>
                                    <TableHead>Asistentes</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historial.map((uso) => (
                                    <TableRow key={uso.id}>
                                        <TableCell>
                                            {fechaLegible(uso.fecha)}
                                        </TableCell>
                                        <TableCell>
                                            {uso.hora_inicio} – {uso.hora_fin}
                                        </TableCell>
                                        <TableCell>
                                            {uso.solicitante}
                                            {uso.institucion && (
                                                <span className="block text-xs text-muted-foreground">
                                                    {uso.institucion}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {uso.asistentes ?? '—'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    uso.estado === 'aprobada'
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                            >
                                                {uso.estado_nombre}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {historial.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            Este espacio todavía no registra
                                            uso.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

FichaEspacio.layout = {
    breadcrumbs: [{ title: 'Espacios', href: index() }],
};
