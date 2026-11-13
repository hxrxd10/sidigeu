import { Form } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import type {
    Opcion,
    OpcionesProyectos,
    ProyectoFormulario,
} from '@/pages/proyectos/tipos';
import type { RouteFormDefinition } from '@/wayfinder';

const SIN_VALOR = 'sin-valor';

type Props = {
    accion: RouteFormDefinition<'post'>;
    proyecto?: ProyectoFormulario;
    opciones: OpcionesProyectos;
    textoBoton: string;
};

function Selector({
    nombre,
    etiqueta,
    opciones,
    valor,
    error,
}: {
    nombre: string;
    etiqueta: string;
    opciones: Opcion[];
    valor: number | null | undefined;
    error?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={nombre}>{etiqueta}</Label>
            <Select
                name={nombre}
                defaultValue={valor ? String(valor) : SIN_VALOR}
            >
                <SelectTrigger id={nombre}>
                    <SelectValue placeholder="Sin asignar" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={SIN_VALOR}>Sin asignar</SelectItem>
                    {opciones.map((opcion) => (
                        <SelectItem
                            key={opcion.valor}
                            value={String(opcion.valor)}
                        >
                            {opcion.nombre}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}

export function FormularioProyecto({
    accion,
    proyecto,
    opciones,
    textoBoton,
}: Props) {
    return (
        <Form
            {...accion}
            options={{ preserveScroll: true }}
            className="max-w-3xl space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre del proyecto</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            required
                            defaultValue={proyecto?.nombre}
                        />
                        <InputError message={errors.nombre} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Selector
                            nombre="responsable_id"
                            etiqueta="Responsable"
                            opciones={opciones.responsables}
                            valor={proyecto?.responsable_id}
                            error={errors.responsable_id}
                        />
                        <Selector
                            nombre="area_id"
                            etiqueta="Área de la DIGEU"
                            opciones={opciones.areas}
                            valor={proyecto?.area_id}
                            error={errors.area_id}
                        />
                        <Selector
                            nombre="programa_id"
                            etiqueta="Programa"
                            opciones={opciones.programas}
                            valor={proyecto?.programa_id}
                            error={errors.programa_id}
                        />
                        <Selector
                            nombre="linea_accion_id"
                            etiqueta="Línea de acción"
                            opciones={opciones.lineas}
                            valor={proyecto?.linea_accion_id}
                            error={errors.linea_accion_id}
                        />
                        <Selector
                            nombre="tipo_proyecto_id"
                            etiqueta="Tipo de proyecto"
                            opciones={opciones.tipos}
                            valor={proyecto?.tipo_proyecto_id}
                            error={errors.tipo_proyecto_id}
                        />

                        <div className="grid gap-2">
                            <Label htmlFor="fecha_inicio">
                                Fecha de inicio
                            </Label>
                            <Input
                                id="fecha_inicio"
                                name="fecha_inicio"
                                type="date"
                                defaultValue={proyecto?.fecha_inicio ?? ''}
                            />
                            <InputError message={errors.fecha_inicio} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fecha_fin">
                                Fecha de finalización
                            </Label>
                            <Input
                                id="fecha_fin"
                                name="fecha_fin"
                                type="date"
                                defaultValue={proyecto?.fecha_fin ?? ''}
                            />
                            <InputError message={errors.fecha_fin} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="objetivo_general">
                            Objetivo general
                        </Label>
                        <Textarea
                            id="objetivo_general"
                            name="objetivo_general"
                            rows={3}
                            required
                            defaultValue={proyecto?.objetivo_general ?? ''}
                        />
                        <InputError message={errors.objetivo_general} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="justificacion">Justificación</Label>
                        <Textarea
                            id="justificacion"
                            name="justificacion"
                            rows={4}
                            defaultValue={proyecto?.justificacion ?? ''}
                        />
                        <InputError message={errors.justificacion} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        {textoBoton}
                    </Button>
                </>
            )}
        </Form>
    );
}
