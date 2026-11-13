import { Head, Link, router } from '@inertiajs/react';
import {
    BarChart3,
    CalendarRange,
    ClipboardCheck,
    FileSpreadsheet,
    Plus,
} from 'lucide-react';
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
import { create, index, revision, show } from '@/routes/actividades';
import * as cargaMasiva from '@/routes/actividades/carga-masiva';
import { mensual } from '@/routes/actividades/reportes';
import type { Paginado } from '@/types';
import type { ActividadFila, OpcionesActividades } from './tipos';
import { fechaLegible } from '@/lib/fecha';

const TODOS = 'todos';

type Filtros = {
    mes: string;
    unidad_id: number | null;
    estado: string;
    busqueda: string;
};

type Props = {
    actividades: Paginado<ActividadFila>;
    filtros: Filtros;
    opciones: OpcionesActividades;
    puedeRegistrar: boolean;
};

export function colorEstado(estado: string) {
    if (estado === 'cerrada') {
        return 'default' as const;
    }

    if (['cancelada', 'rechazada'].includes(estado)) {
        return 'outline' as const;
    }

    return 'secondary' as const;
}

export default function ActividadesIndex({
    actividades,
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
            <Head title="Actividades" />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Programación mensual"
                        description="Actividades de la unidad: registro, validación, ejecución y cierre"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={revision()}>
                                <ClipboardCheck />
                                Revisión
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={mensual()}>
                                <BarChart3 />
                                Reporte mensual
                            </Link>
                        </Button>
                        {puedeRegistrar && (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={cargaMasiva.create()}>
                                        <FileSpreadsheet />
                                        Carga masiva
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={create()}>
                                        <Plus />
                                        Nueva actividad
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <CalendarRange className="size-4 text-muted-foreground" />
                        <Input
                            type="month"
                            className="w-44"
                            value={filtros.mes}
                            onChange={(evento) =>
                                filtrar({ mes: evento.target.value })
                            }
                            aria-label="Mes de la programación"
                        />
                    </div>

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
                            aria-label="Buscar actividades"
                        />
                    </form>

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
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Actividad</TableHead>
                                <TableHead>Unidad</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Lugar</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {actividades.data.map((actividad) => (
                                <TableRow key={actividad.id}>
                                    <TableCell className="whitespace-nowrap">
                                        {fechaLegible(actividad.fecha)}
                                        {actividad.hora_inicio && (
                                            <span className="block text-xs text-muted-foreground">
                                                {actividad.hora_inicio}
                                                {actividad.hora_fin
                                                    ? ` – ${actividad.hora_fin}`
                                                    : ''}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={show(actividad.id)}
                                            className="hover:underline"
                                        >
                                            {actividad.nombre}
                                        </Link>
                                        <div className="mt-1 flex gap-1">
                                            {actividad.publicar_agenda && (
                                                <Badge variant="outline">
                                                    Agenda
                                                </Badge>
                                            )}
                                            {actividad.es_logro_no_programado && (
                                                <Badge variant="outline">
                                                    Logro
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{actividad.unidad}</TableCell>
                                    <TableCell>{actividad.tipo}</TableCell>
                                    <TableCell>{actividad.lugar}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={colorEstado(
                                                actividad.estado,
                                            )}
                                        >
                                            {actividad.estado_nombre}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {actividades.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay actividades programadas en el mes
                                        seleccionado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={actividades} etiqueta="actividades" />
            </div>
        </>
    );
}

ActividadesIndex.layout = {
    breadcrumbs: [{ title: 'Actividades', href: index() }],
};
