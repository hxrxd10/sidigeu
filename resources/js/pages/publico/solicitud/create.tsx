import { Form, Head } from '@inertiajs/react';

import SolicitudEspacioPublicaController from '@/actions/App/Http/Controllers/Publico/SolicitudEspacioPublicaController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

type Props = {
    espacios: { valor: number; nombre: string }[];
    espacioSeleccionado: number | null;
    usuario: { name: string; email: string } | null;
};

export default function SolicitarEspacio({
    espacios,
    espacioSeleccionado,
    usuario,
}: Props) {
    return (
        <>
            <Head title="Solicitar un espacio" />

            <div className="mx-auto max-w-3xl space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold">
                        Solicitar un espacio
                    </h1>
                    <p className="text-muted-foreground">
                        Indique el espacio, la fecha y el horario que necesita.
                        La solicitud queda pendiente de confirmación y la
                        respuesta le llegará por correo.
                    </p>
                </header>

                <Card>
                    <CardContent>
                        <Form
                            {...SolicitudEspacioPublicaController.store.form()}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="espacio_id">
                                            Espacio
                                        </Label>
                                        <Select
                                            name="espacio_id"
                                            defaultValue={
                                                espacioSeleccionado
                                                    ? String(
                                                          espacioSeleccionado,
                                                      )
                                                    : undefined
                                            }
                                        >
                                            <SelectTrigger id="espacio_id">
                                                <SelectValue placeholder="Seleccione un espacio" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {espacios.map((espacio) => (
                                                    <SelectItem
                                                        key={espacio.valor}
                                                        value={String(
                                                            espacio.valor,
                                                        )}
                                                    >
                                                        {espacio.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.espacio_id}
                                        />
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-3">
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
                                            <Label htmlFor="hora_inicio">
                                                Hora de inicio
                                            </Label>
                                            <Input
                                                id="hora_inicio"
                                                name="hora_inicio"
                                                type="time"
                                                required
                                            />
                                            <InputError
                                                message={errors.hora_inicio}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="hora_fin">
                                                Hora de finalización
                                            </Label>
                                            <Input
                                                id="hora_fin"
                                                name="hora_fin"
                                                type="time"
                                                required
                                            />
                                            <InputError
                                                message={errors.hora_fin}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="solicitante_nombre">
                                                Nombre del solicitante
                                            </Label>
                                            <Input
                                                id="solicitante_nombre"
                                                name="solicitante_nombre"
                                                required
                                                defaultValue={
                                                    usuario?.name ?? ''
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.solicitante_nombre
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="institucion">
                                                Institución (opcional)
                                            </Label>
                                            <Input
                                                id="institucion"
                                                name="institucion"
                                            />
                                            <InputError
                                                message={errors.institucion}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="correo">
                                                Correo electrónico
                                            </Label>
                                            <Input
                                                id="correo"
                                                name="correo"
                                                type="email"
                                                required
                                                defaultValue={
                                                    usuario?.email ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.correo}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="telefono">
                                                Teléfono (opcional)
                                            </Label>
                                            <Input
                                                id="telefono"
                                                name="telefono"
                                            />
                                            <InputError
                                                message={errors.telefono}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="asistentes">
                                                Asistentes estimados (opcional)
                                            </Label>
                                            <Input
                                                id="asistentes"
                                                name="asistentes"
                                                type="number"
                                                min={1}
                                            />
                                            <InputError
                                                message={errors.asistentes}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="proposito">
                                            Propósito de la actividad
                                        </Label>
                                        <Textarea
                                            id="proposito"
                                            name="proposito"
                                            required
                                            rows={4}
                                        />
                                        <InputError
                                            message={errors.proposito}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="requerimientos">
                                            Requerimientos de equipo (opcional)
                                        </Label>
                                        <Textarea
                                            id="requerimientos"
                                            name="requerimientos"
                                            rows={3}
                                            placeholder="Sonido, proyector, sillas adicionales..."
                                        />
                                        <InputError
                                            message={errors.requerimientos}
                                        />
                                    </div>

                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner />}
                                        Enviar solicitud
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
