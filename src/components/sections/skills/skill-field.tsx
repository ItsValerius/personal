"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type MatterJS from "matter-js";
import { cn } from "@/lib/utils";
import SkillIcon from "./skill-icon";

export interface SkillGroup {
  key: string;
  title: string;
  core?: string[];
  skills: string[];
}

interface Skill {
  name: string;
  group: string;
  core: boolean;
}

type Pos = { x: number; y: number };
type Size = { w: number; h: number };
interface Layout {
  width: number;
  height: number;
  sizes: Map<string, Size>;
  byKey: Map<string, Map<string, Pos>>;
  clusters: Map<string, Map<string, Pos>>;
  start: Map<string, Pos>;
}

const ALL = "all";
// share of the ellipse radii that words may use, so nothing touches the curve
const INSET = 0.86;
const PAD = 8;
// Floating words collide hard only with the wall and the pinned block; between each other
// they are separated by a soft push. An evicted word ignores the block until it is out.
const WALL = 0x1;
const PINNED = 0x2;
const FLOATING = 0x4;
const SOLID = { category: FLOATING, mask: WALL | PINNED };
const GHOST = { category: FLOATING, mask: WALL };

// round-robin across groups so "all" reads as one mixed field
const mix = (groups: SkillGroup[]): Skill[] => {
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
const pack = (
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
const scatter = (
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

const SkillField = ({ groups, allLabel }: { groups: SkillGroup[]; allLabel: string }) => {
  const [active, setActive] = useState<string>(ALL);
  const [layout, setLayout] = useState<Layout | null>(null);
  const field = useRef<HTMLUListElement>(null);
  const items = useRef(new Map<string, HTMLLIElement>());
  const activeRef = useRef(active);
  activeRef.current = active;

  const core = groups.flatMap((g) =>
    (g.core ?? []).map((name) => ({ name, group: g.key, core: true }))
  );
  const rest = mix(groups);
  const all = [...core, ...rest];
  const groupOf = new Map(all.map((s) => [s.name, s]));

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

  const isPinned = (name: string, key: string) => key !== ALL && groupOf.get(name)!.group === key;

  const place = (name: string, x: number, y: number) => {
    const li = items.current.get(name);
    const size = layout?.sizes.get(name);
    if (li && size) li.style.transform = `translate(${x - size.w / 2}px, ${y - size.h / 2}px)`;
  };

  // Physics (matter-js): pinned words glide into a static block in the middle; every other
  // word cruises slowly around the ellipse.
  useEffect(() => {
    const el = field.current;
    if (!el || !layout) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};
    import("matter-js").then(({ default: Matter }) => {
      if (cancelled) return;
      const { Engine, Bodies, Body, Composite, Events, Query } = Matter;
      const { width, height, sizes, clusters } = layout;
      const narrow = width < 640;
      // cruising speed in px per 60fps step: calm but always travelling
      const cruise = narrow ? 0.3 : 0.45;
      const engine = Engine.create({
        gravity: { x: 0, y: 0, scale: 0 },
        positionIterations: 12,
        velocityIterations: 8,
      });

      const cx = width / 2;
      const cy = height / 2;
      const segments = 72;
      const thick = 80;
      const walls = Array.from({ length: segments }, (_, k) => {
        const t = (k / segments) * Math.PI * 2;
        const nx = Math.cos(t) / (width / 2);
        const ny = Math.sin(t) / (height / 2);
        const nl = Math.hypot(nx, ny);
        const len = (Math.PI * (width + height)) / segments + 12;
        return Bodies.rectangle(
          cx + (width / 2) * Math.cos(t) + (nx / nl) * (thick / 2),
          cy + (height / 2) * Math.sin(t) + (ny / nl) * (thick / 2),
          len,
          thick,
          { isStatic: true, angle: Math.atan2(ny, nx) + Math.PI / 2, collisionFilter: { category: WALL, mask: PINNED | FLOATING } }
        );
      });

      const bodies = new Map<string, MatterJS.Body>();
      all.forEach((s, i) => {
        const h = layout.start.get(s.name)!;
        const size = sizes.get(s.name)!;
        const b = Bodies.rectangle(h.x, h.y, size.w + PAD, size.h + PAD / 2, {
          chamfer: { radius: (size.h + PAD / 2) / 2 },
          frictionAir: 0,
          friction: 0,
          restitution: 0.3,
          inertia: Infinity,
          collisionFilter: { ...SOLID },
        });
        b.plugin = { turn: 0.2 + ((i * 37) % 11) / 30, phase: i * 1.7 };
        Body.setVelocity(b, { x: cruise * Math.cos(i * 2.4), y: cruise * Math.sin(i * 2.4) });
        bodies.set(s.name, b);
      });
      Composite.add(engine.world, [...walls, ...bodies.values()]);

      const zones = new Map<string, { x0: number; y0: number; x1: number; y1: number } | null>();
      const zoneFor = (key: string) => {
        if (!zones.has(key)) {
          const rects = [...clusters.get(key)!].map(([name, q]) => {
            const sz = sizes.get(name)!;
            return { x0: q.x - sz.w / 2, y0: q.y - sz.h / 2, x1: q.x + sz.w / 2, y1: q.y + sz.h / 2 };
          });
          const zone = rects.length
            ? {
                x0: Math.min(...rects.map((r) => r.x0)),
                y0: Math.min(...rects.map((r) => r.y0)),
                x1: Math.max(...rects.map((r) => r.x1)),
                y1: Math.max(...rects.map((r) => r.y1)),
              }
            : null;
          const m = narrow ? 8 : 14;
          zones.set(key, zone && { x0: zone.x0 - m, y0: zone.y0 - m, x1: zone.x1 + m, y1: zone.y1 + m });
        }
        return zones.get(key)!;
      };

      // The zone grows from the middle as the block glides in, so words move aside
      // progressively rather than all at once.
      let lastKey = activeRef.current;
      let switchedAt = 0;
      const GROW_MS = 600;

      Events.on(engine, "beforeUpdate", () => {
        const key = activeRef.current;
        if (key !== lastKey) {
          lastKey = key;
          switchedAt = engine.timing.timestamp;
        }
        const block = clusters.get(key)!;
        const full = zoneFor(key);
        const grow = Math.min(1, (engine.timing.timestamp - switchedAt) / GROW_MS);
        const ease = 1 - Math.pow(1 - grow, 3);
        const zone = full && {
          x0: full.x0 + ((full.x1 - full.x0) / 2) * (1 - ease),
          x1: full.x1 - ((full.x1 - full.x0) / 2) * (1 - ease),
          y0: full.y0 + ((full.y1 - full.y0) / 2) * (1 - ease),
          y1: full.y1 - ((full.y1 - full.y0) / 2) * (1 - ease),
        };
        const t = engine.timing.timestamp / 1000;
        bodies.forEach((b, name) => {
          const home = block.get(name);
          if (home) {
            // A static body moved into others would shove them a long way in one frame, so it
            // glides in without colliding and turns solid once it arrives.
            if (!b.isStatic) {
              Body.setStatic(b, true);
              b.collisionFilter = { category: PINNED, mask: 0, group: 0 };
            }
            const dx = home.x - b.position.x;
            const dy = home.y - b.position.y;
            if (Math.abs(dx) + Math.abs(dy) > 0.3)
              Body.setPosition(b, { x: b.position.x + dx * 0.06, y: b.position.y + dy * 0.06 });
            else if (!b.collisionFilter.mask)
              b.collisionFilter = { category: PINNED, mask: WALL | PINNED | FLOATING, group: 0 };
            return;
          }
          if (b.isStatic) {
            Body.setStatic(b, false);
            b.collisionFilter = { ...SOLID, group: 0 };
            Body.setVelocity(b, { x: cruise, y: 0 });
          }
          // Words inside the block's zone ease out, faster the deeper they sit, passing
          // through the block so nothing can wedge them in place.
          if (zone) {
            const sz = sizes.get(name)!;
            const hw = sz.w / 2 + PAD / 2;
            const hh = sz.h / 2 + PAD / 2;
            const { x, y } = b.position;
            const inX = Math.min(x + hw - zone.x0, zone.x1 - (x - hw));
            const inY = Math.min(y + hh - zone.y0, zone.y1 - (y - hh));
            if (inX > 0 && inY > 0) {
              if (b.collisionFilter.mask !== GHOST.mask) b.collisionFilter = { ...GHOST, group: 0 };
              const zx = (zone.x0 + zone.x1) / 2;
              const zy = (zone.y0 + zone.y1) / 2;
              // Away from the block's centre, biased toward the side of the ellipse with room so
              // the word never heads into the wall.
              const wide = (full!.x1 - full!.x0) / width > (full!.y1 - full!.y0) / height;
              let dx = (x - zx) * (wide ? 0.25 : 1);
              let dy = (y - zy) * (wide ? 1 : 0.25);
              if (Math.abs(dx) + Math.abs(dy) < 1) {
                dx = wide ? 0 : 1;
                dy = wide ? 1 : 0;
              }
              const len = Math.hypot(dx, dy);
              const speed = Math.min(1.8, 0.5 + Math.min(inX, inY) * 0.03);
              const k = 0.12;
              Body.setVelocity(b, {
                x: b.velocity.x + ((dx / len) * speed - b.velocity.x) * k,
                y: b.velocity.y + ((dy / len) * speed - b.velocity.y) * k,
              });
              return;
            }
          }
          // An escaped word turns solid again only once it clears the block; touching it
          // earlier would make the engine separate them with a sudden jump.
          if (b.collisionFilter.mask !== SOLID.mask) {
            const blockBodies = [...bodies.values()].filter((o) => o.isStatic);
            if (!Query.collides(b, blockBodies).length) b.collisionFilter = { ...SOLID, group: 0 };
          }
          // keep the current heading (so bounces redirect naturally), turn it slowly and
          // ease the speed back to cruising after collisions or a fling
          const p = b.plugin as { turn: number; phase: number };
          const speed = Math.hypot(b.velocity.x, b.velocity.y);
          const heading =
            (speed > 0.01 ? Math.atan2(b.velocity.y, b.velocity.x) : p.phase) +
            0.012 * Math.sin(t * p.turn + p.phase);
          const next = speed + (cruise - speed) * 0.04;
          Body.setVelocity(b, { x: Math.cos(heading) * next, y: Math.sin(heading) * next });
        });
      });

      // Overlapping floating words drift apart with a push that grows with the overlap, so
      // crowds spread out smoothly instead of bouncing.
      Events.on(engine, "beforeUpdate", () => {
        const floating = [...bodies].filter(([, b]) => !b.isStatic);
        for (let i = 0; i < floating.length; i++) {
          const [na, A] = floating[i];
          const sa = sizes.get(na)!;
          for (let j = i + 1; j < floating.length; j++) {
            const [nb, B] = floating[j];
            const sb = sizes.get(nb)!;
            const dx = B.position.x - A.position.x;
            const dy = B.position.y - A.position.y;
            const ox = (sa.w + sb.w) / 2 + PAD - Math.abs(dx);
            const oy = (sa.h + sb.h) / 2 + PAD - Math.abs(dy);
            if (ox <= 0 || oy <= 0) continue;
            const push = Math.min(0.06, Math.min(ox, oy) * 0.004);
            const len = Math.hypot(dx, dy * 2) || 1;
            const px = (dx / len) * push;
            const py = ((dy * 2) / len) * push;
            Body.setVelocity(A, { x: A.velocity.x - px, y: A.velocity.y - py });
            Body.setVelocity(B, { x: B.velocity.x + px, y: B.velocity.y + py });
          }
        }
      });

      let frame = 0;
      let last = 0;
      const step = (now: number) => {
        Engine.update(engine, Math.min(now - last, 33));
        last = now;
        bodies.forEach((b, name) => place(name, b.position.x, b.position.y));
        frame = requestAnimationFrame(step);
      };
      // the motion is decoration, so it only runs while the field is on screen
      const visible = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(frame);
        if (entry.isIntersecting) {
          last = performance.now();
          frame = requestAnimationFrame(step);
        }
      });
      visible.observe(el);

      cleanup = () => {
        visible.disconnect();
        cancelAnimationFrame(frame);
        Events.off(engine, "beforeUpdate", undefined as unknown as () => void);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  // reduced motion: words sit in the tidy arrangement and jump on filter. Otherwise they
  // appear at their random start spots until the physics takes over.
  useLayoutEffect(() => {
    if (!layout) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return layout.byKey.get(active)!.forEach((h, name) => place(name, h.x, h.y));
    if (items.current.values().next().value?.style.transform) return;
    layout.start.forEach((h, name) => place(name, h.x, h.y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, active]);

  const buttons = [{ key: ALL, title: allLabel }, ...groups];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        {buttons.map((b) => (
          <button
            key={b.key}
            type="button"
            aria-pressed={active === b.key}
            onClick={() => setActive(b.key)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              active === b.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/60 hover:border-primary hover:text-primary"
            )}
          >
            {b.title}
          </button>
        ))}
      </div>
      <ul
        ref={field}
        style={layout ? { height: layout.height } : undefined}
        className={cn(
          "skill-pool relative overflow-hidden rounded-[50%]",
          !layout &&
            "flex flex-wrap items-center justify-center gap-2 px-[12%] py-[10%]"
        )}
      >
        {all.map((skill) => {
          const pinned = isPinned(skill.name, active);
          const dimmed = active !== ALL && !pinned;
          return (
            <li
              key={skill.name}
              ref={(el) => {
                if (el) items.current.set(skill.name, el);
                else items.current.delete(skill.name);
              }}
              className={cn(
                "whitespace-nowrap select-none",
                layout && "skill-move absolute top-0 left-0 will-change-transform",
                dimmed && "opacity-30"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center rounded-full border bg-background/85 shadow-[0_2px_6px_-2px_rgb(0_0_0/0.15)] transition-colors duration-500",
                  skill.core
                    ? "gap-1.5 px-3 py-1.5 text-sm font-semibold md:gap-2 md:px-4 md:py-2 md:text-lg"
                    : "gap-1 px-2.5 py-1 text-xs md:gap-1.5 md:px-3 md:py-1.5 md:text-sm",
                  pinned ? "border-primary" : "border-border"
                )}
              >
                <SkillIcon
                  name={skill.name}
                  group={skill.group}
                  className={cn(
                    "shrink-0 text-primary",
                    skill.core ? "size-4 md:size-5" : "size-3.5 md:size-4"
                  )}
                />
                {skill.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillField;
