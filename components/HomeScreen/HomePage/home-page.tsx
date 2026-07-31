'use client';
import Link from 'next/link';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { SearchIcon } from '@/components/UiPrimitives/SearchIcon';
import {
  useSnapCarousel,
  CAROUSEL_SMOOTH,
} from '@/components/hooks/useSnapCarousel';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { recipeFinderSlugs } from '@/data/recipe-taxonomies';
import {
  recipeFinderAgeOptions,
  recipeFinderFreeFromOptions,
  recipeFinderMealTimeOptions,
} from '@/data/recipe-finder-options';
import { resolveHomePageContent } from '@/lib/homepage/resolve-home-page-content';
import type { HomepageSectionType } from '@/lib/homepage/types';
import { buildRecipeListingUrl } from '@/lib/recipe-search-url';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { logoUrl, type CollabCard } from '@/data/site-content';
import styles from './home-page.module.css';

const heroThemeByIndex = [
  { panelColor: '#E9C6CE', buttonColor: '#b34769' },
  { panelColor: '#F4F2E8', buttonColor: '#8f887a' },
  { panelColor: '#DBEEF2', buttonColor: '#6f9fb2' },
];

const HERO_SWIPE_THRESHOLD = 40;

function RecipeAppBulletIcon() {
  return (
    <span className={styles.recipeAppBulletIcon} aria-hidden>
      <svg
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5.5L5 9.5L13 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/*
const heroImageVariants = {
  enter: { opacity: 0, scale: 1.06 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

const heroCopyContainer = {
  enter: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  center: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const heroCopyItem = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -16 : 16,
    transition: { duration: 0.28, ease: "easeIn" as const },
  }),
};
*/

export type HomePageContentProps = {
  previewMode?: boolean;
  document?: import('@/lib/homepage/types').HomepageDocument | null;
};

export function HomePageContent({
  previewMode = false,
  document = null,
}: HomePageContentProps = {}) {
  const router = useRouter();
  const content = useMemo(() => resolveHomePageContent(document), [document]);
  const fullBleedClass = previewMode
    ? 'relative w-full'
    : 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen';
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openFinderMenu, setOpenFinderMenu] = useState<string | null>(null);
  const [recipeAutoScrollEnabled, setRecipeAutoScrollEnabled] = useState(true);
  const [finderSelections, setFinderSelections] = useState<
    Record<string, string[]>
  >({
    age: [],
    mealTime: [],
    freeFrom: [],
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState('');
  const [desktopQuery, setDesktopQuery] = useState('');
  const [mobileFinderSelections, setMobileFinderSelections] = useState<
    Record<string, string[]>
  >({
    age: [],
    mealTime: [],
    freeFrom: [],
  });
  const [openMobileFinderMenu, setOpenMobileFinderMenu] = useState<
    string | null
  >(null);
  const finderRef = useRef<HTMLFormElement | null>(null);
  const mobileModalRef = useRef<HTMLFormElement | null>(null);
  const collabTrackRef = useRef<HTMLDivElement | null>(null);
  const collabLoopWidthRef = useRef(0);
  const collabX = useMotionValue(0);
  const partnerTrackRef = useRef<HTMLDivElement | null>(null);
  const partnerLoopWidthRef = useRef(0);
  const partnerX = useMotionValue(0);
  const awardMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const awardLoopWidthRef = useRef(0);
  const awardX = useMotionValue(0);
  const [partnerAutoScrollEnabled, setPartnerAutoScrollEnabled] =
    useState(true);
  const [awardMarqueeAutoScrollEnabled, setAwardMarqueeAutoScrollEnabled] =
    useState(true);
  const [heroAutoScrollEnabled, setHeroAutoScrollEnabled] = useState(true);
  const heroPointerStartX = useRef<number | null>(null);
  const heroPointerStartY = useRef<number | null>(null);
  const heroActivePointerId = useRef<number | null>(null);

  const {
    carouselRef,
    trackRef,
    x,
    index,
    indexRef,
    maxIndex,
    measure,
    handleNavigation,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleCardClickCapture,
    animateToIndex,
  } = useSnapCarousel({
    itemCount: content.latestRecipes.recipes.length,
    cardSelector: '.latest-recipe-card',
    controlsSelector: '.latest-carousel-controls, button',
    initialVisibleCards: 1,
    onInteraction: () => setRecipeAutoScrollEnabled(false),
  });

  const {
    carouselRef: cookbookCarouselRef,
    trackRef: cookbookTrackRef,
    x: cookbookX,
    index: cookbookIndex,
    maxIndex: cookbookMaxIndex,
    measure: cookbookMeasure,
    handleNavigation: cookbookHandleNavigation,
    handlePointerDown: cookbookHandlePointerDown,
    handlePointerMove: cookbookHandlePointerMove,
    handlePointerEnd: cookbookHandlePointerEnd,
    handleCardClickCapture: cookbookHandleCardClickCapture,
  } = useSnapCarousel({
    itemCount: content.cookbooks.books.length,
    cardSelector: '.cookbook-card',
    controlsSelector: '.cookbook-carousel-controls, button',
    initialVisibleCards: 1,
  });

  const current = useMemo(
    () => content.heroSlides[activeSlide],
    [activeSlide, content.heroSlides],
  );
  const theme = heroThemeByIndex[activeSlide % heroThemeByIndex.length];
  const repeatedCollabCards = useMemo(
    () => [
      ...content.collabs.cards,
      ...content.collabs.cards,
      ...content.collabs.cards,
    ],
    [content.collabs.cards],
  );
  const repeatedPartnerLogos = useMemo(
    () => [
      ...content.partners.logos,
      ...content.partners.logos,
      ...content.partners.logos,
    ],
    [content.partners.logos],
  );
  const repeatedAwardLogos = useMemo(
    () => [
      ...content.expertRanges.awardLogos,
      ...content.expertRanges.awardLogos,
      ...content.expertRanges.awardLogos,
    ],
    [content.expertRanges.awardLogos],
  );

  const moveSlide = (step: number) => {
    setDirection(step);
    setActiveSlide(
      (prev) =>
        (prev + step + content.heroSlides.length) % content.heroSlides.length,
    );
  };

  const pauseHeroAutoScroll = () => {
    setHeroAutoScrollEnabled(false);
    window.setTimeout(() => setHeroAutoScrollEnabled(true), 8000);
  };

  const handleHeroPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('.hero-nav-buttons, .hero-copy-content a')) {
      return;
    }

    heroPointerStartX.current = event.clientX;
    heroPointerStartY.current = event.clientY;
    heroActivePointerId.current = event.pointerId;
    setHeroAutoScrollEnabled(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleHeroPointerEnd = (event: ReactPointerEvent<HTMLElement>) => {
    if (heroActivePointerId.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const startX = heroPointerStartX.current;
    const startY = heroPointerStartY.current;
    heroActivePointerId.current = null;
    heroPointerStartX.current = null;
    heroPointerStartY.current = null;

    if (startX === null || startY === null) {
      window.setTimeout(() => setHeroAutoScrollEnabled(true), 8000);
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (
      Math.abs(deltaX) > HERO_SWIPE_THRESHOLD &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      moveSlide(deltaX > 0 ? -1 : 1);
    }

    window.setTimeout(() => setHeroAutoScrollEnabled(true), 8000);
  };

  const handleRecipeNavigation = (step: number) => {
    handleNavigation(step);
  };

  const handleCookbookNavigation = (step: number) => {
    cookbookHandleNavigation(step);
  };

  useEffect(() => {
    if (!heroAutoScrollEnabled) {
      return;
    }

    const timer = setInterval(() => moveSlide(1), 5500);
    return () => clearInterval(timer);
  }, [heroAutoScrollEnabled]);

  useEffect(() => {
    const updateCollabMetrics = () => {
      const track = collabTrackRef.current;
      if (!track) return;

      const loopWidth = track.scrollWidth / 3;
      if (!Number.isFinite(loopWidth) || loopWidth <= 0) {
        return;
      }

      collabLoopWidthRef.current = loopWidth;
      // Start in the middle copy so we can wrap both directions.
      collabX.set(-loopWidth);
    };

    const raf = window.requestAnimationFrame(updateCollabMetrics);
    window.addEventListener('resize', updateCollabMetrics);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateCollabMetrics);
    };
  }, [collabX]);

  useMotionValueEvent(collabX, 'change', (latest) => {
    const loopWidth = collabLoopWidthRef.current;
    if (!loopWidth) {
      return;
    }

    if (latest <= -loopWidth * 2) {
      collabX.set(latest + loopWidth);
    } else if (latest >= 0) {
      collabX.set(latest - loopWidth);
    }
  });

  useEffect(() => {
    const updatePartnerMetrics = () => {
      const track = partnerTrackRef.current;
      if (!track) return;

      const loopWidth = track.scrollWidth / 3;
      if (!Number.isFinite(loopWidth) || loopWidth <= 0) return;

      partnerLoopWidthRef.current = loopWidth;
      partnerX.set(-loopWidth);
    };

    const raf = window.requestAnimationFrame(updatePartnerMetrics);
    window.addEventListener('resize', updatePartnerMetrics);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', updatePartnerMetrics);
    };
  }, [partnerX]);

  useMotionValueEvent(partnerX, 'change', (latest) => {
    const loopWidth = partnerLoopWidthRef.current;
    if (!loopWidth) return;

    if (latest <= -loopWidth * 2) {
      partnerX.set(latest + loopWidth);
    } else if (latest >= 0) {
      partnerX.set(latest - loopWidth);
    }
  });

  useEffect(() => {
    const updateAwardMetrics = () => {
      const track = awardMarqueeTrackRef.current;
      if (
        !track ||
        (typeof window !== 'undefined' && window.innerWidth >= 768)
      ) {
        awardLoopWidthRef.current = 0;
        return;
      }

      const loopWidth = track.scrollWidth / 3;
      if (!Number.isFinite(loopWidth) || loopWidth <= 0) {
        return;
      }

      awardLoopWidthRef.current = loopWidth;
      awardX.set(-loopWidth);
    };

    const raf = window.requestAnimationFrame(() => {
      updateAwardMetrics();
      window.requestAnimationFrame(updateAwardMetrics);
    });
    window.addEventListener('resize', updateAwardMetrics);

    const track = awardMarqueeTrackRef.current;
    const ro =
      typeof ResizeObserver !== 'undefined' && track
        ? new ResizeObserver(() => updateAwardMetrics())
        : null;
    if (ro && track) {
      ro.observe(track);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateAwardMetrics);
      ro?.disconnect();
    };
  }, [awardX]);

  useMotionValueEvent(awardX, 'change', (latest) => {
    const loopWidth = awardLoopWidthRef.current;
    if (!loopWidth) {
      return;
    }

    if (latest <= -loopWidth * 2) {
      awardX.set(latest + loopWidth);
    } else if (latest >= 0) {
      awardX.set(latest - loopWidth);
    }
  });

  useAnimationFrame((_, delta) => {
    if (partnerAutoScrollEnabled) {
      const loopWidth = partnerLoopWidthRef.current;
      if (loopWidth) {
        const speedPxPerSecond = 72;
        const movement = (speedPxPerSecond * delta) / 1000;
        partnerX.set(partnerX.get() - movement);
      }
    }

    const awardLoop = awardLoopWidthRef.current;
    if (
      awardMarqueeAutoScrollEnabled &&
      awardLoop &&
      typeof window !== 'undefined' &&
      window.innerWidth < 768
    ) {
      const speedPxPerSecond = 52;
      const movement = (speedPxPerSecond * delta) / 1000;
      awardX.set(awardX.get() - movement);
    }
  });

  useEffect(() => {
    if (maxIndex <= 0 || !recipeAutoScrollEnabled) {
      return;
    }

    const timer = setInterval(() => {
      const next = indexRef.current >= maxIndex ? 0 : indexRef.current + 1;
      animateToIndex(next, CAROUSEL_SMOOTH);
    }, 7000);

    return () => clearInterval(timer);
  }, [animateToIndex, maxIndex, recipeAutoScrollEnabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!finderRef.current) {
        return;
      }
      if (!finderRef.current.contains(event.target as Node)) {
        setOpenFinderMenu(null);
      }
    };

    globalThis.document.addEventListener('mousedown', handleClickOutside);
    return () =>
      globalThis.document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileFilterOpen) {
      return;
    }
    const previousOverflow = globalThis.document.body.style.overflow;
    globalThis.document.body.style.overflow = 'hidden';
    return () => {
      globalThis.document.body.style.overflow = previousOverflow;
    };
  }, [mobileFilterOpen]);

  useEffect(() => {
    if (!mobileFilterOpen || !openMobileFinderMenu) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.finder-modal-dropdown')) {
        return;
      }
      setOpenMobileFinderMenu(null);
    };

    globalThis.document.addEventListener('mousedown', handleClickOutside);
    return () =>
      globalThis.document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileFilterOpen, openMobileFinderMenu]);

  const finderPanels = {
    age: {
      heading: 'Select age',
      options: recipeFinderAgeOptions.map((option) => option.label),
    },
    mealTime: {
      heading: 'Select time',
      options: recipeFinderMealTimeOptions.map((option) => option.label),
    },
    freeFrom: {
      heading: 'Select type',
      options: recipeFinderFreeFromOptions.map((option) => option.label),
    },
  };

  const toggleSelection = (
    key: 'age' | 'mealTime' | 'freeFrom',
    option: string,
  ) => {
    setFinderSelections((prev) => {
      const exists = prev[key].includes(option);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((item) => item !== option)
          : [...prev[key], option],
      };
    });
  };

  const displaySelection = (
    key: 'age' | 'mealTime' | 'freeFrom',
    fallback: string,
  ) =>
    finderSelections[key].length > 0
      ? finderSelections[key].join(', ')
      : fallback;

  const handleFinderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (previewMode) {
      return;
    }
    const ageLabel = finderSelections.age[0];
    const mealLabel = finderSelections.mealTime[0];
    const freeLabel = finderSelections.freeFrom[0];

    router.push(
      buildRecipeListingUrl({
        age: ageLabel
          ? recipeFinderSlugs.age[
              ageLabel as keyof typeof recipeFinderSlugs.age
            ]
          : undefined,
        mealTime: mealLabel
          ? recipeFinderSlugs.mealTime[
              mealLabel as keyof typeof recipeFinderSlugs.mealTime
            ]
          : undefined,
        freeFrom: freeLabel
          ? recipeFinderSlugs.freeFrom[
              freeLabel as keyof typeof recipeFinderSlugs.freeFrom
            ]
          : undefined,
        q: desktopQuery.trim() || undefined,
      }),
    );
  };

  const toggleMobileSelection = (
    key: 'age' | 'mealTime' | 'freeFrom',
    option: string,
  ) => {
    setMobileFinderSelections((prev) => {
      const exists = prev[key].includes(option);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((item) => item !== option)
          : [...prev[key], option],
      };
    });
  };

  const displayMobileSelection = (
    key: 'age' | 'mealTime' | 'freeFrom',
    fallback: string,
  ) =>
    mobileFinderSelections[key].length > 0
      ? mobileFinderSelections[key].join(', ')
      : fallback;

  const handleMobileSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (previewMode) {
      return;
    }
    router.push(buildRecipeListingUrl({ q: mobileQuery }));
  };

  const handleMobileFilterSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (previewMode) {
      return;
    }
    setMobileFilterOpen(false);
    setOpenMobileFinderMenu(null);
    const ageLabel = mobileFinderSelections.age[0];
    const mealLabel = mobileFinderSelections.mealTime[0];
    const freeLabel = mobileFinderSelections.freeFrom[0];

    router.push(
      buildRecipeListingUrl({
        age: ageLabel
          ? recipeFinderSlugs.age[
              ageLabel as keyof typeof recipeFinderSlugs.age
            ]
          : undefined,
        mealTime: mealLabel
          ? recipeFinderSlugs.mealTime[
              mealLabel as keyof typeof recipeFinderSlugs.mealTime
            ]
          : undefined,
        freeFrom: freeLabel
          ? recipeFinderSlugs.freeFrom[
              freeLabel as keyof typeof recipeFinderSlugs.freeFrom
            ]
          : undefined,
        q: mobileQuery,
      }),
    );
  };

  const renderCollabArticle = (
    collab: CollabCard,
    reactKey: string,
    articleClassName: string,
  ) => (
    <article key={reactKey} className={articleClassName}>
      <div className="grid min-h-0 grid-cols-1 gap-4 md:min-h-[300px] md:grid-cols-[0.96fr_1.04fr] md:gap-4">
        <div className="flex min-w-0 flex-col gap-4 px-1 py-2 md:justify-between md:gap-0 md:px-1.5 md:py-3">
          {collab.logoImage ? (
            <img
              src={collab.logoImage}
              alt={`${collab.title} logo`}
              draggable={false}
              className={`self-start w-auto object-contain ${
                collab.title === 'Craft & Crumb'
                  ? 'h-18 md:h-24'
                  : 'h-20 md:h-26'
              }`}
            />
          ) : (
            <p className="max-w-[170px] [font-family:var(--font-montserrat)] text-[44px] leading-[0.84] font-extrabold uppercase tracking-[-0.03em] text-[#1e2126]">
              Craft &
              <br />
              Crumb
            </p>
          )}
          <div className="mt-5">
            <h4 className="[font-family:var(--font-playfair)] text-[24px] leading-[1.08] text-[#201a26] md:text-[25px] font-[500]">
              {collab.title}
            </h4>
            <p className="mt-2 [font-family:var(--font-montserrat)] text-[14px] leading-[1.34] text-[#27313b] md:text-[16px]">
              {collab.subtitle}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={collab.cardImage}
            alt={collab.title}
            draggable={false}
            className="h-full min-h-[260px] w-full object-cover md:min-h-[350px]"
          />
          <a
            href={collab.href}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 inline-flex items-center gap-3 rounded-[20px] bg-white px-3 py-2.5 [font-family:var(--font-montserrat)] text-[16px] font-medium text-[#6a8796] md:bottom-5 md:right-5 md:px-4 md:py-2 md:text-[16px]"
          >
            <span className="text-[16px] text-[#6a8796] hover:text-[#f78da7]">
              Discover
            </span>
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#74a6b6] text-white md:h-12 md:w-12"
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M5 12.9619H19"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 5.96191L19 12.9619L12 19.9619"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </article>
  );

  const heroSection = (
    <>
      <section className={`hero-showcase ${styles.heroShowcase}`}>
        <article
          className="hero-slider-shell"
          onPointerDown={handleHeroPointerDown}
          onPointerUp={handleHeroPointerEnd}
          onPointerCancel={handleHeroPointerEnd}
        >
          <div
            className="hero-copy-panel"
            style={{ backgroundColor: theme.panelColor }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`copy-${activeSlide}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
                className="hero-copy-content max-[1200px]:text-center max-[1200px]:items-center"
              >
                <h1>{current.title}</h1>
                <p>{current.subtitle}</p>
                <a
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: theme.buttonColor }}
                  className={`inline-flex items-center gap-2 rounded-[15px] px-6! py-5 text-base font-semibold text-white shadow-[0_6px_16px_rgba(183,71,114,0.24)] whitespace-nowrap transition-colors ${styles.ctaButton}`}
                >
                  <span
                    className={`${styles.ctaLabel} inline-block w-auto h-auto text-[20px] font-medium leading-none`}
                  >
                    {current.cta}
                  </span>
                  <span
                    className="inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[15px] bg-white"
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="41"
                      viewBox="0 0 42 41"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        width="41"
                        height="41"
                        rx="16"
                        fill="white"
                      />
                      <path
                        d="M13.5 20.5H27.5"
                        stroke={theme.buttonColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.5 13.5L27.5 20.5L20.5 27.5"
                        stroke={theme.buttonColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-image-panel">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={`image-${activeSlide}`}
                src={current.image}
                alt={current.title}
                className="hero-slide-image"
                width={2048}
                height={2560}
                decoding="async"
                fetchPriority={activeSlide === 0 ? 'high' : 'auto'}
                draggable={false}
                initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </AnimatePresence>

            <div className="hero-nav-buttons">
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => {
                  moveSlide(-1);
                  pauseHeroAutoScroll();
                }}
                aria-label="Previous slide"
                className="prev"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.5 5L8 11.5L14.5 18" />
                </svg>
              </button>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => {
                  moveSlide(1);
                  pauseHeroAutoScroll();
                }}
                aria-label="Next slide"
                className="next"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.5 5L16 11.5L9.5 18" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </section>

      {/*
      <section className={`hero-showcase ${styles.heroShowcase}`}>
        <article
          className="hero-slider-shell"
          onPointerDown={handleHeroPointerDown}
          onPointerUp={handleHeroPointerEnd}
          onPointerCancel={handleHeroPointerEnd}
        >
          <div className="hero-image-panel">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={`image-${activeSlide}`}
                src={current.image}
                alt={current.title}
                className="hero-slide-image"
                width={2048}
                height={2560}
                decoding="async"
                fetchPriority={activeSlide === 0 ? "high" : "auto"}
                draggable={false}
                custom={direction}
                variants={heroImageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </AnimatePresence>
          </div>

          <div className="hero-mobile-scrim" aria-hidden />

          <div className="hero-copy-panel">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`copy-${activeSlide}`}
                className="hero-copy-content"
                custom={direction}
                variants={heroCopyContainer}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.h1 variants={heroCopyItem} custom={direction}>
                  {current.title}
                </motion.h1>
                <motion.p variants={heroCopyItem} custom={direction}>
                  {current.subtitle}
                </motion.p>
                <motion.a
                  variants={heroCopyItem}
                  custom={direction}
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: theme.buttonColor }}
                  className={`inline-flex items-center gap-2 rounded-[15px] px-5! py-4 text-base font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.28)] whitespace-nowrap transition-colors md:px-6! md:py-5 ${styles.ctaButton}`}
                >
                  <span className={`${styles.ctaLabel} inline-block w-auto h-auto text-[18px] font-medium leading-none md:text-[20px]`}>
                    {current.cta}
                  </span>
                  <span className="inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[12px] bg-white md:h-[40px] md:w-[40px] md:rounded-[15px]" aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 41" fill="none" className="md:h-[42px] md:w-[42px]">
                      <rect x="0.5" width="41" height="41" rx="16" fill="white" />
                      <path d="M13.5 20.5H27.5" stroke={theme.buttonColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke={theme.buttonColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-dots" aria-label="Hero slides">
            {content.heroSlides.map((slide, slideIndex) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${slideIndex + 1}`}
                aria-current={slideIndex === activeSlide ? "true" : undefined}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => goToSlide(slideIndex)}
              />
            ))}
          </div>

          <div className="hero-nav-buttons">
            <button
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation();
                moveSlide(-1);
                pauseHeroAutoScroll();
              }}
              aria-label="Previous slide"
              className="prev"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 5L8 11.5L14.5 18" />
              </svg>
            </button>
            <button
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation();
                moveSlide(1);
                pauseHeroAutoScroll();
              }}
              aria-label="Next slide"
              className="next"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 5L16 11.5L9.5 18" />
              </svg>
            </button>
          </div>
        </article>
      </section>
      */}
    </>
  );

  const recipeFinderSection = (
    <section className="recipe-finder container py-4!">
      <form
        className="finder-row"
        ref={finderRef}
        onSubmit={handleFinderSubmit}
      >
        <label>
          <span className="finder-title  font-[900]!">Recipe</span>
          <input
            type="search"
            className="text-[18px]! text-[#afaeae]"
            placeholder="Search recipes"
            value={desktopQuery}
            onChange={(event) => setDesktopQuery(event.target.value)}
          />
        </label>
        <div
          className={`finder-dropdown ${openFinderMenu === 'age' ? 'open' : ''}`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFinderMenu((current) => (current === 'age' ? null : 'age'))
            }
          >
            <span className="finder-title font-[900]!">Age</span>
            <span className="finder-value text-[18px]!">
              {displaySelection('age', 'Select age')}
            </span>
          </button>
          {openFinderMenu === 'age' ? (
            <div className="finder-dropdown-panel">
              <p className="finder-dropdown-heading">
                {finderPanels.age.heading}
              </p>
              {finderPanels.age.options.map((option) => (
                <label key={option} className="text-[20px]!">
                  <span className="text-[20px]!">{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.age.includes(option)}
                    onChange={() => toggleSelection('age', option)}
                  />
                </label>
              ))}
            </div>
          ) : null}
        </div>
        <div
          className={`finder-dropdown ${openFinderMenu === 'mealTime' ? 'open' : ''}`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFinderMenu((current) =>
                current === 'mealTime' ? null : 'mealTime',
              )
            }
          >
            <span className="finder-title font-[900]!">Meal Time</span>
            <span className="finder-value text-[18px]!">
              {displaySelection('mealTime', 'Select time')}
            </span>
          </button>
          {openFinderMenu === 'mealTime' ? (
            <div className="finder-dropdown-panel">
              <p className="finder-dropdown-heading">
                {finderPanels.mealTime.heading}
              </p>
              {finderPanels.mealTime.options.map((option) => (
                <label key={option} className="text-[20px]!">
                  <span className="text-[20px]!">{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.mealTime.includes(option)}
                    onChange={() => toggleSelection('mealTime', option)}
                  />
                </label>
              ))}
            </div>
          ) : null}
        </div>
        <div
          className={`finder-dropdown ${openFinderMenu === 'freeFrom' ? 'open' : ''}`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenFinderMenu((current) =>
                current === 'freeFrom' ? null : 'freeFrom',
              )
            }
          >
            <span className="finder-title font-[900]!">Free From</span>
            <span className="finder-value text-[18px]!">
              {displaySelection('freeFrom', 'Select type')}
            </span>
          </button>
          {openFinderMenu === 'freeFrom' ? (
            <div className="finder-dropdown-panel">
              <p className="finder-dropdown-heading">
                {finderPanels.freeFrom.heading}
              </p>
              {finderPanels.freeFrom.options.map((option) => (
                <label key={option} className="text-[20px]!">
                  <span className="text-[20px]!">{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.freeFrom.includes(option)}
                    onChange={() => toggleSelection('freeFrom', option)}
                  />
                </label>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="finder-submit"
          aria-label="Search recipes"
        >
          <SearchIcon className="h-10 w-10 text-white" />
        </button>
      </form>

      <form className="finder-mobile-bar" onSubmit={handleMobileSearchSubmit}>
        <input
          type="search"
          placeholder="Search for recipe"
          value={mobileQuery}
          onChange={(event) => setMobileQuery(event.target.value)}
        />
        <button
          type="submit"
          className="finder-mobile-search"
          aria-label="Search recipes"
        >
          <SearchIcon className="finder-mobile-action-icon text-white" />
        </button>
        <button
          type="button"
          className="finder-mobile-filter"
          aria-label="Open search filters"
          onClick={() => {
            setOpenMobileFinderMenu(null);
            setMobileFilterOpen(true);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="finder-mobile-action-icon"
          >
            <path
              d="M4 5H20L14.5 12.2V18L9.5 20.5V12.2L4 5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      {mobileFilterOpen ? (
        <div
          className="finder-modal-root"
          role="dialog"
          aria-modal="true"
          aria-label="Search filters"
        >
          <div
            className="finder-modal-scrim"
            onClick={() => {
              setOpenMobileFinderMenu(null);
              setMobileFilterOpen(false);
            }}
          />
          <form
            className="finder-modal-panel"
            ref={mobileModalRef}
            onSubmit={handleMobileFilterSubmit}
          >
            <div className="finder-modal-header">
              <img
                src={logoUrl}
                alt="Annabel Karmel"
                className="finder-modal-logo"
              />
              <button
                type="button"
                className="finder-modal-close"
                aria-label="Close search filters"
                onClick={() => {
                  setOpenMobileFinderMenu(null);
                  setMobileFilterOpen(false);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 6L18 18"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 6L6 18"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="finder-modal-field">
              <span className="finder-modal-label">Recipe</span>
              <span className="finder-modal-input-wrap">
                <img
                  src="/icons/search-input-icon.png"
                  alt=""
                  aria-hidden
                  width={18}
                  height={18}
                />
                <input
                  type="search"
                  placeholder="Search by recipe name"
                  value={mobileQuery}
                  onChange={(event) => setMobileQuery(event.target.value)}
                />
              </span>
            </div>

            <div className="finder-modal-field">
              <span className="finder-modal-label">By Age</span>
              <div
                className={`finder-modal-dropdown ${openMobileFinderMenu === 'age' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="finder-modal-dropdown-trigger"
                  onClick={() =>
                    setOpenMobileFinderMenu((current) =>
                      current === 'age' ? null : 'age',
                    )
                  }
                >
                  <span
                    className={`finder-modal-dropdown-value ${mobileFinderSelections.age.length === 0 ? 'is-placeholder' : ''}`}
                  >
                    {displayMobileSelection('age', 'Select age')}
                  </span>
                  <svg
                    viewBox="0 0 14 9"
                    width="14"
                    height="9"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 1.5L7 7.5L13 1.5"
                      stroke="#9b969a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openMobileFinderMenu === 'age' ? (
                  <div className="finder-modal-dropdown-panel">
                    <p className="finder-dropdown-heading">
                      {finderPanels.age.heading}
                    </p>
                    {finderPanels.age.options.map((option) => (
                      <label key={option}>
                        <span>{option}</span>
                        <input
                          type="checkbox"
                          checked={mobileFinderSelections.age.includes(option)}
                          onChange={() => toggleMobileSelection('age', option)}
                        />
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="finder-modal-field">
              <span className="finder-modal-label">By Meal Time</span>
              <div
                className={`finder-modal-dropdown ${openMobileFinderMenu === 'mealTime' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="finder-modal-dropdown-trigger"
                  onClick={() =>
                    setOpenMobileFinderMenu((current) =>
                      current === 'mealTime' ? null : 'mealTime',
                    )
                  }
                >
                  <span
                    className={`finder-modal-dropdown-value ${mobileFinderSelections.mealTime.length === 0 ? 'is-placeholder' : ''}`}
                  >
                    {displayMobileSelection('mealTime', 'Select time')}
                  </span>
                  <svg
                    viewBox="0 0 14 9"
                    width="14"
                    height="9"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 1.5L7 7.5L13 1.5"
                      stroke="#9b969a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openMobileFinderMenu === 'mealTime' ? (
                  <div className="finder-modal-dropdown-panel">
                    <p className="finder-dropdown-heading">
                      {finderPanels.mealTime.heading}
                    </p>
                    {finderPanels.mealTime.options.map((option) => (
                      <label key={option}>
                        <span>{option}</span>
                        <input
                          type="checkbox"
                          checked={mobileFinderSelections.mealTime.includes(
                            option,
                          )}
                          onChange={() =>
                            toggleMobileSelection('mealTime', option)
                          }
                        />
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="finder-modal-field">
              <span className="finder-modal-label">By Meal Type</span>
              <div
                className={`finder-modal-dropdown ${openMobileFinderMenu === 'freeFrom' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="finder-modal-dropdown-trigger"
                  onClick={() =>
                    setOpenMobileFinderMenu((current) =>
                      current === 'freeFrom' ? null : 'freeFrom',
                    )
                  }
                >
                  <span
                    className={`finder-modal-dropdown-value ${mobileFinderSelections.freeFrom.length === 0 ? 'is-placeholder' : ''}`}
                  >
                    {displayMobileSelection('freeFrom', 'Select type')}
                  </span>
                  <svg
                    viewBox="0 0 14 9"
                    width="14"
                    height="9"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 1.5L7 7.5L13 1.5"
                      stroke="#9b969a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openMobileFinderMenu === 'freeFrom' ? (
                  <div className="finder-modal-dropdown-panel">
                    <p className="finder-dropdown-heading">
                      {finderPanels.freeFrom.heading}
                    </p>
                    {finderPanels.freeFrom.options.map((option) => (
                      <label key={option}>
                        <span>{option}</span>
                        <input
                          type="checkbox"
                          checked={mobileFinderSelections.freeFrom.includes(
                            option,
                          )}
                          onChange={() =>
                            toggleMobileSelection('freeFrom', option)
                          }
                        />
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <button type="submit" className="finder-modal-submit">
              Search for recipe
            </button>
          </form>
        </div>
      ) : null}
    </section>
  );

  const latestRecipesSection = (
    <section className="latest-recipes">
      <div className="latest-recipes-inner">
        <div className="heading latest-recipes-heading">
          <h4 className="latest-recipes-title text-[56px]! font-[500]!">
            {content.latestRecipes.heading}
          </h4>
          <p className="latest-recipes-subtitle mt-[25px]!">
            {content.latestRecipes.subtitle}
          </p>
        </div>
        <div
          ref={carouselRef}
          className="latest-recipes-carousel mt-[25px]! cursor-grab select-none active:cursor-grabbing"
          onPointerDownCapture={handlePointerDown}
          onPointerMoveCapture={handlePointerMove}
          onPointerUpCapture={handlePointerEnd}
          onPointerCancelCapture={handlePointerEnd}
        >
          <motion.div
            ref={trackRef}
            className="latest-recipes-track"
            style={{ x }}
          >
            {content.latestRecipes.recipes.map((recipe, recipeIndex) => (
              <article
                key={recipe.title}
                className="latest-recipe-card"
                onClickCapture={handleCardClickCapture}
              >
                <div className="block">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                    draggable={false}
                    onLoad={recipeIndex === 0 ? measure : undefined}
                  />
                </div>
                <Link href={recipe.href} className="no-underline">
                  <h3 className="text-[22px]! font-[550]! mt-[10px]! text-left text-ellipsis overflow-hidden line-clamp-2 font-family-montserrat">
                    {recipe.title}
                  </h3>
                </Link>
                <p className="latest-recipe-duration mt-[20px]!">
                  <span className="latest-recipe-duration-icon" aria-hidden>
                    <img
                      src="/icons/timer-icon.svg"
                      alt=""
                      width={24}
                      height={25}
                    />
                  </span>
                  <span className="text-[18px] font-[500]!">
                    {recipe.duration}
                  </span>
                </p>
              </article>
            ))}
          </motion.div>
          <div className="latest-carousel-controls">
            <button
              className="cursor-pointer disabled:invisible disabled:pointer-events-none"
              type="button"
              disabled={index <= 0}
              onPointerDown={(event) => {
                event.stopPropagation();
                handleRecipeNavigation(-1);
              }}
              aria-label="Previous recipes"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 5L8 11.5L14.5 18" />
              </svg>
            </button>
            <button
              className="cursor-pointer disabled:invisible disabled:pointer-events-none"
              type="button"
              disabled={index >= maxIndex}
              onPointerDown={(event) => {
                event.stopPropagation();
                handleRecipeNavigation(1);
              }}
              aria-label="Next recipes"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 5L16 11.5L9.5 18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="latest-recipes-cta">
          <Link
            className={`inline-flex items-center gap-2 px-4 py-4 text-base font-semibold text-white shadow-[0_6px_16px_rgba(183,71,114,0.24)] transition-colors ${styles.ctaButton} ${styles.ctaPink}  rounded-[15px]!`}
            href={content.latestRecipes.ctaHref}
          >
            <span
              className={`${styles.ctaLabel} tracking-[0.2px] text-[20px]! font-[500]!`}
            >
              {content.latestRecipes.ctaLabel}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="41"
              viewBox="0 0 42 41"
              fill="none"
            >
              <rect x="0.5" width="41" height="41" rx="16" fill="white"></rect>
              <path
                d="M13.5 20.5H27.5"
                stroke="#B34769"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20.5 13.5L27.5 20.5L20.5 27.5"
                stroke="#B34769"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );

  const recipeAppSection = (
    <>
      {/* ——— New Figma recipe app promo (active) ——— */}
      <section
        className={styles.recipeAppPromo}
        aria-labelledby="home-recipe-app-heading"
      >
        <div className={styles.recipeAppInner}>
          <div className={styles.recipeAppGrid}>
            <div className={styles.recipeAppCopy}>
              <h2
                id="home-recipe-app-heading"
                className={styles.recipeAppHeading}
              >
                {content.appSection.heading}
              </h2>
              <ul className={styles.recipeAppBullets}>
                {content.appSection.bullets.map((bullet) => (
                  <li key={bullet.lead} className={styles.recipeAppBullet}>
                    <RecipeAppBulletIcon />
                    <p className={styles.recipeAppBulletText}>
                      <span className={styles.recipeAppBulletLead}>
                        {bullet.lead}
                      </span>
                      {bullet.text}
                    </p>
                  </li>
                ))}
              </ul>
              <a
                href={content.appSection.ctaHref}
                className={styles.recipeAppTrialButton}
              >
                {content.appSection.ctaLabel}
              </a>
              <div className={styles.recipeAppStoreBadges}>
                <a
                  href={content.appSection.appStoreHref}
                  className={styles.recipeAppStoreBadge}
                  aria-label="Download on the App Store"
                >
                  <img
                    src="/home page/recipe-app/app-store-button.svg"
                    alt=""
                  />
                </a>
                <a
                  href={content.appSection.playStoreHref}
                  className={styles.recipeAppStoreBadge}
                  aria-label="Get it on Google Play"
                >
                  <img
                    src="/home page/recipe-app/google-play-button.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className={styles.recipeAppVisual}>
              <div className={styles.recipeAppAwards} aria-label="App awards">
                {content.appSection.awards.map((award) => (
                  <img
                    key={award.src}
                    src={award.src}
                    alt={award.alt}
                    className={styles.recipeAppAwardBadge}
                  />
                ))}
              </div>
              <img
                src={content.appSection.phonesImage}
                alt="Annabel Karmel recipe app on iPhone"
                className={styles.recipeAppPhones}
              />
            </div>
          </div>
        </div>
      </section>

      {/*
        ——— Previous recipe app section (#1 recipe app + carousel) — kept for reference ———

      <section className="app-recipe-section relative min-h-[760px] overflow-hidden py-16! md:min-h-0 md:py-20! lg:min-h-[860px] lg:py-28">
        <img src={backgroundImage.src} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
        <div className="app-recipe-section-shell relative z-1 grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-[0.92fr_1fr]">
          <article className="flex w-full flex-col items-center gap-4 pt-2 text-center [font-family:var(--font-montserrat)] lg:mx-0 lg:max-w-none lg:items-start lg:gap-5 lg:pt-6 lg:text-left">
            <div className="flex w-full items-end justify-center gap-3 md:gap-5 lg:gap-6">
              {oldAppSectionContent.awards.map((award, index) => (
                <img key={`${award}-${index}`} src={award} alt="" aria-hidden className={awardBadgeImgClasses[index] ?? awardBadgeImgClasses[0]} />
              ))}
            </div>
            <h2 className={`text-center text-[38px] font-[600] mt-3 leading-[50px] tracking-[-0.02em] text-[#15131a] md:text-[48px] lg:text-left md:font-[600]! ${styles.displayMedium}`}>
              <span>Annabel&apos;s </span>
              <span>#1 recipe app</span>
            </h2>
            <ul className="mx-auto mt-3 flex w-fit max-w-full flex-col space-y-4 text-left text-[14px] font-semibold leading-[1.45] text-[#1f1d23] md:text-[15px] lg:mx-0 lg:w-full">
              {oldAppSectionContent.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start justify-start gap-2.5 text-left">
                  <span className="mt-0.5 flex shrink-0 text-[#3a3a3a]" aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M30 9L13.5 25.5L6 18" stroke="#494747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-left text-[22px]! font-[600]! text-[#3a3a3a]">{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="w-full flex items-center justify-center">
              <a href={oldAppSectionContent.ctaHref} target="_blank" rel="noreferrer" className={`mt-1 inline-flex items-center gap-2.5 self-center rounded-[10px] px-6! py-[15px]! font-[500]! text-[13px] font-semibold text-white transition-colors lg:self-start ${styles.ctaButton} ${styles.ctaPink}`}>
                <span className={`${styles.ctaLabel} text-[18px] md:text-[17px]`}>{oldAppSectionContent.ctaLabel}</span>
                <span className={`inline-grid h-[41px] w-[41px] shrink-0 place-items-center rounded-[15px] bg-white text-[15px] ${styles.ctaPinkIcon}`} aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><rect x="0.5" width="41" height="41" rx="16" fill="white" /><path d="M13.5 20.5H27.5" stroke="#B34769" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </div>
          </article>
          <article className="relative w-full pt-1 lg:justify-self-end lg:pt-0">
            <div ref={appPanelRef} style={appPanelLockedHeight ? { height: `${appPanelLockedHeight}px` } : undefined} className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#efe8ea] md:min-h-[400px] lg:min-h-[600px]">
              <AnimatePresence mode="wait" custom={appCardDirection}>
                <motion.img key={`app-card-${appCardIndex}`} src={currentAppCard.image} alt={currentAppCard.title} initial={{ opacity: 0, x: appCardDirection > 0 ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: appCardDirection > 0 ? -20 : 20 }} transition={{ duration: 0.45, ease: "easeOut" }} onLoad={syncAppPanelHeight} className="absolute inset-0 h-full w-full object-cover object-center" />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-white/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-40 md:bottom-15 md:left-10 md:right-40 text-white">
                <h3 className="[font-family:var(--font-body)]! font-[700]! text-[17px] md:text-[35px] leading-[1.02]">{currentAppCard.title}</h3>
                <p className="mt-2 max-w-[590px] text-[13px] md:text-[17px] font-normal leading-[1.24]">{currentAppCard.subtitle}</p>
              </div>
              <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3">
                <button type="button" onClick={() => moveAppCard(-1)} aria-label="Previous app feature" className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/65 bg-transparent text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors hover:border-white hover:bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.8]"><path d="M14.5 5L8 11.5L14.5 18" /></svg>
                </button>
                <button type="button" onClick={() => moveAppCard(1)} aria-label="Next app feature" className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white bg-white text-[#c7c2c6] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#f7f6f7] hover:text-[#b4afb3]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.8]"><path d="M9.5 5L16 11.5L9.5 18" /></svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
      */}

      {/* App recipe of the week — disabled
      <section className="app-recipe-section relative overflow-hidden py-16! md:py-20! lg:py-28">
        <img
          src={backgroundImage.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="app-recipe-section-shell app-recipe-section-shell-bottom relative z-[1] grid w-full items-center gap-10 lg:grid-cols-[1fr_0.88fr] lg:gap-14">
          <div className="relative order-2 w-full pb-4 md:pb-8 lg:order-1 lg:pb-0 lg:justify-self-start">
            <div className="relative w-full">
              <img
                src="/home page/Pancake-Traybake-776x1024-optimized.webp"
                alt="Pancake Traybake"
                className="w-full rounded-[14px] object-cover"
              />
              <div className="absolute bottom-[30px] left-5 rounded-[15px] bg-white/95 px-3.5 py-4 shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
                <p className="[font-family:var(--font-montserrat)] text-[15px] font-semibold text-[#1f1d23]">Pancake Traybake</p>
                <p className="mt-[10px] text-[9px] text-[#6f6973]">
                  <span className="latest-recipe-duration-icon latest-recipe-duration-icon-lg" aria-hidden>
                    <img src="/icons/timer-icon.svg" alt="" width={28} height={29} />
                  </span>
                  <sup className="text-[15px] text-[#3d3d3d]">25 Mins</sup>
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 flex w-full flex-col mt-[50px] gap-y-[10px] text-center lg:order-2 lg:mt-2 lg:mx-auto lg:max-w-[440px] justify-center items-center lg:justify-self-center lg:text-left">
            <p className={`${styles.labelCaps} text-[18px] font-[600] text-[#8d4a67]`}>EXCLUSIVE</p>
            <h2 className={`mt-2 text-center text-[38px] leading-[50.4px] font-[500] text-[#1f1b24] md:text-[48px] font-[600]! ${styles.displayMedium}`}>
              App recipe of the week
            </h2>
            <p className={`mt-4 text-center text-[22px] leading-[1.45] text-[#4f4a54] md:text-[22px] ${styles.bodyFont}`}>
              Get this tasty recipe fresh from Annabel&apos;s kitchen direct to your inbox.
            </p>
            <a
              href={recipeAppPath}
              className={`mt-6 inline-flex items-center gap-2 rounded-[15px] px-4 py-4 text-[13px] font-semibold text-white transition-colors ${styles.ctaButton} ${styles.ctaPink}`}
            >
              <span className={`${styles.ctaLabel} text-[17px] font-[500]! md:text-[20px]`}>Get the recipe</span>
              <span className={`inline-grid h-[40px] w-[40px] place-items-center rounded-[15px] bg-white text-[15px] ${styles.ctaPinkIcon}`} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><rect x="0.5" width="41" height="41" rx="16" fill="white"></rect><path d="M13.5 20.5H27.5" stroke="#B34769" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"></path><path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </span>
            </a>
          </div>
        </div>
      </section>
      */}
    </>
  );

  const expertRangesSection = (
    <section className="relative overflow-hidden bg-white pt-10 pb-12 md:pt-20 md:pb-24 lg:pt-24 lg:pb-20">
      {/* <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#fdf2f4] to-transparent"
          aria-hidden
        /> */}
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2
          className={`text-[38px] text-center max-[500px]:max-w-[350px] max-[900px]:max-w-[420px] tracking-[1px] font-[600] leading-[50px] tracking-[-0.02em] text-[#111] md:text-[56px] ${styles.displayMedium}`}
        >
          {content.expertRanges.heading}
        </h2>
        <p className="mt-5 max-w-[600px] text-pretty [font-family:var(--font-montserrat)] text-[1.44rem] text-center font-normal leading-[1.45] text-[#6b6568] md:mt-6 md:text-[1.05rem] lg:text-[22px]">
          {content.expertRanges.body}
        </p>
        <div
          className="relative left-1/2 mt-8 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-6 md:hidden"
          onPointerDown={() => setAwardMarqueeAutoScrollEnabled(false)}
          onWheel={() => setAwardMarqueeAutoScrollEnabled(false)}
        >
          <motion.div
            ref={awardMarqueeTrackRef}
            className="flex min-w-max cursor-grab touch-pan-x items-center gap-x-3 md:gap-x-5 pr-12 will-change-transform select-none active:cursor-grabbing"
            style={{ x: awardX }}
            drag="x"
            dragElastic={0}
            dragMomentum
            dragTransition={{
              power: 0.22,
              timeConstant: 200,
              bounceStiffness: 600,
              bounceDamping: 45,
            }}
            onPointerDown={() => setAwardMarqueeAutoScrollEnabled(false)}
            onDragStart={() => setAwardMarqueeAutoScrollEnabled(false)}
          >
            {repeatedAwardLogos.map((logo, index) => (
              <img
                key={`${logo}-${index}`}
                src={logo}
                alt=""
                aria-hidden
                className="h-[180px] w-auto max-h-[200px] max-w-[min(256px,52vw)] shrink-0 object-contain sm:h-[164px] sm:max-h-[188px] sm:max-w-[min(268px,50vw)]"
                draggable={false}
              />
            ))}
          </motion.div>
        </div>
        <div className="mt-12 hidden w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-10 md:mt-[32px] md:flex md:gap-x-10 lg:mt-[24px] lg:gap-x-3">
          {content.expertRanges.awardLogos.map((logo) => (
            <img
              key={logo}
              src={logo}
              alt=""
              aria-hidden
              className="h-[104px] w-auto max-h-[112px] max-w-[min(184px,34vw)] object-contain md:h-[124px] md:max-h-[132px] md:max-w-[192px] lg:h-[130px] lg:max-h-[176px] lg:max-w-[180px]"
            />
          ))}
        </div>
        <div className="mt-10 grid w-full  grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {content.expertRanges.cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[12px] bg-[#f7f4ea]"
            >
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-[400px] w-full object-cover md:h-[400px]"
                />
              </a>
              <div className="flex items-center justify-between px-4 py-9 md:px-5">
                <h3 className="[font-family:var(--font-playfair)] text-[26px] leading-[1.1] text-[#3a3a3a] md:text-[36px] font-[600]">
                  {card.title}
                </h3>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[15px] bg-[#8a8776] px-4 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#7b7869]"
                >
                  <span className="text-white text-[17px] font-[500]!">
                    Explore
                  </span>
                  <span
                    className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[15px] bg-white text-[#8a8776]"
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                    >
                      <rect width="41" height="41" rx="16" fill="white"></rect>
                      <path
                        d="M13 20.5H27"
                        stroke="#8D8575"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20 13.5L27 20.5L20 27.5"
                        stroke="#8D8575"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const cookbooksSection = (
    <section
      className={`${fullBleedClass} overflow-hidden bg-white  py-5 md:py-8 lg:py-6`}
    >
      <div className="mx-auto w-full max-w-full px-4 text-center sm:px-6 lg:px-0">
        <h3
          className={`text-[40px] text-center tracking-[1px] font-[800] leading-[1.3] text-[#161418] md:text-[56px] ${styles.displayMedium}`}
        >
          {content.cookbooks.heading}
        </h3>
        <p className="mx-auto mt-6 max-w-[700px] [font-family:var(--font-montserrat)] text-[23px] leading-[1.3] text-[#444344] md:text-[22px]">
          {content.cookbooks.body}
        </p>

        <div
          ref={cookbookCarouselRef}
          className="cookbook-carousel-viewport relative mt-18 overflow-hidden cursor-grab select-none active:cursor-grabbing"
          onPointerDownCapture={cookbookHandlePointerDown}
          onPointerMoveCapture={cookbookHandlePointerMove}
          onPointerUpCapture={cookbookHandlePointerEnd}
          onPointerCancelCapture={cookbookHandlePointerEnd}
        >
          <motion.div
            ref={cookbookTrackRef}
            className="cookbook-carousel-track flex gap-8 max-[700px]:gap-5 will-change-transform"
            style={{ x: cookbookX }}
          >
            {content.cookbooks.books.map((book, bookIndex) => (
              <article
                key={book.title}
                className="cookbook-card"
                onClickCapture={cookbookHandleCardClickCapture}
              >
                <div className="group flex min-h-[300px] cursor-grab items-center justify-center rounded-[30px] bg-[#ecdde0] px-6 py-2 active:cursor-grabbing">
                  <img
                    src={book.image}
                    alt={book.title}
                    draggable={false}
                    onLoad={cookbookMeasure}
                    className="h-[400px] w-auto max-w-[84%] bg-[#ecdde0] object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <Link
                  href={book.href}
                  className={`mt-5 block px-2 text-left text-[20px] font-bold leading-[1.32] text-[#25222a] no-underline hover:text-[#b34769] ${styles.bodyFont}`}
                >
                  {book.title}
                </Link>
              </article>
            ))}
          </motion.div>

          <div className="cookbook-carousel-controls pointer-events-none absolute inset-x-0 top-[41%] flex -translate-y-1/2 justify-between">
            <button
              type="button"
              disabled={cookbookIndex <= 0}
              onPointerDown={(event) => {
                event.stopPropagation();
                handleCookbookNavigation(-1);
              }}
              aria-label="Previous cookbooks"
              className="pointer-events-auto inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#b34769] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] disabled:invisible disabled:pointer-events-none"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current stroke-[2.5]"
              >
                <path d="M14.5 5L8 11.5L14.5 18" />
              </svg>
            </button>
            <button
              type="button"
              disabled={cookbookIndex >= cookbookMaxIndex}
              onPointerDown={(event) => {
                event.stopPropagation();
                handleCookbookNavigation(1);
              }}
              aria-label="Next cookbooks"
              className="pointer-events-auto inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#b34769] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] disabled:invisible disabled:pointer-events-none"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current stroke-[2.5]"
              >
                <path d="M9.5 5L16 11.5L9.5 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-9 flex justify-center">
          <Link
            href={content.cookbooks.ctaHref}
            className={`inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3 text-[15px] font-semibold text-white transition-colors ${styles.ctaButton} ${styles.ctaPink}`}
          >
            <span
              className={`${styles.ctaLabel} font-[500] text-[20px] md:text-[20px]`}
            >
              {content.cookbooks.ctaLabel}
            </span>
            <span
              className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-[15px] bg-white ${styles.ctaPinkIcon}`}
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="41"
                viewBox="0 0 42 41"
                fill="none"
              >
                <rect
                  x="0.5"
                  width="41"
                  height="41"
                  rx="16"
                  fill="white"
                ></rect>
                <path
                  d="M13.5 20.5H27.5"
                  stroke="#B34769"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20.5 13.5L27.5 20.5L20.5 27.5"
                  stroke="#B34769"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );

  const collabsSection = (
    <section
      className={`${fullBleedClass} overflow-hidden bg-transparent py-10 md:py-16 lg:py-20`}
    >
      <div className="mx-auto w-full max-w-none px-0">
        <h3
          className={`text-center text-[34px] font-[600] leading-[1.1] text-[#17141b] md:text-[56px] ${styles.displayMedium}`}
        >
          {content.collabs.heading}
        </h3>

        <div className="mt-9 flex flex-col gap-6 px-4 md:hidden">
          {content.collabs.cards.map((collab) =>
            renderCollabArticle(
              collab,
              collab.title,
              'collab-card w-full max-w-[min(100%,520px)] mx-auto rounded-[30px] bg-[#d9e8ec] p-4',
            ),
          )}
        </div>

        <div className="mt-[50px] hidden overflow-hidden md:block">
          <motion.div
            ref={collabTrackRef}
            className="flex cursor-grab gap-6 pl-0 will-change-transform select-none [touch-action:pan-y] active:cursor-grabbing"
            style={{ x: collabX }}
            drag="x"
            dragElastic={0}
            dragMomentum
            dragTransition={{
              power: 0.22,
              timeConstant: 180,
              bounceStiffness: 600,
              bounceDamping: 45,
            }}
          >
            {repeatedCollabCards.map((collab, index) =>
              renderCollabArticle(
                collab,
                `${collab.title}-${index}`,
                'collab-card shrink-0 basis-[calc(40%+100px)] rounded-[30px] bg-[#d9e8ec] p-4 lg:basis-[calc(38%+100px)]',
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );

  const partnersSection = (
    <section className={`${fullBleedClass} bg-white py-6 md:py-9 pt-[10px]!`}>
      <div className="mx-auto flex w-full max-w-[1100px] flex-col space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <h3
          className={`text-[40px] font-bold leading-[1.1] text-[#19161d] md:text-[52px] ${styles.displayMedium}`}
        >
          {content.partners.heading}
        </h3>
        <p className="mx-auto mt-5 max-w-[600px] [font-family:var(--font-montserrat)] text-[23px] leading-[1.55] text-[#5d5660] md:text-[22px]">
          {content.partners.body}
        </p>
        <a
          href={content.partners.ctaHref}
          target="_blank"
          rel="noreferrer"
          className={`mt-8 inline-flex w-fit items-center gap-3 self-center rounded-[20px] px-5 py-3 text-[16px] font-semibold text-white transition-colors ${styles.ctaButton} ${styles.ctaTeal}`}
        >
          <span
            className={`${styles.ctaLabel} font-[500] text-[22px] md:text-[20px]`}
          >
            {content.partners.ctaLabel}
          </span>
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-white ${styles.ctaTealIcon}`}
            aria-hidden
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <rect width="41" height="41" rx="16" fill="white"></rect>
              <path
                d="M13 20.5H27"
                stroke="#6E9CA5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20 13.5L27 20.5L20 27.5"
                stroke="#6E9CA5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
        </a>
      </div>

      <div
        className="relative mt-12 w-screen overflow-hidden md:mt-14"
        onWheel={() => setPartnerAutoScrollEnabled(false)}
      >
        <motion.div
          ref={partnerTrackRef}
          className="flex min-w-max cursor-grab items-center gap-1 md:gap-12 will-change-transform select-none [touch-action:pan-y] active:cursor-grabbing"
          style={{ x: partnerX }}
          drag="x"
          dragElastic={0}
          dragMomentum
          dragTransition={{
            power: 0.2,
            timeConstant: 220,
            bounceStiffness: 600,
            bounceDamping: 45,
          }}
          onPointerDown={() => setPartnerAutoScrollEnabled(false)}
          onDragStart={() => setPartnerAutoScrollEnabled(false)}
        >
          {repeatedPartnerLogos.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="inline-flex h-14 w-[132px] shrink-0 items-center justify-center opacity-95 transition-opacity hover:opacity-100 md:h-16 md:w-[150px]"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="max-h-full w-auto object-contain"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const instagramSection = (
    <div className="mt-[50px]!">
      <InstagramShareSection
        title={content.instagram.title}
        titleAccent={content.instagram.titleAccent}
        description={content.instagram.description}
        posts={content.instagram.posts}
        className={
          previewMode
            ? 'relative w-full bg-white pb-10 md:pb-16'
            : 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-white pb-10 md:pb-16'
        }
        descriptionClassName="mx-auto mt-4 max-w-[1000px] [font-family:var(--font-montserrat)] text-[20px] text-normal leading-[1.5] text-[#5c5660] md:text-[22px]"
      />
    </div>
  );

  const sectionsByType: Record<HomepageSectionType, ReactNode> = {
    hero: heroSection,
    recipe_finder: recipeFinderSection,
    latest_recipes: latestRecipesSection,
    recipe_app: recipeAppSection,
    expert_ranges: expertRangesSection,
    cookbooks: cookbooksSection,
    collabs: collabsSection,
    partners: partnersSection,
    instagram: instagramSection,
  };

  return (
    <main
      className={previewMode ? 'max-md:pb-16' : 'max-md:pb-16 overflow-x-clip'}
      onClickCapture={(event) => {
        if (!previewMode) {
          return;
        }
        const anchor = (event.target as HTMLElement).closest('a');
        if (anchor) {
          event.preventDefault();
        }
      }}
    >
      {content.sectionOrder.map((type) => (
        <div key={type} data-homepage-section={type}>
          {sectionsByType[type]}
        </div>
      ))}
    </main>
  );
}
