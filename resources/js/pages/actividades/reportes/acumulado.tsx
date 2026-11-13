import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { BotonImprimir } from '@/components/boton-imprimir';
import { MembreteInstitucional } from '@/components/membrete-institucional';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { acumulado, mensual } from '@/routes/actividades/reportes';

type Grupo = { etiqueta: string; total: number; cerradas?: number };

type Props = {
    filtros: {
        anio: number;
        periodo: string;
        bloque: number;
        unidad_id: number | null;
    };
    rango: { desde: string; hasta: string; etiqueta: string };
    resumen: {
        programadas: number;
        cerradas: number;
        canceladas: number;
        logros: number;
        beneficiarios: number;
        participantes: number;
    };
    porMes: Grupo[];
    porUnidad: Grupo[];
    porTipo: Grupo[];
    indicadores: {
        nombre: string;
        unidad_medida: string;
        meta: number;
        alcanzado: number;
    }[];
    unidades: { valor: number; nombre: string }[];
};

function Distribucion({ titulo, grupos }: { titulo: string; grupos: Grupo[] }) {
    const mayor = Math.max(1, ...grupos.map((grupo) => grupo.total));

    return (
        <Card>
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {grupos.map((grupo) => (
                    <div key={grupo.etiqueta} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="capitalize">{grupo.etiqueta}</span>
                            <span className="text-muted-foreground tabular-nums">
                                {grupo.total}
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                    width: `${(grupo.total / mayor) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}

                {grupos.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Sin actividades en el período.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function ReporteAcumulado({
    filtros,
    rango,
    resumen,
    porMes,
    porUnidad,
    porTipo,
    indicadores,
    unidades,
}: Props) {
    const navegar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            acumulado().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const alcance = filtros.unidad_id
        ? (unidades.find((unidad) => unidad.valor === filtros.unidad_id)
              ?.nombre ?? null)
        : 'Consolidado de todas las unidades';

    const bloques =
        filtros.periodo === 'trimestral'
            ? [1, 2, 3, 4]
            : filtros.periodo === 'semestral'
              ? [1, 2]
              : [];

    return (
        <>
            <Head title="Reporte acumulado" />

            <div className="space-y-6 px-4 py-6">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 print:hidden"
                >
                    <Link href={mensual()}>
                        <ArrowLeft />
                        Volver al reporte mensual
                    </Link>
                </Button>

                <MembreteInstitucional
                    titulo="Reporte acumulado de actividades"
                    periodo={rango.etiqueta}
                    alcance={alcance}
                />

                <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
                    <Heading
                        title="Reportes acumulados"
                        description="Trimestral, semestral y anual, con el detalle por mes, unidad y tipo"
                    />
                    <BotonImprimir />
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="grid gap-1">
                        <Label htmlFor="anio" className="text-xs">
                            Año
                        </Label>
                        <Input
                            id="anio"
                            type="number"
                            className="w-28"
                            defaultValue={filtros.anio}
                            onBlur={(evento) =>
                                navegar({ anio: Number(evento.target.value) })
                            }
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label className="text-xs">Período</Label>
                        <Select
                            value={filtros.periodo}
                            onValueChange={(valor) =>
                                navegar({ periodo: valor, bloque: 1 })
                            }
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="trimestral">
                                    Trimestral
                                </SelectItem>
                                <SelectItem value="semestral">
                                    Semestral
                                </SelectItem>
                                <SelectItem value="anual">Anual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {bloques.length > 0 && (
                        <div className="grid gap-1">
                            <Label className="text-xs">
                                {filtros.periodo === 'trimestral'
                                    ? 'Trimestre'
                                    : 'Semestre'}
                            </Label>
                            <Select
                                value={String(filtros.bloque)}
                                onValueChange={(valor) =>
                                    navegar({ bloque: Number(valor) })
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {bloques.map((bloque) => (
                                        <SelectItem
                                            key={bloque}
                                            value={String(bloque)}
                                        >
                                            {bloque}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid gap-1">
                        <Label className="text-xs">Unidad</Label>
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
                            <SelectTrigger className="w-56">
                                <SelectValue />
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

                    <p className="text-sm text-muted-foreground">
                        {rango.etiqueta}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                        ['Programadas', resumen.programadas],
                        ['Cerradas', resumen.cerradas],
                        ['Canceladas', resumen.canceladas],
                        ['Logros', resumen.logros],
                        ['Beneficiarios', resumen.beneficiarios],
                    ].map(([etiqueta, valor]) => (
                        <Card key={String(etiqueta)}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    {etiqueta}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-semibold">
                                    {valor}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Distribucion titulo="Por mes" grupos={porMes} />
                    <Distribucion titulo="Por unidad" grupos={porUnidad} />
                    <Distribucion titulo="Por tipo" grupos={porTipo} />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Indicadores del período</CardTitle>
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
                                            Sin indicadores registrados en el
                                            período.
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

ReporteAcumulado.layout = {
    breadcrumbs: [
        { title: 'Actividades', href: index() },
        { title: 'Acumulados', href: acumulado() },
    ],
};
