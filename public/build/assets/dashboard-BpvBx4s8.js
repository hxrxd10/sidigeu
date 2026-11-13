import { n as e } from './rolldown-runtime-WkwZ5CU-.js';
import {
    c as t,
    d as n,
    h as r,
    i,
    s as a,
    u as o,
} from './wayfinder-C8dNLrFV.js';
import { t as s } from './button-BzkMvCJO.js';
import { t as c } from './arrow-right-BItnT0Ub.js';
import {
    $ as l,
    At as u,
    Nt as d,
    Ot as f,
    Pt as p,
    f as m,
    gt as h,
    q as g,
    rt as _,
    y as v,
} from './app-Bu9EFUG6.js';
import { a as y, i as b, n as x, r as ee, t as S } from './card-Bc3dRGP7.js';
import { n as C } from './fecha-D8mdgCgw.js';
var te = t(),
    w = e(r(), 1),
    T = a();
function ne({
    filas: e,
    etiquetaValor: t = `Total`,
    descripcion: n,
    className: r,
}) {
    let a = (0, w.useId)(),
        [o, s] = (0, w.useState)(null),
        c = Math.max(...e.map((e) => e.valor), 1);
    return (0, T.jsxs)(`div`, {
        className: i(`space-y-2.5`, r),
        children: [
            (0, T.jsx)(`div`, {
                role: `img`,
                'aria-label': n,
                'aria-describedby': a,
                className: `space-y-2.5`,
                children: e.map((e, t) =>
                    (0, T.jsxs)(
                        `div`,
                        {
                            className: `group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1`,
                            onMouseEnter: () => s(t),
                            onMouseLeave: () => s(null),
                            children: [
                                (0, T.jsx)(`p`, {
                                    className: `truncate text-sm text-foreground`,
                                    children: e.etiqueta,
                                }),
                                (0, T.jsx)(`p`, {
                                    className: `text-sm font-medium text-foreground tabular-nums`,
                                    children: e.valor.toLocaleString(`es-GT`),
                                }),
                                (0, T.jsx)(`div`, {
                                    className: `col-span-2 h-2.5 rounded-sm bg-muted`,
                                    children: (0, T.jsx)(`div`, {
                                        className: i(
                                            `h-full rounded-r-[4px] bg-primary transition-opacity duration-150`,
                                            o !== null &&
                                                o !== t &&
                                                `opacity-45`,
                                        ),
                                        style: {
                                            width: `${Math.max((e.valor / c) * 100, e.valor > 0 ? 2 : 0)}%`,
                                        },
                                    }),
                                }),
                                e.detalle &&
                                    (0, T.jsx)(`p`, {
                                        className: `col-span-2 text-xs text-muted-foreground`,
                                        children: e.detalle,
                                    }),
                            ],
                        },
                        e.etiqueta,
                    ),
                ),
            }),
            (0, T.jsxs)(`table`, {
                id: a,
                className: `sr-only`,
                children: [
                    (0, T.jsx)(`caption`, { children: n }),
                    (0, T.jsx)(`thead`, {
                        children: (0, T.jsxs)(`tr`, {
                            children: [
                                (0, T.jsx)(`th`, {
                                    scope: `col`,
                                    children: `Categoría`,
                                }),
                                (0, T.jsx)(`th`, { scope: `col`, children: t }),
                            ],
                        }),
                    }),
                    (0, T.jsx)(`tbody`, {
                        children: e.map((e) =>
                            (0, T.jsxs)(
                                `tr`,
                                {
                                    children: [
                                        (0, T.jsx)(`th`, {
                                            scope: `row`,
                                            children: e.etiqueta,
                                        }),
                                        (0, T.jsx)(`td`, { children: e.valor }),
                                    ],
                                },
                                e.etiqueta,
                            ),
                        ),
                    }),
                ],
            }),
        ],
    });
}
var E = 220,
    D = 150;
function O() {
    let e = (0, te.c)(4),
        t = (0, w.useRef)(null),
        [n, r] = (0, w.useState)(E),
        i,
        a;
    (e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((i = () => {
              let e = t.current;
              if (!e) return;
              let n = new ResizeObserver((e) => {
                  let [t] = e;
                  r(Math.max(t.contentRect.width, E));
              });
              return (n.observe(e), () => n.disconnect());
          }),
          (a = []),
          (e[0] = i),
          (e[1] = a))
        : ((i = e[0]), (a = e[1])),
        (0, w.useEffect)(i, a));
    let o;
    return (
        e[2] === n ? (o = e[3]) : ((o = [t, n]), (e[2] = n), (e[3] = o)), o
    );
}
var k = { arriba: 12, derecha: 8, abajo: 24, izquierda: 38 },
    A = 24,
    j = 4;
