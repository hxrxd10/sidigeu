import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { r, rt as i } from './app-Bu9EFUG6.js';
import { n as a, t as o } from './formulario-actividad-CgSNZeUs.js';
var s = e(),
    c = t();
function l(e) {
    let t = (0, s.c)(16),
        { actividad: i, opciones: l } = e,
        u = `Editar ${i.nombre}`,
        d;
    t[0] === u
        ? (d = t[1])
        : ((d = (0, c.jsx)(n, { title: u })), (t[0] = u), (t[1] = d));
    let f;
    t[2] === i.nombre
        ? (f = t[3])
        : ((f = (0, c.jsx)(r, {
              title: i.nombre,
              description: `Corrija los datos de programación y vuelva a enviarla a revisión`,
          })),
          (t[2] = i.nombre),
          (t[3] = f));
    let p;
    t[4] === i.id
        ? (p = t[5])
        : ((p = a.update.form(i.id)), (t[4] = i.id), (t[5] = p));
    let m;
    t[6] !== i || t[7] !== l || t[8] !== p
        ? ((m = (0, c.jsx)(o, {
              accion: p,
              actividad: i,
              opciones: l,
              textoBoton: `Guardar cambios`,
          })),
          (t[6] = i),
          (t[7] = l),
          (t[8] = p),
          (t[9] = m))
        : (m = t[9]);
    let h;
    t[10] !== f || t[11] !== m
        ? ((h = (0, c.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [f, m],
          })),
          (t[10] = f),
          (t[11] = m),
          (t[12] = h))
        : (h = t[12]);
    let g;
    return (
        t[13] !== d || t[14] !== h
            ? ((g = (0, c.jsxs)(c.Fragment, { children: [d, h] })),
              (t[13] = d),
              (t[14] = h),
              (t[15] = g))
            : (g = t[15]),
        g
    );
}
l.layout = { breadcrumbs: [{ title: `Actividades`, href: i() }] };
export { l as default };
