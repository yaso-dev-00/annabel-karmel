'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';

import {
  CAROUSEL_SLIDE,
  useSnapCarousel,
} from '@/components/hooks/useSnapCarousel';
import styles from './book-image-carousel.module.css';

const ARROW_LEFT = '/our-books/arrow-left.svg';
const ARROW_RIGHT = '/our-books/arrow-right.svg';

type BookImageCarouselProps = {
  images: { src: string; alt: string }[];
  title: string;
  showMobileTitle?: boolean;
};

export function BookImageCarousel({
  images,
  title,
  showMobileTitle = true,
}: BookImageCarouselProps) {
  const {
    carouselRef,
    trackRef,
    x,
    index,
    measure,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleCardClickCapture,
    animateToIndex,
  } = useSnapCarousel({
    itemCount: images.length,
    cardSelector: '.book-carousel-slide',
    controlsSelector: 'button',
    centerSingleSlide: true,
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
  });

  useEffect(() => {
    measure();
  }, [measure, images.length]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, next));
      if (clamped === index) {
        return;
      }
      animateToIndex(clamped, CAROUSEL_SLIDE);
    },
    [animateToIndex, images.length, index],
  );

  const isAtStart = index <= 0;
  const isAtEnd = index >= images.length - 1;

  if (images.length === 0) return null;

  return (
    <div className={styles.carousel} data-book-carousel>
      {showMobileTitle ? <h3 className={styles.mobileTitle}>{title}</h3> : null}

      <div
        ref={carouselRef}
        className={styles.viewport}
        onPointerDownCapture={handlePointerDown}
        onPointerMoveCapture={handlePointerMove}
        onPointerUpCapture={handlePointerEnd}
        onPointerCancelCapture={handlePointerEnd}
      >
        <motion.div
          ref={trackRef}
          className={styles.track}
          style={{ x }}
          initial={false}
        >
          {images.map((image, slideIndex) => (
            <div
              key={`${image.src}-${slideIndex}`}
              className={`book-carousel-slide ${styles.slide}`}
              aria-hidden={slideIndex !== index}
              onClickCapture={handleCardClickCapture}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
                loading={slideIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onLoad={measure}
              />
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev} ${isAtStart ? styles.arrowDisabled : ''}`}
          aria-label="Previous image"
          disabled={isAtStart}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isAtStart) {
              goTo(index - 1);
            }
          }}
        >
          <img
            src={ARROW_LEFT}
            alt=""
            className={styles.arrowIcon}
            width={39}
            height={38}
            draggable={false}
          />
        </button>

        <p className={styles.slideCounter} aria-live="polite">
          <span className={styles.slideCounterCurrent}>{index + 1}</span>
          <span className={styles.slideCounterDivider}>/</span>
          <span className={styles.slideCounterTotal}>{images.length}</span>
        </p>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext} ${isAtEnd ? styles.arrowDisabled : ''}`}
          aria-label="Next image"
          disabled={isAtEnd}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (!isAtEnd) {
              goTo(index + 1);
            }
          }}
        >
          <img
            src={ARROW_RIGHT}
            alt=""
            className={styles.arrowIcon}
            width={39}
            height={38}
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
