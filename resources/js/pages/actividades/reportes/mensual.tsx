import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Download, TrendingUp } from 'lucide-react';

import { BotonImprimir } from '@/components/boton-imprimir';
import { MembreteInstitucional } from '@/components/membrete-institucional';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index } from '@/routes/actividades';
import { acumulado, exportar, mensual } from '@/routes/actividades/reportes';
import { fechaLegible } from '@/lib/fecha';

type FilaReporte = {
    id: number;
    nombre: string;
    fecha: string;
    unidad: string;
    tipo: string;
    lugar: string;
    beneficiarios: number;
    participantes: number;
    resultados: string | null;
};

type Props = {
    filtros: { mes: string; unidad_id: number | null };
    periodo: { etiqueta: string; anterior: string; siguiente: string };
    resumen: {
        programadas: number;
        cerradas: number;
        canceladas: number;
        logros: number;
        beneficiarios: number;
        participantes: number;
    };
    realizadas: FilaReporte[];
    logros: FilaReporte[];
    indicadores: {
        nombre: string;
        unidad_medida: string;
        meta: number;
        alcanzado: number;
    }[];
    unidades: { valor: number; nombre: string }[];
};

function Indicador({ etiqueta, valor }: { etiqueta: string; valor: number }) {
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

function TablaActividades({
    titulo,
    filas,
    vacio,
}: {
    titulo: string;
    filas: FilaReporte[];
    vacio: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Actividad</TableHead>
                            <TableHead>Unidad</TableHead>
                            <TableHead>Lugar</TableHead>
                            <TableHead>Beneficiarios</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filas.map((fila) => (
                            <TableRow key={fila.id}>
                                <TableCell>
                                    {fechaLegible(fila.fecha)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {fila.nombre}
                                    {fila.resultados && (
                                        <span className="block text-xs text-muted-foreground">
                                            {fila.resultados}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>{fila.unidad}</TableCell>
                                <TableCell>{fila.lugar}</TableCell>
                                <TableCell className="tabular-nums">
                                    {fila.beneficiarios}
                                </TableCell>
                            </TableRow>
                        ))}

                        {filas.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    {vacio}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function ReporteMensual({
    filtros,
    periodo,
    resumen,
    realizadas,
    logros,
    indicadores,
    unidades,
}: Props) {
    const alcance = filtros.unidad_id
        ? (unidades.find((unidad) => unidad.valor === filtros.unidad_id)
              ?.nombre ?? null)
        : 'Consolidado de todas las unidades';

    const navegar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            mensual().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Reporte mensual" />

            <div className="space-y-6 px-4 py-6">
                <MembreteInstitucional
                    titulo="Reporte mensual de actividades"
                    periodo={periodo.etiqueta}
                    alcance={alcance}
                />

                <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
                    <Heading
                        title="Reporte mensual"
                        description="Actividades realizadas, logros del mes e indicadores alcanzados"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={acumulado()}>
                                <TrendingUp />
                                Acumulados
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={exportar({ query: filtros }).url}>
                                <Download />
                                Exportar (CSV)
                            </a>
                        </Button>
                        <BotonImprimir />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Mes anterior"
                            onClick={() => navegar({ mes: periodo.anterior })}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Mes siguiente"
                            onClick={() => navegar({ mes: periodo.siguiente })}
                        >
                            <ChevronRight />
                        </Button>
                    </div>

                    <p className="font-medium first-letter:uppercase">
                        {periodo.etiqueta}
                    </p>

                    <Select
                        value={
                            filtros.unidad_id
                                ? String(filtros.unidad_id)
                                : 'consolidado'
                        }
                        onValueChange={(valor) =>
                            navegar({
                                unidad_id:
                                    valor === 'consolidado'
                                        ? null
                                        : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="ml-auto w-60">
                            <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="consolidado">
                                Consolidado DIGEU
                            </SelectItem>
                            {unidades.map((unidad) => (
                                <SelectItem
                                    key={unidad.valor}
                                    value={String(unidad.valor)}
                                >
                                    {unidad.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <Indicador
                        etiqueta="Programadas"
                        valor={resumen.programadas}
                    />
                    <Indicador etiqueta="Cerradas" valor={resumen.cerradas} />
                    <Indicador
                        etiqueta="Canceladas"
                        valor={resumen.canceladas}
                    />
                    <Indicador etiqueta="Logros" valor={resumen.logros} />
                    <Indicador
                        etiqueta="Beneficiarios"
                        valor={resumen.beneficiarios}
                    />
                </div>

                <TablaActividades
                    titulo="Actividades realizadas"
                    filas={realizadas}
                    vacio="No hay actividades cerradas en el mes."
                />

                <TablaActividades
                    titulo="Logros del mes"
                    filas={logros}
                    vacio="No se registraron logros no programados."
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Indicadores alcanzados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Indicador</TableHead>
                                    <TableHead>Unidad de medida</TableHead>
                                    <TableHead>Meta</TableHead>
                                    <TableHead>Alcanzado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {indicadores.map((indicador) => (
                                    <TableRow key={indicador.nombre}>
                                        <TableCell className="font-medium">
                                            {indicador.nombre}
                                        </TableCell>
                                        <TableCell>
                                            {indicador.unidad_medida}
                                        </TableCell>
                                        <TableCell className="tabular-nums">
                                            {indicador.meta}
                                        </TableCell>
                                        <TableCell className="tabular-nums">
                                            {indicador.alcanzado}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {indicadores.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            Las actividades del mes no tienen
                                            indicadores asociados.
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

ReporteMensual.layout = {
    breadcrumbs: [
        { title: 'Actividades', href: index() },
        { title: 'Reporte mensual', href: mensual() },
    ],
};
