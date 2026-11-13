import { Form, Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Download,
    ExternalLink,
    FileEdit,
    Link2,
    MessageSquareWarning,
    Pencil,
    Play,
    Send,
    TrendingUp,
    Unlink,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

import ActividadProyectoController from '@/actions/App/Http/Controllers/Proyectos/ActividadProyectoController';
import AprobacionProyectoController from '@/actions/App/Http/Controllers/Proyectos/AprobacionProyectoController';
import EjecucionProyectoController from '@/actions/App/Http/Controllers/Proyectos/EjecucionProyectoController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { edit, index, informe } from '@/routes/proyectos';
import { create as crearAvance } from '@/routes/proyectos/avance';
import { edit as editarCierre } from '@/routes/proyectos/cierre';
import { edit as editarFormulacion } from '@/routes/proyectos/formulacion';
import { colorEstadoProyecto } from './index';
import type { PermisosProyecto, ProyectoFicha } from './tipos';
import { fechaLegible } from '@/lib/fecha';

type Dialogo = 'observar' | 'rechazar' | 'suspender' | 'cancelar' | null;

type Props = {
    proyecto: ProyectoFicha;
    permisos: PermisosProyecto;
    actividadesDisponibles: { valor: number; nombre: string }[];
};

function Dato({
    etiqueta,
    valor,
}: {
    etiqueta: string;
    valor: string | number | null;
}) {
    return (
        <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                {etiqueta}
            </dt>
            <dd className="mt-0.5 text-sm">{valor ?? '—'}</dd>
        </div>
    );
}

function Barra({ valor }: { valor: number }) {
    return (
        <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, Math.max(0, valor))}%` }}
            />
        </div>
    );
}

export default function FichaProyecto({
    proyecto,
    permisos,
    actividadesDisponibles,
}: Props) {
    const [dialogo, setDialogo] = useState<Dialogo>(null);
    const [actividadId, setActividadId] = useState('');

    const esComentario = dialogo === 'observar' || dialogo === 'rechazar';

    return (
        <>
            <Head title={proyecto.nombre} />

            <div className="space-y-6 px-4 py-6">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver a proyectos
                    </Link>
                </Button>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {proyecto.nombre}
                        </h1>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge
                                variant={colorEstadoProyecto(proyecto.estado)}
                            >
                                {proyecto.estado_nombre}
                            </Badge>
                            {proyecto.tipo && (
                                <Badge variant="outline">{proyecto.tipo}</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                                {proyecto.unidad}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <a href={informe(proyecto.id).url}>
                                <Download />
                                Informe (CSV)
                            </a>
                        </Button>

                        {permisos.editar && (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={edit(proyecto.id)}>
                                        <Pencil />
                                        Editar
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={editarFormulacion(proyecto.id)}>
                                        <FileEdit />
                                        Formulación
                                    </Link>
                                </Button>
                            </>
                        )}

                        {permisos.enviar && (
                            <Button
                                onClick={() =>
                                    router.patch(
                                        AprobacionProyectoController.enviar.url(
                                            proyecto.id,
                                        ),
                                        {},
                                        { preserveScroll: true },
                                    )
                                }
                            >
                                <Send />
                                Enviar a aprobación
                            </Button>
                        )}

                        {permisos.aprobar && (
                            <>
                                <Button
                                    onClick={() =>
                                        router.patch(
                                            AprobacionProyectoController.aprobar.url(
                                                proyecto.id,
                                            ),
                                            {},
                                            { preserveScroll: true },
                                        )
                                    }
                                >
                                    <CheckCircle2 />
                                    Aprobar
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setDialogo('observar')}
                                >
                                    <MessageSquareWarning />
                                    Observar
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setDialogo('rechazar')}
                                >
                                    <XCircle />
                                    Rechazar
                                </Button>
                            </>
                        )}

                        {permisos.gestionar && (
                            <>
                                {proyecto.estado === 'aprobado' && (
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            router.patch(
                                                EjecucionProyectoController.iniciar.url(
                                                    proyecto.id,
                                                ),
                                                {},
                                                { preserveScroll: true },
                                            )
                                        }
                                    >
                                        <Play />
                                        Iniciar ejecución
                                    </Button>
                                )}

                                <Button variant="outline" asChild>
                                    <Link href={crearAvance(proyecto.id)}>
                                        <TrendingUp />
                                        Registrar avance
                                    </Link>
                                </Button>

                                {proyecto.estado === 'en_ejecucion' && (
                                    <Button asChild>
                                        <Link href={editarCierre(proyecto.id)}>
                                            <CheckCircle2 />
                                            Cerrar proyecto
                                        </Link>
                                    </Button>
                                )}

                                <Button
                                    variant="outline"
                                    onClick={() => setDialogo('suspender')}
                                >
                                    Suspender
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setDialogo('cancelar')}
                                >
                                    <XCircle />
                                    Cancelar
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Avance físico
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-semibold">
                                {proyecto.seguimiento.avance_fisico}%
                            </p>
                            <Barra valor={proyecto.seguimiento.avance_fisico} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Avance financiero
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-semibold">
                                {proyecto.seguimiento.avance_financiero}%
                            </p>
                            <Barra
                                valor={proyecto.seguimiento.avance_financiero}
                            />
                            <p className="text-xs text-muted-foreground">
                                Q{proyecto.seguimiento.presupuesto_ejecutado} de
                                Q{proyecto.seguimiento.presupuesto_total}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Actividades cerradas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">
                                {proyecto.seguimiento.actividades_cerradas}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Beneficiarios atendidos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">
                                {proyecto.seguimiento.beneficiarios_actividades}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Datos generales</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <Dato
                                    etiqueta="Responsable"
                                    valor={proyecto.responsable}
                                />
                                <Dato etiqueta="Área" valor={proyecto.area} />
                                <Dato
                                    etiqueta="Programa"
                                    valor={proyecto.programa}
                                />
                                <Dato
                                    etiqueta="Línea de acción"
                                    valor={proyecto.linea_accion}
                                />
                                <Dato
                                    etiqueta="Inicio"
                                    valor={fechaLegible(proyecto.fecha_inicio)}
                                />
                                <Dato
                                    etiqueta="Finalización"
                                    valor={fechaLegible(proyecto.fecha_fin)}
                                />
                            </dl>

                            {proyecto.objetivo_general && (
                                <div>
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Objetivo general
                                    </h2>
                                    <p className="mt-1 text-sm">
                                        {proyecto.objetivo_general}
                                    </p>
                                </div>
                            )}

                            {proyecto.objetivos.length > 0 && (
                                <div>
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Objetivos específicos
                                    </h2>
                                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                                        {proyecto.objetivos.map((objetivo) => (
                                            <li key={objetivo}>{objetivo}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {proyecto.motivo_estado && (
                                <p className="text-sm text-muted-foreground">
                                    Observación: {proyecto.motivo_estado}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Indicadores</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {proyecto.indicadores.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin indicadores formulados.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-sm">
                                    {proyecto.indicadores.map((indicador) => (
                                        <li key={indicador.id}>
                                            <span className="block">
                                                {indicador.nombre}
                                            </span>
                                            <span className="text-muted-foreground">
                                                Meta: {indicador.meta ?? '—'} ·
                                                Final:{' '}
                                                {indicador.valor_final ?? '—'} ·
                                                Actividades:{' '}
                                                {indicador.aporte_actividades}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cronograma</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tarea</TableHead>
                                        <TableHead>Período</TableHead>
                                        <TableHead>Avance</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {proyecto.cronograma.map((tarea) => (
                                        <TableRow key={tarea.id}>
                                            <TableCell>
                                                {tarea.tarea}
                                                {tarea.responsable && (
                                                    <span className="block text-xs text-muted-foreground">
                                                        {tarea.responsable}
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-xs whitespace-nowrap">
                                                {fechaLegible(
                                                    tarea.fecha_inicio,
                                                ) || '—'}
                                                {tarea.fecha_fin
                                                    ? ` – ${fechaLegible(tarea.fecha_fin)}`
                                                    : ''}
                                            </TableCell>
                                            <TableCell className="w-28">
                                                <span className="mb-1 block text-xs tabular-nums">
                                                    {tarea.avance}%
                                                </span>
                                                <Barra valor={tarea.avance} />
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {proyecto.cronograma.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="py-6 text-center text-muted-foreground"
                                            >
                                                Sin cronograma formulado.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Presupuesto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Renglón</TableHead>
                                        <TableHead>Subtotal</TableHead>
                                        <TableHead>Ejecutado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {proyecto.presupuesto.map((renglon) => (
                                        <TableRow key={renglon.id}>
                                            <TableCell>
                                                {renglon.descripcion}
                                                {renglon.fuente && (
                                                    <span className="block text-xs text-muted-foreground">
                                                        {renglon.fuente}
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="tabular-nums">
                                                Q{renglon.subtotal}
                                            </TableCell>
                                            <TableCell className="tabular-nums">
                                                Q{renglon.ejecutado}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {proyecto.presupuesto.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="py-6 text-center text-muted-foreground"
                                            >
                                                Sin presupuesto formulado.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Actividades vinculadas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {permisos.gestionar &&
                            actividadesDisponibles.length > 0 && (
                                <Form
                                    {...ActividadProyectoController.store.form(
                                        proyecto.id,
                                    )}
                                    options={{ preserveScroll: true }}
                                    onSuccess={() => setActividadId('')}
                                    className="flex flex-wrap items-end gap-2"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="grid gap-1">
                                                <Label
                                                    htmlFor="actividad_id"
                                                    className="text-xs"
                                                >
                                                    Actividad de la unidad
                                                </Label>
                                                <select
                                                    id="actividad_id"
                                                    name="actividad_id"
                                                    value={actividadId}
                                                    onChange={(evento) =>
                                                        setActividadId(
                                                            evento.target.value,
                                                        )
                                                    }
                                                    className="h-9 w-80 rounded-md border border-input bg-transparent px-3 text-sm"
                                                >
                                                    <option value="">
                                                        Seleccione una actividad
                                                    </option>
                                                    {actividadesDisponibles.map(
                                                        (actividad) => (
                                                            <option
                                                                key={
                                                                    actividad.valor
                                                                }
                                                                value={
                                                                    actividad.valor
                                                                }
                                                            >
                                                                {
                                                                    actividad.nombre
                                                                }
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <InputError
                                                    message={
                                                        errors.actividad_id
                                                    }
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                variant="outline"
                                                disabled={
                                                    processing || !actividadId
                                                }
                                            >
                                                {processing && <Spinner />}
                                                <Link2 />
                                                Vincular
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            )}

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Actividad</TableHead>
                                    <TableHead>Estado</TableHead>
                                    {permisos.gestionar && (
                                        <TableHead className="text-right">
                                            Acciones
                                        </TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {proyecto.actividades.map((actividad) => (
                                    <TableRow key={actividad.id}>
                                        <TableCell>
                                            {fechaLegible(actividad.fecha)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {actividad.nombre}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {actividad.estado_nombre}
                                            </Badge>
                                        </TableCell>
                                        {permisos.gestionar && (
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.delete(
                                                            ActividadProyectoController.destroy.url(
                                                                {
                                                                    proyecto:
                                                                        proyecto.id,
                                                                    actividad:
                                                                        actividad.id,
                                                                },
                                                            ),
                                                            {
                                                                preserveScroll: true,
                                                            },
                                                        )
                                                    }
                                                >
                                                    <Unlink />
                                                    Desvincular
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}

                                {proyecto.actividades.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={permisos.gestionar ? 4 : 3}
                                            className="py-6 text-center text-muted-foreground"
                                        >
                                            El proyecto todavía no tiene
                                            actividades vinculadas.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {proyecto.estado === 'cerrado' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Cierre</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                    Resultados
                                </h2>
                                <p className="mt-1 whitespace-pre-line">
                                    {proyecto.resultados}
                                </p>
                            </div>

                            {proyecto.productos && (
                                <div>
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Productos
                                    </h2>
                                    <p className="mt-1 whitespace-pre-line">
                                        {proyecto.productos}
                                    </p>
                                </div>
                            )}

                            {proyecto.lecciones_aprendidas && (
                                <div>
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Lecciones aprendidas
                                    </h2>
                                    <p className="mt-1 whitespace-pre-line">
                                        {proyecto.lecciones_aprendidas}
                                    </p>
                                </div>
                            )}

                            {proyecto.evidencias.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {proyecto.evidencias.map((evidencia) => (
                                        <Button
                                            key={evidencia.id}
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <a
                                                href={evidencia.enlace ?? '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink />
                                                {evidencia.nombre ??
                                                    'Evidencia'}
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Avances registrados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {proyecto.avances.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Todavía no se registran avances.
                                </p>
                            ) : (
                                <ul className="space-y-4 text-sm">
                                    {proyecto.avances.map((registro) => (
                                        <li key={registro.id}>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    {fechaLegible(
                                                        registro.fecha,
                                                    )}
                                                </span>
                                                <span className="tabular-nums">
                                                    {registro.porcentaje}%
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground">
                                                {registro.descripcion}
                                            </p>
                                            {registro.evidencias.length > 0 && (
                                                <div className="mt-1 flex flex-wrap gap-2">
                                                    {registro.evidencias.map(
                                                        (evidencia) => (
                                                            <a
                                                                key={
                                                                    evidencia.id
                                                                }
                                                                href={
                                                                    evidencia.enlace ??
                                                                    '#'
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs underline"
                                                            >
                                                                {evidencia.nombre ??
                                                                    'Evidencia'}
                                                            </a>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historial</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {proyecto.revisiones.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin movimientos registrados.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-sm">
                                    {proyecto.revisiones.map((revision) => (
                                        <li key={revision.id}>
                                            <span className="font-medium">
                                                {revision.accion}
                                            </span>
                                            <span className="block text-xs text-muted-foreground">
                                                {revision.usuario} ·{' '}
                                                {revision.fecha}
                                            </span>
                                            {revision.comentario && (
                                                <p className="mt-1 text-muted-foreground">
                                                    {revision.comentario}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog
                open={dialogo !== null}
                onOpenChange={(abierto) => !abierto && setDialogo(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogo === 'observar' && 'Observar proyecto'}
                            {dialogo === 'rechazar' && 'Rechazar proyecto'}
                            {dialogo === 'suspender' && 'Suspender proyecto'}
                            {dialogo === 'cancelar' && 'Cancelar proyecto'}
                        </DialogTitle>
                        <DialogDescription>
                            {esComentario
                                ? 'El comentario queda en el historial y vuelve a la unidad.'
                                : 'Indique el motivo; queda registrado en el historial.'}
                        </DialogDescription>
                    </DialogHeader>

                    {dialogo !== null && (
                        <Form
                            {...(dialogo === 'observar'
                                ? AprobacionProyectoController.observar.form(
                                      proyecto.id,
                                  )
                                : dialogo === 'rechazar'
                                  ? AprobacionProyectoController.rechazar.form(
                                        proyecto.id,
                                    )
                                  : dialogo === 'suspender'
                                    ? EjecucionProyectoController.suspender.form(
                                          proyecto.id,
                                      )
                                    : EjecucionProyectoController.cancelar.form(
                                          proyecto.id,
                                      ))}
                            options={{ preserveScroll: true }}
                            onSuccess={() => setDialogo(null)}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor={
                                                esComentario
                                                    ? 'comentario'
                                                    : 'motivo'
                                            }
                                        >
                                            {esComentario
                                                ? 'Comentario'
                                                : 'Motivo'}
                                        </Label>
                                        <Textarea
                                            id={
                                                esComentario
                                                    ? 'comentario'
                                                    : 'motivo'
                                            }
                                            name={
                                                esComentario
                                                    ? 'comentario'
                                                    : 'motivo'
                                            }
                                            rows={3}
                                            required
                                        />
                                        <InputError
                                            message={
                                                esComentario
                                                    ? errors.comentario
                                                    : errors.motivo
                                            }
                                        />
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setDialogo(null)}
                                        >
                                            Cerrar
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing && <Spinner />}
                                            Confirmar
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

FichaProyecto.layout = {
    breadcrumbs: [{ title: 'Proyectos', href: index() }],
};
