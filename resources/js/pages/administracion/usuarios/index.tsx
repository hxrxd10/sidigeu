import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Power } from 'lucide-react';
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
import { create, edit, estado, index } from '@/routes/usuarios';
import type { Paginado } from '@/types';

const TODOS = 'todos';

type Usuario = {
    id: number;
    name: string;
    email: string;
    activo: boolean;
    unidad: { id: number; nombre: string } | null;
    roles: { slug: string; nombre: string }[];
};

type Props = {
    usuarios: Paginado<Usuario>;
    filtros: { busqueda: string; rol: string; estado: string };
    roles: { valor: string; nombre: string }[];
};

export default function UsuariosIndex({ usuarios, filtros, roles }: Props) {
    const [busqueda, setBusqueda] = useState(filtros.busqueda);

    const filtrar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title="Usuarios" />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Usuarios"
                        description="Cuentas del personal de la DIGEU, su unidad y sus roles"
                    />

                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            Nuevo usuario
                        </Link>
                    </Button>
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
                            placeholder="Buscar por nombre o correo"
                            aria-label="Buscar usuarios"
                        />
                    </form>

                    <Select
                        value={filtros.rol || TODOS}
                        onValueChange={(valor) =>
                            filtrar({ rol: valor === TODOS ? '' : valor })
                        }
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue placeholder="Rol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TODOS}>
                                Todos los roles
                            </SelectItem>
                            {roles.map((rol) => (
                                <SelectItem key={rol.valor} value={rol.valor}>
                                    {rol.nombre}
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
                            <SelectItem value="activos">Activos</SelectItem>
                            <SelectItem value="inactivos">Inactivos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Correo</TableHead>
                                <TableHead>Unidad</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usuarios.data.map((usuario) => (
                                <TableRow key={usuario.id}>
                                    <TableCell className="font-medium">
                                        {usuario.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {usuario.email}
                                    </TableCell>
                                    <TableCell>
                                        {usuario.unidad?.nombre ?? '—'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {usuario.roles.length === 0 && '—'}
                                            {usuario.roles.map((rol) => (
                                                <Badge
                                                    key={rol.slug}
                                                    variant="secondary"
                                                >
                                                    {rol.nombre}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                usuario.activo
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {usuario.activo
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right whitespace-nowrap">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={edit(usuario.id)}>
                                                <Pencil />
                                                Editar
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                router.patch(
                                                    estado(usuario.id).url,
                                                    {},
                                                    { preserveScroll: true },
                                                )
                                            }
                                        >
                                            <Power />
                                            {usuario.activo
                                                ? 'Desactivar'
                                                : 'Activar'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {usuarios.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay usuarios que coincidan con la
                                        búsqueda.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Paginacion paginado={usuarios} etiqueta="usuarios" />
            </div>
        </>
    );
}

UsuariosIndex.layout = {
    breadcrumbs: [{ title: 'Usuarios', href: index() }],
};
