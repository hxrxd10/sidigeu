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
var x = e(n(), 1),
    S = t(),
    C = (e, t) => ({ url: C.url(e, t), method: `get` });
((C.definition = {
    methods: [`get`, `head`],
    url: `/proyectos/{proyecto}/formulacion`,
}),
    (C.url = (e, t) => {
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
            C.definition.url
                .replace(`{proyecto}`, n.proyecto.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (C.get = (e, t) => ({ url: C.url(e, t), method: `get` })),
    (C.head = (e, t) => ({ url: C.url(e, t), method: `head` })));
var w = (e, t) => ({ action: C.url(e, t), method: `get` });
((w.get = (e, t) => ({ action: C.url(e, t), method: `get` })),
    (w.head = (e, t) => ({
        action: C.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (C.form = w));
var T = (e, t) => ({ url: T.url(e, t), method: `post` });
((T.definition = {
    methods: [`post`],
    url: `/proyectos/{proyecto}/formulacion`,
}),
    (T.url = (e, t) => {
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
            T.definition.url
                .replace(`{proyecto}`, n.proyecto.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (T.post = (e, t) => ({ url: T.url(e, t), method: `post` })));
var E = (e, t) => ({ action: T.url(e, t), method: `post` });
((E.post = (e, t) => ({ action: T.url(e, t), method: `post` })), (T.form = E));
var D = { edit: C, store: T },
    O = a();
function k(e) {
    let t = (0, S.c)(8),
        { nombre: n, opciones: r, valor: i, etiqueta: a } = e,
        o = i ?? ``,
        s;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((s = (0, O.jsx)(`option`, { value: ``, children: `Sin asignar` })),
          (t[0] = s))
        : (s = t[0]);
    let c;
    t[1] === r ? (c = t[2]) : ((c = r.map(A)), (t[1] = r), (t[2] = c));
    let l;
    return (
        t[3] !== a || t[4] !== n || t[5] !== o || t[6] !== c
            ? ((l = (0, O.jsxs)(`select`, {
                  name: n,
                  defaultValue: o,
                  'aria-label': a,
                  className: `h-9 rounded-md border border-input bg-transparent px-3 text-sm`,
                  children: [s, c],
              })),
              (t[3] = a),
              (t[4] = n),
              (t[5] = o),
              (t[6] = c),
              (t[7] = l))
            : (l = t[7]),
        l
    );
}
function A(e) {
    return (0, O.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
function j(e) {
    let t = (0, S.c)(33),
        { proyecto: n, opciones: i } = e,
        a;
    t[0] === n.objetivos
        ? (a = t[1])
        : ((a = n.objetivos.length > 0 ? n.objetivos : [{ descripcion: `` }]),
          (t[0] = n.objetivos),
          (t[1] = a));
    let [o, f] = (0, x.useState)(a),
        C;
    t[2] === n.beneficiarios
        ? (C = t[3])
        : ((C =
              n.beneficiarios.length > 0
                  ? n.beneficiarios
                  : [{ tipo: ``, cantidad: 0, descripcion: `` }]),
          (t[2] = n.beneficiarios),
          (t[3] = C));
    let [w, T] = (0, x.useState)(C),
        E;
    t[4] === n.cronograma
        ? (E = t[5])
        : ((E =
              n.cronograma.length > 0
                  ? n.cronograma
                  : [
                        {
                            tarea: ``,
                            fecha_inicio: null,
                            fecha_fin: null,
                            responsable_id: null,
                            avance: 0,
                        },
                    ]),
          (t[4] = n.cronograma),
          (t[5] = E));
    let [A, j] = (0, x.useState)(E),
        M;
    t[6] === n.presupuesto
        ? (M = t[7])
        : ((M =
              n.presupuesto.length > 0
                  ? n.presupuesto
                  : [
                        {
                            descripcion: ``,
                            cantidad: 1,
                            costo_unitario: 0,
                            fuente_financiamiento_id: null,
                        },
                    ]),
          (t[6] = n.presupuesto),
          (t[7] = M));
    let [N, P] = (0, x.useState)(M),
        F = `Formulación: ${n.nombre}`,
        I;
    t[8] === F
        ? (I = t[9])
        : ((I = (0, O.jsx)(s, { title: F })), (t[8] = F), (t[9] = I));
    let L = `Formulación: ${n.nombre}`,
        R;
    t[10] === L
        ? (R = t[11])
        : ((R = (0, O.jsx)(p, {
              title: L,
              description: `Objetivos, beneficiarios, cronograma, presupuesto e indicadores`,
          })),
          (t[10] = L),
          (t[11] = R));
    let z;
    t[12] === n.id
        ? (z = t[13])
        : ((z = D.store.form(n.id)), (t[12] = n.id), (t[13] = z));
    let B;
    t[14] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((B = { preserveScroll: !0 }), (t[14] = B))
        : (B = t[14]);
    let V;
    t[15] !== w ||
    t[16] !== A ||
    t[17] !== o ||
    t[18] !== i.fuentes ||
    t[19] !== i.indicadores ||
    t[20] !== i.responsables ||
    t[21] !== N ||
    t[22] !== n.indicadores
        ? ((V = (e) => {
              let { processing: t, errors: r } = e;
              return (0, O.jsxs)(O.Fragment, {
                  children: [
                      (0, O.jsxs)(v, {
                          children: [
                              (0, O.jsx)(g, {
                                  children: (0, O.jsx)(h, {
                                      children: `Objetivos específicos`,
                                  }),
                              }),
                              (0, O.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      o.map((e, t) =>
                                          (0, O.jsxs)(
                                              `div`,
                                              {
                                                  className: `flex gap-2`,
                                                  children: [
                                                      (0, O.jsx)(d, {
                                                          name: `objetivos[${t}][descripcion]`,
                                                          defaultValue:
                                                              e.descripcion,
                                                          placeholder: `Objetivo específico`,
                                                          'aria-label': `Objetivo específico`,
                                                      }),
                                                      (0, O.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar objetivo`,
                                                          onClick: () =>
                                                              f(
                                                                  o.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, O.jsx)(
                                                              u,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, O.jsxs)(c, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              f([...o, { descripcion: `` }]),
                                          children: [
                                              (0, O.jsx)(l, {}),
                                              `Agregar objetivo`,
                                          ],
                                      }),
                                      (0, O.jsx)(m, { message: r.objetivos }),
                                  ],
                              }),
                          ],
                      }),
                      (0, O.jsxs)(v, {
                          children: [
                              (0, O.jsx)(g, {
                                  children: (0, O.jsx)(h, {
                                      children: `Beneficiarios estimados`,
                                  }),
                              }),
                              (0, O.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      w.map((e, t) =>
                                          (0, O.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_7rem_1fr_auto]`,
                                                  children: [
                                                      (0, O.jsx)(d, {
                                                          name: `beneficiarios[${t}][tipo]`,
                                                          defaultValue: e.tipo,
                                                          placeholder: `Tipo de beneficiario`,
                                                          'aria-label': `Tipo de beneficiario`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `beneficiarios[${t}][cantidad]`,
                                                          type: `number`,
                                                          min: 0,
                                                          defaultValue:
                                                              e.cantidad,
                                                          placeholder: `Cantidad`,
                                                          'aria-label': `Cantidad estimada`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `beneficiarios[${t}][descripcion]`,
                                                          defaultValue:
                                                              e.descripcion ??
                                                              ``,
                                                          placeholder: `Descripción`,
                                                          'aria-label': `Descripción`,
                                                      }),
                                                      (0, O.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar beneficiario`,
                                                          onClick: () =>
                                                              T(
                                                                  w.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, O.jsx)(
                                                              u,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, O.jsxs)(c, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              T([
                                                  ...w,
                                                  {
                                                      tipo: ``,
                                                      cantidad: 0,
                                                      descripcion: ``,
                                                  },
                                              ]),
                                          children: [
                                              (0, O.jsx)(l, {}),
                                              `Agregar beneficiarios`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, O.jsxs)(v, {
                          children: [
                              (0, O.jsx)(g, {
                                  children: (0, O.jsx)(h, {
                                      children: `Cronograma`,
                                  }),
                              }),
                              (0, O.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      A.map((e, t) =>
                                          (0, O.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_9rem_9rem_1fr_6rem_auto]`,
                                                  children: [
                                                      (0, O.jsx)(d, {
                                                          name: `cronograma[${t}][tarea]`,
                                                          defaultValue: e.tarea,
                                                          placeholder: `Tarea o hito`,
                                                          'aria-label': `Tarea`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `cronograma[${t}][fecha_inicio]`,
                                                          type: `date`,
                                                          defaultValue:
                                                              e.fecha_inicio ??
                                                              ``,
                                                          'aria-label': `Fecha de inicio`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `cronograma[${t}][fecha_fin]`,
                                                          type: `date`,
                                                          defaultValue:
                                                              e.fecha_fin ?? ``,
                                                          'aria-label': `Fecha de finalización`,
                                                      }),
                                                      (0, O.jsx)(k, {
                                                          nombre: `cronograma[${t}][responsable_id]`,
                                                          opciones:
                                                              i.responsables,
                                                          valor: e.responsable_id,
                                                          etiqueta: `Responsable de la tarea`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `cronograma[${t}][avance]`,
                                                          type: `number`,
                                                          min: 0,
                                                          max: 100,
                                                          defaultValue:
                                                              e.avance,
                                                          'aria-label': `Avance`,
                                                      }),
                                                      (0, O.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar tarea`,
                                                          onClick: () =>
                                                              j(
                                                                  A.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, O.jsx)(
                                                              u,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, O.jsxs)(c, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              j([
                                                  ...A,
                                                  {
                                                      tarea: ``,
                                                      fecha_inicio: null,
                                                      fecha_fin: null,
                                                      responsable_id: null,
                                                      avance: 0,
                                                  },
                                              ]),
                                          children: [
                                              (0, O.jsx)(l, {}),
                                              `Agregar tarea`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, O.jsxs)(v, {
                          children: [
                              (0, O.jsx)(g, {
                                  children: (0, O.jsx)(h, {
                                      children: `Presupuesto`,
                                  }),
                              }),
                              (0, O.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      N.map((e, t) =>
                                          (0, O.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_6rem_8rem_1fr_auto]`,
                                                  children: [
                                                      (0, O.jsx)(d, {
                                                          name: `presupuesto[${t}][descripcion]`,
                                                          defaultValue:
                                                              e.descripcion,
                                                          placeholder: `Renglón`,
                                                          'aria-label': `Renglón`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `presupuesto[${t}][cantidad]`,
                                                          type: `number`,
                                                          min: 0,
                                                          step: `0.01`,
                                                          defaultValue:
                                                              e.cantidad,
                                                          'aria-label': `Cantidad`,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `presupuesto[${t}][costo_unitario]`,
                                                          type: `number`,
                                                          min: 0,
                                                          step: `0.01`,
                                                          defaultValue:
                                                              e.costo_unitario,
                                                          'aria-label': `Costo unitario`,
                                                      }),
                                                      (0, O.jsx)(k, {
                                                          nombre: `presupuesto[${t}][fuente_financiamiento_id]`,
                                                          opciones: i.fuentes,
                                                          valor: e.fuente_financiamiento_id,
                                                          etiqueta: `Fuente de financiamiento`,
                                                      }),
                                                      (0, O.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar renglón`,
                                                          onClick: () =>
                                                              P(
                                                                  N.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, O.jsx)(
                                                              u,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, O.jsxs)(c, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              P([
                                                  ...N,
                                                  {
                                                      descripcion: ``,
                                                      cantidad: 1,
                                                      costo_unitario: 0,
                                                      fuente_financiamiento_id:
                                                          null,
                                                  },
                                              ]),
                                          children: [
                                              (0, O.jsx)(l, {}),
                                              `Agregar renglón`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, O.jsxs)(v, {
                          children: [
                              (0, O.jsx)(g, {
                                  children: (0, O.jsx)(h, {
                                      children: `Indicadores y metas`,
                                  }),
                              }),
                              (0, O.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      (0, O.jsx)(`p`, {
                                          className: `text-xs text-muted-foreground`,
                                          children: `El indicador se asocia al proyecto cuando se le fija una meta.`,
                                      }),
                                      i.indicadores.map((e, t) => {
                                          let r = n.indicadores.find(
                                              (t) => t.indicador_id === e.valor,
                                          );
                                          return (0, O.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_7rem_7rem]`,
                                                  children: [
                                                      (0, O.jsx)(`input`, {
                                                          type: `hidden`,
                                                          name: `indicadores[${t}][indicador_id]`,
                                                          value: e.valor,
                                                      }),
                                                      (0, O.jsxs)(y, {
                                                          htmlFor: `meta-${e.valor}`,
                                                          children: [
                                                              e.nombre,
                                                              (0, O.jsx)(
                                                                  `span`,
                                                                  {
                                                                      className: `block text-xs font-normal text-muted-foreground`,
                                                                      children:
                                                                          e.unidad_medida,
                                                                  },
                                                              ),
                                                          ],
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          name: `indicadores[${t}][linea_base]`,
                                                          type: `number`,
                                                          step: `0.01`,
                                                          placeholder: `Línea base`,
                                                          'aria-label': `Línea base`,
                                                          defaultValue:
                                                              r?.linea_base ??
                                                              ``,
                                                      }),
                                                      (0, O.jsx)(d, {
                                                          id: `meta-${e.valor}`,
                                                          name: `indicadores[${t}][meta]`,
                                                          type: `number`,
                                                          step: `0.01`,
                                                          placeholder: `Meta`,
                                                          defaultValue:
                                                              r?.meta ?? ``,
                                                      }),
                                                  ],
                                              },
                                              e.valor,
                                          );
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, O.jsxs)(c, {
                          type: `submit`,
                          disabled: t,
                          children: [
                              t && (0, O.jsx)(b, {}),
                              `Guardar formulación`,
                          ],
                      }),
                  ],
              });
          }),
          (t[15] = w),
          (t[16] = A),
          (t[17] = o),
          (t[18] = i.fuentes),
          (t[19] = i.indicadores),
          (t[20] = i.responsables),
          (t[21] = N),
          (t[22] = n.indicadores),
          (t[23] = V))
        : (V = t[23]);
    let H;
    t[24] !== V || t[25] !== z
        ? ((H = (0, O.jsx)(r, {
              ...z,
              options: B,
              className: `max-w-4xl space-y-6`,
              children: V,
          })),
          (t[24] = V),
          (t[25] = z),
          (t[26] = H))
        : (H = t[26]);
    let U;
    t[27] !== H || t[28] !== R
        ? ((U = (0, O.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [R, H],
          })),
          (t[27] = H),
          (t[28] = R),
          (t[29] = U))
        : (U = t[29]);
    let W;
    return (
        t[30] !== U || t[31] !== I
            ? ((W = (0, O.jsxs)(O.Fragment, { children: [I, U] })),
              (t[30] = U),
              (t[31] = I),
              (t[32] = W))
            : (W = t[32]),
        W
    );
}
j.layout = { breadcrumbs: [{ title: `Proyectos`, href: f() }] };
export { j as default };
