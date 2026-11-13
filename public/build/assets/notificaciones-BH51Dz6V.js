import {
    c as e,
    d as t,
    g as n,
    i as r,
    n as i,
    r as a,
    s as o,
    t as s,
    u as c,
} from './wayfinder-C8dNLrFV.js';
import { t as l } from './button-BzkMvCJO.js';
import { Ft as u, L as d, f, r as p } from './app-Bu9EFUG6.js';
import { t as m } from './paginacion-HQOmOGhf.js';
var h = a(`CheckCheck`, [
        [`path`, { d: `M18 6 7 17l-5-5`, key: `116fxf` }],
        [`path`, { d: `m22 10-7.5 7.5L13 16`, key: `ke71qq` }],
    ]),
    g = e(),
    _ = (e) => ({ url: _.url(e), method: `get` });
((_.definition = { methods: [`get`, `head`], url: `/notificaciones` }),
    (_.url = (e) => _.definition.url + i(e)),
    (_.get = (e) => ({ url: _.url(e), method: `get` })),
    (_.head = (e) => ({ url: _.url(e), method: `head` })));
var v = (e) => ({ action: _.url(e), method: `get` });
((v.get = (e) => ({ action: _.url(e), method: `get` })),
    (v.head = (e) => ({
        action: _.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (_.form = v));
var y = (e) => ({ url: y.url(e), method: `patch` });
((y.definition = { methods: [`patch`], url: `/notificaciones/leidas` }),
    (y.url = (e) => y.definition.url + i(e)),
    (y.patch = (e) => ({ url: y.url(e), method: `patch` })));
var b = (e) => ({
    action: y.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((b.patch = (e) => ({
    action: y.url({
        [e?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(e?.query ?? e?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (y.form = b));
var x = (e, t) => ({ url: x.url(e, t), method: `patch` });
((x.definition = { methods: [`patch`], url: `/notificaciones/{notificacion}` }),
    (x.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { notificacion: e }),
            Array.isArray(e) && (e = { notificacion: e[0] }),
            (e = s(e)));
        let n = { notificacion: e.notificacion };
        return (
            x.definition.url
                .replace(`{notificacion}`, n.notificacion.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (x.patch = (e, t) => ({ url: x.url(e, t), method: `patch` })));
var S = (e, t) => ({
    action: x.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((S.patch = (e, t) => ({
    action: x.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (x.form = S));
var C = { index: _, marcarTodas: y, marcar: x },
    w = o();
function T(e) {
    let t = (0, g.c)(14),
        { notificaciones: n, noLeidas: r } = e,
        i;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((i = (0, w.jsx)(c, { title: `Notificaciones` })), (t[0] = i))
        : (i = t[0]);
    let a;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = (0, w.jsx)(p, {
              title: `Notificaciones`,
              description: `Validaciones, aprobaciones y solicitudes que le competen`,
          })),
          (t[1] = a))
        : (a = t[1]);
    let o;
    t[2] === r
        ? (o = t[3])
        : ((o =
              r > 0 &&
              (0, w.jsxs)(l, {
                  variant: `outline`,
                  onClick: D,
                  children: [(0, w.jsx)(h, {}), `Marcar todas como leídas`],
              })),
          (t[2] = r),
          (t[3] = o));
    let s;
    t[4] === o
        ? (s = t[5])
        : ((s = (0, w.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-4`,
              children: [a, o],
          })),
          (t[4] = o),
          (t[5] = s));
    let u;
    t[6] === n.data
        ? (u = t[7])
        : ((u = (0, w.jsx)(`div`, {
              className: `rounded-xl border`,
              children:
                  n.data.length === 0
                      ? (0, w.jsx)(`p`, {
                            className: `py-16 text-center text-muted-foreground`,
                            children: `No tiene notificaciones.`,
                        })
                      : (0, w.jsx)(`ul`, {
                            className: `divide-y`,
                            children: n.data.map(E),
                        }),
          })),
          (t[6] = n.data),
          (t[7] = u));
    let d;
    t[8] === n
        ? (d = t[9])
        : ((d = (0, w.jsx)(m, { paginado: n, etiqueta: `notificaciones` })),
          (t[8] = n),
          (t[9] = d));
    let f;
    return (
        t[10] !== s || t[11] !== u || t[12] !== d
            ? ((f = (0, w.jsxs)(w.Fragment, {
                  children: [
                      i,
                      (0, w.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [s, u, d],
                      }),
                  ],
              })),
              (t[10] = s),
              (t[11] = u),
              (t[12] = d),
              (t[13] = f))
            : (f = t[13]),
        f
    );
}
function E(e) {
    return (0, w.jsxs)(
        `li`,
        {
            className: r(
                `flex items-start gap-4 p-4`,
                !e.leida && `bg-accent/40`,
            ),
            children: [
                (0, w.jsx)(u, {
                    className: `mt-0.5 size-4 shrink-0 text-muted-foreground`,
                }),
                (0, w.jsxs)(`div`, {
                    className: `flex-1`,
                    children: [
                        (0, w.jsxs)(`div`, {
                            className: `flex flex-wrap items-center gap-2`,
                            children: [
                                (0, w.jsx)(`span`, {
                                    className: `font-medium`,
                                    children: e.titulo,
                                }),
                                !e.leida &&
                                    (0, w.jsx)(f, {
                                        variant: `secondary`,
                                        children: `Nueva`,
                                    }),
                                (0, w.jsx)(`span`, {
                                    className: `text-xs text-muted-foreground`,
                                    children: e.fecha,
                                }),
                            ],
                        }),
                        (0, w.jsx)(`p`, {
                            className: `mt-1 text-sm text-muted-foreground`,
                            children: e.mensaje,
                        }),
                        (0, w.jsxs)(`div`, {
                            className: `mt-2 flex gap-2`,
                            children: [
                                e.ruta &&
                                    (0, w.jsx)(l, {
                                        variant: `ghost`,
                                        size: `sm`,
                                        asChild: !0,
                                        children: (0, w.jsx)(t, {
                                            href: e.ruta,
                                            children: `Abrir`,
                                        }),
                                    }),
                                !e.leida &&
                                    (0, w.jsx)(l, {
                                        variant: `ghost`,
                                        size: `sm`,
                                        onClick: () =>
                                            n.patch(
                                                C.marcar.url(e.id),
                                                {},
                                                { preserveScroll: !0 },
                                            ),
                                        children: `Marcar como leída`,
                                    }),
                            ],
                        }),
                    ],
                }),
            ],
        },
        e.id,
    );
}
function D() {
    return n.patch(C.marcarTodas.url(), {}, { preserveScroll: !0 });
}
T.layout = { breadcrumbs: [{ title: `Notificaciones`, href: d() }] };
export { T as default };
