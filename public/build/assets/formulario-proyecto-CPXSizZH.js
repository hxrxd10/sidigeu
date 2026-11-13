import { c as e, l as t, n, s as r, t as i } from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { a as o, i as s, n as c, r as l, t as u } from './select-hxeu1kQ_.js';
import { Tt as d } from './app-Bu9EFUG6.js';
import { t as f } from './input-error-Bxj_sbd5.js';
import { t as p } from './label-D0AQUEbO.js';
import { t as m } from './spinner-DtbIIn34.js';
import { t as h } from './textarea-DtbS5QwL.js';
var g = (e) => ({ url: g.url(e), method: `get` });
((g.definition = { methods: [`get`, `head`], url: `/proyectos` }),
    (g.url = (e) => g.definition.url + n(e)),
    (g.get = (e) => ({ url: g.url(e), method: `get` })),
    (g.head = (e) => ({ url: g.url(e), method: `head` })));
var _ = (e) => ({ action: g.url(e), method: `get` });
((_.get = (e) => ({ action: g.url(e), method: `get` })),
    (_.head = (e) => ({
        action: g.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (g.form = _));
var v = (e) => ({ url: v.url(e), method: `get` });
((v.definition = { methods: [`get`, `head`], url: `/proyectos/nuevo` }),
    (v.url = (e) => v.definition.url + n(e)),
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
var b = (e) => ({ url: b.url(e), method: `post` });
((b.definition = { methods: [`post`], url: `/proyectos` }),
    (b.url = (e) => b.definition.url + n(e)),
    (b.post = (e) => ({ url: b.url(e), method: `post` })));
var x = (e) => ({ action: b.url(e), method: `post` });
((x.post = (e) => ({ action: b.url(e), method: `post` })), (b.form = x));
var S = (e, t) => ({ url: S.url(e, t), method: `get` });
((S.definition = { methods: [`get`, `head`], url: `/proyectos/{proyecto}` }),
    (S.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = i(e)));
        let r = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            S.definition.url
                .replace(`{proyecto}`, r.proyecto.toString())
                .replace(/\/+$/, ``) + n(t)
        );
    }),
    (S.get = (e, t) => ({ url: S.url(e, t), method: `get` })),
    (S.head = (e, t) => ({ url: S.url(e, t), method: `head` })));
var C = (e, t) => ({ action: S.url(e, t), method: `get` });
((C.get = (e, t) => ({ action: S.url(e, t), method: `get` })),
    (C.head = (e, t) => ({
        action: S.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (S.form = C));
var w = (e, t) => ({ url: w.url(e, t), method: `get` });
((w.definition = {
    methods: [`get`, `head`],
    url: `/proyectos/{proyecto}/editar`,
}),
    (w.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = i(e)));
        let r = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            w.definition.url
                .replace(`{proyecto}`, r.proyecto.toString())
                .replace(/\/+$/, ``) + n(t)
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
((E.definition = { methods: [`put`], url: `/proyectos/{proyecto}` }),
    (E.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = i(e)));
        let r = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            E.definition.url
                .replace(`{proyecto}`, r.proyecto.toString())
                .replace(/\/+$/, ``) + n(t)
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
var O = (e, t) => ({ url: O.url(e, t), method: `delete` });
((O.definition = { methods: [`delete`], url: `/proyectos/{proyecto}` }),
    (O.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = i(e)));
        let r = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            O.definition.url
                .replace(`{proyecto}`, r.proyecto.toString())
                .replace(/\/+$/, ``) + n(t)
        );
    }),
    (O.delete = (e, t) => ({ url: O.url(e, t), method: `delete` })));
