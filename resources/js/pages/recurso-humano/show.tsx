import { Form, Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Power, Trash2 } from 'lucide-react';
import { useState } from 'react';

import EstadoPersonaController from '@/actions/App/Http/Controllers/RecursoHumano/EstadoPersonaController';
import PersonaRecursoHumanoController from '@/actions/App/Http/Controllers/RecursoHumano/PersonaRecursoHumanoController';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useInitials } from '@/hooks/use-initials';
import { edit, index } from '@/routes/recurso-humano';
import type { PersonaFicha } from './tipos';
import { fechaLegible } from '@/lib/fecha';

type Props = {
    persona: PersonaFicha;
    puedeGestionar: boolean;
};

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
    return (
        <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                {etiqueta}
            </dt>
            <dd className="mt-0.5 text-sm">{valor}</dd>
        </div>
    );
}

export default function FichaPersona({ persona, puedeGestionar }: Props) {
    const iniciales = useInitials();
    const [dialogo, setDialogo] = useState<'baja' | 'reactivar' | null>(null);

    const documento = persona.documento_oculto
        ? 'Restringido'
        : (persona.dpi ?? persona.pasaporte ?? '—');

    return (
        <>
            <Head title={persona.nombre_completo} />

            <div className="space-y-6 px-4 py-6">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver al padrón
                    </Link>
                </Button>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-16">
                            {persona.foto_url && (
                                <AvatarImage
                                    src={persona.foto_url}
                                    alt={persona.nombre_completo}
                                />
                            )}
                            <AvatarFallback className="text-lg">
                                {iniciales(persona.nombre_completo)}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="text-2xl font-semibold">
                                {persona.nombre_completo}
                            </h1>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">
                                    {persona.tipo_nombre}
                                </Badge>
                                {persona.disciplina && (
                                    <Badge variant="outline">
                                        {persona.disciplina}
                                    </Badge>
                                )}
                                <Badge
                                    variant={
                                        persona.activo ? 'default' : 'outline'
                                    }
                                >
                                    {persona.activo ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {puedeGestionar && (
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href={edit(persona.id)}>
                                    <Pencil />
                                    Editar
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    setDialogo(
                                        persona.activo ? 'baja' : 'reactivar',
                                    )
                                }
                            >
                                <Power />
                                {persona.activo ? 'Dar de baja' : 'Reactivar'}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.delete(
                                        PersonaRecursoHumanoController.destroy.url(
                                            persona.id,
                                        ),
                                    )
                                }
                            >
                                <Trash2 />
                                Eliminar
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Datos generales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <Dato
                                    etiqueta="Nacionalidad"
                                    valor={persona.pais ?? '—'}
                                />
                                <Dato etiqueta="Documento" valor={documento} />
                                <Dato
                                    etiqueta="Fecha de nacimiento"
                                    valor={fechaLegible(
                                        persona.fecha_nacimiento,
                                    )}
                                />
                                <Dato
                                    etiqueta="Edad"
                                    valor={`${persona.edad} años`}
                                />
                                <Dato
                                    etiqueta="Agrupación"
                                    valor={persona.agrupacion ?? '—'}
                                />
                                <Dato
                                    etiqueta="Fecha de alta"
                                    valor={fechaLegible(persona.fecha_alta)}
                                />
                                {persona.fecha_baja && (
                                    <Dato
                                        etiqueta="Fecha de baja"
                                        valor={fechaLegible(persona.fecha_baja)}
                                    />
                                )}
                                {persona.motivo_baja && (
                                    <Dato
                                        etiqueta="Motivo de baja"
                                        valor={persona.motivo_baja}
                                    />
                                )}
                            </dl>

                            {persona.biografia && (
                                <div className="mt-6">
                                    <h2 className="text-xs tracking-wide text-muted-foreground uppercase">
                                        Biografía
                                    </h2>
                                    <p className="mt-1 text-sm whitespace-pre-line">
                                        {persona.biografia}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Permanencia</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                                    Período vigente
                                </p>
                                <p className="text-2xl font-semibold">
                                    {persona.permanencia.texto}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                                    Acumulada
                                </p>
                                <p className="text-lg">
                                    {persona.permanencia_total.texto}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Historial de períodos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alta</TableHead>
                                    <TableHead>Baja</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Días</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {persona.periodos.map((periodo) => (
                                    <TableRow key={periodo.id}>
                                        <TableCell>
                                            {fechaLegible(periodo.fecha_alta)}
                                        </TableCell>
                                        <TableCell>
                                            {fechaLegible(periodo.fecha_baja) ||
                                                'En curso'}
                                        </TableCell>
                                        <TableCell>
                                            {periodo.motivo_baja ?? '—'}
                                        </TableCell>
                                        <TableCell>{periodo.dias}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={dialogo !== null}
                onOpenChange={(abierto) => !abierto && setDialogo(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogo === 'baja'
                                ? 'Dar de baja'
                                : 'Reactivar persona'}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogo === 'baja'
                                ? 'El período vigente se cierra con la fecha que indique.'
                                : 'Se abre un período nuevo a partir de la fecha de alta.'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        {...(dialogo === 'baja'
                            ? EstadoPersonaController.store.form(persona.id)
                            : EstadoPersonaController.update.form(persona.id))}
                        onSuccess={() => setDialogo(null)}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                {dialogo === 'baja' ? (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="fecha_baja">
                                                Fecha de baja
                                            </Label>
                                            <Input
                                                id="fecha_baja"
                                                name="fecha_baja"
                                                type="date"
                                                required
                                            />
                                            <InputError
                                                message={errors.fecha_baja}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="motivo_baja">
                                                Motivo (opcional)
                                            </Label>
                                            <Input
                                                id="motivo_baja"
                                                name="motivo_baja"
                                            />
                                            <InputError
                                                message={errors.motivo_baja}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="grid gap-2">
                                        <Label htmlFor="fecha_alta">
                                            Nueva fecha de alta
                                        </Label>
                                        <Input
                                            id="fecha_alta"
                                            name="fecha_alta"
                                            type="date"
                                            required
                                        />
                                        <InputError
                                            message={errors.fecha_alta}
                                        />
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setDialogo(null)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner />}
                                        Confirmar
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

FichaPersona.layout = {
    breadcrumbs: [{ title: 'Recurso humano', href: index() }],
};
