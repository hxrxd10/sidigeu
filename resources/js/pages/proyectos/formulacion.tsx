import { Form, Head } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import FormulacionController from '@/actions/App/Http/Controllers/Proyectos/FormulacionController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { index } from '@/routes/proyectos';

type Opcion = { valor: number; nombre: string; unidad_medida?: string };

type Props = {
    proyecto: {
        id: number;
        nombre: string;
        estado_nombre: string;
        objetivos: { descripcion: string }[];
        beneficiarios: {
            tipo: string;
            cantidad: number;
            descripcion: string | null;
        }[];
        cronograma: {
            tarea: string;
            fecha_inicio: string | null;
            fecha_fin: string | null;
            responsable_id: number | null;
            avance: number;
        }[];
        presupuesto: {
            descripcion: string;
            cantidad: number;
            costo_unitario: number;
            fuente_financiamiento_id: number | null;
        }[];
        indicadores: {
            indicador_id: number;
            linea_base: number | null;
            meta: number | null;
        }[];
    };
    opciones: {
        indicadores: Opcion[];
        fuentes: Opcion[];
        responsables: Opcion[];
    };
};

function Selector({
    nombre,
    opciones,
    valor,
    etiqueta,
}: {
    nombre: string;
    opciones: Opcion[];
    valor: number | null;
    etiqueta: string;
}) {
    return (
        <select
            name={nombre}
            defaultValue={valor ?? ''}
            aria-label={etiqueta}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
        >
            <option value="">Sin asignar</option>
            {opciones.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                    {opcion.nombre}
                </option>
            ))}
        </select>
    );
}

