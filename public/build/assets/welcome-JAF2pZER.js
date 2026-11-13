import {
    c as e,
    d as t,
    i as n,
    r,
    s as i,
    u as a,
} from './wayfinder-C8dNLrFV.js';
import { t as o } from './button-BzkMvCJO.js';
import { t as s } from './arrow-right-BItnT0Ub.js';
import {
    Dt as c,
    M as l,
    Mt as u,
    N as d,
    Pt as f,
    _t as p,
    j as m,
} from './app-Bu9EFUG6.js';
var h = r(`GraduationCap`, [
        [
            `path`,
            {
                d: `M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z`,
                key: `j76jl0`,
            },
        ],
        [`path`, { d: `M22 10v6`, key: `1lu8f3` }],
        [`path`, { d: `M6 12.5V16a6 3 0 0 0 12 0v-3.5`, key: `1r8lef` }],
    ]),
    g = r(`HeartHandshake`, [
        [
            `path`,
            {
                d: `M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z`,
                key: `c3ymky`,
            },
        ],
        [
            `path`,
            {
                d: `M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66`,
                key: `4oyue0`,
            },
        ],
        [`path`, { d: `m18 15-2-2`, key: `60u0ii` }],
        [`path`, { d: `m15 18-2-2`, key: `6p76be` }],
    ]),
    _ = r(`Palette`, [
        [
            `circle`,
            {
                cx: `13.5`,
                cy: `6.5`,
                r: `.5`,
                fill: `currentColor`,
                key: `1okk4w`,
            },
        ],
        [
            `circle`,
            {
                cx: `17.5`,
                cy: `10.5`,
                r: `.5`,
                fill: `currentColor`,
                key: `f64h9f`,
            },
        ],
        [
            `circle`,
            {
                cx: `8.5`,
                cy: `7.5`,
                r: `.5`,
                fill: `currentColor`,
                key: `fotxhn`,
            },
        ],
        [
            `circle`,
            {
                cx: `6.5`,
                cy: `12.5`,
                r: `.5`,
                fill: `currentColor`,
                key: `qy21gx`,
            },
        ],
        [
            `path`,
            {
                d: `M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z`,
                key: `12rzf8`,
            },
        ],
    ]),
    v = r(`Trophy`, [
        [`path`, { d: `M6 9H4.5a2.5 2.5 0 0 1 0-5H6`, key: `17hqa7` }],
        [`path`, { d: `M18 9h1.5a2.5 2.5 0 0 0 0-5H18`, key: `lmptdp` }],
        [`path`, { d: `M4 22h16`, key: `57wxv0` }],
        [
            `path`,
            {
                d: `M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22`,
                key: `1nw9bq`,
            },
        ],
        [
            `path`,
            {
                d: `M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22`,
                key: `1np0yb`,
            },
        ],
        [`path`, { d: `M18 2H6v7a6 6 0 0 0 12 0V2Z`, key: `u46fv3` }],
    ]),
    y = e(),
    b = i(),
    x = [
        {
            nombre: `Formación y actualización`,
            descripcion: `Cursos, diplomados y talleres para seguir aprendiendo a lo largo de la vida.`,
            icono: h,
            color: `text-chart-1`,
            fondo: `bg-chart-1`,
        },
        {
            nombre: `Cultura`,
            descripcion: `Música, teatro, artes visuales y literatura que salen de la universidad hacia la gente.`,
            icono: _,
            color: `text-chart-2`,
            fondo: `bg-chart-2`,
        },
        {
            nombre: `Deporte`,
            descripcion: `Encuentros, torneos y recreación para la comunidad universitaria y el público.`,
            icono: v,
            color: `text-chart-3`,
            fondo: `bg-chart-3`,
        },
        {
            nombre: `Vinculación con la sociedad`,
            descripcion: `Proyectos junto a comunidades, instituciones y organizaciones del país.`,
            icono: g,
            color: `text-chart-4`,
            fondo: `bg-chart-4`,
        },
        {
            nombre: `Interdisciplinariedad`,
            descripcion: `Trabajo conjunto entre unidades académicas alrededor de problemas comunes.`,
            icono: c,
            color: `text-chart-5`,
            fondo: `bg-chart-5`,
        },
    ];
