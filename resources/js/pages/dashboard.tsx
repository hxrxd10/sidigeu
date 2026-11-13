import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    CalendarCheck,
    FolderKanban,
    UsersRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes';
import { index as actividades } from '@/routes/actividades';
import { index as calendario } from '@/routes/calendario';
import { index as proyectos } from '@/routes/proyectos';
import { index as recursoHumano } from '@/routes/recurso-humano';
import { GraficaBarras } from '@/components/graficas/barras';
import { GraficaTendencia } from '@/components/graficas/tendencia';
import { fechaLegible } from '@/lib/fecha';

type Props = {
    saludo: { nombre: string; unidad: string | null; fecha: string };
    actividades: {
        total: number;
        porEstado: { etiqueta: string; total: number }[];
        cerradas: number;
        enAgenda: number;
        proximas: {
            id: number;
            nombre: string;
            fecha: string;
            hora_inicio: string | null;
            lugar: string;
            unidad: string;
            estado_nombre: string;
        }[];
    };
    proyectos: {
        enEjecucion: number;
        enRevision: number;
        cerrados: number;
        seguimiento: {
            id: number;
            nombre: string;
            unidad: string;
            avance_fisico: number;
        }[];
    };
    espacios: {
        total: number;
        disponibles: number;
        enMantenimiento: number;
        reservasSemana: number;
        rango: string;
        proximas: {
            id: number;
            espacio: string;
            fecha: string;
            hora_inicio: string;
            hora_fin: string;
            solicitante: string;
        }[];
    };
    recursoHumano: {
        activos: number;
        inactivos: number;
        artistas: number;
        deportistas: number;
    };
    pendientes: { etiqueta: string; total: number; ruta: string }[];
    graficas: {
        porTipo: { etiqueta: string; valor: number }[];
        actividadesPorMes: { etiqueta: string; valor: number }[];
        beneficiariosPorMes: { etiqueta: string; valor: number }[];
    };
};

