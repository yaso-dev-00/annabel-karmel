"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import styles from "./cms-related-articles-carousel.module.css";

const NAV_BUTTON_CLASS =
  "grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_6px_16px_rgba(179,71,105,0.2)] transition-colors hover:bg-[#ffe8ef] disabled:cursor-not-allowed disabled:opacity-40 min-[700px]:h-10 min-[700px]:w-10 min-[700px]:shadow-[0_8px_20px_rgba(179,71,105,0.22)] min-[900px]:h-11 min-[900px]:w-11";

type CmsRelatedArticlesCarouselProps = {
  items: RelatedArticleItem[];
  previewMode?: boolean;
};

function eventTargetElement(target: EventTarget | null): Element | null {
  if (!target) return null;
  if (target instanceof Element) return target;
  if (target instanceof Node) return target.parentElement;
  return null;
}

function isLinkTarget(target: EventTarget | null): boolean {
  return Boolean(eventTargetElement(target)?.closest("a[href]"));
}

function perViewFromWidth(width: number) {
  if (width < 700) return 1;
  if (width < 1024) return 2;
  return 5;
}

function resolveLayoutWidth(stage: HTMLElement): number {
  const previewFrame = stage.closest('[data-preview-frame="true"]');
  if (previewFrame instanceof HTMLElement) {
    const previewWidth = Number.parseFloat(
      getComputedStyle(previewFrame).getPropertyValue("--preview-width"),
    );
    if (!Number.isNaN(previewWidth) && previewWidth > 0) {
      return previewWidth;
    }
  }

  const containerWidth = stage.offsetWidth || stage.parentElement?.clientWidth || 0;
  if (containerWidth > 0) {
    return containerWidth;
  }

  if (typeof window !== "undefined") {
    return window.innerWidth;
  }

  return 0;
}

