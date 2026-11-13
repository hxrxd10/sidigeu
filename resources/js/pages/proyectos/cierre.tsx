import { Form, Head } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import CierreProyectoController from '@/actions/App/Http/Controllers/Proyectos/CierreProyectoController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/proyectos';

type Props = {
    proyecto: {
        id: number;
        nombre: string;
        estado_nombre: string;
        resultados: string | null;
        productos: string | null;
        lecciones_aprendidas: string | null;
        indicadores: {
            indicador_id: number;
            nombre: string;
            unidad_medida: string;
            meta: number | null;
            valor_final: number | null;
        }[];
    };
};

export default function CerrarProyecto({ proyecto }: Props) {
    const [enlaces, setEnlaces] = useState([{ url: '', descripcion: '' }]);

    return (
        <>
            <Head title={`Cierre: ${proyecto.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={`Cierre: ${proyecto.nombre}`}
                    description="Resultados finales, productos, lecciones aprendidas y evidencias"
                />

                <Form
                    {...CierreProyectoController.store.form(proyecto.id)}
                    options={{ preserveScroll: true }}
                    className="max-w-3xl space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="resultados">
                                            Resultados finales
                                        </Label>
                                        <Textarea
                                            id="resultados"
                                            name="resultados"
                                            rows={4}
                                            required
                                            defaultValue={
                                                proyecto.resultados ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.resultados}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="productos">
                                            Productos entregados
                                        </Label>
                                        <Textarea
                                            id="productos"
                                            name="productos"
                                            rows={3}
                                            defaultValue={
                                                proyecto.productos ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.productos}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="lecciones_aprendidas">
                                            Lecciones aprendidas
                                        </Label>
                                        <Textarea
                                            id="lecciones_aprendidas"
                                            name="lecciones_aprendidas"
                                            rows={3}
                                            defaultValue={
                                                proyecto.lecciones_aprendidas ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            message={
                                                errors.lecciones_aprendidas
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {proyecto.indicadores.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Valores finales de los indicadores
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-xs text-muted-foreground">
                                            Se propone el aporte de las
                                            actividades vinculadas; puede
                                            ajustarlo.
                                        </p>

                                        {proyecto.indicadores.map(
                                            (indicador, posicion) => (
                                                <div
                                                    key={indicador.indicador_id}
                                                    className="flex items-center gap-3"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name={`indicadores[${posicion}][indicador_id]`}
                                                        value={
                                                            indicador.indicador_id
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={`final-${indicador.indicador_id}`}
                                                        className="flex-1"
                                                    >
                                                        {indicador.nombre}
                                                        <span className="block text-xs font-normal text-muted-foreground">
                                                            Meta:{' '}
                                                            {indicador.meta ??
                                                                '—'}{' '}
                                                            {
                                                                indicador.unidad_medida
                                                            }
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        id={`final-${indicador.indicador_id}`}
                                                        name={`indicadores[${posicion}][valor_final]`}
                                                        type="number"
                                                        min={0}
                                                        step="0.01"
                                                        className="w-32"
                                                        defaultValue={
                                                            indicador.valor_final ??
                                                            ''
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
                                    <CardTitle>
                                        Evidencias y productos
                                    </CardTitle>
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
                                Cerrar proyecto
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

CerrarProyecto.layout = {
    breadcrumbs: [{ title: 'Proyectos', href: index() }],
};
