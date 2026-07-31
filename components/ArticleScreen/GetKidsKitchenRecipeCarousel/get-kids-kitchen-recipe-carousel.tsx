'use client';

import { useEffect, useRef, useState } from 'react';

export type KidsKitchenRecipeItem = {
  title: string;
  href: string;
  image: string;
  appExclusive?: boolean;
};

type GetKidsKitchenRecipeCarouselProps = {
  items: KidsKitchenRecipeItem[];
};

function perViewFromWidth(width: number) {
  if (width < 700) return 1;
  if (width < 900) return 2;
  return 5;
}

export function GetKidsKitchenRecipeCarousel({
  items,
}: GetKidsKitchenRecipeCarouselProps) {
  const [perView, setPerView] = useState(() =>
    typeof window === 'undefined' ? 5 : perViewFromWidth(window.innerWidth),
  );
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const isDragging = useRef(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setPerView(perViewFromWidth(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, items.length - perView);
  const canCycle = maxIndex > 0;
  const displayIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const updateStep = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.querySelector<HTMLElement>('.kids-kitchen-card');
      if (!firstCard) return;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
      setStep(firstCard.offsetWidth + gap);
    };

    updateStep();
    window.addEventListener('resize', updateStep);
    return () => window.removeEventListener('resize', updateStep);
  }, [perView, items.length]);

  const goPrev = () => {
    setIndex((p) => {
      if (!canCycle) return 0;
      return p === 0 ? maxIndex : p - 1;
    });
  };
  const goNext = () => {
    setIndex((p) => {
      if (!canCycle) return 0;
      return p === maxIndex ? 0 : p + 1;
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

    if (pointerStartX.current === null || pointerCurrentX.current === null)
      return;

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
    <div className="relative left-1/2 right-1/2 mt-[60px] -ml-[50vw] -mr-[50vw] w-screen px-[8px] md:px-[14px]">
      <div
        className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-[18px] transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${displayIndex * step}px)` }}
        >
          {items.map((recipe) => (
            <section
              key={recipe.title}
              className="kids-kitchen-card shrink-0 overflow-hidden rounded-[14px] bg-white pb-[14px] shadow-[0_8px_24px_rgba(58,58,58,0.08)]"
              style={{
                width: `calc((100% - ${(perView - 1) * 18}px) / ${perView})`,
              }}
              onClickCapture={onCardClickCapture}
            >
              <a href={recipe.href} target="_blank" rel="noopener">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="block aspect-4/3 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  draggable={false}
                />
              </a>
              <div className="min-h-[70px] px-[14px] pt-[12px] text-center">
                <h3
                  className="m-0 text-[20px] leading-[1.32] font-semibold text-[#3a3a3a]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <a
                    href={recipe.href}
                    target="_blank"
                    rel="noopener"
                    className="text-inherit no-underline hover:text-(--hover-color)"
                  >
                    {recipe.title}
                  </a>
                </h3>
              </div>
            </section>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous recipes"
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_8px_20px_rgba(179,71,105,0.22)] transition hover:bg-[#ffe8ef] hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canCycle}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden>
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
        onClick={goNext}
        className="absolute right-3 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#efcfd8] bg-[#fff4f7] text-[#b34769] shadow-[0_8px_20px_rgba(179,71,105,0.22)] transition hover:bg-[#ffe8ef] hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canCycle}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden>
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

      <div className="mt-2 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            aria-label={`Go to recipes page ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-[6px] w-[6px] rounded-full transition-colors ${i === displayIndex ? 'bg-[#222]' : 'bg-[#c7c7c7]'}`}
          />
        ))}
      </div>
    </div>
  );
}
