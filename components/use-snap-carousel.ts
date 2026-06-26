"use client";

import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

export const CAROUSEL_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 42,
};

export const CAROUSEL_SMOOTH = {
  duration: 5.5,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/** Fixed-duration slide transition (e.g. hero arrows / autoplay). */
export const CAROUSEL_SLIDE = {
  duration: 0.5,
  ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
  fixed: true as const,
};

export const CAROUSEL_DRAG_RELEASE = {
  type: "spring" as const,
  stiffness: 320,
  damping: 36,
};

type CarouselTransition =
  | typeof CAROUSEL_SPRING
  | typeof CAROUSEL_SMOOTH
  | typeof CAROUSEL_SLIDE
  | typeof CAROUSEL_DRAG_RELEASE;

type SnapMetrics = {
  edgeCenterSnap: boolean;
  viewportWidth: number;
  cardCenters: number[];
  minX: number;
  offset: number;
  step: number;
  maxIndex: number;
};

function resolveTargetX(slideIndex: number, metrics: SnapMetrics): number {
  const { edgeCenterSnap, viewportWidth, cardCenters, minX, offset, step, maxIndex } = metrics;

  if (edgeCenterSnap) {
    if (slideIndex <= 0) {
      return 0;
    }
    if (slideIndex >= maxIndex) {
      return minX;
    }
    const cardCenter = cardCenters[slideIndex];
    if (cardCenter === undefined) {
      return 0;
    }
    const centered = viewportWidth / 2 - cardCenter;
    return Math.max(minX, Math.min(0, centered));
  }

  if (slideIndex >= maxIndex) {
    return minX;
  }

  const naive = offset - slideIndex * step;
  return Math.max(minX, Math.min(offset, naive));
}

function collapseRedundantMaxIndex(
  candidateMaxIndex: number,
  metrics: Omit<SnapMetrics, "maxIndex">,
): number {
  if (candidateMaxIndex <= 0) {
    return 0;
  }

  const endMetrics: SnapMetrics = { ...metrics, maxIndex: candidateMaxIndex };
  const endX = resolveTargetX(candidateMaxIndex, endMetrics);
  const epsilon = Math.max(2, metrics.step * 0.04);

  for (let i = 0; i < candidateMaxIndex; i += 1) {
    if (Math.abs(resolveTargetX(i, endMetrics) - endX) <= epsilon) {
      return i;
    }
  }

  return candidateMaxIndex;
}

function getBoundaryEpsilon(step: number): number {
  return Math.max(2, step * 0.04);
}

type SnapCarouselOptions = {
  itemCount: number;
  cardSelector: string;
  controlsSelector?: string;
  initialVisibleCards?: number;
  centerSingleSlide?: boolean;
  onInteraction?: () => void;
  /** Pixels before a mouse drag starts. Default 8. */
  dragThreshold?: number;
  /** Pixels before a touch drag starts. Default 2. */
  touchDragThreshold?: number;
  /** 0 = hard edge clamp; 0.35–0.45 = rubber-band overscroll. Default 0. */
  rubberBandFactor?: number;
  /** Touch release momentum multiplier. Default 0.18. */
  touchMomentumFactor?: number;
  /** Spring used when a drag ends. Default CAROUSEL_SPRING. */
  dragReleaseTransition?: typeof CAROUSEL_SPRING | typeof CAROUSEL_DRAG_RELEASE;
};

function clampDragOffset(
  value: number,
  min: number,
  max: number,
  rubberBandFactor: number,
): number {
  if (rubberBandFactor <= 0) {
    return Math.max(min, Math.min(max, value));
  }

  if (value < min) {
    return min - (min - value) * rubberBandFactor;
  }

  if (value > max) {
    return max + (value - max) * rubberBandFactor;
  }

  return value;
}

export function useSnapCarousel({
  itemCount,
  cardSelector,
  controlsSelector = "button",
  initialVisibleCards = 1,
  centerSingleSlide = false,
  onInteraction,
  dragThreshold = 8,
  touchDragThreshold = 2,
  rubberBandFactor = 0,
  touchMomentumFactor = 0.18,
  dragReleaseTransition = CAROUSEL_SPRING,
}: SnapCarouselOptions) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const animationGenerationRef = useRef(0);
  const indexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const stepRef = useRef(0);
  const alignOffsetRef = useRef(0);
  const minXRef = useRef(0);
  const maxIndexRef = useRef(0);
  const viewportWidthRef = useRef(0);
  const cardCentersRef = useRef<number[]>([]);
  const edgeCenterSnapRef = useRef(false);
  const isDragging = useRef(false);
  const blockClickRef = useRef(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const pointerStartOffset = useRef(0);
  const activePointerId = useRef<number | null>(null);
  const prevStepRef = useRef(0);
  const prevAlignOffsetRef = useRef(0);
  const prevEdgeCenterSnapRef = useRef(false);
  const measureRafRef = useRef<number | null>(null);
  const pointerMovedRef = useRef(false);
  const lastTapAtRef = useRef(0);
  const touchHorizontalIntent = useRef(false);
  const activePointerType = useRef<string | null>(null);
  const velocityXRef = useRef(0);
  const lastPointerSample = useRef({ x: 0, t: 0 });

  const isHorizontalDragIntent = useCallback(
    (deltaX: number, deltaY: number, pointerType: string) => {
      if (pointerType === "touch") {
        return (
          Math.abs(deltaX) > touchDragThreshold &&
          Math.abs(deltaX) >= Math.abs(deltaY) * 0.35
        );
      }

      return (
        Math.abs(deltaX) >= dragThreshold &&
        Math.abs(deltaX) >= Math.abs(deltaY) * 0.5
      );
    },
    [dragThreshold, touchDragThreshold],
  );

  const DOUBLE_TAP_MS = 350;

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [alignOffset, setAlignOffset] = useState(0);
  const [visibleCards, setVisibleCards] = useState(initialVisibleCards);
  const [maxIndex, setMaxIndex] = useState(0);
  const [positionAtStart, setPositionAtStart] = useState(true);
  const [positionAtEnd, setPositionAtEnd] = useState(false);

  stepRef.current = step;
  alignOffsetRef.current = alignOffset;

  const getSnapMetrics = useCallback((): SnapMetrics => {
    return {
      edgeCenterSnap: edgeCenterSnapRef.current,
      viewportWidth: viewportWidthRef.current,
      cardCenters: cardCentersRef.current,
      minX: minXRef.current,
      offset: alignOffsetRef.current,
      step: stepRef.current,
      maxIndex: maxIndexRef.current,
    };
  }, []);

  const getTargetX = useCallback(
    (slideIndex: number) => resolveTargetX(slideIndex, getSnapMetrics()),
    [getSnapMetrics],
  );

  const syncPositionBounds = useCallback(() => {
    if (stepRef.current <= 0 && !edgeCenterSnapRef.current) {
      setPositionAtStart(true);
      setPositionAtEnd(maxIndexRef.current <= 0);
      return;
    }

    const epsilon = getBoundaryEpsilon(stepRef.current);
    const minBound = getTargetX(maxIndexRef.current);
    const maxBound = getTargetX(0);
    const currentX = x.get();
    setPositionAtStart(currentX >= maxBound - epsilon);
    setPositionAtEnd(currentX <= minBound + epsilon);
  }, [getTargetX, x]);

  useMotionValueEvent(x, "change", syncPositionBounds);

  useEffect(() => {
    syncPositionBounds();
  }, [index, maxIndex, syncPositionBounds]);

  const findNearestIndex = useCallback(
    (projectedX: number) => {
      const limit = maxIndexRef.current;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (let slideIndex = 0; slideIndex <= limit; slideIndex += 1) {
        const distance = Math.abs(projectedX - getTargetX(slideIndex));
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = slideIndex;
        }
      }

      return nearestIndex;
    },
    [getTargetX],
  );

  const cancelAnimation = useCallback(() => {
    animationGenerationRef.current += 1;
    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  const animateToIndex = useCallback(
    (
      nextIndex: number,
      transition: CarouselTransition = CAROUSEL_SPRING,
      velocity = 0,
    ) => {
      const currentStep = stepRef.current;
      const currentMax = maxIndexRef.current;
      const clamped = Math.max(0, Math.min(currentMax, nextIndex));

      indexRef.current = clamped;
      targetIndexRef.current = clamped;
      setIndex(clamped);

      if (currentStep <= 0 && !edgeCenterSnapRef.current) {
        return;
      }

      const targetX = getTargetX(clamped);

      if (Math.abs(x.get() - targetX) < 0.5) {
        return;
      }

      const resolvedTransition =
        "duration" in transition
          ? "fixed" in transition && transition.fixed
            ? { duration: transition.duration, ease: transition.ease }
            : {
                duration: Math.max(
                  0.75,
                  (Math.abs(targetX - x.get()) / Math.max(currentStep, 1)) * transition.duration,
                ),
                ease: transition.ease,
              }
          : transition;

      const generation = animationGenerationRef.current + 1;
      animationGenerationRef.current = generation;
      animationRef.current?.stop();

      const motionTransition =
        "type" in resolvedTransition
          ? { ...resolvedTransition, velocity }
          : resolvedTransition;

      animationRef.current = animate(x, targetX, {
        ...motionTransition,
        onComplete: () => {
          if (generation !== animationGenerationRef.current) {
            return;
          }
          animationRef.current = null;
        },
      });
    },
    [getTargetX, x],
  );

  const measure = useCallback(() => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) {
      return;
    }

    const cards = track.querySelectorAll<HTMLElement>(cardSelector);
    const firstCard = cards[0];
    if (!firstCard || firstCard.offsetWidth <= 0) {
      return;
    }

    const styles = window.getComputedStyle(track);
    let gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;

    if (gap <= 0 && cards.length > 1) {
      gap = cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth;
    }

    if (gap < 0) {
      gap = 0;
    }

    const cardWidth = firstCard.offsetWidth;
    const cardStep = cardWidth + gap;
    const carouselStyles = window.getComputedStyle(carousel);
    let viewportWidth =
      carousel.clientWidth -
      (Number.parseFloat(carouselStyles.paddingLeft) || 0) -
      (Number.parseFloat(carouselStyles.paddingRight) || 0);

    if (viewportWidth <= 0) {
      viewportWidth = carousel.clientWidth;
    }

    const cardsVisible = Math.max(1, Math.floor((viewportWidth + gap) / cardStep));
    const useEdgeCenterSnap = centerSingleSlide && cardsVisible <= 1;

    viewportWidthRef.current = viewportWidth;
    edgeCenterSnapRef.current = useEdgeCenterSnap;
    carousel.classList.toggle("is-center-snap", useEdgeCenterSnap);
    track.style.removeProperty("--carousel-center-pad");

    const cardCenters = Array.from(cards).map(
      (card) => card.offsetLeft + card.offsetWidth / 2,
    );
    cardCentersRef.current = cardCenters;

    let offset = 0;
    let minX = 0;
    let computedMaxIndex = 0;

    const lastCard = cards[cards.length - 1];
    const trackPaddingRight = Number.parseFloat(styles.paddingRight) || 0;
    const trackWidth = lastCard
      ? lastCard.offsetLeft + lastCard.offsetWidth + trackPaddingRight
      : itemCount * cardWidth + Math.max(0, itemCount - 1) * gap;
    const endAlignedMinX = viewportWidth - trackWidth;

    if (useEdgeCenterSnap) {
      computedMaxIndex = Math.max(0, cards.length - 1);
      offset = 0;
      minX = endAlignedMinX;
    } else {
      minX = endAlignedMinX;
      const visibilityMaxIndex = Math.max(0, cards.length - cardsVisible);
      const stepMaxIndex =
        cardStep > 0 && minX < 0 ? Math.max(0, Math.ceil(-minX / cardStep)) : 0;
      computedMaxIndex = Math.min(
        cards.length - 1,
        Math.max(visibilityMaxIndex, stepMaxIndex),
      );
    }

    const snapMetricsBase: Omit<SnapMetrics, "maxIndex"> = {
      edgeCenterSnap: useEdgeCenterSnap,
      viewportWidth,
      cardCenters,
      minX,
      offset,
      step: cardStep,
    };
    computedMaxIndex = collapseRedundantMaxIndex(computedMaxIndex, snapMetricsBase);

    alignOffsetRef.current = offset;
    stepRef.current = cardStep;
    minXRef.current = minX;
    maxIndexRef.current = computedMaxIndex;
    viewportWidthRef.current = viewportWidth;
    cardCentersRef.current = cardCenters;
    edgeCenterSnapRef.current = useEdgeCenterSnap;

    if (isDragging.current) {
      return;
    }

    setAlignOffset(offset);
    setStep(cardStep);
    setVisibleCards(cardsVisible);
    setMaxIndex(computedMaxIndex);

    if (indexRef.current > computedMaxIndex) {
      indexRef.current = computedMaxIndex;
      targetIndexRef.current = computedMaxIndex;
      setIndex(computedMaxIndex);
    }

    if (!isDragging.current && !animationRef.current) {
      const syncX = resolveTargetX(targetIndexRef.current, {
        edgeCenterSnap: useEdgeCenterSnap,
        viewportWidth,
        cardCenters,
        minX,
        offset,
        step: cardStep,
        maxIndex: computedMaxIndex,
      });

      if (Math.abs(x.get() - syncX) > 0.5) {
        x.set(syncX);
      }
    }
  }, [cardSelector, centerSingleSlide, itemCount, x]);

  const scheduleMeasure = useCallback(() => {
    if (measureRafRef.current !== null) {
      window.cancelAnimationFrame(measureRafRef.current);
    }
    measureRafRef.current = window.requestAnimationFrame(() => {
      measureRafRef.current = null;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure);

    const carousel = carouselRef.current;
    const track = trackRef.current;
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            scheduleMeasure();
          })
        : null;

    if (carousel) {
      resizeObserver?.observe(carousel);
    }
    if (track) {
      resizeObserver?.observe(track);
    }

    return () => {
      window.removeEventListener("resize", scheduleMeasure);
      if (measureRafRef.current !== null) {
        window.cancelAnimationFrame(measureRafRef.current);
      }
      resizeObserver?.disconnect();
    };
  }, [scheduleMeasure]);

  useEffect(() => {
    if (indexRef.current > maxIndex) {
      animateToIndex(maxIndex, CAROUSEL_SPRING);
    }
  }, [maxIndex, animateToIndex]);

  useEffect(() => {
    if (step <= 0 && !edgeCenterSnapRef.current) {
      return;
    }

    const wasUnmeasured = prevStepRef.current <= 0 && !prevEdgeCenterSnapRef.current;
    const layoutChanged =
      prevStepRef.current !== step ||
      prevAlignOffsetRef.current !== alignOffset ||
      prevEdgeCenterSnapRef.current !== edgeCenterSnapRef.current;

    prevStepRef.current = step;
    prevAlignOffsetRef.current = alignOffset;
    prevEdgeCenterSnapRef.current = edgeCenterSnapRef.current;

    if (!wasUnmeasured && !layoutChanged) {
      return;
    }

    if (animationRef.current) {
      return;
    }

    const targetX = getTargetX(targetIndexRef.current);
    if (Math.abs(x.get() - targetX) < 0.5) {
      return;
    }

    if (wasUnmeasured && targetIndexRef.current > 0) {
      animateToIndex(targetIndexRef.current, CAROUSEL_SMOOTH);
      return;
    }

    x.set(targetX);
  }, [step, alignOffset, animateToIndex, getTargetX, x]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const blockTouchScrollWhileDragging = (event: TouchEvent) => {
      if (activePointerId.current === null) {
        return;
      }

      if (isDragging.current || touchHorizontalIntent.current) {
        event.preventDefault();
        return;
      }

      const touch = event.touches[0];
      if (
        touch &&
        pointerStartX.current !== null &&
        pointerStartY.current !== null
      ) {
        const deltaX = touch.clientX - pointerStartX.current;
        const deltaY = touch.clientY - pointerStartY.current;

        if (
          Math.abs(deltaX) > touchDragThreshold &&
          Math.abs(deltaX) >= Math.abs(deltaY) * 0.35
        ) {
          touchHorizontalIntent.current = true;
          event.preventDefault();
        }
      }
    };

    carousel.addEventListener("touchmove", blockTouchScrollWhileDragging, { passive: false });
    return () => carousel.removeEventListener("touchmove", blockTouchScrollWhileDragging);
  }, [touchDragThreshold]);

  const setCarouselInteracting = useCallback((active: boolean) => {
    carouselRef.current?.classList.toggle("is-carousel-interacting", active);
  }, []);

  const handleNavigation = useCallback(
    (direction: number) => {
      onInteraction?.();
      const next = Math.max(0, Math.min(maxIndexRef.current, targetIndexRef.current + direction));
      if (next === targetIndexRef.current) {
        return;
      }
      animateToIndex(next, CAROUSEL_SMOOTH);
    },
    [animateToIndex, onInteraction],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        maxIndexRef.current <= 0 ||
        (stepRef.current <= 0 && !edgeCenterSnapRef.current) ||
        (event.target as HTMLElement).closest(controlsSelector)
      ) {
        return;
      }

      onInteraction?.();
      cancelAnimation();
      isDragging.current = false;
      blockClickRef.current = false;
      pointerMovedRef.current = false;
      touchHorizontalIntent.current = false;
      activePointerType.current = event.pointerType;
      velocityXRef.current = 0;
      lastPointerSample.current = { x: event.clientX, t: performance.now() };
      pointerStartX.current = event.clientX;
      pointerStartY.current = event.clientY;
      pointerStartOffset.current = x.get();
      activePointerId.current = event.pointerId;
      setCarouselInteracting(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [cancelAnimation, controlsSelector, onInteraction, setCarouselInteracting, x],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        activePointerId.current !== event.pointerId ||
        pointerStartX.current === null ||
        pointerStartY.current === null ||
        (stepRef.current <= 0 && !edgeCenterSnapRef.current)
      ) {
        return;
      }

      const deltaX = event.clientX - pointerStartX.current;
      const deltaY = event.clientY - pointerStartY.current;
      const moveThreshold =
        event.pointerType === "touch" ? touchDragThreshold : dragThreshold;

      if (Math.abs(deltaX) >= moveThreshold || Math.abs(deltaY) >= moveThreshold) {
        pointerMovedRef.current = true;
      }

      if (!isDragging.current) {
        if (isHorizontalDragIntent(deltaX, deltaY, event.pointerType)) {
          isDragging.current = true;
          if (event.pointerType === "touch") {
            touchHorizontalIntent.current = true;
          }
        } else if (
          event.pointerType === "touch" &&
          Math.abs(deltaY) > touchDragThreshold * 2 &&
          Math.abs(deltaY) > Math.abs(deltaX) * 1.25
        ) {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          activePointerId.current = null;
          activePointerType.current = null;
          pointerStartX.current = null;
          pointerStartY.current = null;
          touchHorizontalIntent.current = false;
          setCarouselInteracting(false);
          return;
        } else {
          return;
        }
      }

      const now = performance.now();
      const lastSample = lastPointerSample.current;
      const elapsed = now - lastSample.t;
      if (elapsed > 0 && elapsed < 80) {
        velocityXRef.current = ((event.clientX - lastSample.x) / elapsed) * 1000;
      }
      lastPointerSample.current = { x: event.clientX, t: now };

      event.preventDefault();

      const minBound = getTargetX(maxIndexRef.current);
      const maxBound = getTargetX(0);
      const nextX = clampDragOffset(
        pointerStartOffset.current + deltaX,
        minBound,
        maxBound,
        rubberBandFactor,
      );
      x.set(nextX);
    },
    [
      dragThreshold,
      getTargetX,
      isHorizontalDragIntent,
      rubberBandFactor,
      setCarouselInteracting,
      touchDragThreshold,
      x,
    ],
  );

  const finishPointerDrag = useCallback(
    (event?: ReactPointerEvent<HTMLDivElement>) => {
      const tapX = pointerStartX.current;
      const wasDragging = isDragging.current;
      const moved = pointerMovedRef.current || wasDragging;

      const releaseVelocity = velocityXRef.current;
      const wasTouch = activePointerType.current === "touch";

      activePointerId.current = null;
      activePointerType.current = null;
      pointerStartX.current = null;
      pointerStartY.current = null;
      touchHorizontalIntent.current = false;
      velocityXRef.current = 0;
      lastPointerSample.current = { x: 0, t: 0 };
      setCarouselInteracting(false);

      if (moved) {
        lastTapAtRef.current = 0;
      }

      if (!wasDragging && !moved && tapX !== null && stepRef.current > 0) {
        const now = Date.now();
        if (
          lastTapAtRef.current > 0 &&
          now - lastTapAtRef.current < DOUBLE_TAP_MS
        ) {
          onInteraction?.();
          const carousel = carouselRef.current;
          const centerX = carousel
            ? carousel.getBoundingClientRect().left + carousel.clientWidth / 2
            : tapX;
          const direction = tapX >= centerX ? 1 : -1;
          const next = Math.max(
            0,
            Math.min(maxIndexRef.current, targetIndexRef.current + direction),
          );
          if (next !== targetIndexRef.current) {
            animateToIndex(next, CAROUSEL_SMOOTH);
          }
          lastTapAtRef.current = 0;
          blockClickRef.current = true;
          event?.preventDefault();
          window.setTimeout(() => {
            blockClickRef.current = false;
          }, 300);
        } else {
          lastTapAtRef.current = now;
        }
      }

      if (!wasDragging || (stepRef.current <= 0 && !edgeCenterSnapRef.current)) {
        isDragging.current = false;
        return;
      }

      const offsetX = x.get();
      const momentumOffset = wasTouch
        ? releaseVelocity * touchMomentumFactor
        : releaseVelocity * 0.1;
      const projectedX = offsetX + momentumOffset;
      const limit = maxIndexRef.current;
      const minBound = getTargetX(limit);
      const maxBound = getTargetX(0);
      let nextIndex = findNearestIndex(projectedX);
      const epsilon = getBoundaryEpsilon(stepRef.current);

      if (projectedX <= minBound + epsilon) {
        nextIndex = limit;
      } else if (projectedX >= maxBound - epsilon) {
        nextIndex = 0;
      }

      animateToIndex(nextIndex, dragReleaseTransition, wasTouch ? releaseVelocity : 0);

      blockClickRef.current = true;
      window.setTimeout(() => {
        isDragging.current = false;
        blockClickRef.current = false;
      }, 300);
    },
    [
      animateToIndex,
      dragReleaseTransition,
      findNearestIndex,
      getTargetX,
      onInteraction,
      setCarouselInteracting,
      touchMomentumFactor,
      x,
    ],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (activePointerId.current !== event.pointerId) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      finishPointerDrag(event);
    },
    [finishPointerDrag],
  );

  const handleCardClickCapture = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (isDragging.current || blockClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  return {
    carouselRef,
    trackRef,
    x,
    index,
    indexRef,
    maxIndex,
    step,
    isAtStart: index <= 0 || positionAtStart,
    isAtEnd: maxIndex <= 0 || index >= maxIndex || positionAtEnd,
    measure,
    handleNavigation,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleCardClickCapture,
    animateToIndex,
  };
}
