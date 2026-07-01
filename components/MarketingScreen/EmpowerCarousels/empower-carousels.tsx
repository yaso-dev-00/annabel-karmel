"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import {
  empowerExpertBenefits,
  empowerRecipeCategories,
} from "@/data/empower-your-employees-page";
import { empowerImageSizes } from "@/data/empower-image-sizes";
import {
  CAROUSEL_SLIDE,
  CAROUSEL_SPRING,
} from "@/components/hooks/useSnapCarousel";
import styles from "@/components/MarketingScreen/EmpowerYourEmployeesPage/empower-your-employees-page.module.css";

const EXPERT_GAP_PX = 20;
const DESKTOP_BREAKPOINT = 768;
const EXPERT_AUTOPLAY_MS = 2_500;
const EXPERT_TOUCH_MOMENTUM = 0.18;
const EXPERT_DRAG_THRESHOLD = 8;
const EXPERT_TOUCH_DRAG_THRESHOLD = 2;
const RECIPE_MARQUEE_DURATION_MS = 50_000;
const RECIPE_AUTO_RESUME_MS = 8_000;
const EXPERT_LOGICAL_COUNT = empowerExpertBenefits.length;

function getExpertTranslateX(
  physicalIndex: number,
  cardWidth: number,
  viewportWidth: number,
  isMobile: boolean,
): number {
  const stride = cardWidth + EXPERT_GAP_PX;

  if (isMobile) {
    const centerOffset = Math.round((viewportWidth - cardWidth) / 2);
    return centerOffset - physicalIndex * stride;
  }

  return -(cardWidth / 2 + physicalIndex * stride);
}

function rebaseExpertPhysicalIndex(physicalIndex: number): number {
  let index = physicalIndex;

  while (index < EXPERT_LOGICAL_COUNT) {
    index += EXPERT_LOGICAL_COUNT;
  }

  while (index >= EXPERT_LOGICAL_COUNT * 2) {
    index -= EXPERT_LOGICAL_COUNT;
  }

  return index;
}

function getExpertCardWidth(stageWidth: number, windowWidth: number): number {
  if (windowWidth < DESKTOP_BREAKPOINT) {
    return Math.round(stageWidth * 0.86);
  }

  if (windowWidth < 1024) {
    return Math.round((stageWidth - EXPERT_GAP_PX * 2) / 2.35);
  }

  if (windowWidth < 1440) {
    return (stageWidth - EXPERT_GAP_PX * 3) / 3;
  }

  return (stageWidth - EXPERT_GAP_PX * 3) / 3.5;
}

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

function ExpertCarouselArrow({
  direction,
  onNavigate,
}: {
  direction: "prev" | "next";
  onNavigate: () => void;
}) {
  const maskId = useId();

  return (
    <button
      type="button"
      className={`${styles.expertCarouselControl} empower-expert-controls`}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onNavigate}
      aria-label={direction === "prev" ? "Previous benefit" : "Next benefit"}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <mask id={maskId}>
            <rect width="40" height="40" fill="white" />
            <path
              d={direction === "prev" ? "M23.5 11.5L14.5 20L23.5 28.5" : "M16.5 11.5L25.5 20L16.5 28.5"}
              stroke="black"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <circle cx="20" cy="20" r="20" fill="white" mask={`url(#${maskId})`} />
      </svg>
    </button>
  );
}

