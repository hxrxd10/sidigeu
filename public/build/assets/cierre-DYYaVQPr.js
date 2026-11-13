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
import { Tt as d, r as f, rt as p } from './app-Bu9EFUG6.js';
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
    url: `/actividades/{actividad}/cierre`,
}),
    (w.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { actividad: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { actividad: e.id }),
            Array.isArray(e) && (e = { actividad: e[0] }),
            (e = o(e)));
        let n = {
            actividad:
                typeof e.actividad == `object` ? e.actividad.id : e.actividad,
        };
        return (
            w.definition.url
                .replace(`{actividad}`, n.actividad.toString())
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
((E.definition = { methods: [`post`], url: `/actividades/{actividad}/cierre` }),
    (E.url = (e, t) => {
        ((typeof e == `string` || typeof e == `number`) &&
            (e = { actividad: e }),
            typeof e == `object` &&
                !Array.isArray(e) &&
                `id` in e &&
                (e = { actividad: e.id }),
            Array.isArray(e) && (e = { actividad: e[0] }),
            (e = o(e)));
        let n = {
            actividad:
                typeof e.actividad == `object` ? e.actividad.id : e.actividad,
        };
        return (
            E.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (E.post = (e, t) => ({ url: E.url(e, t), method: `post` })));
var D = (e, t) => ({ action: E.url(e, t), method: `post` });
((D.post = (e, t) => ({ action: E.url(e, t), method: `post` })), (E.form = D));
var O = { edit: w, store: E },
    k = a();
function A(e) {
    let t = (0, C.c)(33),
        { actividad: n, opciones: i } = e,
        a;
    t[0] !== n.beneficiarios ||
    t[1] !== i.rangos[0]?.valor ||
    t[2] !== i.sexos[0]?.valor
        ? ((a =
              n.beneficiarios.length > 0
                  ? n.beneficiarios
                  : [
                        {
                            sexo: String(i.sexos[0]?.valor ?? ``),
                            rango_edad: String(i.rangos[0]?.valor ?? ``),
                            tipo_publico: ``,
                            cantidad: ``,
                        },
                    ]),
          (t[0] = n.beneficiarios),
          (t[1] = i.rangos[0]?.valor),
          (t[2] = i.sexos[0]?.valor),
          (t[3] = a))
        : (a = t[3]);
    let [o, p] = (0, S.useState)(a),
        w;
    t[4] === n.participantes
        ? (w = t[5])
        : ((w =
              n.participantes.length > 0
                  ? n.participantes
                  : [
                        {
                            persona_recurso_humano_id: null,
                            nombre_externo: ``,
                            rol: ``,
                        },
                    ]),
          (t[4] = n.participantes),
          (t[5] = w));
    let [T, E] = (0, S.useState)(w),
        D;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = [{ url: ``, descripcion: `` }]), (t[6] = D))
        : (D = t[6]);
    let [A, F] = (0, S.useState)(D),
        I = `Cerrar ${n.nombre}`,
        L;
    t[7] === I
        ? (L = t[8])
        : ((L = (0, k.jsx)(s, { title: I })), (t[7] = I), (t[8] = L));
    let R = `Cierre: ${n.nombre}`,
        z;
    t[9] === R
        ? (z = t[10])
        : ((z = (0, k.jsx)(f, {
              title: R,
              description: `Registre resultados, beneficiarios, participantes, indicadores y evidencias`,
          })),
          (t[9] = R),
          (t[10] = z));
    let B;
    t[11] === n.id
        ? (B = t[12])
        : ((B = O.store.form(n.id)), (t[11] = n.id), (t[12] = B));
    let V;
    t[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = { preserveScroll: !0 }), (t[13] = V))
        : (V = t[13]);
    let H;
    t[14] !== n.indicadores ||
    t[15] !== n.observaciones ||
    t[16] !== n.resultados ||
    t[17] !== o ||
    t[18] !== A ||
    t[19] !== i.personas ||
    t[20] !== i.rangos ||
    t[21] !== i.sexos ||
    t[22] !== T
        ? ((H = (e) => {
              let { processing: t, errors: r } = e;
              return (0, k.jsxs)(k.Fragment, {
                  children: [
                      (0, k.jsxs)(v, {
                          children: [
                              (0, k.jsx)(g, {
                                  children: (0, k.jsx)(h, {
                                      children: `Resultados`,
                                  }),
                              }),
                              (0, k.jsxs)(_, {
                                  className: `space-y-4`,
                                  children: [
                                      (0, k.jsxs)(`div`, {
                                          className: `grid gap-2`,
                                          children: [
                                              (0, k.jsx)(y, {
                                                  htmlFor: `resultados`,
                                                  children: `Resultados alcanzados`,
                                              }),
                                              (0, k.jsx)(x, {
                                                  id: `resultados`,
                                                  name: `resultados`,
                                                  rows: 4,
                                                  required: !0,
                                                  defaultValue:
                                                      n.resultados ?? ``,
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
                                                  htmlFor: `observaciones`,
                                                  children: `Observaciones (opcional)`,
                                              }),
                                              (0, k.jsx)(x, {
                                                  id: `observaciones`,
                                                  name: `observaciones`,
                                                  rows: 3,
                                                  defaultValue:
                                                      n.observaciones ?? ``,
                                              }),
                                              (0, k.jsx)(m, {
                                                  message: r.observaciones,
                                              }),
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, k.jsxs)(v, {
                          children: [
                              (0, k.jsx)(g, {
                                  children: (0, k.jsx)(h, {
                                      children: `Beneficiarios`,
                                  }),
                              }),
                              (0, k.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      o.map((e, t) =>
                                          (0, k.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_1fr_1fr_6rem_auto]`,
                                                  children: [
                                                      (0, k.jsx)(`select`, {
                                                          name: `beneficiarios[${t}][sexo]`,
                                                          defaultValue: e.sexo,
                                                          'aria-label': `Sexo`,
                                                          className: `h-9 rounded-md border border-input bg-transparent px-3 text-sm`,
                                                          children:
                                                              i.sexos.map(P),
                                                      }),
                                                      (0, k.jsx)(`select`, {
                                                          name: `beneficiarios[${t}][rango_edad]`,
                                                          defaultValue:
                                                              e.rango_edad,
                                                          'aria-label': `Rango de edad`,
                                                          className: `h-9 rounded-md border border-input bg-transparent px-3 text-sm`,
                                                          children:
                                                              i.rangos.map(N),
                                                      }),
                                                      (0, k.jsx)(d, {
                                                          name: `beneficiarios[${t}][tipo_publico]`,
                                                          placeholder: `Tipo de público`,
                                                          defaultValue:
                                                              e.tipo_publico ??
                                                              ``,
                                                      }),
                                                      (0, k.jsx)(d, {
                                                          name: `beneficiarios[${t}][cantidad]`,
                                                          type: `number`,
                                                          min: 0,
                                                          placeholder: `Cantidad`,
                                                          defaultValue:
                                                              e.cantidad,
                                                      }),
                                                      (0, k.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar fila`,
                                                          onClick: () =>
                                                              p(
                                                                  o.filter(
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
                                              p([
                                                  ...o,
                                                  {
                                                      sexo: String(
                                                          i.sexos[0]?.valor ??
                                                              ``,
                                                      ),
                                                      rango_edad: String(
                                                          i.rangos[0]?.valor ??
                                                              ``,
                                                      ),
                                                      tipo_publico: ``,
                                                      cantidad: ``,
                                                  },
                                              ]),
                                          children: [
                                              (0, k.jsx)(l, {}),
                                              `Agregar desagregación`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, k.jsxs)(v, {
                          children: [
                              (0, k.jsx)(g, {
                                  children: (0, k.jsx)(h, {
                                      children: `Participantes`,
                                  }),
                              }),
                              (0, k.jsxs)(_, {
                                  className: `space-y-3`,
                                  children: [
                                      T.map((e, t) =>
                                          (0, k.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_1fr_8rem_auto]`,
                                                  children: [
                                                      (0, k.jsxs)(`select`, {
                                                          name: `participantes[${t}][persona_recurso_humano_id]`,
                                                          defaultValue:
                                                              e.persona_recurso_humano_id ??
                                                              ``,
                                                          'aria-label': `Persona del padrón`,
                                                          className: `h-9 rounded-md border border-input bg-transparent px-3 text-sm`,
                                                          children: [
                                                              (0, k.jsx)(
                                                                  `option`,
                                                                  {
                                                                      value: ``,
                                                                      children: `Persona externa`,
                                                                  },
                                                              ),
                                                              i.personas.map(M),
                                                          ],
                                                      }),
                                                      (0, k.jsx)(d, {
                                                          name: `participantes[${t}][nombre_externo]`,
                                                          placeholder: `Nombre (si es externa)`,
                                                          defaultValue:
                                                              e.nombre_externo ??
                                                              ``,
                                                      }),
                                                      (0, k.jsx)(d, {
                                                          name: `participantes[${t}][rol]`,
                                                          placeholder: `Rol`,
                                                          defaultValue:
                                                              e.rol ?? ``,
                                                      }),
                                                      (0, k.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar participante`,
                                                          onClick: () =>
                                                              E(
                                                                  T.filter(
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
                                              E([
                                                  ...T,
                                                  {
                                                      persona_recurso_humano_id:
                                                          null,
                                                      nombre_externo: ``,
                                                      rol: ``,
                                                  },
                                              ]),
                                          children: [
                                              (0, k.jsx)(l, {}),
                                              `Agregar participante`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      n.indicadores.length > 0 &&
                          (0, k.jsxs)(v, {
                              children: [
                                  (0, k.jsx)(g, {
                                      children: (0, k.jsx)(h, {
                                          children: `Indicadores alcanzados`,
                                      }),
                                  }),
                                  (0, k.jsx)(_, {
                                      className: `space-y-3`,
                                      children: n.indicadores.map(j),
                                  }),
                              ],
                          }),
                      (0, k.jsxs)(v, {
                          children: [
                              (0, k.jsx)(g, {
                                  children: (0, k.jsx)(h, {
                                      children: `Evidencias`,
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
                                                  children: `Fotografías y documentos`,
                                              }),
                                              (0, k.jsx)(d, {
                                                  id: `archivos`,
                                                  name: `archivos[]`,
                                                  type: `file`,
                                                  multiple: !0,
                                                  accept: `image/jpeg,image/png,application/pdf,.doc,.docx,.xls,.xlsx`,
                                              }),
                                              (0, k.jsx)(`p`, {
                                                  className: `text-xs text-muted-foreground`,
                                                  children: `Hasta 10 archivos de 10 MB cada uno.`,
                                              }),
                                              (0, k.jsx)(m, {
                                                  message: r.archivos,
                                              }),
                                          ],
                                      }),
                                      A.map((e, t) =>
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
                                                          defaultValue:
                                                              e.descripcion,
                                                      }),
                                                      (0, k.jsx)(c, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar enlace`,
                                                          onClick: () =>
                                                              F(
                                                                  A.filter(
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
                                              F([
                                                  ...A,
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
                          children: [
                              t && (0, k.jsx)(b, {}),
                              `Cerrar actividad`,
                          ],
                      }),
                  ],
              });
          }),
          (t[14] = n.indicadores),
          (t[15] = n.observaciones),
          (t[16] = n.resultados),
          (t[17] = o),
          (t[18] = A),
          (t[19] = i.personas),
          (t[20] = i.rangos),
          (t[21] = i.sexos),
          (t[22] = T),
          (t[23] = H))
        : (H = t[23]);
    let U;
    t[24] !== H || t[25] !== B
        ? ((U = (0, k.jsx)(r, {
              ...B,
              options: V,
              className: `max-w-4xl space-y-6`,
              children: H,
          })),
          (t[24] = H),
          (t[25] = B),
          (t[26] = U))
        : (U = t[26]);
    let W;
    t[27] !== U || t[28] !== z
        ? ((W = (0, k.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [z, U],
          })),
          (t[27] = U),
          (t[28] = z),
          (t[29] = W))
        : (W = t[29]);
    let G;
    return (
        t[30] !== W || t[31] !== L
            ? ((G = (0, k.jsxs)(k.Fragment, { children: [L, W] })),
              (t[30] = W),
              (t[31] = L),
              (t[32] = G))
            : (G = t[32]),
        G
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
                    htmlFor: `alcanzado-${e.indicador_id}`,
                    className: `flex-1`,
                    children: [
                        e.nombre,
                        (0, k.jsxs)(`span`, {
                            className: `block text-xs font-normal text-muted-foreground`,
                            children: [
                                `Meta:`,
                                ` `,
                                e.valor_meta ?? `—`,
                                ` `,
                                e.unidad_medida,
                            ],
                        }),
                    ],
                }),
                (0, k.jsx)(d, {
                    id: `alcanzado-${e.indicador_id}`,
                    name: `indicadores[${t}][valor_alcanzado]`,
                    type: `number`,
                    min: 0,
                    step: `0.01`,
                    className: `w-28`,
                    defaultValue: e.valor_alcanzado ?? ``,
                }),
            ],
        },
        e.indicador_id,
    );
}
function M(e) {
    return (0, k.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
function N(e) {
    return (0, k.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
function P(e) {
    return (0, k.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
A.layout = { breadcrumbs: [{ title: `Actividades`, href: p() }] };
export { A as default };
