import { Form, Head } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import EjecucionProyectoController from '@/actions/App/Http/Controllers/Proyectos/EjecucionProyectoController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/proyectos';

type Opcion = { valor: number | string; nombre: string };

type Props = {
    proyecto: {
        id: number;
        nombre: string;
        estado_nombre: string;
        avance_fisico: number;
        cronograma: {
            id: number;
            tarea: string;
            avance: number;
            responsable: string | null;
        }[];
        presupuesto: {
            id: number;
            descripcion: string;
            subtotal: number;
            ejecutado: number;
        }[];
    };
    opciones: {
        tipos: { valor: string; nombre: string }[];
        personas: Opcion[];
    };
};

export default function RegistrarAvance({ proyecto, opciones }: Props) {
    const [recursos, setRecursos] = useState<
        {
            tipo: string;
            persona_recurso_humano_id: string;
            descripcion: string;
            cantidad: number;
            costo: number;
        }[]
    >([]);
    const [enlaces, setEnlaces] = useState([{ url: '', descripcion: '' }]);

    return (
        <>
            <Head title={`Avance: ${proyecto.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={`Avance: ${proyecto.nombre}`}
                    description="Registre el avance del período, el cronograma y el presupuesto ejecutado"
                />

                <Form
                    {...EjecucionProyectoController.store.form(proyecto.id)}
                    options={{ preserveScroll: true }}
                    className="max-w-4xl space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Avance del período</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="fecha">Fecha</Label>
                                            <Input
                                                id="fecha"
                                                name="fecha"
                                                type="date"
                                                required
                                            />
                                            <InputError
                                                message={errors.fecha}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="porcentaje">
                                                Porcentaje de avance
                                            </Label>
                                            <Input
                                                id="porcentaje"
                                                name="porcentaje"
                                                type="number"
                                                min={0}
                                                max={100}
                                                required
                                                defaultValue={
                                                    proyecto.avance_fisico
                                                }
                                            />
                                            <InputError
                                                message={errors.porcentaje}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="descripcion">
                                            Descripción del avance
                                        </Label>
                                        <Textarea
                                            id="descripcion"
                                            name="descripcion"
                                            rows={4}
                                            required
                                        />
                                        <InputError
                                            message={errors.descripcion}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {proyecto.cronograma.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Avance del cronograma
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {proyecto.cronograma.map(
                                            (tarea, posicion) => (
                                                <div
                                                    key={tarea.id}
                                                    className="flex items-center gap-3"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name={`tareas[${posicion}][id]`}
                                                        value={tarea.id}
                                                    />
                                                    <Label
                                                        htmlFor={`tarea-${tarea.id}`}
                                                        className="flex-1"
                                                    >
                                                        {tarea.tarea}
                                                        {tarea.responsable && (
                                                            <span className="block text-xs font-normal text-muted-foreground">
                                                                {
                                                                    tarea.responsable
                                                                }
                                                            </span>
                                                        )}
                                                    </Label>
                                                    <Input
                                                        id={`tarea-${tarea.id}`}
                                                        name={`tareas[${posicion}][avance]`}
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        className="w-24"
                                                        defaultValue={
                                                            tarea.avance
                                                        }
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {proyecto.presupuesto.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Presupuesto ejecutado
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {proyecto.presupuesto.map(
                                            (renglon, posicion) => (
                                                <div
                                                    key={renglon.id}
                                                    className="flex items-center gap-3"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name={`renglones[${posicion}][id]`}
                                                        value={renglon.id}
                                                    />
                                                    <Label
                                                        htmlFor={`renglon-${renglon.id}`}
                                                        className="flex-1"
                                                    >
                                                        {renglon.descripcion}
                                                        <span className="block text-xs font-normal text-muted-foreground">
                                                            Presupuestado: Q
                                                            {renglon.subtotal}
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        id={`renglon-${renglon.id}`}
                                                        name={`renglones[${posicion}][ejecutado]`}
                                                        type="number"
                                                        min={0}
                                                        step="0.01"
                                                        className="w-32"
                                                        defaultValue={
                                                            renglon.ejecutado
                                                        }
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recursos ejecutados</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {recursos.map((recurso, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[8rem_1fr_1fr_6rem_7rem_auto]"
                                        >
                                            <select
                                                name={`recursos[${posicion}][tipo]`}
                                                defaultValue={recurso.tipo}
                                                aria-label="Tipo de recurso"
                                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                                            >
                                                {opciones.tipos.map((tipo) => (
                                                    <option
                                                        key={tipo.valor}
                                                        value={tipo.valor}
                                                    >
                                                        {tipo.nombre}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                name={`recursos[${posicion}][persona_recurso_humano_id]`}
                                                aria-label="Persona del padrón"
                                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                                            >
                                                <option value="">
                                                    Sin persona del padrón
                                                </option>
                                                {opciones.personas.map(
                                                    (persona) => (
                                                        <option
                                                            key={persona.valor}
                                                            value={
                                                                persona.valor
                                                            }
                                                        >
                                                            {persona.nombre}
                                                        </option>
                                                    ),
                                                )}
                                            </select>

                                            <Input
                                                name={`recursos[${posicion}][descripcion]`}
                                                placeholder="Descripción"
                                                aria-label="Descripción del recurso"
                                            />
                                            <Input
                                                name={`recursos[${posicion}][cantidad]`}
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                defaultValue={1}
                                                aria-label="Cantidad"
                                            />
                                            <Input
                                                name={`recursos[${posicion}][costo]`}
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                defaultValue={0}
                                                aria-label="Costo"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar recurso"
                                                onClick={() =>
                                                    setRecursos(
                                                        recursos.filter(
                                                            (_, indice) =>
                                                                indice !==
                                                                posicion,
                                                        ),
                                                    )
                                                }
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setRecursos([
                                                ...recursos,
                                                {
                                                    tipo:
                                                        opciones.tipos[0]
                                                            ?.valor ?? 'humano',
                                                    persona_recurso_humano_id:
                                                        '',
                                                    descripcion: '',
                                                    cantidad: 1,
                                                    costo: 0,
                                                },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar recurso
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Evidencias</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="archivos">
                                            Archivos
                                        </Label>
                                        <Input
                                            id="archivos"
                                            name="archivos[]"
                                            type="file"
                                            multiple
                                            accept="image/jpeg,image/png,application/pdf,.doc,.docx,.xls,.xlsx"
                                        />
                                        <InputError message={errors.archivos} />
                                    </div>

                                    {enlaces.map((enlace, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
                                        >
                                            <Input
                                                name={`enlaces[${posicion}][url]`}
                                                type="url"
                                                placeholder="https://"
                                                defaultValue={enlace.url}
                                            />
                                            <Input
                                                name={`enlaces[${posicion}][descripcion]`}
                                                placeholder="Descripción"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar enlace"
                                                onClick={() =>
                                                    setEnlaces(
                                                        enlaces.filter(
                                                            (_, indice) =>
                                                                indice !==
                                                                posicion,
                                                        ),
                                                    )
                                                }
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setEnlaces([
                                                ...enlaces,
                                                { url: '', descripcion: '' },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar enlace
                                    </Button>
                                </CardContent>
                            </Card>

                            <Button type="submit" disabled={processing}>
                                {processing && <Spinner />}
                                Guardar avance
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

RegistrarAvance.layout = {
    breadcrumbs: [{ title: 'Proyectos', href: index() }],
};
