import { Form, Link } from '@inertiajs/react';
import { Fragment } from 'react';
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    Download,
    FileSpreadsheet,
    Upload,
} from 'lucide-react';

import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { RouteFormDefinition } from '@/wayfinder';

export type ColumnaCarga = {
    titulo: string;
    clave: string;
    requerida?: boolean;
};

export type RevisionCarga = {
    columnas: string[];
    filas: {
        numero: number;
        valores: string[];
        errores: string[];
    }[];
    resumen: { total: number; validas: number; conError: number };
    token: string | null;
};

type Props = {
    titulo: string;
    descripcion: string;
    columnas: ColumnaCarga[];
    instrucciones: string[];
    listas: Record<string, string[]>;
    plantilla: string;
    plantillaCsv: string;
    revision?: RevisionCarga | null;
    accionRevision: RouteFormDefinition<'post'>;
    accionConfirmar: RouteFormDefinition<'post'>;
    volver: { href: string; etiqueta: string };
};

function Contador({
    etiqueta,
    valor,
    tono,
}: {
    etiqueta: string;
    valor: number;
    tono?: 'bien' | 'mal';
}) {
    return (
        <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {etiqueta}
            </p>
            <p
                className={cn(
                    'text-2xl font-semibold tabular-nums',
                    tono === 'bien' && valor > 0 && 'text-digeu-green',
                    tono === 'mal' && valor > 0 && 'text-destructive',
                )}
            >
                {valor}
            </p>
        </div>
    );
}

/**
 * Carga masiva en tres pasos: descargar la plantilla, subirla para revisarla y
 * confirmar. La revisión muestra fila por fila qué entra y qué no, y no guarda
 * nada hasta que el usuario acepta.
 */
