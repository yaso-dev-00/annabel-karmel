 "use client";
import backgroundImage from "@/public/home page/background image.webp";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { useSnapCarousel, CAROUSEL_SMOOTH } from "@/components/use-snap-carousel";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useMotionValueEvent } from "framer-motion";
import { recipeFinderSlugs } from "@/data/recipe-taxonomies";
import {
  recipeFinderAgeOptions,
  recipeFinderFreeFromOptions,
  recipeFinderMealTimeOptions,
} from "@/data/recipe-finder-options";
import { buildRecipeListingUrl } from "@/lib/recipe-search-url";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  appFeatureCards,
  appSectionContent,
  awardLogos,
  bestsellingCookbooks,
  collabCards,
  expertRangeCards,
  heroSlides,
  latestRecipes,
  partnerLogos,
  type CollabCard,
} from "@/data/site-content";
import styles from "./home-page.module.css";

const heroThemeByIndex = [
  { panelColor: "#E9C6CE", buttonColor: "#b34769" },
  { panelColor: "#F4F2E8", buttonColor: "#8f887a" },
  { panelColor: "#DBEEF2", buttonColor: "#6f9fb2" },
];

const HERO_SWIPE_THRESHOLD = 40;

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

/** Left/right: circular badges ~110px at lg. Center: vertical rectangle ~1.4× that height. */
const awardBadgeImgClasses = [
  "h-[120px] max-w-[115px] shrink-0 object-contain sm:h-[96px] sm:w-[96px] md:h-auto md:w-[150px] lg:h-auto lg:w-[150px]",
  "h-[180px] max-w-[115px] shrink-0 max-w-[150px] object-contain sm:h-[132px] sm:max-w-[94px] md:h-[142px] md:max-w-[150px] lg:h-auto lg:max-w-[150px]",
  "h-[120px] max-w-[115px] shrink-0 object-contain sm:h-[96px] sm:w-[96px] md:h-auto md:w-[150px] lg:h-auto lg:w-[150px]",
];

