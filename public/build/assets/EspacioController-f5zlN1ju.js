import { n as e, t } from './wayfinder-C8dNLrFV.js';
var n = (e) => ({ url: n.url(e), method: `get` });
((n.definition = { methods: [`get`, `head`], url: `/gestion-espacios` }),
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
var i = (e) => ({ url: i.url(e), method: `get` });
((i.definition = { methods: [`get`, `head`], url: `/gestion-espacios/nuevo` }),
    (i.url = (t) => i.definition.url + e(t)),
    (i.get = (e) => ({ url: i.url(e), method: `get` })),
    (i.head = (e) => ({ url: i.url(e), method: `head` })));
var a = (e) => ({ action: i.url(e), method: `get` });
((a.get = (e) => ({ action: i.url(e), method: `get` })),
    (a.head = (e) => ({
        action: i.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (i.form = a));
var o = (e) => ({ url: o.url(e), method: `post` });
((o.definition = { methods: [`post`], url: `/gestion-espacios` }),
    (o.url = (t) => o.definition.url + e(t)),
    (o.post = (e) => ({ url: o.url(e), method: `post` })));
var s = (e) => ({ action: o.url(e), method: `post` });
((s.post = (e) => ({ action: o.url(e), method: `post` })), (o.form = s));
var c = (e, t) => ({ url: c.url(e, t), method: `get` });
((c.definition = {
    methods: [`get`, `head`],
    url: `/gestion-espacios/{espacio}`,
}),
    (c.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) && (n = { espacio: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { espacio: n.id }),
            Array.isArray(n) && (n = { espacio: n[0] }),
            (n = t(n)));
        let i = {
            espacio: typeof n.espacio == `object` ? n.espacio.id : n.espacio,
        };
        return (
            c.definition.url
                .replace(`{espacio}`, i.espacio.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (c.get = (e, t) => ({ url: c.url(e, t), method: `get` })),
    (c.head = (e, t) => ({ url: c.url(e, t), method: `head` })));
var l = (e, t) => ({ action: c.url(e, t), method: `get` });
((l.get = (e, t) => ({ action: c.url(e, t), method: `get` })),
    (l.head = (e, t) => ({
        action: c.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (c.form = l));
var u = (e, t) => ({ url: u.url(e, t), method: `get` });
((u.definition = {
    methods: [`get`, `head`],
    url: `/gestion-espacios/{espacio}/editar`,
}),
    (u.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) && (n = { espacio: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { espacio: n.id }),
            Array.isArray(n) && (n = { espacio: n[0] }),
            (n = t(n)));
        let i = {
            espacio: typeof n.espacio == `object` ? n.espacio.id : n.espacio,
        };
        return (
            u.definition.url
                .replace(`{espacio}`, i.espacio.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (u.get = (e, t) => ({ url: u.url(e, t), method: `get` })),
    (u.head = (e, t) => ({ url: u.url(e, t), method: `head` })));
var d = (e, t) => ({ action: u.url(e, t), method: `get` });
((d.get = (e, t) => ({ action: u.url(e, t), method: `get` })),
    (d.head = (e, t) => ({
        action: u.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (u.form = d));
var f = (e, t) => ({ url: f.url(e, t), method: `put` });
((f.definition = { methods: [`put`], url: `/gestion-espacios/{espacio}` }),
    (f.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) && (n = { espacio: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { espacio: n.id }),
            Array.isArray(n) && (n = { espacio: n[0] }),
            (n = t(n)));
        let i = {
            espacio: typeof n.espacio == `object` ? n.espacio.id : n.espacio,
        };
        return (
            f.definition.url
                .replace(`{espacio}`, i.espacio.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (f.put = (e, t) => ({ url: f.url(e, t), method: `put` })));
var p = (e, t) => ({
    action: f.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((p.put = (e, t) => ({
    action: f.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (f.form = p));
var m = (e, t) => ({ url: m.url(e, t), method: `delete` });
((m.definition = { methods: [`delete`], url: `/gestion-espacios/{espacio}` }),
    (m.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) && (n = { espacio: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { espacio: n.id }),
            Array.isArray(n) && (n = { espacio: n[0] }),
            (n = t(n)));
        let i = {
            espacio: typeof n.espacio == `object` ? n.espacio.id : n.espacio,
        };
        return (
            m.definition.url
                .replace(`{espacio}`, i.espacio.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (m.delete = (e, t) => ({ url: m.url(e, t), method: `delete` })));
var h = (e, t) => ({
    action: m.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((h.delete = (e, t) => ({
    action: m.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (m.form = h));
var g = (e, t) => ({ url: g.url(e, t), method: `delete` });
((g.definition = {
    methods: [`delete`],
    url: `/gestion-espacios/{espacio}/fotografias/{fotografia}`,
}),
    (g.url = (n, r) => {
        (Array.isArray(n) && (n = { espacio: n[0], fotografia: n[1] }),
            (n = t(n)));
        let i = {
            espacio: typeof n.espacio == `object` ? n.espacio.id : n.espacio,
            fotografia:
                typeof n.fotografia == `object`
                    ? n.fotografia.id
                    : n.fotografia,
        };
        return (
            g.definition.url
                .replace(`{espacio}`, i.espacio.toString())
                .replace(`{fotografia}`, i.fotografia.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (g.delete = (e, t) => ({ url: g.url(e, t), method: `delete` })));
var _ = (e, t) => ({
    action: g.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((_.delete = (e, t) => ({
    action: g.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (g.form = _));
var v = {
    index: n,
    create: i,
    store: o,
    show: c,
    edit: u,
    update: f,
    destroy: m,
    eliminarFotografia: g,
};
export { v as t };
