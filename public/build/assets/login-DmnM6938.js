import { c as e, l as t, n, s as r, u as i } from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { t as o } from './password-input-CZIsfcUs.js';
import { Tt as s } from './app-Bu9EFUG6.js';
import { t as c } from './input-error-Bxj_sbd5.js';
import { t as l } from './label-D0AQUEbO.js';
import { t as u } from './spinner-DtbIIn34.js';
import { t as d } from './checkbox-Dz5nVKQg.js';
import { t as f } from './text-link-DO6kR7AD.js';
import { n as p } from './password-Cm2HlzMZ.js';
var m = e(),
    h = (e) => ({ url: h.url(e), method: `post` });
((h.definition = { methods: [`post`], url: `/login` }),
    (h.url = (e) => h.definition.url + n(e)),
    (h.post = (e) => ({ url: h.url(e), method: `post` })));
var g = (e) => ({ action: h.url(e), method: `post` });
((g.post = (e) => ({ action: h.url(e), method: `post` })),
    (h.form = g),
    Object.assign(h, h));
var _ = r();
function v(e) {
    let n = (0, m.c)(10),
        { status: r, canResetPassword: g } = e,
        v;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, _.jsx)(i, { title: `Iniciar sesión` })), (n[0] = v))
        : (v = n[0]);
    let y, b;
    n[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((y = h.form()), (b = [`password`]), (n[1] = y), (n[2] = b))
        : ((y = n[1]), (b = n[2]));
    let x;
    n[3] === g
        ? (x = n[4])
        : ((x = (0, _.jsx)(t, {
              ...y,
              resetOnSuccess: b,
              className: `flex flex-col gap-6`,
              children: (e) => {
                  let { processing: t, errors: n } = e;
                  return (0, _.jsx)(_.Fragment, {
                      children: (0, _.jsxs)(`div`, {
                          className: `grid gap-6`,
                          children: [
                              (0, _.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, _.jsx)(l, {
                                          htmlFor: `email`,
                                          children: `Correo electrónico`,
                                      }),
                                      (0, _.jsx)(s, {
                                          id: `email`,
                                          type: `email`,
                                          name: `email`,
                                          required: !0,
                                          autoFocus: !0,
                                          tabIndex: 1,
                                          autoComplete: `email`,
                                          placeholder: `email@example.com`,
                                      }),
                                      (0, _.jsx)(c, { message: n.email }),
                                  ],
                              }),
                              (0, _.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, _.jsxs)(`div`, {
                                          className: `flex items-center`,
                                          children: [
                                              (0, _.jsx)(l, {
                                                  htmlFor: `password`,
                                                  children: `Contraseña`,
                                              }),
                                              g &&
                                                  (0, _.jsx)(f, {
                                                      href: p(),
                                                      className: `ml-auto text-sm`,
                                                      tabIndex: 5,
                                                      children: `¿Olvidó su contraseña?`,
                                                  }),
                                          ],
                                      }),
                                      (0, _.jsx)(o, {
                                          id: `password`,
                                          name: `password`,
                                          required: !0,
                                          tabIndex: 2,
                                          autoComplete: `current-password`,
                                          placeholder: `Contraseña`,
                                      }),
                                      (0, _.jsx)(c, { message: n.password }),
                                  ],
                              }),
                              (0, _.jsxs)(`div`, {
                                  className: `flex items-center space-x-3`,
                                  children: [
                                      (0, _.jsx)(d, {
                                          id: `remember`,
                                          name: `remember`,
                                          tabIndex: 3,
                                      }),
                                      (0, _.jsx)(l, {
                                          htmlFor: `remember`,
                                          children: `Recordarme`,
                                      }),
                                  ],
                              }),
                              (0, _.jsxs)(a, {
                                  type: `submit`,
                                  className: `mt-4 w-full`,
                                  tabIndex: 4,
                                  disabled: t,
                                  'data-test': `login-button`,
                                  children: [
                                      t && (0, _.jsx)(u, {}),
                                      `Iniciar sesión`,
                                  ],
                              }),
                          ],
                      }),
                  });
              },
          })),
          (n[3] = g),
          (n[4] = x));
    let S;
    n[5] === r
        ? (S = n[6])
        : ((S =
              r &&
              (0, _.jsx)(`div`, {
                  className: `mb-4 text-center text-sm font-medium text-green-600`,
                  children: r,
              })),
          (n[5] = r),
          (n[6] = S));
    let C;
    return (
        n[7] !== x || n[8] !== S
            ? ((C = (0, _.jsxs)(_.Fragment, { children: [v, x, S] })),
              (n[7] = x),
              (n[8] = S),
              (n[9] = C))
            : (C = n[9]),
        C
    );
}
v.layout = {
    title: `Ingrese a su cuenta`,
    description: `Ingrese su correo y su contraseña para continuar`,
};
export { v as default };
