import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye } from 'lucide-react';

import AprobacionProyectoController from '@/actions/App/Http/Controllers/Proyectos/AprobacionProyectoController';
import Heading from '@/components/heading';
import { Paginacion } from '@/components/paginacion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { aprobacion, index, show } from '@/routes/proyectos';
import type { Paginado } from '@/types';
import { colorEstadoProyecto } from './index';
import { fechaLegible } from '@/lib/fecha';

type Fila = {
    id: number;
    nombre: string;
    unidad: string;
    responsable: string | null;
    tipo: string | null;
    fecha_inicio: string | null;
    estado: string;
    estado_nombre: string;
    puede_aprobar: boolean;
};

type Props = {
    proyectos: Paginado<Fila>;
    filtros: { estado: string; unidad_id: number | null };
    estados: { valor: string; nombre: string }[];
    unidades: { valor: number; nombre: string }[];
};

export default function AprobacionProyectos({
    proyectos,
    filtros,
    estados,
    unidades,
}: Props) {
    const filtrar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            aprobacion().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Aprobación de proyectos" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Aprobación de proyectos"
                    description="Apruebe, observe o rechace la formulación que envían las unidades"
                />

                <div className="flex flex-wrap gap-3">
                    <Select
                        value={filtros.estado}
                        onValueChange={(valor) => filtrar({ estado: valor })}
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
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
                            filtros.unidad_id
                                ? String(filtros.unidad_id)
                                : 'todas'
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                unidad_id:
                                    valor === 'todas' ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">
                                Todas las unidades
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

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Proyecto</TableHead>
                                <TableHead>Unidad</TableHead>
                                <TableHead>Responsable</TableHead>
                                <TableHead>Inicio</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {proyectos.data.map((proyecto) => (
                                <TableRow key={proyecto.id}>
                                    <TableCell className="font-medium">
                                        {proyecto.nombre}
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
                                    <TableCell>
                                        {fechaLegible(proyecto.fecha_inicio) ||
                                            '—'}
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
                                    <TableCell className="text-right whitespace-nowrap">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(proyecto.id)}>
                                                <Eye />
                                                Revisar
                                            </Link>
                                        </Button>
                                        {proyecto.puede_aprobar && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    router.patch(
                                                        AprobacionProyectoController.aprobar.url(
                                                            proyecto.id,
                                                        ),
                                                        {},
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <CheckCircle2 />
                                                Aprobar
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {proyectos.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay proyectos en ese estado.
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

AprobacionProyectos.layout = {
    breadcrumbs: [
        { title: 'Proyectos', href: index() },
        { title: 'Aprobación', href: aprobacion() },
    ],
};