function Indicador({
    etiqueta,
    valor,
    detalle,
    icono: Icono,
    href,
}: {
    etiqueta: string;
    valor: number;
    detalle: string;
    icono: typeof CalendarCheck;
    href: string;
}) {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {etiqueta}
                </CardTitle>
                <Icono className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-3xl font-semibold">{valor}</p>
                <p className="text-xs text-muted-foreground">{detalle}</p>
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={href}>
                        Ver
                        <ArrowRight />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export default function Dashboard({
    saludo,
    actividades: resumenActividades,
    proyectos: resumenProyectos,
    espacios,
    recursoHumano: personas,
    pendientes,
    graficas,
}: Props) {
    return (
        <>
            <Head title="Panel" />

            <div className="space-y-6 px-4 py-6">
                <header>
                    <h1 className="text-2xl font-semibold">
                        Hola, {saludo.nombre}
                    </h1>
                    <p className="text-sm text-muted-foreground first-letter:uppercase">
                        {saludo.fecha}
                        {saludo.unidad ? ` · ${saludo.unidad}` : ''}
                    </p>
                </header>

                {pendientes.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {pendientes.map((pendiente) => (
                            <Button
                                key={pendiente.etiqueta}
                                variant={
                                    pendiente.total > 0 ? 'default' : 'outline'
                                }
                                asChild
                            >
                                <Link href={pendiente.ruta}>
                                    {pendiente.etiqueta}
                                    <Badge
                                        variant="secondary"
                                        className="ml-1 tabular-nums"
                                    >
                                        {pendiente.total}
                                    </Badge>
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Indicador
                        etiqueta="Actividades del mes"
                        valor={resumenActividades.total}
                        detalle={`${resumenActividades.cerradas} cerradas · ${resumenActividades.enAgenda} en agenda`}
                        icono={CalendarCheck}
                        href={actividades().url}
                    />
                    <Indicador
                        etiqueta="Proyectos en ejecución"
                        valor={resumenProyectos.enEjecucion}
                        detalle={`${resumenProyectos.enRevision} en revisión · ${resumenProyectos.cerrados} cerrados`}
                        icono={FolderKanban}
                        href={proyectos().url}
                    />
                    <Indicador
                        etiqueta="Reservas de la semana"
                        valor={espacios.reservasSemana}
                        detalle={`${espacios.rango} · ${espacios.disponibles} de ${espacios.total} espacios activos`}
                        icono={Building2}
                        href={calendario().url}
                    />
                    <Indicador
                        etiqueta="Recurso humano activo"
                        valor={personas.activos}
                        detalle={`${personas.artistas} artistas · ${personas.deportistas} deportistas`}
                        icono={UsersRound}
                        href={recursoHumano().url}
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Próximas actividades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {resumenActividades.proximas.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No hay actividades programadas por delante.
                                </p>
                            ) : (
                                <ul className="divide-y">
                                    {resumenActividades.proximas.map(
                                        (actividad) => (
                                            <li
                                                key={actividad.id}
                                                className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {actividad.nombre}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {fechaLegible(
                                                            actividad.fecha,
                                                        )}
                                                        {actividad.hora_inicio
                                                            ? ` · ${actividad.hora_inicio}`
                                                            : ''}{' '}
                                                        · {actividad.lugar} ·{' '}
                                                        {actividad.unidad}
                                                    </p>
                                                </div>
                                                <Badge variant="secondary">
                                                    {actividad.estado_nombre}
                                                </Badge>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actividades por estado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {resumenActividades.porEstado.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin actividades registradas este mes.
                                </p>
                            ) : (
                                <GraficaBarras
                                    descripcion="Actividades del mes en curso agrupadas por estado"
                                    etiquetaValor="Actividades"
                                    filas={resumenActividades.porEstado.map(
                                        (estado) => ({
                                            etiqueta: estado.etiqueta,
                                            valor: estado.total,
                                        }),
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actividades por tipo</CardTitle>
                            <CardDescription>Mes en curso</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {graficas.porTipo.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin actividades registradas este mes.
                                </p>
                            ) : (
                                <GraficaBarras
                                    descripcion="Actividades del mes en curso agrupadas por tipo de actividad"
                                    etiquetaValor="Actividades"
                                    filas={graficas.porTipo}
                                />
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actividades por mes</CardTitle>
                            <CardDescription>
                                Últimos seis meses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <GraficaTendencia
                                variante="columnas"
                                descripcion="Actividades programadas por mes en los últimos seis meses"
                                etiquetaValor="Actividades"
                                puntos={graficas.actividadesPorMes}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Beneficiarios atendidos</CardTitle>
                            <CardDescription>
                                Últimos seis meses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <GraficaTendencia
                                variante="area"
                                descripcion="Beneficiarios atendidos por mes en los últimos seis meses"
                                etiquetaValor="Beneficiarios"
                                puntos={graficas.beneficiariosPorMes}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Proyectos en seguimiento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {resumenProyectos.seguimiento.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No hay proyectos en ejecución.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-sm">
                                    {resumenProyectos.seguimiento.map(
                                        (proyecto) => (
                                            <li key={proyecto.id}>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">
                                                        {proyecto.nombre}
                                                    </span>
                                                    <span className="text-muted-foreground tabular-nums">
                                                        {proyecto.avance_fisico}
                                                        %
                                                    </span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {proyecto.unidad}
                                                </span>
                                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{
                                                            width: `${proyecto.avance_fisico}%`,
                                                        }}
                                                    />
                                                </div>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Ocupación de espacios ({espacios.rango})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {espacios.proximas.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No hay reservas confirmadas esta semana.
                                </p>
                            ) : (
                                <ul className="divide-y text-sm">
                                    {espacios.proximas.map((reserva) => (
                                        <li
                                            key={reserva.id}
                                            className="flex items-start justify-between gap-4 py-2 first:pt-0 last:pb-0"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {reserva.espacio}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {reserva.solicitante}
                                                </p>
                                            </div>
                                            <span className="text-xs whitespace-nowrap text-muted-foreground">
                                                {fechaLegible(reserva.fecha)}
                                                <br />
                                                {reserva.hora_inicio} –{' '}
                                                {reserva.hora_fin}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {espacios.enMantenimiento > 0 && (
                                <p className="mt-3 text-xs text-muted-foreground">
                                    {espacios.enMantenimiento} espacio(s) en
                                    mantenimiento.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Panel', href: dashboard() }],
};
