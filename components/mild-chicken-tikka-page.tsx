"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { CAROUSEL_SLIDE, useSnapCarousel } from "@/components/use-snap-carousel";
import {
  mildChickenTikkaAccordion,
  mildChickenTikkaAssets,
  mildChickenTikkaBadges,
  mildChickenTikkaCarousel,
  mildChickenTikkaDescription,
  mildChickenTikkaHero,
  mildChickenTikkaRelated,
  mildChickenTikkaRetailer,
  type MildChickenTikkaAccordionItem,
} from "@/data/mild-chicken-tikka-page";
import styles from "./mild-chicken-tikka-page.module.css";

function renderAccordionParagraph(paragraph: string) {
  if (paragraph.startsWith("Made in a nut") || paragraph.startsWith("Caution:")) {
    return <strong>{paragraph}</strong>;
  }

  if (paragraph === "190°C / Fan 170°C / Gas 5") {
    return <strong>{paragraph}</strong>;
  }

  const labeledPrefixes = ["Microwave (800W):", "Oven:"] as const;

  for (const prefix of labeledPrefixes) {
    if (paragraph.startsWith(prefix)) {
      const body = paragraph.slice(prefix.length).trimStart();
      return (
        <>
          <strong>{prefix}</strong>
          {body ? ` ${body}` : null}
        </>
      );
    }
  }

  return paragraph;
}

function AccordionChevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      className={`${styles.accordionChevron}${open ? ` ${styles.accordionChevronOpen}` : ""}`}
      width="13"
      height="17"
      viewBox="0 0 13 17"
      fill="none"
    >
      <path
        d="M0.189323 2.60138C1.04222 4.99119 2.29837 7.4608 3.27414 9.83772C4.04272 11.7119 4.69759 13.7364 5.49821 15.5682C5.65702 15.9316 5.82499 16.3073 6.26549 16.4375C6.9648 16.6443 7.72228 16.497 8.11834 15.885C8.8549 14.7493 9.68492 12.6542 10.2463 11.365C11.2966 8.95312 12.3214 6.40494 12.8142 3.82667C12.9743 2.98627 13.3939 1.37854 12.009 1.33741C11.7665 1.33004 11.5103 1.46939 11.3607 1.46694C11.2031 1.46448 10.9156 1.33741 10.6731 1.32022C10.2104 1.28769 7.52098 1.33373 7.36739 1.21157L4.47342 0.873936C3.61137 0.889896 2.49182 0.580504 1.62062 0.528325C0.977519 0.490879 0.404998 0.785538 0.142267 1.34785C-0.104126 1.87394 0.0102471 2.09984 0.189323 2.60138ZM10.1535 3.10598C8.83203 5.7616 7.88044 8.56025 6.97787 11.365L6.8452 11.3773L3.51072 3.37179L10.1535 3.10598Z"
        fill="white"
      />
    </svg>
  );
}

function ProductAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: MildChickenTikkaAccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={`${styles.accordionSummary}${open ? ` ${styles.accordionSummaryOpen}` : ""}`}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{item.title}</span>
        <AccordionChevron open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key={item.title}
            className={styles.accordionBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className={styles.accordionBodyInner}>
              {item.table ? (
                <table className={styles.nutritionTable}>
                  <thead>
                    <tr>
                      {item.table.headers.map((header) => (
                        <th key={header} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                item.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{renderAccordionParagraph(paragraph)}</p>
                ))
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ProductAccordion() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className={styles.accordion}>
      {mildChickenTikkaAccordion.map((item) => (
        <ProductAccordionItem
          key={item.title}
          item={item}
          open={openTitle === item.title}
          onToggle={() => toggle(item.title)}
        />
      ))}
    </div>
  );
}

function ProductCarousel() {
  const carousel = useSnapCarousel({
    itemCount: mildChickenTikkaCarousel.length,
    cardSelector: ".tikka-carousel-slide",
    controlsSelector: "button",
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
  });

  const indexRef = useRef(0);
  const animateToIndexRef = useRef(carousel.animateToIndex);

  indexRef.current = carousel.index;
  animateToIndexRef.current = carousel.animateToIndex;

  const goTo = useCallback(
    (next: number) => {
      const total = mildChickenTikkaCarousel.length;
      const wrapped = ((next % total) + total) % total;
      if (wrapped === carousel.index) return;
      carousel.animateToIndex(wrapped, CAROUSEL_SLIDE);
    },
    [carousel],
  );

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const next = current >= mildChickenTikkaCarousel.length - 1 ? 0 : current + 1;
      animateToIndexRef.current(next, CAROUSEL_SLIDE);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={styles.carouselStage}>
      <div className={styles.carouselFrame}>
        <div
          ref={carousel.carouselRef}
          className={styles.carouselViewport}
          aria-live="polite"
          onPointerDownCapture={carousel.handlePointerDown}
          onPointerMoveCapture={carousel.handlePointerMove}
          onPointerUpCapture={carousel.handlePointerEnd}
          onPointerCancelCapture={carousel.handlePointerEnd}
        >
          <motion.div
            ref={carousel.trackRef}
            className={styles.carouselTrack}
            style={{ x: carousel.x }}
            initial={false}
          >
            {mildChickenTikkaCarousel.map((slide, slideIndex) => (
              <div
                key={slide.src}
                className={`tikka-carousel-slide ${styles.carouselSlideItem}`}
                aria-hidden={slideIndex !== carousel.index}
                onClickCapture={carousel.handleCardClickCapture}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={styles.carouselSlide}
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                  onLoad={carousel.measure}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
        aria-label="Previous image"
        onPointerDown={(event) => {
          event.stopPropagation();
          goTo(carousel.index - 1);
        }}
      >
        <img src={mildChickenTikkaAssets.arrowLeft} alt="" className={styles.carouselArrowIcon} />
      </button>
      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
        aria-label="Next image"
        onPointerDown={(event) => {
          event.stopPropagation();
          goTo(carousel.index + 1);
        }}
      >
        <img src={mildChickenTikkaAssets.arrowRight} alt="" className={styles.carouselArrowIcon} />
      </button>

      <div className={styles.carouselDots}>
        {mildChickenTikkaCarousel.map((item, dotIndex) => (
          <button
            key={item.src}
            type="button"
            className={`${styles.carouselDot}${dotIndex === carousel.index ? ` ${styles.carouselDotActive}` : ""}`}
            aria-label={`Show image ${dotIndex + 1}`}
            aria-current={dotIndex === carousel.index ? "true" : undefined}
            onClick={() => goTo(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function WaveShapeBottom() {
  return (
    <div className={styles.shapeBottom} aria-hidden="true" data-negative="false">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          className={styles.shapeFill}
          d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
        />
      </svg>
    </div>
  );
}

export function MildChickenTikkaPageContent() {
  return (
    <main className={styles.page}>
      <section className={`${styles.fullBleed} leading-0`} aria-label="Mild chicken tikka hero">
        <picture className="block leading-0">
          <source media="(min-width: 768px)" srcSet={mildChickenTikkaAssets.heroDesktop} />
          <img
            src={mildChickenTikkaAssets.heroMobile}
            alt="Mild chicken tikka with fluffy rice"
            className="block h-auto w-full align-bottom"
            fetchPriority="high"
          />
        </picture>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.detailSection}`}
        aria-labelledby="mild-chicken-tikka-heading"
      >
        <div className={`${styles.inner} ${styles.detailInner}`}>
          <header className={styles.detailHeader}>
            <h1 id="mild-chicken-tikka-heading" className={styles.pageHeading}>
              {mildChickenTikkaHero.title}
            </h1>
            <p className={styles.detailIntro}>{mildChickenTikkaHero.intro}</p>
          </header>

          <div className={styles.detailGrid}>
            <div className={styles.detailColumnCarousel}>
              <ProductCarousel />
            </div>

            <div className={styles.detailContent}>
              <ul className={styles.badgeGrid}>
                {mildChickenTikkaBadges.map((badge) => (
                  <li key={badge.src}>
                    <img src={badge.src} alt={badge.alt} className={styles.badgeImage} loading="lazy" />
                  </li>
                ))}
              </ul>

              <p className={styles.description}>{mildChickenTikkaDescription}</p>

              <ProductAccordion />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.fullBleed} ${styles.retailerSection}`} aria-labelledby="retailer-heading">
        <div className={styles.inner}>
          <div className={styles.retailerRow}>
            <h2 id="retailer-heading" className={styles.sectionHeading}>
              {mildChickenTikkaRetailer.heading}
            </h2>
            <a href={mildChickenTikkaRetailer.logoHref} target="_blank" rel="noreferrer">
              <img
                src={mildChickenTikkaAssets.tescoLogo}
                alt="Tesco"
                className={styles.tescoLogo}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.whyNotTrySection}`}
        aria-labelledby="why-not-try-heading"
      >
        <div className={styles.inner}>
          <h2 id="why-not-try-heading" className={styles.sectionHeading}>
            Why not try
          </h2>
          <div className={styles.relatedGrid}>
            {mildChickenTikkaRelated.map((product) => (
              <article key={product.href} className={styles.relatedCard}>
                <Link href={product.href} className="block">
                  <img src={product.image} alt="" className={styles.relatedImage} loading="lazy" />
                </Link>
                <Link href={product.href} className={styles.discoverButton}>
                  discover
                </Link>
              </article>
            ))}
          </div>
        </div>
        <WaveShapeBottom />
      </section>

      <InstagramShareSection className={`${styles.fullBleed} bg-white pt-[90px] pb-10 md:pb-16`} />
    </main>
  );
}
