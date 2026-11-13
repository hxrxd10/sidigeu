import { Head, Link, router } from '@inertiajs/react';
import {
    CalendarDays,
    CalendarPlus,
    ChevronLeft,
    ChevronRight,
    MapPin,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { agenda } from '@/routes/publico';
import { calendario, show } from '@/routes/publico/agenda';

const TODOS = 'todos';

type ActividadAgenda = {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha: string;
    dia: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    lugar: string;
    sede: string | null;
    unidad: string;
    tipo: string;
    estado: string;
};

type Props = {
    actividades: ActividadAgenda[];
    meta?: { titulo: string; descripcion: string };
    filtros: {
        mes: string;
        unidad_id: number | null;
        tipo_actividad_id: number | null;
        espacio_id: number | null;
    };
    rango: {
        etiqueta: string;
        anterior: string;
        siguiente: string;
        actual: string;
    };
    opciones: {
        unidades: { valor: number; nombre: string }[];
        tipos: { valor: number; nombre: string }[];
        espacios: { valor: number; nombre: string }[];
    };
};

export default function AgendaCultural({
    actividades,
    filtros,
    rango,
    opciones,
}: Props) {
    const navegar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            agenda().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const porDia = actividades.reduce<Record<string, ActividadAgenda[]>>(
        (acumulado, actividad) => {
            acumulado[actividad.fecha] ??= [];
            acumulado[actividad.fecha].push(actividad);

            return acumulado;
        },
        {},
    );

    return (
        <>
            <Head title="Agenda Cultural" />

            <div className="space-y-8">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold">Agenda Cultural</h1>
                    <p className="max-w-2xl text-muted-foreground">
                        Actividades artísticas, deportivas y de formación que la
                        DIGEU abre a la comunidad universitaria y al público.
                    </p>
                </header>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Mes anterior"
                            onClick={() => navegar({ mes: rango.anterior })}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navegar({ mes: rango.actual })}
                        >
                            Este mes
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Mes siguiente"
                            onClick={() => navegar({ mes: rango.siguiente })}
                        >
                            <ChevronRight />
                        </Button>
                    </div>

                    <p className="font-medium first-letter:uppercase">
                        {rango.etiqueta}
                    </p>

                    <div className="ml-auto flex flex-wrap gap-3">
                        <div className="grid gap-1">
                            <Label className="text-xs">Unidad</Label>
                            <Select
                                value={
                                    filtros.unidad_id
                                        ? String(filtros.unidad_id)
                                        : TODOS
                                }
                                onValueChange={(valor) =>
                                    navegar({
                                        unidad_id:
                                            valor === TODOS
                                                ? null
                                                : Number(valor),
                                    })
                                }
                            >
                                <SelectTrigger className="w-52">
                                    <SelectValue placeholder="Todas" />
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
                        </div>

                        <div className="grid gap-1">
                            <Label className="text-xs">Tipo</Label>
                            <Select
                                value={
                                    filtros.tipo_actividad_id
                                        ? String(filtros.tipo_actividad_id)
                                        : TODOS
                                }
                                onValueChange={(valor) =>
                                    navegar({
                                        tipo_actividad_id:
                                            valor === TODOS
                                                ? null
                                                : Number(valor),
                                    })
                                }
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Todos" />
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
                        </div>

                        <div className="grid gap-1">
                            <Label className="text-xs">Espacio</Label>
                            <Select
                                value={
                                    filtros.espacio_id
                                        ? String(filtros.espacio_id)
                                        : TODOS
                                }
                                onValueChange={(valor) =>
                                    navegar({
                                        espacio_id:
                                            valor === TODOS
                                                ? null
                                                : Number(valor),
                                    })
                                }
                            >
                                <SelectTrigger className="w-52">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={TODOS}>
                                        Todos los espacios
                                    </SelectItem>
                                    {opciones.espacios.map((espacio) => (
                                        <SelectItem
                                            key={espacio.valor}
                                            value={String(espacio.valor)}
                                        >
                                            {espacio.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {actividades.length === 0 ? (
                    <p className="rounded-xl border py-16 text-center text-muted-foreground">
                        No hay actividades publicadas para este mes.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(porDia).map(([fecha, delDia]) => (
                            <section key={fecha} className="space-y-3">
                                <h2 className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                    <CalendarDays className="size-4" />
                                    <span className="capitalize">
                                        {delDia[0].dia}
                                    </span>
                                </h2>

                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {delDia.map((actividad) => (
                                        <Card
                                            key={actividad.id}
                                            className="relative transition-shadow hover:shadow-md"
                                        >
                                            <CardContent className="space-y-2">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-semibold">
                                                        <Link
                                                            href={show(
                                                                actividad.id,
                                                            )}
                                                            className="after:absolute after:inset-0 hover:underline"
                                                        >
                                                            {actividad.nombre}
                                                        </Link>
                                                    </h3>
                                                    <Badge variant="outline">
                                                        {actividad.tipo}
                                                    </Badge>
                                                </div>

                                                {actividad.hora_inicio && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {actividad.hora_inicio}
                                                        {actividad.hora_fin
                                                            ? ` – ${actividad.hora_fin}`
                                                            : ''}
                                                    </p>
                                                )}

                                                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="size-4" />
                                                    {actividad.lugar}
                                                    {actividad.sede
                                                        ? ` · ${actividad.sede}`
                                                        : ''}
                                                </p>

                                                {actividad.descripcion && (
                                                    <p className="text-sm">
                                                        {actividad.descripcion}
                                                    </p>
                                                )}

                                                <p className="text-xs text-muted-foreground">
                                                    {actividad.unidad}
                                                </p>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                    className="relative z-10 -ml-2 text-digeu-azure transition-transform duration-150 ease-out active:scale-[0.97] dark:text-digeu-teal"
                                                >
                                                    <a
                                                        href={
                                                            calendario(
                                                                actividad.id,
                                                            ).url
                                                        }
                                                    >
                                                        <CalendarPlus />
                                                        Agregar a mi calendario
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
