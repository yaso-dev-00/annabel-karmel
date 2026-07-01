"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { CAROUSEL_SLIDE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import { tablewareAssets } from "@/data/tableware-page";
import styles from "./tableware-hero-carousel.module.css";

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  if (direction === "prev") {
    return (
      <svg aria-hidden viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
    </svg>
  );
}

export function TablewareHeroCarousel() {
  const slides = tablewareAssets.heroSlides;
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  const indexRef = useRef(0);
  const animateToIndexRef = useRef<
    (index: number, transition?: typeof CAROUSEL_SLIDE) => void
  >(() => {});

  const carousel = useSnapCarousel({
    itemCount: slides.length,
    cardSelector: ".hero-slide",
    controlsSelector: "button",
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
    onInteraction: () => setAutoplayEpoch((epoch) => epoch + 1),
  });

  indexRef.current = carousel.index;
  animateToIndexRef.current = carousel.animateToIndex;

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      if (clamped === carousel.index) {
        return;
      }
      carousel.animateToIndex(clamped, CAROUSEL_SLIDE);
      setAutoplayEpoch((epoch) => epoch + 1);
    },
    [carousel, slides.length],
  );

  const isAtStart = carousel.index <= 0;
  const isAtEnd = carousel.index >= slides.length - 1;

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const next = current >= slides.length - 1 ? 0 : current + 1;
      animateToIndexRef.current(next, CAROUSEL_SLIDE);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [autoplayEpoch, slides.length]);

  return (
    <section className={styles.hero} aria-label="Grow tableware hero carousel">
      <div
        ref={carousel.carouselRef}
        className={styles.viewport}
        onPointerDownCapture={carousel.handlePointerDown}
        onPointerMoveCapture={carousel.handlePointerMove}
        onPointerUpCapture={carousel.handlePointerEnd}
        onPointerCancelCapture={carousel.handlePointerEnd}
      >
        <motion.div
          ref={carousel.trackRef}
          className={styles.track}
          style={{ x: carousel.x }}
          initial={false}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.image}
              className={`hero-slide ${styles.slide}`}
              style={{ backgroundColor: slide.bgColor }}
              onClickCapture={carousel.handleCardClickCapture}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={styles.slideImage}
                decoding="async"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onLoad={slideIndex === 0 ? carousel.measure : undefined}
              />
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.navPrev} ${isAtStart ? styles.navButtonDisabled : ""}`}
          aria-label="Previous slide"
          disabled={isAtStart}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isAtStart) {
              goTo(carousel.index - 1);
            }
          }}
        >
          <ChevronIcon direction="prev" />
        </button>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navNext} ${isAtEnd ? styles.navButtonDisabled : ""}`}
          aria-label="Next slide"
          disabled={isAtEnd}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isAtEnd) {
              goTo(carousel.index + 1);
            }
          }}
        >
          <ChevronIcon direction="next" />
        </button>
      </div>
    </section>
  );
}
