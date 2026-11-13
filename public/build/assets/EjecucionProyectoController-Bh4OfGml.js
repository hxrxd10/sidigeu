import { n as e, t } from './wayfinder-C8dNLrFV.js';
var n = (e, t) => ({ url: n.url(e, t), method: `get` });
((n.definition = {
    methods: [`get`, `head`],
    url: `/proyectos/{proyecto}/avance`,
}),
    (n.url = (r, i) => {
        ((typeof r == `string` || typeof r == `number`) &&
            (r = { proyecto: r }),
            typeof r == `object` &&
                !Array.isArray(r) &&
                `id` in r &&
                (r = { proyecto: r.id }),
            Array.isArray(r) && (r = { proyecto: r[0] }),
            (r = t(r)));
        let a = {
            proyecto:
                typeof r.proyecto == `object` ? r.proyecto.id : r.proyecto,
        };
        return (
            n.definition.url
                .replace(`{proyecto}`, a.proyecto.toString())
                .replace(/\/+$/, ``) + e(i)
        );
    }),
    (n.get = (e, t) => ({ url: n.url(e, t), method: `get` })),
    (n.head = (e, t) => ({ url: n.url(e, t), method: `head` })));
var r = (e, t) => ({ action: n.url(e, t), method: `get` });
((r.get = (e, t) => ({ action: n.url(e, t), method: `get` })),
    (r.head = (e, t) => ({
        action: n.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (n.form = r));
var i = (e, t) => ({ url: i.url(e, t), method: `post` });
((i.definition = { methods: [`post`], url: `/proyectos/{proyecto}/avance` }),
    (i.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { proyecto: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { proyecto: n.id }),
            Array.isArray(n) && (n = { proyecto: n[0] }),
            (n = t(n)));
        let a = {
            proyecto:
                typeof n.proyecto == `object` ? n.proyecto.id : n.proyecto,
        };
        return (
            i.definition.url
                .replace(`{proyecto}`, a.proyecto.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (i.post = (e, t) => ({ url: i.url(e, t), method: `post` })));
var a = (e, t) => ({ action: i.url(e, t), method: `post` });
((a.post = (e, t) => ({ action: i.url(e, t), method: `post` })), (i.form = a));
var o = (e, t) => ({ url: o.url(e, t), method: `patch` });
((o.definition = { methods: [`patch`], url: `/proyectos/{proyecto}/iniciar` }),
    (o.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { proyecto: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { proyecto: n.id }),
            Array.isArray(n) && (n = { proyecto: n[0] }),
            (n = t(n)));
        let i = {
            proyecto:
                typeof n.proyecto == `object` ? n.proyecto.id : n.proyecto,
        };
        return (
            o.definition.url
                .replace(`{proyecto}`, i.proyecto.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (o.patch = (e, t) => ({ url: o.url(e, t), method: `patch` })));
var s = (e, t) => ({
    action: o.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((s.patch = (e, t) => ({
    action: o.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (o.form = s));
var c = (e, t) => ({ url: c.url(e, t), method: `patch` });
((c.definition = {
    methods: [`patch`],
    url: `/proyectos/{proyecto}/suspender`,
}),
    (c.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { proyecto: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { proyecto: n.id }),
            Array.isArray(n) && (n = { proyecto: n[0] }),
            (n = t(n)));
        let i = {
            proyecto:
                typeof n.proyecto == `object` ? n.proyecto.id : n.proyecto,
        };
        return (
            c.definition.url
                .replace(`{proyecto}`, i.proyecto.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (c.patch = (e, t) => ({ url: c.url(e, t), method: `patch` })));
var l = (e, t) => ({
    action: c.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((l.patch = (e, t) => ({
    action: c.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (c.form = l));
var u = (e, t) => ({ url: u.url(e, t), method: `patch` });
((u.definition = { methods: [`patch`], url: `/proyectos/{proyecto}/cancelar` }),
    (u.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { proyecto: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { proyecto: n.id }),
            Array.isArray(n) && (n = { proyecto: n[0] }),
            (n = t(n)));
        let i = {
            proyecto:
                typeof n.proyecto == `object` ? n.proyecto.id : n.proyecto,
        };
        return (
            u.definition.url
                .replace(`{proyecto}`, i.proyecto.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (u.patch = (e, t) => ({ url: u.url(e, t), method: `patch` })));
var d = (e, t) => ({
    action: u.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((d.patch = (e, t) => ({
    action: u.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (u.form = d));
var f = { create: n, store: i, iniciar: o, suspender: c, cancelar: u };
export { f as t };