function M(e) {
    if (e <= 4) return 4;
    let t = 10 ** Math.floor(Math.log10(e)),
        n = Math.max(t / 2, 2);
    return Math.ceil(e / (n * 2)) * n * 2;
}
function re(e) {
    return e >= 1e4 ? `${Math.round(e / 1e3)}K` : e.toLocaleString(`es-GT`);
}
function N(e, t, n, r) {
    let i = Math.min(j, n / 2, r);
    return [
        `M ${e} ${t + r}`,
        `V ${t + i}`,
        `A ${i} ${i} 0 0 1 ${e + i} ${t}`,
        `H ${e + n - i}`,
        `A ${i} ${i} 0 0 1 ${e + n} ${t + i}`,
        `V ${t + r}`,
        `Z`,
    ].join(` `);
}
function ie({
    puntos: e,
    variante: t = `columnas`,
    etiquetaValor: n = `Total`,
    descripcion: r,
    className: a,
}) {
    let o = (0, w.useId)(),
        [s, c] = (0, w.useState)(null),
        [l, u] = O(),
        d = D - k.arriba - k.abajo,
        f = u - k.izquierda - k.derecha,
        p = M(Math.max(...e.map((e) => e.valor), 0)),
        m = f / Math.max(e.length, 1),
        h = (e) => k.arriba + d - (e / p) * d,
        g = (e) => k.izquierda + m * (e + 0.5),
        _ = [0, p / 2, p],
        v = e.map((e, t) => `${g(t)} ${h(e.valor)}`).join(` L `),
        y = `M ${k.izquierda + m * 0.5} ${k.arriba + d} L ${v} L ${g(e.length - 1)} ${k.arriba + d} Z`,
        b = s === null ? null : e[s];
    return (0, T.jsxs)(`div`, {
        className: i(`space-y-2`, a),
        children: [
            (0, T.jsxs)(`div`, {
                className: `relative`,
                ref: l,
                children: [
                    (0, T.jsxs)(`svg`, {
                        viewBox: `0 0 ${u} ${D}`,
                        width: u,
                        height: D,
                        className: `overflow-visible`,
                        role: `img`,
                        'aria-label': r,
                        'aria-describedby': o,
                        children: [
                            _.map((e) =>
                                (0, T.jsxs)(
                                    `g`,
                                    {
                                        children: [
                                            (0, T.jsx)(`line`, {
                                                x1: k.izquierda,
                                                x2: u - k.derecha,
                                                y1: h(e),
                                                y2: h(e),
                                                className: `stroke-border`,
                                                strokeWidth: 1,
                                            }),
                                            (0, T.jsx)(`text`, {
                                                x: k.izquierda - 6,
                                                y: h(e),
                                                dominantBaseline: `middle`,
                                                textAnchor: `end`,
                                                className: `fill-muted-foreground text-[10px] tabular-nums`,
                                                children: re(e),
                                            }),
                                        ],
                                    },
                                    e,
                                ),
                            ),
                            t === `area`
                                ? (0, T.jsxs)(T.Fragment, {
                                      children: [
                                          (0, T.jsx)(`path`, {
                                              d: y,
                                              className: `fill-primary/10`,
                                          }),
                                          (0, T.jsx)(`path`, {
                                              d: `M ${v}`,
                                              fill: `none`,
                                              className: `stroke-primary`,
                                              strokeWidth: 2,
                                              strokeLinecap: `round`,
                                              strokeLinejoin: `round`,
                                          }),
                                          e.map((e, t) =>
                                              (0, T.jsx)(
                                                  `circle`,
                                                  {
                                                      cx: g(t),
                                                      cy: h(e.valor),
                                                      r: 4,
                                                      className: `fill-primary stroke-card`,
                                                      strokeWidth: 2,
                                                      opacity:
                                                          s === null || s === t
                                                              ? 1
                                                              : 0.45,
                                                  },
                                                  e.etiqueta,
                                              ),
                                          ),
                                      ],
                                  })
                                : e.map((e, t) => {
                                      let n = Math.min(m - 2, A),
                                          r = (e.valor / p) * d;
                                      return (0, T.jsx)(
                                          `path`,
                                          {
                                              d: N(
                                                  g(t) - n / 2,
                                                  k.arriba + d - r,
                                                  n,
                                                  Math.max(
                                                      r,
                                                      e.valor > 0 ? 2 : 0,
                                                  ),
                                              ),
                                              className: `fill-primary`,
                                              opacity:
                                                  s === null || s === t
                                                      ? 1
                                                      : 0.45,
                                          },
                                          e.etiqueta,
                                      );
                                  }),
                            e.map((e, t) =>
                                (0, T.jsx)(
                                    `text`,
                                    {
                                        x: g(t),
                                        y: 144,
                                        textAnchor: `middle`,
                                        className: `fill-muted-foreground text-[10px]`,
                                        children: e.etiqueta,
                                    },
                                    e.etiqueta,
                                ),
                            ),
                            e.map((e, t) =>
                                (0, T.jsx)(
                                    `rect`,
                                    {
                                        x: k.izquierda + m * t,
                                        y: k.arriba,
                                        width: m,
                                        height: d + k.abajo,
                                        fill: `transparent`,
                                        onMouseEnter: () => c(t),
                                        onMouseLeave: () => c(null),
                                    },
                                    e.etiqueta,
                                ),
                            ),
                        ],
                    }),
                    b &&
                        (0, T.jsxs)(`div`, {
                            className: `pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-md border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground shadow-sm`,
                            style: { left: `${g(s ?? 0)}px` },
                            children: [
                                (0, T.jsx)(`span`, {
                                    className: `font-medium`,
                                    children: b.etiqueta,
                                }),
                                ` · `,
                                (0, T.jsx)(`span`, {
                                    className: `tabular-nums`,
                                    children: b.valor.toLocaleString(`es-GT`),
                                }),
                                b.detalle ? ` ${b.detalle}` : ``,
                            ],
                        }),
                ],
            }),
            (0, T.jsxs)(`table`, {
                id: o,
                className: `sr-only`,
                children: [
                    (0, T.jsx)(`caption`, { children: r }),
                    (0, T.jsx)(`thead`, {
                        children: (0, T.jsxs)(`tr`, {
                            children: [
                                (0, T.jsx)(`th`, {
                                    scope: `col`,
                                    children: `Período`,
                                }),
                                (0, T.jsx)(`th`, { scope: `col`, children: n }),
                            ],
                        }),
                    }),
                    (0, T.jsx)(`tbody`, {
                        children: e.map((e) =>
                            (0, T.jsxs)(
                                `tr`,
                                {
                                    children: [
                                        (0, T.jsx)(`th`, {
                                            scope: `row`,
                                            children: e.etiqueta,
                                        }),
                                        (0, T.jsx)(`td`, { children: e.valor }),
                                    ],
                                },
                                e.etiqueta,
                            ),
                        ),
                    }),
                ],
            }),
        ],
    });
}
function ae(e) {
    let t = (0, te.c)(21),
        { etiqueta: r, valor: i, detalle: a, icono: o, href: l } = e,
        u;
    t[0] === r
        ? (u = t[1])
        : ((u = (0, T.jsx)(y, {
              className: `text-xs font-medium tracking-wide text-muted-foreground uppercase`,
              children: r,
          })),
          (t[0] = r),
          (t[1] = u));
    let d;
    t[2] === o
        ? (d = t[3])
        : ((d = (0, T.jsx)(o, { className: `size-4 text-muted-foreground` })),
          (t[2] = o),
          (t[3] = d));
    let f;
    t[4] !== u || t[5] !== d
        ? ((f = (0, T.jsxs)(b, {
              className: `flex-row items-center justify-between pb-2`,
              children: [u, d],
          })),
          (t[4] = u),
          (t[5] = d),
          (t[6] = f))
        : (f = t[6]);
    let p;
    t[7] === i
        ? (p = t[8])
        : ((p = (0, T.jsx)(`p`, {
              className: `text-3xl font-semibold`,
              children: i,
          })),
          (t[7] = i),
          (t[8] = p));
    let m;
    t[9] === a
        ? (m = t[10])
        : ((m = (0, T.jsx)(`p`, {
              className: `text-xs text-muted-foreground`,
              children: a,
          })),
          (t[9] = a),
          (t[10] = m));
    let h;
    t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, T.jsx)(c, {})), (t[11] = h))
        : (h = t[11]);
    let g;
    t[12] === l
        ? (g = t[13])
        : ((g = (0, T.jsx)(s, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              className: `-ml-2`,
              children: (0, T.jsxs)(n, { href: l, children: [`Ver`, h] }),
          })),
          (t[12] = l),
          (t[13] = g));
    let _;
    t[14] !== p || t[15] !== m || t[16] !== g
        ? ((_ = (0, T.jsxs)(x, {
              className: `space-y-2`,
              children: [p, m, g],
          })),
          (t[14] = p),
          (t[15] = m),
          (t[16] = g),
          (t[17] = _))
        : (_ = t[17]);
    let v;
    return (
        t[18] !== f || t[19] !== _
            ? ((v = (0, T.jsxs)(S, { children: [f, _] })),
              (t[18] = f),
              (t[19] = _),
              (t[20] = v))
            : (v = t[20]),
        v
    );
}
function P(e) {
    let t = (0, te.c)(79),
        {
            saludo: n,
            actividades: r,
            proyectos: i,
            espacios: a,
            recursoHumano: s,
            pendientes: c,
            graficas: m,
        } = e,
        h;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, T.jsx)(o, { title: `Panel` })), (t[0] = h))
        : (h = t[0]);
    let C;
    t[1] === n.nombre
        ? (C = t[2])
        : ((C = (0, T.jsxs)(`h1`, {
              className: `text-2xl font-semibold`,
              children: [`Hola, `, n.nombre],
          })),
          (t[1] = n.nombre),
          (t[2] = C));
    let w = n.unidad ? ` · ${n.unidad}` : ``,
        E;
    t[3] !== n.fecha || t[4] !== w
        ? ((E = (0, T.jsxs)(`p`, {
              className: `text-sm text-muted-foreground first-letter:uppercase`,
              children: [n.fecha, w],
          })),
          (t[3] = n.fecha),
          (t[4] = w),
          (t[5] = E))
        : (E = t[5]);
    let D;
    t[6] !== C || t[7] !== E
        ? ((D = (0, T.jsxs)(`header`, { children: [C, E] })),
          (t[6] = C),
          (t[7] = E),
          (t[8] = D))
        : (D = t[8]);
    let O;
    t[9] === c
        ? (O = t[10])
        : ((O =
              c.length > 0 &&
              (0, T.jsx)(`div`, {
                  className: `flex flex-wrap gap-3`,
                  children: c.map(ue),
              })),
          (t[9] = c),
          (t[10] = O));
    let k = r.total,
        A = `${r.cerradas} cerradas · ${r.enAgenda} en agenda`,
        j;
    t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((j = _()), (t[11] = j))
        : (j = t[11]);
    let M;
    t[12] !== r.total || t[13] !== A
        ? ((M = (0, T.jsx)(ae, {
              etiqueta: `Actividades del mes`,
              valor: k,
              detalle: A,
              icono: d,
              href: j.url,
          })),
          (t[12] = r.total),
          (t[13] = A),
          (t[14] = M))
        : (M = t[14]);
    let re = i.enEjecucion,
        N = `${i.enRevision} en revisión · ${i.cerrados} cerrados`,
        P;
    t[15] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((P = g()), (t[15] = P))
        : (P = t[15]);
    let F;
    t[16] !== i.enEjecucion || t[17] !== N
        ? ((F = (0, T.jsx)(ae, {
              etiqueta: `Proyectos en ejecución`,
              valor: re,
              detalle: N,
              icono: u,
              href: P.url,
          })),
          (t[16] = i.enEjecucion),
          (t[17] = N),
          (t[18] = F))
        : (F = t[18]);
    let de = a.reservasSemana,
        fe = `${a.rango} · ${a.disponibles} de ${a.total} espacios activos`,
        pe;
    t[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((pe = l()), (t[19] = pe))
        : (pe = t[19]);
    let I;
    t[20] !== a.reservasSemana || t[21] !== fe
        ? ((I = (0, T.jsx)(ae, {
              etiqueta: `Reservas de la semana`,
              valor: de,
              detalle: fe,
              icono: p,
              href: pe.url,
          })),
          (t[20] = a.reservasSemana),
          (t[21] = fe),
          (t[22] = I))
        : (I = t[22]);
    let me = s.activos,
        he = `${s.artistas} artistas · ${s.deportistas} deportistas`,
        ge;
    t[23] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ge = v()), (t[23] = ge))
        : (ge = t[23]);
    let L;
    t[24] !== s.activos || t[25] !== he
        ? ((L = (0, T.jsx)(ae, {
              etiqueta: `Recurso humano activo`,
              valor: me,
              detalle: he,
              icono: f,
              href: ge.url,
          })),
          (t[24] = s.activos),
          (t[25] = he),
          (t[26] = L))
        : (L = t[26]);
    let R;
    t[27] !== M || t[28] !== F || t[29] !== I || t[30] !== L
        ? ((R = (0, T.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,
              children: [M, F, I, L],
          })),
          (t[27] = M),
          (t[28] = F),
          (t[29] = I),
          (t[30] = L),
          (t[31] = R))
        : (R = t[31]);
    let _e;
    t[32] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((_e = (0, T.jsx)(b, {
              children: (0, T.jsx)(y, { children: `Próximas actividades` }),
          })),
          (t[32] = _e))
        : (_e = t[32]);
    let z;
    t[33] === r.proximas
        ? (z = t[34])
        : ((z = (0, T.jsxs)(S, {
              className: `lg:col-span-2`,
              children: [
                  _e,
                  (0, T.jsx)(x, {
                      children:
                          r.proximas.length === 0
                              ? (0, T.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `No hay actividades programadas por delante.`,
                                })
                              : (0, T.jsx)(`ul`, {
                                    className: `divide-y`,
                                    children: r.proximas.map(le),
                                }),
                  }),
              ],
          })),
          (t[33] = r.proximas),
          (t[34] = z));
    let ve;
    t[35] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ve = (0, T.jsx)(b, {
              children: (0, T.jsx)(y, { children: `Actividades por estado` }),
          })),
          (t[35] = ve))
        : (ve = t[35]);
    let B;
    t[36] === r.porEstado
        ? (B = t[37])
        : ((B = (0, T.jsxs)(S, {
              children: [
                  ve,
                  (0, T.jsx)(x, {
                      children:
                          r.porEstado.length === 0
                              ? (0, T.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin actividades registradas este mes.`,
                                })
                              : (0, T.jsx)(ne, {
                                    descripcion: `Actividades del mes en curso agrupadas por estado`,
                                    etiquetaValor: `Actividades`,
                                    filas: r.porEstado.map(ce),
                                }),
                  }),
              ],
          })),
          (t[36] = r.porEstado),
          (t[37] = B));
    let V;
    t[38] !== z || t[39] !== B
        ? ((V = (0, T.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-3`,
              children: [z, B],
          })),
          (t[38] = z),
          (t[39] = B),
          (t[40] = V))
        : (V = t[40]);
    let ye;
    t[41] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((ye = (0, T.jsxs)(b, {
              children: [
                  (0, T.jsx)(y, { children: `Actividades por tipo` }),
                  (0, T.jsx)(ee, { children: `Mes en curso` }),
              ],
          })),
          (t[41] = ye))
        : (ye = t[41]);
    let H;
    t[42] === m.porTipo
        ? (H = t[43])
        : ((H = (0, T.jsxs)(S, {
              children: [
                  ye,
                  (0, T.jsx)(x, {
                      children:
                          m.porTipo.length === 0
                              ? (0, T.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `Sin actividades registradas este mes.`,
                                })
                              : (0, T.jsx)(ne, {
                                    descripcion: `Actividades del mes en curso agrupadas por tipo de actividad`,
                                    etiquetaValor: `Actividades`,
                                    filas: m.porTipo,
                                }),
                  }),
              ],
          })),
          (t[42] = m.porTipo),
          (t[43] = H));
    let be;
    t[44] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((be = (0, T.jsxs)(b, {
              children: [
                  (0, T.jsx)(y, { children: `Actividades por mes` }),
                  (0, T.jsx)(ee, { children: `Últimos seis meses` }),
              ],
          })),
          (t[44] = be))
        : (be = t[44]);
    let U;
    t[45] === m.actividadesPorMes
        ? (U = t[46])
        : ((U = (0, T.jsxs)(S, {
              children: [
                  be,
                  (0, T.jsx)(x, {
                      children: (0, T.jsx)(ie, {
                          variante: `columnas`,
                          descripcion: `Actividades programadas por mes en los últimos seis meses`,
                          etiquetaValor: `Actividades`,
                          puntos: m.actividadesPorMes,
                      }),
                  }),
              ],
          })),
          (t[45] = m.actividadesPorMes),
          (t[46] = U));
    let xe;
    t[47] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((xe = (0, T.jsxs)(b, {
              children: [
                  (0, T.jsx)(y, { children: `Beneficiarios atendidos` }),
                  (0, T.jsx)(ee, { children: `Últimos seis meses` }),
              ],
          })),
          (t[47] = xe))
        : (xe = t[47]);
    let W;
    t[48] === m.beneficiariosPorMes
        ? (W = t[49])
        : ((W = (0, T.jsxs)(S, {
              children: [
                  xe,
                  (0, T.jsx)(x, {
                      children: (0, T.jsx)(ie, {
                          variante: `area`,
                          descripcion: `Beneficiarios atendidos por mes en los últimos seis meses`,
                          etiquetaValor: `Beneficiarios`,
                          puntos: m.beneficiariosPorMes,
                      }),
                  }),
              ],
          })),
          (t[48] = m.beneficiariosPorMes),
          (t[49] = W));
    let G;
    t[50] !== H || t[51] !== U || t[52] !== W
        ? ((G = (0, T.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2 xl:grid-cols-3`,
              children: [H, U, W],
          })),
          (t[50] = H),
          (t[51] = U),
          (t[52] = W),
          (t[53] = G))
        : (G = t[53]);
    let Se;
    t[54] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((Se = (0, T.jsx)(b, {
              children: (0, T.jsx)(y, { children: `Proyectos en seguimiento` }),
          })),
          (t[54] = Se))
        : (Se = t[54]);
    let K;
    t[55] === i.seguimiento
        ? (K = t[56])
        : ((K = (0, T.jsxs)(S, {
              children: [
                  Se,
                  (0, T.jsx)(x, {
                      children:
                          i.seguimiento.length === 0
                              ? (0, T.jsx)(`p`, {
                                    className: `text-sm text-muted-foreground`,
                                    children: `No hay proyectos en ejecución.`,
                                })
                              : (0, T.jsx)(`ul`, {
                                    className: `space-y-3 text-sm`,
                                    children: i.seguimiento.map(se),
                                }),
                  }),
              ],
          })),
          (t[55] = i.seguimiento),
          (t[56] = K));
    let q;
    t[57] === a.rango
        ? (q = t[58])
        : ((q = (0, T.jsx)(b, {
              children: (0, T.jsxs)(y, {
                  children: [`Ocupación de espacios (`, a.rango, `)`],
              }),
          })),
          (t[57] = a.rango),
          (t[58] = q));
    let J;
    t[59] === a.proximas
        ? (J = t[60])
        : ((J =
              a.proximas.length === 0
                  ? (0, T.jsx)(`p`, {
                        className: `text-sm text-muted-foreground`,
                        children: `No hay reservas confirmadas esta semana.`,
                    })
                  : (0, T.jsx)(`ul`, {
                        className: `divide-y text-sm`,
                        children: a.proximas.map(oe),
                    })),
          (t[59] = a.proximas),
          (t[60] = J));
    let Y;
    t[61] === a.enMantenimiento
        ? (Y = t[62])
        : ((Y =
              a.enMantenimiento > 0 &&
              (0, T.jsxs)(`p`, {
                  className: `mt-3 text-xs text-muted-foreground`,
                  children: [
                      a.enMantenimiento,
                      ` espacio(s) en mantenimiento.`,
                  ],
              })),
          (t[61] = a.enMantenimiento),
          (t[62] = Y));
    let X;
    t[63] !== J || t[64] !== Y
        ? ((X = (0, T.jsxs)(x, { children: [J, Y] })),
          (t[63] = J),
          (t[64] = Y),
          (t[65] = X))
        : (X = t[65]);
    let Z;
    t[66] !== q || t[67] !== X
        ? ((Z = (0, T.jsxs)(S, { children: [q, X] })),
          (t[66] = q),
          (t[67] = X),
          (t[68] = Z))
        : (Z = t[68]);
    let Q;
    t[69] !== K || t[70] !== Z
        ? ((Q = (0, T.jsxs)(`div`, {
              className: `grid gap-4 lg:grid-cols-2`,
              children: [K, Z],
          })),
          (t[69] = K),
          (t[70] = Z),
          (t[71] = Q))
        : (Q = t[71]);
    let $;
    return (
        t[72] !== R ||
        t[73] !== V ||
        t[74] !== G ||
        t[75] !== Q ||
        t[76] !== D ||
        t[77] !== O
            ? (($ = (0, T.jsxs)(T.Fragment, {
                  children: [
                      h,
                      (0, T.jsxs)(`div`, {
                          className: `space-y-6 px-4 py-6`,
                          children: [D, O, R, V, G, Q],
                      }),
                  ],
              })),
              (t[72] = R),
              (t[73] = V),
              (t[74] = G),
              (t[75] = Q),
              (t[76] = D),
              (t[77] = O),
              (t[78] = $))
            : ($ = t[78]),
        $
    );
}
function oe(e) {
    return (0, T.jsxs)(
        `li`,
        {
            className: `flex items-start justify-between gap-4 py-2 first:pt-0 last:pb-0`,
            children: [
                (0, T.jsxs)(`div`, {
                    children: [
                        (0, T.jsx)(`p`, {
                            className: `font-medium`,
                            children: e.espacio,
                        }),
                        (0, T.jsx)(`p`, {
                            className: `text-xs text-muted-foreground`,
                            children: e.solicitante,
                        }),
                    ],
                }),
                (0, T.jsxs)(`span`, {
                    className: `text-xs whitespace-nowrap text-muted-foreground`,
                    children: [
                        C(e.fecha),
                        (0, T.jsx)(`br`, {}),
                        e.hora_inicio,
                        ` –`,
                        ` `,
                        e.hora_fin,
                    ],
                }),
            ],
        },
        e.id,
    );
}
function se(e) {
    return (0, T.jsxs)(
        `li`,
        {
            children: [
                (0, T.jsxs)(`div`, {
                    className: `flex items-center justify-between`,
                    children: [
                        (0, T.jsx)(`span`, {
                            className: `font-medium`,
                            children: e.nombre,
                        }),
                        (0, T.jsxs)(`span`, {
                            className: `text-muted-foreground tabular-nums`,
                            children: [e.avance_fisico, `%`],
                        }),
                    ],
                }),
                (0, T.jsx)(`span`, {
                    className: `text-xs text-muted-foreground`,
                    children: e.unidad,
                }),
                (0, T.jsx)(`div`, {
                    className: `mt-1 h-2 overflow-hidden rounded-full bg-muted`,
                    children: (0, T.jsx)(`div`, {
                        className: `h-full rounded-full bg-primary`,
                        style: { width: `${e.avance_fisico}%` },
                    }),
                }),
            ],
        },
        e.id,
    );
}
function ce(e) {
    return { etiqueta: e.etiqueta, valor: e.total };
}
function le(e) {
    return (0, T.jsxs)(
        `li`,
        {
            className: `flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0`,
            children: [
                (0, T.jsxs)(`div`, {
                    children: [
                        (0, T.jsx)(`p`, {
                            className: `font-medium`,
                            children: e.nombre,
                        }),
                        (0, T.jsxs)(`p`, {
                            className: `text-xs text-muted-foreground`,
                            children: [
                                C(e.fecha),
                                e.hora_inicio ? ` · ${e.hora_inicio}` : ``,
                                ` `,
                                `· `,
                                e.lugar,
                                ` ·`,
                                ` `,
                                e.unidad,
                            ],
                        }),
                    ],
                }),
                (0, T.jsx)(m, {
                    variant: `secondary`,
                    children: e.estado_nombre,
                }),
            ],
        },
        e.id,
    );
}
function ue(e) {
    return (0, T.jsx)(
        s,
        {
            variant: e.total > 0 ? `default` : `outline`,
            asChild: !0,
            children: (0, T.jsxs)(n, {
                href: e.ruta,
                children: [
                    e.etiqueta,
                    (0, T.jsx)(m, {
                        variant: `secondary`,
                        className: `ml-1 tabular-nums`,
                        children: e.total,
                    }),
                ],
            }),
        },
        e.etiqueta,
    );
}
P.layout = { breadcrumbs: [{ title: `Panel`, href: h() }] };
export { P as default };
