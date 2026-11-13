import { Head, Link, router } from '@inertiajs/react';
import { BarChart3, CalendarDays, Plus } from 'lucide-react';
import { useState } from 'react';

import Heading from '@/components/heading';
import { Paginacion } from '@/components/paginacion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { index as calendario } from '@/routes/calendario';
import { create, index, reportes, show } from '@/routes/espacios';
import type { Paginado } from '@/types';
import type { EspacioFila, OpcionesEspacios } from './tipos';

const TODOS = 'todos';

type Filtros = {
    busqueda: string;
    sede_id: number | null;
    tipo_espacio_id: number | null;
    estado: string;
};

type Props = {
    espacios: Paginado<EspacioFila>;
    filtros: Filtros;
    opciones: OpcionesEspacios;
    puedeGestionar: boolean;
};

export default function EspaciosIndex({
    espacios,
    filtros,
    opciones,
    puedeGestionar,
}: Props) {
    const [busqueda, setBusqueda] = useState(filtros.busqueda);

    const filtrar = (cambios: Partial<Filtros>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Espacios" />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Espacios"
                        description="Sedes, espacios y su estado operativo"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={calendario()}>
                                <CalendarDays />
                                Calendario
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={reportes()}>
                                <BarChart3 />
                                Utilización
                            </Link>
                        </Button>
                        {puedeGestionar && (
                            <Button asChild>
                                <Link href={create()}>
                                    <Plus />
                                    Nuevo espacio
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <form
                        className="flex-1 sm:max-w-xs"
                        onSubmit={(evento) => {
                            evento.preventDefault();
                            filtrar({ busqueda });
                        }}
                    >
                        <Input
                            value={busqueda}
                            onChange={(evento) =>
                                setBusqueda(evento.target.value)
                            }
                            placeholder="Buscar por nombre"
                            aria-label="Buscar espacios"
                        />
                    </form>

                    <Select
                        value={
                            filtros.sede_id ? String(filtros.sede_id) : TODOS
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                sede_id: valor === TODOS ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Sede" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todas las sedes
                            </SelectItem>
                            {opciones.sedes.map((sede) => (
                                <SelectItem
                                    key={sede.valor}
                                    value={String(sede.valor)}
                                >
                                    {sede.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={
                            filtros.tipo_espacio_id
                                ? String(filtros.tipo_espacio_id)
                                : TODOS
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                tipo_espacio_id:
                                    valor === TODOS ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todos los tipos
                            </SelectItem>
                            {opciones.tipos.map((tipo) => (
                                <SelectItem
                                    key={tipo.valor}
                                    value={String(tipo.valor)}
                                >
                                    {tipo.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filtros.estado || TODOS}
                        onValueChange={(valor) =>
                            filtrar({ estado: valor === TODOS ? '' : valor })
                        }
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>Todos</SelectItem>
                            {opciones.estados.map((estado) => (
                                <SelectItem
                                    key={estado.valor}
                                    value={estado.valor}
                                >
                                    {estado.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Espacio</TableHead>
                                <TableHead>Sede</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Capacidad</TableHead>
                                <TableHead>Reservas</TableHead>
                                <TableHead>Catálogo público</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {espacios.data.map((espacio) => (
                                <TableRow key={espacio.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={show(espacio.id)}
                                            className="hover:underline"
                                        >
                                            {espacio.nombre}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{espacio.sede}</TableCell>
                                    <TableCell>{espacio.tipo}</TableCell>
                                    <TableCell>
                                        {espacio.capacidad ?? '—'}
                                    </TableCell>
                                    <TableCell className="tabular-nums">
                                        {espacio.reservas_aprobadas}
                                    </TableCell>
                                    <TableCell>
                                        {espacio.visible_publico ? 'Sí' : 'No'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                espacio.estado === 'activo'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {espacio.estado_nombre}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {espacios.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay espacios que coincidan con los
                                        filtros.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={espacios} etiqueta="espacios" />
            </div>
        </>
    );
}

EspaciosIndex.layout = {
    breadcrumbs: [{ title: 'Espacios', href: index() }],
};
