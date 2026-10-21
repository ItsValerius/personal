"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

export interface SkillGroup {
  key: string;
  title: string;
  core?: string[];
  skills: string[];
}

export interface Skill {
  name: string;
  group: string;
  core: boolean;
}

export type Pos = { x: number; y: number };
export type Size = { w: number; h: number };
// share of the ellipse radii that words may use, so nothing touches the curve
const INSET = 0.86;
export const PAD = 8;
export const ALL = "all";

// round-robin across groups so "all" reads as one mixed field
export const mix = (groups: SkillGroup[]): Skill[] => {
  const lists = groups.map((g) =>
    g.skills.map((name) => ({ name, group: g.key, core: false }))
  );
  const out: Skill[] = [];
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++)
    for (const list of lists) if (list[i]) out.push(list[i]);
  return out;
};

// Pack words into rows inside an ellipse, centre row first, then alternating up and down.
// Each row only takes the width of the ellipse chord at its outer edge. Returns null if
// the words do not fit at this height.
export const pack = (
  order: Skill[],
  sizes: Map<string, Size>,
  width: number,
  height: number,
  gapX: number,
  gapY: number
): Map<string, Pos> | null => {
  const a = (width / 2) * INSET;
  const b = (height / 2) * INSET;
  const chord = (edge: number) => {
    const r = 1 - (edge * edge) / (b * b);
    return r <= 0 ? 0 : 2 * a * Math.sqrt(r);
  };
  const pos = new Map<string, Pos>();
  let next = 0;
  let top = 0;
  let bottom = 0;
  let up = true;
  let blocked = { up: false, down: false };
  let first = true;

  while (next < order.length) {
    if (blocked.up && blocked.down) return null;
    const rowH = sizes.get(order[next].name)!.h;
    let y: number;
    if (first) y = 0;
    else if ((up && !blocked.up) || blocked.down) y = top - gapY - rowH / 2;
    else y = bottom + gapY + rowH / 2;
    const goingUp = !first && y < 0;
    const usable = chord(Math.abs(y) + rowH / 2);

    const row: Skill[] = [];
    let used = 0;
    while (next < order.length) {
      const s = sizes.get(order[next].name)!;
      const add = s.w + (row.length ? gapX : 0);
      if (s.h > rowH * 1.05 || used + add > usable) break;
      row.push(order[next]);
      used += add;
      next++;
    }
    if (!row.length) {
      if (first) return null;
      blocked = { ...blocked, [goingUp ? "up" : "down"]: true };
      up = !goingUp;
      continue;
    }
    let x = -used / 2;
    for (const s of row) {
      const w = sizes.get(s.name)!.w;
      pos.set(s.name, { x: x + w / 2, y });
      x += w + gapX;
    }
    if (first) {
      top = -rowH / 2;
      bottom = rowH / 2;
      first = false;
    } else if (goingUp) top = y - rowH / 2;
    else bottom = y + rowH / 2;
    up = !up;
  }
  return pos;
};

// Drop words at random spots inside the ellipse without overlapping, biggest first so the
// large badges always find room; falls back to the packed spot if no free spot turns up.
export const scatter = (
  order: Skill[],
  sizes: Map<string, Size>,
  width: number,
  height: number,
  fallback: Map<string, Pos>
) => {
  const ra = (width / 2) * 0.94;
  const rb = (height / 2) * 0.94;
  const placed: { x0: number; y0: number; x1: number; y1: number }[] = [];
  const out = new Map<string, Pos>();
  const bySize = [...order].sort((a, b) => sizes.get(b.name)!.w - sizes.get(a.name)!.w);
  for (const s of bySize) {
    const { w, h } = sizes.get(s.name)!;
    let spot: Pos | null = null;
    for (let i = 0; i < 300 && !spot; i++) {
      const x = (Math.random() * 2 - 1) * ra;
      const y = (Math.random() * 2 - 1) * rb;
      const ex = (Math.abs(x) + w / 2) / ra;
      const ey = (Math.abs(y) + h / 2) / rb;
      if (ex * ex + ey * ey > 1) continue;
      const r = { x0: x - w / 2 - PAD / 2, y0: y - h / 2 - PAD / 2, x1: x + w / 2 + PAD / 2, y1: y + h / 2 + PAD / 2 };
      if (placed.some((q) => r.x0 < q.x1 && q.x0 < r.x1 && r.y0 < q.y1 && q.y0 < r.y1)) continue;
      placed.push(r);
      spot = { x: x + width / 2, y: y + height / 2 };
    }
    out.set(s.name, spot ?? fallback.get(s.name)!);
  }
  return out;
};

