import { Head, Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

import Heading from '@/components/heading';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { index, show } from '@/routes/catalogos';

type Catalogo = {
    clave: string;
    etiqueta: string;
    descripcion: string;
    total: number;
};

export default function CatalogosIndex({
    catalogos,
}: {
    catalogos: Catalogo[];
}) {
    return (
        <>
            <Head title="Catálogos" />

            <div className="space-y-6 px-4 py-6">
                <Heading
                    title="Catálogos"
                    description="Valores que alimentan los formularios del sistema"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {catalogos.map((catalogo) => (
                        <Link
                            key={catalogo.clave}
                            href={show(catalogo.clave)}
                            className="rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            <Card className="h-full transition-colors hover:border-primary/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between gap-2">
                                        {catalogo.etiqueta}
                                        <ChevronRight className="size-4 text-muted-foreground" />
                                    </CardTitle>
                                    <CardDescription>
                                        {catalogo.descripcion}
                                    </CardDescription>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {catalogo.total}{' '}
                                        {catalogo.total === 1
                                            ? 'registro'
                                            : 'registros'}
                                    </p>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

CatalogosIndex.layout = {
    breadcrumbs: [{ title: 'Catálogos', href: index() }],
};
