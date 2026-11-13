import { n as e, t } from './wayfinder-C8dNLrFV.js';
var n = (e) => ({ url: n.url(e), method: `get` });
((n.definition = { methods: [`get`, `head`], url: `/proyectos/aprobacion` }),
    (n.url = (t) => n.definition.url + e(t)),
    (n.get = (e) => ({ url: n.url(e), method: `get` })),
    (n.head = (e) => ({ url: n.url(e), method: `head` })));
var r = (e) => ({ action: n.url(e), method: `get` });
((r.get = (e) => ({ action: n.url(e), method: `get` })),
    (r.head = (e) => ({
        action: n.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (n.form = r));
var i = (e, t) => ({ url: i.url(e, t), method: `patch` });
((i.definition = { methods: [`patch`], url: `/proyectos/{proyecto}/enviar` }),
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
    (i.patch = (e, t) => ({ url: i.url(e, t), method: `patch` })));
var a = (e, t) => ({
    action: i.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((a.patch = (e, t) => ({
    action: i.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (i.form = a));
var o = (e, t) => ({ url: o.url(e, t), method: `patch` });
((o.definition = { methods: [`patch`], url: `/proyectos/{proyecto}/aprobar` }),
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
((c.definition = { methods: [`patch`], url: `/proyectos/{proyecto}/observar` }),
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
((u.definition = { methods: [`patch`], url: `/proyectos/{proyecto}/rechazar` }),
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
var f = { index: n, enviar: i, aprobar: o, observar: c, rechazar: u };
export { f as t };
