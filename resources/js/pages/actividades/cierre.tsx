import { Form, Head } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import CierreActividadController from '@/actions/App/Http/Controllers/Actividades/CierreActividadController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/actividades';

type Opcion = { valor: string | number; nombre: string };

type Beneficiario = {
    sexo: string;
    rango_edad: string;
    tipo_publico: string | null;
    cantidad: number | string;
};

type Participante = {
    persona_recurso_humano_id: number | null;
    nombre_externo: string | null;
    rol: string | null;
};

type Props = {
    actividad: {
        id: number;
        nombre: string;
        fecha: string;
        estado: string;
        estado_nombre: string;
        resultados: string | null;
        observaciones: string | null;
        indicadores: {
            indicador_id: number;
            nombre: string;
            unidad_medida: string;
            valor_meta: number | null;
            valor_alcanzado: number | null;
        }[];
        beneficiarios: Beneficiario[];
        participantes: Participante[];
    };
    opciones: {
        sexos: Opcion[];
        rangos: Opcion[];
        personas: Opcion[];
    };
};

export default function CerrarActividad({ actividad, opciones }: Props) {
    const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>(
        actividad.beneficiarios.length > 0
            ? actividad.beneficiarios
            : [
                  {
                      sexo: String(opciones.sexos[0]?.valor ?? ''),
                      rango_edad: String(opciones.rangos[0]?.valor ?? ''),
                      tipo_publico: '',
                      cantidad: '',
                  },
              ],
    );

    const [participantes, setParticipantes] = useState<Participante[]>(
        actividad.participantes.length > 0
            ? actividad.participantes
            : [
                  {
                      persona_recurso_humano_id: null,
                      nombre_externo: '',
                      rol: '',
                  },
              ],
    );

    const [enlaces, setEnlaces] = useState([{ url: '', descripcion: '' }]);

    return (
        <>
            <Head title={`Cerrar ${actividad.nombre}`} />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title={`Cierre: ${actividad.nombre}`}
                    description="Registre resultados, beneficiarios, participantes, indicadores y evidencias"
                />

                <Form
                    {...CierreActividadController.store.form(actividad.id)}
                    options={{ preserveScroll: true }}
                    className="max-w-4xl space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Resultados</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="resultados">
                                            Resultados alcanzados
                                        </Label>
                                        <Textarea
                                            id="resultados"
                                            name="resultados"
                                            rows={4}
                                            required
                                            defaultValue={
                                                actividad.resultados ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.resultados}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="observaciones">
                                            Observaciones (opcional)
                                        </Label>
                                        <Textarea
                                            id="observaciones"
                                            name="observaciones"
                                            rows={3}
                                            defaultValue={
                                                actividad.observaciones ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.observaciones}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Beneficiarios</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {beneficiarios.map((fila, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_6rem_auto]"
                                        >
                                            <select
                                                name={`beneficiarios[${posicion}][sexo]`}
                                                defaultValue={fila.sexo}
                                                aria-label="Sexo"
                                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                                            >
                                                {opciones.sexos.map((sexo) => (
                                                    <option
                                                        key={sexo.valor}
                                                        value={sexo.valor}
                                                    >
                                                        {sexo.nombre}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                name={`beneficiarios[${posicion}][rango_edad]`}
                                                defaultValue={fila.rango_edad}
                                                aria-label="Rango de edad"
                                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                                            >
                                                {opciones.rangos.map(
                                                    (rango) => (
                                                        <option
                                                            key={rango.valor}
                                                            value={rango.valor}
                                                        >
                                                            {rango.nombre}
                                                        </option>
                                                    ),
                                                )}
                                            </select>

                                            <Input
                                                name={`beneficiarios[${posicion}][tipo_publico]`}
                                                placeholder="Tipo de público"
                                                defaultValue={
                                                    fila.tipo_publico ?? ''
                                                }
                                            />

                                            <Input
                                                name={`beneficiarios[${posicion}][cantidad]`}
                                                type="number"
                                                min={0}
                                                placeholder="Cantidad"
                                                defaultValue={fila.cantidad}
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar fila"
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
                                                    sexo: String(
                                                        opciones.sexos[0]
                                                            ?.valor ?? '',
                                                    ),
                                                    rango_edad: String(
                                                        opciones.rangos[0]
                                                            ?.valor ?? '',
                                                    ),
                                                    tipo_publico: '',
                                                    cantidad: '',
                                                },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar desagregación
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Participantes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {participantes.map((fila, posicion) => (
                                        <div
                                            key={posicion}
                                            className="grid gap-2 sm:grid-cols-[1fr_1fr_8rem_auto]"
                                        >
                                            <select
                                                name={`participantes[${posicion}][persona_recurso_humano_id]`}
                                                defaultValue={
                                                    fila.persona_recurso_humano_id ??
                                                    ''
                                                }
                                                aria-label="Persona del padrón"
                                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                                            >
                                                <option value="">
                                                    Persona externa
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
                                                name={`participantes[${posicion}][nombre_externo]`}
                                                placeholder="Nombre (si es externa)"
                                                defaultValue={
                                                    fila.nombre_externo ?? ''
                                                }
                                            />

                                            <Input
                                                name={`participantes[${posicion}][rol]`}
                                                placeholder="Rol"
                                                defaultValue={fila.rol ?? ''}
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Quitar participante"
                                                onClick={() =>
                                                    setParticipantes(
                                                        participantes.filter(
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
                                            setParticipantes([
                                                ...participantes,
                                                {
                                                    persona_recurso_humano_id:
                                                        null,
                                                    nombre_externo: '',
                                                    rol: '',
                                                },
                                            ])
                                        }
                                    >
                                        <Plus />
                                        Agregar participante
                                    </Button>
                                </CardContent>
                            </Card>

                            {actividad.indicadores.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Indicadores alcanzados
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {actividad.indicadores.map(
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
                                                        htmlFor={`alcanzado-${indicador.indicador_id}`}
                                                        className="flex-1"
                                                    >
                                                        {indicador.nombre}
                                                        <span className="block text-xs font-normal text-muted-foreground">
                                                            Meta:{' '}
                                                            {indicador.valor_meta ??
                                                                '—'}{' '}
                                                            {
                                                                indicador.unidad_medida
                                                            }
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        id={`alcanzado-${indicador.indicador_id}`}
                                                        name={`indicadores[${posicion}][valor_alcanzado]`}
                                                        type="number"
                                                        min={0}
                                                        step="0.01"
                                                        className="w-28"
                                                        defaultValue={
                                                            indicador.valor_alcanzado ??
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
                                    <CardTitle>Evidencias</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="archivos">
                                            Fotografías y documentos
                                        </Label>
                                        <Input
                                            id="archivos"
                                            name="archivos[]"
                                            type="file"
                                            multiple
                                            accept="image/jpeg,image/png,application/pdf,.doc,.docx,.xls,.xlsx"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Hasta 10 archivos de 10 MB cada uno.
                                        </p>
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
                                                defaultValue={
                                                    enlace.descripcion
                                                }
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
                                Cerrar actividad
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

CerrarActividad.layout = {
    breadcrumbs: [{ title: 'Actividades', href: index() }],
};
