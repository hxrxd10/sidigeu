import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { index } from '@/routes/calendario';
import type { OpcionesEspacios, ReservaCalendario } from './tipos';

const TODOS = 'todos';

type Filtros = {
    vista: string;
    fecha: string;
    sede_id: number | null;
    tipo_espacio_id: number | null;
    estado: string;
};

type EspacioCalendario = {
    id: number;
    nombre: string;
    sede: string;
    tipo: string;
    estado: string;
    estado_nombre: string;
    admite_reservas: boolean;
};

type Props = {
    filtros: Filtros;
    rango: {
        desde: string;
        hasta: string;
        etiqueta: string;
        dias: { fecha: string; etiqueta: string; es_hoy: boolean }[];
    };
    navegacion: { anterior: string; siguiente: string; hoy: string };
    espacios: EspacioCalendario[];
    reservas: ReservaCalendario[];
    opciones: OpcionesEspacios;
};

export default function Calendario({
    filtros,
    rango,
    navegacion,
    espacios,
    reservas,
    opciones,
}: Props) {
    const navegar = (cambios: Partial<Filtros>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const reservasDe = (espacioId: number, fecha: string) =>
        reservas.filter(
            (reserva) =>
                reserva.espacio_id === espacioId && reserva.fecha === fecha,
        );

    return (
        <>
            <Head title="Calendario de ocupación" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Calendario de ocupación"
                    description="Filas por espacio y columnas por día. Las reservas aprobadas bloquean el horario."
                />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Período anterior"
                            onClick={() =>
                                navegar({ fecha: navegacion.anterior })
                            }
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navegar({ fecha: navegacion.hoy })}
                        >
                            Hoy
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Período siguiente"
                            onClick={() =>
                                navegar({ fecha: navegacion.siguiente })
                            }
                        >
                            <ChevronRight />
                        </Button>
                    </div>

                    <p className="font-medium first-letter:uppercase">
                        {rango.etiqueta}
                    </p>

                    <div className="ml-auto flex flex-wrap gap-3">
                        <Select
                            value={filtros.vista}
                            onValueChange={(valor) => navegar({ vista: valor })}
                        >
                            <SelectTrigger className="w-36">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dia">Día</SelectItem>
                                <SelectItem value="semana">Semana</SelectItem>
                                <SelectItem value="mes">Mes</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={
                                filtros.sede_id
                                    ? String(filtros.sede_id)
                                    : TODOS
                            }
                            onValueChange={(valor) =>
                                navegar({
                                    sede_id:
                                        valor === TODOS ? null : Number(valor),
                                })
                            }
                        >
                            <SelectTrigger className="w-48">
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
                            value={filtros.estado || TODOS}
                            onValueChange={(valor) =>
                                navegar({
                                    estado: valor === TODOS ? '' : valor,
                                })
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
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-destructive" />
                        Ocupado
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-digeu-amber" />
                        Pendiente de confirmación
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-digeu-green" />
                        Disponible
                    </span>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="sticky left-0 w-56 bg-muted/50 px-3 py-2 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    Espacio
                                </th>
                                {rango.dias.map((dia) => (
                                    <th
                                        key={dia.fecha}
                                        className={cn(
                                            'min-w-32 px-2 py-2 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase',
                                            dia.es_hoy && 'text-primary',
                                        )}
                                    >
                                        {dia.etiqueta}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {espacios.map((espacio) => (
                                <tr key={espacio.id} className="border-b">
                                    <th className="sticky left-0 bg-background px-3 py-2 text-left font-medium">
                                        {espacio.nombre}
                                        <span className="block text-xs font-normal text-muted-foreground">
                                            {espacio.sede}
                                            {!espacio.admite_reservas &&
                                                ` · ${espacio.estado_nombre}`}
                                        </span>
                                    </th>

                                    {rango.dias.map((dia) => {
                                        const delDia = reservasDe(
                                            espacio.id,
                                            dia.fecha,
                                        );

                                        return (
                                            <td
                                                key={dia.fecha}
                                                className="align-top"
                                            >
                                                <div className="space-y-1 p-1">
                                                    {delDia.length === 0 && (
                                                        <span className="block h-6 rounded bg-digeu-green/10" />
                                                    )}

                                                    {delDia.map((reserva) => (
                                                        <span
                                                            key={reserva.id}
                                                            title={`${reserva.solicitante}: ${reserva.proposito}`}
                                                            className={cn(
                                                                'block truncate rounded px-1.5 py-1 text-xs',
                                                                reserva.estado ===
                                                                    'aprobada'
                                                                    ? 'bg-destructive/15 text-destructive'
                                                                    : 'bg-digeu-amber/20 text-digeu-navy dark:text-digeu-amber',
                                                            )}
                                                        >
                                                            {
                                                                reserva.hora_inicio
                                                            }
                                                            –{reserva.hora_fin}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {espacios.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={rango.dias.length + 1}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No hay espacios con esos filtros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Calendario.layout = {
    breadcrumbs: [{ title: 'Calendario', href: index() }],
};
