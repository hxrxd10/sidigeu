import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    h as n,
    l as r,
    n as i,
    s as a,
    u as o,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { t as c } from './password-input-CZIsfcUs.js';
import { r as l, t as u } from './app-Bu9EFUG6.js';
import { t as d } from './input-error-Bxj_sbd5.js';
import { t as f } from './label-D0AQUEbO.js';
var p = e(n(), 1),
    m = t(),
    h = (e) => ({ url: h.url(e), method: `get` });
((h.definition = { methods: [`get`, `head`], url: `/settings/security` }),
    (h.url = (e) => h.definition.url + i(e)),
    (h.get = (e) => ({ url: h.url(e), method: `get` })),
    (h.head = (e) => ({ url: h.url(e), method: `head` })));
var g = (e) => ({ action: h.url(e), method: `get` });
((g.get = (e) => ({ action: h.url(e), method: `get` })),
    (g.head = (e) => ({
        action: h.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (h.form = g));
var _ = (e) => ({ url: _.url(e), method: `put` });
((_.definition = { methods: [`put`], url: `/settings/password` }),
    (_.url = (e) => _.definition.url + i(e)),
    (_.put = (e) => ({ url: _.url(e), method: `put` })));
var v = (e) => ({
    action: _.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((v.put = (e) => ({
    action: _.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (_.form = v));
var y = { edit: h, update: _ },
    b = a();
function x(e) {
    let t = (0, m.c)(9),
        n = (0, p.useRef)(null),
        i = (0, p.useRef)(null),
        a,
        u;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, b.jsx)(o, { title: `Seguridad` })),
          (u = (0, b.jsx)(`h1`, {
              className: `sr-only`,
              children: `Seguridad`,
          })),
          (t[0] = a),
          (t[1] = u))
        : ((a = t[0]), (u = t[1]));
    let h;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, b.jsx)(l, {
              variant: `small`,
              title: `Actualizar contraseña`,
              description: `Use una contraseña larga y difícil de adivinar para mantener segura su cuenta`,
          })),
          (t[2] = h))
        : (h = t[2]);
    let g, _, v;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = y.update.form()),
          (_ = { preserveScroll: !0 }),
          (v = [`password`, `password_confirmation`, `current_password`]),
          (t[3] = g),
          (t[4] = _),
          (t[5] = v))
        : ((g = t[3]), (_ = t[4]), (v = t[5]));
    let x;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (e) => {
              (e.password && n.current?.focus(),
                  e.current_password && i.current?.focus());
          }),
          (t[6] = x))
        : (x = t[6]);
    let S;
    return (
        t[7] === e.passwordRules
            ? (S = t[8])
            : ((S = (0, b.jsxs)(b.Fragment, {
                  children: [
                      a,
                      u,
                      (0, b.jsxs)(`div`, {
                          className: `space-y-6`,
                          children: [
                              h,
                              (0, b.jsx)(r, {
                                  ...g,
                                  options: _,
                                  resetOnError: v,
                                  resetOnSuccess: !0,
                                  onError: x,
                                  className: `space-y-6`,
                                  children: (t) => {
                                      let { errors: r, processing: a } = t;
                                      return (0, b.jsxs)(b.Fragment, {
                                          children: [
                                              (0, b.jsxs)(`div`, {
                                                  className: `grid gap-2`,
                                                  children: [
                                                      (0, b.jsx)(f, {
                                                          htmlFor: `current_password`,
                                                          children: `Contraseña actual`,
                                                      }),
                                                      (0, b.jsx)(c, {
                                                          id: `current_password`,
                                                          ref: i,
                                                          name: `current_password`,
                                                          className: `mt-1 block w-full`,
                                                          autoComplete: `current-password`,
                                                          placeholder: `Contraseña actual`,
                                                      }),
                                                      (0, b.jsx)(d, {
                                                          message:
                                                              r.current_password,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)(`div`, {
                                                  className: `grid gap-2`,
                                                  children: [
                                                      (0, b.jsx)(f, {
                                                          htmlFor: `password`,
                                                          children: `Nueva contraseña`,
                                                      }),
                                                      (0, b.jsx)(c, {
                                                          id: `password`,
                                                          ref: n,
                                                          name: `password`,
                                                          className: `mt-1 block w-full`,
                                                          autoComplete: `new-password`,
                                                          placeholder: `Nueva contraseña`,
                                                          passwordrules:
                                                              e.passwordRules,
                                                      }),
                                                      (0, b.jsx)(d, {
                                                          message: r.password,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)(`div`, {
                                                  className: `grid gap-2`,
                                                  children: [
                                                      (0, b.jsx)(f, {
                                                          htmlFor: `password_confirmation`,
                                                          children: `Confirmar contraseña`,
                                                      }),
                                                      (0, b.jsx)(c, {
                                                          id: `password_confirmation`,
                                                          name: `password_confirmation`,
                                                          className: `mt-1 block w-full`,
                                                          autoComplete: `new-password`,
                                                          placeholder: `Confirmar contraseña`,
                                                          passwordrules:
                                                              e.passwordRules,
                                                      }),
                                                      (0, b.jsx)(d, {
                                                          message:
                                                              r.password_confirmation,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsx)(`div`, {
                                                  className: `flex items-center gap-4`,
                                                  children: (0, b.jsx)(s, {
                                                      disabled: a,
                                                      'data-test': `update-password-button`,
                                                      children: `Guardar`,
                                                  }),
                                              }),
                                          ],
                                      });
                                  },
                              }),
                          ],
                      }),
                  ],
              })),
              (t[7] = e.passwordRules),
              (t[8] = S)),
        S
    );
}
x.layout = { breadcrumbs: [{ title: `Seguridad`, href: u() }] };
export { x as default };
