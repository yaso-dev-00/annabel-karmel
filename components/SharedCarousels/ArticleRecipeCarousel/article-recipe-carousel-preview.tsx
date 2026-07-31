'use client';

import { motion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  useSnapCarousel,
  CAROUSEL_SMOOTH,
} from '@/components/hooks/useSnapCarousel';
import { resolveImageSrc } from '@/lib/content-blocks/image-src';
import type { ArticleRecipeCarouselItem } from './article-recipe-carousel';
import styles from './article-recipe-carousel.module.css';

function RecipeLockIcon() {
  return <span className={styles.lockGlyph} aria-hidden />;
}

type CarouselLayout = {
  perView: number;
  slots: number;
};

function getPreviewLayout(
  width: number,
  perDesktopView: number,
  itemCount: number,
): CarouselLayout {
  let perView = perDesktopView;
  if (width < 700) perView = 1;
  else if (width < 900) perView = 2;
  else if (width < 1100) perView = Math.min(perDesktopView, 3);
  else if (width < 1280) perView = Math.min(perDesktopView, 4);

  perView = Math.max(1, Math.min(perView, Math.max(1, itemCount)));
  return { perView, slots: perView };
}

function getPreviewCardWidth(
  viewportWidth: number,
  layout: CarouselLayout,
  gap: number,
) {
  const count = Math.max(1, Math.round(layout.slots));
  return (viewportWidth - (count - 1) * gap) / count;
}

type ArticleRecipeCarouselPreviewProps = {
  items: ArticleRecipeCarouselItem[];
  className?: string;
  perDesktopView?: 3 | 4 | 5;
  loop?: boolean;
  compact?: boolean;
};

