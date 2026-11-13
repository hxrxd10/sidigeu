import { Form, Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarClock,
    CalendarOff,
    CalendarPlus,
    CheckCircle2,
    ExternalLink,
    MessageSquareWarning,
    Pencil,
    Play,
    Send,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

import EstadoActividadController from '@/actions/App/Http/Controllers/Actividades/EstadoActividadController';
import RevisionActividadController from '@/actions/App/Http/Controllers/Actividades/RevisionActividadController';
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
import { Input } from '@/components/ui/input';
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
import { edit, index } from '@/routes/actividades';
import { edit as editarCierre } from '@/routes/actividades/cierre';
import { colorEstado } from './index';
import type { ActividadFicha, PermisosActividad } from './tipos';
import { fechaHoraLegible, fechaLegible } from '@/lib/fecha';

type Dialogo = 'observar' | 'rechazar' | 'reprogramar' | 'cancelar' | null;

type Props = {
    actividad: ActividadFicha;
    permisos: PermisosActividad;
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

export default function FichaActividad({ actividad, permisos }: Props) {
    const [dialogo, setDialogo] = useState<Dialogo>(null);

    const cerrarDialogo = () => setDialogo(null);

    return (
        <>
            <Head title={actividad.nombre} />

            <div className="space-y-6 px-4 py-6">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver a la programación
                    </Link>
                </Button>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {actividad.nombre}
                        </h1>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge variant={colorEstado(actividad.estado)}>
                                {actividad.estado_nombre}
                            </Badge>
                            <Badge variant="outline">{actividad.tipo}</Badge>
                            <span className="text-sm text-muted-foreground">
                                {actividad.unidad}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {permisos.editar && (
                            <Button variant="outline" asChild>
                                <Link href={edit(actividad.id)}>
                                    <Pencil />
                                    Editar
                                </Link>
                            </Button>
                        )}

                        {permisos.enviar && (
                            <Button
                                onClick={() =>
                                    router.patch(
                                        RevisionActividadController.enviar.url(
                                            actividad.id,
                                        ),
                                        {},
                                        { preserveScroll: true },
                                    )
                                }
                            >
                                <Send />
                                Enviar a revisión
                            </Button>
                        )}

                        {permisos.validar && (
                            <>
                                <Button
                                    onClick={() =>
                                        router.patch(
                                            RevisionActividadController.validar.url(
                                                actividad.id,
                                            ),
                                            {},
                                            { preserveScroll: true },
                                        )
                                    }
                                >
                                    <CheckCircle2 />
                                    Validar
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

                        {permisos.publicarAgenda && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.patch(
                                        RevisionActividadController.publicarAgenda.url(
                                            actividad.id,
                                        ),
                                        {},
                                        { preserveScroll: true },
                                    )
                                }
                            >
                                <CalendarPlus />
                                Publicar en la agenda
                            </Button>
                        )}

                        {permisos.quitarAgenda && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.patch(
                                        RevisionActividadController.quitarAgenda.url(
                                            actividad.id,
                                        ),
                                        {},
                                        { preserveScroll: true },
                                    )
                                }
                            >
                                <CalendarOff />
                                Quitar de la agenda
                            </Button>
                        )}

                        {permisos.gestionar && (
                            <>
                                {[
                                    'validada',
                                    'publicada_agenda',
                                    'reprogramada',
                                ].includes(actividad.estado) && (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                router.patch(
                                                    EstadoActividadController.iniciar.url(
                                                        actividad.id,
                                                    ),
                                                    {},
                                                    { preserveScroll: true },
                                                )
                                            }
                                        >
                                            <Play />
                                            Iniciar ejecución
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setDialogo('reprogramar')
                                            }
                                        >
                                            <CalendarClock />
                                            Reprogramar
                                        </Button>
                                    </>
                                )}

                                {actividad.estado === 'en_ejecucion' && (
                                    <Button asChild>
                                        <Link href={editarCierre(actividad.id)}>
                                            <CheckCircle2 />
                                            Cerrar actividad
                                        </Link>
                                    </Button>
                                )}

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

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Programación</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <Dato
                                    etiqueta="Fecha"
                                    valor={fechaLegible(actividad.fecha)}
                                />
                                <Dato
                                    etiqueta="Horario"
                                    valor={
                                        actividad.hora_inicio
                                            ? `${actividad.hora_inicio} – ${actividad.hora_fin ?? ''}`
                                            : null
                                    }
                                />
                                <Dato
                                    etiqueta="Lugar"
                                    valor={actividad.lugar}
                                />
                                <Dato
                                    etiqueta="Responsable"
                                    valor={actividad.responsable}
                                />
                                <Dato
                                    etiqueta="Línea de acción"
                                    valor={actividad.linea_accion}
                                />
                                <Dato
                                    etiqueta="Agenda Cultural"
                                    valor={
                                        actividad.publicar_agenda
                                            ? 'Publicada'
                                            : 'No publicada'
                                    }
                                />
                            </dl>

                            {actividad.descripcion && (
                                <p className="text-sm whitespace-pre-line">
                                    {actividad.descripcion}
                                </p>
                            )}

                            {actividad.publicos.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {actividad.publicos.map((publico) => (
                                        <Badge key={publico} variant="outline">
                                            {publico}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {actividad.motivo_cancelacion && (
                                <p className="text-sm text-muted-foreground">
                                    Motivo de cancelación:{' '}
                                    {actividad.motivo_cancelacion}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Indicadores</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {actividad.indicadores.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Sin indicadores asociados.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-sm">
                                    {actividad.indicadores.map((indicador) => (
                                        <li key={indicador.id}>
                                            <span className="block">
                                                {indicador.nombre}
                                            </span>
                                            <span className="text-muted-foreground">
                                                Meta:{' '}
                                                {indicador.valor_meta ?? '—'} ·
                                                Alcanzado:{' '}
                                                {indicador.valor_alcanzado ??
                                                    '—'}{' '}
                                                {indicador.unidad_medida}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {actividad.estado === 'cerrada' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Cierre</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                    Resultados
                                </h2>
                                <p className="mt-1 text-sm whitespace-pre-line">
                                    {actividad.resultados}
                                </p>
                            </div>

                            <dl className="grid gap-4 sm:grid-cols-3">
                                <Dato
                                    etiqueta="Beneficiarios"
                                    valor={actividad.beneficiarios_total}
                                />
                                <Dato
                                    etiqueta="Participantes"
                                    valor={actividad.participantes.length}
                                />
                                <Dato
                                    etiqueta="Cierre"
                                    valor={fechaHoraLegible(
                                        actividad.fecha_cierre,
                                    )}
                                />
                            </dl>

                            {actividad.beneficiarios.length > 0 && (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Sexo</TableHead>
                                            <TableHead>Rango de edad</TableHead>
                                            <TableHead>
                                                Tipo de público
                                            </TableHead>
                                            <TableHead>Cantidad</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {actividad.beneficiarios.map(
                                            (beneficiario, posicion) => (
                                                <TableRow key={posicion}>
                                                    <TableCell>
                                                        {beneficiario.sexo}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            beneficiario.rango_edad
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {beneficiario.tipo_publico ??
                                                            '—'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {beneficiario.cantidad}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            )}

                            {actividad.evidencias.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {actividad.evidencias.map((evidencia) => (
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
                                                    evidencia.tipo_nombre}
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
                            <CardTitle>Historial de revisión</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {actividad.revisiones.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Todavía no hay movimientos.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-sm">
                                    {actividad.revisiones.map((revision) => (
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Reprogramaciones</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {actividad.reprogramaciones.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    La actividad no se ha reprogramado.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-sm">
                                    {actividad.reprogramaciones.map(
                                        (cambio) => (
                                            <li key={cambio.id}>
                                                {fechaLegible(
                                                    cambio.fecha_anterior,
                                                )}{' '}
                                                →{' '}
                                                {fechaLegible(
                                                    cambio.fecha_nueva,
                                                )}
                                                <span className="block text-xs text-muted-foreground">
                                                    {cambio.motivo ??
                                                        'Sin motivo'}{' '}
                                                    · {cambio.usuario}
                                                </span>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog
                open={dialogo !== null}
                onOpenChange={(abierto) => !abierto && cerrarDialogo()}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogo === 'observar' && 'Observar actividad'}
                            {dialogo === 'rechazar' && 'Rechazar actividad'}
                            {dialogo === 'reprogramar' &&
                                'Reprogramar actividad'}
                            {dialogo === 'cancelar' && 'Cancelar actividad'}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogo === 'observar' &&
                                'La actividad vuelve a la unidad para corregirse.'}
                            {dialogo === 'rechazar' &&
                                'El rechazo cierra el ciclo y libera el espacio reservado.'}
                            {dialogo === 'reprogramar' &&
                                'Se guarda la fecha anterior y se vuelve a validar el espacio.'}
                            {dialogo === 'cancelar' &&
                                'La cancelación libera el espacio y retira la actividad de la agenda.'}
                        </DialogDescription>
                    </DialogHeader>

                    {dialogo !== null && (
                        <Form
                            {...(dialogo === 'observar'
                                ? RevisionActividadController.observar.form(
                                      actividad.id,
                                  )
                                : dialogo === 'rechazar'
                                  ? RevisionActividadController.rechazar.form(
                                        actividad.id,
                                    )
                                  : dialogo === 'reprogramar'
                                    ? EstadoActividadController.reprogramar.form(
                                          actividad.id,
                                      )
                                    : EstadoActividadController.cancelar.form(
                                          actividad.id,
                                      ))}
                            options={{ preserveScroll: true }}
                            onSuccess={cerrarDialogo}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {dialogo === 'reprogramar' ? (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="fecha">
                                                    Nueva fecha
                                                </Label>
                                                <Input
                                                    id="fecha"
                                                    name="fecha"
                                                    type="date"
                                                    required
                                                    defaultValue={
                                                        actividad.fecha
                                                    }
                                                />
                                                <InputError
                                                    message={errors.fecha}
                                                />
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="hora_inicio">
                                                        Hora de inicio
                                                    </Label>
                                                    <Input
                                                        id="hora_inicio"
                                                        name="hora_inicio"
                                                        type="time"
                                                        defaultValue={
                                                            actividad.hora_inicio ??
                                                            ''
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="hora_fin">
                                                        Hora de finalización
                                                    </Label>
                                                    <Input
                                                        id="hora_fin"
                                                        name="hora_fin"
                                                        type="time"
                                                        defaultValue={
                                                            actividad.hora_fin ??
                                                            ''
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="motivo">
                                                    Motivo
                                                </Label>
                                                <Input
                                                    id="motivo"
                                                    name="motivo"
                                                />
                                                <InputError
                                                    message={errors.motivo}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor={
                                                    dialogo === 'cancelar'
                                                        ? 'motivo'
                                                        : 'comentario'
                                                }
                                            >
                                                {dialogo === 'cancelar'
                                                    ? 'Motivo de la cancelación'
                                                    : 'Comentario'}
                                            </Label>
                                            <Textarea
                                                id={
                                                    dialogo === 'cancelar'
                                                        ? 'motivo'
                                                        : 'comentario'
                                                }
                                                name={
                                                    dialogo === 'cancelar'
                                                        ? 'motivo'
                                                        : 'comentario'
                                                }
                                                rows={3}
                                                required
                                            />
                                            <InputError
                                                message={
                                                    dialogo === 'cancelar'
                                                        ? errors.motivo
                                                        : errors.comentario
                                                }
                                            />
                                        </div>
                                    )}

                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={cerrarDialogo}
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

FichaActividad.layout = {
    breadcrumbs: [{ title: 'Actividades', href: index() }],
};
