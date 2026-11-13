import {
    c as e,
    i as t,
    r as n,
    s as r,
    u as i,
} from './wayfinder-C8dNLrFV.js';
import { Ht as a, n as o, r as s } from './app-Bu9EFUG6.js';
var c = n(`Monitor`, [
        [
            `rect`,
            {
                width: `20`,
                height: `14`,
                x: `2`,
                y: `3`,
                rx: `2`,
                key: `48i651`,
            },
        ],
        [`line`, { x1: `8`, x2: `16`, y1: `21`, y2: `21`, key: `1svkeh` }],
        [`line`, { x1: `12`, x2: `12`, y1: `17`, y2: `21`, key: `vw1qmm` }],
    ]),
    l = n(`Moon`, [
        [`path`, { d: `M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z`, key: `a7tn18` }],
    ]),
    u = n(`Sun`, [
        [`circle`, { cx: `12`, cy: `12`, r: `4`, key: `4exip2` }],
        [`path`, { d: `M12 2v2`, key: `tus03m` }],
        [`path`, { d: `M12 20v2`, key: `1lh1kg` }],
        [`path`, { d: `m4.93 4.93 1.41 1.41`, key: `149t6j` }],
        [`path`, { d: `m17.66 17.66 1.41 1.41`, key: `ptbguv` }],
        [`path`, { d: `M2 12h2`, key: `1t8f8n` }],
        [`path`, { d: `M20 12h2`, key: `1q8mjw` }],
        [`path`, { d: `m6.34 17.66-1.41 1.41`, key: `1m8zz5` }],
        [`path`, { d: `m19.07 4.93-1.41 1.41`, key: `1shlcs` }],
    ]),
    d = e(),
    f = r();
function p({ className: e = ``, ...n }) {
    let { appearance: r, updateAppearance: i } = a(),
        o = [
            { value: `light`, icon: u, label: `Claro` },
            { value: `dark`, icon: l, label: `Oscuro` },
            { value: `system`, icon: c, label: `Sistema` },
        ];
    return (0, f.jsx)(`div`, {
        className: t(`inline-flex gap-1 rounded-lg bg-muted p-1`, e),
        ...n,
        children: o.map(({ value: e, icon: n, label: a }) =>
            (0, f.jsxs)(
                `button`,
                {
                    onClick: () => i(e),
                    className: t(
                        `flex items-center rounded-md px-3.5 py-1.5 transition-colors`,
                        r === e
                            ? `bg-background text-foreground shadow-xs`
                            : `text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground`,
                    ),
                    children: [
                        (0, f.jsx)(n, { className: `-ml-1 h-4 w-4` }),
                        (0, f.jsx)(`span`, {
                            className: `ml-1.5 text-sm`,
                            children: a,
                        }),
                    ],
                },
                e,
            ),
        ),
    });
}
function m() {
    let e = (0, d.c)(3),
        t,
        n;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((t = (0, f.jsx)(i, { title: `Apariencia` })),
          (n = (0, f.jsx)(`h1`, {
              className: `sr-only`,
              children: `Apariencia`,
          })),
          (e[0] = t),
          (e[1] = n))
        : ((t = e[0]), (n = e[1]));
    let r;
    return (
        e[2] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((r = (0, f.jsxs)(f.Fragment, {
                  children: [
                      t,
                      n,
                      (0, f.jsxs)(`div`, {
                          className: `space-y-6`,
                          children: [
                              (0, f.jsx)(s, {
                                  variant: `small`,
                                  title: `Apariencia`,
                                  description: `Elija cómo se ve el sistema en este dispositivo`,
                              }),
                              (0, f.jsx)(p, {}),
                          ],
                      }),
                  ],
              })),
              (e[2] = r))
            : (r = e[2]),
        r
    );
}
m.layout = { breadcrumbs: [{ title: `Apariencia`, href: o() }] };
export { m as default };