export function CargaMasiva({
    titulo,
    descripcion,
    columnas,
    instrucciones,
    listas,
    plantilla,
    plantillaCsv,
    revision,
    accionRevision,
    accionConfirmar,
    volver,
}: Props) {
    const catalogos = Object.entries(listas).filter(
        ([, valores]) => valores.length > 0,
    );

    return (
        <div className="space-y-6">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
                <Link href={volver.href}>
                    <ArrowLeft />
                    {volver.etiqueta}
                </Link>
            </Button>

            <header>
                <h1 className="text-2xl font-semibold">{titulo}</h1>
                <p className="text-sm text-muted-foreground">{descripcion}</p>
            </header>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                1
                            </span>
                            Descargue la plantilla
                        </CardTitle>
                        <CardDescription>
                            El archivo de Excel trae los encabezados y listas
                            desplegables con los valores permitidos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <a href={plantilla}>
                                    <FileSpreadsheet />
                                    Plantilla (Excel)
                                </a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href={plantillaCsv}>
                                    <Download />
                                    Plantilla (CSV)
                                </a>
                            </Button>
                        </div>

                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                            {instrucciones
                                .filter((linea) => linea !== '')
                                .slice(1)
                                .map((linea) => (
                                    <li key={linea} className="flex gap-2">
                                        <span aria-hidden="true">·</span>
                                        <span>{linea}</span>
                                    </li>
                                ))}
                        </ul>

                        {catalogos.length > 0 && (
                            <div className="space-y-2">
                                {catalogos.map(([nombre, valores]) => (
                                    <Collapsible key={nombre}>
                                        <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm">
                                            <span className="font-medium">
                                                {nombre}
                                            </span>
                                            <Badge variant="secondary">
                                                {valores.length}
                                            </Badge>
                                            <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-180" />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="px-3 py-2">
                                            <ul className="flex flex-wrap gap-1.5">
                                                {valores.map((valor) => (
                                                    <li key={valor}>
                                                        <Badge variant="outline">
                                                            {valor}
                                                        </Badge>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                2
                            </span>
                            Suba el archivo lleno
                        </CardTitle>
                        <CardDescription>
                            Se revisa y se le muestra el resultado antes de
                            guardar. Acepta .xlsx y .csv, hasta 5 MB.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...accionRevision}
                            options={{ preserveScroll: true }}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="archivo">Archivo</Label>
                                        <Input
                                            id="archivo"
                                            name="archivo"
                                            type="file"
                                            accept=".xlsx,.csv,text/csv"
                                            required
                                        />
                                        <InputError message={errors.archivo} />
                                    </div>

                                    <Button type="submit" disabled={processing}>
                                        {processing ? <Spinner /> : <Upload />}
                                        Revisar archivo
                                    </Button>

                                    <p className="text-xs text-muted-foreground">
                                        Columnas esperadas, en este orden:{' '}
                                        {columnas
                                            .map(
                                                (columna) =>
                                                    columna.titulo +
                                                    (columna.requerida
                                                        ? ' *'
                                                        : ''),
                                            )
                                            .join(' · ')}
                                    </p>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>

            {revision && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                3
                            </span>
                            Revise y confirme
                        </CardTitle>
                        <CardDescription>
                            Las filas con error se omiten; el resto se guarda al
                            confirmar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div className="flex gap-8">
                                <Contador
                                    etiqueta="Filas leídas"
                                    valor={revision.resumen.total}
                                />
                                <Contador
                                    etiqueta="Listas para cargar"
                                    valor={revision.resumen.validas}
                                    tono="bien"
                                />
                                <Contador
                                    etiqueta="Con error"
                                    valor={revision.resumen.conError}
                                    tono="mal"
                                />
                            </div>

                            {revision.token ? (
                                <Form
                                    {...accionConfirmar}
                                    options={{ preserveScroll: true }}
                                >
                                    {({ processing }) => (
                                        <>
                                            <input
                                                type="hidden"
                                                name="token"
                                                value={revision.token ?? ''}
                                            />
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <Spinner />
                                                ) : (
                                                    <CheckCircle2 />
                                                )}
                                                Cargar{' '}
                                                {revision.resumen.validas}{' '}
                                                {revision.resumen.validas === 1
                                                    ? 'registro'
                                                    : 'registros'}
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            ) : (
                                <p className="text-sm text-destructive">
                                    Ninguna fila está lista para cargarse.
                                    Corrija el archivo y vuelva a subirlo.
                                </p>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">
                                            Fila
                                        </TableHead>
                                        <TableHead className="w-28">
                                            Estado
                                        </TableHead>
                                        {revision.columnas.map((columna) => (
                                            <TableHead key={columna}>
                                                {columna}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {revision.filas.map((fila) => (
                                        <Fragment key={fila.numero}>
                                            <TableRow
                                                className={cn(
                                                    fila.errores.length > 0 &&
                                                        'bg-destructive/5',
                                                )}
                                            >
                                                <TableCell className="tabular-nums">
                                                    {fila.numero}
                                                </TableCell>
                                                <TableCell>
                                                    {fila.errores.length ===
                                                    0 ? (
                                                        <Badge variant="secondary">
                                                            Lista
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="destructive">
                                                            Con error
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                {fila.valores.map(
                                                    (valor, indice) => (
                                                        <TableCell
                                                            key={`${fila.numero}-${indice}`}
                                                            className="max-w-48 truncate"
                                                        >
                                                            {valor}
                                                        </TableCell>
                                                    ),
                                                )}
                                            </TableRow>
                                            {fila.errores.length > 0 && (
                                                <TableRow className="bg-destructive/5">
                                                    <TableCell />
                                                    <TableCell
                                                        colSpan={
                                                            revision.columnas
                                                                .length + 1
                                                        }
                                                    >
                                                        <ul className="space-y-1 text-xs text-destructive">
                                                            {fila.errores.map(
                                                                (error) => (
                                                                    <li
                                                                        key={
                                                                            error
                                                                        }
                                                                        className="flex items-center gap-1.5"
                                                                    >
                                                                        <AlertTriangle className="size-3.5 shrink-0" />
                                                                        {error}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
