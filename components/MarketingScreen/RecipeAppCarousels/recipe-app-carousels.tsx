"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  recipeAppCategories,
  recipeAppDiscoverFeatures,
  recipeAppLinks,
  recipeAppTestimonials,
  recipeAppAssets,
} from "@/data/recipe-app-page";
import { CAROUSEL_SLIDE, CAROUSEL_DRAG_RELEASE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import styles from "@/components/MarketingScreen/RecipeAppPage/recipe-app-page.module.css";

const RECIPE_MARQUEE_DURATION_MS = 50_000;
const RECIPE_AUTO_RESUME_MS = 8_000;

function wrapMarqueeOffset(value: number, loopWidth: number): number {
  if (loopWidth <= 0) {
    return value;
  }

  let offset = value;

  while (offset <= -loopWidth) {
    offset += loopWidth;
  }

  while (offset > 0) {
    offset -= loopWidth;
  }

  return offset;
}

function CarouselArrow({
  direction,
  onNavigate,
  className,
  disabled = false,
}: {
  direction: "prev" | "next";
  onNavigate: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onNavigate}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function RecipeAppCategoryCarousel() {
  const items = [...recipeAppCategories, ...recipeAppCategories];
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const loopWidthRef = useRef(0);
  const isDragging = useRef(false);
  const autoScrollEnabled = useRef(true);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const pointerStartOffset = useRef(0);
  const activePointerId = useRef<number | null>(null);
  const autoResumeTimer = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [remainingCount, setRemainingCount] = useState(recipeAppCategories.length);

  const measureLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    loopWidthRef.current = track.scrollWidth / 2;
  }, []);

  const updateProgress = useCallback((offset: number) => {
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) {
      return;
    }

    const normalized = (Math.abs(offset) % loopWidth) / loopWidth;
    setScrollProgress(normalized);
    setRemainingCount(
      Math.max(0, Math.ceil((1 - normalized) * recipeAppCategories.length)),
    );
  }, []);

  useMotionValueEvent(x, "change", updateProgress);

  useEffect(() => {
    measureLoop();
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureLoop)
        : null;

    observer?.observe(track);
    window.addEventListener("resize", measureLoop);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measureLoop);
    };
  }, [measureLoop]);

  useAnimationFrame((_, delta) => {
    if (isDragging.current || !autoScrollEnabled.current) {
      return;
    }

    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) {
      return;
    }

    const speed = loopWidth / RECIPE_MARQUEE_DURATION_MS;
    x.set(wrapMarqueeOffset(x.get() - speed * delta, loopWidth));
  });

  const pauseAutoScroll = useCallback(() => {
    autoScrollEnabled.current = false;

    if (autoResumeTimer.current !== null) {
      window.clearTimeout(autoResumeTimer.current);
    }

    autoResumeTimer.current = window.setTimeout(() => {
      autoScrollEnabled.current = true;
      autoResumeTimer.current = null;
    }, RECIPE_AUTO_RESUME_MS);
  }, []);

  const setInteracting = useCallback((active: boolean) => {
    carouselRef.current?.classList.toggle(styles.recipeCarouselInteracting, active);
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      pauseAutoScroll();
      isDragging.current = false;
      pointerStartX.current = event.clientX;
      pointerStartY.current = event.clientY;
      pointerStartOffset.current = x.get();
      activePointerId.current = event.pointerId;
      setInteracting(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pauseAutoScroll, setInteracting, x],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        activePointerId.current !== event.pointerId ||
        pointerStartX.current === null ||
        pointerStartY.current === null
      ) {
        return;
      }

      const deltaX = event.clientX - pointerStartX.current;
      const deltaY = event.clientY - pointerStartY.current;

      if (
        !isDragging.current &&
        Math.abs(deltaX) < 2 &&
        Math.abs(deltaY) < 2
      ) {
        return;
      }

      if (
        !isDragging.current &&
        Math.abs(deltaX) >= 2 &&
        Math.abs(deltaX) >= Math.abs(deltaY) * 0.35
      ) {
        isDragging.current = true;
      }

      if (!isDragging.current) {
        return;
      }

      event.preventDefault();
      x.set(pointerStartOffset.current + deltaX);
    },
    [x],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (activePointerId.current !== event.pointerId) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const loopWidth = loopWidthRef.current;
      if (loopWidth > 0) {
        x.set(wrapMarqueeOffset(x.get(), loopWidth));
      }

      isDragging.current = false;
      activePointerId.current = null;
      pointerStartX.current = null;
      pointerStartY.current = null;
      setInteracting(false);
    },
    [setInteracting, x],
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const blockTouchScrollWhileDragging = (event: TouchEvent) => {
      if (activePointerId.current !== null && isDragging.current) {
        event.preventDefault();
      }
    };

    carousel.addEventListener("touchmove", blockTouchScrollWhileDragging, { passive: false });

    return () => {
      carousel.removeEventListener("touchmove", blockTouchScrollWhileDragging);
      if (autoResumeTimer.current !== null) {
        window.clearTimeout(autoResumeTimer.current);
      }
    };
  }, []);

  return (
    <div className={styles.recipeCarouselWrap}>
      <div
        ref={carouselRef}
        className={`${styles.recipeCarousel} cursor-grab select-none active:cursor-grabbing`}
        aria-label="Recipe categories"
        onPointerDownCapture={handlePointerDown}
        onPointerMoveCapture={handlePointerMove}
        onPointerUpCapture={handlePointerEnd}
        onPointerCancelCapture={handlePointerEnd}
        onMouseEnter={() => {
          autoScrollEnabled.current = false;
        }}
        onMouseLeave={() => {
          if (!isDragging.current) {
            autoScrollEnabled.current = true;
          }
        }}
      >
        <motion.div ref={trackRef} className={styles.recipeTrack} style={{ x }}>
          {items.map((item, index) => (
            <figure
              key={`${item.label}-${index}`}
              className={styles.recipeSlide}
            >
              <Image
                src={item.image}
                alt=""
                width={item.width}
                height={item.height}
                className={styles.recipeImage}
                sizes="(max-width: 767px) 45vw, 196px"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onLoad={index === 0 ? measureLoop : undefined}
              />
              <figcaption className={styles.recipeLabel}>{item.label}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      <div
        className={styles.recipeCarouselIndicator}
        aria-label={`${remainingCount} recipe categories remaining in this scroll`}
      >
        <div className={styles.recipeCarouselIndicatorTrack}>
          <div
            className={styles.recipeCarouselIndicatorFill}
            style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
          />
        </div>
        <p className={styles.recipeCarouselIndicatorText}>
          {remainingCount} more {remainingCount === 1 ? "category" : "categories"} to explore
        </p>
      </div>
    </div>
  );
}

function StarRating({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <svg key={index} width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M13.3 2.2L16.4 9.5L24.3 10.4L18.6 15.7L20.2 23.5L13.3 19.7L6.4 23.5L8 15.7L2.3 10.4L10.2 9.5L13.3 2.2Z"
            fill="#B34769"
          />
        </svg>
      ))}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M13.3 2.2L16.4 9.5L24.3 10.4L18.6 15.7L20.2 23.5L13.3 19.7L6.4 23.5L8 15.7L2.3 10.4L10.2 9.5L13.3 2.2Z"
          fill="#E9C6CE"
        />
        <path d="M13.3 2.2L16.4 9.5L24.3 10.4L13.3 19.7V2.2Z" fill="#B34769" />
      </svg>
    </div>
  );
}

