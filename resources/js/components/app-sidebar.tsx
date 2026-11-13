import { Link } from '@inertiajs/react';
import {
    Building2,
    CalendarCheck,
    CalendarDays,
    Bell,
    History,
    Inbox,
    LayoutGrid,
    FolderKanban,
    ListTree,
    Sparkles,
    Users,
    UsersRound,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useRoles } from '@/hooks/use-roles';
import { index as actividades } from '@/routes/actividades';
import { index as bitacora } from '@/routes/bitacora';
import { index as calendario } from '@/routes/calendario';
import { index as proyectos } from '@/routes/proyectos';
import { index as espacios } from '@/routes/espacios';
import { index as notificaciones } from '@/routes/notificaciones';
import { agenda } from '@/routes/publico';
import { index as solicitudes } from '@/routes/solicitudes';
import { dashboard } from '@/routes';
import { index as catalogos } from '@/routes/catalogos';
import { index as recursoHumano } from '@/routes/recurso-humano';
import { index as usuarios } from '@/routes/usuarios';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { esAdministrador, tieneRol } = useRoles();
    const atiendeSolicitudes = tieneRol('administrador-espacios', 'direccion');

    const mainNavItems: NavItem[] = [
        {
            title: 'Panel',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Actividades',
            href: actividades(),
            icon: CalendarCheck,
        },
        {
            title: 'Proyectos',
            href: proyectos(),
            icon: FolderKanban,
        },
        {
            title: 'Agenda Cultural',
            href: agenda(),
            icon: Sparkles,
        },
        {
            title: 'Recurso humano',
            href: recursoHumano(),
            icon: UsersRound,
        },
        {
            title: 'Espacios',
            href: espacios(),
            icon: Building2,
        },
        {
            title: 'Calendario',
            href: calendario(),
            icon: CalendarDays,
        },
        ...(atiendeSolicitudes
            ? [
                  {
                      title: 'Solicitudes',
                      href: solicitudes(),
                      icon: Inbox,
                  },
              ]
            : []),
        {
            title: 'Catálogos',
            href: catalogos(),
            icon: ListTree,
        },
        {
            title: 'Notificaciones',
            href: notificaciones(),
            icon: Bell,
        },
        ...(esAdministrador
            ? [
                  {
                      title: 'Usuarios',
                      href: usuarios(),
                      icon: Users,
                  },
                  {
                      title: 'Bitácora',
                      href: bitacora(),
                      icon: History,
                  },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
