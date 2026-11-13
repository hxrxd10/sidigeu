import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import Heading from '@/components/heading';
import { Paginacion } from '@/components/paginacion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index } from '@/routes/bitacora';
import type { Paginado } from '@/types';

const TODOS = 'todos';

type Registro = {
    id: number;
    fecha: string | null;
    usuario: string;
    entidad: string;
    entidad_id: number;
    accion: string;
    accion_nombre: string;
    ip: string | null;
    valores_antes: Record<string, unknown> | null;
    valores_despues: Record<string, unknown> | null;
};

type Props = {
    registros: Paginado<Registro>;
    filtros: {
        user_id: number | null;
        entidad: string;
        accion: string;
        desde: string;
        hasta: string;
    };
    opciones: {
        usuarios: { valor: number; nombre: string }[];
        entidades: { valor: string; nombre: string }[];
        acciones: { valor: string; nombre: string }[];
    };
};

export default function Bitacora({ registros, filtros, opciones }: Props) {
    const [detalle, setDetalle] = useState<Registro | null>(null);

    const filtrar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Bitácora de auditoría" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Bitácora de auditoría"
                    description="Quién cambió qué, cuándo y con qué valores"
                />

                <div className="flex flex-wrap items-end gap-3">
                    <Select
                        value={
                            filtros.user_id ? String(filtros.user_id) : TODOS
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                user_id: valor === TODOS ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Usuario" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todos los usuarios
                            </SelectItem>
                            {opciones.usuarios.map((usuario) => (
                                <SelectItem
                                    key={usuario.valor}
                                    value={String(usuario.valor)}
                                >
                                    {usuario.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filtros.entidad || TODOS}
                        onValueChange={(valor) =>
                            filtrar({ entidad: valor === TODOS ? '' : valor })
                        }
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Entidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todas las entidades
                            </SelectItem>
                            {opciones.entidades.map((entidad) => (
                                <SelectItem
                                    key={entidad.valor}
                                    value={entidad.valor}
                                >
                                    {entidad.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filtros.accion || TODOS}
                        onValueChange={(valor) =>
                            filtrar({ accion: valor === TODOS ? '' : valor })
                        }
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Acción" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todas las acciones
                            </SelectItem>
                            {opciones.acciones.map((accion) => (
                                <SelectItem
                                    key={accion.valor}
                                    value={accion.valor}
                                >
                                    {accion.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="grid gap-1">
                        <Label htmlFor="desde" className="text-xs">
                            Desde
                        </Label>
                        <Input
                            id="desde"
                            type="date"
                            className="w-40"
                            defaultValue={filtros.desde}
                            onChange={(evento) =>
                                filtrar({ desde: evento.target.value })
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
                            defaultValue={filtros.hasta}
                            onChange={(evento) =>
                                filtrar({ hasta: evento.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Entidad</TableHead>
                                <TableHead>Acción</TableHead>
                                <TableHead>IP</TableHead>
                                <TableHead className="text-right">
                                    Detalle
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registros.data.map((registro) => (
                                <TableRow key={registro.id}>
                                    <TableCell className="whitespace-nowrap">
                                        {registro.fecha}
                                    </TableCell>
                                    <TableCell>{registro.usuario}</TableCell>
                                    <TableCell>
                                        {registro.entidad}
                                        <span className="block text-xs text-muted-foreground">
                                            #{registro.entidad_id}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {registro.accion_nombre}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {registro.ip ?? '—'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDetalle(registro)}
                                        >
                                            Ver valores
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {registros.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay registros con esos filtros.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={registros} etiqueta="registros" />
            </div>

            <Dialog
                open={detalle !== null}
                onOpenChange={(abierto) => !abierto && setDetalle(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {detalle?.entidad} #{detalle?.entidad_id}
                        </DialogTitle>
                        <DialogDescription>
                            {detalle?.accion_nombre} por {detalle?.usuario} ·{' '}
                            {detalle?.fecha}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 text-sm sm:grid-cols-2">
                        <div>
                            <h3 className="mb-1 text-xs tracking-wide text-muted-foreground uppercase">
                                Antes
                            </h3>
                            <pre className="max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">
                                {JSON.stringify(
                                    detalle?.valores_antes ?? {},
                                    null,
                                    2,
                                )}
                            </pre>
                        </div>
                        <div>
                            <h3 className="mb-1 text-xs tracking-wide text-muted-foreground uppercase">
                                Después
                            </h3>
                            <pre className="max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">
                                {JSON.stringify(
                                    detalle?.valores_despues ?? {},
                                    null,
                                    2,
                                )}
                            </pre>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

Bitacora.layout = {
    breadcrumbs: [{ title: 'Bitácora', href: index() }],
};
