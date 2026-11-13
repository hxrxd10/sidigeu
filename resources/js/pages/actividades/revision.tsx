import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Eye } from 'lucide-react';

import RevisionActividadController from '@/actions/App/Http/Controllers/Actividades/RevisionActividadController';
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
import { index, revision, show } from '@/routes/actividades';
import type { Paginado } from '@/types';
import { colorEstado } from './index';
import { fechaLegible } from '@/lib/fecha';

type Fila = {
    id: number;
    nombre: string;
    unidad: string;
    fecha: string;
    hora_inicio: string | null;
    lugar: string;
    tipo: string;
    responsable: string | null;
    publicar_agenda: boolean;
    estado: string;
    estado_nombre: string;
    puede_validar: boolean;
};

type Props = {
    actividades: Paginado<Fila>;
    filtros: { unidad_id: number | null; estado: string };
    estados: { valor: string; nombre: string }[];
    unidades: { valor: number; nombre: string }[];
};

export default function RevisionActividades({
    actividades,
    filtros,
    estados,
    unidades,
}: Props) {
    const filtrar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            revision().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Revisión de actividades" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Revisión de actividades"
                    description="Valide, observe o rechace la programación que envían las unidades"
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
                                <TableHead>Fecha</TableHead>
                                <TableHead>Actividad</TableHead>
                                <TableHead>Unidad</TableHead>
                                <TableHead>Lugar</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">
                                    Acciones
                                </TableHead>
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
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {actividad.nombre}
                                        {actividad.publicar_agenda && (
                                            <Badge
                                                variant="outline"
                                                className="ml-2"
                                            >
                                                Agenda
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{actividad.unidad}</TableCell>
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
                                    <TableCell className="text-right whitespace-nowrap">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={show(actividad.id)}>
                                                <Eye />
                                                Revisar
                                            </Link>
                                        </Button>
                                        {actividad.puede_validar && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    router.patch(
                                                        RevisionActividadController.validar.url(
                                                            actividad.id,
                                                        ),
                                                        {},
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <CheckCircle2 />
                                                Validar
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {actividades.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay actividades en ese estado.
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

RevisionActividades.layout = {
    breadcrumbs: [
        { title: 'Actividades', href: index() },
        { title: 'Revisión', href: revision() },
    ],
};