function S(e) {
    return { animationDelay: `${e * 55}ms` };
}
function C() {
    let e = (0, y.c)(29),
        n;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((n = (0, b.jsx)(a, {
              title: `Dirección General de Extensión Universitaria`,
          })),
          (e[0] = n))
        : (n = e[0]);
    let r;
    e[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((r = (0, b.jsx)(`div`, {
              'aria-hidden': !0,
              className: `pointer-events-none absolute inset-x-0 -top-40 h-[32rem] resplandor-portada`,
          })),
          (e[1] = r))
        : (r = e[1]);
    let i;
    e[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((i = (0, b.jsx)(`p`, {
              className: `asomar text-xs font-semibold tracking-[0.18em] text-digeu-azure uppercase dark:text-digeu-teal`,
              style: S(0),
              children: `Universidad de San Carlos de Guatemala`,
          })),
          (e[2] = i))
        : (i = e[2]);
    let c;
    e[3] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((c = (0, b.jsx)(`h1`, {
              className: `mx-auto mt-5 max-w-4xl asomar titular-display text-digeu-navy dark:text-white`,
              style: S(1),
              children: `La extensión universitaria, al alcance de todos`,
          })),
          (e[3] = c))
        : (c = e[3]);
    let h;
    e[4] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, b.jsx)(`p`, {
              className: `mx-auto mt-6 max-w-2xl asomar entrada-lectura text-muted-foreground`,
              style: S(2),
              children: `La DIGEU promueve el desarrollo sobre la base de una verdadera proyección popular: acerca a estudiantes, docentes y personal administrativo a las manifestaciones científicas, artísticas, culturales y deportivas del país.`,
          })),
          (e[4] = h))
        : (h = e[4]);
    let g;
    e[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = S(3)), (e[5] = g))
        : (g = e[5]);
    let _;
    e[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((_ = (0, b.jsx)(o, {
              size: `lg`,
              asChild: !0,
              className: `transition-transform duration-150 ease-out active:scale-[0.97]`,
              children: (0, b.jsxs)(t, {
                  href: m(),
                  children: [(0, b.jsx)(u, {}), `Ver la Agenda Cultural`],
              }),
          })),
          (e[6] = _))
        : (_ = e[6]);
    let v;
    e[7] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((v = (0, b.jsxs)(`div`, {
              className: `mt-9 flex asomar flex-wrap justify-center gap-3`,
              style: g,
              children: [
                  _,
                  (0, b.jsx)(o, {
                      size: `lg`,
                      variant: `outline`,
                      asChild: !0,
                      className: `transition-transform duration-150 ease-out active:scale-[0.97]`,
                      children: (0, b.jsxs)(t, {
                          href: d(),
                          children: [(0, b.jsx)(f, {}), `Conocer los espacios`],
                      }),
                  }),
              ],
          })),
          (e[7] = v))
        : (v = e[7]);
    let C;
    e[8] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((C = S(4)), (e[8] = C))
        : (C = e[8]);
    let E;
    e[9] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((E = (0, b.jsxs)(`section`, {
              className: `relative overflow-hidden`,
              children: [
                  r,
                  (0, b.jsxs)(`div`, {
                      className: `relative mx-auto w-full max-w-6xl px-4 pt-14 pb-16 text-center md:pt-24 md:pb-24`,
                      children: [
                          i,
                          c,
                          h,
                          v,
                          (0, b.jsx)(`div`, {
                              className: `mx-auto mt-14 flex h-1.5 max-w-xl asomar overflow-hidden rounded-full`,
                              style: C,
                              'aria-hidden': !0,
                              children: x.map(T),
                          }),
                      ],
                  }),
              ],
          })),
          (e[9] = E))
        : (E = e[9]);
    let D;
    e[10] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((D = (0, b.jsxs)(`div`, {
              className: `max-w-2xl`,
              children: [
                  (0, b.jsx)(`h2`, {
                      className: `titular-seccion text-foreground`,
                      children: `Cinco áreas, un mismo propósito`,
                  }),
                  (0, b.jsx)(`p`, {
                      className: `mt-3 text-muted-foreground`,
                      children: `El trabajo de la Dirección se organiza en cinco áreas que atienden a la comunidad universitaria y a la población en general.`,
                  }),
              ],
          })),
          (e[10] = D))
        : (D = e[10]);
    let O;
    e[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((O = (0, b.jsxs)(`section`, {
              className: `mx-auto w-full max-w-6xl px-4 py-16 md:py-20`,
              children: [
                  D,
                  (0, b.jsx)(`ul`, {
                      className: `mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,
                      children: x.map(w),
                  }),
              ],
          })),
          (e[11] = O))
        : (O = e[11]);
    let k;
    e[12] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((k = m()), (e[12] = k))
        : (k = e[12]);
    let A;
    e[13] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((A = (0, b.jsx)(`span`, {
              'aria-hidden': !0,
              className: `pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-chart-2/10 blur-2xl`,
          })),
          (e[13] = A))
        : (A = e[13]);
    let j;
    e[14] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((j = (0, b.jsxs)(`div`, {
              className: `relative`,
              children: [
                  (0, b.jsx)(`span`, {
                      className: `flex size-11 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2`,
                      children: (0, b.jsx)(u, { className: `size-5` }),
                  }),
                  (0, b.jsx)(`h2`, {
                      className: `mt-6 text-2xl font-semibold tracking-[-0.015em]`,
                      children: `Agenda Cultural`,
                  }),
                  (0, b.jsx)(`p`, {
                      className: `mt-3 max-w-md leading-relaxed text-muted-foreground`,
                      children: `Conciertos, exposiciones, talleres y encuentros deportivos abiertos a la comunidad universitaria y al público.`,
                  }),
              ],
          })),
          (e[14] = j))
        : (j = e[14]);
    let M;
    e[15] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((M = (0, b.jsxs)(t, {
              href: k,
              className: `group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] active:scale-[0.995] md:p-10`,
              children: [
                  A,
                  j,
                  (0, b.jsxs)(`span`, {
                      className: `relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-digeu-azure dark:text-digeu-teal`,
                      children: [
                          `Ver la agenda del mes`,
                          (0, b.jsx)(s, {
                              className: `size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1`,
                          }),
                      ],
                  }),
              ],
          })),
          (e[15] = M))
        : (M = e[15]);
    let N;
    e[16] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((N = d()), (e[16] = N))
        : (N = e[16]);
    let P;
    e[17] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((P = (0, b.jsx)(`span`, {
              'aria-hidden': !0,
              className: `pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-chart-3/10 blur-2xl`,
          })),
          (e[17] = P))
        : (P = e[17]);
    let F;
    e[18] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((F = (0, b.jsxs)(`div`, {
              className: `relative`,
              children: [
                  (0, b.jsx)(`span`, {
                      className: `flex size-11 items-center justify-center rounded-xl bg-chart-3/10 text-chart-3`,
                      children: (0, b.jsx)(f, { className: `size-5` }),
                  }),
                  (0, b.jsx)(`h2`, {
                      className: `mt-6 text-2xl font-semibold tracking-[-0.015em]`,
                      children: `Espacios de la DIGEU`,
                  }),
                  (0, b.jsx)(`p`, {
                      className: `mt-3 max-w-md leading-relaxed text-muted-foreground`,
                      children: `Salones, auditorios, patios y canchas disponibles para actividades académicas, culturales y deportivas.`,
                  }),
              ],
          })),
          (e[18] = F))
        : (F = e[18]);
    let I;
    e[19] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((I = (0, b.jsx)(`section`, {
              className: `mx-auto w-full max-w-6xl px-4 pb-16 md:pb-24`,
              children: (0, b.jsxs)(`div`, {
                  className: `grid gap-4 md:grid-cols-2`,
                  children: [
                      M,
                      (0, b.jsxs)(t, {
                          href: N,
                          className: `group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] active:scale-[0.995] md:p-10`,
                          children: [
                              P,
                              F,
                              (0, b.jsxs)(`span`, {
                                  className: `relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-digeu-azure dark:text-digeu-teal`,
                                  children: [
                                      `Conocer el catálogo`,
                                      (0, b.jsx)(s, {
                                          className: `size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1`,
                                      }),
                                  ],
                              }),
                          ],
                      }),
                  ],
              }),
          })),
          (e[19] = I))
        : (I = e[19]);
    let L, R;
    e[20] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((L = (0, b.jsx)(`h2`, {
              className: `max-w-md titular-seccion`,
              children: `¿Necesita un espacio para su actividad?`,
          })),
          (R = (0, b.jsx)(`p`, {
              className: `mt-4 max-w-md leading-relaxed text-white/70`,
              children: `Las unidades académicas, las organizaciones estudiantiles y las instituciones pueden solicitar el uso de los espacios de la Dirección en línea.`,
          })),
          (e[20] = L),
          (e[21] = R))
        : ((L = e[20]), (R = e[21]));
    let z;
    e[22] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((z = l()), (e[22] = z))
        : (z = e[22]);
    let B;
    e[23] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((B = (0, b.jsxs)(`div`, {
              children: [
                  L,
                  R,
                  (0, b.jsx)(o, {
                      size: `lg`,
                      variant: `secondary`,
                      asChild: !0,
                      className: `mt-7 transition-transform duration-150 ease-out active:scale-[0.97]`,
                      children: (0, b.jsxs)(t, {
                          href: z,
                          children: [`Solicitar un espacio`, (0, b.jsx)(s, {})],
                      }),
                  }),
              ],
          })),
          (e[23] = B))
        : (B = e[23]);
    let V, H, U;
    e[24] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((V = (0, b.jsx)(`p`, {
              className: `text-xs font-semibold tracking-[0.18em] text-white/50 uppercase`,
              children: `Personal de la DIGEU`,
          })),
          (H = (0, b.jsx)(`h3`, {
              className: `mt-4 text-xl font-semibold`,
              children: `SIGEU, el sistema de gestión de la Dirección`,
          })),
          (U = (0, b.jsx)(`p`, {
              className: `mt-3 leading-relaxed text-white/70`,
              children: `Registro de actividades, proyectos, recurso humano y espacios, con la información que alimenta la memoria de labores.`,
          })),
          (e[24] = V),
          (e[25] = H),
          (e[26] = U))
        : ((V = e[24]), (H = e[25]), (U = e[26]));
    let W;
    e[27] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((W = p()), (e[27] = W))
        : (W = e[27]);
    let G;
    return (
        e[28] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((G = (0, b.jsxs)(b.Fragment, {
                  children: [
                      n,
                      E,
                      O,
                      I,
                      (0, b.jsx)(`section`, {
                          className: `bg-digeu-navy text-white`,
                          children: (0, b.jsxs)(`div`, {
                              className: `mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-20`,
                              children: [
                                  B,
                                  (0, b.jsxs)(`div`, {
                                      className: `rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm`,
                                      children: [
                                          V,
                                          H,
                                          U,
                                          (0, b.jsxs)(t, {
                                              href: W,
                                              className: `group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98]`,
                                              children: [
                                                  `Ingresar al sistema`,
                                                  (0, b.jsx)(s, {
                                                      className: `size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1`,
                                                  }),
                                              ],
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                      }),
                  ],
              })),
              (e[28] = G))
            : (G = e[28]),
        G
    );
}
function w(e) {
    return (0, b.jsxs)(
        `li`,
        {
            className: `group rounded-2xl border bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)]`,
            children: [
                (0, b.jsx)(`span`, {
                    className: n(
                        `flex size-11 items-center justify-center rounded-xl bg-muted`,
                        e.color,
                    ),
                    children: (0, b.jsx)(e.icono, { className: `size-5` }),
                }),
                (0, b.jsx)(`h3`, {
                    className: `mt-5 font-semibold text-balance`,
                    children: e.nombre,
                }),
                (0, b.jsx)(`p`, {
                    className: `mt-2 text-sm leading-relaxed text-muted-foreground`,
                    children: e.descripcion,
                }),
            ],
        },
        e.nombre,
    );
}
function T(e) {
    return (0, b.jsx)(`span`, { className: n(`flex-1`, e.fondo) }, e.nombre);
}
C.layout = { anchoCompleto: !0 };
export { C as default };
