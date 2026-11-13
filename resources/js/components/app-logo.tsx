import {
    SelloUsac,
    MarcaInstitucional,
} from '@/components/marca-institucional';

export default function AppLogo() {
    return (
        <>
            <MarcaInstitucional className="h-10 text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
            <SelloUsac className="hidden h-7 text-sidebar-foreground group-data-[collapsible=icon]:block" />
        </>
    );
}
