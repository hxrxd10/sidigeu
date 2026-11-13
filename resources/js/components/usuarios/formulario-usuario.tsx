import { Form } from '@inertiajs/react';
import type { RouteFormDefinition } from '@/wayfinder';

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

export type Opcion = { valor: number | string; nombre: string };

export type DatosUsuario = {
    name: string;
    email: string;
    unidad_id: number | null;
    activo: boolean;
    roles: string[];
};

type Props = {
    accion: RouteFormDefinition<'post'>;
    usuario?: DatosUsuario;
    roles: { valor: string; nombre: string; descripcion: string }[];
    unidades: Opcion[];
    textoBoton: string;
    mostrarEstado?: boolean;
    bloquearEstado?: boolean;
};

const SIN_UNIDAD = 'sin-unidad';

export function FormularioUsuario({
    accion,
    usuario,
    roles,
    unidades,
    textoBoton,
    mostrarEstado = true,
    bloquearEstado = false,
}: Props) {
    return (
        <Form {...accion} className="max-w-2xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={usuario?.name}
                            required
                            autoComplete="name"
                            placeholder="Nombre completo"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={usuario?.email}
                            required
                            autoComplete="username"
                            placeholder="persona@usac.edu.gt"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="unidad_id">Unidad administrativa</Label>
                        <Select
                            name="unidad_id"
                            defaultValue={
                                usuario?.unidad_id
                                    ? String(usuario.unidad_id)
                                    : SIN_UNIDAD
                            }
                        >
                            <SelectTrigger id="unidad_id">
                                <SelectValue placeholder="Seleccione una unidad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={SIN_UNIDAD}>
                                    Sin unidad asignada
                                </SelectItem>
                                {unidades.map((unidad) => (
                                    <SelectItem
                                        key={unidad.valor}
                                        value={String(unidad.valor)}
                                    >
                                        {unidad.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.unidad_id} />
                    </div>

                    <fieldset className="grid gap-3">
                        <legend className="mb-1 text-sm font-medium">
                            Roles
                        </legend>

                        {roles.map((rol) => (
                            <div
                                key={rol.valor}
                                className="flex items-start gap-3"
                            >
                                <Checkbox
                                    id={`rol-${rol.valor}`}
                                    name="roles[]"
                                    value={rol.valor}
                                    defaultChecked={usuario?.roles.includes(
                                        rol.valor,
                                    )}
                                />
                                <div className="grid gap-0.5">
                                    <Label htmlFor={`rol-${rol.valor}`}>
                                        {rol.nombre}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {rol.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <InputError message={errors.roles} />
                    </fieldset>

                    {mostrarEstado && (
                        <div className="grid gap-2">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="activo"
                                    name="activo"
                                    defaultChecked={usuario?.activo ?? true}
                                    disabled={bloquearEstado}
                                />
                                <Label htmlFor="activo">
                                    Usuario activo (puede iniciar sesión)
                                </Label>
                            </div>
                            <InputError message={errors.activo} />
                        </div>
                    )}

                    <Button type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        {textoBoton}
                    </Button>
                </>
            )}
        </Form>
    );
}
