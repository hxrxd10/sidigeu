import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';

import { BotonImprimir } from '@/components/boton-imprimir';
import { MembreteInstitucional } from '@/components/membrete-institucional';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index, reportes } from '@/routes/espacios';
import { exportar } from '@/routes/espacios/reportes';
import { fechaLegible } from '@/lib/fecha';

type Utilizacion = {
    espacio_id: number;
    espacio: string;
    sede: string;
    reservas: number;
    horas: number;
    ocupacion: number;
};

type Props = {
    rango: { desde: string; hasta: string };
    resumen: {
        reservas: number;
        horas: number;
        espacios: number;
        ocupacion_promedio: number;
    };
    utilizacion: Utilizacion[];
    masUsados: Utilizacion[];
    menosUsados: Utilizacion[];
};

function Indicador({ etiqueta, valor }: { etiqueta: string; valor: string }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {etiqueta}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-semibold">{valor}</p>
            </CardContent>
        </Card>
    );
}

function Listado({ titulo, filas }: { titulo: string; filas: Utilizacion[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {filas.map((fila) => (
                    <div
                        key={fila.espacio_id}
                        className="flex items-center justify-between text-sm"
                    >
                        <span>
                            {fila.espacio}
                            <span className="block text-xs text-muted-foreground">
                                {fila.sede}
                            </span>
                        </span>
                        <span className="text-muted-foreground tabular-nums">
                            {fila.horas} h
                        </span>
                    </div>
                ))}

                {filas.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Sin reservas en el período.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function ReportesEspacios({
    rango,
    resumen,
    utilizacion,
    masUsados,
    menosUsados,
}: Props) {
    const cambiarRango = (cambios: Partial<Props['rango']>) => {
        router.get(
            reportes().url,
            { ...rango, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Utilización de espacios" />

            <div className="space-y-6 px-4 py-6">
                <MembreteInstitucional
                    titulo="Utilización de espacios"
                    periodo={`Del ${fechaLegible(rango.desde)} al ${fechaLegible(rango.hasta)}`}
                />

                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 print:hidden"
                >
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver a espacios
                    </Link>
                </Button>

                <div className="flex flex-wrap items-end justify-between gap-4 print:hidden">
                    <Heading
                        title="Utilización de espacios"
                        description="Horas reservadas y ocupación por espacio en el período"
                    />

                    <div className="flex flex-wrap items-end gap-3">
                        <div className="grid gap-1">
                            <Label htmlFor="desde" className="text-xs">
                                Desde
                            </Label>
                            <Input
                                id="desde"
                                type="date"
                                className="w-40"
                                defaultValue={rango.desde}
                                onChange={(evento) =>
                                    cambiarRango({ desde: evento.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="hasta" className="text-xs">
                                Hasta
                            </Label>
                            <Input
                                id="hasta"
                                type="date"
                                className="w-40"
                                defaultValue={rango.hasta}
                                onChange={(evento) =>
                                    cambiarRango({ hasta: evento.target.value })
                                }
                            />
                        </div>
                        <Button variant="outline" asChild>
                            <a href={exportar({ query: rango }).url}>
                                <Download />
                                Exportar (CSV)
                            </a>
                        </Button>
                        <BotonImprimir />
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Indicador
                        etiqueta="Reservas aprobadas"
                        valor={String(resumen.reservas)}
                    />
                    <Indicador
                        etiqueta="Horas reservadas"
                        valor={`${resumen.horas} h`}
                    />
                    <Indicador
                        etiqueta="Espacios"
                        valor={String(resumen.espacios)}
                    />
                    <Indicador
                        etiqueta="Ocupación promedio"
                        valor={`${resumen.ocupacion_promedio}%`}
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Listado titulo="Más usados" filas={masUsados} />
                    <Listado titulo="Menos usados" filas={menosUsados} />
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Espacio</TableHead>
                                <TableHead>Sede</TableHead>
                                <TableHead>Reservas</TableHead>
                                <TableHead>Horas</TableHead>
                                <TableHead>Ocupación</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {utilizacion.map((fila) => (
                                <TableRow key={fila.espacio_id}>
                                    <TableCell className="font-medium">
                                        {fila.espacio}
                                    </TableCell>
                                    <TableCell>{fila.sede}</TableCell>
                                    <TableCell className="tabular-nums">
                                        {fila.reservas}
                                    </TableCell>
                                    <TableCell className="tabular-nums">
                                        {fila.horas}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="tabular-nums">
                                                {fila.ocupacion}%
                                            </span>
                                            <span className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                                <span
                                                    className="block h-full rounded-full bg-primary"
                                                    style={{
                                                        width: `${Math.min(100, fila.ocupacion)}%`,
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

ReportesEspacios.layout = {
    breadcrumbs: [
        { title: 'Espacios', href: index() },
        { title: 'Utilización', href: reportes() },
    ],
};
