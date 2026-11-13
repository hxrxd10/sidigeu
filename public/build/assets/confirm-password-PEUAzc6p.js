import { c as e, l as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { t as a } from './password-input-CZIsfcUs.js';
import { t as o } from './input-error-Bxj_sbd5.js';
import { t as s } from './label-D0AQUEbO.js';
import { t as c } from './spinner-DtbIIn34.js';
import { n as l } from './confirm-_-BWdVWA.js';
var u = e(),
    d = n();
function f() {
    let e = (0, u.c)(2),
        n;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((n = (0, d.jsx)(r, { title: `Confirmar contraseña` })), (e[0] = n))
        : (n = e[0]);
    let i;
    return (
        e[1] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((i = (0, d.jsxs)(d.Fragment, {
                  children: [
                      n,
                      (0, d.jsx)(t, {
                          ...l.form(),
                          resetOnSuccess: [`password`],
                          children: p,
                      }),
                  ],
              })),
              (e[1] = i))
            : (i = e[1]),
        i
    );
}
function p(e) {
    let { processing: t, errors: n } = e;
    return (0, d.jsxs)(`div`, {
        className: `space-y-6`,
        children: [
            (0, d.jsxs)(`div`, {
                className: `grid gap-2`,
                children: [
                    (0, d.jsx)(s, {
                        htmlFor: `password`,
                        children: `Contraseña`,
                    }),
                    (0, d.jsx)(a, {
                        id: `password`,
                        name: `password`,
                        placeholder: `Contraseña`,
                        autoComplete: `current-password`,
                        autoFocus: !0,
                    }),
                    (0, d.jsx)(o, { message: n.password }),
                ],
            }),
            (0, d.jsx)(`div`, {
                className: `flex items-center`,
                children: (0, d.jsxs)(i, {
                    className: `w-full`,
                    disabled: t,
                    'data-test': `confirm-password-button`,
                    children: [t && (0, d.jsx)(c, {}), `Confirmar contraseña`],
                }),
            }),
        ],
    });
}
f.layout = {
    title: `Confirmar contraseña`,
    description: `Esta es un área segura del sistema. Confirme su contraseña antes de continuar.`,
};
export { f as default };
