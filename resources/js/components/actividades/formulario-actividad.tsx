import { Form } from '@inertiajs/react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    ActividadFormulario,
    OpcionesActividades,
} from '@/pages/actividades/tipos';
import type { RouteFormDefinition } from '@/wayfinder';

const SIN_ESPACIO = 'sin-espacio';
const SIN_RESPONSABLE = 'sin-responsable';

type Props = {
    accion: RouteFormDefinition<'post'>;
    actividad?: ActividadFormulario;
    opciones: OpcionesActividades;
    textoBoton: string;
};

export function FormularioActividad({
    accion,
    actividad,
    opciones,
    textoBoton,
}: Props) {
    const [espacioId, setEspacioId] = useState(
        actividad?.espacio_id ? String(actividad.espacio_id) : SIN_ESPACIO,
    );

    const usaEspacio = espacioId !== SIN_ESPACIO;

    return (
        <Form
            {...accion}
            options={{ preserveScroll: true }}
            className="max-w-3xl space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre de la actividad</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            required
                            defaultValue={actividad?.nombre}
                        />
                        <InputError message={errors.nombre} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="fecha">Fecha</Label>
                            <Input
                                id="fecha"
                                name="fecha"
                                type="date"
                                required
                                defaultValue={actividad?.fecha}
                            />
                            <InputError message={errors.fecha} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="hora_inicio">Hora de inicio</Label>
                            <Input
                                id="hora_inicio"
                                name="hora_inicio"
                                type="time"
                                defaultValue={actividad?.hora_inicio ?? ''}
                            />
                            <InputError message={errors.hora_inicio} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="hora_fin">
                                Hora de finalización
                            </Label>
                            <Input
                                id="hora_fin"
                                name="hora_fin"
                                type="time"
                                defaultValue={actividad?.hora_fin ?? ''}
                            />
                            <InputError message={errors.hora_fin} />
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="espacio_id">
                                Espacio de la DIGEU
                            </Label>
                            <Select
                                name="espacio_id"
                                value={espacioId}
                                onValueChange={setEspacioId}
                            >
                                <SelectTrigger id="espacio_id">
                                    <SelectValue placeholder="Sin espacio" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={SIN_ESPACIO}>
                                        Lugar externo
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
                            <p className="text-xs text-muted-foreground">
                                Al elegir un espacio se reserva el horario en el
                                calendario de ocupación.
                            </p>
                            <InputError message={errors.espacio_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lugar_externo">Lugar externo</Label>
                            <Input
                                id="lugar_externo"
                                name="lugar_externo"
                                disabled={usaEspacio}
                                defaultValue={actividad?.lugar_externo ?? ''}
                                placeholder="Dirección o referencia"
                            />
                            <InputError message={errors.lugar_externo} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tipo_actividad_id">
                                Tipo de actividad
                            </Label>
                            <Select
                                name="tipo_actividad_id"
                                defaultValue={
                                    actividad
                                        ? String(actividad.tipo_actividad_id)
                                        : undefined
                                }
                            >
                                <SelectTrigger id="tipo_actividad_id">
                                    <SelectValue placeholder="Seleccione" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <InputError message={errors.tipo_actividad_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="linea_accion_id">
                                Línea de acción
                            </Label>
                            <Select
                                name="linea_accion_id"
                                defaultValue={
                                    actividad
                                        ? String(actividad.linea_accion_id)
                                        : undefined
                                }
                            >
                                <SelectTrigger id="linea_accion_id">
                                    <SelectValue placeholder="Seleccione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {opciones.lineas.map((linea) => (
                                        <SelectItem
                                            key={linea.valor}
                                            value={String(linea.valor)}
                                        >
                                            {linea.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.linea_accion_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="responsable_id">Responsable</Label>
                            <Select
                                name="responsable_id"
                                defaultValue={
                                    actividad?.responsable_id
                                        ? String(actividad.responsable_id)
                                        : SIN_RESPONSABLE
                                }
                            >
                                <SelectTrigger id="responsable_id">
                                    <SelectValue placeholder="Sin responsable" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={SIN_RESPONSABLE}>
                                        Sin responsable asignado
                                    </SelectItem>
                                    {opciones.responsables.map((persona) => (
                                        <SelectItem
                                            key={persona.valor}
                                            value={String(persona.valor)}
                                        >
                                            {persona.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.responsable_id} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">
                            Descripción (opcional)
                        </Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            rows={3}
                            defaultValue={actividad?.descripcion ?? ''}
                        />
                        <InputError message={errors.descripcion} />
                    </div>

                    <fieldset className="grid gap-3">
                        <legend className="mb-1 text-sm font-medium">
                            Público objetivo
                        </legend>

                        <div className="grid gap-2 sm:grid-cols-2">
                            {opciones.publicos.map((publico) => (
                                <div
                                    key={publico.valor}
                                    className="flex items-center gap-3"
                                >
                                    <Checkbox
                                        id={`publico-${publico.valor}`}
                                        name="publicos[]"
                                        value={publico.valor}
                                        defaultChecked={actividad?.publicos.includes(
                                            publico.valor,
                                        )}
                                    />
                                    <Label htmlFor={`publico-${publico.valor}`}>
                                        {publico.nombre}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="grid gap-3">
                        <legend className="mb-1 text-sm font-medium">
                            Indicadores y metas
                        </legend>

                        <p className="-mt-2 text-xs text-muted-foreground">
                            Escriba la meta del indicador para asociarlo a la
                            actividad; los que queden en blanco no se asocian.
                        </p>

                        {opciones.indicadores.map((indicador, posicion) => {
                            const asignado = actividad?.indicadores.find(
                                (actual) =>
                                    actual.indicador_id === indicador.valor,
                            );

                            return (
                                <div
                                    key={indicador.valor}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="hidden"
                                        name={`indicadores[${posicion}][indicador_id]`}
                                        value={indicador.valor}
                                    />
                                    <Label
                                        htmlFor={`meta-${indicador.valor}`}
                                        className="flex-1"
                                    >
                                        {indicador.nombre}
                                        <span className="block text-xs font-normal text-muted-foreground">
                                            {indicador.unidad_medida}
                                        </span>
                                    </Label>
                                    <Input
                                        id={`meta-${indicador.valor}`}
                                        name={`indicadores[${posicion}][valor_meta]`}
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        className="w-28"
                                        placeholder="Meta"
                                        defaultValue={
                                            asignado?.valor_meta ?? ''
                                        }
                                    />
                                </div>
                            );
                        })}

                        <InputError message={errors.indicadores} />
                    </fieldset>

                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="publicar_agenda"
                            name="publicar_agenda"
                            defaultChecked={actividad?.publicar_agenda ?? false}
                        />
                        <Label htmlFor="publicar_agenda">
                            Publicar en la Agenda Cultural al validarse
                        </Label>
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
