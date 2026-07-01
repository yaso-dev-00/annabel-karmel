"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { ProductHeroImage } from "@/components/UiPrimitives/ProductHeroImage";
import {
  SectionBackgroundImage,
  SingleSectionBackgroundImage,
} from "@/components/UiPrimitives/SectionBackgroundImage";
import { CAROUSEL_SLIDE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import type {
  FrozenProductAccordionItem,
  FrozenProductPageData,
} from "@/data/frozen-product-page";
import styles from "./frozen-product-page.module.css";

const PREPARE_LABELS = ["Microwave (800W):", "Microwave:", "Oven:"] as const;

function renderInlineBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
  );
}

function renderAccordionParagraph(paragraph: string) {
  if (
    paragraph.startsWith("Made in a nut") ||
    paragraph.startsWith("Caution:") ||
    paragraph.startsWith("Made with British") ||
    paragraph === "190°C / Fan 170°C / Gas 5" ||
    paragraph.startsWith("190°C / Fan 170°C / Gas 5") ||
    paragraph.startsWith("200°C / Fan 180°C / Gas 6") ||
    paragraph.startsWith("800W")
  ) {
    return <strong>{paragraph.trim()}</strong>;
  }

  for (const prefix of PREPARE_LABELS) {
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

  return renderInlineBold(paragraph);
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
  item: FrozenProductAccordionItem;
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

function ProductAccordion({ items }: { items: FrozenProductAccordionItem[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
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

function ProductCarousel({
  slides,
  arrowLeft,
  arrowRight,
}: {
  slides: FrozenProductPageData["carousel"];
  arrowLeft: string;
  arrowRight: string;
}) {
  const carousel = useSnapCarousel({
    itemCount: slides.length,
    cardSelector: ".frozen-product-carousel-slide",
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
      const total = slides.length;
      const wrapped = ((next % total) + total) % total;
      if (wrapped === carousel.index) return;
      carousel.animateToIndex(wrapped, CAROUSEL_SLIDE);
    },
    [carousel, slides.length],
  );

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const next = current >= slides.length - 1 ? 0 : current + 1;
      animateToIndexRef.current(next, CAROUSEL_SLIDE);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

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
            {slides.map((slide, slideIndex) => (
              <div
                key={slide.src}
                className={`frozen-product-carousel-slide ${styles.carouselSlideItem}`}
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
        <img src={arrowLeft} alt="" className={styles.carouselArrowIcon} />
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
        <img src={arrowRight} alt="" className={styles.carouselArrowIcon} />
      </button>

      <div className={styles.carouselDots}>
        {slides.map((item, dotIndex) => (
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

function heroThemeStyle(data: FrozenProductPageData): CSSProperties {
  return {
    "--hero-text-color": data.theme.heroTextColor ?? "#fff",
  } as CSSProperties;
}

const RETAILER_FALLBACK_COLOR = "#00843d";

function detailThemeStyle(data: FrozenProductPageData): CSSProperties {
  return {
    "--detail-color": data.theme.detailColor,
    "--detail-text-color": data.theme.detailTextColor ?? "#fff",
    "--cloud-left": data.assets.cloudLeft ? `url(${data.assets.cloudLeft})` : "none",
    "--cloud-right": data.assets.cloudRight ? `url(${data.assets.cloudRight})` : "none",
    "--accordion-bg": data.theme.accordionBg,
    "--section-fallback": data.theme.detailColor,
  } as CSSProperties;
}

function retailerThemeStyle(): CSSProperties {
  return {
    backgroundColor: RETAILER_FALLBACK_COLOR,
  } as CSSProperties;
}

function whyNotTryThemeStyle(data: FrozenProductPageData): CSSProperties {
  return {
    "--detail-text-color": data.theme.detailTextColor ?? "#fff",
    "--discover-btn-bg": data.theme.discoverButtonBg,
    "--discover-btn-color": data.theme.discoverButtonColor,
    "--section-fallback": data.theme.detailColor,
  } as CSSProperties;
}

function ProductHeading({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const lines = title.split("\n");

  return (
    <h1 id={id} className={className ?? styles.pageHeading}>
      {lines.map((line, index) => (
        <span key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </h1>
  );
}

export function FrozenProductPageContent({ data }: { data: FrozenProductPageData }) {
  const badgeGridClass =
    data.badges.length >= 6 ? `${styles.badgeGrid} ${styles.badgeGrid6}` : styles.badgeGrid;
  const detailClouds = Boolean(data.assets.cloudLeft && data.assets.cloudRight);

  return (
    <main className={styles.page}>
      <section
        className={`${styles.fullBleed} ${styles.heroOverlaySection}`}
        style={heroThemeStyle(data)}
        aria-label={data.heroAlt}
        aria-labelledby={data.headingId}
      >
        <ProductHeading
          id={data.headingId}
          title={data.hero.title}
          className={styles.heroOverlayHeading}
        />
        <ProductHeroImage
          desktopSrc={data.assets.heroDesktop}
          mobileSrc={data.assets.heroMobile}
          alt=""
          desktopWidth={data.hero.desktopWidth}
          desktopHeight={data.hero.desktopHeight}
          mobileWidth={data.hero.mobileWidth}
          mobileHeight={data.hero.mobileHeight}
          className={styles.heroOverlayPicture}
        />
        <p className={styles.heroOverlayIntro}>{data.hero.intro}</p>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.detailSection}`}
        style={detailThemeStyle(data)}
      >
        {data.assets.detailBg ? (
          <SectionBackgroundImage
            desktopSrc={data.assets.detailBg}
            mobileSrc={data.assets.detailBgMobile || data.assets.detailBg}
            priority
            desktopFit="cover"
            mobileLayout="fullWidth"
            desktopPosition="top center"
            mobilePosition="top center"
          />
        ) : null}
        <div className={`${styles.sectionContent} ${styles.inner} ${styles.detailInner}`}>
          <div className={styles.detailGrid}>
            <div
              className={`${styles.detailColumnCarousel}${detailClouds ? ` ${styles.carouselColumnClouds}` : ""}`}
            >
              <ProductCarousel
                slides={data.carousel}
                arrowLeft={data.assets.arrowLeft}
                arrowRight={data.assets.arrowRight}
              />
            </div>

            <div className={styles.detailContent}>
              <ul className={badgeGridClass}>
                {data.badges.map((badge) => (
                  <li key={badge.src}>
                    <img src={badge.src} alt={badge.alt} className={styles.badgeImage} loading="lazy" />
                  </li>
                ))}
              </ul>

              <p className={styles.description}>{data.description}</p>

              <ProductAccordion items={data.accordion} />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.retailerSection}`}
        // style={retailerThemeStyle()}
        aria-labelledby={`${data.slug}-retailer-heading`}
      >
        <SingleSectionBackgroundImage
          src={data.assets.retailerBg}
          fit="cover"
          position="right bottom"
          unoptimized
        />
        <div className={`${styles.sectionContent} ${styles.inner}`}>
          <div className={styles.retailerRow}>
            <h2 id={`${data.slug}-retailer-heading`} className={styles.sectionHeading}>
              {data.retailer.heading}
            </h2>
            <ul className={styles.retailerLogos}>
              {data.retailer.logos.map((logo) => (
                <li key={logo.href}>
                  <a href={logo.href} target="_blank" rel="noreferrer">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={styles.retailerLogo}
                      loading="lazy"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.whyNotTrySection}`}
        style={whyNotTryThemeStyle(data)}
        aria-labelledby={`${data.slug}-why-not-try-heading`}
      >
        <SingleSectionBackgroundImage
          src={data.assets.whyNotTryBg}
          fit="cover"
          position="top center"
         
        />
        <div className={`${styles.sectionContent} ${styles.inner}`}>
          <h2 id={`${data.slug}-why-not-try-heading`} className={styles.sectionHeading}>
            Why not try
          </h2>
          <div className={styles.relatedGrid}>
            {data.related.map((product) => (
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
