import { Form } from '@inertiajs/react';
import { useState } from 'react';

import type { RouteFormDefinition } from '@/wayfinder';

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
    OpcionesRecursoHumano,
    PersonaFormulario,
} from '@/pages/recurso-humano/tipos';

const SIN_AGRUPACION = 'sin-agrupacion';

type Props = {
    accion: RouteFormDefinition<'post'>;
    persona?: PersonaFormulario;
    opciones: OpcionesRecursoHumano;
    textoBoton: string;
};

export function FormularioPersona({
    accion,
    persona,
    opciones,
    textoBoton,
}: Props) {
    const [tipo, setTipo] = useState(
        persona?.tipo ?? opciones.tipos[0]?.valor ?? '',
    );
    const [paisId, setPaisId] = useState(
        persona?.pais_id
            ? String(persona.pais_id)
            : String(
                  opciones.paises.find((pais) => pais.codigo === 'GT')?.valor ??
                      '',
              ),
    );

    const disciplinas = opciones.disciplinas.filter(
        (disciplina) => disciplina.tipo === tipo,
    );

    const esGuatemalteca =
        opciones.paises.find((pais) => String(pais.valor) === paisId)
            ?.codigo === 'GT';

    return (
        <Form
            {...accion}
            options={{ preserveScroll: true }}
            className="max-w-3xl space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="tipo">Tipo</Label>
                            <Select
                                name="tipo"
                                value={tipo}
                                onValueChange={setTipo}
                            >
                                <SelectTrigger id="tipo">
                                    <SelectValue placeholder="Seleccione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {opciones.tipos.map((opcion) => (
                                        <SelectItem
                                            key={opcion.valor}
                                            value={opcion.valor}
                                        >
                                            {opcion.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.tipo} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="disciplina_id">Disciplina</Label>
                            <Select
                                name="disciplina_id"
                                defaultValue={
                                    persona?.disciplina_id
                                        ? String(persona.disciplina_id)
                                        : undefined
                                }
                                key={`disciplina-${tipo}`}
                            >
                                <SelectTrigger id="disciplina_id">
                                    <SelectValue placeholder="Seleccione una disciplina" />
                                </SelectTrigger>
                                <SelectContent>
                                    {disciplinas.map((disciplina) => (
                                        <SelectItem
                                            key={disciplina.valor}
                                            value={String(disciplina.valor)}
                                        >
                                            {disciplina.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.disciplina_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nombres">Nombres</Label>
                            <Input
                                id="nombres"
                                name="nombres"
                                required
                                defaultValue={persona?.nombres}
                            />
                            <InputError message={errors.nombres} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="apellidos">Apellidos</Label>
                            <Input
                                id="apellidos"
                                name="apellidos"
                                required
                                defaultValue={persona?.apellidos}
                            />
                            <InputError message={errors.apellidos} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="pais_id">Nacionalidad</Label>
                            <Select
                                name="pais_id"
                                value={paisId}
                                onValueChange={setPaisId}
                            >
                                <SelectTrigger id="pais_id">
                                    <SelectValue placeholder="Seleccione un país" />
                                </SelectTrigger>
                                <SelectContent>
                                    {opciones.paises.map((pais) => (
                                        <SelectItem
                                            key={pais.valor}
                                            value={String(pais.valor)}
                                        >
                                            {pais.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.pais_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="agrupacion_id">
                                Agrupación (opcional)
                            </Label>
                            <Select
                                name="agrupacion_id"
                                defaultValue={
                                    persona?.agrupacion_id
                                        ? String(persona.agrupacion_id)
                                        : SIN_AGRUPACION
                                }
                            >
                                <SelectTrigger id="agrupacion_id">
                                    <SelectValue placeholder="Sin agrupación" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={SIN_AGRUPACION}>
                                        Sin agrupación
                                    </SelectItem>
                                    {opciones.agrupaciones.map((agrupacion) => (
                                        <SelectItem
                                            key={agrupacion.valor}
                                            value={String(agrupacion.valor)}
                                        >
                                            {agrupacion.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.agrupacion_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fecha_nacimiento">
                                Fecha de nacimiento
                            </Label>
                            <Input
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                type="date"
                                required
                                defaultValue={persona?.fecha_nacimiento}
                            />
                            <InputError message={errors.fecha_nacimiento} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fecha_alta">
                                Fecha de alta (activo desde)
                            </Label>
                            <Input
                                id="fecha_alta"
                                name="fecha_alta"
                                type="date"
                                required
                                defaultValue={persona?.fecha_alta}
                            />
                            <InputError message={errors.fecha_alta} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="dpi">
                                DPI{' '}
                                {esGuatemalteca
                                    ? '(obligatorio)'
                                    : '(si cuenta con uno)'}
                            </Label>
                            <Input
                                id="dpi"
                                name="dpi"
                                inputMode="numeric"
                                maxLength={13}
                                defaultValue={persona?.dpi ?? ''}
                                placeholder="13 dígitos"
                            />
                            <InputError message={errors.dpi} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="pasaporte">
                                Pasaporte{' '}
                                {esGuatemalteca
                                    ? '(opcional)'
                                    : '(obligatorio si no tiene DPI)'}
                            </Label>
                            <Input
                                id="pasaporte"
                                name="pasaporte"
                                defaultValue={persona?.pasaporte ?? ''}
                            />
                            <InputError message={errors.pasaporte} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="foto">Fotografía</Label>
                        <Input
                            id="foto"
                            name="foto"
                            type="file"
                            accept="image/jpeg,image/png"
                        />
                        <p className="text-xs text-muted-foreground">
                            JPG o PNG, máximo 2 MB.
                        </p>
                        {persona?.foto_url && (
                            <img
                                src={persona.foto_url}
                                alt={persona.nombre_completo}
                                className="mt-2 size-24 rounded-md object-cover"
                            />
                        )}
                        <InputError message={errors.foto} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="biografia">Biografía (opcional)</Label>
                        <Textarea
                            id="biografia"
                            name="biografia"
                            rows={5}
                            defaultValue={persona?.biografia ?? ''}
                        />
                        <InputError message={errors.biografia} />
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
