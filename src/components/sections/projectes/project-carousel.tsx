"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProjectCard, { type ProjectCardProps } from "./project-card";

interface ProjectCarouselProps {
  heading: string;
  headingId: string;
  projects: ProjectCardProps[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  heading,
  headingId,
  projects,
}) => {
  const t = useTranslations("projects.carousel");
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const drag = useRef<{ x: number; left: number; from: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const last = projects.length - 1;

  const slides = () =>
    Array.from(track.current?.children ?? []) as HTMLElement[];

  const goTo = (i: number) => {
    const el = track.current;
    const slide = slides()[i];
    if (!el || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: slide.offsetLeft - el.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // touch and trackpads swipe natively via scroll-snap; this adds drag-to-swipe for mouse users
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, from: index, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 6) return;
    if (!d.moved) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      // snapping fights a manual scrollLeft, so pause it for the drag
      e.currentTarget.style.scrollSnapType = "none";
      e.currentTarget.style.userSelect = "none";
    }
    e.currentTarget.scrollLeft = d.left - dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    const el = e.currentTarget;
    const dx = e.clientX - d.x;
    const step = dx < -50 ? 1 : dx > 50 ? -1 : 0;
    // the click (if any) fires right after pointerup, before this timer
    suppressClick.current = true;
    setTimeout(() => (suppressClick.current = false), 0);
    el.style.userSelect = "";
    const restoreSnap = () => (el.style.scrollSnapType = "");
    el.addEventListener("scrollend", restoreSnap, { once: true });
    setTimeout(restoreSnap, 800);
    goTo(Math.min(last, Math.max(0, d.from + step)));
  };

  // the slide whose left edge is nearest the track's scroll position is the current one
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const offsets = slides().map((s) => Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft));
    setIndex(offsets.indexOf(Math.min(...offsets)));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      className="space-y-6"
    >
      <div className="flex items-end justify-between gap-4">
        <h2 id={headingId} className="text-3xl font-bold tracking-tight">
          {heading}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-10"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={t("prev")}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <p
            className="min-w-12 text-center text-sm tabular-nums text-muted-foreground"
            aria-live="polite"
          >
            {index + 1} / {projects.length}
          </p>
          <Button
            variant="outline"
            size="icon"
            className="size-10"
            onClick={() => goTo(index + 1)}
            disabled={index === last}
            aria-label={t("next")}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* native scroll-snap gives swipe, trackpad and arrow-key scrolling for free; slides peek on phones */}
      <div
        ref={track}
        tabIndex={0}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          // a drag that ends on a link must not open it
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className="-mx-4 flex cursor-grab snap-x active:cursor-grabbing snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:mx-0 md:scroll-px-0 md:gap-6 md:px-0"
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            role="group"
            aria-roledescription="slide"
            aria-label={t("slide", { current: i + 1, total: projects.length })}
            className="w-[88%] shrink-0 snap-start md:w-full"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1">
        {projects.map((project, i) => (
          <button
            key={project.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={project.title}
            aria-current={i === index}
            className="group flex size-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-primary"
                  : "w-2 bg-border group-hover:bg-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
