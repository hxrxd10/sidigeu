import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { B as r, r as i } from './app-Bu9EFUG6.js';
import { t as a } from './EspacioController-f5zlN1ju.js';
import { t as o } from './formulario-espacio-BeWj1QRy.js';
var s = e(),
    c = t();
function l(e) {
    let t = (0, s.c)(17),
        { espacio: r, opciones: l } = e,
        u = `Editar ${r.nombre}`,
        d;
    t[0] === u
        ? (d = t[1])
        : ((d = (0, c.jsx)(n, { title: u })), (t[0] = u), (t[1] = d));
    let f = `${r.sede} · ${r.tipo}`,
        p;
    t[2] !== r.nombre || t[3] !== f
        ? ((p = (0, c.jsx)(i, { title: r.nombre, description: f })),
          (t[2] = r.nombre),
          (t[3] = f),
          (t[4] = p))
        : (p = t[4]);
    let m;
    t[5] === r.id
        ? (m = t[6])
        : ((m = a.update.form(r.id)), (t[5] = r.id), (t[6] = m));
    let h;
    t[7] !== r || t[8] !== l || t[9] !== m
        ? ((h = (0, c.jsx)(o, {
              accion: m,
              espacio: r,
              opciones: l,
              textoBoton: `Guardar cambios`,
          })),
          (t[7] = r),
          (t[8] = l),
          (t[9] = m),
          (t[10] = h))
        : (h = t[10]);
    let g;
    t[11] !== p || t[12] !== h
        ? ((g = (0, c.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [p, h],
          })),
          (t[11] = p),
          (t[12] = h),
          (t[13] = g))
        : (g = t[13]);
    let _;
    return (
        t[14] !== d || t[15] !== g
            ? ((_ = (0, c.jsxs)(c.Fragment, { children: [d, g] })),
              (t[14] = d),
              (t[15] = g),
              (t[16] = _))
            : (_ = t[16]),
        _
    );
}
l.layout = { breadcrumbs: [{ title: `Espacios`, href: r() }] };
export { l as default };
