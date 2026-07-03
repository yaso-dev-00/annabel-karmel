"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./related-articles-carousel.module.css";

const NAV_BUTTON_CLASS =
  "grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_6px_16px_rgba(179,71,105,0.2)] transition-colors hover:bg-[#ffe8ef] disabled:cursor-not-allowed disabled:opacity-40 min-[700px]:h-10 min-[700px]:w-10 min-[700px]:shadow-[0_8px_20px_rgba(179,71,105,0.22)] min-[900px]:h-11 min-[900px]:w-11";

export type RelatedArticleItem = {
  href: string;
  title: string;
  image?: string;
};

type RelatedArticlesCarouselProps = {
  items: RelatedArticleItem[];
};

function perViewFromWidth(width: number) {
  if (width < 700) return 1;
  if (width < 1024) return 2;
  return 5;
}

export function RelatedArticlesCarousel({ items }: RelatedArticlesCarouselProps) {
  const [perView, setPerView] = useState(5);
  const [page, setPage] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const isDragging = useRef(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const measureNavPosition = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const image = stage.querySelector<HTMLElement>("[data-related-thumb]");
    if (!image || image.offsetWidth <= 0) return;
    stage.style.setProperty("--nav-center-y", `${image.offsetHeight / 2}px`);
    stage.dataset.navReady = "";
  }, []);

  useEffect(() => {
    const onResize = () => setPerView(perViewFromWidth(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = useMemo(() => {
    // Non-overlapping pages, advancing a full view at a time (like the live site),
    // so each dot maps to a distinct block of up to `perView` articles.
    const windows: RelatedArticleItem[][] = [];
    for (let start = 0; start < items.length; start += perView) {
      windows.push(items.slice(start, start + perView));
    }
    return windows;
  }, [items, perView]);

  useEffect(() => {
    if (page > pages.length - 1) {
      setPage(Math.max(0, pages.length - 1));
    }
  }, [page, pages.length]);

  useLayoutEffect(() => {
    measureNavPosition();
  }, [measureNavPosition, page, perView, items.length]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measureNavPosition);
      return () => window.removeEventListener("resize", measureNavPosition);
    }
    const ro = new ResizeObserver(measureNavPosition);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [measureNavPosition]);

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
  };

  const onCardClickCapture: React.MouseEventHandler<HTMLElement> = (event) => {
    if (isDragging.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className={`${styles.carouselStage} mt-[30px]`} ref={stageRef}>
      <div
        className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((chunk, pageIndex) => (
            <div key={`page-${pageIndex}`} className="w-full shrink-0 grow-0 basis-full">
              <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 min-[1024px]:grid-cols-5">
                {chunk.map((article) => (
                  <Link key={article.title} href={article.href} className="block" onClickCapture={onCardClickCapture}>
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        draggable={false}
                        data-related-thumb
                        className="block aspect-[1.18/1] w-full rounded-[14px] object-cover"
                      />
                    ) : (
                      <div
                        data-related-thumb
                        className="relative block aspect-[1.18/1] w-full overflow-hidden rounded-[14px] bg-[#d9dde2]"
                      >
                        <div className="absolute left-[12%] top-[24%] h-6 w-6 rounded-full bg-[#f1f3f5]" />
                        <div className="absolute -bottom-6 left-[28%] h-[72%] w-[78%] rounded-t-[80px] bg-[#f1f3f5]" />
                      </div>
                    )}
                    <h3 style={{ fontFamily: "var(--font-body)" }} className="mt-7 text-center   text-[20px] font-[600] leading-[1.22] tracking-[0.01em] text-[#3f3f3f]">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous related articles"
        onClick={goPrev}
        disabled={!canCycle}
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
        disabled={!canCycle}
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
        {pages.map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            aria-label={`Go to related articles page ${i + 1}`}
            onClick={() => setPage(i)}
            className={`h-[6px] w-[6px] rounded-full transition-colors ${
              i === page ? "bg-[#222]" : "bg-[#c7c7c7]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
