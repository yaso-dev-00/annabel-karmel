"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { resolveImageSrc } from "@/lib/content-blocks/image-src";
import { ArticleRecipeCarouselPreview } from "./article-recipe-carousel-preview";
import styles from "./article-recipe-carousel.module.css";

function RecipeLockIcon() {
  return <span className={styles.lockGlyph} aria-hidden />;
}

export type ArticleRecipeCarouselItem = {
  title: string;
  href: string;
  image: string;
  appExclusive?: boolean;
};

type ArticleRecipeCarouselProps = {
  items: ArticleRecipeCarouselItem[];
  className?: string;
  perDesktopView?: 3 | 4 | 5;
  loop?: boolean;
  autoplayMs?: number;
  /**
   * Smaller cards + full-bleed layout. On desktop (≥900px) shows 3 full cards with
   * half a card peeking on each side (4 card-width units across the viewport).
   */
  compact?: boolean;
  /** CMS preview: measure layout from the carousel viewport, not the browser window. */
  embedded?: boolean;
};

const SLIDE_TRANSITION = { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const };

type PeekMode = "none" | "center" | "start";

type CarouselLayout = {
  perView: number;
  slots: number;
  peek: boolean;
  peekMode: PeekMode;
};

function getCarouselLayout(width: number, compact: boolean, perDesktopView: number): CarouselLayout {
  if (compact) {
    if (width < 700) return { perView: 1, slots: 1.2, peek: true, peekMode: "start" };
    if (width < 900) return { perView: 2, slots: 2, peek: false, peekMode: "none" };
    return {
      perView: perDesktopView,
      slots: perDesktopView === 3 ? 4 : perDesktopView,
      peek: perDesktopView === 3,
      peekMode: perDesktopView === 3 ? "center" : "none",
    };
  }
  if (width < 700) return { perView: 1, slots: 1, peek: false, peekMode: "none" };
  if (width < 900) return { perView: 2, slots: 2, peek: false, peekMode: "none" };
  return { perView: perDesktopView, slots: perDesktopView, peek: false, peekMode: "none" };
}

function getCardWidth(viewportWidth: number, layout: CarouselLayout, gap: number) {
  const { slots, peek, peekMode } = layout;

  if (layout.peekMode === "start" && slots > 1 && slots < 2) {
    return (viewportWidth - gap) / slots;
  }

  if (peek && peekMode === "center") {
    return (viewportWidth - slots * gap) / slots;
  }

  const count = Math.round(slots);
  return (viewportWidth - (count - 1) * gap) / count;
}

function getPeekOffset(step: number, layout: CarouselLayout) {
  if (!layout.peek || step <= 0) return 0;
  if (layout.peekMode === "start") return 0;
  if (layout.peekMode === "center") return step / 2;
  return 0;
}

function buildLoopTrack(items: ArticleRecipeCarouselItem[], perView: number) {
  const minLength = Math.max(items.length * 3, items.length * 2 + perView - 1);
  const track: ArticleRecipeCarouselItem[] = [];
  while (track.length < minLength) {
    track.push(...items);
  }
  return track;
}

function readLayoutWidth(viewport: HTMLDivElement | null) {
  if (viewport && viewport.clientWidth > 0) {
    return viewport.clientWidth;
  }
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 1280;
}

function eventTargetElement(target: EventTarget | null): Element | null {
  if (!target) return null;
  if (target instanceof Element) return target;
  if (target instanceof Node) return target.parentElement;
  return null;
}

function isLinkTarget(target: EventTarget | null): boolean {
  return Boolean(eventTargetElement(target)?.closest("a[href]"));
}

export function ArticleRecipeCarousel({
  items,
  className = "mt-[60px]",
  perDesktopView = 5,
  loop = true,
  autoplayMs = 0,
  compact = false,
  embedded = false,
}: ArticleRecipeCarouselProps) {
  if (embedded) {
    return (
      <ArticleRecipeCarouselPreview
        items={items}
        className={className}
        perDesktopView={perDesktopView}
        loop={loop}
        compact={compact}
      />
    );
  }

  return (
    <ArticleRecipeCarouselLive
      items={items}
      className={className}
      perDesktopView={perDesktopView}
      loop={loop}
      autoplayMs={autoplayMs}
      compact={compact}
    />
  );
}