export function ArticleRecipeCarouselPreview({
  items,
  className = 'mt-[60px]',
  perDesktopView = 5,
  loop = true,
  compact = false,
}: ArticleRecipeCarouselPreviewProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const {
    carouselRef,
    trackRef,
    x,
    index,
    maxIndex,
    isAtStart,
    isAtEnd,
    measure,
    handleNavigation: snapHandleNavigation,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleCardClickCapture,
    animateToIndex,
  } = useSnapCarousel({
    itemCount: items.length,
    cardSelector: '.article-recipe-card',
    controlsSelector: 'button',
    initialVisibleCards: 1,
  });

  const gap = compact ? 10 : 14;
  const canCycle = items.length > 1 && maxIndex > 0;
  const layout = getPreviewLayout(
    viewportWidth || 320,
    perDesktopView,
    items.length,
  );
  const computedCardWidth =
    viewportWidth > 0 ? getPreviewCardWidth(viewportWidth, layout, gap) : null;

  const measureCards = useCallback(() => {
    const viewport = carouselRef.current;
    const stage = stageRef.current;
    if (!viewport || viewport.clientWidth <= 0) return;

    const width = viewport.clientWidth;
    const activeLayout = getPreviewLayout(width, perDesktopView, items.length);
    const cardWidth = getPreviewCardWidth(width, activeLayout, gap);
    if (cardWidth <= 0) return;

    setViewportWidth(width);
    if (stage) {
      stage.style.setProperty('--card-width', `${cardWidth}px`);
      stage.style.setProperty('--nav-center-y', `${(cardWidth * 3) / 8}px`);
      stage.dataset.navReady = '';
    }
    measure();
  }, [carouselRef, gap, items.length, measure, perDesktopView]);

  useLayoutEffect(() => {
    measureCards();
  }, [measureCards, items.length]);

  useEffect(() => {
    const viewport = carouselRef.current;
    if (!viewport || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measureCards);
    ro.observe(viewport);
    const frame = viewport.closest('[data-preview-frame]');
    if (frame) ro.observe(frame);
    return () => ro.disconnect();
  }, [carouselRef, measureCards]);

  const handleNavigation = useCallback(
    (direction: number) => {
      if (!canCycle) return;
      if (loop) {
        if (direction > 0 && isAtEnd) {
          animateToIndex(0, CAROUSEL_SMOOTH);
          return;
        }
        if (direction < 0 && isAtStart) {
          animateToIndex(maxIndex, CAROUSEL_SMOOTH);
          return;
        }
      }
      snapHandleNavigation(direction);
    },
    [
      animateToIndex,
      canCycle,
      isAtEnd,
      isAtStart,
      loop,
      maxIndex,
      snapHandleNavigation,
    ],
  );

  const cardStyle =
    computedCardWidth && computedCardWidth > 0
      ? { width: computedCardWidth }
      : undefined;

  // Stay within the CMS preview frame — do not use page full-bleed breakout.
  const wrapperClass = `relative w-full max-w-full ${className}`;

  return (
    <motion.div
      className={wrapperClass}
      initial={false}
      data-cms-interactive="true"
      style={{ touchAction: 'pan-x pinch-zoom' }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        ref={stageRef}
        className={`${styles.carouselStage} ${compact ? styles.carouselStageCompact : ''}`}
      >
        <div
          ref={carouselRef}
          className={`${styles.carouselViewport} cursor-grab select-none active:cursor-grabbing`}
          onPointerDownCapture={handlePointerDown}
          onPointerMoveCapture={handlePointerMove}
          onPointerUpCapture={handlePointerEnd}
          onPointerCancelCapture={handlePointerEnd}
        >
          <motion.div
            ref={trackRef}
            className={compact ? 'flex gap-[10px]' : 'flex gap-[14px]'}
            style={{ x }}
          >
            {items.map((recipe, recipeIndex) => {
              const imageSrc = resolveImageSrc(recipe.image);
              return (
                <section
                  key={`${recipe.title}-${recipeIndex}`}
                  className={`article-recipe-card shrink-0 overflow-visible rounded-[12px] bg-white shadow-[0_6px_18px_rgba(58,58,58,0.08)] ${compact ? 'pb-[6px]' : 'pb-[10px]'}`}
                  style={cardStyle}
                  onClickCapture={handleCardClickCapture}
                >
                  <div className={styles.imageWrap}>
                    <a href={recipe.href} className={styles.imageLink}>
                      {imageSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageSrc}
                          alt={recipe.title}
                          loading={recipeIndex < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="block aspect-4/3 w-full object-cover"
                          draggable={false}
                          onLoad={recipeIndex === 0 ? measureCards : undefined}
                        />
                      ) : (
                        <div
                          className="block aspect-4/3 w-full bg-[#f6e9ef]"
                          aria-hidden
                        />
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
                  <div
                    className={`px-[8px] text-center ${compact ? 'min-h-[44px] pt-[10px]' : 'min-h-[52px] pt-[15px] px-[10px]'}`}
                  >
                    <h3
                      className={`m-0 mt-[10px] font-semibold text-[#3a3a3a] ${
                        compact
                          ? 'text-[15px] leading-[1.25] min-[700px]:text-[17px] min-[900px]:text-[20px]'
                          : 'text-[16px] leading-[1.3] min-[700px]:text-[18px] min-[900px]:text-[20px]'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <a
                        href={recipe.href}
                        className="text-inherit no-underline hover:text-(--hover-color)"
                      >
                        {recipe.title}
                      </a>
                    </h3>
                  </div>
                </section>
              );
            })}
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Previous recipes"
          onClick={(event) => {
            event.stopPropagation();
            handleNavigation(-1);
          }}
          disabled={!canCycle || (!loop && isAtStart)}
          onPointerDown={(event) => event.stopPropagation()}
          className={`${styles.navButton} cursor-pointer left-1 grid h-8 w-8 place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_6px_16px_rgba(179,71,105,0.2)] hover:bg-[#ffe8ef] disabled:cursor-not-allowed disabled:opacity-40 min-[700px]:left-3 min-[700px]:h-10 min-[700px]:w-10 min-[700px]:shadow-[0_8px_20px_rgba(179,71,105,0.22)] min-[900px]:h-11 min-[900px]:w-11`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-[14px] w-[14px] min-[700px]:h-[17px] min-[700px]:w-[17px] min-[900px]:h-[19px] min-[900px]:w-[19px]"
          >
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
          aria-label="Next recipes"
          onClick={(event) => {
            event.stopPropagation();
            handleNavigation(1);
          }}
          disabled={!canCycle || (!loop && isAtEnd)}
          onPointerDown={(event) => event.stopPropagation()}
          className={`${styles.navButton} cursor-pointer right-1 grid h-8 w-8 place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_6px_16px_rgba(179,71,105,0.2)] hover:bg-[#ffe8ef] disabled:cursor-not-allowed disabled:opacity-40 min-[700px]:right-3 min-[700px]:h-10 min-[700px]:w-10 min-[700px]:shadow-[0_8px_20px_rgba(179,71,105,0.22)] min-[900px]:h-11 min-[900px]:w-11`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-[14px] w-[14px] min-[700px]:h-[17px] min-[700px]:w-[17px] min-[900px]:h-[19px] min-[900px]:w-[19px]"
          >
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
      </div>

      {canCycle ? (
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Carousel pages"
        >
          {items.map((recipe, dotIndex) => (
            <button
              key={`${recipe.title}-dot-${dotIndex}`}
              type="button"
              role="tab"
              aria-selected={index === dotIndex}
              aria-label={`Go to ${recipe.title}`}
              className={`h-2.5 w-2.5 rounded-full border-0 p-0 transition-colors ${
                index === dotIndex ? 'bg-[#b34769]' : 'bg-[#efcfd8]'
              }`}
              onClick={(event) => {
                event.stopPropagation();
                animateToIndex(dotIndex, CAROUSEL_SMOOTH);
              }}
            />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
