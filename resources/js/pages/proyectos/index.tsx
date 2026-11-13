import { Head, Link, router } from '@inertiajs/react';
import { ClipboardCheck, Plus } from 'lucide-react';
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
import { aprobacion, create, index, show } from '@/routes/proyectos';
import type { Paginado } from '@/types';
import type { OpcionesProyectos, ProyectoFila } from './tipos';
import { fechaLegible } from '@/lib/fecha';

const TODOS = 'todos';

type Filtros = {
    busqueda: string;
    estado: string;
    unidad_id: number | null;
    area_id: number | null;
    programa_id: number | null;
    anio: number | null;
};

type Props = {
    proyectos: Paginado<ProyectoFila>;
    filtros: Filtros;
    opciones: OpcionesProyectos;
    puedeRegistrar: boolean;
};

export function colorEstadoProyecto(estado: string) {
    if (['cerrado', 'aprobado', 'en_ejecucion'].includes(estado)) {
        return 'default' as const;
    }

    if (['rechazado', 'cancelado', 'suspendido'].includes(estado)) {
        return 'outline' as const;
    }

    return 'secondary' as const;
}

export default function ProyectosIndex({
    proyectos,
    filtros,
    opciones,
    puedeRegistrar,
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
            <Head title="Proyectos" />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Proyectos"
                        description="Cartera de proyectos: formulación, aprobación, ejecución y cierre"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={aprobacion()}>
                                <ClipboardCheck />
                                Aprobación
                            </Link>
                        </Button>
                        {puedeRegistrar && (
                            <Button asChild>
                                <Link href={create()}>
                                    <Plus />
                                    Nuevo proyecto
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
                            aria-label="Buscar proyectos"
                        />
                    </form>

                    <Select
                        value={filtros.estado || TODOS}
                        onValueChange={(valor) =>
                            filtrar({ estado: valor === TODOS ? '' : valor })
                        }
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todos los estados
                            </SelectItem>
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

                    <Select
                        value={
                            filtros.unidad_id
                                ? String(filtros.unidad_id)
                                : TODOS
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                unidad_id:
                                    valor === TODOS ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todas las unidades
                            </SelectItem>
                            {opciones.unidades.map((unidad) => (
                                <SelectItem
                                    key={unidad.valor}
                                    value={String(unidad.valor)}
                                >
                                    {unidad.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={
                            filtros.programa_id
                                ? String(filtros.programa_id)
                                : TODOS
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                programa_id:
                                    valor === TODOS ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Programa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todos los programas
                            </SelectItem>
                            {opciones.programas.map((programa) => (
                                <SelectItem
                                    key={programa.valor}
                                    value={String(programa.valor)}
                                >
                                    {programa.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        type="number"
                        className="w-28"
                        placeholder="Año"
                        defaultValue={filtros.anio ?? ''}
                        aria-label="Año de inicio"
                        onBlur={(evento) =>
                            filtrar({
                                anio: evento.target.value
                                    ? Number(evento.target.value)
                                    : null,
                            })
                        }
                    />
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Proyecto</TableHead>
                                <TableHead>Unidad</TableHead>
                                <TableHead>Responsable</TableHead>
                                <TableHead>Período</TableHead>
                                <TableHead>Actividades</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {proyectos.data.map((proyecto) => (
                                <TableRow key={proyecto.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={show(proyecto.id)}
                                            className="hover:underline"
                                        >
                                            {proyecto.nombre}
                                        </Link>
                                        {proyecto.tipo && (
                                            <span className="block text-xs text-muted-foreground">
                                                {proyecto.tipo}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{proyecto.unidad}</TableCell>
                                    <TableCell>
                                        {proyecto.responsable ?? '—'}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {fechaLegible(proyecto.fecha_inicio) ||
                                            '—'}
                                        {proyecto.fecha_fin && (
                                            <span className="block text-xs text-muted-foreground">
                                                hasta{' '}
                                                {fechaLegible(
                                                    proyecto.fecha_fin,
                                                )}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="tabular-nums">
                                        {proyecto.actividades_count}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={colorEstadoProyecto(
                                                proyecto.estado,
                                            )}
                                        >
                                            {proyecto.estado_nombre}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {proyectos.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay proyectos con esos filtros.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={proyectos} etiqueta="proyectos" />
            </div>
        </>
    );
}

ProyectosIndex.layout = {
    breadcrumbs: [{ title: 'Proyectos', href: index() }],
};
