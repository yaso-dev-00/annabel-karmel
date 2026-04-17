 "use client";
import backgroundImage from "@/public/home page/background image.webp";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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

const heroThemeByIndex = [
  { panelColor: "#dcb8c7", buttonColor: "#b34769" },
  { panelColor: "#e6e2dc", buttonColor: "#8f887a" },
  { panelColor: "#c8dce4", buttonColor: "#6f9fb2" },
];

/** Left/right: circular badges ~110px at lg. Center: vertical rectangle ~1.4× that height. */
const awardBadgeImgClasses = [
  "h-[88px] w-[88px] shrink-0 object-contain sm:h-[96px] sm:w-[96px] md:h-[104px] md:w-[104px] lg:h-[110px] lg:w-[110px]",
  "h-[120px] w-auto shrink-0 max-w-[88px] object-contain sm:h-[132px] sm:max-w-[94px] md:h-[142px] md:max-w-[100px] lg:h-[154px] lg:max-w-[110px]",
  "h-[88px] w-[88px] shrink-0 object-contain sm:h-[96px] sm:w-[96px] md:h-[104px] md:w-[104px] lg:h-[110px] lg:w-[110px]",
];

export function HomePageContent() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openFinderMenu, setOpenFinderMenu] = useState<string | null>(null);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [recipeResetting, setRecipeResetting] = useState(false);
  const [recipeAutoScrollEnabled, setRecipeAutoScrollEnabled] = useState(true);
  const [appCardIndex, setAppCardIndex] = useState(0);
  const [appCardDirection, setAppCardDirection] = useState(1);
  const [recipeStep, setRecipeStep] = useState(0);
  const [visibleRecipeCards, setVisibleRecipeCards] = useState(5);
  const [cookbookIndex, setCookbookIndex] = useState(0);
  const [cookbookStep, setCookbookStep] = useState(0);
  const [visibleCookbookCards, setVisibleCookbookCards] = useState(4);
  const [finderSelections, setFinderSelections] = useState<Record<string, string[]>>({
    age: [],
    mealTime: [],
    freeFrom: [],
  });
  const finderRef = useRef<HTMLFormElement | null>(null);
  const recipeTrackRef = useRef<HTMLDivElement | null>(null);
  const cookbookTrackRef = useRef<HTMLDivElement | null>(null);
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
  const maxRecipeIndex = Math.max(0, latestRecipes.length - visibleRecipeCards);
  const maxCookbookIndex = Math.max(0, bestsellingCookbooks.length - visibleCookbookCards);

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

  const moveRecipes = (step: number) => {
    setRecipeResetting(false);
    setRecipeIndex((prev) => {
      const next = prev + step;
      if (next < 0) return 0;
      if (next > maxRecipeIndex) return maxRecipeIndex;
      return next;
    });
  };

  const moveAppCard = (step: number) => {
    setAppCardDirection(step);
    setAppCardIndex((prev) => (prev + step + appFeatureCards.length) % appFeatureCards.length);
  };

  const handleRecipeNavigation = (step: number) => {
    setRecipeAutoScrollEnabled(false);
    moveRecipes(step);
  };

  const moveCookbooks = (step: number) => {
    setCookbookIndex((prev) => {
      const next = prev + step;
      if (next < 0) return 0;
      if (next > maxCookbookIndex) return maxCookbookIndex;
      return next;
    });
  };

  const handleCookbookNavigation = (step: number) => {
    moveCookbooks(step);
  };

  useEffect(() => {
    const timer = setInterval(() => moveSlide(1), 5500);
    return () => clearInterval(timer);
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
    const updateRecipeStep = () => {
      const track = recipeTrackRef.current;
      if (!track) {
        return;
      }
      const firstCard = track.querySelector<HTMLElement>(".latest-recipe-card");
      if (!firstCard) {
        return;
      }
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const cardStep = firstCard.offsetWidth + gap;
      const viewportWidth = track.parentElement?.clientWidth ?? track.clientWidth;
      const cardsVisible = Math.max(1, Math.floor((viewportWidth + gap) / cardStep));
      setRecipeStep(cardStep);
      setVisibleRecipeCards(cardsVisible);
    };

    updateRecipeStep();
    window.addEventListener("resize", updateRecipeStep);
    return () => window.removeEventListener("resize", updateRecipeStep);
  }, []);

  useEffect(() => {
    setRecipeIndex((prev) => Math.min(prev, maxRecipeIndex));
  }, [maxRecipeIndex]);

  useEffect(() => {
    const updateCookbookStep = () => {
      const track = cookbookTrackRef.current;
      if (!track) return;
      const firstCard = track.querySelector<HTMLElement>(".cookbook-card");
      if (!firstCard) return;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const cardStep = firstCard.offsetWidth + gap;
      const viewportWidth = track.parentElement?.clientWidth ?? track.clientWidth;
      const cardsVisible = Math.max(1, Math.floor((viewportWidth + gap) / cardStep));
      setCookbookStep(cardStep);
      setVisibleCookbookCards(cardsVisible);
    };

    updateCookbookStep();
    window.addEventListener("resize", updateCookbookStep);
    return () => window.removeEventListener("resize", updateCookbookStep);
  }, []);

  useEffect(() => {
    setCookbookIndex((prev) => Math.min(prev, maxCookbookIndex));
  }, [maxCookbookIndex]);

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
    if (maxRecipeIndex <= 0 || !recipeAutoScrollEnabled) {
      return;
    }

    const timer = setInterval(() => {
      setRecipeIndex((prev) => {
        if (prev >= maxRecipeIndex) {
          setRecipeResetting(true);
          return 0;
        }
        return prev + 1;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, [maxRecipeIndex, recipeAutoScrollEnabled]);

  useEffect(() => {
    if (!recipeResetting) {
      return;
    }
    const resetStateTimer = window.setTimeout(() => {
      setRecipeResetting(false);
    }, 2000);
    return () => window.clearTimeout(resetStateTimer);
  }, [recipeResetting]);

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

  const finderOptions = {
    age: ["Select age", "First Foods", "6 Months +", "9 Months +", "12 Months +", "18 Months +", "Family"],
    mealTime: ["Select time", "Weaning", "Breakfast", "Snacks", "Main Meals", "Desserts"],
    freeFrom: ["Select type", "Plant-based", "Vegetarian", "Dairy-free", "Egg-free", "Gluten-free"],
  };

  const toggleSelection = (key: "age" | "mealTime" | "freeFrom", option: string) => {
    if (option.startsWith("Select ")) {
      return;
    }
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
            className="absolute bottom-4 right-4 inline-flex items-center gap-3 rounded-[20px] bg-[#efefef] px-4 py-2.5 [font-family:var(--font-montserrat)] text-[16px] font-medium text-[#6a8796] md:bottom-5 md:right-5 md:px-5 md:py-3 md:text-[16px]"
          >
            <span className="text-[16px] text-[#6a8796]">Discover</span>
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#74a6b6] text-white md:h-12 md:w-12"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.6] md:h-5 md:w-5">
                <path d="M9 5L16 12L9 19" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <main className="max-md:pb-16">
      <section className="hero-showcase container mt-10!">
        <article className="hero-slider-shell">
          <div className="hero-copy-panel" style={{ backgroundColor: theme.panelColor }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`copy-${activeSlide}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="hero-copy-content"
              >
                <h1>{current.title}</h1>
                <p>{current.subtitle}</p>
                <a
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: theme.buttonColor }}
                >
                  {current.cta}
                  <span aria-hidden>→</span>
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
                initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </AnimatePresence>

            <div className="hero-nav-buttons">
              <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous slide" className="prev">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.5 5L8 11.5L14.5 18" />
                </svg>
              </button>
              <button type="button" onClick={() => moveSlide(1)} aria-label="Next slide" className="next">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.5 5L16 11.5L9.5 18" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="recipe-finder container">
        <form className="finder-row" ref={finderRef}>
          <label>
            Recipe
            <input type="search" placeholder="Search recipes" />
          </label>
          <div className={`finder-dropdown ${openFinderMenu === "age" ? "open" : ""}`}>
            <button type="button" onClick={() => setOpenFinderMenu((current) => (current === "age" ? null : "age"))}>
              <span className="finder-title">Age</span>
              <span className="finder-value">{displaySelection("age", "Select age")}</span>
            </button>
            <div className="finder-dropdown-panel">
              {finderOptions.age.map((option) => (
                <label key={option}>
                  <span>{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.age.includes(option)}
                    onChange={() => toggleSelection("age", option)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className={`finder-dropdown ${openFinderMenu === "mealTime" ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpenFinderMenu((current) => (current === "mealTime" ? null : "mealTime"))}
            >
              <span className="finder-title">Meal Time</span>
              <span className="finder-value">{displaySelection("mealTime", "Select time")}</span>
            </button>
            <div className="finder-dropdown-panel">
              {finderOptions.mealTime.map((option) => (
                <label key={option}>
                  <span>{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.mealTime.includes(option)}
                    onChange={() => toggleSelection("mealTime", option)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className={`finder-dropdown ${openFinderMenu === "freeFrom" ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpenFinderMenu((current) => (current === "freeFrom" ? null : "freeFrom"))}
            >
              <span className="finder-title">Free From</span>
              <span className="finder-value">{displaySelection("freeFrom", "Select type")}</span>
            </button>
            <div className="finder-dropdown-panel">
              {finderOptions.freeFrom.map((option) => (
                <label key={option}>
                  <span>{option}</span>
                  <input
                    type="checkbox"
                    checked={finderSelections.freeFrom.includes(option)}
                    onChange={() => toggleSelection("freeFrom", option)}
                  />
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="finder-submit" aria-label="Search recipes">
            🔍
          </button>
        </form>
      </section>

      <section className="latest-recipes">
        <div className="latest-recipes-inner">
          <div className="heading latest-recipes-heading">
            <h4 className="latest-recipes-title">Latest recipes</h4>
            <p className="latest-recipes-subtitle">Recipes for every age, stage and occasion</p>
          </div>
          <div className="latest-recipes-carousel">
            <motion.div
              ref={recipeTrackRef}
              className="latest-recipes-track"
              animate={{ x: -(recipeIndex * recipeStep) }}
              transition={recipeResetting ? { duration: 4 } : { duration: 7, ease: [0.22, 1, 0.36, 1] }}
            >
              {latestRecipes.map((recipe) => (
                <article key={recipe.title} className="latest-recipe-card">
                  <a href={recipe.href} target="_blank" rel="noreferrer">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                  </a>
                  <p>{recipe.duration}</p>
                  <h3>{recipe.title}</h3>
                </article>
              ))}
            </motion.div>
            <div className="latest-carousel-controls">
              {recipeIndex > 0 ? (
                <button className="relative top-[20px]" type="button" onClick={() => handleRecipeNavigation(-1)} aria-label="Previous recipes">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.5 5L8 11.5L14.5 18" />
                  </svg>
                </button>
              ) : (
                <span />
              )}
              {recipeIndex < maxRecipeIndex ? (
                <button className="relative top-[20px]" type="button" onClick={() => handleRecipeNavigation(1)} aria-label="Next recipes">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9.5 5L16 11.5L9.5 18" />
                  </svg>
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
          <div className="latest-recipes-cta">
            <a
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#b74772]  px-4 py-2 text-base font-semibold text-white shadow-[0_6px_16px_rgba(183,71,114,0.24)] transition-colors hover:bg-[#a53f67]"
              href="/recipes"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-white font-normal tracking-[0.5px]">See all recipes</span>
              <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-white text-xl leading-none text-[#b74772]" aria-hidden>
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[760px] overflow-hidden py-22 md:min-h-[820px] md:py-14 lg:min-h-[860px] lg:py-22"
      >
        <img
          src={backgroundImage.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-1 mx-auto grid w-full max-w-[980px] grid-cols-1 items-start gap-10 px-4 md:px-6 lg:grid-cols-[0.92fr_1fr]">
          <article className="mx-auto flex w-full max-w-[410px] flex-col items-center gap-4 pt-2 text-center [font-family:var(--font-montserrat)] lg:mx-0 lg:max-w-none lg:items-start lg:gap-5 lg:pt-6 lg:text-left">
            <div className="flex w-full items-end justify-center gap-3 md:gap-5 lg:justify-start">
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
            <h2 className="text-center text-[32px] mt-3 leading-[1.08] tracking-[-0.02em] text-[#15131a] md:text-[38px] lg:text-left lg:text-[40px]">
              <span className="[font-family:var(--font-playfair)] font-[500]">Annabel&apos;s </span>
              <span className="[font-family:var(--font-playfair)] font-[500]">#1 recipe app</span>
            </h2>
            <ul className="w-full space-y-4 mt-3 text-[14px] font-semibold leading-[1.45] text-[#1f1d23] md:text-[15px] lg:text-left">
              {appSectionContent.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start justify-center gap-2.5 lg:justify-start">
                  <span className="mt-0.5 flex shrink-0 text-[#494747]" aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" className="h-5 w-5">
                      <path
                        d="M30 9L13.5 25.5L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
           <div className="w-full flex items-center justify-center">
           <a
              href={appSectionContent.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2.5 self-center rounded-[10px] bg-[#b74772] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#a23d63] lg:self-start"
            >
              <span className="text-white font-normal text-[18px] md:text-[20px]">{appSectionContent.ctaLabel}</span>
              <span className="inline-grid h-6 w-6 shrink-0 place-items-center rounded-[8px] bg-white text-[15px] text-[#b74772]" aria-hidden>
                →
              </span>
            </a>
           </div>
          </article>

          <article className="relative mx-auto w-full max-w-[380px] pt-1 md:max-w-[420px] lg:justify-self-end lg:pt-0">
            <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#efe8ea] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px]">
              <AnimatePresence mode="wait" custom={appCardDirection}>
                <motion.img
                  key={`app-card-${appCardIndex}`}
                  src={currentAppCard.image}
                  alt={currentAppCard.title}
                  initial={{ opacity: 0, x: appCardDirection > 0 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: appCardDirection > 0 ? -20 : 20 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="block h-auto w-full max-w-full object-contain max-h-[min(68dvh,520px)] sm:max-h-[min(70dvh,560px)]"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="[font-family:var(--font-montserrat)] text-[22px] font-bold leading-[1.05] md:text-[24px]">
                  {currentAppCard.title}
                </h3>
                <p className="mt-1 max-w-[280px] text-[12px] leading-[1.25] md:text-[13px]">{currentAppCard.subtitle}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 pr-1 lg:justify-end">
              <button
                type="button"
                onClick={() => moveAppCard(-1)}
                aria-label="Previous app feature"
                className="inline-grid h-8 w-8 place-items-center rounded-full border border-[#b34769]/35 bg-white text-[#b34769] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-colors hover:border-[#b34769]/55 hover:bg-[#fdf6f8]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.8]">
                  <path d="M14.5 5L8 11.5L14.5 18" />
                </svg>
              </button>
              {appFeatureCards.map((_, index) => (
                <button
                  key={`app-dot-${index}`}
                  type="button"
                  onClick={() => moveAppCard(index - appCardIndex)}
                  aria-label={`Go to app feature ${index + 1}`}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === appCardIndex
                      ? "bg-[#b34769] shadow-sm"
                      : "bg-[#c9bcc2] hover:bg-[#a898a2]"
                  }`}
                />
              ))}
            </div>
          </article>
        </div>
        <div className="relative z-[1] mx-auto mt-5 grid w-full max-w-[980px] items-center gap-10 px-4 md:mt-5 md:px-6 lg:grid-cols-[1fr_0.88fr] lg:gap-14">
          <div className="relative order-2 mx-auto w-full max-w-[380px] md:max-w-[420px] lg:order-1 lg:justify-self-start">
            <img
              src="/home page/Pancake-Traybake-776x1024-optimized.webp"
              alt="Pancake Traybake"
              className="w-full rounded-[14px] object-cover"
            />
            <div className="absolute bottom-3 left-3 rounded-[9px] bg-white/95 px-3.5 py-2 shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
              <p className="[font-family:var(--font-montserrat)] text-[10px] font-semibold text-[#1f1d23]">Pancake Traybake</p>
              <p className="mt-0.5 text-[9px] text-[#6f6973]">25 Mins</p>
            </div>
          </div>
          <div className="order-1 mx-auto flex w-full max-w-[320px] flex-col items-center justify-center gap-y-[8px] text-center lg:order-2 lg:mt-2 lg:max-w-[340px] lg:justify-self-center lg:text-left">
            <p className="[font-family:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8d4a67]">EXCLUSIVE</p>
            <h2 className="mt-2 [font-family:var(--font-playfair)] text-center [font-family:var(--font-playfair)] text-[34px] leading-[1.05] font-[500] text-[#1f1b24] md:text-[42px]">
              App recipe of the week
            </h2>
            <p className="mt-4 [font-family:var(--font-montserrat)] text-center text-[13px] leading-[1.45] text-[#4f4a54] md:text-[14px]">
              Get this tasty recipe fresh from Annabel&apos;s kitchen direct to your inbox.
            </p>
            <a
              href="/recipe-app"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#b74772] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#a23d63]"
            >
              <span className="text-white font-normal text-[18px] md:text-[20px]">Get the recipe</span>
              <span className="inline-grid h-6 w-6 place-items-center rounded-[8px] bg-white text-[15px] text-[#b74772]" aria-hidden>
                →
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
        <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h2 className="[font-family:var(--font-playfair)] text-[2rem] text-center tracking-[1px] font-[600] leading-[1.15] tracking-[-0.02em] text-[#111] md:text-[2.125rem] lg:text-[2.375rem]">
            Annabel&apos;s expert ranges
          </h2>
          <p className="mt-5 max-w-[420px] text-pretty [font-family:var(--font-montserrat)] text-[1.44rem] text-center font-normal leading-[1.45] text-[#6b6568] md:mt-6 md:text-[1.05rem] lg:text-[15px]">
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
              className="flex min-w-max cursor-grab touch-pan-x items-center gap-x-5 pr-12 will-change-transform select-none active:cursor-grabbing"
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
                  className="h-[7rem] w-auto max-h-[8.25rem] max-w-[min(12rem,42vw)] shrink-0 object-contain"
                  draggable={false}
                />
              ))}
            </motion.div>
          </div>
          <div className="mt-12 hidden w-full max-w-[1140px] flex-wrap items-center justify-center gap-x-8 gap-y-10 md:mt-[32px] md:flex md:gap-x-10 lg:mt-[24px] lg:gap-x-8">
            {awardLogos.map((logo) => (
              <img
                key={logo}
                src={logo}
                alt=""
                aria-hidden
                className="h-[5.25rem] w-auto max-h-[6rem] max-w-[min(10.5rem,32vw)] object-contain md:h-[5.75rem] md:max-h-[6.5rem] md:max-w-[min(11rem,28vw)] lg:h-[6.5rem] lg:max-h-[7rem]"
              />
            ))}
          </div>
          <div className="mt-10 grid w-full max-w-[800px] grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
            {expertRangeCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-[12px] bg-[#f7f4ea]">
                <a href={card.href} target="_blank" rel="noreferrer" className="block">
                  <img src={card.image} alt={card.title} className="h-[400px] w-full object-cover md:h-[400px]" />
                </a>
                <div className="flex items-center justify-between px-4 py-5 md:px-5">
                  <h3 className="[font-family:var(--font-playfair)] text-[26px] leading-[1.1] text-[#212023] md:text-[30px] font-[500]">
                    {card.title}
                  </h3>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#8a8776] px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#7b7869]"
                  >
                    <span className="text-white font-normal">Explore</span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-white text-[#8a8776]" aria-hidden>
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.6]">
                        <path d="M9 5L16 12L9 19" />
                      </svg>
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
          <h3 className="[font-family:var(--font-playfair)] text-[40px] text-center tracking-[1px] font-[800] leading-[1.3] text-[#161418] md:text-[42px]">
            Bestselling cookbooks
          </h3>
          <p className="mx-auto mt-6 max-w-[700px] [font-family:var(--font-montserrat)] text-[23px] leading-[1.3] text-[#444344] md:text-[24px]">
            From weaning to kids cooking and quick and easy family meals, Annabel&apos;s delicious, nutritious and simple
            recipe books are a household staple.
          </p>

          <div className="relative mt-18 overflow-hidden px-6 md:px-8 lg:px-12">
            <motion.div
              ref={cookbookTrackRef}
              className="flex gap-8 will-change-transform"
              animate={{ x: -(cookbookIndex * cookbookStep) }}
              transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
            >
              {bestsellingCookbooks.map((book) => (
                <article key={book.title} className="cookbook-card shrink-0 basis-[340px]">
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[300px] cursor-pointer items-center justify-center rounded-[30px] bg-[#ecdde0] px-6 py-2"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-[400px] w-auto max-w-[84%] bg-[#ecdde0] object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </a>
                  <h4 className="mt-4 px-2 text-center [font-family:var(--font-montserrat)] text-[20px] font-bold leading-[1.32] text-[#25222a]">
                    {book.title}
                  </h4>
                </article>
              ))}
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 top-[41%] flex -translate-y-1/2 justify-between px-1 md:px-2">
              {cookbookIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => handleCookbookNavigation(-1)}
                  aria-label="Previous cookbooks"
                  className="pointer-events-auto inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#b34769] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
                    <path d="M14.5 5L8 11.5L14.5 18" />
                  </svg>
                </button>
              ) : (
                <span />
              )}
              {cookbookIndex < maxCookbookIndex ? (
                <button
                  type="button"
                  onClick={() => handleCookbookNavigation(1)}
                  aria-label="Next cookbooks"
                  className="pointer-events-auto inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#b34769] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
                    <path d="M9.5 5L16 11.5L9.5 18" />
                  </svg>
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <a
              href="/our-products/cookbooks"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[10px] bg-[#b34769] px-6 py-3 [font-family:var(--font-montserrat)] text-[15px] font-semibold text-white transition-colors hover:bg-[#9e3f5f]"
            >
              <span className="text-white font-[500] text-[20px] md:text-[24px]">Discover all cookbooks</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[10px] bg-white text-[#b34769]" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.6]">
                  <path d="M9 5L16 12L9 19" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-transparent py-10 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-none px-0">
          <h3 className="text-center [font-family:var(--font-playfair)] text-[34px] font-medium leading-[1.1] text-[#17141b] md:text-[42px]">
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

          <div className="mt-9 hidden overflow-hidden md:block">
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
          <h3 className="[font-family:var(--font-playfair)] text-[40px] font-bold leading-[1.1] text-[#19161d] md:text-[52px]">
            Partner with us
          </h3>
          <p className="mx-auto mt-4 max-w-[600px] [font-family:var(--font-montserrat)] text-[23px] leading-[1.55] text-[#5d5660] md:text-[22px]">
            Partner with Annabel Karmel to connect your brand with young families through trusted, impactful collaborations.
          </p>
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex w-fit items-center gap-3 self-center rounded-[20px] bg-[#73a3b0] px-5 py-3 [font-family:var(--font-montserrat)] text-[16px] font-semibold text-white transition-colors hover:bg-[#6697a5]"
          >
            <span className="text-white font-[400] text-[22px] md:text-[24px]">Get in touch</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-white text-[#73a3b0]" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.4]">
                <path d="M9 5L16 12L9 19" />
              </svg>
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