export function HomePageContent() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openFinderMenu, setOpenFinderMenu] = useState<string | null>(null);
  const [recipeAutoScrollEnabled, setRecipeAutoScrollEnabled] = useState(true);
  const [appCardIndex, setAppCardIndex] = useState(0);
  const [appCardDirection, setAppCardDirection] = useState(1);
  const [appPanelLockedHeight, setAppPanelLockedHeight] = useState<number | null>(null);
  const [finderSelections, setFinderSelections] = useState<Record<string, string[]>>({
    age: [],
    mealTime: [],
    freeFrom: [],
  });
  const finderRef = useRef<HTMLFormElement | null>(null);
  const appPanelRef = useRef<HTMLDivElement | null>(null);
  const collabTrackRef = useRef<HTMLDivElement | null>(null);
  const collabLoopWidthRef = useRef(0);
  const collabX = useMotionValue(0);
  const partnerTrackRef = useRef<HTMLDivElement | null>(null);
  const partnerLoopWidthRef = useRef(0);
  const partnerX = useMotionValue(0);
  const awardMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const awardLoopWidthRef = useRef(0);
  const awardX = useMotionValue(0);
  const [partnerAutoScrollEnabled, setPartnerAutoScrollEnabled] = useState(true);
  const [awardMarqueeAutoScrollEnabled, setAwardMarqueeAutoScrollEnabled] = useState(true);
  const [heroAutoScrollEnabled, setHeroAutoScrollEnabled] = useState(true);
  const heroPointerStartX = useRef<number | null>(null);
  const heroPointerStartY = useRef<number | null>(null);
  const heroActivePointerId = useRef<number | null>(null);

  const recipeCarousel = useSnapCarousel({
    itemCount: latestRecipes.length,
    cardSelector: ".latest-recipe-card",
    controlsSelector: ".latest-carousel-controls, button",
    initialVisibleCards: 1,
    onInteraction: () => setRecipeAutoScrollEnabled(false),
  });

  const cookbookCarousel = useSnapCarousel({
    itemCount: bestsellingCookbooks.length,
    cardSelector: ".cookbook-card",
    controlsSelector: ".cookbook-carousel-controls, button",
    initialVisibleCards: 1,
    centerSingleSlide: true,
  });

  const current = useMemo(() => heroSlides[activeSlide], [activeSlide]);
  const theme = heroThemeByIndex[activeSlide % heroThemeByIndex.length];
  const currentAppCard = appFeatureCards[appCardIndex];
  const repeatedCollabCards = useMemo(() => [...collabCards, ...collabCards, ...collabCards], []);
  const repeatedPartnerLogos = useMemo(() => [...partnerLogos, ...partnerLogos, ...partnerLogos], []);
  const repeatedAwardLogos = useMemo(() => [...awardLogos, ...awardLogos, ...awardLogos], []);

  const moveSlide = (step: number) => {
    setDirection(step);
    setActiveSlide((prev) => (prev + step + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    if (index === activeSlide) {
      return;
    }
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
    setHeroAutoScrollEnabled(false);
    window.setTimeout(() => setHeroAutoScrollEnabled(true), 8000);
  };

  const pauseHeroAutoScroll = () => {
    setHeroAutoScrollEnabled(false);
    window.setTimeout(() => setHeroAutoScrollEnabled(true), 8000);
  };

  const handleHeroPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest(".hero-nav-buttons, .hero-dots, .hero-copy-content a")) {
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

    if (Math.abs(deltaX) > HERO_SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      moveSlide(deltaX > 0 ? -1 : 1);
    }

    window.setTimeout(() => setHeroAutoScrollEnabled(true), 8000);
  };

  const handleRecipeNavigation = (step: number) => {
    recipeCarousel.handleNavigation(step);
  };

  const moveAppCard = (step: number) => {
    setAppCardDirection(step);
    setAppCardIndex((prev) => (prev + step + appFeatureCards.length) % appFeatureCards.length);
  };

  const handleCookbookNavigation = (step: number) => {
    cookbookCarousel.handleNavigation(step);
  };

  const syncAppPanelHeight = () => {
    if (typeof window === "undefined") {
      return;
    }
    // Glitch is only visible on smaller screens; keep desktop fully fluid.
    if (window.innerWidth >= 1080) {
      setAppPanelLockedHeight(null);
      return;
    }
    const panel = appPanelRef.current;
    if (!panel) {
      return;
    }
    const measuredHeight = panel.offsetHeight;
    if (measuredHeight > 0) {
      setAppPanelLockedHeight(measuredHeight);
    }
  };

  useEffect(() => {
    if (!heroAutoScrollEnabled) {
      return;
    }

    const timer = setInterval(() => moveSlide(1), 5500);
    return () => clearInterval(timer);
  }, [heroAutoScrollEnabled]);

  useEffect(() => {
    const updatePanelLockOnResize = () => {
      setAppPanelLockedHeight(null);
      window.requestAnimationFrame(syncAppPanelHeight);
    };
    window.addEventListener("resize", updatePanelLockOnResize);
    return () => window.removeEventListener("resize", updatePanelLockOnResize);
  }, []);

  useEffect(() => {
    if (appFeatureCards.length < 2) {
      return;
    }
    const timer = setInterval(() => {
      moveAppCard(1);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

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
    window.addEventListener("resize", updateCollabMetrics);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateCollabMetrics);
    };
  }, [collabX]);

  useMotionValueEvent(collabX, "change", (latest) => {
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
    window.addEventListener("resize", updatePartnerMetrics);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePartnerMetrics);
    };
  }, [partnerX]);

  useMotionValueEvent(partnerX, "change", (latest) => {
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
      if (!track || (typeof window !== "undefined" && window.innerWidth >= 768)) {
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
    window.addEventListener("resize", updateAwardMetrics);

    const track = awardMarqueeTrackRef.current;
    const ro =
      typeof ResizeObserver !== "undefined" && track
        ? new ResizeObserver(() => updateAwardMetrics())
        : null;
    if (ro && track) {
      ro.observe(track);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateAwardMetrics);
      ro?.disconnect();
    };
  }, [awardX]);

  useMotionValueEvent(awardX, "change", (latest) => {
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
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      const speedPxPerSecond = 52;
      const movement = (speedPxPerSecond * delta) / 1000;
      awardX.set(awardX.get() - movement);
    }
  });

  useEffect(() => {
    if (recipeCarousel.maxIndex <= 0 || !recipeAutoScrollEnabled) {
      return;
    }

    const timer = setInterval(() => {
      const next =
        recipeCarousel.indexRef.current >= recipeCarousel.maxIndex
          ? 0
          : recipeCarousel.indexRef.current + 1;
      recipeCarousel.animateToIndex(next, CAROUSEL_SMOOTH);
    }, 7000);

    return () => clearInterval(timer);
  }, [recipeCarousel.maxIndex, recipeCarousel.animateToIndex, recipeAutoScrollEnabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!finderRef.current) {
        return;
      }
      if (!finderRef.current.contains(event.target as Node)) {
        setOpenFinderMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const finderPanels = {
    age: { heading: "Select age", options: recipeFinderAgeOptions.map((option) => option.label) },
    mealTime: { heading: "Select time", options: recipeFinderMealTimeOptions.map((option) => option.label) },
    freeFrom: { heading: "Select type", options: recipeFinderFreeFromOptions.map((option) => option.label) },
  };

  const toggleSelection = (key: "age" | "mealTime" | "freeFrom", option: string) => {
    setFinderSelections((prev) => {
      const exists = prev[key].includes(option);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== option) : [...prev[key], option],
      };
    });
  };

  const displaySelection = (key: "age" | "mealTime" | "freeFrom", fallback: string) =>
    finderSelections[key].length > 0 ? finderSelections[key].join(", ") : fallback;

  const handleFinderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ageLabel = finderSelections.age[0];
    const mealLabel = finderSelections.mealTime[0];
    const freeLabel = finderSelections.freeFrom[0];

    router.push(
      buildRecipeListingUrl({
        age: ageLabel
          ? recipeFinderSlugs.age[ageLabel as keyof typeof recipeFinderSlugs.age]
          : undefined,
        mealTime: mealLabel
          ? recipeFinderSlugs.mealTime[mealLabel as keyof typeof recipeFinderSlugs.mealTime]
          : undefined,
        freeFrom: freeLabel
          ? recipeFinderSlugs.freeFrom[freeLabel as keyof typeof recipeFinderSlugs.freeFrom]
          : undefined,
      }),
    );
  };

  const renderCollabArticle = (collab: CollabCard, reactKey: string, articleClassName: string) => (
    <article key={reactKey} className={articleClassName}>
      <div className="grid min-h-0 grid-cols-1 gap-4 md:min-h-[300px] md:grid-cols-[0.96fr_1.04fr] md:gap-4">
        <div className="flex min-w-0 flex-col gap-4 px-1 py-2 md:justify-between md:gap-0 md:px-1.5 md:py-3">
          {collab.logoImage ? (
            <img
              src={collab.logoImage}
              alt={`${collab.title} logo`}
              draggable={false}
              className={`self-start w-auto object-contain ${
                collab.title === "Craft & Crumb" ? "h-18 md:h-24" : "h-20 md:h-26"
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
            <span className="text-[16px] text-[#6a8796] hover:text-[#f78da7]">Discover</span>
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#74a6b6] text-white md:h-12 md:w-12"
              aria-hidden
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path d="M5 12.9619H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M12 5.96191L19 12.9619L12 19.9619" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
            </span>
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <main className="max-md:pb-16  ">
      <section className="hero-showcase container">
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
                      <path d="M13.5 20.5H27.5" stroke="#B34769" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-dots" aria-label="Hero slides">
            {heroSlides.map((slide, slideIndex) => (
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

      <section className="recipe-finder container py-4!">
        <form className="finder-row" ref={finderRef} onSubmit={handleFinderSubmit}>
          <label>
            <span className="finder-title  font-[900]!">Recipe</span>
            <input type="search" className="text-[18px]! text-[#afaeae]" placeholder="Search recipes" />
          </label>
            <div className={`finder-dropdown ${openFinderMenu === "age" ? "open" : ""}`}>
            <button type="button" onClick={() => setOpenFinderMenu((current) => (current === "age" ? null : "age"))}>
              <span className="finder-title font-[900]!">Age</span>
              <span className="finder-value text-[18px]!">{displaySelection("age", "Select age")}</span>
            </button>
            {openFinderMenu === "age" ? (
            <div className="finder-dropdown-panel">
              <p className="finder-dropdown-heading">{finderPanels.age.heading}</p>
              {finderPanels.age.options.map((option) => (
                <label key={option} className="text-[20px]!">
                  <span className="text-[20px]!">{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.age.includes(option)}
                    onChange={() => toggleSelection("age", option)}
                  />
                </label>
              ))}
            </div>
            ) : null}
          </div>
          <div className={`finder-dropdown ${openFinderMenu === "mealTime" ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpenFinderMenu((current) => (current === "mealTime" ? null : "mealTime"))}
            >
              <span className="finder-title font-[900]!">Meal Time</span>
              <span className="finder-value text-[18px]!">{displaySelection("mealTime", "Select time")}</span>
            </button>
            {openFinderMenu === "mealTime" ? (
            <div className="finder-dropdown-panel">
              <p className="finder-dropdown-heading">{finderPanels.mealTime.heading}</p>
              {finderPanels.mealTime.options.map((option) => (
                <label key={option} className="text-[20px]!">
                  <span className="text-[20px]!">{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.mealTime.includes(option)}
                    onChange={() => toggleSelection("mealTime", option)}
                  />
                </label>
              ))}
            </div>
            ) : null}
          </div>
          <div className={`finder-dropdown ${openFinderMenu === "freeFrom" ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpenFinderMenu((current) => (current === "freeFrom" ? null : "freeFrom"))}
            >
              <span className="finder-title font-[900]!">Free From</span>
              <span className="finder-value text-[18px]!">{displaySelection("freeFrom", "Select type")}</span>
            </button>
            {openFinderMenu === "freeFrom" ? (
            <div className="finder-dropdown-panel">
              <p className="finder-dropdown-heading">{finderPanels.freeFrom.heading}</p>
              {finderPanels.freeFrom.options.map((option) => (
                <label key={option} className="text-[20px]!">
                  <span className="text-[20px]!">{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.freeFrom.includes(option)}
                    onChange={() => toggleSelection("freeFrom", option)}
                  />
                </label>
              ))}
            </div>
            ) : null}
          </div>
       <div className="w-full px-2 pt-[6px] min-[1080px]:p-0">
       <button
            type="submit"
            className="inline-flex relative cursor-pointer min-[1080px]:float-right right-[0px] min-[1080px]:right-[20px] items-center justify-center gap-2 rounded-[15px] bg-[#b34769] px-5 py-5 text-base font-semibold text-white shadow-[0_6px_16px_rgba(183,71,114,0.24)] transition-colors max-[1100px]:col-span-1 max-[1100px]:mt-2 max-[1100px]:w-full"
            aria-label="Search recipes"
          >
          <img decoding="async" src="https://www.annabelkarmel.com/wp-content/uploads/2025/03/Search-optimized.png" alt="Search" className="h-[40px] w-[40px]"/>
          
          </button>
       </div>
        </form>
      </section>

      <section className="latest-recipes">
        <div className="latest-recipes-inner">
          <div className="heading latest-recipes-heading">
            <h4 className="latest-recipes-title text-[56px]! font-[500]!">Latest recipes</h4>
            <p className="latest-recipes-subtitle mt-[25px]!">Recipes for every age, stage and occasion</p>
          </div>
          <div
            ref={recipeCarousel.carouselRef}
            className="latest-recipes-carousel mt-[25px]! cursor-grab select-none active:cursor-grabbing"
            onPointerDownCapture={recipeCarousel.handlePointerDown}
            onPointerMoveCapture={recipeCarousel.handlePointerMove}
            onPointerUpCapture={recipeCarousel.handlePointerEnd}
            onPointerCancelCapture={recipeCarousel.handlePointerEnd}
          >
            <motion.div
              ref={recipeCarousel.trackRef}
              className="latest-recipes-track"
              style={{ x: recipeCarousel.x }}
            >
              {latestRecipes.map((recipe, recipeIndex) => (
                <article
                  key={recipe.title}
                  className="latest-recipe-card"
                  onClickCapture={recipeCarousel.handleCardClickCapture}
                >
                  <a
                    href={recipe.href}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-image"
                      draggable={false}
                      onLoad={recipeIndex === 0 ? recipeCarousel.measure : undefined}
                    />
                  </a>
                  <h3 className="text-[22px]! font-[550]! mt-[10px]! text-center text-ellipsis overflow-hidden line-clamp-2  font-family-montserrat">{recipe.title}</h3>
                  <p className="latest-recipe-duration mt-[20px]!">
                    <span className="latest-recipe-duration-icon" aria-hidden>
                      <img src="/icons/timer-icon.svg" alt="" width={24} height={25} />
                    </span>
                    <span className="text-[18px] font-[500]!">{recipe.duration}</span>
                  </p>
                </article>
              ))}
            </motion.div>
            <div className="latest-carousel-controls">
              <button
                className="relative top-[50px] md:top-[20px] cursor-pointer disabled:invisible disabled:pointer-events-none"
                type="button"
                disabled={recipeCarousel.index <= 0}
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
                className="relative top-[50px] md:top-[20px] cursor-pointer disabled:invisible disabled:pointer-events-none"
                type="button"
                disabled={recipeCarousel.index >= recipeCarousel.maxIndex}
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
            <a
              className={`inline-flex items-center gap-2 px-4 py-4 text-base font-semibold text-white shadow-[0_6px_16px_rgba(183,71,114,0.24)] transition-colors ${styles.ctaButton} ${styles.ctaPink}  rounded-[15px]!`}
              href="/recipes"
              target="_blank"
              rel="noreferrer"
            >
              <span className={`${styles.ctaLabel} tracking-[0.2px] text-[20px]! font-[500]!`}>See all recipes</span>
                           <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><rect x="0.5" width="41" height="41" rx="16" fill="white"></rect><path d="M13.5 20.5H27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              
            </a>
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[760px] overflow-hidden py-22! md:min-h-[820px] md:py-[150px]! lg:min-h-[860px] lg:py-28"
      >
        <img
          src={backgroundImage.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-1 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-10 px-4 md:px-6 lg:grid-cols-[0.92fr_1fr]">
          <article className="mx-auto flex w-full max-w-[410px] flex-col items-center gap-4 pt-2 text-center [font-family:var(--font-montserrat)] lg:mx-0 lg:max-w-none lg:items-start lg:gap-5 lg:pt-6 lg:text-left">
            <div className="flex w-full items-center justify-center lg:items-center gap-3 md:gap-5 lg:justify-start">
              {appSectionContent.awards.map((award, index) => (
                <img
                  key={`${award}-${index}`}
                  src={award}
                  alt=""
                  aria-hidden
                  className={awardBadgeImgClasses[index] ?? awardBadgeImgClasses[0]}
                />
              ))}
            </div>
            <h2 className={`text-center text-[38px] font-[600] max-[900px]:max-w-[350px] mt-3 leading-[50px] tracking-[-0.02em] text-[#15131a] md:text-[48px] lg:text-left md:font-[600]! ${styles.displayMedium}`}>
              <span>Annabel&apos;s </span>
              <span>#1 recipe app</span>
            </h2>
            <ul className="w-full space-y-4 mt-3 text-[14px] font-semibold leading-[1.45] text-[#1f1d23] md:text-[15px] lg:text-left">
              {appSectionContent.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start  gap-2.5 lg:justify-start">
                  <span className="mt-0.5 flex shrink-0 text-[#3a3a3a]" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M30 9L13.5 25.5L6 18" stroke="#494747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <span className="text-[22px]! font-[600]! text-left text-[#3a3a3a]">{bullet}</span>
                </li>
              ))}
            </ul>
           <div className="w-full flex items-center justify-center">
           <a
              href={appSectionContent.ctaHref}
              target="_blank"
              rel="noreferrer"
              className={`mt-1 inline-flex items-center gap-2.5 self-center rounded-[10px] px-6! py-[15px]! font-[500]! text-[13px] font-semibold text-white transition-colors lg:self-start ${styles.ctaButton} ${styles.ctaPink}`}
            >
              <span className={`${styles.ctaLabel} text-[18px] md:text-[17px]`}>{appSectionContent.ctaLabel}</span>
              <span className={`inline-grid h-[41px] w-[41px] shrink-0 place-items-center rounded-[15px] bg-white text-[15px] ${styles.ctaPinkIcon}`} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><rect x="0.5" width="41" height="41" rx="16" fill="white"></rect><path d="M13.5 20.5H27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </a>
           </div>
          </article>

          <article className="relative mx-auto w-full max-w-[380px] pt-1 md:max-w-[570px] lg:justify-self-end lg:pt-0">
            <div
              ref={appPanelRef}
              style={appPanelLockedHeight ? { height: `${appPanelLockedHeight}px` } : undefined}
              className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#efe8ea]  md:min-h-[400px] lg:min-h-[600px]"
            >
              <AnimatePresence mode="wait" custom={appCardDirection}>
                <motion.img
                  key={`app-card-${appCardIndex}`}
                  src={currentAppCard.image}
                  alt={currentAppCard.title}
                  initial={{ opacity: 0, x: appCardDirection > 0 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: appCardDirection > 0 ? -20 : 20 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  onLoad={syncAppPanelHeight}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-white/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-40 md:bottom-15 md:left-10 md:right-40 text-white">
                <h3 className="[font-family:var(--font-body)]! font-[700]! text-[17px] md:text-[35px] leading-[1.02]">
                  {currentAppCard.title}
                </h3>
                <p className="mt-2 max-w-[590px]  text-[13px] md:text-[17px] font-normal leading-[1.24]">{currentAppCard.subtitle}</p>
              </div>
              <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => moveAppCard(-1)}
                  aria-label="Previous app feature"
                  className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/65 bg-transparent text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors hover:border-white hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.8]">
                    <path d="M14.5 5L8 11.5L14.5 18" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveAppCard(1)}
                  aria-label="Next app feature"
                  className="inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white bg-white text-[#c7c2c6] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#f7f6f7] hover:text-[#b4afb3]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.8]">
                    <path d="M9.5 5L16 11.5L9.5 18" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
        <div className="relative z-[1] mx-auto mt-5 grid w-full max-w-[1200px] items-center gap-10 px-4 md:mt-[70px] md:px-6 lg:grid-cols-[1fr_0.88fr] lg:gap-14">
          <div className="relative order-2  w-full max-w-[380px] md:max-w-full lg:order-1 lg:justify-self-start">
            <img
              src="/home page/Pancake-Traybake-776x1024-optimized.webp"
              alt="Pancake Traybake"
              className="w-full rounded-[14px] object-cover"
            />
            <div className="absolute bottom-5 left-5 rounded-[15px] bg-white/95 px-3.5 py-4 shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
              <p className="[font-family:var(--font-montserrat)] text-[15px] font-semibold text-[#1f1d23]">Pancake Traybake</p>
              <p className="mt-[10px] text-[9px] text-[#6f6973]">
                <span className="latest-recipe-duration-icon latest-recipe-duration-icon-lg" aria-hidden>
                  <img src="/icons/timer-icon.svg" alt="" width={28} height={29} />
                </span>
                <sup className="text-[15px] text-[#3d3d3d]">25 Mins</sup>
              </p>
            </div>
          </div>
          <div className="order-1 mx-auto flex w-full max-w-[400px] flex-col mt-[50px]  gap-y-[10px] text-center lg:order-2 lg:mt-2 lg:max-w-[440px] justify-center items-center lg:justify-self-center lg:text-left">
            <p className={`${styles.labelCaps} text-[18px] font-[600] text-[#8d4a67]`}>EXCLUSIVE</p>
            <h2 className={`mt-2 text-center max-[900px]:max-w-[300px] text-[38px] leading-[50.4px] font-[500] text-[#1f1b24] md:text-[48px] font-[600]! ${styles.displayMedium}`}>
              App recipe of the week
            </h2>
            <p className={`mt-4 text-center text-[22px] leading-[1.45] text-[#4f4a54] md:text-[22px] ${styles.bodyFont}`}>
              Get this tasty recipe fresh from Annabel&apos;s kitchen direct to your inbox.
            </p>
            <a
              href="/recipe-app"
              target="_blank"
              rel="noreferrer"
              className={`mt-6 inline-flex items-center gap-2 rounded-[15px] px-4 py-4 text-[13px] font-semibold text-white transition-colors ${styles.ctaButton} ${styles.ctaPink}`}
            >
              <span className={`${styles.ctaLabel} text-[17px] font-[500]! md:text-[20px]`}>Get the recipe</span>
              <span className={`inline-grid h-[40px] w-[40px] place-items-center rounded-[15px] bg-white text-[15px] ${styles.ctaPinkIcon}`} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><rect x="0.5" width="41" height="41" rx="16" fill="white"></rect><path d="M13.5 20.5H27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      
      <section className="relative overflow-hidden bg-white pt-10 pb-12 md:pt-20 md:pb-24 lg:pt-24 lg:pb-20">
        {/* <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#fdf2f4] to-transparent"
          aria-hidden
        /> */}
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h2 className={`text-[38px] text-center max-[500px]:max-w-[350px] max-[900px]:max-w-[420px] tracking-[1px] font-[600] leading-[50px] tracking-[-0.02em] text-[#111] md:text-[56px] ${styles.displayMedium}`}>
            Annabel&apos;s expert ranges
          </h2>
          <p className="mt-5 max-w-[600px] text-pretty [font-family:var(--font-montserrat)] text-[1.44rem] text-center font-normal leading-[1.45] text-[#6b6568] md:mt-6 md:text-[1.05rem] lg:text-[22px]">
            My famous cookbook recipes are enjoyed by toddlers and children all over the world. And now they can refuel on
            my trusted favourites in a flash with my chilled and frozen meal ranges.
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
              dragTransition={{ power: 0.22, timeConstant: 200, bounceStiffness: 600, bounceDamping: 45 }}
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
            {awardLogos.map((logo) => (
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
            {expertRangeCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-[12px] bg-[#f7f4ea]">
                <a href={card.href} target="_blank" rel="noreferrer" className="block">
                  <img src={card.image} alt={card.title} className="h-[400px] w-full object-cover md:h-[400px]" />
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
                    <span className="text-white text-[17px] font-[500]!">Explore</span>
                    <span className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[15px] bg-white text-[#8a8776]" aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><rect width="41" height="41" rx="16" fill="white"></rect><path d="M13 20.5H27" stroke="#8D8575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 13.5L27 20.5L20 27.5" stroke="#8D8575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-white  py-5 md:py-8 lg:py-6">
        <div className="mx-auto w-full max-w-full px-4 text-center sm:px-6 lg:px-0">
          <h3 className={`text-[40px] text-center tracking-[1px] font-[800] leading-[1.3] text-[#161418] md:text-[56px] ${styles.displayMedium}`}>
            Bestselling cookbooks
          </h3>
          <p className="mx-auto mt-6 max-w-[700px] [font-family:var(--font-montserrat)] text-[23px] leading-[1.3] text-[#444344] md:text-[22px]">
            From weaning to kids cooking and quick and easy family meals, Annabel&apos;s delicious, nutritious and simple
            recipe books are a household staple.
          </p>

          <div
            ref={cookbookCarousel.carouselRef}
            className="cookbook-carousel-viewport relative mt-18 overflow-hidden cursor-grab select-none active:cursor-grabbing"
            onPointerDownCapture={cookbookCarousel.handlePointerDown}
            onPointerMoveCapture={cookbookCarousel.handlePointerMove}
            onPointerUpCapture={cookbookCarousel.handlePointerEnd}
            onPointerCancelCapture={cookbookCarousel.handlePointerEnd}
          >
            <motion.div
              ref={cookbookCarousel.trackRef}
              className="cookbook-carousel-track flex gap-8 max-[700px]:gap-5 will-change-transform"
              style={{ x: cookbookCarousel.x }}
            >
              {bestsellingCookbooks.map((book, bookIndex) => (
                <article
                  key={book.title}
                  className="cookbook-card"
                  onClickCapture={cookbookCarousel.handleCardClickCapture}
                >
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="group flex min-h-[300px] cursor-pointer items-center justify-center rounded-[30px] bg-[#ecdde0] px-6 py-2"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      draggable={false}
                      onLoad={bookIndex === 0 ? cookbookCarousel.measure : undefined}
                      className="h-[400px] w-auto max-w-[84%] bg-[#ecdde0] object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </a>
                  <h3 className={`mt-5 px-2 text-center text-[20px] font-bold leading-[1.32] text-[#25222a] ${styles.bodyFont}`}>
                    {book.title}
                  </h3>
                </article>
              ))}
            </motion.div>

            <div className="cookbook-carousel-controls pointer-events-none absolute inset-x-0 top-[41%] flex -translate-y-1/2 justify-between">
              <button
                type="button"
                disabled={cookbookCarousel.index <= 0}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  handleCookbookNavigation(-1);
                }}
                aria-label="Previous cookbooks"
                className="pointer-events-auto inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#b34769] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] disabled:invisible disabled:pointer-events-none"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
                  <path d="M14.5 5L8 11.5L14.5 18" />
                </svg>
              </button>
              <button
                type="button"
                disabled={cookbookCarousel.index >= cookbookCarousel.maxIndex}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  handleCookbookNavigation(1);
                }}
                aria-label="Next cookbooks"
                className="pointer-events-auto inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#b34769] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] disabled:invisible disabled:pointer-events-none"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
                  <path d="M9.5 5L16 11.5L9.5 18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <a
              href="/our-products/cookbooks"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3 text-[15px] font-semibold text-white transition-colors ${styles.ctaButton} ${styles.ctaPink}`}
            >
              <span className={`${styles.ctaLabel} font-[500] text-[20px] md:text-[20px]`}>Discover all cookbooks</span>
              <span className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-[15px] bg-white ${styles.ctaPinkIcon}`} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><rect x="0.5" width="41" height="41" rx="16" fill="white"></rect><path d="M13.5 20.5H27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 13.5L27.5 20.5L20.5 27.5" stroke="#B34769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-transparent py-10 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-none px-0">
          <h3 className={`text-center text-[34px] font-[600] leading-[1.1] text-[#17141b] md:text-[56px] ${styles.displayMedium}`}>
            Annabel&apos;s collabs
          </h3>

          <div className="mt-9 flex flex-col gap-6 px-4 md:hidden">
            {collabCards.map((collab) =>
              renderCollabArticle(
                collab,
                collab.title,
                "collab-card w-full max-w-[min(100%,520px)] mx-auto rounded-[30px] bg-[#d9e8ec] p-4",
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
              dragTransition={{ power: 0.22, timeConstant: 180, bounceStiffness: 600, bounceDamping: 45 }}
            >
              {repeatedCollabCards.map((collab, index) =>
                renderCollabArticle(
                  collab,
                  `${collab.title}-${index}`,
                  "collab-card shrink-0 basis-[calc(40%+100px)] rounded-[30px] bg-[#d9e8ec] p-4 lg:basis-[calc(38%+100px)]",
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-white py-14 md:py-16">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col space-y-3 px-4 text-center sm:px-6 lg:px-8">
          <h3 className={`text-[40px] font-bold leading-[1.1] text-[#19161d] md:text-[52px] ${styles.displayMedium}`}>
            Partner with us
          </h3>
          <p className="mx-auto mt-5 max-w-[600px] [font-family:var(--font-montserrat)] text-[23px] leading-[1.55] text-[#5d5660] md:text-[22px]">
            Partner with Annabel Karmel to connect your brand with young families through trusted, impactful collaborations.
          </p>
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
              className={`mt-8 inline-flex w-fit items-center gap-3 self-center rounded-[20px] px-5 py-3 text-[16px] font-semibold text-white transition-colors ${styles.ctaButton} ${styles.ctaTeal}`}
          >
              <span className={`${styles.ctaLabel} font-[500] text-[22px] md:text-[20px]`}>Get in touch</span>
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-white ${styles.ctaTealIcon}`} aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none"><rect width="41" height="41" rx="16" fill="white"></rect><path d="M13 20.5H27" stroke="#6E9CA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 13.5L27 20.5L20 27.5" stroke="#6E9CA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </span>
          </a>

        </div>

        <div className="relative mt-12 w-screen overflow-hidden md:mt-14" onWheel={() => setPartnerAutoScrollEnabled(false)}>
            <motion.div
              ref={partnerTrackRef}
              className="flex min-w-max cursor-grab items-center gap-1 md:gap-12 will-change-transform select-none [touch-action:pan-y] active:cursor-grabbing"
              style={{ x: partnerX }}
              drag="x"
              dragElastic={0}
              dragMomentum
              dragTransition={{ power: 0.2, timeConstant: 220, bounceStiffness: 600, bounceDamping: 45 }}
              onPointerDown={() => setPartnerAutoScrollEnabled(false)}
              onDragStart={() => setPartnerAutoScrollEnabled(false)}
            >
              {repeatedPartnerLogos.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="inline-flex h-14 w-[132px] shrink-0 items-center justify-center opacity-95 transition-opacity hover:opacity-100 md:h-16 md:w-[150px]"
                >
                  <img src={partner.image} alt={partner.name} className="max-h-full w-auto object-contain" draggable={false} />
                </div>
              ))}
            </motion.div>
        </div>
      </section>

      <InstagramShareSection descriptionClassName="mx-auto mt-4 max-w-[1000px] [font-family:var(--font-montserrat)] text-[20px] text-normal leading-[1.5] text-[#5c5660] md:text-[22px]" />
    </main>
  );
}
