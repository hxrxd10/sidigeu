import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';

import { BotonImprimir } from '@/components/boton-imprimir';
import { MembreteInstitucional } from '@/components/membrete-institucional';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { index, reportes } from '@/routes/recurso-humano';
import { exportar } from '@/routes/recurso-humano/reportes';

type Grupo = { etiqueta: string; total: number };

type Props = {
    resumen: {
        total: number;
        activos: number;
        inactivos: number;
        promedio_permanencia: { dias: number; texto: string };
    };
    porTipo: Grupo[];
    porDisciplina: Grupo[];
    porNacionalidad: Grupo[];
    porRangoEdad: Grupo[];
};

function Indicador({ etiqueta, valor }: { etiqueta: string; valor: string }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {etiqueta}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-semibold">{valor}</p>
            </CardContent>
        </Card>
    );
}

function Distribucion({ titulo, grupos }: { titulo: string; grupos: Grupo[] }) {
    const mayor = Math.max(1, ...grupos.map((grupo) => grupo.total));

    return (
        <Card>
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {grupos.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Sin registros.
                    </p>
                )}

                {grupos.map((grupo) => (
                    <div key={grupo.etiqueta} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span>{grupo.etiqueta}</span>
                            <span className="text-muted-foreground tabular-nums">
                                {grupo.total}
                            </span>
                        </div>
                        <div
                            className="h-2 overflow-hidden rounded-full bg-muted"
                            role="presentation"
                        >
                            <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                    width: `${(grupo.total / mayor) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default function ReportesRecursoHumano({
    resumen,
    porTipo,
    porDisciplina,
    porNacionalidad,
    porRangoEdad,
}: Props) {
    return (
        <>
            <Head title="Reportes de recurso humano" />

            <div className="space-y-6 px-4 py-6">
                <MembreteInstitucional titulo="Padrón de artistas y deportistas" />

                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 print:hidden"
                >
                    <Link href={index()}>
                        <ArrowLeft />
                        Volver al padrón
                    </Link>
                </Button>

                <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
                    <Heading
                        title="Reportes de recurso humano"
                        description="Estadísticas del padrón de artistas y deportistas"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <a href={exportar().url}>
                                <Download />
                                Exportar padrón (CSV)
                            </a>
                        </Button>
                        <BotonImprimir />
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Indicador
                        etiqueta="Total registrado"
                        valor={String(resumen.total)}
                    />
                    <Indicador
                        etiqueta="Activos"
                        valor={String(resumen.activos)}
                    />
                    <Indicador
                        etiqueta="Inactivos"
                        valor={String(resumen.inactivos)}
                    />
                    <Indicador
                        etiqueta="Permanencia promedio"
                        valor={resumen.promedio_permanencia.texto}
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Distribucion titulo="Por tipo" grupos={porTipo} />
                    <Distribucion
                        titulo="Por rango de edad"
                        grupos={porRangoEdad}
                    />
                    <Distribucion
                        titulo="Por disciplina"
                        grupos={porDisciplina}
                    />
                    <Distribucion
                        titulo="Por nacionalidad"
                        grupos={porNacionalidad}
                    />
                </div>
            </div>
        </>
    );
}

ReportesRecursoHumano.layout = {
    breadcrumbs: [
        { title: 'Recurso humano', href: index() },
        { title: 'Reportes', href: reportes() },
    ],
};
