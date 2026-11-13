import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, MapPin, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { index, show } from '@/routes/publico/espacios';
import { create as crearSolicitud } from '@/routes/publico/solicitud';

const TODOS = 'todos';

type EspacioPublico = {
    id: number;
    nombre: string;
    sede: string;
    direccion: string | null;
    tipo: string;
    ubicacion: string | null;
    capacidad: number | null;
    caracteristicas: string | null;
    en_mantenimiento: boolean;
    fotografias: string[];
};

type Props = {
    espacios: EspacioPublico[];
    filtros: {
        sede_id: number | null;
        tipo_espacio_id: number | null;
        capacidad: number | null;
    };
    opciones: {
        sedes: { valor: number; nombre: string }[];
        tipos: { valor: number; nombre: string }[];
    };
};

export default function CatalogoPublico({
    espacios,
    filtros,
    opciones,
}: Props) {
    const filtrar = (cambios: Partial<Props['filtros']>) => {
        router.get(
            index().url,
            { ...filtros, ...cambios },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <>
            <Head title="Catálogo de espacios" />

            <div className="space-y-8">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold">
                        Espacios de la DIGEU
                    </h1>
                    <p className="max-w-2xl text-muted-foreground">
                        Consulte las características de cada espacio. Para
                        conocer la disponibilidad y reservarlo, envíe una
                        solicitud: la Dirección le responderá por correo.
                    </p>
                </header>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                        <Label htmlFor="sede">Sede</Label>
                        <Select
                            value={
                                filtros.sede_id
                                    ? String(filtros.sede_id)
                                    : TODOS
                            }
                            onValueChange={(valor) =>
                                filtrar({
                                    sede_id:
                                        valor === TODOS ? null : Number(valor),
                                })
                            }
                        >
                            <SelectTrigger id="sede">
                                <SelectValue placeholder="Todas las sedes" />
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
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tipo">Tipo de espacio</Label>
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
                            <SelectTrigger id="tipo">
                                <SelectValue placeholder="Todos los tipos" />
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

                    <form
                        className="grid gap-2"
                        onSubmit={(evento) => evento.preventDefault()}
                    >
                        <Label htmlFor="capacidad">Capacidad mínima</Label>
                        <Input
                            id="capacidad"
                            type="number"
                            min={1}
                            defaultValue={filtros.capacidad ?? ''}
                            placeholder="Personas"
                            onBlur={(evento) =>
                                filtrar({
                                    capacidad: evento.target.value
                                        ? Number(evento.target.value)
                                        : null,
                                })
                            }
                        />
                    </form>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {espacios.map((espacio) => (
                        <Card key={espacio.id} className="overflow-hidden py-0">
                            {espacio.fotografias[0] ? (
                                <img
                                    src={espacio.fotografias[0]}
                                    alt={espacio.nombre}
                                    className="h-40 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-40 w-full items-center justify-center bg-secondary text-secondary-foreground">
                                    <MapPin className="size-8 opacity-40" />
                                </div>
                            )}

                            <CardContent className="space-y-3 py-5">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h2 className="font-semibold">
                                            {espacio.nombre}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            {espacio.sede}
                                        </p>
                                    </div>
                                    <Badge variant="outline">
                                        {espacio.tipo}
                                    </Badge>
                                </div>

                                {espacio.capacidad && (
                                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="size-4" />
                                        Hasta {espacio.capacidad} personas
                                    </p>
                                )}

                                {espacio.en_mantenimiento && (
                                    <Badge variant="secondary">
                                        En mantenimiento
                                    </Badge>
                                )}

                                <div className="flex gap-2 pt-1">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={show(espacio.id)}>
                                            Ver detalle
                                            <ArrowRight />
                                        </Link>
                                    </Button>
                                    {!espacio.en_mantenimiento && (
                                        <Button size="sm" asChild>
                                            <Link
                                                href={crearSolicitud({
                                                    query: {
                                                        espacio_id: espacio.id,
                                                    },
                                                })}
                                            >
                                                Solicitar
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {espacios.length === 0 && (
                    <p className="rounded-xl border py-12 text-center text-muted-foreground">
                        No hay espacios que coincidan con los filtros.
                    </p>
                )}
            </div>
        </>
    );
}