export function EmpowerRecipeCarousel() {
  const items = [...empowerRecipeCategories, ...empowerRecipeCategories];
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
  const [remainingCount, setRemainingCount] = useState(empowerRecipeCategories.length);

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
      Math.max(0, Math.ceil((1 - normalized) * empowerRecipeCategories.length)),
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
    carouselRef.current?.classList.toggle("is-carousel-interacting", active);
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
              className={`${styles.recipeSlide} empower-recipe-slide`}
            >
              <Image
                src={item.image}
                alt=""
                width={item.width}
                height={item.height}
                className={styles.recipeImage}
                sizes={empowerImageSizes.recipe}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
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

export function EmpowerExpertCarousel() {
  const loopItems = useMemo(
    () => [
      ...empowerExpertBenefits,
      ...empowerExpertBenefits,
      ...empowerExpertBenefits,
    ],
    [],
  );

  const [isMobile, setIsMobile] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [cardWidth, setCardWidth] = useState(() => getExpertCardWidth(1200, 1200));

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const physicalIndexRef = useRef(EXPERT_LOGICAL_COUNT);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const loopWidthRef = useRef(0);
  const isDragging = useRef(false);
  const blockClickRef = useRef(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const pointerStartOffset = useRef(0);
  const activePointerId = useRef<number | null>(null);
  const viewportWidthRef = useRef(1200);
  const velocityXRef = useRef(0);
  const lastPointerSample = useRef({ x: 0, t: 0 });
  const touchHorizontalIntent = useRef(false);

  const getViewportWidth = useCallback(() => {
    const windowWidth = window.innerWidth;
    return windowWidth < DESKTOP_BREAKPOINT
      ? carouselRef.current?.clientWidth ?? windowWidth
      : windowWidth;
  }, []);

  const getTranslateX = useCallback(
    (physicalIndex: number) =>
      getExpertTranslateX(
        physicalIndex,
        cardWidth,
        viewportWidthRef.current,
        isMobile,
      ),
    [cardWidth, isMobile],
  );

  const getLoopWidth = useCallback(() => {
    if (loopWidthRef.current > 0) {
      return loopWidthRef.current;
    }

    return EXPERT_LOGICAL_COUNT * (cardWidth + EXPERT_GAP_PX);
  }, [cardWidth]);

  const getMiddleTranslateX = useCallback(
    () => getTranslateX(EXPERT_LOGICAL_COUNT),
    [getTranslateX],
  );

  const syncToRebasedIndex = useCallback(() => {
    const rebased = rebaseExpertPhysicalIndex(physicalIndexRef.current);
    physicalIndexRef.current = rebased;
    x.set(getTranslateX(rebased));
    return rebased;
  }, [getTranslateX, x]);

  const wrapTranslateXIfNeeded = useCallback(
    (latest: number) => {
      const loopWidth = getLoopWidth();
      if (loopWidth <= 0) {
        return;
      }

      const middleX = getMiddleTranslateX();

      if (latest <= middleX - loopWidth) {
        x.set(latest + loopWidth);
        physicalIndexRef.current = rebaseExpertPhysicalIndex(
          physicalIndexRef.current - EXPERT_LOGICAL_COUNT,
        );
        return;
      }

      if (latest > middleX) {
        x.set(latest - loopWidth);
        physicalIndexRef.current = rebaseExpertPhysicalIndex(
          physicalIndexRef.current + EXPERT_LOGICAL_COUNT,
        );
      }
    },
    [getLoopWidth, getMiddleTranslateX, x],
  );

  const measureLoopWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.scrollWidth <= 0) {
      loopWidthRef.current = EXPERT_LOGICAL_COUNT * (cardWidth + EXPERT_GAP_PX);
      return;
    }

    loopWidthRef.current = track.scrollWidth / 3;
  }, [cardWidth]);

  const syncPhysicalPosition = useCallback(
    (physicalIndex: number) => {
      if (isDragging.current) {
        return;
      }

      physicalIndexRef.current = rebaseExpertPhysicalIndex(physicalIndex);
      animationRef.current?.stop();
      animationRef.current = null;
      x.set(getTranslateX(physicalIndexRef.current));
    },
    [getTranslateX, x],
  );

  const rebaseIfNeeded = useCallback(() => {
    const rebased = rebaseExpertPhysicalIndex(physicalIndexRef.current);
    if (rebased !== physicalIndexRef.current) {
      physicalIndexRef.current = rebased;
      x.set(getTranslateX(rebased));
    }
  }, [getTranslateX, x]);

  const animateToPhysicalIndex = useCallback(
    (
      nextPhysical: number,
      transition:
        | typeof CAROUSEL_SLIDE
        | typeof CAROUSEL_SPRING = CAROUSEL_SLIDE,
      velocity = 0,
    ) => {
      const clampedTarget = Math.max(
        0,
        Math.min(loopItems.length - 1, nextPhysical),
      );
      physicalIndexRef.current = clampedTarget;
      const targetX = getTranslateX(clampedTarget);

      animationRef.current?.stop();

      const motionTransition =
        "type" in transition
          ? { ...transition, velocity }
          : {
              duration: transition.duration,
              ease: transition.ease,
            };

      animationRef.current = animate(x, targetX, {
        ...motionTransition,
        onComplete: () => {
          animationRef.current = null;
          rebaseIfNeeded();
          wrapTranslateXIfNeeded(x.get());
        },
      });
    },
    [
      getTranslateX,
      loopItems.length,
      rebaseIfNeeded,
      wrapTranslateXIfNeeded,
      x,
    ],
  );

  const advanceOne = useCallback(() => {
    if (animationRef.current) {
      return;
    }

    const current = syncToRebasedIndex();
    animateToPhysicalIndex(current + 1, CAROUSEL_SLIDE);
  }, [animateToPhysicalIndex, syncToRebasedIndex]);

  const findNearestPhysicalIndex = useCallback(
    (currentX: number) => {
      let nearest = physicalIndexRef.current;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (let index = 0; index < loopItems.length; index += 1) {
        const distance = Math.abs(currentX - getTranslateX(index));
        const inMiddle =
          index >= EXPERT_LOGICAL_COUNT && index < EXPERT_LOGICAL_COUNT * 2;
        const nearestInMiddle =
          nearest >= EXPERT_LOGICAL_COUNT && nearest < EXPERT_LOGICAL_COUNT * 2;

        if (
          distance < nearestDistance - 0.5 ||
          (Math.abs(distance - nearestDistance) <= 0.5 && inMiddle && !nearestInMiddle)
        ) {
          nearestDistance = distance;
          nearest = index;
        }
      }

      return nearest;
    },
    [getTranslateX, loopItems.length],
  );

  const measureCardWidth = useCallback(() => {
    if (isDragging.current || animationRef.current) {
      return;
    }

    const windowWidth = window.innerWidth;
    const viewportWidth = getViewportWidth();
    viewportWidthRef.current = viewportWidth;
    setCardWidth(getExpertCardWidth(viewportWidth, windowWidth));
    measureLoopWidth();
    syncPhysicalPosition(physicalIndexRef.current);
  }, [getViewportWidth, measureLoopWidth, syncPhysicalPosition]);

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth < DESKTOP_BREAKPOINT);
    };

    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    measureCardWidth();
    window.addEventListener("resize", measureCardWidth);

    const viewport = carouselRef.current;
    const track = trackRef.current;
    const observer =
      typeof ResizeObserver !== "undefined" && (viewport || track)
        ? new ResizeObserver(measureCardWidth)
        : null;

    if (viewport) {
      observer?.observe(viewport);
    }
    if (track) {
      observer?.observe(track);
    }

    return () => {
      window.removeEventListener("resize", measureCardWidth);
      observer?.disconnect();
    };
  }, [isMobile, measureCardWidth]);

  useEffect(() => {
    if (isDragging.current || animationRef.current) {
      return;
    }

    measureLoopWidth();
    syncPhysicalPosition(physicalIndexRef.current);
  }, [cardWidth, isMobile, measureLoopWidth, syncPhysicalPosition]);

  useMotionValueEvent(x, "change", (latest) => {
    if (animationRef.current || isDragging.current) {
      return;
    }

    wrapTranslateXIfNeeded(latest);
  });

  useEffect(() => {
    if (!autoScrollEnabled) {
      return;
    }

    const timer = window.setInterval(() => {
      advanceOne();
    }, EXPERT_AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [advanceOne, autoScrollEnabled]);

  const setInteracting = useCallback((active: boolean) => {
    carouselRef.current?.classList.toggle("is-carousel-interacting", active);
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest(".empower-expert-controls, button")) {
        return;
      }

      setAutoScrollEnabled(false);
      animationRef.current?.stop();
      animationRef.current = null;
      isDragging.current = false;
      blockClickRef.current = false;
      touchHorizontalIntent.current = false;
      velocityXRef.current = 0;
      lastPointerSample.current = { x: event.clientX, t: performance.now() };
      pointerStartX.current = event.clientX;
      pointerStartY.current = event.clientY;
      pointerStartOffset.current = x.get();
      activePointerId.current = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [x],
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
      const moveThreshold =
        event.pointerType === "touch"
          ? EXPERT_TOUCH_DRAG_THRESHOLD
          : EXPERT_DRAG_THRESHOLD;

      if (!isDragging.current) {
        if (
          Math.abs(deltaX) < moveThreshold &&
          Math.abs(deltaY) < moveThreshold
        ) {
          return;
        }

        if (
          Math.abs(deltaX) < moveThreshold ||
          Math.abs(deltaX) < Math.abs(deltaY) * 0.35
        ) {
          return;
        }

        isDragging.current = true;
        if (event.pointerType === "touch") {
          touchHorizontalIntent.current = true;
        }
        setInteracting(true);
      }

      const now = performance.now();
      const lastSample = lastPointerSample.current;
      const elapsed = now - lastSample.t;
      if (elapsed > 0 && elapsed < 80) {
        velocityXRef.current = ((event.clientX - lastSample.x) / elapsed) * 1000;
      }
      lastPointerSample.current = { x: event.clientX, t: now };

      event.preventDefault();
      x.set(pointerStartOffset.current + deltaX);
    },
    [setInteracting, x],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (activePointerId.current !== event.pointerId) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const wasDragging = isDragging.current;
      const releaseVelocity = velocityXRef.current;
      const wasTouch = event.pointerType === "touch";

      activePointerId.current = null;
      pointerStartX.current = null;
      pointerStartY.current = null;
      touchHorizontalIntent.current = false;
      velocityXRef.current = 0;
      lastPointerSample.current = { x: 0, t: 0 };
      setInteracting(false);

      if (wasDragging) {
        const momentumOffset = wasTouch
          ? releaseVelocity * EXPERT_TOUCH_MOMENTUM
          : releaseVelocity * 0.1;
        const nearest = findNearestPhysicalIndex(x.get() + momentumOffset);
        animateToPhysicalIndex(
          nearest,
          CAROUSEL_SPRING,
          wasTouch ? releaseVelocity : 0,
        );
        blockClickRef.current = true;
        window.setTimeout(() => {
          isDragging.current = false;
          blockClickRef.current = false;
        }, 300);
        return;
      }

      isDragging.current = false;
    },
    [animateToPhysicalIndex, findNearestPhysicalIndex, setInteracting, x],
  );

  const handleCardClickCapture = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (isDragging.current || blockClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const blockTouchScrollWhileDragging = (event: TouchEvent) => {
      if (
        activePointerId.current !== null &&
        (isDragging.current || touchHorizontalIntent.current)
      ) {
        event.preventDefault();
      }
    };

    carousel.addEventListener("touchmove", blockTouchScrollWhileDragging, { passive: false });
    return () => carousel.removeEventListener("touchmove", blockTouchScrollWhileDragging);
  }, []);

  const goPrev = useCallback(() => {
    setAutoScrollEnabled(false);
    const current = syncToRebasedIndex();
    animateToPhysicalIndex(current - 1, CAROUSEL_SLIDE);
  }, [animateToPhysicalIndex, syncToRebasedIndex]);

  const goNext = useCallback(() => {
    setAutoScrollEnabled(false);
    const current = syncToRebasedIndex();
    animateToPhysicalIndex(current + 1, CAROUSEL_SLIDE);
  }, [animateToPhysicalIndex, syncToRebasedIndex]);

  const carouselStyle = {
    "--expert-card-width": `${cardWidth}px`,
  } as CSSProperties;

  return (
    <div
      ref={carouselRef}
      className={`${styles.expertCarousel} ${styles.expertCarouselViewport} relative mt-4 cursor-grab select-none active:cursor-grabbing`}
      style={carouselStyle}
      onPointerDownCapture={handlePointerDown}
      onPointerMoveCapture={handlePointerMove}
      onPointerUpCapture={handlePointerEnd}
      onPointerCancelCapture={handlePointerEnd}
    >
      <motion.div ref={trackRef} className={styles.expertTrack} style={{ x }}>
        {loopItems.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className={`${styles.expertCard} empower-expert-card`}
            onClickCapture={handleCardClickCapture}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes={empowerImageSizes.expert}
              className={styles.expertImage}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
            />
            <div className={styles.expertOverlay}>
              <h4 className={styles.expertTitle}>{item.title}</h4>
              <p className={styles.expertBody}>{item.body}</p>
            </div>
          </article>
        ))}
      </motion.div>

      {!isMobile ? (
        <div className={styles.expertCarouselControls} aria-hidden="false">
          <ExpertCarouselArrow direction="prev" onNavigate={goPrev} />
          <ExpertCarouselArrow direction="next" onNavigate={goNext} />
        </div>
      ) : null}
    </div>
  );
}
