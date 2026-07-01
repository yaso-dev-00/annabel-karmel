"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";

import { CAROUSEL_SLIDE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import styles from "./book-image-carousel.module.css";

const ARROW_LEFT = "/our-books/arrow-left.svg";
const ARROW_RIGHT = "/our-books/arrow-right.svg";

type BookImageCarouselProps = {
  images: { src: string; alt: string }[];
  title: string;
  showMobileTitle?: boolean;
};

export function BookImageCarousel({ images, title, showMobileTitle = true }: BookImageCarouselProps) {
  const carousel = useSnapCarousel({
    itemCount: images.length,
    cardSelector: ".book-carousel-slide",
    controlsSelector: "button",
    centerSingleSlide: true,
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
  });

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure, images.length]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, next));
      if (clamped === carousel.index) {
        return;
      }
      carousel.animateToIndex(clamped, CAROUSEL_SLIDE);
    },
    [carousel, images.length],
  );

  const isAtStart = carousel.index <= 0;
  const isAtEnd = carousel.index >= images.length - 1;

  if (images.length === 0) return null;

  return (
    <div className={styles.carousel}>
      {showMobileTitle ? <h3 className={styles.mobileTitle}>{title}</h3> : null}

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
          {images.map((image, slideIndex) => (
            <div
              key={image.src}
              className={`book-carousel-slide ${styles.slide}`}
              aria-hidden={slideIndex !== carousel.index}
              onClickCapture={carousel.handleCardClickCapture}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
                loading={slideIndex === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onLoad={carousel.measure}
              />
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev} ${isAtStart ? styles.arrowDisabled : ""}`}
          aria-label="Previous image"
          disabled={isAtStart}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isAtStart) {
              goTo(carousel.index - 1);
            }
          }}
        >
          <img src={ARROW_LEFT} alt="" className={styles.arrowIcon} width={39} height={38} draggable={false} />
        </button>

        <p className={styles.slideCounter} aria-live="polite">
          <span className={styles.slideCounterCurrent}>{carousel.index + 1}</span>
          <span className={styles.slideCounterDivider}>/</span>
          <span className={styles.slideCounterTotal}>{images.length}</span>
        </p>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext} ${isAtEnd ? styles.arrowDisabled : ""}`}
          aria-label="Next image"
          disabled={isAtEnd}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isAtEnd) {
              goTo(carousel.index + 1);
            }
          }}
        >
          <img src={ARROW_RIGHT} alt="" className={styles.arrowIcon} width={39} height={38} draggable={false} />
        </button>
      </div>
    </div>
  );
}
