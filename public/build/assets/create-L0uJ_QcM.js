import { c as e, l as t, n, s as r, u as i } from './wayfinder-C8dNLrFV.js';
import { t as a } from './button-BzkMvCJO.js';
import { a as o, i as s, n as c, r as l, t as u } from './select-hxeu1kQ_.js';
import { Tt as d } from './app-Bu9EFUG6.js';
import { t as f } from './input-error-Bxj_sbd5.js';
import { n as p, t as m } from './card-Bc3dRGP7.js';
import { t as h } from './label-D0AQUEbO.js';
import { t as g } from './spinner-DtbIIn34.js';
import { t as _ } from './textarea-DtbS5QwL.js';
var v = e(),
    y = (e) => ({ url: y.url(e), method: `get` });
((y.definition = { methods: [`get`, `head`], url: `/solicitud-espacio` }),
    (y.url = (e) => y.definition.url + n(e)),
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
var x = (e) => ({ url: x.url(e), method: `post` });
((x.definition = { methods: [`post`], url: `/solicitud-espacio` }),
    (x.url = (e) => x.definition.url + n(e)),
    (x.post = (e) => ({ url: x.url(e), method: `post` })));
var S = (e) => ({ action: x.url(e), method: `post` });
((S.post = (e) => ({ action: x.url(e), method: `post` })), (x.form = S));
var C = (e) => ({ url: C.url(e), method: `get` });
((C.definition = {
    methods: [`get`, `head`],
    url: `/solicitud-espacio/enviada`,
}),
    (C.url = (e) => C.definition.url + n(e)),
    (C.get = (e) => ({ url: C.url(e), method: `get` })),
    (C.head = (e) => ({ url: C.url(e), method: `head` })));
var w = (e) => ({ action: C.url(e), method: `get` });
((w.get = (e) => ({ action: C.url(e), method: `get` })),
    (w.head = (e) => ({
        action: C.url({
            [e?.mergeQuery ? `mergeQuery` : `query`]: {
                _method: `HEAD`,
                ...(e?.query ?? e?.mergeQuery ?? {}),
            },
        }),
        method: `get`,
    })),
    (C.form = w));
var T = { create: y, store: x, confirmacion: C },
    E = r();
function D(e) {
    let n = (0, v.c)(8),
        { espacios: r, espacioSeleccionado: l, usuario: y } = e,
        b;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((b = (0, E.jsx)(i, { title: `Solicitar un espacio` })), (n[0] = b))
        : (b = n[0]);
    let x;
    n[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, E.jsxs)(`header`, {
              className: `space-y-2`,
              children: [
                  (0, E.jsx)(`h1`, {
                      className: `text-3xl font-semibold`,
                      children: `Solicitar un espacio`,
                  }),
                  (0, E.jsx)(`p`, {
                      className: `text-muted-foreground`,
                      children: `Indique el espacio, la fecha y el horario que necesita. La solicitud queda pendiente de confirmación y la respuesta le llegará por correo.`,
                  }),
              ],
          })),
          (n[1] = x))
        : (x = n[1]);
    let S;
    n[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((S = T.store.form()), (n[2] = S))
        : (S = n[2]);
    let C;
    return (
        n[3] !== l || n[4] !== r || n[5] !== y?.email || n[6] !== y?.name
            ? ((C = (0, E.jsxs)(E.Fragment, {
                  children: [
                      b,
                      (0, E.jsxs)(`div`, {
                          className: `mx-auto max-w-3xl space-y-6`,
                          children: [
                              x,
                              (0, E.jsx)(m, {
                                  children: (0, E.jsx)(p, {
                                      children: (0, E.jsx)(t, {
                                          ...S,
                                          className: `space-y-6`,
                                          children: (e) => {
                                              let { processing: t, errors: n } =
                                                  e;
                                              return (0, E.jsxs)(E.Fragment, {
                                                  children: [
                                                      (0, E.jsxs)(`div`, {
                                                          className: `grid gap-2`,
                                                          children: [
                                                              (0, E.jsx)(h, {
                                                                  htmlFor: `espacio_id`,
                                                                  children: `Espacio`,
                                                              }),
                                                              (0, E.jsxs)(u, {
                                                                  name: `espacio_id`,
                                                                  defaultValue:
                                                                      l
                                                                          ? String(
                                                                                l,
                                                                            )
                                                                          : void 0,
                                                                  children: [
                                                                      (0,
                                                                      E.jsx)(
                                                                          s,
                                                                          {
                                                                              id: `espacio_id`,
                                                                              children:
                                                                                  (0,
                                                                                  E.jsx)(
                                                                                      o,
                                                                                      {
                                                                                          placeholder: `Seleccione un espacio`,
                                                                                      },
                                                                                  ),
                                                                          },
                                                                      ),
                                                                      (0,
                                                                      E.jsx)(
                                                                          c,
                                                                          {
                                                                              children:
                                                                                  r.map(
                                                                                      O,
                                                                                  ),
                                                                          },
                                                                      ),
                                                                  ],
                                                              }),
                                                              (0, E.jsx)(f, {
                                                                  message:
                                                                      n.espacio_id,
                                                              }),
                                                          ],
                                                      }),
                                                      (0, E.jsxs)(`div`, {
                                                          className: `grid gap-6 sm:grid-cols-3`,
                                                          children: [
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `fecha`,
                                                                                      children: `Fecha`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `fecha`,
                                                                                      name: `fecha`,
                                                                                      type: `date`,
                                                                                      required:
                                                                                          !0,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.fecha,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `hora_inicio`,
                                                                                      children: `Hora de inicio`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `hora_inicio`,
                                                                                      name: `hora_inicio`,
                                                                                      type: `time`,
                                                                                      required:
                                                                                          !0,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.hora_inicio,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `hora_fin`,
                                                                                      children: `Hora de finalización`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `hora_fin`,
                                                                                      name: `hora_fin`,
                                                                                      type: `time`,
                                                                                      required:
                                                                                          !0,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.hora_fin,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                          ],
                                                      }),
                                                      (0, E.jsxs)(`div`, {
                                                          className: `grid gap-6 sm:grid-cols-2`,
                                                          children: [
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `solicitante_nombre`,
                                                                                      children: `Nombre del solicitante`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `solicitante_nombre`,
                                                                                      name: `solicitante_nombre`,
                                                                                      required:
                                                                                          !0,
                                                                                      defaultValue:
                                                                                          y?.name ??
                                                                                          ``,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.solicitante_nombre,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `institucion`,
                                                                                      children: `Institución (opcional)`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `institucion`,
                                                                                      name: `institucion`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.institucion,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `correo`,
                                                                                      children: `Correo electrónico`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `correo`,
                                                                                      name: `correo`,
                                                                                      type: `email`,
                                                                                      required:
                                                                                          !0,
                                                                                      defaultValue:
                                                                                          y?.email ??
                                                                                          ``,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.correo,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `telefono`,
                                                                                      children: `Teléfono (opcional)`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `telefono`,
                                                                                      name: `telefono`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.telefono,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                              (0, E.jsxs)(
                                                                  `div`,
                                                                  {
                                                                      className: `grid gap-2`,
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              E.jsx)(
                                                                                  h,
                                                                                  {
                                                                                      htmlFor: `asistentes`,
                                                                                      children: `Asistentes estimados (opcional)`,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  d,
                                                                                  {
                                                                                      id: `asistentes`,
                                                                                      name: `asistentes`,
                                                                                      type: `number`,
                                                                                      min: 1,
                                                                                  },
                                                                              ),
                                                                              (0,
                                                                              E.jsx)(
                                                                                  f,
                                                                                  {
                                                                                      message:
                                                                                          n.asistentes,
                                                                                  },
                                                                              ),
                                                                          ],
                                                                  },
                                                              ),
                                                          ],
                                                      }),
                                                      (0, E.jsxs)(`div`, {
                                                          className: `grid gap-2`,
                                                          children: [
                                                              (0, E.jsx)(h, {
                                                                  htmlFor: `proposito`,
                                                                  children: `Propósito de la actividad`,
                                                              }),
                                                              (0, E.jsx)(_, {
                                                                  id: `proposito`,
                                                                  name: `proposito`,
                                                                  required: !0,
                                                                  rows: 4,
                                                              }),
                                                              (0, E.jsx)(f, {
                                                                  message:
                                                                      n.proposito,
                                                              }),
                                                          ],
                                                      }),
                                                      (0, E.jsxs)(`div`, {
                                                          className: `grid gap-2`,
                                                          children: [
                                                              (0, E.jsx)(h, {
                                                                  htmlFor: `requerimientos`,
                                                                  children: `Requerimientos de equipo (opcional)`,
                                                              }),
                                                              (0, E.jsx)(_, {
                                                                  id: `requerimientos`,
                                                                  name: `requerimientos`,
                                                                  rows: 3,
                                                                  placeholder: `Sonido, proyector, sillas adicionales...`,
                                                              }),
                                                              (0, E.jsx)(f, {
                                                                  message:
                                                                      n.requerimientos,
                                                              }),
                                                          ],
                                                      }),
                                                      (0, E.jsxs)(a, {
                                                          type: `submit`,
                                                          disabled: t,
                                                          children: [
                                                              t &&
                                                                  (0, E.jsx)(
                                                                      g,
                                                                      {},
                                                                  ),
                                                              `Enviar solicitud`,
                                                          ],
                                                      }),
                                                  ],
                                              });
                                          },
                                      }),
                                  }),
                              }),
                          ],
                      }),
                  ],
              })),
              (n[3] = l),
              (n[4] = r),
              (n[5] = y?.email),
              (n[6] = y?.name),
              (n[7] = C))
            : (C = n[7]),
        C
    );
}
function O(e) {
    return (0, E.jsx)(
        l,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
export { D as default };
