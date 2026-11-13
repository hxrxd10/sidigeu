import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    CalendarDays,
    GraduationCap,
    HeartHandshake,
    Palette,
    Trophy,
    Users,
    type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { agenda } from '@/routes/publico';
import { index as catalogoEspacios } from '@/routes/publico/espacios';
import { create as solicitarEspacio } from '@/routes/publico/solicitud';

type Area = {
    nombre: string;
    descripcion: string;
    icono: LucideIcon;
    color: string;
    fondo: string;
};

const AREAS: Area[] = [
    {
        nombre: 'Formación y actualización',
        descripcion:
            'Cursos, diplomados y talleres para seguir aprendiendo a lo largo de la vida.',
        icono: GraduationCap,
        color: 'text-chart-1',
        fondo: 'bg-chart-1',
    },
    {
        nombre: 'Cultura',
        descripcion:
            'Música, teatro, artes visuales y literatura que salen de la universidad hacia la gente.',
        icono: Palette,
        color: 'text-chart-2',
        fondo: 'bg-chart-2',
    },
    {
        nombre: 'Deporte',
        descripcion:
            'Encuentros, torneos y recreación para la comunidad universitaria y el público.',
        icono: Trophy,
        color: 'text-chart-3',
        fondo: 'bg-chart-3',
    },
    {
        nombre: 'Vinculación con la sociedad',
        descripcion:
            'Proyectos junto a comunidades, instituciones y organizaciones del país.',
        icono: HeartHandshake,
        color: 'text-chart-4',
        fondo: 'bg-chart-4',
    },
    {
        nombre: 'Interdisciplinariedad',
        descripcion:
            'Trabajo conjunto entre unidades académicas alrededor de problemas comunes.',
        icono: Users,
        color: 'text-chart-5',
        fondo: 'bg-chart-5',
    },
];

/** Aparición escalonada: cada bloque entra un instante después del anterior. */
function retraso(indice: number): { animationDelay: string } {
    return { animationDelay: `${indice * 55}ms` };
}

export default function Welcome() {
    return (
        <>
            <Head title="Dirección General de Extensión Universitaria" />

            {/* Portada */}
            <section className="relative overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] resplandor-portada"
                />

                <div className="relative mx-auto w-full max-w-6xl px-4 pt-14 pb-16 text-center md:pt-24 md:pb-24">
                    <p
                        className="asomar text-xs font-semibold tracking-[0.18em] text-digeu-azure uppercase dark:text-digeu-teal"
                        style={retraso(0)}
                    >
                        Universidad de San Carlos de Guatemala
                    </p>

                    <h1
                        className="mx-auto mt-5 max-w-4xl asomar titular-display text-digeu-navy dark:text-white"
                        style={retraso(1)}
                    >
                        La extensión universitaria, al alcance de todos
                    </h1>

                    <p
                        className="mx-auto mt-6 max-w-2xl asomar entrada-lectura text-muted-foreground"
                        style={retraso(2)}
                    >
                        La DIGEU promueve el desarrollo sobre la base de una
                        verdadera proyección popular: acerca a estudiantes,
                        docentes y personal administrativo a las manifestaciones
                        científicas, artísticas, culturales y deportivas del
                        país.
                    </p>

                    <div
                        className="mt-9 flex asomar flex-wrap justify-center gap-3"
                        style={retraso(3)}
                    >
                        <Button
                            size="lg"
                            asChild
                            className="transition-transform duration-150 ease-out active:scale-[0.97]"
                        >
                            <Link href={agenda()}>
                                <CalendarDays />
                                Ver la Agenda Cultural
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="transition-transform duration-150 ease-out active:scale-[0.97]"
                        >
                            <Link href={catalogoEspacios()}>
                                <Building2 />
                                Conocer los espacios
                            </Link>
                        </Button>
                    </div>

                    {/* Las cinco áreas, resumidas en una banda de color. */}
                    <div
                        className="mx-auto mt-14 flex h-1.5 max-w-xl asomar overflow-hidden rounded-full"
                        style={retraso(4)}
                        aria-hidden
                    >
                        {AREAS.map((area) => (
                            <span
                                key={area.nombre}
                                className={cn('flex-1', area.fondo)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Áreas */}
            <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
                <div className="max-w-2xl">
                    <h2 className="titular-seccion text-foreground">
                        Cinco áreas, un mismo propósito
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        El trabajo de la Dirección se organiza en cinco áreas
                        que atienden a la comunidad universitaria y a la
                        población en general.
                    </p>
                </div>

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {AREAS.map((area) => (
                        <li
                            key={area.nombre}
                            className="group rounded-2xl border bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)]"
                        >
                            <span
                                className={cn(
                                    'flex size-11 items-center justify-center rounded-xl bg-muted',
                                    area.color,
                                )}
                            >
                                <area.icono className="size-5" />
                            </span>
                            <h3 className="mt-5 font-semibold text-balance">
                                {area.nombre}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {area.descripcion}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Lo que puede hacer el público */}
            <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:pb-24">
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href={agenda()}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] active:scale-[0.995] md:p-10"
                    >
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-chart-2/10 blur-2xl"
                        />
                        <div className="relative">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2">
                                <CalendarDays className="size-5" />
                            </span>
                            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.015em]">
                                Agenda Cultural
                            </h2>
                            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                                Conciertos, exposiciones, talleres y encuentros
                                deportivos abiertos a la comunidad universitaria
                                y al público.
                            </p>
                        </div>
                        <span className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-digeu-azure dark:text-digeu-teal">
                            Ver la agenda del mes
                            <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                        </span>
                    </Link>

                    <Link
                        href={catalogoEspacios()}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] active:scale-[0.995] md:p-10"
                    >
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-chart-3/10 blur-2xl"
                        />
                        <div className="relative">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-chart-3/10 text-chart-3">
                                <Building2 className="size-5" />
                            </span>
                            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.015em]">
                                Espacios de la DIGEU
                            </h2>
                            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                                Salones, auditorios, patios y canchas
                                disponibles para actividades académicas,
                                culturales y deportivas.
                            </p>
                        </div>
                        <span className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-digeu-azure dark:text-digeu-teal">
                            Conocer el catálogo
                            <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                        </span>
                    </Link>
                </div>
            </section>

            {/* Cierre institucional */}
            <section className="bg-digeu-navy text-white">
                <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-20">
                    <div>
                        <h2 className="max-w-md titular-seccion">
                            ¿Necesita un espacio para su actividad?
                        </h2>
                        <p className="mt-4 max-w-md leading-relaxed text-white/70">
                            Las unidades académicas, las organizaciones
                            estudiantiles y las instituciones pueden solicitar
                            el uso de los espacios de la Dirección en línea.
                        </p>
                        <Button
                            size="lg"
                            variant="secondary"
                            asChild
                            className="mt-7 transition-transform duration-150 ease-out active:scale-[0.97]"
                        >
                            <Link href={solicitarEspacio()}>
                                Solicitar un espacio
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
                        <p className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
                            Personal de la DIGEU
                        </p>
                        <h3 className="mt-4 text-xl font-semibold">
                            SIGEU, el sistema de gestión de la Dirección
                        </h3>
                        <p className="mt-3 leading-relaxed text-white/70">
                            Registro de actividades, proyectos, recurso humano y
                            espacios, con la información que alimenta la memoria
                            de labores.
                        </p>
                        <Link
                            href={login()}
                            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98]"
                        >
                            Ingresar al sistema
                            <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

Welcome.layout = {
    anchoCompleto: true,
};