export interface SkillLayout {
  width: number;
  height: number;
  sizes: Map<string, Size>;
  // tidy non-overlapping arrangement per filter (reduced motion, ellipse sizing)
  byKey: Map<string, Map<string, Pos>>;
  // compact block in the middle for each filter's pinned group
  clusters: Map<string, Map<string, Pos>>;
  // random non-overlapping start spots for the animated field
  start: Map<string, Pos>;
}

// Measures every rendered badge and lays them out inside an ellipse that fills the field's
// width; re-runs when the width changes.
export function useSkillLayout(groups: SkillGroup[]) {
  const [layout, setLayout] = useState<SkillLayout | null>(null);
  const field = useRef<HTMLUListElement>(null);
  const items = useRef(new Map<string, HTMLLIElement>());

  const core = groups.flatMap((g) =>
    (g.core ?? []).map((name) => ({ name, group: g.key, core: true }))
  );
  const all = [...core, ...mix(groups)];

  const measure = useCallback(() => {
    const el = field.current;
    if (!el) return;
    const width = el.clientWidth;
    const sizes = new Map<string, Size>();
    items.current.forEach((li, name) => sizes.set(name, { w: li.offsetWidth, h: li.offsetHeight }));
    const narrow = width < 640;
    const gapX = narrow ? 6 : 12;
    const gapY = narrow ? 6 : 10;
    const orders: [string, Skill[]][] = [
      [ALL, all],
      ...groups.map((g): [string, Skill[]] => [
        g.key,
        [...all.filter((s) => s.group === g.key), ...all.filter((s) => s.group !== g.key)],
      ]),
    ];
    // grow the ellipse until every arrangement fits, so filtering never changes its size
    let height = width * (narrow ? 1.3 : 0.42);
    for (let tries = 0; tries < 60; tries++, height *= 1.05) {
      const byKey = new Map<string, Map<string, Pos>>();
      for (const [key, order] of orders) {
        const p = pack(order, sizes, width, height, gapX, gapY);
        if (!p) break;
        byKey.set(key, new Map([...p].map(([n, q]) => [n, { x: q.x + width / 2, y: q.y + height / 2 }])));
      }
      if (byKey.size !== orders.length) continue;
      const clusters = new Map<string, Map<string, Pos>>();
      for (const [key, order] of orders) {
        const pinned = order.filter((s) => key !== ALL && s.group === key);
        for (let f = narrow ? 0.6 : 0.35; f <= 1.01; f += 0.05) {
          const p = pack(pinned, sizes, width * f, height * f, gapX, gapY);
          if (!p) continue;
          clusters.set(key, new Map([...p].map(([n, q]) => [n, { x: q.x + width / 2, y: q.y + height / 2 }])));
          break;
        }
      }
      // the fit above is tight; add room so floating words can get around a pinned block
      const room = narrow ? 1.15 : 1.1;
      const grown = height * room;
      const shift = (m: Map<string, Pos>) =>
        new Map([...m].map(([n, q]) => [n, { x: q.x, y: q.y + (grown - height) / 2 }]));
      const arranged = new Map([...byKey].map(([k, m]) => [k, shift(m)]));
      return setLayout({
        width,
        height: grown,
        sizes,
        byKey: arranged,
        clusters: new Map([...clusters].map(([k, m]) => [k, shift(m)])),
        start: scatter(all, sizes, width, grown, arranged.get(ALL)!),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.length]);

  useLayoutEffect(() => {
    const el = field.current;
    if (!el) return;
    document.fonts.ready.then(measure);
    let width = el.clientWidth;
    const resize = new ResizeObserver(() => {
      if (el.clientWidth !== width) {
        width = el.clientWidth;
        measure();
      }
    });
    resize.observe(el);
    return () => resize.disconnect();
  }, [measure]);

  return { field, items, layout, all };
}