var k = (e, t) => ({
    action: O.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((k.delete = (e, t) => ({
    action: O.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (O.form = k));
var A = {
        index: g,
        create: v,
        store: b,
        show: S,
        edit: w,
        update: E,
        destroy: O,
    },
    j = e(),
    M = r(),
    N = `sin-valor`;
function P(e) {
    let t = (0, j.c)(22),
        { nombre: n, etiqueta: r, opciones: i, valor: a, error: d } = e,
        m;
    t[0] !== r || t[1] !== n
        ? ((m = (0, M.jsx)(p, { htmlFor: n, children: r })),
          (t[0] = r),
          (t[1] = n),
          (t[2] = m))
        : (m = t[2]);
    let h = a ? String(a) : N,
        g;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, M.jsx)(o, { placeholder: `Sin asignar` })), (t[3] = g))
        : (g = t[3]);
    let _;
    t[4] === n
        ? (_ = t[5])
        : ((_ = (0, M.jsx)(s, { id: n, children: g })), (t[4] = n), (t[5] = _));
    let v;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, M.jsx)(l, { value: N, children: `Sin asignar` })),
          (t[6] = v))
        : (v = t[6]);
    let y;
    t[7] === i ? (y = t[8]) : ((y = i.map(F)), (t[7] = i), (t[8] = y));
    let b;
    t[9] === y
        ? (b = t[10])
        : ((b = (0, M.jsxs)(c, { children: [v, y] })), (t[9] = y), (t[10] = b));
    let x;
    t[11] !== n || t[12] !== h || t[13] !== _ || t[14] !== b
        ? ((x = (0, M.jsxs)(u, { name: n, defaultValue: h, children: [_, b] })),
          (t[11] = n),
          (t[12] = h),
          (t[13] = _),
          (t[14] = b),
          (t[15] = x))
        : (x = t[15]);
    let S;
    t[16] === d
        ? (S = t[17])
        : ((S = (0, M.jsx)(f, { message: d })), (t[16] = d), (t[17] = S));
    let C;
    return (
        t[18] !== m || t[19] !== x || t[20] !== S
            ? ((C = (0, M.jsxs)(`div`, {
                  className: `grid gap-2`,
                  children: [m, x, S],
              })),
              (t[18] = m),
              (t[19] = x),
              (t[20] = S),
              (t[21] = C))
            : (C = t[21]),
        C
    );
}
function F(e) {
    return (0, M.jsx)(
        l,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function I(e) {
    let n = (0, j.c)(21),
        { accion: r, proyecto: i, opciones: o, textoBoton: s } = e,
        c;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((c = { preserveScroll: !0 }), (n[0] = c))
        : (c = n[0]);
    let l;
    n[1] !== o.areas ||
    n[2] !== o.lineas ||
    n[3] !== o.programas ||
    n[4] !== o.responsables ||
    n[5] !== o.tipos ||
    n[6] !== i?.area_id ||
    n[7] !== i?.fecha_fin ||
    n[8] !== i?.fecha_inicio ||
    n[9] !== i?.justificacion ||
    n[10] !== i?.linea_accion_id ||
    n[11] !== i?.nombre ||
    n[12] !== i?.objetivo_general ||
    n[13] !== i?.programa_id ||
    n[14] !== i?.responsable_id ||
    n[15] !== i?.tipo_proyecto_id ||
    n[16] !== s
        ? ((l = (e) => {
              let { processing: t, errors: n } = e;
              return (0, M.jsxs)(M.Fragment, {
                  children: [
                      (0, M.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, M.jsx)(p, {
                                  htmlFor: `nombre`,
                                  children: `Nombre del proyecto`,
                              }),
                              (0, M.jsx)(d, {
                                  id: `nombre`,
                                  name: `nombre`,
                                  required: !0,
                                  defaultValue: i?.nombre,
                              }),
                              (0, M.jsx)(f, { message: n.nombre }),
                          ],
                      }),
                      (0, M.jsxs)(`div`, {
                          className: `grid gap-6 sm:grid-cols-2`,
                          children: [
                              (0, M.jsx)(P, {
                                  nombre: `responsable_id`,
                                  etiqueta: `Responsable`,
                                  opciones: o.responsables,
                                  valor: i?.responsable_id,
                                  error: n.responsable_id,
                              }),
                              (0, M.jsx)(P, {
                                  nombre: `area_id`,
                                  etiqueta: `Área de la DIGEU`,
                                  opciones: o.areas,
                                  valor: i?.area_id,
                                  error: n.area_id,
                              }),
                              (0, M.jsx)(P, {
                                  nombre: `programa_id`,
                                  etiqueta: `Programa`,
                                  opciones: o.programas,
                                  valor: i?.programa_id,
                                  error: n.programa_id,
                              }),
                              (0, M.jsx)(P, {
                                  nombre: `linea_accion_id`,
                                  etiqueta: `Línea de acción`,
                                  opciones: o.lineas,
                                  valor: i?.linea_accion_id,
                                  error: n.linea_accion_id,
                              }),
                              (0, M.jsx)(P, {
                                  nombre: `tipo_proyecto_id`,
                                  etiqueta: `Tipo de proyecto`,
                                  opciones: o.tipos,
                                  valor: i?.tipo_proyecto_id,
                                  error: n.tipo_proyecto_id,
                              }),
                              (0, M.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, M.jsx)(p, {
                                          htmlFor: `fecha_inicio`,
                                          children: `Fecha de inicio`,
                                      }),
                                      (0, M.jsx)(d, {
                                          id: `fecha_inicio`,
                                          name: `fecha_inicio`,
                                          type: `date`,
                                          defaultValue: i?.fecha_inicio ?? ``,
                                      }),
                                      (0, M.jsx)(f, {
                                          message: n.fecha_inicio,
                                      }),
                                  ],
                              }),
                              (0, M.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, M.jsx)(p, {
                                          htmlFor: `fecha_fin`,
                                          children: `Fecha de finalización`,
                                      }),
                                      (0, M.jsx)(d, {
                                          id: `fecha_fin`,
                                          name: `fecha_fin`,
                                          type: `date`,
                                          defaultValue: i?.fecha_fin ?? ``,
                                      }),
                                      (0, M.jsx)(f, { message: n.fecha_fin }),
                                  ],
                              }),
                          ],
                      }),
                      (0, M.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, M.jsx)(p, {
                                  htmlFor: `objetivo_general`,
                                  children: `Objetivo general`,
                              }),
                              (0, M.jsx)(h, {
                                  id: `objetivo_general`,
                                  name: `objetivo_general`,
                                  rows: 3,
                                  required: !0,
                                  defaultValue: i?.objetivo_general ?? ``,
                              }),
                              (0, M.jsx)(f, { message: n.objetivo_general }),
                          ],
                      }),
                      (0, M.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, M.jsx)(p, {
                                  htmlFor: `justificacion`,
                                  children: `Justificación`,
                              }),
                              (0, M.jsx)(h, {
                                  id: `justificacion`,
                                  name: `justificacion`,
                                  rows: 4,
                                  defaultValue: i?.justificacion ?? ``,
                              }),
                              (0, M.jsx)(f, { message: n.justificacion }),
                          ],
                      }),
                      (0, M.jsxs)(a, {
                          type: `submit`,
                          disabled: t,
                          children: [t && (0, M.jsx)(m, {}), s],
                      }),
                  ],
              });
          }),
          (n[1] = o.areas),
          (n[2] = o.lineas),
          (n[3] = o.programas),
          (n[4] = o.responsables),
          (n[5] = o.tipos),
          (n[6] = i?.area_id),
          (n[7] = i?.fecha_fin),
          (n[8] = i?.fecha_inicio),
          (n[9] = i?.justificacion),
          (n[10] = i?.linea_accion_id),
          (n[11] = i?.nombre),
          (n[12] = i?.objetivo_general),
          (n[13] = i?.programa_id),
          (n[14] = i?.responsable_id),
          (n[15] = i?.tipo_proyecto_id),
          (n[16] = s),
          (n[17] = l))
        : (l = n[17]);
    let u;
    return (
        n[18] !== r || n[19] !== l
            ? ((u = (0, M.jsx)(t, {
                  ...r,
                  options: c,
                  className: `max-w-3xl space-y-6`,
                  children: l,
              })),
              (n[18] = r),
              (n[19] = l),
              (n[20] = u))
            : (u = n[20]),
        u
    );
}
export { A as n, I as t };
