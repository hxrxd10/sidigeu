import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    h as n,
    l as r,
    n as i,
    s as a,
    t as o,
    u as s,
} from './wayfinder-C8dNLrFV.js';
import { t as c } from './button-BzkMvCJO.js';
import { t as l } from './plus-B2NIGUck.js';
import { t as u } from './trash-2-_Kz5vj-S.js';
import { Tt as d, q as f, r as p } from './app-Bu9EFUG6.js';
import { t as m } from './input-error-Bxj_sbd5.js';
import { a as h, i as g, n as _, t as v } from './card-Bc3dRGP7.js';
import { t as y } from './label-D0AQUEbO.js';
import { t as b } from './spinner-DtbIIn34.js';
import { t as x } from './textarea-DtbS5QwL.js';
var S = e(n(), 1),
    C = t(),
    w = (e, t) => ({ url: w.url(e, t), method: `get` });
((w.definition = {
    methods: [`get`, `head`],
    url: `/proyectos/{proyecto}/cierre`,
}),
    (w.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = o(e)));
        let n = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            w.definition.url
                .replace(`{proyecto}`, n.proyecto.toString())
                .replace(/\/+$/, ``) + i(t)
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
var E = (e, t) => ({ url: E.url(e, t), method: `post` });
((E.definition = { methods: [`post`], url: `/proyectos/{proyecto}/cierre` }),
    (E.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { proyecto: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { proyecto: e.id }),
            Array.isArray(e) && (e = { proyecto: e[0] }),
            (e = o(e)));
        let n = {
            proyecto:
                typeof e.proyecto == `object` ? e.proyecto.id : e.proyecto,
        };
        return (
            E.definition.url
                .replace(`{proyecto}`, n.proyecto.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (E.post = (e, t) => ({ url: E.url(e, t), method: `post` })));
var D = (e, t) => ({ action: E.url(e, t), method: `post` });
((D.post = (e, t) => ({ action: E.url(e, t), method: `post` })), (E.form = D));
var O = { edit: w, store: E },
    k = a();
function A(e) {
    let t = (0, C.c)(23),
        { proyecto: n } = e,
        i;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((i = [{ url: ``, descripcion: `` }]), (t[0] = i))
        : (i = t[0]);
    let [a, o] = (0, S.useState)(i),
        f = `Cierre: ${n.nombre}`,
        w;
    t[1] === f
        ? (w = t[2])
        : ((w = (0, k.jsx)(s, { title: f })), (t[1] = f), (t[2] = w));
    let T = `Cierre: ${n.nombre}`,
        E;
    t[3] === T
        ? (E = t[4])
        : ((E = (0, k.jsx)(p, {
              title: T,
              description: `Resultados finales, productos, lecciones aprendidas y evidencias`,
          })),
          (t[3] = T),
          (t[4] = E));
    let D;
    t[5] === n.id
        ? (D = t[6])
        : ((D = O.store.form(n.id)), (t[5] = n.id), (t[6] = D));
    let A;
    t[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = { preserveScroll: !0 }), (t[7] = A))
        : (A = t[7]);
    let M;
    t[8] !== a ||
    t[9] !== n.indicadores ||
    t[10] !== n.lecciones_aprendidas ||
    t[11] !== n.productos ||
    t[12] !== n.resultados
        ? ((M = (e) => {
              let { processing: t, errors: r } = e;
              return (0, k.jsxs)(k.Fragment, {
                  children: [
                      (0, k.jsx)(v, {
                          children: (0, k.jsxs)(_, {
                              className: `space-y-4`,
                              children: [
                                  (0, k.jsxs)(`div`, {
                                      className: `grid gap-2`,
                                      children: [
                                          (0, k.jsx)(y, {
                                              htmlFor: `resultados`,
                                              children: `Resultados finales`,
                                          }),
                                          (0, k.jsx)(x, {
                                              id: `resultados`,
                                              name: `resultados`,
                                              rows: 4,
                                              required: !0,
                                              defaultValue: n.resultados ?? ``,
                                          }),
                                          (0, k.jsx)(m, {
                                              message: r.resultados,
                                          }),
                                      ],
                                  }),
                                  (0, k.jsxs)(`div`, {
                                      className: `grid gap-2`,
                                      children: [
                                          (0, k.jsx)(y, {
                                              htmlFor: `productos`,
                                              children: `Productos entregados`,
                                          }),
                                          (0, k.jsx)(x, {
                                              id: `productos`,
                                              name: `productos`,
                                              rows: 3,
                                              defaultValue: n.productos ?? ``,
                                          }),
                                          (0, k.jsx)(m, {
                                              message: r.productos,
                                          }),
                                      ],
                                  }),
                                  (0, k.jsxs)(`div`, {
                                      className: `grid gap-2`,
                                      children: [
                                          (0, k.jsx)(y, {
                                              htmlFor: `lecciones_aprendidas`,
                                              children: `Lecciones aprendidas`,
                                          }),
                                          (0, k.jsx)(x, {
                                              id: `lecciones_aprendidas`,
                                              name: `lecciones_aprendidas`,
                                              rows: 3,
                                              defaultValue:
                                                  n.lecciones_aprendidas ?? ``,
                                          }),
                                          (0, k.jsx)(m, {
                                              message: r.lecciones_aprendidas,
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                      }),
                      n.indicadores.length > 0 &&
                          (0, k.jsxs)(v, {
                              children: [
                                  (0, k.jsx)(g, {
                                      children: (0, k.jsx)(h, {
                                          children: `Valores finales de los indicadores`,
                                      }),
                                  }),
                                  (0, k.jsxs)(_, {
                                      className: `space-y-3`,
                                      children: [
                                          (0, k.jsx)(`p`, {
                                              className: `text-xs text-muted-foreground`,
                                              children: `Se propone el aporte de las actividades vinculadas; puede ajustarlo.`,
                                          }),
                                          n.indicadores.map(j),
                                      ],
                                  }),
                              ],
                          }),
                      (0, k.jsxs)(v, {
                          children: [
                              (0, k.jsx)(g, {
                                  children: (0, k.jsx)(h, {
                                      children: `Evidencias y productos`,
                                  }),
                              }),
                              (0, k.jsxs)(_, {
                                  className: `space-y-4`,
                                  children: [
                                      (0, k.jsxs)(`div`, {
                                          className: `grid gap-2`,
                                          children: [
                                              (0, k.jsx)(y, {
                                                  htmlFor: `archivos`,
                                                  children: `Archivos`,
                                              }),
                                              (0, k.jsx)(d, {
                                                  id: `archivos`,
                                                  name: `archivos[]`,
                                                  type: `file`,
                                                  multiple: !0,
                                                  accept: `image/jpeg,image/png,application/pdf,.doc,.docx,.xls,.xlsx`,
                                              }),
                                              (0, k.jsx)(m, {
                                                  message: r.archivos,
                                              }),
                                          ],
                                      }),
                                      a.map((e, t) =>
                                          (0, k.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_1fr_auto]`,
                                                  children: [
                                                      (0, k.jsx)(d, {
                                                          name: `enlaces[${t}][url]`,
                                                          type: `url`,
                                                          placeholder: `https://`,
                                                          defaultValue: e.url,
                                                      }),
                                                      (0, k.jsx)(d, {
                                                          name: `enlaces[${t}][descripcion]`,
                                                          placeholder: `Descripción`,
                                                      }),
                                                      (0, k.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar enlace`,
                                                          onClick: () =>
                                                              o(
                                                                  a.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, k.jsx)(
                                                              u,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, k.jsxs)(c, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              o([
                                                  ...a,
                                                  { url: ``, descripcion: `` },
                                              ]),
                                          children: [
                                              (0, k.jsx)(l, {}),
                                              `Agregar enlace`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, k.jsxs)(c, {
                          type: `submit`,
                          disabled: t,
                          children: [t && (0, k.jsx)(b, {}), `Cerrar proyecto`],
                      }),
                  ],
              });
          }),
          (t[8] = a),
          (t[9] = n.indicadores),
          (t[10] = n.lecciones_aprendidas),
          (t[11] = n.productos),
          (t[12] = n.resultados),
          (t[13] = M))
        : (M = t[13]);
    let N;
    t[14] !== D || t[15] !== M
        ? ((N = (0, k.jsx)(r, {
              ...D,
              options: A,
              className: `max-w-3xl space-y-6`,
              children: M,
          })),
          (t[14] = D),
          (t[15] = M),
          (t[16] = N))
        : (N = t[16]);
    let P;
    t[17] !== E || t[18] !== N
        ? ((P = (0, k.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [E, N],
          })),
          (t[17] = E),
          (t[18] = N),
          (t[19] = P))
        : (P = t[19]);
    let F;
    return (
        t[20] !== P || t[21] !== w
            ? ((F = (0, k.jsxs)(k.Fragment, { children: [w, P] })),
              (t[20] = P),
              (t[21] = w),
              (t[22] = F))
            : (F = t[22]),
        F
    );
}
function j(e, t) {
    return (0, k.jsxs)(
        `div`,
        {
            className: `flex items-center gap-3`,
            children: [
                (0, k.jsx)(`input`, {
                    type: `hidden`,
                    name: `indicadores[${t}][indicador_id]`,
                    value: e.indicador_id,
                }),
                (0, k.jsxs)(y, {
                    htmlFor: `final-${e.indicador_id}`,
                    className: `flex-1`,
                    children: [
                        e.nombre,
                        (0, k.jsxs)(`span`, {
                            className: `block text-xs font-normal text-muted-foreground`,
                            children: [
                                `Meta:`,
                                ` `,
                                e.meta ?? `—`,
                                ` `,
                                e.unidad_medida,
                            ],
                        }),
                    ],
                }),
                (0, k.jsx)(d, {
                    id: `final-${e.indicador_id}`,
                    name: `indicadores[${t}][valor_final]`,
                    type: `number`,
                    min: 0,
                    step: `0.01`,
                    className: `w-32`,
                    defaultValue: e.valor_final ?? ``,
                }),
            ],
        },
        e.indicador_id,
    );
}
A.layout = { breadcrumbs: [{ title: `Proyectos`, href: f() }] };
export { A as default };
