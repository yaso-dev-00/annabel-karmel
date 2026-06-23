"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { siteAdBanners, type SiteAdPlacementId } from "@/data/promo-banners";

/** Hero carousel uses 5500ms — keep ads on a different cadence and phase offset. */
const AD_AUTO_INTERVAL_MS = 6000;
const AD_AUTO_START_DELAY_MS = 2800;
const AD_SWIPE_THRESHOLD = 40;

type SiteAdPlacementProps = {
  placement: SiteAdPlacementId;
};

export function SiteAdPlacement({ placement }: SiteAdPlacementProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const current = siteAdBanners[activeIndex];

  const moveAd = useCallback((step: number) => {
    setDirection(step);
    setActiveIndex((prev) => (prev + step + siteAdBanners.length) % siteAdBanners.length);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    didSwipeRef.current = false;
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    activePointerId.current = event.pointerId;
    setAutoScrollEnabled(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const startX = pointerStartX.current;
    const startY = pointerStartY.current;
    activePointerId.current = null;
    pointerStartX.current = null;
    pointerStartY.current = null;

    if (startX === null || startY === null) {
      window.setTimeout(() => setAutoScrollEnabled(true), 8000);
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) > AD_SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      moveAd(deltaX > 0 ? -1 : 1);
    }

    window.setTimeout(() => setAutoScrollEnabled(true), 8000);
  };

  useEffect(() => {
    if (!autoScrollEnabled || siteAdBanners.length < 2) {
      return;
    }

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => moveAd(1), AD_AUTO_INTERVAL_MS);
    }, AD_AUTO_START_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [autoScrollEnabled, moveAd]);

  return (
    <section
      className={`site-ad-placement site-ad-placement-${placement} w-full`}
      aria-label={placement === "header" ? "Header promotional banner" : "Footer promotional banner"}
      data-ad-placement={placement}
    >
      <div className="container">
        <div
          className="site-ad-carousel-viewport site-ad-carousel-shell mx-auto"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.a
              key={current.id}
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={current.ariaLabel}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="site-ad-slide block"
              onClick={(event) => {
                if (didSwipeRef.current) {
                  event.preventDefault();
                  didSwipeRef.current = false;
                }
              }}
            >
              <img
                src={current.image}
                alt=""
                width={current.width}
                height={current.height}
                decoding="async"
                draggable={false}
                className="site-ad-banner-image"
              />
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use SiteAdPlacement */
export function SiteAdCarousel({ placement = "header" }: { placement?: SiteAdPlacementId }) {
  return <SiteAdPlacement placement={placement} />;
}
