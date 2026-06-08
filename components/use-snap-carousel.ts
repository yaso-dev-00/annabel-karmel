"use client";

import { animate, useMotionValue } from "framer-motion";
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

  const naive = offset - slideIndex * step;
  return Math.max(minX, Math.min(offset, naive));
}

type SnapCarouselOptions = {
  itemCount: number;
  cardSelector: string;
  controlsSelector?: string;
  initialVisibleCards?: number;
  centerSingleSlide?: boolean;
  onInteraction?: () => void;
};

export function useSnapCarousel({
  itemCount,
  cardSelector,
  controlsSelector = "button",
  initialVisibleCards = 1,
  centerSingleSlide = false,
  onInteraction,
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
          Math.abs(deltaX) > TOUCH_DRAG_THRESHOLD &&
          Math.abs(deltaX) >= Math.abs(deltaY) * 0.4
        );
      }

      return Math.abs(deltaX) >= DRAG_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY);
    },
    [],
  );

  const DRAG_THRESHOLD = 8;
  const TOUCH_DRAG_THRESHOLD = 2;
  const DOUBLE_TAP_MS = 350;

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [alignOffset, setAlignOffset] = useState(0);
  const [visibleCards, setVisibleCards] = useState(initialVisibleCards);
  const [maxIndex, setMaxIndex] = useState(0);

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
      transition: typeof CAROUSEL_SPRING | typeof CAROUSEL_SMOOTH = CAROUSEL_SPRING,
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
          ? {
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
    const trackWidth = lastCard
      ? lastCard.offsetLeft + lastCard.offsetWidth
      : itemCount * cardWidth + Math.max(0, itemCount - 1) * gap;
    const endAlignedMinX = viewportWidth - trackWidth;

    if (useEdgeCenterSnap) {
      computedMaxIndex = Math.max(0, cards.length - 1);
      offset = 0;
      minX = endAlignedMinX;
    } else {
      minX = endAlignedMinX;
      computedMaxIndex =
        cardStep > 0 && minX < 0
          ? Math.max(0, Math.ceil(-minX / cardStep))
          : 0;
    }

    alignOffsetRef.current = offset;
    stepRef.current = cardStep;
    minXRef.current = minX;
    maxIndexRef.current = computedMaxIndex;
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
        event.pointerType === "touch" ? TOUCH_DRAG_THRESHOLD : DRAG_THRESHOLD;

      if (Math.abs(deltaX) >= moveThreshold || Math.abs(deltaY) >= moveThreshold) {
        pointerMovedRef.current = true;
      }

      if (!isDragging.current) {
        if (!isHorizontalDragIntent(deltaX, deltaY, event.pointerType)) {
          return;
        }
        isDragging.current = true;
        if (event.pointerType === "touch") {
          touchHorizontalIntent.current = true;
        }
      }

      const now = performance.now();
      const lastSample = lastPointerSample.current;
      const elapsed = now - lastSample.t;
      if (elapsed > 0 && elapsed < 80) {
        velocityXRef.current = ((event.clientX - lastSample.x) / elapsed) * 1000;
      }
      lastPointerSample.current = { x: event.clientX, t: now };

      if (event.pointerType === "touch") {
        event.preventDefault();
      }

      const minBound = getTargetX(maxIndexRef.current);
      const maxBound = getTargetX(0);
      x.set(Math.max(minBound, Math.min(maxBound, pointerStartOffset.current + deltaX)));
    },
    [getTargetX, isHorizontalDragIntent, x],
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
      const momentumOffset = wasTouch ? releaseVelocity * 0.18 : 0;
      const projectedX = offsetX + momentumOffset;
      const nextIndex = findNearestIndex(projectedX);
      animateToIndex(nextIndex, CAROUSEL_SPRING, wasTouch ? releaseVelocity : 0);

      blockClickRef.current = true;
      window.setTimeout(() => {
        isDragging.current = false;
        blockClickRef.current = false;
      }, 300);
    },
    [animateToIndex, findNearestIndex, onInteraction, setCarouselInteracting, x],
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
    measure,
    handleNavigation,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleCardClickCapture,
    animateToIndex,
  };
}
