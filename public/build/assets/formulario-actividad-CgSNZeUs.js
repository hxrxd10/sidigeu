import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    h as n,
    l as r,
    n as i,
    s as a,
    t as o,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { a as c, i as l, n as u, r as d, t as f } from './select-hxeu1kQ_.js';
import { Tt as p } from './app-Bu9EFUG6.js';
import { t as m } from './input-error-Bxj_sbd5.js';
import { t as h } from './label-D0AQUEbO.js';
import { t as g } from './spinner-DtbIIn34.js';
import { t as _ } from './textarea-DtbS5QwL.js';
import { t as v } from './checkbox-Dz5nVKQg.js';
var y = (e) => ({ url: y.url(e), method: `get` });
((y.definition = { methods: [`get`, `head`], url: `/actividades` }),
    (y.url = (e) => y.definition.url + i(e)),
    (y.get = (e) => ({ url: y.url(e), method: `get` })),
    (y.head = (e) => ({ url: y.url(e), method: `head` })));
var b = (e) => ({ action: y.url(e), method: `get` });
((b.get = (e) => ({ action: y.url(e), method: `get` })),
    (b.head = (e) => ({
        action: y.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (y.form = b));
var x = (e) => ({ url: x.url(e), method: `get` });
((x.definition = { methods: [`get`, `head`], url: `/actividades/nueva` }),
    (x.url = (e) => x.definition.url + i(e)),
    (x.get = (e) => ({ url: x.url(e), method: `get` })),
    (x.head = (e) => ({ url: x.url(e), method: `head` })));
var S = (e) => ({ action: x.url(e), method: `get` });
((S.get = (e) => ({ action: x.url(e), method: `get` })),
    (S.head = (e) => ({
        action: x.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (x.form = S));
var C = (e) => ({ url: C.url(e), method: `post` });
((C.definition = { methods: [`post`], url: `/actividades` }),
    (C.url = (e) => C.definition.url + i(e)),
    (C.post = (e) => ({ url: C.url(e), method: `post` })));
var w = (e) => ({ action: C.url(e), method: `post` });
((w.post = (e) => ({ action: C.url(e), method: `post` })), (C.form = w));
var T = (e, t) => ({ url: T.url(e, t), method: `get` });
((T.definition = { methods: [`get`, `head`], url: `/actividades/{actividad}` }),
    (T.url = (e, t) => {
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
            T.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (T.get = (e, t) => ({ url: T.url(e, t), method: `get` })),
    (T.head = (e, t) => ({ url: T.url(e, t), method: `head` })));
var E = (e, t) => ({ action: T.url(e, t), method: `get` });
((E.get = (e, t) => ({ action: T.url(e, t), method: `get` })),
    (E.head = (e, t) => ({
        action: T.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (T.form = E));
var D = (e, t) => ({ url: D.url(e, t), method: `get` });
((D.definition = {
    methods: [`get`, `head`],
    url: `/actividades/{actividad}/editar`,
}),
    (D.url = (e, t) => {
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
            D.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (D.get = (e, t) => ({ url: D.url(e, t), method: `get` })),
    (D.head = (e, t) => ({ url: D.url(e, t), method: `head` })));
var O = (e, t) => ({ action: D.url(e, t), method: `get` });
((O.get = (e, t) => ({ action: D.url(e, t), method: `get` })),
    (O.head = (e, t) => ({
        action: D.url(e, {
            [t?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(t?.query ?? t?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (D.form = O));
var k = (e, t) => ({ url: k.url(e, t), method: `put` });
((k.definition = { methods: [`put`], url: `/actividades/{actividad}` }),
    (k.url = (e, t) => {
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
            k.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (k.put = (e, t) => ({ url: k.url(e, t), method: `put` })));
var A = (e, t) => ({
    action: k.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((A.put = (e, t) => ({
    action: k.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `PUT`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (k.form = A));
var j = (e, t) => ({ url: j.url(e, t), method: `delete` });
((j.definition = { methods: [`delete`], url: `/actividades/{actividad}` }),
    (j.url = (e, t) => {
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
            j.definition.url
                .replace(`{actividad}`, n.actividad.toString())
                .replace(/\/+$/, ``) + i(t)
        );
    }),
    (j.delete = (e, t) => ({ url: j.url(e, t), method: `delete` })));
var M = (e, t) => ({
    action: j.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
});
((M.delete = (e, t) => ({
    action: j.url(e, {
        [t?.mergeQuery ? `mergeQuery` : `query`]: {
            _method: `DELETE`,
            ...(t?.query ?? t?.mergeQuery ?? {}),
        },
    }),
    method: `post`,
})),
    (j.form = M));
var N = {
        index: y,
        create: x,
        store: C,
        show: T,
        edit: D,
        update: k,
        destroy: j,
    },
    P = t(),
    F = e(n(), 1),
    I = a(),
    L = `sin-espacio`,
    R = `sin-responsable`;
function z(e) {
    let t = (0, P.c)(15),
        { accion: n, actividad: i, opciones: a, textoBoton: o } = e,
        [y, b] = (0, F.useState)(i?.espacio_id ? String(i.espacio_id) : L),
        x = y !== L,
        S;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = { preserveScroll: !0 }), (t[0] = S))
        : (S = t[0]);
    let C;
    t[1] !== i ||
    t[2] !== y ||
    t[3] !== a.espacios ||
    t[4] !== a.indicadores ||
    t[5] !== a.lineas ||
    t[6] !== a.publicos ||
    t[7] !== a.responsables ||
    t[8] !== a.tipos ||
    t[9] !== o ||
    t[10] !== x
        ? ((C = (e) => {
              let { processing: t, errors: n } = e;
              return (0, I.jsxs)(I.Fragment, {
                  children: [
                      (0, I.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, I.jsx)(h, {
                                  htmlFor: `nombre`,
                                  children: `Nombre de la actividad`,
                              }),
                              (0, I.jsx)(p, {
                                  id: `nombre`,
                                  name: `nombre`,
                                  required: !0,
                                  defaultValue: i?.nombre,
                              }),
                              (0, I.jsx)(m, { message: n.nombre }),
                          ],
                      }),
                      (0, I.jsxs)(`div`, {
                          className: `grid gap-6 sm:grid-cols-3`,
                          children: [
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `fecha`,
                                          children: `Fecha`,
                                      }),
                                      (0, I.jsx)(p, {
                                          id: `fecha`,
                                          name: `fecha`,
                                          type: `date`,
                                          required: !0,
                                          defaultValue: i?.fecha,
                                      }),
                                      (0, I.jsx)(m, { message: n.fecha }),
                                  ],
                              }),
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `hora_inicio`,
                                          children: `Hora de inicio`,
                                      }),
                                      (0, I.jsx)(p, {
                                          id: `hora_inicio`,
                                          name: `hora_inicio`,
                                          type: `time`,
                                          defaultValue: i?.hora_inicio ?? ``,
                                      }),
                                      (0, I.jsx)(m, { message: n.hora_inicio }),
                                  ],
                              }),
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `hora_fin`,
                                          children: `Hora de finalización`,
                                      }),
                                      (0, I.jsx)(p, {
                                          id: `hora_fin`,
                                          name: `hora_fin`,
                                          type: `time`,
                                          defaultValue: i?.hora_fin ?? ``,
                                      }),
                                      (0, I.jsx)(m, { message: n.hora_fin }),
                                  ],
                              }),
                          ],
                      }),
                      (0, I.jsxs)(`div`, {
                          className: `grid gap-6 sm:grid-cols-2`,
                          children: [
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `espacio_id`,
                                          children: `Espacio de la DIGEU`,
                                      }),
                                      (0, I.jsxs)(f, {
                                          name: `espacio_id`,
                                          value: y,
                                          onValueChange: b,
                                          children: [
                                              (0, I.jsx)(l, {
                                                  id: `espacio_id`,
                                                  children: (0, I.jsx)(c, {
                                                      placeholder: `Sin espacio`,
                                                  }),
                                              }),
                                              (0, I.jsxs)(u, {
                                                  children: [
                                                      (0, I.jsx)(d, {
                                                          value: L,
                                                          children: `Lugar externo`,
                                                      }),
                                                      a.espacios.map(U),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, I.jsx)(`p`, {
                                          className: `text-xs text-muted-foreground`,
                                          children: `Al elegir un espacio se reserva el horario en el calendario de ocupación.`,
                                      }),
                                      (0, I.jsx)(m, { message: n.espacio_id }),
                                  ],
                              }),
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `lugar_externo`,
                                          children: `Lugar externo`,
                                      }),
                                      (0, I.jsx)(p, {
                                          id: `lugar_externo`,
                                          name: `lugar_externo`,
                                          disabled: x,
                                          defaultValue: i?.lugar_externo ?? ``,
                                          placeholder: `Dirección o referencia`,
                                      }),
                                      (0, I.jsx)(m, {
                                          message: n.lugar_externo,
                                      }),
                                  ],
                              }),
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `tipo_actividad_id`,
                                          children: `Tipo de actividad`,
                                      }),
                                      (0, I.jsxs)(f, {
                                          name: `tipo_actividad_id`,
                                          defaultValue: i
                                              ? String(i.tipo_actividad_id)
                                              : void 0,
                                          children: [
                                              (0, I.jsx)(l, {
                                                  id: `tipo_actividad_id`,
                                                  children: (0, I.jsx)(c, {
                                                      placeholder: `Seleccione`,
                                                  }),
                                              }),
                                              (0, I.jsx)(u, {
                                                  children: a.tipos.map(H),
                                              }),
                                          ],
                                      }),
                                      (0, I.jsx)(m, {
                                          message: n.tipo_actividad_id,
                                      }),
                                  ],
                              }),
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `linea_accion_id`,
                                          children: `Línea de acción`,
                                      }),
                                      (0, I.jsxs)(f, {
                                          name: `linea_accion_id`,
                                          defaultValue: i
                                              ? String(i.linea_accion_id)
                                              : void 0,
                                          children: [
                                              (0, I.jsx)(l, {
                                                  id: `linea_accion_id`,
                                                  children: (0, I.jsx)(c, {
                                                      placeholder: `Seleccione`,
                                                  }),
                                              }),
                                              (0, I.jsx)(u, {
                                                  children: a.lineas.map(V),
                                              }),
                                          ],
                                      }),
                                      (0, I.jsx)(m, {
                                          message: n.linea_accion_id,
                                      }),
                                  ],
                              }),
                              (0, I.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, I.jsx)(h, {
                                          htmlFor: `responsable_id`,
                                          children: `Responsable`,
                                      }),
                                      (0, I.jsxs)(f, {
                                          name: `responsable_id`,
                                          defaultValue: i?.responsable_id
                                              ? String(i.responsable_id)
                                              : R,
                                          children: [
                                              (0, I.jsx)(l, {
                                                  id: `responsable_id`,
                                                  children: (0, I.jsx)(c, {
                                                      placeholder: `Sin responsable`,
                                                  }),
                                              }),
                                              (0, I.jsxs)(u, {
                                                  children: [
                                                      (0, I.jsx)(d, {
                                                          value: R,
                                                          children: `Sin responsable asignado`,
                                                      }),
                                                      a.responsables.map(B),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, I.jsx)(m, {
                                          message: n.responsable_id,
                                      }),
                                  ],
                              }),
                          ],
                      }),
                      (0, I.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, I.jsx)(h, {
                                  htmlFor: `descripcion`,
                                  children: `Descripción (opcional)`,
                              }),
                              (0, I.jsx)(_, {
                                  id: `descripcion`,
                                  name: `descripcion`,
                                  rows: 3,
                                  defaultValue: i?.descripcion ?? ``,
                              }),
                              (0, I.jsx)(m, { message: n.descripcion }),
                          ],
                      }),
                      (0, I.jsxs)(`fieldset`, {
                          className: `grid gap-3`,
                          children: [
                              (0, I.jsx)(`legend`, {
                                  className: `mb-1 text-sm font-medium`,
                                  children: `Público objetivo`,
                              }),
                              (0, I.jsx)(`div`, {
                                  className: `grid gap-2 sm:grid-cols-2`,
                                  children: a.publicos.map((e) =>
                                      (0, I.jsxs)(
                                          `div`,
                                          {
                                              className: `flex items-center gap-3`,
                                              children: [
                                                  (0, I.jsx)(v, {
                                                      id: `publico-${e.valor}`,
                                                      name: `publicos[]`,
                                                      value: e.valor,
                                                      defaultChecked:
                                                          i?.publicos.includes(
                                                              e.valor,
                                                          ),
                                                  }),
                                                  (0, I.jsx)(h, {
                                                      htmlFor: `publico-${e.valor}`,
                                                      children: e.nombre,
                                                  }),
                                              ],
                                          },
                                          e.valor,
                                      ),
                                  ),
                              }),
                          ],
                      }),
                      (0, I.jsxs)(`fieldset`, {
                          className: `grid gap-3`,
                          children: [
                              (0, I.jsx)(`legend`, {
                                  className: `mb-1 text-sm font-medium`,
                                  children: `Indicadores y metas`,
                              }),
                              (0, I.jsx)(`p`, {
                                  className: `-mt-2 text-xs text-muted-foreground`,
                                  children: `Escriba la meta del indicador para asociarlo a la actividad; los que queden en blanco no se asocian.`,
                              }),
                              a.indicadores.map((e, t) => {
                                  let n = i?.indicadores.find(
                                      (t) => t.indicador_id === e.valor,
                                  );
                                  return (0, I.jsxs)(
                                      `div`,
                                      {
                                          className: `flex items-center gap-3`,
                                          children: [
                                              (0, I.jsx)(`input`, {
                                                  type: `hidden`,
                                                  name: `indicadores[${t}][indicador_id]`,
                                                  value: e.valor,
                                              }),
                                              (0, I.jsxs)(h, {
                                                  htmlFor: `meta-${e.valor}`,
                                                  className: `flex-1`,
                                                  children: [
                                                      e.nombre,
                                                      (0, I.jsx)(`span`, {
                                                          className: `block text-xs font-normal text-muted-foreground`,
                                                          children:
                                                              e.unidad_medida,
                                                      }),
                                                  ],
                                              }),
                                              (0, I.jsx)(p, {
                                                  id: `meta-${e.valor}`,
                                                  name: `indicadores[${t}][valor_meta]`,
                                                  type: `number`,
                                                  min: 0,
                                                  step: `0.01`,
                                                  className: `w-28`,
                                                  placeholder: `Meta`,
                                                  defaultValue:
                                                      n?.valor_meta ?? ``,
                                              }),
                                          ],
                                      },
                                      e.valor,
                                  );
                              }),
                              (0, I.jsx)(m, { message: n.indicadores }),
                          ],
                      }),
                      (0, I.jsxs)(`div`, {
                          className: `flex items-center gap-3`,
                          children: [
                              (0, I.jsx)(v, {
                                  id: `publicar_agenda`,
                                  name: `publicar_agenda`,
                                  defaultChecked: i?.publicar_agenda ?? !1,
                              }),
                              (0, I.jsx)(h, {
                                  htmlFor: `publicar_agenda`,
                                  children: `Publicar en la Agenda Cultural al validarse`,
                              }),
                          ],
                      }),
                      (0, I.jsxs)(s, {
                          type: `submit`,
                          disabled: t,
                          children: [t && (0, I.jsx)(g, {}), o],
                      }),
                  ],
              });
          }),
          (t[1] = i),
          (t[2] = y),
          (t[3] = a.espacios),
          (t[4] = a.indicadores),
          (t[5] = a.lineas),
          (t[6] = a.publicos),
          (t[7] = a.responsables),
          (t[8] = a.tipos),
          (t[9] = o),
          (t[10] = x),
          (t[11] = C))
        : (C = t[11]);
    let w;
    return (
        t[12] !== n || t[13] !== C
            ? ((w = (0, I.jsx)(r, {
                  ...n,
                  options: S,
                  className: `max-w-3xl space-y-6`,
                  children: C,
              })),
              (t[12] = n),
              (t[13] = C),
              (t[14] = w))
            : (w = t[14]),
        w
    );
}
function B(e) {
    return (0, I.jsx)(
        d,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function V(e) {
    return (0, I.jsx)(
        d,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function H(e) {
    return (0, I.jsx)(
        d,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function U(e) {
    return (0, I.jsx)(
        d,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
export { N as n, z as t };