export function CmsRelatedArticlesCarousel({ items, previewMode = false }: CmsRelatedArticlesCarouselProps) {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [slideTransition, setSlideTransition] = useState(false);
  const [page, setPage] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const isDragging = useRef(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const perView = useMemo(() => {
    if (layoutWidth <= 0) return 1;
    return perViewFromWidth(layoutWidth);
  }, [layoutWidth]);

  const layoutReady = layoutWidth > 0;

  const measureStageLayout = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const width = resolveLayoutWidth(stage);
    if (width > 0) {
      setLayoutWidth((current) => (current === width ? current : width));
    }
    const image = stage.querySelector<HTMLElement>("[data-cms-related-thumb]");
    if (!image || image.offsetWidth <= 0) return;
    stage.style.setProperty("--nav-center-y", `${image.offsetHeight / 2}px`);
    stage.dataset.navReady = "";
  }, []);

  const pages = useMemo(() => {
    const windows: RelatedArticleItem[][] = [];
    for (let start = 0; start < items.length; start += perView) {
      windows.push(items.slice(start, start + perView));
    }
    return windows;
  }, [items, perView]);

  useLayoutEffect(() => {
    if (page > pages.length - 1) {
      setPage(Math.max(0, pages.length - 1));
    }
  }, [page, pages.length]);

  useLayoutEffect(() => {
    measureStageLayout();
  }, [measureStageLayout, page, perView, items.length]);

  useLayoutEffect(() => {
    if (!layoutReady) return;
    setSlideTransition(false);
    const frame = requestAnimationFrame(() => setSlideTransition(true));
    return () => cancelAnimationFrame(frame);
  }, [layoutReady, perView]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    measureStageLayout();

    const onWindowResize = () => measureStageLayout();
    const previewFrame = stage.closest('[data-preview-frame="true"]');
    if (!(previewFrame instanceof HTMLElement)) {
      window.addEventListener("resize", onWindowResize);
    }

    let previewStyleObserver: MutationObserver | undefined;
    if (previewFrame instanceof HTMLElement && typeof MutationObserver !== "undefined") {
      previewStyleObserver = new MutationObserver(measureStageLayout);
      previewStyleObserver.observe(previewFrame, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    if (typeof ResizeObserver === "undefined") {
      return () => {
        previewStyleObserver?.disconnect();
        window.removeEventListener("resize", onWindowResize);
      };
    }

    const ro = new ResizeObserver(measureStageLayout);
    ro.observe(stage);

    if (previewFrame instanceof HTMLElement) {
      ro.observe(previewFrame);
    }

    return () => {
      ro.disconnect();
      previewStyleObserver?.disconnect();
      window.removeEventListener("resize", onWindowResize);
    };
  }, [measureStageLayout]);

  const canCycle = pages.length > 1;
  const goPrev = () => {
    setPage((p) => {
      if (!canCycle) return 0;
      return p === 0 ? pages.length - 1 : p - 1;
    });
  };
  const goNext = () => {
    setPage((p) => {
      if (!canCycle) return 0;
      return p === pages.length - 1 ? 0 : p + 1;
    });
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (isLinkTarget(event.target)) return;
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartX.current = event.clientX;
    pointerCurrentX.current = event.clientX;
    isDragging.current = false;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (activePointerId.current !== event.pointerId) return;
    if (pointerStartX.current === null) return;
    pointerCurrentX.current = event.clientX;
    if (Math.abs(pointerCurrentX.current - pointerStartX.current) > 8) {
      isDragging.current = true;
    }
  };

  const onPointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (activePointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (pointerStartX.current === null || pointerCurrentX.current === null) return;

    const deltaX = pointerCurrentX.current - pointerStartX.current;
    const swipeThreshold = 24;

    if (deltaX > swipeThreshold && canCycle) {
      goPrev();
    } else if (deltaX < -swipeThreshold && canCycle) {
      goNext();
    }

    pointerStartX.current = null;
    pointerCurrentX.current = null;
    activePointerId.current = null;
    isDragging.current = false;
  };

  return (
    <div
      className={`${styles.carouselStage} mt-[30px]`}
      ref={stageRef}
      data-per-view={String(perView)}
      {...(previewMode ? { "data-cms-interactive": "true" } : {})}
    >
      <div
        className="overflow-hidden touch-pan-x select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
      >
        <div
          className={`flex ${slideTransition ? "transition-transform duration-500 ease-out" : ""}`}
          style={{ transform: layoutReady ? `translateX(-${page * 100}%)` : undefined }}
        >
          {layoutReady
            ? pages.map((chunk, pageIndex) => (
                <div key={`page-${pageIndex}`} className="w-full shrink-0 grow-0 basis-full">
                  <div
                    className={styles.pageGrid}
                    style={{
                      gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`,
                    }}
                  >
                    {chunk.map((article) => (
                      <article key={article.href} className={styles.articleCard}>
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            draggable={false}
                            data-cms-related-thumb
                            className={styles.articleThumb}
                          />
                        ) : (
                          <div data-cms-related-thumb className={styles.articleThumbPlaceholder}>
                            <div className="absolute left-[12%] top-[24%] h-6 w-6 rounded-full bg-[#f1f3f5]" />
                            <div className="absolute -bottom-6 left-[28%] h-[72%] w-[78%] rounded-t-[80px] bg-[#f1f3f5]" />
                          </div>
                        )}
                        <h3 className={styles.articleTitle} style={{ fontFamily: "var(--font-body)" }}>
                          <Link href={article.href} className={styles.articleTitleLink}>
                            {article.title}
                          </Link>
                        </h3>
                      </article>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous related articles"
        onClick={goPrev}
        disabled={!canCycle || !layoutReady}
        className={`${styles.navButton} left-1 min-[700px]:left-3 ${NAV_BUTTON_CLASS}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-[14px] w-[14px] min-[700px]:h-[17px] min-[700px]:w-[17px] min-[900px]:h-[19px] min-[900px]:w-[19px]">
          <path
            d="M14.5 5.5L8 12l6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next related articles"
        onClick={goNext}
        disabled={!canCycle || !layoutReady}
        className={`${styles.navButton} right-1 min-[700px]:right-3 ${NAV_BUTTON_CLASS}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-[14px] w-[14px] min-[700px]:h-[17px] min-[700px]:w-[17px] min-[900px]:h-[19px] min-[900px]:w-[19px]">
          <path
            d="M9.5 5.5L16 12l-6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="mt-3 flex items-center justify-center gap-2">
        {layoutReady
          ? pages.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                aria-label={`Go to related articles page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-[6px] w-[6px] rounded-full transition-colors ${
                  i === page ? "bg-[#222]" : "bg-[#c7c7c7]"
                }`}
              />
            ))
          : null}
      </div>
    </div>
  );
}
