import { c as e, s as t, u as n } from './wayfinder-C8dNLrFV.js';
import { g as r, p as i, r as a } from './app-Bu9EFUG6.js';
import { n as o, t as s } from './UserController-D7hflS5n.js';
var c = e(),
    l = t();
function u(e) {
    let t = (0, c.c)(6),
        { roles: r, unidades: i } = e,
        u;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, l.jsx)(n, { title: `Nuevo usuario` })), (t[0] = u))
        : (u = t[0]);
    let d;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((d = (0, l.jsx)(a, {
              title: `Nuevo usuario`,
              description: `Al guardar, la persona recibe por correo un enlace para definir su contraseña`,
          })),
          (t[1] = d))
        : (d = t[1]);
    let f;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((f = s.store.form()), (t[2] = f))
        : (f = t[2]);
    let p;
    return (
        t[3] !== r || t[4] !== i
            ? ((p = (0, l.jsxs)(l.Fragment, {
                  children: [
                      u,
                      (0, l.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [
                              d,
                              (0, l.jsx)(o, {
                                  accion: f,
                                  roles: r,
                                  unidades: i,
                                  textoBoton: `Crear usuario`,
                              }),
                          ],
                      }),
                  ],
              })),
              (t[3] = r),
              (t[4] = i),
              (t[5] = p))
            : (p = t[5]),
        p
    );
}
u.layout = {
    breadcrumbs: [
        { title: `Usuarios`, href: r() },
        { title: `Nuevo usuario`, href: i() },
    ],
};
export { u as default };
