import { n as e, t } from './wayfinder-C8dNLrFV.js';
var n = (e) => ({ url: n.url(e), method: `get` });
((n.definition = { methods: [`get`, `head`], url: `/actividades/revision` }),
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
((i.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/enviar`,
}),
    (i.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { actividad: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { actividad: n.id }),
            Array.isArray(n) && (n = { actividad: n[0] }),
            (n = t(n)));
        let a = {
            actividad:
                typeof n.actividad == `object` ? n.actividad.id : n.actividad,
        };
        return (
            i.definition.url
                .replace(`{actividad}`, a.actividad.toString())
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
((o.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/validar`,
}),
    (o.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { actividad: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { actividad: n.id }),
            Array.isArray(n) && (n = { actividad: n[0] }),
            (n = t(n)));
        let i = {
            actividad:
                typeof n.actividad == `object` ? n.actividad.id : n.actividad,
        };
        return (
            o.definition.url
                .replace(`{actividad}`, i.actividad.toString())
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
    url: `/actividades/{actividad}/observar`,
}),
    (c.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { actividad: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { actividad: n.id }),
            Array.isArray(n) && (n = { actividad: n[0] }),
            (n = t(n)));
        let i = {
            actividad:
                typeof n.actividad == `object` ? n.actividad.id : n.actividad,
        };
        return (
            c.definition.url
                .replace(`{actividad}`, i.actividad.toString())
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
((u.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/rechazar`,
}),
    (u.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { actividad: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { actividad: n.id }),
            Array.isArray(n) && (n = { actividad: n[0] }),
            (n = t(n)));
        let i = {
            actividad:
                typeof n.actividad == `object` ? n.actividad.id : n.actividad,
        };
        return (
            u.definition.url
                .replace(`{actividad}`, i.actividad.toString())
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
var f = (e, t) => ({ url: f.url(e, t), method: `patch` });
((f.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/publicar-agenda`,
}),
    (f.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { actividad: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { actividad: n.id }),
            Array.isArray(n) && (n = { actividad: n[0] }),
            (n = t(n)));
        let i = {
            actividad:
                typeof n.actividad == `object` ? n.actividad.id : n.actividad,
        };
        return (
            f.definition.url
                .replace(`{actividad}`, i.actividad.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (f.patch = (e, t) => ({ url: f.url(e, t), method: `patch` })));
var p = (e, t) => ({
    action: f.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((p.patch = (e, t) => ({
    action: f.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (f.form = p));
var m = (e, t) => ({ url: m.url(e, t), method: `patch` });
((m.definition = {
    methods: [`patch`],
    url: `/actividades/{actividad}/quitar-agenda`,
}),
    (m.url = (n, r) => {
        ((typeof n == `string` || typeof n == `number`) &&
            (n = { actividad: n }),
            typeof n == `object` &&
                !Array.isArray(n) &&
                `id` in n &&
                (n = { actividad: n.id }),
            Array.isArray(n) && (n = { actividad: n[0] }),
            (n = t(n)));
        let i = {
            actividad:
                typeof n.actividad == `object` ? n.actividad.id : n.actividad,
        };
        return (
            m.definition.url
                .replace(`{actividad}`, i.actividad.toString())
                .replace(/\/+$/, ``) + e(r)
        );
    }),
    (m.patch = (e, t) => ({ url: m.url(e, t), method: `patch` })));
var h = (e, t) => ({
    action: m.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((h.patch = (e, t) => ({
    action: m.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PATCH`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (m.form = h));
var g = {
    index: n,
    enviar: i,
    validar: o,
    observar: c,
    rechazar: u,
    publicarAgenda: f,
    quitarAgenda: m,
};
export { g as t };