export function RecipeAppTestimonialCarousel() {
  const carousel = useSnapCarousel({
    itemCount: recipeAppTestimonials.length,
    cardSelector: "[data-testimonial-slide]",
    controlsSelector: ".recipe-testimonial-controls",
    dragThreshold: 8,
    touchDragThreshold: 2,
    dragReleaseTransition: CAROUSEL_DRAG_RELEASE,
  });

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure]);

  const isAtStart = carousel.isAtStart;
  const isAtEnd = carousel.isAtEnd;

  return (
    <section className={styles.testimonialsSection} aria-labelledby="recipe-app-testimonials-heading">
      <div
        className={styles.testimonialsSectionBg}
        aria-hidden="true"
        style={{ backgroundImage: `url(${recipeAppAssets.customersBg})` }}
      />
      <div className={styles.testimonialsHeaderInner}>
        <h2 id="recipe-app-testimonials-heading" className={styles.testimonialsHeading}>
          What our customers are saying
        </h2>
        <div className={styles.testimonialsRatingRow}>
          <StarRating className={styles.starRow} />
          <p className={styles.ratingText}>4.5 • 1.7K Ratings</p>
        </div>
      </div>

      <div className={styles.testimonialCarouselWrap}>
        <div
          ref={carousel.carouselRef}
          className={styles.testimonialCarouselStage}
          onPointerDownCapture={carousel.handlePointerDown}
          onPointerMoveCapture={carousel.handlePointerMove}
          onPointerUpCapture={carousel.handlePointerEnd}
          onPointerCancelCapture={carousel.handlePointerEnd}
        >
          <motion.div
            ref={carousel.trackRef}
            className={styles.testimonialTrack}
            style={{ x: carousel.x }}
          >
            {recipeAppTestimonials.map((item) => (
              <article
                key={item.name}
                data-testimonial-slide
                className={styles.testimonialCard}
                onClickCapture={carousel.handleCardClickCapture}
              >
                <svg
                  className={styles.testimonialQuoteIcon}
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className={styles.testimonialQuote}>{item.quote}</blockquote>
                <cite className={styles.testimonialName}>{item.name}</cite>
              </article>
            ))}
          </motion.div>
        </div>

        <div className={styles.testimonialControls}>
          <CarouselArrow
            direction="prev"
            disabled={isAtStart}
            onNavigate={() => {
              if (!isAtStart) {
                carousel.animateToIndex(carousel.index - 1, CAROUSEL_SLIDE);
              }
            }}
            className={`${styles.testimonialArrow} ${styles.testimonialArrowPrev} recipe-testimonial-controls`}
          />
          <CarouselArrow
            direction="next"
            disabled={isAtEnd}
            onNavigate={() => {
              if (!isAtEnd) {
                carousel.animateToIndex(carousel.index + 1, CAROUSEL_SLIDE);
              }
            }}
            className={`${styles.testimonialArrow} ${styles.testimonialArrowNext} recipe-testimonial-controls`}
          />
        </div>
      </div>
    </section>
  );
}

