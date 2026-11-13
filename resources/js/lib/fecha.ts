/**
 * El servidor envía las fechas en formato ISO (`2026-11-17`), que es el que
 * entienden los campos de formulario y el que permite ordenarlas y compararlas.
 * Estas funciones las convierten al formato en que se leen en Guatemala,
 * `dd-mm-yyyy`, justo en el momento de mostrarlas.
 */

const ISO = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/;

/**
 * `2026-11-17` → `17-11-2026`. Un valor vacío o con otro formato se devuelve
 * tal cual, para no alterar lo que ya viene listo para leerse.
 */
export function fechaLegible(valor: string | null | undefined): string {
    if (!valor) {
        return '';
    }

    const partes = ISO.exec(valor);

    return partes ? `${partes[3]}-${partes[2]}-${partes[1]}` : valor;
}

/**
 * `2026-11-17 16:30:00` → `17-11-2026 16:30`. Sin hora se comporta igual que
 * `fechaLegible`.
 */
export function fechaHoraLegible(valor: string | null | undefined): string {
    if (!valor) {
        return '';
    }

    const partes = ISO.exec(valor);

    if (!partes) {
        return valor;
    }

    const fecha = `${partes[3]}-${partes[2]}-${partes[1]}`;

    return partes[4] ? `${fecha} ${partes[4]}:${partes[5]}` : fecha;
}
