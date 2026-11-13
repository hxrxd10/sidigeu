import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { g as r, r as i } from './app-Bu9EFUG6.js';
import { n as a, t as o } from './UserController-D7hflS5n.js';
var s = e(),
    c = t();
function l(e) {
    let t = (0, s.c)(19),
        { usuario: r, roles: l, unidades: u, esSuPropioUsuario: d } = e,
        f = `Editar ${r.name}`,
        p;
    t[0] === f
        ? (p = t[1])
        : ((p = (0, c.jsx)(n, { title: f })), (t[0] = f), (t[1] = p));
    let m = d
            ? `Este es su propio usuario: no puede desactivarlo ni quitarse el rol de Administrador`
            : `Actualice los datos, la unidad y los roles del usuario`,
        h;
    t[2] !== m || t[3] !== r.name
        ? ((h = (0, c.jsx)(i, { title: r.name, description: m })),
          (t[2] = m),
          (t[3] = r.name),
          (t[4] = h))
        : (h = t[4]);
    let g;
    t[5] === r.id
        ? (g = t[6])
        : ((g = o.update.form(r.id)), (t[5] = r.id), (t[6] = g));
    let _;
    t[7] !== d || t[8] !== l || t[9] !== g || t[10] !== u || t[11] !== r
        ? ((_ = (0, c.jsx)(a, {
              accion: g,
              usuario: r,
              roles: l,
              unidades: u,
              textoBoton: `Guardar cambios`,
              bloquearEstado: d,
          })),
          (t[7] = d),
          (t[8] = l),
          (t[9] = g),
          (t[10] = u),
          (t[11] = r),
          (t[12] = _))
        : (_ = t[12]);
    let v;
    t[13] !== h || t[14] !== _
        ? ((v = (0, c.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [h, _],
          })),
          (t[13] = h),
          (t[14] = _),
          (t[15] = v))
        : (v = t[15]);
    let y;
    return (
        t[16] !== p || t[17] !== v
            ? ((y = (0, c.jsxs)(c.Fragment, { children: [p, v] })),
              (t[16] = p),
              (t[17] = v),
              (t[18] = y))
            : (y = t[18]),
        y
    );
}
l.layout = { breadcrumbs: [{ title: `Usuarios`, href: r() }] };
export { l as default };
