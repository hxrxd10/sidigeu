import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { q as r, r as i } from './app-Bu9EFUG6.js';
import { n as a, t as o } from './formulario-proyecto-CPXSizZH.js';
var s = e(),
    c = t();
function l(e) {
    let t = (0, s.c)(16),
        { proyecto: r, opciones: l } = e,
        u = `Editar ${r.nombre}`,
        d;
    t[0] === u
        ? (d = t[1])
        : ((d = (0, c.jsx)(n, { title: u })), (t[0] = u), (t[1] = d));
    let f;
    t[2] === r.nombre
        ? (f = t[3])
        : ((f = (0, c.jsx)(i, {
              title: r.nombre,
              description: `Datos generales y clasificación del proyecto`,
          })),
          (t[2] = r.nombre),
          (t[3] = f));
    let p;
    t[4] === r.id
        ? (p = t[5])
        : ((p = a.update.form(r.id)), (t[4] = r.id), (t[5] = p));
    let m;
    t[6] !== l || t[7] !== r || t[8] !== p
        ? ((m = (0, c.jsx)(o, {
              accion: p,
              proyecto: r,
              opciones: l,
              textoBoton: `Guardar cambios`,
          })),
          (t[6] = l),
          (t[7] = r),
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
l.layout = { breadcrumbs: [{ title: `Proyectos`, href: r() }] };
export { l as default };