export default function FormulacionProyecto({ proyecto, opciones }: Props) {
    const [objetivos, setObjetivos] = useState(
        proyecto.objetivos.length > 0
            ? proyecto.objetivos
            : [{ descripcion: '' }],
    );
    const [beneficiarios, setBeneficiarios] = useState(
        proyecto.beneficiarios.length > 0
            ? proyecto.beneficiarios
            : [{ tipo: '', cantidad: 0, descripcion: '' }],
    );
    const [cronograma, setCronograma] = useState(
        proyecto.cronograma.length > 0
            ? proyecto.cronograma
            : [
                  {
                      tarea: '',
                      fecha_inicio: null,
                      fecha_fin: null,
                      responsable_id: null,
                      avance: 0,
                  },
              ],
    );
    const [presupuesto, setPresupuesto] = useState(
        proyecto.presupuesto.length > 0
            ? proyecto.presupuesto
            : [
                  {
                      descripcion: '',
                      cantidad: 1,
                      costo_unitario: 0,
                      fuente_financiamiento_id: null,
                  },
              ],
    );

    return (
        <>
            <Head title={`Formulación: ${proyecto.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={`Formulación: ${proyecto.nombre}`}
                    description="Objetivos, beneficiarios, cronograma, presupuesto e indicadores"
                />

                <Form
                    {...FormulacionController.store.form(proyecto.id)}
                    options={{ preserveScroll: true }}
                    className="max-w-4xl space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Objetivos específicos</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {objetivos.map((objetivo, posicion) => (
                                        <div
                                            key={posicion}
                                            className="flex gap-2"
                                        >
                                            <Input
                                                name={`objetivos[${posicion}][descripcion]`}
                                                defaultValue={
                                                    objetivo.descripcion
                                                }
                                                placeholder="Objetivo específico"
                                                aria-label="Objetivo específico"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar objetivo"
                                                onClick={() =>
                                                    setObjetivos(
                                                        objetivos.filter(
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
                                            setObjetivos([
                                                ...objetivos,
                                                { descripcion: '' },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar objetivo
                                    </Button>

                                    <InputError message={errors.objetivos} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Beneficiarios estimados
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {beneficiarios.map((fila, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[1fr_7rem_1fr_auto]"
                                        >
                                            <Input
                                                name={`beneficiarios[${posicion}][tipo]`}
                                                defaultValue={fila.tipo}
                                                placeholder="Tipo de beneficiario"
                                                aria-label="Tipo de beneficiario"
                                            />
                                            <Input
                                                name={`beneficiarios[${posicion}][cantidad]`}
                                                type="number"
                                                min={0}
                                                defaultValue={fila.cantidad}
                                                placeholder="Cantidad"
                                                aria-label="Cantidad estimada"
                                            />
                                            <Input
                                                name={`beneficiarios[${posicion}][descripcion]`}
                                                defaultValue={
                                                    fila.descripcion ?? ''
                                                }
                                                placeholder="Descripción"
                                                aria-label="Descripción"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar beneficiario"
                                                onClick={() =>
                                                    setBeneficiarios(
                                                        beneficiarios.filter(
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
                                            setBeneficiarios([
                                                ...beneficiarios,
                                                {
                                                    tipo: '',
                                                    cantidad: 0,
                                                    descripcion: '',
                                                },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar beneficiarios
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Cronograma</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {cronograma.map((tarea, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[1fr_9rem_9rem_1fr_6rem_auto]"
                                        >
                                            <Input
                                                name={`cronograma[${posicion}][tarea]`}
                                                defaultValue={tarea.tarea}
                                                placeholder="Tarea o hito"
                                                aria-label="Tarea"
                                            />
                                            <Input
                                                name={`cronograma[${posicion}][fecha_inicio]`}
                                                type="date"
                                                defaultValue={
                                                    tarea.fecha_inicio ?? ''
                                                }
                                                aria-label="Fecha de inicio"
                                            />
                                            <Input
                                                name={`cronograma[${posicion}][fecha_fin]`}
                                                type="date"
                                                defaultValue={
                                                    tarea.fecha_fin ?? ''
                                                }
                                                aria-label="Fecha de finalización"
                                            />
                                            <Selector
                                                nombre={`cronograma[${posicion}][responsable_id]`}
                                                opciones={opciones.responsables}
                                                valor={tarea.responsable_id}
                                                etiqueta="Responsable de la tarea"
                                            />
                                            <Input
                                                name={`cronograma[${posicion}][avance]`}
                                                type="number"
                                                min={0}
                                                max={100}
                                                defaultValue={tarea.avance}
                                                aria-label="Avance"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar tarea"
                                                onClick={() =>
                                                    setCronograma(
                                                        cronograma.filter(
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
                                            setCronograma([
                                                ...cronograma,
                                                {
                                                    tarea: '',
                                                    fecha_inicio: null,
                                                    fecha_fin: null,
                                                    responsable_id: null,
                                                    avance: 0,
                                                },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar tarea
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Presupuesto</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {presupuesto.map((renglon, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[1fr_6rem_8rem_1fr_auto]"
                                        >
                                            <Input
                                                name={`presupuesto[${posicion}][descripcion]`}
                                                defaultValue={
                                                    renglon.descripcion
                                                }
                                                placeholder="Renglón"
                                                aria-label="Renglón"
                                            />
                                            <Input
                                                name={`presupuesto[${posicion}][cantidad]`}
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                defaultValue={renglon.cantidad}
                                                aria-label="Cantidad"
                                            />
                                            <Input
                                                name={`presupuesto[${posicion}][costo_unitario]`}
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                defaultValue={
                                                    renglon.costo_unitario
                                                }
                                                aria-label="Costo unitario"
                                            />
                                            <Selector
                                                nombre={`presupuesto[${posicion}][fuente_financiamiento_id]`}
                                                opciones={opciones.fuentes}
                                                valor={
                                                    renglon.fuente_financiamiento_id
                                                }
                                                etiqueta="Fuente de financiamiento"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar renglón"
                                                onClick={() =>
                                                    setPresupuesto(
                                                        presupuesto.filter(
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
                                            setPresupuesto([
                                                ...presupuesto,
                                                {
                                                    descripcion: '',
                                                    cantidad: 1,
                                                    costo_unitario: 0,
                                                    fuente_financiamiento_id:
                                                        null,
                                                },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar renglón
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Indicadores y metas</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-xs text-muted-foreground">
                                        El indicador se asocia al proyecto
                                        cuando se le fija una meta.
                                    </p>

                                    {opciones.indicadores.map(
                                        (indicador, posicion) => {
                                            const asignado =
                                                proyecto.indicadores.find(
                                                    (actual) =>
                                                        actual.indicador_id ===
                                                        indicador.valor,
                                                );

                                            return (
                                                <div
                                                    key={indicador.valor}
                                                    className="grid gap-2 sm:grid-cols-[1fr_7rem_7rem]"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name={`indicadores[${posicion}][indicador_id]`}
                                                        value={indicador.valor}
                                                    />
                                                    <Label
                                                        htmlFor={`meta-${indicador.valor}`}
                                                    >
                                                        {indicador.nombre}
                                                        <span className="block text-xs font-normal text-muted-foreground">
                                                            {
                                                                indicador.unidad_medida
                                                            }
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        name={`indicadores[${posicion}][linea_base]`}
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Línea base"
                                                        aria-label="Línea base"
                                                        defaultValue={
                                                            asignado?.linea_base ??
                                                            ''
                                                        }
                                                    />
                                                    <Input
                                                        id={`meta-${indicador.valor}`}
                                                        name={`indicadores[${posicion}][meta]`}
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Meta"
                                                        defaultValue={
                                                            asignado?.meta ?? ''
                                                        }
                                                    />
                                                </div>
                                            );
                                        },
                                    )}
                                </CardContent>
                            </Card>

                            <Button type="submit" disabled={processing}>
                                {processing && <Spinner />}
                                Guardar formulación
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

FormulacionProyecto.layout = {
    breadcrumbs: [{ title: 'Proyectos', href: index() }],
};
