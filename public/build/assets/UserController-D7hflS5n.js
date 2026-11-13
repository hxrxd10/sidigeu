import { l as e, n as t, s as n, t as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { a, i as o, n as s, r as c, t as l } from './select-hxeu1kQ_.js';
import { Tt as u } from './app-Bu9EFUG6.js';
import { t as d } from './input-error-Bxj_sbd5.js';
import { t as f } from './label-D0AQUEbO.js';
import { t as p } from './spinner-DtbIIn34.js';
import { t as m } from './checkbox-Dz5nVKQg.js';
var h = n(),
    g = `sin-unidad`;
function _({
    accion: t,
    usuario: n,
    roles: r,
    unidades: _,
    textoBoton: v,
    mostrarEstado: y = !0,
    bloquearEstado: b = !1,
}) {
    return (0, h.jsx)(e, {
        ...t,
        className: `max-w-2xl space-y-6`,
        children: ({ processing: e, errors: t }) =>
            (0, h.jsxs)(h.Fragment, {
                children: [
                    (0, h.jsxs)(`div`, {
                        className: `grid gap-2`,
                        children: [
                            (0, h.jsx)(f, {
                                htmlFor: `name`,
                                children: `Nombre`,
                            }),
                            (0, h.jsx)(u, {
                                id: `name`,
                                name: `name`,
                                defaultValue: n?.name,
                                required: !0,
                                autoComplete: `name`,
                                placeholder: `Nombre completo`,
                            }),
                            (0, h.jsx)(d, { message: t.name }),
                        ],
                    }),
                    (0, h.jsxs)(`div`, {
                        className: `grid gap-2`,
                        children: [
                            (0, h.jsx)(f, {
                                htmlFor: `email`,
                                children: `Correo electrónico`,
                            }),
                            (0, h.jsx)(u, {
                                id: `email`,
                                name: `email`,
                                type: `email`,
                                defaultValue: n?.email,
                                required: !0,
                                autoComplete: `username`,
                                placeholder: `persona@usac.edu.gt`,
                            }),
                            (0, h.jsx)(d, { message: t.email }),
                        ],
                    }),
                    (0, h.jsxs)(`div`, {
                        className: `grid gap-2`,
                        children: [
                            (0, h.jsx)(f, {
                                htmlFor: `unidad_id`,
                                children: `Unidad administrativa`,
                            }),
                            (0, h.jsxs)(l, {
                                name: `unidad_id`,
                                defaultValue: n?.unidad_id
                                    ? String(n.unidad_id)
                                    : g,
                                children: [
                                    (0, h.jsx)(o, {
                                        id: `unidad_id`,
                                        children: (0, h.jsx)(a, {
                                            placeholder: `Seleccione una unidad`,
                                        }),
                                    }),
                                    (0, h.jsxs)(s, {
                                        children: [
                                            (0, h.jsx)(c, {
                                                value: g,
                                                children: `Sin unidad asignada`,
                                            }),
                                            _.map((e) =>
                                                (0, h.jsx)(
                                                    c,
                                                    {
                                                        value: String(e.valor),
                                                        children: e.nombre,
                                                    },
                                                    e.valor,
                                                ),
                                            ),
                                        ],
                                    }),
                                ],
                            }),
                            (0, h.jsx)(d, { message: t.unidad_id }),
                        ],
                    }),
                    (0, h.jsxs)(`fieldset`, {
                        className: `grid gap-3`,
                        children: [
                            (0, h.jsx)(`legend`, {
                                className: `mb-1 text-sm font-medium`,
                                children: `Roles`,
                            }),
                            r.map((e) =>
                                (0, h.jsxs)(
                                    `div`,
                                    {
                                        className: `flex items-start gap-3`,
                                        children: [
                                            (0, h.jsx)(m, {
                                                id: `rol-${e.valor}`,
                                                name: `roles[]`,
                                                value: e.valor,
                                                defaultChecked:
                                                    n?.roles.includes(e.valor),
                                            }),
                                            (0, h.jsxs)(`div`, {
                                                className: `grid gap-0.5`,
                                                children: [
                                                    (0, h.jsx)(f, {
                                                        htmlFor: `rol-${e.valor}`,
                                                        children: e.nombre,
                                                    }),
                                                    (0, h.jsx)(`p`, {
                                                        className: `text-xs text-muted-foreground`,
                                                        children: e.descripcion,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    },
                                    e.valor,
                                ),
                            ),
                            (0, h.jsx)(d, { message: t.roles }),
                        ],
                    }),
                    y &&
                        (0, h.jsxs)(`div`, {
                            className: `grid gap-2`,
                            children: [
                                (0, h.jsxs)(`div`, {
                                    className: `flex items-center gap-3`,
                                    children: [
                                        (0, h.jsx)(m, {
                                            id: `activo`,
                                            name: `activo`,
                                            defaultChecked: n?.activo ?? !0,
                                            disabled: b,
                                        }),
                                        (0, h.jsx)(f, {
                                            htmlFor: `activo`,
                                            children: `Usuario activo (puede iniciar sesión)`,
                                        }),
                                    ],
                                }),
                                (0, h.jsx)(d, { message: t.activo }),
                            ],
                        }),
                    (0, h.jsxs)(i, {
                        type: `submit`,
                        disabled: e,
                        children: [e && (0, h.jsx)(p, {}), v],
                    }),
                ],
            }),
    });
}
var v = (e) => ({ url: v.url(e), method: `get` });
((v.definition = { methods: [`get`, `head`], url: `/usuarios` }),
    (v.url = (e) => v.definition.url + t(e)),
    (v.get = (e) => ({ url: v.url(e), method: `get` })),
    (v.head = (e) => ({ url: v.url(e), method: `head` })));
var y = (e) => ({ action: v.url(e), method: `get` });
((y.get = (e) => ({ action: v.url(e), method: `get` })),
    (y.head = (e) => ({
        action: v.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (v.form = y));
var b = (e) => ({ url: b.url(e), method: `get` });
((b.definition = { methods: [`get`, `head`], url: `/usuarios/nuevo` }),
    (b.url = (e) => b.definition.url + t(e)),
    (b.get = (e) => ({ url: b.url(e), method: `get` })),
    (b.head = (e) => ({ url: b.url(e), method: `head` })));
var x = (e) => ({ action: b.url(e), method: `get` });
((x.get = (e) => ({ action: b.url(e), method: `get` })),
    (x.head = (e) => ({
        action: b.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (b.form = x));
var S = (e) => ({ url: S.url(e), method: `post` });
((S.definition = { methods: [`post`], url: `/usuarios` }),
    (S.url = (e) => S.definition.url + t(e)),
    (S.post = (e) => ({ url: S.url(e), method: `post` })));
var C = (e) => ({ action: S.url(e), method: `post` });
((C.post = (e) => ({ action: S.url(e), method: `post` })), (S.form = C));
var w = (e, t) => ({ url: w.url(e, t), method: `get` });
((w.definition = {
    methods: [`get`, `head`],
    url: `/usuarios/{usuario}/editar`,
}),
    (w.url = (e, n) => {
        ((typeof e == `string` || typeof e == `number`) && (e = { usuario: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { usuario: e.id }),
            Array.isArray(e) && (e = { usuario: e[0] }),
            (e = r(e)));
        let i = {
            usuario: typeof e.usuario == `object` ? e.usuario.id : e.usuario,
        };
        return (
            w.definition.url
                .replace(`{usuario}`, i.usuario.toString())
                .replace(/\/+$/, ``) + t(n)
        );
    }),
    (w.get = (e, t) => ({ url: w.url(e, t), method: `get` })),
    (w.head = (e, t) => ({ url: w.url(e, t), method: `head` })));
var T = (e, t) => ({ action: w.url(e, t), method: `get` });
((T.get = (e, t) => ({ action: w.url(e, t), method: `get` })),
    (T.head = (e, t) => ({
        action: w.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (w.form = T));
var E = (e, t) => ({ url: E.url(e, t), method: `put` });
((E.definition = { methods: [`put`], url: `/usuarios/{usuario}` }),
    (E.url = (e, n) => {
        ((typeof e == `string` || typeof e == `number`) && (e = { usuario: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { usuario: e.id }),
            Array.isArray(e) && (e = { usuario: e[0] }),
            (e = r(e)));
        let i = {
            usuario: typeof e.usuario == `object` ? e.usuario.id : e.usuario,
        };
        return (
            E.definition.url
                .replace(`{usuario}`, i.usuario.toString())
                .replace(/\/+$/, ``) + t(n)
        );
    }),
    (E.put = (e, t) => ({ url: E.url(e, t), method: `put` })));
var D = (e, t) => ({
    action: E.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((D.put = (e, t) => ({
    action: E.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (E.form = D));
var O = (e, t) => ({ url: O.url(e, t), method: `patch` });
((O.definition = { methods: [`patch`], url: `/usuarios/{usuario}/estado` }),
    (O.url = (e, n) => {
        ((typeof e == `string` || typeof e == `number`) && (e = { usuario: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { usuario: e.id }),
            Array.isArray(e) && (e = { usuario: e[0] }),
            (e = r(e)));
        let i = {
            usuario: typeof e.usuario == `object` ? e.usuario.id : e.usuario,
        };
        return (
            O.definition.url
                .replace(`{usuario}`, i.usuario.toString())
                .replace(/\/+$/, ``) + t(n)
        );
    }),
    (O.patch = (e, t) => ({ url: O.url(e, t), method: `patch` })));
var k = (e, t) => ({
    action: O.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((k.patch = (e, t) => ({
    action: O.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (O.form = k));
var A = { index: v, create: b, store: S, edit: w, update: E, cambiarEstado: O };
export { _ as n, A as t };
