import { c as e, i as t, r as n, s as r } from './wayfinder-C8dNLrFV.js';
import { t as i } from './button-BzkMvCJO.js';
var a = n(`Printer`, [
        [
            `path`,
            {
                d: `M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2`,
                key: `143wyd`,
            },
        ],
        [
            `path`,
            { d: `M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6`, key: `1itne7` },
        ],
        [
            `rect`,
            {
                x: `6`,
                y: `14`,
                width: `12`,
                height: `8`,
                rx: `1`,
                key: `1ue0tg`,
            },
        ],
    ]),
    o = r();
function s({ etiqueta: e = `Imprimir` }) {
    return (0, o.jsxs)(i, {
        variant: `outline`,
        onClick: () => window.print(),
        className: `print:hidden`,
        children: [(0, o.jsx)(a, {}), e],
    });
}
var c = e();
function l(e) {
    let n = (0, c.c)(23),
        { titulo: r, periodo: i, alcance: a, className: s } = e,
        l,
        d,
        f;
    if (n[0] === Symbol.for(`react.memo_cache_sentinel`)) {
        let e = new Date(),
            t = u;
        ((f = `${t(e.getDate())}-${t(e.getMonth() + 1)}-${e.getFullYear()}`),
            (l = t(e.getHours())),
            (d = t(e.getMinutes())),
            (n[0] = l),
            (n[1] = d),
            (n[2] = f));
    } else ((l = n[0]), (d = n[1]), (f = n[2]));
    let p = f + ` ${l}:${d}`,
        m;
    n[3] === s
        ? (m = n[4])
        : ((m = t(
              `hidden border-b border-black pb-3 text-black print:block`,
              s,
          )),
          (n[3] = s),
          (n[4] = m));
    let h;
    n[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((h = (0, o.jsx)(`img`, {
              src: `/images/logo-impresion.png`,
              alt: `Universidad de San Carlos de Guatemala · DIGEU`,
              className: `h-14 w-auto`,
          })),
          (n[5] = h))
        : (h = n[5]);
    let g;
    n[6] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((g = (0, o.jsxs)(`div`, {
              className: `flex items-start gap-4`,
              children: [
                  h,
                  (0, o.jsxs)(`div`, {
                      className: `flex-1`,
                      children: [
                          (0, o.jsx)(`p`, {
                              className: `text-[11pt] font-semibold`,
                              children: `Universidad de San Carlos de Guatemala`,
                          }),
                          (0, o.jsx)(`p`, {
                              className: `text-[10pt]`,
                              children: `Dirección General de Extensión Universitaria`,
                          }),
                          (0, o.jsx)(`p`, {
                              className: `text-[10pt]`,
                              children: `Sistema de Gestión de Extensión Universitaria`,
                          }),
                      ],
                  }),
              ],
          })),
          (n[6] = g))
        : (g = n[6]);
    let _;
    n[7] === r
        ? (_ = n[8])
        : ((_ = (0, o.jsx)(`h1`, {
              className: `text-[13pt] font-semibold`,
              children: r,
          })),
          (n[7] = r),
          (n[8] = _));
    let v;
    n[9] === i
        ? (v = n[10])
        : ((v =
              i &&
              (0, o.jsx)(`p`, {
                  className: `text-[10pt] first-letter:uppercase`,
                  children: i,
              })),
          (n[9] = i),
          (n[10] = v));
    let y;
    n[11] === a
        ? (y = n[12])
        : ((y =
              a && (0, o.jsx)(`p`, { className: `text-[10pt]`, children: a })),
          (n[11] = a),
          (n[12] = y));
    let b;
    n[13] !== _ || n[14] !== v || n[15] !== y
        ? ((b = (0, o.jsxs)(`div`, { children: [_, v, y] })),
          (n[13] = _),
          (n[14] = v),
          (n[15] = y),
          (n[16] = b))
        : (b = n[16]);
    let x;
    n[17] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((x = (0, o.jsxs)(`p`, {
              className: `text-[9pt] whitespace-nowrap`,
              children: [`Impreso el `, p],
          })),
          (n[17] = x))
        : (x = n[17]);
    let S;
    n[18] === b
        ? (S = n[19])
        : ((S = (0, o.jsxs)(`div`, {
              className: `mt-3 flex items-end justify-between gap-4`,
              children: [b, x],
          })),
          (n[18] = b),
          (n[19] = S));
    let C;
    return (
        n[20] !== S || n[21] !== m
            ? ((C = (0, o.jsxs)(`header`, { className: m, children: [g, S] })),
              (n[20] = S),
              (n[21] = m),
              (n[22] = C))
            : (C = n[22]),
        C
    );
}
function u(e) {
    return String(e).padStart(2, `0`);
}
export { s as n, l as t };
