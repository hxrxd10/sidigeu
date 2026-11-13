import { d as e, g as t, s as n, u as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
import { t as a } from './calendar-plus-CIcNb-DH.js';
import { t as o } from './chevron-left-Df1ekNYv.js';
import { a as s, i as c, n as l, r as u, t as d } from './select-hxeu1kQ_.js';
import { t as f } from './map-pin-CJV5dcon.js';
import {
    F as p,
    I as m,
    Mt as h,
    f as g,
    j as _,
    jt as v,
} from './app-Bu9EFUG6.js';
import { n as y, t as b } from './card-Bc3dRGP7.js';
import { t as x } from './label-D0AQUEbO.js';
var S = n(),
    C = `todos`;
function w({ actividades: n, filtros: w, rango: T, opciones: E }) {
    let D = (e) => {
            t.get(
                _().url,
                { ...w, ...e },
                { preserveState: !0, preserveScroll: !0, replace: !0 },
            );
        },
        O = n.reduce(
            (e, t) => ((e[t.fecha] ??= []), e[t.fecha].push(t), e),
            {},
        );
    return (0, S.jsxs)(S.Fragment, {
        children: [
            (0, S.jsx)(r, { title: `Agenda Cultural` }),
            (0, S.jsxs)(`div`, {
                className: `space-y-8`,
                children: [
                    (0, S.jsxs)(`header`, {
                        className: `space-y-2`,
                        children: [
                            (0, S.jsx)(`h1`, {
                                className: `text-3xl font-semibold`,
                                children: `Agenda Cultural`,
                            }),
                            (0, S.jsx)(`p`, {
                                className: `max-w-2xl text-muted-foreground`,
                                children: `Actividades artísticas, deportivas y de formación que la DIGEU abre a la comunidad universitaria y al público.`,
                            }),
                        ],
                    }),
                    (0, S.jsxs)(`div`, {
                        className: `flex flex-wrap items-end gap-3`,
                        children: [
                            (0, S.jsxs)(`div`, {
                                className: `flex items-center gap-1`,
                                children: [
                                    (0, S.jsx)(i, {
                                        variant: `outline`,
                                        size: `icon`,
                                        'aria-label': `Mes anterior`,
                                        onClick: () => D({ mes: T.anterior }),
                                        children: (0, S.jsx)(o, {}),
                                    }),
                                    (0, S.jsx)(i, {
                                        variant: `outline`,
                                        onClick: () => D({ mes: T.actual }),
                                        children: `Este mes`,
                                    }),
                                    (0, S.jsx)(i, {
                                        variant: `outline`,
                                        size: `icon`,
                                        'aria-label': `Mes siguiente`,
                                        onClick: () => D({ mes: T.siguiente }),
                                        children: (0, S.jsx)(v, {}),
                                    }),
                                ],
                            }),
                            (0, S.jsx)(`p`, {
                                className: `font-medium first-letter:uppercase`,
                                children: T.etiqueta,
                            }),
                            (0, S.jsxs)(`div`, {
                                className: `ml-auto flex flex-wrap gap-3`,
                                children: [
                                    (0, S.jsxs)(`div`, {
                                        className: `grid gap-1`,
                                        children: [
                                            (0, S.jsx)(x, {
                                                className: `text-xs`,
                                                children: `Unidad`,
                                            }),
                                            (0, S.jsxs)(d, {
                                                value: w.unidad_id
                                                    ? String(w.unidad_id)
                                                    : C,
                                                onValueChange: (e) =>
                                                    D({
                                                        unidad_id:
                                                            e === C
                                                                ? null
                                                                : Number(e),
                                                    }),
                                                children: [
                                                    (0, S.jsx)(c, {
                                                        className: `w-52`,
                                                        children: (0, S.jsx)(
                                                            s,
                                                            {
                                                                placeholder: `Todas`,
                                                            },
                                                        ),
                                                    }),
                                                    (0, S.jsxs)(l, {
                                                        children: [
                                                            (0, S.jsx)(u, {
                                                                value: C,
                                                                children: `Todas las unidades`,
                                                            }),
                                                            E.unidades.map(
                                                                (e) =>
                                                                    (0, S.jsx)(
                                                                        u,
                                                                        {
                                                                            value: String(
                                                                                e.valor,
                                                                            ),
                                                                            children:
                                                                                e.nombre,
                                                                        },
                                                                        e.valor,
                                                                    ),
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, S.jsxs)(`div`, {
                                        className: `grid gap-1`,
                                        children: [
                                            (0, S.jsx)(x, {
                                                className: `text-xs`,
                                                children: `Tipo`,
                                            }),
                                            (0, S.jsxs)(d, {
                                                value: w.tipo_actividad_id
                                                    ? String(
                                                          w.tipo_actividad_id,
                                                      )
                                                    : C,
                                                onValueChange: (e) =>
                                                    D({
                                                        tipo_actividad_id:
                                                            e === C
                                                                ? null
                                                                : Number(e),
                                                    }),
                                                children: [
                                                    (0, S.jsx)(c, {
                                                        className: `w-48`,
                                                        children: (0, S.jsx)(
                                                            s,
                                                            {
                                                                placeholder: `Todos`,
                                                            },
                                                        ),
                                                    }),
                                                    (0, S.jsxs)(l, {
                                                        children: [
                                                            (0, S.jsx)(u, {
                                                                value: C,
                                                                children: `Todos los tipos`,
                                                            }),
                                                            E.tipos.map((e) =>
                                                                (0, S.jsx)(
                                                                    u,
                                                                    {
                                                                        value: String(
                                                                            e.valor,
                                                                        ),
                                                                        children:
                                                                            e.nombre,
                                                                    },
                                                                    e.valor,
                                                                ),
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, S.jsxs)(`div`, {
                                        className: `grid gap-1`,
                                        children: [
                                            (0, S.jsx)(x, {
                                                className: `text-xs`,
                                                children: `Espacio`,
                                            }),
                                            (0, S.jsxs)(d, {
                                                value: w.espacio_id
                                                    ? String(w.espacio_id)
                                                    : C,
                                                onValueChange: (e) =>
                                                    D({
                                                        espacio_id:
                                                            e === C
                                                                ? null
                                                                : Number(e),
                                                    }),
                                                children: [
                                                    (0, S.jsx)(c, {
                                                        className: `w-52`,
                                                        children: (0, S.jsx)(
                                                            s,
                                                            {
                                                                placeholder: `Todos`,
                                                            },
                                                        ),
                                                    }),
                                                    (0, S.jsxs)(l, {
                                                        children: [
                                                            (0, S.jsx)(u, {
                                                                value: C,
                                                                children: `Todos los espacios`,
                                                            }),
                                                            E.espacios.map(
                                                                (e) =>
                                                                    (0, S.jsx)(
                                                                        u,
                                                                        {
                                                                            value: String(
                                                                                e.valor,
                                                                            ),
                                                                            children:
                                                                                e.nombre,
                                                                        },
                                                                        e.valor,
                                                                    ),
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    n.length === 0
                        ? (0, S.jsx)(`p`, {
                              className: `rounded-xl border py-16 text-center text-muted-foreground`,
                              children: `No hay actividades publicadas para este mes.`,
                          })
                        : (0, S.jsx)(`div`, {
                              className: `space-y-6`,
                              children: Object.entries(O).map(([t, n]) =>
                                  (0, S.jsxs)(
                                      `section`,
                                      {
                                          className: `space-y-3`,
                                          children: [
                                              (0, S.jsxs)(`h2`, {
                                                  className: `flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground uppercase`,
                                                  children: [
                                                      (0, S.jsx)(h, {
                                                          className: `size-4`,
                                                      }),
                                                      (0, S.jsx)(`span`, {
                                                          className: `capitalize`,
                                                          children: n[0].dia,
                                                      }),
                                                  ],
                                              }),
                                              (0, S.jsx)(`div`, {
                                                  className: `grid gap-3 sm:grid-cols-2 lg:grid-cols-3`,
                                                  children: n.map((t) =>
                                                      (0, S.jsx)(
                                                          b,
                                                          {
                                                              className: `relative transition-shadow hover:shadow-md`,
                                                              children: (0,
                                                              S.jsxs)(y, {
                                                                  className: `space-y-2`,
                                                                  children: [
                                                                      (0,
                                                                      S.jsxs)(
                                                                          `div`,
                                                                          {
                                                                              className: `flex items-start justify-between gap-2`,
                                                                              children:
                                                                                  [
                                                                                      (0,
                                                                                      S.jsx)(
                                                                                          `h3`,
                                                                                          {
                                                                                              className: `font-semibold`,
                                                                                              children:
                                                                                                  (0,
                                                                                                  S.jsx)(
                                                                                                      e,
                                                                                                      {
                                                                                                          href: m(
                                                                                                              t.id,
                                                                                                          ),
                                                                                                          className: `after:absolute after:inset-0 hover:underline`,
                                                                                                          children:
                                                                                                              t.nombre,
                                                                                                      },
                                                                                                  ),
                                                                                          },
                                                                                      ),
                                                                                      (0,
                                                                                      S.jsx)(
                                                                                          g,
                                                                                          {
                                                                                              variant: `outline`,
                                                                                              children:
                                                                                                  t.tipo,
                                                                                          },
                                                                                      ),
                                                                                  ],
                                                                          },
                                                                      ),
                                                                      t.hora_inicio &&
                                                                          (0,
                                                                          S.jsxs)(
                                                                              `p`,
                                                                              {
                                                                                  className: `text-sm text-muted-foreground`,
                                                                                  children:
                                                                                      [
                                                                                          t.hora_inicio,
                                                                                          t.hora_fin
                                                                                              ? ` – ${t.hora_fin}`
                                                                                              : ``,
                                                                                      ],
                                                                              },
                                                                          ),
                                                                      (0,
                                                                      S.jsxs)(
                                                                          `p`,
                                                                          {
                                                                              className: `flex items-center gap-2 text-sm text-muted-foreground`,
                                                                              children:
                                                                                  [
                                                                                      (0,
                                                                                      S.jsx)(
                                                                                          f,
                                                                                          {
                                                                                              className: `size-4`,
                                                                                          },
                                                                                      ),
                                                                                      t.lugar,
                                                                                      t.sede
                                                                                          ? ` · ${t.sede}`
                                                                                          : ``,
                                                                                  ],
                                                                          },
                                                                      ),
                                                                      t.descripcion &&
                                                                          (0,
                                                                          S.jsx)(
                                                                              `p`,
                                                                              {
                                                                                  className: `text-sm`,
                                                                                  children:
                                                                                      t.descripcion,
                                                                              },
                                                                          ),
                                                                      (0,
                                                                      S.jsx)(
                                                                          `p`,
                                                                          {
                                                                              className: `text-xs text-muted-foreground`,
                                                                              children:
                                                                                  t.unidad,
                                                                          },
                                                                      ),
                                                                      (0,
                                                                      S.jsx)(
                                                                          i,
                                                                          {
                                                                              variant: `ghost`,
                                                                              size: `sm`,
                                                                              asChild:
                                                                                  !0,
                                                                              className: `relative z-10 -ml-2 text-digeu-azure transition-transform duration-150 ease-out active:scale-[0.97] dark:text-digeu-teal`,
                                                                              children:
                                                                                  (0,
                                                                                  S.jsxs)(
                                                                                      `a`,
                                                                                      {
                                                                                          href: p(
                                                                                              t.id,
                                                                                          )
                                                                                              .url,
                                                                                          children:
                                                                                              [
                                                                                                  (0,
                                                                                                  S.jsx)(
                                                                                                      a,
                                                                                                      {},
                                                                                                  ),
                                                                                                  `Agregar a mi calendario`,
                                                                                              ],
                                                                                      },
                                                                                  ),
                                                                          },
                                                                      ),
                                                                  ],
                                                              }),
                                                          },
                                                          t.id,
                                                      ),
                                                  ),
                                              }),
                                          ],
                                      },
                                      t,
                                  ),
                              ),
                          }),
                ],
            }),
        ],
    });
}
export { w as default };
