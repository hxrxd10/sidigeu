import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import { c as t, h as n, l as r, s as i } from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { a as o, i as s, n as c, r as l, t as u } from './select-hxeu1kQ_.js';
import { Tt as d } from './app-Bu9EFUG6.js';
import { t as f } from './input-error-Bxj_sbd5.js';
import { t as p } from './label-D0AQUEbO.js';
import { t as m } from './spinner-DtbIIn34.js';
import { t as h } from './textarea-DtbS5QwL.js';
var g = t(),
    _ = e(n(), 1),
    v = i(),
    y = `sin-agrupacion`;
function b(e) {
    let t = (0, g.c)(25),
        { accion: n, persona: i, opciones: b, textoBoton: E } = e,
        [D, O] = (0, _.useState)(i?.tipo ?? b.tipos[0]?.valor ?? ``),
        k;
    t[0] !== b.paises || t[1] !== i
        ? ((k = i?.pais_id
              ? String(i.pais_id)
              : String(b.paises.find(T)?.valor ?? ``)),
          (t[0] = b.paises),
          (t[1] = i),
          (t[2] = k))
        : (k = t[2]);
    let [A, j] = (0, _.useState)(k),
        M;
    if (t[3] !== b.disciplinas || t[4] !== D) {
        let e;
        (t[6] === D
            ? (e = t[7])
            : ((e = (e) => e.tipo === D), (t[6] = D), (t[7] = e)),
            (M = b.disciplinas.filter(e)),
            (t[3] = b.disciplinas),
            (t[4] = D),
            (t[5] = M));
    } else M = t[5];
    let N = M,
        P;
    t[8] !== b.paises || t[9] !== A
        ? ((P = b.paises.find((e) => String(e.valor) === A)?.codigo),
          (t[8] = b.paises),
          (t[9] = A),
          (t[10] = P))
        : (P = t[10]);
    let F = P === `GT`,
        I;
    t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((I = { preserveScroll: !0 }), (t[11] = I))
        : (I = t[11]);
    let L;
    t[12] !== N ||
    t[13] !== F ||
    t[14] !== b.agrupaciones ||
    t[15] !== b.paises ||
    t[16] !== b.tipos ||
    t[17] !== A ||
    t[18] !== i ||
    t[19] !== E ||
    t[20] !== D
        ? ((L = (e) => {
              let { processing: t, errors: n } = e;
              return (0, v.jsxs)(v.Fragment, {
                  children: [
                      (0, v.jsxs)(`div`, {
                          className: `grid gap-6 sm:grid-cols-2`,
                          children: [
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `tipo`,
                                          children: `Tipo`,
                                      }),
                                      (0, v.jsxs)(u, {
                                          name: `tipo`,
                                          value: D,
                                          onValueChange: O,
                                          children: [
                                              (0, v.jsx)(s, {
                                                  id: `tipo`,
                                                  children: (0, v.jsx)(o, {
                                                      placeholder: `Seleccione`,
                                                  }),
                                              }),
                                              (0, v.jsx)(c, {
                                                  children: b.tipos.map(w),
                                              }),
                                          ],
                                      }),
                                      (0, v.jsx)(f, { message: n.tipo }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `disciplina_id`,
                                          children: `Disciplina`,
                                      }),
                                      (0, v.jsxs)(
                                          u,
                                          {
                                              name: `disciplina_id`,
                                              defaultValue: i?.disciplina_id
                                                  ? String(i.disciplina_id)
                                                  : void 0,
                                              children: [
                                                  (0, v.jsx)(s, {
                                                      id: `disciplina_id`,
                                                      children: (0, v.jsx)(o, {
                                                          placeholder: `Seleccione una disciplina`,
                                                      }),
                                                  }),
                                                  (0, v.jsx)(c, {
                                                      children: N.map(C),
                                                  }),
                                              ],
                                          },
                                          `disciplina-${D}`,
                                      ),
                                      (0, v.jsx)(f, {
                                          message: n.disciplina_id,
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `nombres`,
                                          children: `Nombres`,
                                      }),
                                      (0, v.jsx)(d, {
                                          id: `nombres`,
                                          name: `nombres`,
                                          required: !0,
                                          defaultValue: i?.nombres,
                                      }),
                                      (0, v.jsx)(f, { message: n.nombres }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `apellidos`,
                                          children: `Apellidos`,
                                      }),
                                      (0, v.jsx)(d, {
                                          id: `apellidos`,
                                          name: `apellidos`,
                                          required: !0,
                                          defaultValue: i?.apellidos,
                                      }),
                                      (0, v.jsx)(f, { message: n.apellidos }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `pais_id`,
                                          children: `Nacionalidad`,
                                      }),
                                      (0, v.jsxs)(u, {
                                          name: `pais_id`,
                                          value: A,
                                          onValueChange: j,
                                          children: [
                                              (0, v.jsx)(s, {
                                                  id: `pais_id`,
                                                  children: (0, v.jsx)(o, {
                                                      placeholder: `Seleccione un país`,
                                                  }),
                                              }),
                                              (0, v.jsx)(c, {
                                                  children: b.paises.map(S),
                                              }),
                                          ],
                                      }),
                                      (0, v.jsx)(f, { message: n.pais_id }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `agrupacion_id`,
                                          children: `Agrupación (opcional)`,
                                      }),
                                      (0, v.jsxs)(u, {
                                          name: `agrupacion_id`,
                                          defaultValue: i?.agrupacion_id
                                              ? String(i.agrupacion_id)
                                              : y,
                                          children: [
                                              (0, v.jsx)(s, {
                                                  id: `agrupacion_id`,
                                                  children: (0, v.jsx)(o, {
                                                      placeholder: `Sin agrupación`,
                                                  }),
                                              }),
                                              (0, v.jsxs)(c, {
                                                  children: [
                                                      (0, v.jsx)(l, {
                                                          value: y,
                                                          children: `Sin agrupación`,
                                                      }),
                                                      b.agrupaciones.map(x),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, v.jsx)(f, {
                                          message: n.agrupacion_id,
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `fecha_nacimiento`,
                                          children: `Fecha de nacimiento`,
                                      }),
                                      (0, v.jsx)(d, {
                                          id: `fecha_nacimiento`,
                                          name: `fecha_nacimiento`,
                                          type: `date`,
                                          required: !0,
                                          defaultValue: i?.fecha_nacimiento,
                                      }),
                                      (0, v.jsx)(f, {
                                          message: n.fecha_nacimiento,
                                      }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsx)(p, {
                                          htmlFor: `fecha_alta`,
                                          children: `Fecha de alta (activo desde)`,
                                      }),
                                      (0, v.jsx)(d, {
                                          id: `fecha_alta`,
                                          name: `fecha_alta`,
                                          type: `date`,
                                          required: !0,
                                          defaultValue: i?.fecha_alta,
                                      }),
                                      (0, v.jsx)(f, { message: n.fecha_alta }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsxs)(p, {
                                          htmlFor: `dpi`,
                                          children: [
                                              `DPI`,
                                              ` `,
                                              F
                                                  ? `(obligatorio)`
                                                  : `(si cuenta con uno)`,
                                          ],
                                      }),
                                      (0, v.jsx)(d, {
                                          id: `dpi`,
                                          name: `dpi`,
                                          inputMode: `numeric`,
                                          maxLength: 13,
                                          defaultValue: i?.dpi ?? ``,
                                          placeholder: `13 dígitos`,
                                      }),
                                      (0, v.jsx)(f, { message: n.dpi }),
                                  ],
                              }),
                              (0, v.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, v.jsxs)(p, {
                                          htmlFor: `pasaporte`,
                                          children: [
                                              `Pasaporte`,
                                              ` `,
                                              F
                                                  ? `(opcional)`
                                                  : `(obligatorio si no tiene DPI)`,
                                          ],
                                      }),
                                      (0, v.jsx)(d, {
                                          id: `pasaporte`,
                                          name: `pasaporte`,
                                          defaultValue: i?.pasaporte ?? ``,
                                      }),
                                      (0, v.jsx)(f, { message: n.pasaporte }),
                                  ],
                              }),
                          ],
                      }),
                      (0, v.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, v.jsx)(p, {
                                  htmlFor: `foto`,
                                  children: `Fotografía`,
                              }),
                              (0, v.jsx)(d, {
                                  id: `foto`,
                                  name: `foto`,
                                  type: `file`,
                                  accept: `image/jpeg,image/png`,
                              }),
                              (0, v.jsx)(`p`, {
                                  className: `text-xs text-muted-foreground`,
                                  children: `JPG o PNG, máximo 2 MB.`,
                              }),
                              i?.foto_url &&
                                  (0, v.jsx)(`img`, {
                                      src: i.foto_url,
                                      alt: i.nombre_completo,
                                      className: `mt-2 size-24 rounded-md object-cover`,
                                  }),
                              (0, v.jsx)(f, { message: n.foto }),
                          ],
                      }),
                      (0, v.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, v.jsx)(p, {
                                  htmlFor: `biografia`,
                                  children: `Biografía (opcional)`,
                              }),
                              (0, v.jsx)(h, {
                                  id: `biografia`,
                                  name: `biografia`,
                                  rows: 5,
                                  defaultValue: i?.biografia ?? ``,
                              }),
                              (0, v.jsx)(f, { message: n.biografia }),
                          ],
                      }),
                      (0, v.jsxs)(a, {
                          type: `submit`,
                          disabled: t,
                          children: [t && (0, v.jsx)(m, {}), E],
                      }),
                  ],
              });
          }),
          (t[12] = N),
          (t[13] = F),
          (t[14] = b.agrupaciones),
          (t[15] = b.paises),
          (t[16] = b.tipos),
          (t[17] = A),
          (t[18] = i),
          (t[19] = E),
          (t[20] = D),
          (t[21] = L))
        : (L = t[21]);
    let R;
    return (
        t[22] !== n || t[23] !== L
            ? ((R = (0, v.jsx)(r, {
                  ...n,
                  options: I,
                  className: `max-w-3xl space-y-6`,
                  children: L,
              })),
              (t[22] = n),
              (t[23] = L),
              (t[24] = R))
            : (R = t[24]),
        R
    );
}
function x(e) {
    return (0, v.jsx)(
        l,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function S(e) {
    return (0, v.jsx)(
        l,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function C(e) {
    return (0, v.jsx)(
        l,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function w(e) {
    return (0, v.jsx)(l, { value: e.valor, children: e.nombre }, e.valor);
}
function T(e) {
    return e.codigo === `GT`;
}
export { b as t };