const DISCOVER_CYCLE_MS = 5000;
const MOBILE_TABS_QUERY = "(max-width: 767px)";

function getCenteredTabIndex(
  tabList: HTMLDivElement,
  tabs: Array<HTMLButtonElement | null>,
): number {
  const listCenter = tabList.scrollLeft + tabList.clientWidth / 2;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  tabs.forEach((tab, index) => {
    if (!tab) {
      return;
    }

    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    const distance = Math.abs(tabCenter - listCenter);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

export function RecipeAppDiscoverFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const skipCenterScrollRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);
  const scrollSyncTimerRef = useRef<number | null>(null);
  const active = recipeAppDiscoverFeatures[activeIndex] ?? recipeAppDiscoverFeatures[0];

  const setTabRef = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      tabRefs.current[index] = node;
    },
    [],
  );

  const activateFeature = useCallback((index: number, source: "click" | "auto" | "scroll") => {
    if (source === "scroll") {
      skipCenterScrollRef.current = true;
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
    setProgressKey((current) => current + 1);
  }, []);

  const advanceFeature = useCallback(() => {
    const nextIndex = (activeIndexRef.current + 1) % recipeAppDiscoverFeatures.length;
    activateFeature(nextIndex, "auto");
  }, [activateFeature]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const timer = window.setInterval(advanceFeature, DISCOVER_CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [advanceFeature, activeIndex]);

  useEffect(() => {
    const tab = tabRefs.current[activeIndex];
    const tabList = tabListRef.current;
    if (!tab || !tabList) {
      return;
    }

    if (skipCenterScrollRef.current) {
      skipCenterScrollRef.current = false;
      return;
    }

    const isMobileTabs = window.matchMedia(MOBILE_TABS_QUERY).matches;
    if (!isMobileTabs) {
      return;
    }

    const listRect = tabList.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const tabLeft = tabRect.left - listRect.left + tabList.scrollLeft;
    const targetScrollLeft =
      tabLeft - listRect.width / 2 + tabRect.width / 2;

    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current !== null) {
      window.clearTimeout(programmaticScrollTimerRef.current);
    }
    programmaticScrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      programmaticScrollTimerRef.current = null;
    }, 500);

    tabList.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) {
      return;
    }

    const syncActiveFromScroll = () => {
      if (isProgrammaticScrollRef.current) {
        return;
      }

      if (!window.matchMedia(MOBILE_TABS_QUERY).matches) {
        return;
      }

      const centeredIndex = getCenteredTabIndex(tabList, tabRefs.current);
      if (centeredIndex !== activeIndexRef.current) {
        activateFeature(centeredIndex, "scroll");
      }
    };

    const scheduleScrollSync = () => {
      if (scrollSyncTimerRef.current !== null) {
        window.clearTimeout(scrollSyncTimerRef.current);
      }

      scrollSyncTimerRef.current = window.setTimeout(() => {
        scrollSyncTimerRef.current = null;
        syncActiveFromScroll();
      }, 80);
    };

    const handleScroll = () => {
      scheduleScrollSync();
    };

    const handleScrollEnd = () => {
      if (scrollSyncTimerRef.current !== null) {
        window.clearTimeout(scrollSyncTimerRef.current);
        scrollSyncTimerRef.current = null;
      }
      syncActiveFromScroll();
    };

    tabList.addEventListener("scroll", handleScroll, { passive: true });
    tabList.addEventListener("scrollend", handleScrollEnd, { passive: true });

    return () => {
      tabList.removeEventListener("scroll", handleScroll);
      tabList.removeEventListener("scrollend", handleScrollEnd);
      if (scrollSyncTimerRef.current !== null) {
        window.clearTimeout(scrollSyncTimerRef.current);
      }
      if (programmaticScrollTimerRef.current !== null) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
    };
  }, [activateFeature]);

  const selectFeature = useCallback(
    (index: number) => {
      activateFeature(index, "click");
    },
    [activateFeature],
  );

  return (
    <section
      className={styles.discoverSection}
      aria-labelledby="recipe-app-discover-heading"
    >
      <div className={styles.discoverGrid}>
        <div className={styles.discoverContent}>
          <p className={styles.discoverEyebrow}>MORE RESOURCES</p>
          <h2 id="recipe-app-discover-heading" className={styles.discoverHeading}>
            Discover more app features
          </h2>

          <div
            ref={tabListRef}
            className={styles.discoverTabList}
            role="tablist"
            aria-label="App features"
          >
            {recipeAppDiscoverFeatures.map((feature, index) => (
              <button
                key={feature.id}
                ref={setTabRef(index)}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`${styles.discoverTab} ${
                  activeIndex === index ? styles.discoverTabActive : ""
                }`}
                onClick={() => selectFeature(index)}
              >
                <span className={styles.discoverTabLabel}>{feature.label}</span>
                <span className={styles.discoverTabBorder} aria-hidden="true">
                  {activeIndex === index ? (
                    <span
                      key={progressKey}
                      className={styles.discoverTabBorderFill}
                      style={{ animationDuration: `${DISCOVER_CYCLE_MS}ms` }}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.discoverStoreBadges}>
            <a href={recipeAppLinks.appStore} aria-label="Download on the App Store">
              <Image src={recipeAppAssets.appStoreBadge} alt="" width={152} height={50} />
            </a>
            <a href={recipeAppLinks.playStore} aria-label="Get it on Google Play">
              <Image src={recipeAppAssets.googlePlayBadge} alt="" width={152} height={50} />
            </a>
          </div>
        </div>

        <div className={styles.discoverPanel} role="tabpanel" aria-label={active.label}>
          <p className="sr-only" aria-live="polite">
            {active.label}: {active.body}
          </p>
          <div className={styles.discoverPanelInner}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className={styles.discoverVisual}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.discoverPhoneWrap}>
                  <div
                    className={styles.discoverPhoneFrame}
                    // style={{ aspectRatio: `${active.imageWidth} / ${active.imageHeight}` }}
                  >
                    <Image
                      src={active.image}
                      alt=""
                      fill
                      className={styles.discoverPhone}
                      sizes="(min-width: 1024px) 52vw, 92vw"
                      priority
                    />
                  </div>
                  <div
                    className={styles.discoverCallout}
                    style={
                      {
                        "--discover-callout-bg": `url(${recipeAppAssets.discoverCallout})`,
                      } as CSSProperties
                    }
                  >
                    <p className={styles.discoverCalloutText}>{active.body}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={styles.discoverStoreBadgesMobile}>
        <a href={recipeAppLinks.appStore} aria-label="Download on the App Store">
          <Image src={recipeAppAssets.appStoreBadge} alt="" width={152} height={50} />
        </a>
        <a href={recipeAppLinks.playStore} aria-label="Get it on Google Play">
          <Image src={recipeAppAssets.googlePlayBadge} alt="" width={152} height={50} />
        </a>
      </div>
    </section>
  );
}
