import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    h as r,
    l as i,
    n as a,
    p as o,
    s,
    u as c,
} from './wayfinder-C8dNLrFV.js';
import { t as l } from './button-BzkMvCJO.js';
import { t as u } from './password-input-CZIsfcUs.js';
import {
    Tt as d,
    a as f,
    c as p,
    d as m,
    ht as h,
    i as g,
    o as _,
    r as v,
    s as y,
    u as b,
} from './app-Bu9EFUG6.js';
import { t as x } from './input-error-Bxj_sbd5.js';
import { t as S } from './label-D0AQUEbO.js';
import { t as C } from './verification-CpvD9S-M.js';
var w = t(),
    T = (e) => ({ url: T.url(e), method: `get` });
((T.definition = { methods: [`get`, `head`], url: `/settings/profile` }),
    (T.url = (e) => T.definition.url + a(e)),
    (T.get = (e) => ({ url: T.url(e), method: `get` })),
    (T.head = (e) => ({ url: T.url(e), method: `head` })));
var E = (e) => ({ action: T.url(e), method: `get` });
((E.get = (e) => ({ action: T.url(e), method: `get` })),
    (E.head = (e) => ({
        action: T.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (T.form = E));
var D = (e) => ({ url: D.url(e), method: `patch` });
((D.definition = { methods: [`patch`], url: `/settings/profile` }),
    (D.url = (e) => D.definition.url + a(e)),
    (D.patch = (e) => ({ url: D.url(e), method: `patch` })));
var O = (e) => ({
    action: D.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((O.patch = (e) => ({
    action: D.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (D.form = O));
var k = (e) => ({ url: k.url(e), method: `delete` });
((k.definition = { methods: [`delete`], url: `/settings/profile` }),
    (k.url = (e) => k.definition.url + a(e)),
    (k.delete = (e) => ({ url: k.url(e), method: `delete` })));
var A = (e) => ({
    action: k.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((A.delete = (e) => ({
    action: k.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (k.form = A));
var j = { edit: T, update: D, destroy: k },
    M = e(r(), 1),
    N = s();
function P() {
    let e = (0, w.c)(9),
        t = (0, M.useRef)(null),
        n;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((n = (0, N.jsx)(v, {
              variant: `small`,
              title: `Eliminar cuenta`,
              description: `Elimine su cuenta y toda su información`,
          })),
          (e[0] = n))
        : (n = e[0]);
    let r;
    e[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((r = (0, N.jsxs)(`div`, {
              className: `relative space-y-0.5 text-red-600 dark:text-red-100`,
              children: [
                  (0, N.jsx)(`p`, {
                      className: `font-medium`,
                      children: `Advertencia`,
                  }),
                  (0, N.jsx)(`p`, {
                      className: `text-sm`,
                      children: `Proceda con precaución: esta acción no se puede deshacer.`,
                  }),
              ],
          })),
          (e[1] = r))
        : (r = e[1]);
    let a;
    e[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, N.jsx)(m, {
              asChild: !0,
              children: (0, N.jsx)(l, {
                  variant: `destructive`,
                  'data-test': `delete-user-button`,
                  children: `Eliminar cuenta`,
              }),
          })),
          (e[2] = a))
        : (a = e[2]);
    let o, s;
    e[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((o = (0, N.jsx)(b, {
              children: `¿Confirma que desea eliminar su cuenta?`,
          })),
          (s = (0, N.jsx)(y, {
              children: `Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.`,
          })),
          (e[3] = o),
          (e[4] = s))
        : ((o = e[3]), (s = e[4]));
    let c, d, h;
    e[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((c = j.destroy.form()),
          (d = { preserveScroll: !0 }),
          (h = () => t.current?.focus()),
          (e[5] = c),
          (e[6] = d),
          (e[7] = h))
        : ((c = e[5]), (d = e[6]), (h = e[7]));
    let C;
    return (
        e[8] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((C = (0, N.jsxs)(`div`, {
                  className: `space-y-6`,
                  children: [
                      n,
                      (0, N.jsxs)(`div`, {
                          className: `space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10`,
                          children: [
                              r,
                              (0, N.jsxs)(g, {
                                  children: [
                                      a,
                                      (0, N.jsxs)(_, {
                                          children: [
                                              o,
                                              s,
                                              (0, N.jsx)(i, {
                                                  ...c,
                                                  options: d,
                                                  onError: h,
                                                  resetOnSuccess: !0,
                                                  className: `space-y-6`,
                                                  children: (e) => {
                                                      let {
                                                          resetAndClearErrors:
                                                              n,
                                                          processing: r,
                                                          errors: i,
                                                      } = e;
                                                      return (0, N.jsxs)(
                                                          N.Fragment,
                                                          {
                                                              children: [
                                                                  (0, N.jsxs)(
                                                                      `div`,
                                                                      {
                                                                          className: `grid gap-2`,
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  N.jsx)(
                                                                                      S,
                                                                                      {
                                                                                          htmlFor: `password`,
                                                                                          className: `sr-only`,
                                                                                          children: `Contraseña`,
                                                                                      },
                                                                                  ),
                                                                                  (0,
                                                                                  N.jsx)(
                                                                                      u,
                                                                                      {
                                                                                          id: `password`,
                                                                                          name: `password`,
                                                                                          ref: t,
                                                                                          placeholder: `Contraseña`,
                                                                                          autoComplete: `current-password`,
                                                                                      },
                                                                                  ),
                                                                                  (0,
                                                                                  N.jsx)(
                                                                                      x,
                                                                                      {
                                                                                          message:
                                                                                              i.password,
                                                                                      },
                                                                                  ),
                                                                              ],
                                                                      },
                                                                  ),
                                                                  (0, N.jsxs)(
                                                                      p,
                                                                      {
                                                                          className: `gap-2`,
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  N.jsx)(
                                                                                      f,
                                                                                      {
                                                                                          asChild:
                                                                                              !0,
                                                                                          children:
                                                                                              (0,
                                                                                              N.jsx)(
                                                                                                  l,
                                                                                                  {
                                                                                                      variant: `secondary`,
                                                                                                      onClick:
                                                                                                          () =>
                                                                                                              n(),
                                                                                                      children: `Cancelar`,
                                                                                                  },
                                                                                              ),
                                                                                      },
                                                                                  ),
                                                                                  (0,
                                                                                  N.jsx)(
                                                                                      l,
                                                                                      {
                                                                                          variant: `destructive`,
                                                                                          disabled:
                                                                                              r,
                                                                                          asChild:
                                                                                              !0,
                                                                                          children:
                                                                                              (0,
                                                                                              N.jsx)(
                                                                                                  `button`,
                                                                                                  {
                                                                                                      type: `submit`,
                                                                                                      'data-test': `confirm-delete-user-button`,
                                                                                                      children: `Eliminar cuenta`,
                                                                                                  },
                                                                                              ),
                                                                                      },
                                                                                  ),
                                                                              ],
                                                                      },
                                                                  ),
                                                              ],
                                                          },
                                                      );
                                                  },
                                              }),
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                  ],
              })),
              (e[8] = C))
            : (C = e[8]),
        C
    );
}
function F(e) {
    let t = (0, w.c)(14),
        { mustVerifyEmail: r, status: a } = e,
        { auth: s } = o().props,
        u,
        f;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = (0, N.jsx)(c, { title: `Perfil` })),
          (f = (0, N.jsx)(`h1`, { className: `sr-only`, children: `Perfil` })),
          (t[0] = u),
          (t[1] = f))
        : ((u = t[0]), (f = t[1]));
    let p;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((p = (0, N.jsx)(v, {
              variant: `small`,
              title: `Perfil`,
              description: `Actualice su nombre y su correo electrónico`,
          })),
          (t[2] = p))
        : (p = t[2]);
    let m, h;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((m = j.update.form()),
          (h = { preserveScroll: !0 }),
          (t[3] = m),
          (t[4] = h))
        : ((m = t[3]), (h = t[4]));
    let g;
    t[5] !== s.user.email ||
    t[6] !== s.user.email_verified_at ||
    t[7] !== s.user.name ||
    t[8] !== r ||
    t[9] !== a
        ? ((g = (0, N.jsxs)(`div`, {
              className: `space-y-6`,
              children: [
                  p,
                  (0, N.jsx)(i, {
                      ...m,
                      options: h,
                      className: `space-y-6`,
                      children: (e) => {
                          let { processing: t, errors: i } = e;
                          return (0, N.jsxs)(N.Fragment, {
                              children: [
                                  (0, N.jsxs)(`div`, {
                                      className: `grid gap-2`,
                                      children: [
                                          (0, N.jsx)(S, {
                                              htmlFor: `name`,
                                              children: `Nombre`,
                                          }),
                                          (0, N.jsx)(d, {
                                              id: `name`,
                                              className: `mt-1 block w-full`,
                                              defaultValue: s.user.name,
                                              name: `name`,
                                              required: !0,
                                              autoComplete: `name`,
                                              placeholder: `Nombre completo`,
                                          }),
                                          (0, N.jsx)(x, {
                                              className: `mt-2`,
                                              message: i.name,
                                          }),
                                      ],
                                  }),
                                  (0, N.jsxs)(`div`, {
                                      className: `grid gap-2`,
                                      children: [
                                          (0, N.jsx)(S, {
                                              htmlFor: `email`,
                                              children: `Correo electrónico`,
                                          }),
                                          (0, N.jsx)(d, {
                                              id: `email`,
                                              type: `email`,
                                              className: `mt-1 block w-full`,
                                              defaultValue: s.user.email,
                                              name: `email`,
                                              required: !0,
                                              autoComplete: `username`,
                                              placeholder: `Correo electrónico`,
                                          }),
                                          (0, N.jsx)(x, {
                                              className: `mt-2`,
                                              message: i.email,
                                          }),
                                      ],
                                  }),
                                  r &&
                                      s.user.email_verified_at === null &&
                                      (0, N.jsxs)(`div`, {
                                          children: [
                                              (0, N.jsxs)(`p`, {
                                                  className: `-mt-4 text-sm text-muted-foreground`,
                                                  children: [
                                                      `Your email address is unverified.`,
                                                      ` `,
                                                      (0, N.jsx)(n, {
                                                          href: C(),
                                                          as: `button`,
                                                          className: `text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500`,
                                                          children: `Click here to re-send the verification email.`,
                                                      }),
                                                  ],
                                              }),
                                              a === `verification-link-sent` &&
                                                  (0, N.jsx)(`div`, {
                                                      className: `mt-2 text-sm font-medium text-green-600`,
                                                      children: `A new verification link has been sent to your email address.`,
                                                  }),
                                          ],
                                      }),
                                  (0, N.jsx)(`div`, {
                                      className: `flex items-center gap-4`,
                                      children: (0, N.jsx)(l, {
                                          disabled: t,
                                          'data-test': `update-profile-button`,
                                          children: `Guardar`,
                                      }),
                                  }),
                              ],
                          });
                      },
                  }),
              ],
          })),
          (t[5] = s.user.email),
          (t[6] = s.user.email_verified_at),
          (t[7] = s.user.name),
          (t[8] = r),
          (t[9] = a),
          (t[10] = g))
        : (g = t[10]);
    let _;
    t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((_ = (0, N.jsx)(P, {})), (t[11] = _))
        : (_ = t[11]);
    let y;
    return (
        t[12] === g
            ? (y = t[13])
            : ((y = (0, N.jsxs)(N.Fragment, { children: [u, f, g, _] })),
              (t[12] = g),
              (t[13] = y)),
        y
    );
}
F.layout = { breadcrumbs: [{ title: `Perfil`, href: h() }] };
export { F as default };
