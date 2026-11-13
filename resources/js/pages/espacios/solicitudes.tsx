import { Form, Head, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

import SolicitudEspacioController from '@/actions/App/Http/Controllers/Espacios/SolicitudEspacioController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Paginacion } from '@/components/paginacion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index } from '@/routes/solicitudes';
import type { Paginado } from '@/types';
import type { SolicitudFila } from './tipos';
import { fechaLegible } from '@/lib/fecha';

type Props = {
    solicitudes: Paginado<SolicitudFila>;
    filtros: { estado: string; espacio_id: number | null; desde: string };
    estados: { valor: string; nombre: string }[];
    espacios: { valor: number; nombre: string }[];
    puedeResolver: boolean;
};

export default function Solicitudes({
    solicitudes,
    filtros,
    estados,
    espacios,
    puedeResolver,
}: Props) {
    const [enRechazo, setEnRechazo] = useState<SolicitudFila | null>(null);

    const filtrar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Solicitudes de espacio" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Solicitudes de espacio"
                    description="Al aprobar una solicitud se bloquea el horario y se notifica al solicitante"
                />

                <div className="flex flex-wrap gap-3">
                    <Select
                        value={filtros.estado}
                        onValueChange={(valor) => filtrar({ estado: valor })}
                    >
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">Todas</SelectItem>
                            {estados.map((estado) => (
                                <SelectItem
                                    key={estado.valor}
                                    value={estado.valor}
                                >
                                    {estado.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={
                            filtros.espacio_id
                                ? String(filtros.espacio_id)
                                : 'todos'
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                espacio_id:
                                    valor === 'todos' ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Espacio" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">
                                Todos los espacios
                            </SelectItem>
                            {espacios.map((espacio) => (
                                <SelectItem
                                    key={espacio.valor}
                                    value={String(espacio.valor)}
                                >
                                    {espacio.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                        <Label htmlFor="desde" className="text-sm">
                            Desde
                        </Label>
                        <Input
                            id="desde"
                            type="date"
                            className="w-44"
                            defaultValue={filtros.desde}
                            onChange={(evento) =>
                                filtrar({ desde: evento.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Espacio</TableHead>
                                <TableHead>Fecha y horario</TableHead>
                                <TableHead>Solicitante</TableHead>
                                <TableHead>Propósito</TableHead>
                                <TableHead>Estado</TableHead>
                                {puedeResolver && (
                                    <TableHead className="text-right">
                                        Acciones
                                    </TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {solicitudes.data.map((solicitud) => (
                                <TableRow key={solicitud.id}>
                                    <TableCell className="font-medium">
                                        {solicitud.espacio}
                                        <span className="block text-xs text-muted-foreground">
                                            {solicitud.sede}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {fechaLegible(solicitud.fecha)}
                                        <span className="block text-xs text-muted-foreground">
                                            {solicitud.hora_inicio} –{' '}
                                            {solicitud.hora_fin}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {solicitud.solicitante_nombre}
                                        <span className="block text-xs text-muted-foreground">
                                            {solicitud.institucion ??
                                                solicitud.correo}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <span className="line-clamp-2 text-sm">
                                            {solicitud.proposito}
                                        </span>
                                        {solicitud.motivo_rechazo && (
                                            <span className="block text-xs text-muted-foreground">
                                                Motivo:{' '}
                                                {solicitud.motivo_rechazo}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                solicitud.estado === 'aprobada'
                                                    ? 'default'
                                                    : solicitud.estado ===
                                                        'pendiente'
                                                      ? 'secondary'
                                                      : 'outline'
                                            }
                                        >
                                            {solicitud.estado_nombre}
                                        </Badge>
                                    </TableCell>
                                    {puedeResolver && (
                                        <TableCell className="text-right whitespace-nowrap">
                                            {solicitud.estado ===
                                                'pendiente' && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.patch(
                                                                SolicitudEspacioController.aprobar.url(
                                                                    solicitud.id,
                                                                ),
                                                                {},
                                                                {
                                                                    preserveScroll: true,
                                                                },
                                                            )
                                                        }
                                                    >
                                                        <Check />
                                                        Aprobar
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setEnRechazo(
                                                                solicitud,
                                                            )
                                                        }
                                                    >
                                                        <X />
                                                        Rechazar
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}

                            {solicitudes.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={puedeResolver ? 6 : 5}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay solicitudes con esos filtros.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={solicitudes} etiqueta="solicitudes" />
            </div>

            <Dialog
                open={enRechazo !== null}
                onOpenChange={(abierto) => !abierto && setEnRechazo(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rechazar solicitud</DialogTitle>
                        <DialogDescription>
                            El motivo se incluye en el correo que recibe el
                            solicitante.
                        </DialogDescription>
                    </DialogHeader>

                    {enRechazo && (
                        <Form
                            {...SolicitudEspacioController.rechazar.form(
                                enRechazo.id,
                            )}
                            options={{ preserveScroll: true }}
                            onSuccess={() => setEnRechazo(null)}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="motivo_rechazo">
                                            Motivo del rechazo
                                        </Label>
                                        <Input
                                            id="motivo_rechazo"
                                            name="motivo_rechazo"
                                            required
                                        />
                                        <InputError
                                            message={errors.motivo_rechazo}
                                        />
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setEnRechazo(null)}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing && <Spinner />}
                                            Rechazar
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

Solicitudes.layout = {
    breadcrumbs: [{ title: 'Solicitudes', href: index() }],
};