function ArticleRecipeCarouselLive({
  items,
  className = "mt-[60px]",
  perDesktopView = 5,
  loop = true,
  autoplayMs = 0,
  compact = false,
}: Omit<ArticleRecipeCarouselProps, "embedded">) {
  const prefersReducedMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [layout, setLayout] = useState<CarouselLayout>(() =>
    getCarouselLayout(readLayoutWidth(null), compact, perDesktopView),
  );
  const { perView, peek: peekLayout } = layout;
  const [step, setStep] = useState(0);
  const [cardWidthPx, setCardWidthPx] = useState<number | null>(null);
  const [position, setPosition] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [instant, setInstant] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const pausedRef = useRef(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const isDragging = useRef(false);

  const useLoop = loop && items.length > 1;
  const canCycle = items.length > 1;
  const loopStart = items.length;

  const trackItems = useMemo(() => {
    if (!useLoop) return items;
    return buildLoopTrack(items, perView);
  }, [items, useLoop, perView]);

  const updateDot = useCallback(
    (index: number) => {
      if (items.length === 0) return;
      if (useLoop) {
        const dot = (((index - loopStart) % items.length) + items.length) % items.length;
        setActiveDot(dot);
      } else {
        setActiveDot(Math.min(index, Math.max(0, items.length - 1)));
      }
    },
    [items.length, loopStart, useLoop],
  );

  const gap = compact ? 10 : 14;

  const syncLayoutFromViewport = useCallback(() => {
    const width = readLayoutWidth(viewportRef.current);
    setLayout(getCarouselLayout(width, compact, perDesktopView));
  }, [compact, perDesktopView]);

  const measureStep = useCallback(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!viewport || viewport.clientWidth <= 0) return;

    const viewportWidth = viewport.clientWidth;
    const activeLayout = getCarouselLayout(viewportWidth, compact, perDesktopView);

    const firstCard = track?.querySelector<HTMLElement>(".article-recipe-card");
    const cardWidth =
      firstCard && firstCard.offsetWidth > 0
        ? firstCard.offsetWidth
        : getCardWidth(viewportWidth, activeLayout, gap);

    if (cardWidth <= 0) return;

    setLayout((current) =>
      current.perView === activeLayout.perView &&
      current.slots === activeLayout.slots &&
      current.peek === activeLayout.peek &&
      current.peekMode === activeLayout.peekMode
        ? current
        : activeLayout,
    );
    setCardWidthPx(cardWidth);
    setStep(cardWidth + gap);

    if (stage) {
      stage.style.setProperty("--card-width", `${cardWidth}px`);
      stage.style.setProperty("--nav-center-y", `${(cardWidth * 3) / 8}px`);
      stage.dataset.navReady = "";
    }
  }, [compact, gap, perDesktopView]);

  useLayoutEffect(() => {
    const start = useLoop ? loopStart : 0;
    setPosition(start);
    updateDot(start);
    measureStep();
  }, [items.length, useLoop, loopStart, measureStep, updateDot, perView, trackItems.length, layout]);

  useEffect(() => {
    updateDot(position);
  }, [position, updateDot]);

  useEffect(() => {
    syncLayoutFromViewport();
    const onResize = () => syncLayoutFromViewport();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncLayoutFromViewport]);

  useEffect(() => {
    measureStep();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measureStep);
      return () => window.removeEventListener("resize", measureStep);
    }
    const ro = new ResizeObserver(measureStep);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [measureStep, trackItems.length]);

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  const normalizeLoop = useCallback(() => {
    if (!useLoop || items.length === 0) return;
    if (position >= loopStart + items.length) {
      setInstant(true);
      setPosition(loopStart + ((position - loopStart) % items.length));
    } else if (position < loopStart) {
      setInstant(true);
      const offset = ((position - loopStart) % items.length + items.length) % items.length;
      setPosition(loopStart + offset);
    }
  }, [items.length, loopStart, position, useLoop]);

  const goPrev = useCallback(() => {
    if (!canCycle) return;
    setPosition((p) => p - 1);
  }, [canCycle]);

  const goNext = useCallback(() => {
    if (!canCycle) return;
    setPosition((p) => p + 1);
  }, [canCycle]);

  useEffect(() => {
    if (!canCycle || !autoplayMs || autoplayMs <= 0 || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) goNext();
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [canCycle, autoplayMs, goNext, prefersReducedMotion]);

  const goToDot = (dotIndex: number) => {
    setPosition(useLoop ? loopStart + dotIndex : dotIndex);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (isLinkTarget(event.target)) return;
    pausedRef.current = true;
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartX.current = event.clientX;
    pointerCurrentX.current = event.clientX;
    isDragging.current = false;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (activePointerId.current !== event.pointerId || pointerStartX.current === null) return;
    pointerCurrentX.current = event.clientX;
    if (Math.abs(pointerCurrentX.current - pointerStartX.current) > 8) isDragging.current = true;
  };

  const onPointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (activePointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (pointerStartX.current === null || pointerCurrentX.current === null) return;

    const deltaX = pointerCurrentX.current - pointerStartX.current;
    if (deltaX > 24 && canCycle) goPrev();
    else if (deltaX < -24 && canCycle) goNext();

    pointerStartX.current = null;
    pointerCurrentX.current = null;
    activePointerId.current = null;
    const dragged = isDragging.current;
    isDragging.current = false;
    window.setTimeout(() => {
      if (!dragged) return;
      pausedRef.current = false;
    }, 400);
    if (!dragged) {
      pausedRef.current = false;
    }
  };

  const onCardClickCapture: React.MouseEventHandler<HTMLElement> = (event) => {
    if (isLinkTarget(event.target)) return;
    if (isDragging.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const peekOffset = getPeekOffset(step, layout);
  const x = step > 0 ? -position * step + peekOffset : 0;
  const cardStyle = cardWidthPx ? { width: cardWidthPx } : { width: "85vw", maxWidth: 320 };

  const bleedClass =
    "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] px-[8px] md:px-[14px]";
  const wrapperClass = `${bleedClass} ${className}`;

  return (
    <motion.div className={wrapperClass} initial={false}>
      <div
        ref={stageRef}
        className={`${styles.carouselStage} ${compact ? styles.carouselStageCompact : ""} ${peekLayout ? styles.carouselStagePeek : ""}`}
      >
        <motion.div
          ref={viewportRef}
          className={`${styles.carouselViewport} cursor-grab touch-pan-x select-none active:cursor-grabbing`}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          <motion.div
            ref={trackRef}
            className={compact ? "flex gap-[10px]" : "flex gap-[14px]"}
            animate={{ x }}
            transition={instant || prefersReducedMotion ? { duration: 0 } : SLIDE_TRANSITION}
            onAnimationComplete={normalizeLoop}
          >
            {trackItems.map((recipe, i) => {
              const imageSrc = resolveImageSrc(recipe.image);
              return (
                <motion.section
                  key={`${recipe.title}-${i}`}
                  className={`article-recipe-card shrink-0 overflow-visible rounded-[12px] bg-white shadow-[0_6px_18px_rgba(58,58,58,0.08)] ${compact ? "pb-[6px]" : "pb-[10px]"}`}
                  style={cardStyle}
                  onClickCapture={onCardClickCapture}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.imageWrap}>
                    <a href={recipe.href} target="_blank" rel="noopener" className={styles.imageLink}>
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={recipe.title}
                          loading={i < perView + 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="block aspect-4/3 w-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="block aspect-4/3 w-full bg-[#f6e9ef]" aria-hidden />
                      )}
                    </a>
                    <div className={styles.iconRow}>
                      {recipe.appExclusive ? (
                        <span
                          className={styles.iconButton}
                          aria-label="App exclusive recipe"
                          title="App exclusive"
                        >
                          <RecipeLockIcon />
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <motion.div
                    className={`px-[8px] text-center ${compact ? "min-h-[44px] pt-[10px]" : "min-h-[52px] pt-[15px] px-[10px]"}`}
                  >
                    <h3
                      className={`m-0 mt-[10px] font-semibold text-[#3a3a3a] ${
                        compact
                          ? "text-[15px] leading-[1.25] min-[700px]:text-[17px] min-[900px]:text-[20px]"
                          : "text-[16px] leading-[1.3] min-[700px]:text-[18px] min-[900px]:text-[20px]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <a
                        href={recipe.href}
                        target="_blank"
                        rel="noopener"
                        className="text-inherit no-underline hover:text-(--hover-color)"
                      >
                        {recipe.title}
                      </a>
                    </h3>
                  </motion.div>
                </motion.section>
              );
            })}
          </motion.div>
        </motion.div>

        <button
          type="button"
          aria-label="Previous recipes"
          onClick={goPrev}
          disabled={!canCycle}
          className={`${styles.navButton} cursor-pointer left-1 grid h-8 w-8 place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_6px_16px_rgba(179,71,105,0.2)] hover:bg-[#ffe8ef] disabled:cursor-not-allowed disabled:opacity-40 min-[700px]:left-3 min-[700px]:h-10 min-[700px]:w-10 min-[700px]:shadow-[0_8px_20px_rgba(179,71,105,0.22)] min-[900px]:h-11 min-[900px]:w-11`}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-[14px] w-[14px] min-[700px]:h-[17px] min-[700px]:w-[17px] min-[900px]:h-[19px] min-[900px]:w-[19px]">
            <path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next recipes"
          onClick={goNext}
          disabled={!canCycle}
          className={`${styles.navButton} cursor-pointer right-1 grid h-8 w-8 place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_6px_16px_rgba(179,71,105,0.2)] hover:bg-[#ffe8ef] disabled:cursor-not-allowed disabled:opacity-40 min-[700px]:right-3 min-[700px]:h-10 min-[700px]:w-10 min-[700px]:shadow-[0_8px_20px_rgba(179,71,105,0.22)] min-[900px]:h-11 min-[900px]:w-11`}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-[14px] w-[14px] min-[700px]:h-[17px] min-[700px]:w-[17px] min-[900px]:h-[19px] min-[900px]:w-[19px]">
            <path d="M9.5 5.5L16 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {canCycle ? (
        <motion.div
          className="mt-2 flex items-center justify-center gap-2"
          initial={false}
          animate={{ opacity: 1 }}
        >
          {items.map((_, i) => (
            <motion.button
              key={`dot-${i}`}
              type="button"
              aria-label={`Go to recipe ${i + 1}`}
              onClick={() => goToDot(i)}
              className={`h-[6px] w-[6px] rounded-full ${i === activeDot ? "bg-[#222]" : "bg-[#c7c7c7]"}`}
              animate={i === activeDot ? { scale: 1.35 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
