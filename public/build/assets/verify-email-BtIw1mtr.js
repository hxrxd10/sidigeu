import { c as e, l as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { vt as a } from './app-Bu9EFUG6.js';
import { t as o } from './spinner-DtbIIn34.js';
import { t as s } from './text-link-DO6kR7AD.js';
import { t as c } from './verification-CpvD9S-M.js';
var l = e(),
    u = n();
function d(e) {
    let n = (0, l.c)(6),
        { status: i } = e,
        a;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, u.jsx)(r, { title: `Verificación de correo` })), (n[0] = a))
        : (a = n[0]);
    let o;
    n[1] === i
        ? (o = n[2])
        : ((o =
              i === `verification-link-sent` &&
              (0, u.jsx)(`div`, {
                  className: `mb-4 text-center text-sm font-medium text-green-600`,
                  children: `A new verification link has been sent to the email address you provided during registration.`,
              })),
          (n[1] = i),
          (n[2] = o));
    let s;
    n[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = (0, u.jsx)(t, {
              ...c.form(),
              className: `space-y-6 text-center`,
              children: f,
          })),
          (n[3] = s))
        : (s = n[3]);
    let d;
    return (
        n[4] === o
            ? (d = n[5])
            : ((d = (0, u.jsxs)(u.Fragment, { children: [a, o, s] })),
              (n[4] = o),
              (n[5] = d)),
        d
    );
}
function f(e) {
    let { processing: t } = e;
    return (0, u.jsxs)(u.Fragment, {
        children: [
            (0, u.jsxs)(i, {
                disabled: t,
                variant: `secondary`,
                children: [
                    t && (0, u.jsx)(o, {}),
                    `Reenviar correo de verificación`,
                ],
            }),
            (0, u.jsx)(s, {
                href: a(),
                className: `mx-auto block text-sm`,
                children: `Cerrar sesión`,
            }),
        ],
    });
}
d.layout = {
    title: `Verificación de correo`,
    description: `Verifique su correo electrónico con el enlace que acabamos de enviarle.`,
};
export { d as default };
