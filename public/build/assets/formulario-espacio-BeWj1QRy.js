import { c as e, g as t, l as n, s as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { a, i as o, n as s, r as c, t as l } from './select-hxeu1kQ_.js';
import { t as u } from './trash-2-_Kz5vj-S.js';
import { Tt as d } from './app-Bu9EFUG6.js';
import { t as f } from './input-error-Bxj_sbd5.js';
import { t as p } from './label-D0AQUEbO.js';
import { t as m } from './spinner-DtbIIn34.js';
import { t as h } from './textarea-DtbS5QwL.js';
import { t as g } from './checkbox-Dz5nVKQg.js';
import { t as _ } from './EspacioController-f5zlN1ju.js';
var v = e(),
    y = r();
function b(e) {
    let r = (0, v.c)(11),
        { accion: c, espacio: b, opciones: w, textoBoton: T } = e,
        E;
    r[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = { preserveScroll: !0 }), (r[0] = E))
        : (E = r[0]);
    let D;
    r[1] !== b ||
    r[2] !== w.equipamientos ||
    r[3] !== w.estados ||
    r[4] !== w.sedes ||
    r[5] !== w.tipos ||
    r[6] !== T
        ? ((D = (e) => {
              let { processing: n, errors: r } = e;
              return (0, y.jsxs)(y.Fragment, {
                  children: [
                      (0, y.jsxs)(`div`, {
                          className: `grid gap-6 sm:grid-cols-2`,
                          children: [
                              (0, y.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, y.jsx)(p, {
                                          htmlFor: `sede_id`,
                                          children: `Sede`,
                                      }),
                                      (0, y.jsxs)(l, {
                                          name: `sede_id`,
                                          defaultValue: b
                                              ? String(b.sede_id)
                                              : void 0,
                                          children: [
                                              (0, y.jsx)(o, {
                                                  id: `sede_id`,
                                                  children: (0, y.jsx)(a, {
                                                      placeholder: `Seleccione una sede`,
                                                  }),
                                              }),
                                              (0, y.jsx)(s, {
                                                  children: w.sedes.map(C),
                                              }),
                                          ],
                                      }),
                                      (0, y.jsx)(f, { message: r.sede_id }),
                                  ],
                              }),
                              (0, y.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, y.jsx)(p, {
                                          htmlFor: `tipo_espacio_id`,
                                          children: `Tipo de espacio`,
                                      }),
                                      (0, y.jsxs)(l, {
                                          name: `tipo_espacio_id`,
                                          defaultValue: b
                                              ? String(b.tipo_espacio_id)
                                              : void 0,
                                          children: [
                                              (0, y.jsx)(o, {
                                                  id: `tipo_espacio_id`,
                                                  children: (0, y.jsx)(a, {
                                                      placeholder: `Seleccione un tipo`,
                                                  }),
                                              }),
                                              (0, y.jsx)(s, {
                                                  children: w.tipos.map(S),
                                              }),
                                          ],
                                      }),
                                      (0, y.jsx)(f, {
                                          message: r.tipo_espacio_id,
                                      }),
                                  ],
                              }),
                              (0, y.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, y.jsx)(p, {
                                          htmlFor: `nombre`,
                                          children: `Nombre`,
                                      }),
                                      (0, y.jsx)(d, {
                                          id: `nombre`,
                                          name: `nombre`,
                                          required: !0,
                                          defaultValue: b?.nombre,
                                      }),
                                      (0, y.jsx)(f, { message: r.nombre }),
                                  ],
                              }),
                              (0, y.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, y.jsx)(p, {
                                          htmlFor: `ubicacion`,
                                          children: `Ubicación (opcional)`,
                                      }),
                                      (0, y.jsx)(d, {
                                          id: `ubicacion`,
                                          name: `ubicacion`,
                                          defaultValue: b?.ubicacion ?? ``,
                                      }),
                                      (0, y.jsx)(f, { message: r.ubicacion }),
                                  ],
                              }),
                              (0, y.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, y.jsx)(p, {
                                          htmlFor: `capacidad`,
                                          children: `Capacidad (personas)`,
                                      }),
                                      (0, y.jsx)(d, {
                                          id: `capacidad`,
                                          name: `capacidad`,
                                          type: `number`,
                                          min: 1,
                                          defaultValue: b?.capacidad ?? ``,
                                      }),
                                      (0, y.jsx)(f, { message: r.capacidad }),
                                  ],
                              }),
                              (0, y.jsxs)(`div`, {
                                  className: `grid gap-2`,
                                  children: [
                                      (0, y.jsx)(p, {
                                          htmlFor: `estado`,
                                          children: `Estado`,
                                      }),
                                      (0, y.jsxs)(l, {
                                          name: `estado`,
                                          defaultValue: b?.estado ?? `activo`,
                                          children: [
                                              (0, y.jsx)(o, {
                                                  id: `estado`,
                                                  children: (0, y.jsx)(a, {}),
                                              }),
                                              (0, y.jsx)(s, {
                                                  children: w.estados.map(x),
                                              }),
                                          ],
                                      }),
                                      (0, y.jsx)(f, { message: r.estado }),
                                  ],
                              }),
                          ],
                      }),
                      (0, y.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, y.jsx)(p, {
                                  htmlFor: `caracteristicas`,
                                  children: `Características (opcional)`,
                              }),
                              (0, y.jsx)(h, {
                                  id: `caracteristicas`,
                                  name: `caracteristicas`,
                                  rows: 3,
                                  defaultValue: b?.caracteristicas ?? ``,
                              }),
                              (0, y.jsx)(f, { message: r.caracteristicas }),
                          ],
                      }),
                      (0, y.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, y.jsx)(p, {
                                  htmlFor: `condiciones_uso`,
                                  children: `Condiciones de uso (opcional)`,
                              }),
                              (0, y.jsx)(h, {
                                  id: `condiciones_uso`,
                                  name: `condiciones_uso`,
                                  rows: 3,
                                  defaultValue: b?.condiciones_uso ?? ``,
                              }),
                              (0, y.jsx)(f, { message: r.condiciones_uso }),
                          ],
                      }),
                      (0, y.jsxs)(`fieldset`, {
                          className: `grid gap-3`,
                          children: [
                              (0, y.jsx)(`legend`, {
                                  className: `mb-1 text-sm font-medium`,
                                  children: `Equipamiento`,
                              }),
                              (0, y.jsx)(`div`, {
                                  className: `grid gap-3 sm:grid-cols-2`,
                                  children: w.equipamientos.map((e) => {
                                      let t = b?.equipamientos.find(
                                          (t) => t.id === e.valor,
                                      );
                                      return (0, y.jsxs)(
                                          `div`,
                                          {
                                              className: `flex items-center gap-3`,
                                              children: [
                                                  (0, y.jsx)(g, {
                                                      id: `equipo-${e.valor}`,
                                                      name: `equipamientos[]`,
                                                      value: e.valor,
                                                      defaultChecked: !!t,
                                                  }),
                                                  (0, y.jsx)(p, {
                                                      htmlFor: `equipo-${e.valor}`,
                                                      className: `flex-1`,
                                                      children: e.nombre,
                                                  }),
                                                  (0, y.jsx)(d, {
                                                      name: `cantidades[${e.valor}]`,
                                                      type: `number`,
                                                      min: 1,
                                                      className: `w-20`,
                                                      'aria-label': `Cantidad de ${e.nombre}`,
                                                      defaultValue:
                                                          t?.cantidad ?? 1,
                                                  }),
                                              ],
                                          },
                                          e.valor,
                                      );
                                  }),
                              }),
                              (0, y.jsx)(f, { message: r.equipamientos }),
                          ],
                      }),
                      (0, y.jsxs)(`div`, {
                          className: `grid gap-2`,
                          children: [
                              (0, y.jsx)(p, {
                                  htmlFor: `fotografias`,
                                  children: `Fotografías`,
                              }),
                              (0, y.jsx)(d, {
                                  id: `fotografias`,
                                  name: `fotografias[]`,
                                  type: `file`,
                                  accept: `image/jpeg,image/png`,
                                  multiple: !0,
                              }),
                              (0, y.jsx)(`p`, {
                                  className: `text-xs text-muted-foreground`,
                                  children: `Hasta 6 imágenes JPG o PNG de 4 MB cada una.`,
                              }),
                              (0, y.jsx)(f, { message: r.fotografias }),
                          ],
                      }),
                      b &&
                          b.fotografias.length > 0 &&
                          (0, y.jsx)(`div`, {
                              className: `grid gap-3 sm:grid-cols-3`,
                              children: b.fotografias.map((e) =>
                                  (0, y.jsxs)(
                                      `div`,
                                      {
                                          className: `relative`,
                                          children: [
                                              (0, y.jsx)(`img`, {
                                                  src: e.url,
                                                  alt: b.nombre,
                                                  className: `h-32 w-full rounded-md object-cover`,
                                              }),
                                              (0, y.jsx)(i, {
                                                  type: `button`,
                                                  variant: `outline`,
                                                  size: `sm`,
                                                  className: `absolute top-2 right-2`,
                                                  onClick: () =>
                                                      t.delete(
                                                          _.eliminarFotografia.url(
                                                              {
                                                                  espacio: b.id,
                                                                  fotografia:
                                                                      e.id,
                                                              },
                                                          ),
                                                          {
                                                              preserveScroll:
                                                                  !0,
                                                          },
                                                      ),
                                                  children: (0, y.jsx)(u, {}),
                                              }),
                                          ],
                                      },
                                      e.id,
                                  ),
                              ),
                          }),
                      (0, y.jsxs)(`div`, {
                          className: `flex items-center gap-3`,
                          children: [
                              (0, y.jsx)(g, {
                                  id: `visible_publico`,
                                  name: `visible_publico`,
                                  defaultChecked: b?.visible_publico ?? !0,
                              }),
                              (0, y.jsx)(p, {
                                  htmlFor: `visible_publico`,
                                  children: `Mostrar en el catálogo público`,
                              }),
                          ],
                      }),
                      (0, y.jsxs)(i, {
                          type: `submit`,
                          disabled: n,
                          children: [n && (0, y.jsx)(m, {}), T],
                      }),
                  ],
              });
          }),
          (r[1] = b),
          (r[2] = w.equipamientos),
          (r[3] = w.estados),
          (r[4] = w.sedes),
          (r[5] = w.tipos),
          (r[6] = T),
          (r[7] = D))
        : (D = r[7]);
    let O;
    return (
        r[8] !== c || r[9] !== D
            ? ((O = (0, y.jsx)(n, {
                  ...c,
                  options: E,
                  className: `max-w-3xl space-y-6`,
                  children: D,
              })),
              (r[8] = c),
              (r[9] = D),
              (r[10] = O))
            : (O = r[10]),
        O
    );
}
function x(e) {
    return (0, y.jsx)(c, { value: e.valor, children: e.nombre }, e.valor);
}
function S(e) {
    return (0, y.jsx)(
        c,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
function C(e) {
    return (0, y.jsx)(
        c,
        { value: String(e.valor), children: e.nombre },
        e.valor,
    );
}
export { b as t };
