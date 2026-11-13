import { Head, Link, router } from '@inertiajs/react';
import { BarChart3, Download, FileSpreadsheet, Plus } from 'lucide-react';
import { useState } from 'react';

import Heading from '@/components/heading';
import { Paginacion } from '@/components/paginacion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useInitials } from '@/hooks/use-initials';
import * as cargaMasiva from '@/routes/recurso-humano/carga-masiva';
import { create, index, reportes, show } from '@/routes/recurso-humano';
import { exportar } from '@/routes/recurso-humano/reportes';
import type { Paginado } from '@/types';
import type { OpcionesRecursoHumano, PersonaFila } from './tipos';

const TODOS = 'todos';

type Filtros = {
    busqueda: string;
    tipo: string;
    disciplina_id: number | null;
    pais_id: number | null;
    estado: string;
};

type Props = {
    personas: Paginado<PersonaFila>;
    filtros: Filtros;
    opciones: OpcionesRecursoHumano;
    puedeGestionar: boolean;
};

export default function RecursoHumanoIndex({
    personas,
    filtros,
    opciones,
    puedeGestionar,
}: Props) {
    const [busqueda, setBusqueda] = useState(filtros.busqueda);
    const iniciales = useInitials();

    const filtrar = (cambios: Partial<Filtros>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Recurso humano" />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Artistas y deportistas"
                        description="Padrón del recurso humano vinculado a la DIGEU"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={reportes()}>
                                <BarChart3 />
                                Reportes
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <a
                                href={
                                    exportar({
                                        query: { busqueda: filtros.busqueda },
                                    }).url
                                }
                            >
                                <Download />
                                Exportar
                            </a>
                        </Button>

                        {puedeGestionar && (
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
                                        Nuevo registro
                                    </Link>
                                </Button>
                            </>
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
                            placeholder="Buscar por nombre, DPI o pasaporte"
                            aria-label="Buscar personas"
                        />
                    </form>

                    <Select
                        value={filtros.tipo || TODOS}
                        onValueChange={(valor) =>
                            filtrar({ tipo: valor === TODOS ? '' : valor })
                        }
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>Todos</SelectItem>
                            {opciones.tipos.map((tipo) => (
                                <SelectItem key={tipo.valor} value={tipo.valor}>
                                    {tipo.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={
                            filtros.disciplina_id
                                ? String(filtros.disciplina_id)
                                : TODOS
                        }
                        onValueChange={(valor) =>
                            filtrar({
                                disciplina_id:
                                    valor === TODOS ? null : Number(valor),
                            })
                        }
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Disciplina" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todas las disciplinas
                            </SelectItem>
                            {opciones.disciplinas.map((disciplina) => (
                                <SelectItem
                                    key={disciplina.valor}
                                    value={String(disciplina.valor)}
                                >
                                    {disciplina.nombre}
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
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>Todos</SelectItem>
                            <SelectItem value="activos">Activos</SelectItem>
                            <SelectItem value="inactivos">Inactivos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Persona</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Disciplina</TableHead>
                                <TableHead>Nacionalidad</TableHead>
                                <TableHead>Edad</TableHead>
                                <TableHead>Permanencia</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {personas.data.map((persona) => (
                                <TableRow key={persona.id}>
                                    <TableCell>
                                        <Link
                                            href={show(persona.id)}
                                            className="flex items-center gap-3 hover:underline"
                                        >
                                            <Avatar className="size-9">
                                                {persona.foto_url && (
                                                    <AvatarImage
                                                        src={persona.foto_url}
                                                        alt={
                                                            persona.nombre_completo
                                                        }
                                                    />
                                                )}
                                                <AvatarFallback>
                                                    {iniciales(
                                                        persona.nombre_completo,
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {persona.nombre_completo}
                                            </span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{persona.tipo_nombre}</TableCell>
                                    <TableCell>
                                        {persona.disciplina ?? '—'}
                                    </TableCell>
                                    <TableCell>{persona.pais ?? '—'}</TableCell>
                                    <TableCell>{persona.edad}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {persona.permanencia.texto}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                persona.activo
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {persona.activo
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {personas.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay registros que coincidan con los
                                        filtros.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={personas} etiqueta="personas" />
            </div>
        </>
    );
}

RecursoHumanoIndex.layout = {
    breadcrumbs: [{ title: 'Recurso humano', href: index() }],
};
