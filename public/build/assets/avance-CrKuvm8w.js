import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    h as n,
    l as r,
    s as i,
    u as a,
} from './wayfinder-C8dNLrFV.js';
import { t as o } from './button-BzkMvCJO.js';
import { t as s } from './plus-B2NIGUck.js';
import { t as c } from './trash-2-_Kz5vj-S.js';
import { Tt as l, q as u, r as d } from './app-Bu9EFUG6.js';
import { t as f } from './input-error-Bxj_sbd5.js';
import { a as p, i as m, n as h, t as g } from './card-Bc3dRGP7.js';
import { t as _ } from './label-D0AQUEbO.js';
import { t as v } from './spinner-DtbIIn34.js';
import { t as y } from './textarea-DtbS5QwL.js';
import { t as b } from './EjecucionProyectoController-Bh4OfGml.js';
var x = t(),
    S = e(n(), 1),
    C = i();
function w(e) {
    let t = (0, x.c)(26),
        { proyecto: n, opciones: i } = e,
        u;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((u = []), (t[0] = u))
        : (u = t[0]);
    let [w, k] = (0, S.useState)(u),
        A;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = [{ url: ``, descripcion: `` }]), (t[1] = A))
        : (A = t[1]);
    let [j, M] = (0, S.useState)(A),
        N = `Avance: ${n.nombre}`,
        P;
    t[2] === N
        ? (P = t[3])
        : ((P = (0, C.jsx)(a, { title: N })), (t[2] = N), (t[3] = P));
    let F = `Avance: ${n.nombre}`,
        I;
    t[4] === F
        ? (I = t[5])
        : ((I = (0, C.jsx)(d, {
              title: F,
              description: `Registre el avance del período, el cronograma y el presupuesto ejecutado`,
          })),
          (t[4] = F),
          (t[5] = I));
    let L;
    t[6] === n.id
        ? (L = t[7])
        : ((L = b.store.form(n.id)), (t[6] = n.id), (t[7] = L));
    let R;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((R = { preserveScroll: !0 }), (t[8] = R))
        : (R = t[8]);
    let z;
    t[9] !== j ||
    t[10] !== i.personas ||
    t[11] !== i.tipos ||
    t[12] !== n.avance_fisico ||
    t[13] !== n.cronograma ||
    t[14] !== n.presupuesto ||
    t[15] !== w
        ? ((z = (e) => {
              let { processing: t, errors: r } = e;
              return (0, C.jsxs)(C.Fragment, {
                  children: [
                      (0, C.jsxs)(g, {
                          children: [
                              (0, C.jsx)(m, {
                                  children: (0, C.jsx)(p, {
                                      children: `Avance del período`,
                                  }),
                              }),
                              (0, C.jsxs)(h, {
                                  className: `space-y-4`,
                                  children: [
                                      (0, C.jsxs)(`div`, {
                                          className: `grid gap-4 sm:grid-cols-2`,
                                          children: [
                                              (0, C.jsxs)(`div`, {
                                                  className: `grid gap-2`,
                                                  children: [
                                                      (0, C.jsx)(_, {
                                                          htmlFor: `fecha`,
                                                          children: `Fecha`,
                                                      }),
                                                      (0, C.jsx)(l, {
                                                          id: `fecha`,
                                                          name: `fecha`,
                                                          type: `date`,
                                                          required: !0,
                                                      }),
                                                      (0, C.jsx)(f, {
                                                          message: r.fecha,
                                                      }),
                                                  ],
                                              }),
                                              (0, C.jsxs)(`div`, {
                                                  className: `grid gap-2`,
                                                  children: [
                                                      (0, C.jsx)(_, {
                                                          htmlFor: `porcentaje`,
                                                          children: `Porcentaje de avance`,
                                                      }),
                                                      (0, C.jsx)(l, {
                                                          id: `porcentaje`,
                                                          name: `porcentaje`,
                                                          type: `number`,
                                                          min: 0,
                                                          max: 100,
                                                          required: !0,
                                                          defaultValue:
                                                              n.avance_fisico,
                                                      }),
                                                      (0, C.jsx)(f, {
                                                          message: r.porcentaje,
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, C.jsxs)(`div`, {
                                          className: `grid gap-2`,
                                          children: [
                                              (0, C.jsx)(_, {
                                                  htmlFor: `descripcion`,
                                                  children: `Descripción del avance`,
                                              }),
                                              (0, C.jsx)(y, {
                                                  id: `descripcion`,
                                                  name: `descripcion`,
                                                  rows: 4,
                                                  required: !0,
                                              }),
                                              (0, C.jsx)(f, {
                                                  message: r.descripcion,
                                              }),
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      n.cronograma.length > 0 &&
                          (0, C.jsxs)(g, {
                              children: [
                                  (0, C.jsx)(m, {
                                      children: (0, C.jsx)(p, {
                                          children: `Avance del cronograma`,
                                      }),
                                  }),
                                  (0, C.jsx)(h, {
                                      className: `space-y-3`,
                                      children: n.cronograma.map(O),
                                  }),
                              ],
                          }),
                      n.presupuesto.length > 0 &&
                          (0, C.jsxs)(g, {
                              children: [
                                  (0, C.jsx)(m, {
                                      children: (0, C.jsx)(p, {
                                          children: `Presupuesto ejecutado`,
                                      }),
                                  }),
                                  (0, C.jsx)(h, {
                                      className: `space-y-3`,
                                      children: n.presupuesto.map(D),
                                  }),
                              ],
                          }),
                      (0, C.jsxs)(g, {
                          children: [
                              (0, C.jsx)(m, {
                                  children: (0, C.jsx)(p, {
                                      children: `Recursos ejecutados`,
                                  }),
                              }),
                              (0, C.jsxs)(h, {
                                  className: `space-y-3`,
                                  children: [
                                      w.map((e, t) =>
                                          (0, C.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[8rem_1fr_1fr_6rem_7rem_auto]`,
                                                  children: [
                                                      (0, C.jsx)(`select`, {
                                                          name: `recursos[${t}][tipo]`,
                                                          defaultValue: e.tipo,
                                                          'aria-label': `Tipo de recurso`,
                                                          className: `h-9 rounded-md border border-input bg-transparent px-3 text-sm`,
                                                          children:
                                                              i.tipos.map(E),
                                                      }),
                                                      (0, C.jsxs)(`select`, {
                                                          name: `recursos[${t}][persona_recurso_humano_id]`,
                                                          'aria-label': `Persona del padrón`,
                                                          className: `h-9 rounded-md border border-input bg-transparent px-3 text-sm`,
                                                          children: [
                                                              (0, C.jsx)(
                                                                  `option`,
                                                                  {
                                                                      value: ``,
                                                                      children: `Sin persona del padrón`,
                                                                  },
                                                              ),
                                                              i.personas.map(T),
                                                          ],
                                                      }),
                                                      (0, C.jsx)(l, {
                                                          name: `recursos[${t}][descripcion]`,
                                                          placeholder: `Descripción`,
                                                          'aria-label': `Descripción del recurso`,
                                                      }),
                                                      (0, C.jsx)(l, {
                                                          name: `recursos[${t}][cantidad]`,
                                                          type: `number`,
                                                          min: 0,
                                                          step: `0.01`,
                                                          defaultValue: 1,
                                                          'aria-label': `Cantidad`,
                                                      }),
                                                      (0, C.jsx)(l, {
                                                          name: `recursos[${t}][costo]`,
                                                          type: `number`,
                                                          min: 0,
                                                          step: `0.01`,
                                                          defaultValue: 0,
                                                          'aria-label': `Costo`,
                                                      }),
                                                      (0, C.jsx)(o, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar recurso`,
                                                          onClick: () =>
                                                              k(
                                                                  w.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, C.jsx)(
                                                              c,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, C.jsxs)(o, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              k([
                                                  ...w,
                                                  {
                                                      tipo:
                                                          i.tipos[0]?.valor ??
                                                          `humano`,
                                                      persona_recurso_humano_id: ``,
                                                      descripcion: ``,
                                                      cantidad: 1,
                                                      costo: 0,
                                                  },
                                              ]),
                                          children: [
                                              (0, C.jsx)(s, {}),
                                              `Agregar recurso`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, C.jsxs)(g, {
                          children: [
                              (0, C.jsx)(m, {
                                  children: (0, C.jsx)(p, {
                                      children: `Evidencias`,
                                  }),
                              }),
                              (0, C.jsxs)(h, {
                                  className: `space-y-4`,
                                  children: [
                                      (0, C.jsxs)(`div`, {
                                          className: `grid gap-2`,
                                          children: [
                                              (0, C.jsx)(_, {
                                                  htmlFor: `archivos`,
                                                  children: `Archivos`,
                                              }),
                                              (0, C.jsx)(l, {
                                                  id: `archivos`,
                                                  name: `archivos[]`,
                                                  type: `file`,
                                                  multiple: !0,
                                                  accept: `image/jpeg,image/png,application/pdf,.doc,.docx,.xls,.xlsx`,
                                              }),
                                              (0, C.jsx)(f, {
                                                  message: r.archivos,
                                              }),
                                          ],
                                      }),
                                      j.map((e, t) =>
                                          (0, C.jsxs)(
                                              `div`,
                                              {
                                                  className: `grid gap-2 sm:grid-cols-[1fr_1fr_auto]`,
                                                  children: [
                                                      (0, C.jsx)(l, {
                                                          name: `enlaces[${t}][url]`,
                                                          type: `url`,
                                                          placeholder: `https://`,
                                                          defaultValue: e.url,
                                                      }),
                                                      (0, C.jsx)(l, {
                                                          name: `enlaces[${t}][descripcion]`,
                                                          placeholder: `Descripción`,
                                                      }),
                                                      (0, C.jsx)(o, {
                                                          type: `button`,
                                                          variant: `ghost`,
                                                          size: `icon`,
                                                          'aria-label': `Quitar enlace`,
                                                          onClick: () =>
                                                              M(
                                                                  j.filter(
                                                                      (e, n) =>
                                                                          n !==
                                                                          t,
                                                                  ),
                                                              ),
                                                          children: (0, C.jsx)(
                                                              c,
                                                              {},
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              t,
                                          ),
                                      ),
                                      (0, C.jsxs)(o, {
                                          type: `button`,
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                              M([
                                                  ...j,
                                                  { url: ``, descripcion: `` },
                                              ]),
                                          children: [
                                              (0, C.jsx)(s, {}),
                                              `Agregar enlace`,
                                          ],
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, C.jsxs)(o, {
                          type: `submit`,
                          disabled: t,
                          children: [t && (0, C.jsx)(v, {}), `Guardar avance`],
                      }),
                  ],
              });
          }),
          (t[9] = j),
          (t[10] = i.personas),
          (t[11] = i.tipos),
          (t[12] = n.avance_fisico),
          (t[13] = n.cronograma),
          (t[14] = n.presupuesto),
          (t[15] = w),
          (t[16] = z))
        : (z = t[16]);
    let B;
    t[17] !== L || t[18] !== z
        ? ((B = (0, C.jsx)(r, {
              ...L,
              options: R,
              className: `max-w-4xl space-y-6`,
              children: z,
          })),
          (t[17] = L),
          (t[18] = z),
          (t[19] = B))
        : (B = t[19]);
    let V;
    t[20] !== B || t[21] !== I
        ? ((V = (0, C.jsxs)(`div`, {
              className: `space-y-6 px-4 py-6`,
              children: [I, B],
          })),
          (t[20] = B),
          (t[21] = I),
          (t[22] = V))
        : (V = t[22]);
    let H;
    return (
        t[23] !== V || t[24] !== P
            ? ((H = (0, C.jsxs)(C.Fragment, { children: [P, V] })),
              (t[23] = V),
              (t[24] = P),
              (t[25] = H))
            : (H = t[25]),
        H
    );
}
function T(e) {
    return (0, C.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
function E(e) {
    return (0, C.jsx)(
        `option`,
        { value: e.valor, children: e.nombre },
        e.valor,
    );
}
function D(e, t) {
    return (0, C.jsxs)(
        `div`,
        {
            className: `flex items-center gap-3`,
            children: [
                (0, C.jsx)(`input`, {
                    type: `hidden`,
                    name: `renglones[${t}][id]`,
                    value: e.id,
                }),
                (0, C.jsxs)(_, {
                    htmlFor: `renglon-${e.id}`,
                    className: `flex-1`,
                    children: [
                        e.descripcion,
                        (0, C.jsxs)(`span`, {
                            className: `block text-xs font-normal text-muted-foreground`,
                            children: [`Presupuestado: Q`, e.subtotal],
                        }),
                    ],
                }),
                (0, C.jsx)(l, {
                    id: `renglon-${e.id}`,
                    name: `renglones[${t}][ejecutado]`,
                    type: `number`,
                    min: 0,
                    step: `0.01`,
                    className: `w-32`,
                    defaultValue: e.ejecutado,
                }),
            ],
        },
        e.id,
    );
}
function O(e, t) {
    return (0, C.jsxs)(
        `div`,
        {
            className: `flex items-center gap-3`,
            children: [
                (0, C.jsx)(`input`, {
                    type: `hidden`,
                    name: `tareas[${t}][id]`,
                    value: e.id,
                }),
                (0, C.jsxs)(_, {
                    htmlFor: `tarea-${e.id}`,
                    className: `flex-1`,
                    children: [
                        e.tarea,
                        e.responsable &&
                            (0, C.jsx)(`span`, {
                                className: `block text-xs font-normal text-muted-foreground`,
                                children: e.responsable,
                            }),
                    ],
                }),
                (0, C.jsx)(l, {
                    id: `tarea-${e.id}`,
                    name: `tareas[${t}][avance]`,
                    type: `number`,
                    min: 0,
                    max: 100,
                    className: `w-24`,
                    defaultValue: e.avance,
                }),
            ],
        },
        e.id,
    );
}
w.layout = { breadcrumbs: [{ title: `Proyectos`, href: u() }] };
export { w as default };
