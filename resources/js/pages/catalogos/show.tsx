import { Form, Head, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import CatalogoController from '@/actions/App/Http/Controllers/Catalogos/CatalogoController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/catalogos';

type Campo = {
    nombre: string;
    etiqueta: string;
    tipo: 'texto' | 'texto_largo' | 'seleccion' | 'booleano';
    requerido: boolean;
};

type Opcion = { valor: string | number; nombre: string };

type ValorCampo = string | number | boolean | null;

type Registro = Record<string, ValorCampo> & { id: number };

type Props = {
    catalogo: {
        clave: string;
        etiqueta: string;
        etiquetaSingular: string;
        descripcion: string;
        campos: Campo[];
        opciones: Record<string, Opcion[]>;
    };
    registros: Registro[];
    puedeAdministrar: boolean;
};

const SIN_VALOR = 'sin-valor';

export default function CatalogoShow({
    catalogo,
    registros,
    puedeAdministrar,
}: Props) {
    const [enEdicion, setEnEdicion] = useState<Registro | null>(null);
    const [abierto, setAbierto] = useState(false);

    const campos = catalogo.campos.filter((campo) => campo.tipo !== 'booleano');

    const abrir = (registro: Registro | null) => {
        setEnEdicion(registro);
        setAbierto(true);
    };

    const textoCelda = (registro: Registro, campo: Campo) => {
        const valor = registro[campo.nombre];

        if (campo.tipo === 'seleccion') {
            const opcion = catalogo.opciones[campo.nombre]?.find(
                (opcion) => String(opcion.valor) === String(valor),
            );

            return opcion?.nombre ?? '—';
        }

        return valor === null || valor === '' ? '—' : String(valor);
    };

    return (
        <>
            <Head title={catalogo.etiqueta} />

            <div className="space-y-6 px-4 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title={catalogo.etiqueta}
                        description={catalogo.descripcion}
                    />

                    {puedeAdministrar && (
                        <Button onClick={() => abrir(null)}>
                            <Plus />
                            Agregar
                        </Button>
                    )}
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {campos.map((campo) => (
                                    <TableHead key={campo.nombre}>
                                        {campo.etiqueta}
                                    </TableHead>
                                ))}
                                <TableHead>Estado</TableHead>
                                {puedeAdministrar && (
                                    <TableHead className="text-right">
                                        Acciones
                                    </TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registros.map((registro) => (
                                <TableRow key={registro.id}>
                                    {campos.map((campo) => (
                                        <TableCell key={campo.nombre}>
                                            {textoCelda(registro, campo)}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Badge
                                            variant={
                                                registro.activo
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {registro.activo
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                    {puedeAdministrar && (
                                        <TableCell className="text-right whitespace-nowrap">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => abrir(registro)}
                                            >
                                                <Pencil />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    router.delete(
                                                        CatalogoController.destroy.url(
                                                            {
                                                                catalogo:
                                                                    catalogo.clave,
                                                                registro:
                                                                    registro.id,
                                                            },
                                                        ),
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <Trash2 />
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}

                            {registros.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={campos.length + 2}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Este catálogo todavía no tiene valores.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={abierto} onOpenChange={setAbierto}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {enEdicion
                                ? `Editar ${catalogo.etiquetaSingular.toLowerCase()}`
                                : `Agregar ${catalogo.etiquetaSingular.toLowerCase()}`}
                        </DialogTitle>
                        <DialogDescription>
                            {catalogo.descripcion}
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        key={enEdicion?.id ?? 'nuevo'}
                        {...(enEdicion
                            ? CatalogoController.update.form({
                                  catalogo: catalogo.clave,
                                  registro: enEdicion.id,
                              })
                            : CatalogoController.store.form(catalogo.clave))}
                        options={{ preserveScroll: true }}
                        onSuccess={() => setAbierto(false)}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                {catalogo.campos.map((campo) => (
                                    <div
                                        key={campo.nombre}
                                        className="grid gap-2"
                                    >
                                        {campo.tipo === 'booleano' ? (
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id={campo.nombre}
                                                    name={campo.nombre}
                                                    defaultChecked={
                                                        enEdicion
                                                            ? Boolean(
                                                                  enEdicion[
                                                                      campo
                                                                          .nombre
                                                                  ],
                                                              )
                                                            : true
                                                    }
                                                />
                                                <Label htmlFor={campo.nombre}>
                                                    {campo.etiqueta}
                                                </Label>
                                            </div>
                                        ) : (
                                            <>
                                                <Label htmlFor={campo.nombre}>
                                                    {campo.etiqueta}
                                                </Label>

                                                {campo.tipo === 'texto' && (
                                                    <Input
                                                        id={campo.nombre}
                                                        name={campo.nombre}
                                                        required={
                                                            campo.requerido
                                                        }
                                                        defaultValue={
                                                            (enEdicion?.[
                                                                campo.nombre
                                                            ] as string) ?? ''
                                                        }
                                                    />
                                                )}

                                                {campo.tipo ===
                                                    'texto_largo' && (
                                                    <Textarea
                                                        id={campo.nombre}
                                                        name={campo.nombre}
                                                        required={
                                                            campo.requerido
                                                        }
                                                        defaultValue={
                                                            (enEdicion?.[
                                                                campo.nombre
                                                            ] as string) ?? ''
                                                        }
                                                    />
                                                )}

                                                {campo.tipo === 'seleccion' && (
                                                    <Select
                                                        name={campo.nombre}
                                                        defaultValue={
                                                            enEdicion?.[
                                                                campo.nombre
                                                            ]
                                                                ? String(
                                                                      enEdicion[
                                                                          campo
                                                                              .nombre
                                                                      ],
                                                                  )
                                                                : campo.requerido
                                                                  ? undefined
                                                                  : SIN_VALOR
                                                        }
                                                    >
                                                        <SelectTrigger
                                                            id={campo.nombre}
                                                        >
                                                            <SelectValue placeholder="Seleccione una opción" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {!campo.requerido && (
                                                                <SelectItem
                                                                    value={
                                                                        SIN_VALOR
                                                                    }
                                                                >
                                                                    Sin asignar
                                                                </SelectItem>
                                                            )}
                                                            {(
                                                                catalogo
                                                                    .opciones[
                                                                    campo.nombre
                                                                ] ?? []
                                                            ).map((opcion) => (
                                                                <SelectItem
                                                                    key={
                                                                        opcion.valor
                                                                    }
                                                                    value={String(
                                                                        opcion.valor,
                                                                    )}
                                                                >
                                                                    {
                                                                        opcion.nombre
                                                                    }
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </>
                                        )}

                                        <InputError
                                            message={errors[campo.nombre]}
                                        />
                                    </div>
                                ))}

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setAbierto(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner />}
                                        Guardar
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

CatalogoShow.layout = {
    breadcrumbs: [{ title: 'Catálogos', href: index() }],
};
