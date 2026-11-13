import { Form, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

import EspacioController from '@/actions/App/Http/Controllers/Espacios/EspacioController';
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
import type { RouteFormDefinition } from '@/wayfinder';
import type { EspacioFicha, OpcionesEspacios } from '@/pages/espacios/tipos';

type Props = {
    accion: RouteFormDefinition<'post'>;
    espacio?: EspacioFicha;
    opciones: OpcionesEspacios;
    textoBoton: string;
};

export function FormularioEspacio({
    accion,
    espacio,
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
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="sede_id">Sede</Label>
                            <Select
                                name="sede_id"
                                defaultValue={
                                    espacio
                                        ? String(espacio.sede_id)
                                        : undefined
                                }
                            >
                                <SelectTrigger id="sede_id">
                                    <SelectValue placeholder="Seleccione una sede" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <InputError message={errors.sede_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tipo_espacio_id">
                                Tipo de espacio
                            </Label>
                            <Select
                                name="tipo_espacio_id"
                                defaultValue={
                                    espacio
                                        ? String(espacio.tipo_espacio_id)
                                        : undefined
                                }
                            >
                                <SelectTrigger id="tipo_espacio_id">
                                    <SelectValue placeholder="Seleccione un tipo" />
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
                            <InputError message={errors.tipo_espacio_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                name="nombre"
                                required
                                defaultValue={espacio?.nombre}
                            />
                            <InputError message={errors.nombre} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ubicacion">
                                Ubicación (opcional)
                            </Label>
                            <Input
                                id="ubicacion"
                                name="ubicacion"
                                defaultValue={espacio?.ubicacion ?? ''}
                            />
                            <InputError message={errors.ubicacion} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="capacidad">
                                Capacidad (personas)
                            </Label>
                            <Input
                                id="capacidad"
                                name="capacidad"
                                type="number"
                                min={1}
                                defaultValue={espacio?.capacidad ?? ''}
                            />
                            <InputError message={errors.capacidad} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Select
                                name="estado"
                                defaultValue={espacio?.estado ?? 'activo'}
                            >
                                <SelectTrigger id="estado">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {opciones.estados.map((estado) => (
                                        <SelectItem
                                            key={estado.valor}
                                            value={estado.valor}
                                        >
                                            {estado.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.estado} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="caracteristicas">
                            Características (opcional)
                        </Label>
                        <Textarea
                            id="caracteristicas"
                            name="caracteristicas"
                            rows={3}
                            defaultValue={espacio?.caracteristicas ?? ''}
                        />
                        <InputError message={errors.caracteristicas} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="condiciones_uso">
                            Condiciones de uso (opcional)
                        </Label>
                        <Textarea
                            id="condiciones_uso"
                            name="condiciones_uso"
                            rows={3}
                            defaultValue={espacio?.condiciones_uso ?? ''}
                        />
                        <InputError message={errors.condiciones_uso} />
                    </div>

                    <fieldset className="grid gap-3">
                        <legend className="mb-1 text-sm font-medium">
                            Equipamiento
                        </legend>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {opciones.equipamientos.map((equipo) => {
                                const asignado = espacio?.equipamientos.find(
                                    (actual) => actual.id === equipo.valor,
                                );

                                return (
                                    <div
                                        key={equipo.valor}
                                        className="flex items-center gap-3"
                                    >
                                        <Checkbox
                                            id={`equipo-${equipo.valor}`}
                                            name="equipamientos[]"
                                            value={equipo.valor}
                                            defaultChecked={Boolean(asignado)}
                                        />
                                        <Label
                                            htmlFor={`equipo-${equipo.valor}`}
                                            className="flex-1"
                                        >
                                            {equipo.nombre}
                                        </Label>
                                        <Input
                                            name={`cantidades[${equipo.valor}]`}
                                            type="number"
                                            min={1}
                                            className="w-20"
                                            aria-label={`Cantidad de ${equipo.nombre}`}
                                            defaultValue={
                                                asignado?.cantidad ?? 1
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <InputError message={errors.equipamientos} />
                    </fieldset>

                    <div className="grid gap-2">
                        <Label htmlFor="fotografias">Fotografías</Label>
                        <Input
                            id="fotografias"
                            name="fotografias[]"
                            type="file"
                            accept="image/jpeg,image/png"
                            multiple
                        />
                        <p className="text-xs text-muted-foreground">
                            Hasta 6 imágenes JPG o PNG de 4 MB cada una.
                        </p>
                        <InputError message={errors.fotografias} />
                    </div>

                    {espacio && espacio.fotografias.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-3">
                            {espacio.fotografias.map((foto) => (
                                <div key={foto.id} className="relative">
                                    <img
                                        src={foto.url}
                                        alt={espacio.nombre}
                                        className="h-32 w-full rounded-md object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() =>
                                            router.delete(
                                                EspacioController.eliminarFotografia.url(
                                                    {
                                                        espacio: espacio.id,
                                                        fotografia: foto.id,
                                                    },
                                                ),
                                                { preserveScroll: true },
                                            )
                                        }
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="visible_publico"
                            name="visible_publico"
                            defaultChecked={espacio?.visible_publico ?? true}
                        />
                        <Label htmlFor="visible_publico">
                            Mostrar en el catálogo público
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
