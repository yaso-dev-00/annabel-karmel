"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import {
  SectionBackgroundImage,
  SingleSectionBackgroundImage,
} from "@/components/UiPrimitives/SectionBackgroundImage";
import { WaysToServeCarousel } from "@/components/SharedCarousels/WaysToServeCarousel";
import { CAROUSEL_SLIDE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import type {
  PlantPoweredBitesAccordionItem,
  PlantPoweredBitesCarouselSlide,
  PlantPoweredBitesPageData,
} from "@/data/plant-powered-bites-product-page";
import styles from "./plant-powered-bites-product-page.module.css";

const PREPARE_LABELS = [
  "Cook from frozen:",
  "Pan fry:",
  "Oven:",
  "Air fryer:",
] as const;

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
  if (paragraph.startsWith("Caution:")) {
    return <strong>{paragraph.trim()}</strong>;
  }

  for (const prefix of PREPARE_LABELS) {
    if (paragraph.startsWith(prefix)) {
      const body = paragraph.slice(prefix.length).trimStart();
      return (
        <>
          <strong>{prefix}</strong>
          {body ? <> {renderInlineBold(body)}</> : null}
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
  item: PlantPoweredBitesAccordionItem;
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

      {open ? (
        <div className={styles.accordionBody}>
          <div className={styles.accordionBodyInner}>
            {item.table ? (
              <>
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
                {item.table.footnote ? (
                  <p className={styles.nutritionFootnote}>{item.table.footnote}</p>
                ) : null}
              </>
            ) : (
              item.paragraphs?.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>
                  {renderAccordionParagraph(paragraph)}
                </p>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProductAccordion({ items }: { items: PlantPoweredBitesAccordionItem[] }) {
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
  slides: PlantPoweredBitesCarouselSlide[];
  arrowLeft: string;
  arrowRight: string;
}) {
  const visibleSlides = slides.filter((slide) => slide.src.trim().length > 0);
  const carousel = useSnapCarousel({
    itemCount: visibleSlides.length,
    cardSelector: ".plant-powered-carousel-slide",
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
      const total = visibleSlides.length;
      if (total <= 0) return;
      const wrapped = ((next % total) + total) % total;
      if (wrapped === carousel.index) return;
      carousel.animateToIndex(wrapped, CAROUSEL_SLIDE);
    },
    [carousel, visibleSlides.length],
  );

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure, visibleSlides.length]);

  useEffect(() => {
    if (visibleSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const next = current >= visibleSlides.length - 1 ? 0 : current + 1;
      animateToIndexRef.current(next, CAROUSEL_SLIDE);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [visibleSlides.length]);

  if (visibleSlides.length === 0) return null;

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
            {visibleSlides.map((slide, slideIndex) => (
              <div
                key={`${slide.src}-${slideIndex}`}
                className={`plant-powered-carousel-slide ${styles.carouselSlideItem}`}
                aria-hidden={slideIndex !== carousel.index}
                onClickCapture={carousel.handleCardClickCapture}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  className={styles.carouselSlide}
                  priority={slideIndex === 0}
                  sizes="(min-width: 1024px) 580px, (min-width: 768px) 460px, 400px"
                  draggable={false}
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
        <Image src={arrowLeft} alt="" width={39} height={38} className={styles.carouselArrowIcon} />
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
        <Image src={arrowRight} alt="" width={39} height={38} className={styles.carouselArrowIcon} />
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

const RETAILER_FALLBACK_COLOR = "#00843d";

function productThemeStyle(data: PlantPoweredBitesPageData): CSSProperties {
  return {
    "--section-fallback": data.theme.detailColor,
    "--accordion-bg": data.theme.accordionBg,
    "--discover-btn-bg": data.theme.discoverButtonBg,
    "--discover-btn-color": data.theme.discoverButtonColor,
  } as CSSProperties;
}

function ProductHeading({ id, title }: { id: string; title: string }) {
  const lines = title.split("\n");

  return (
    <h1 id={id} className={styles.pageHeading}>
      {lines.map((line, index) => (
        <span key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </h1>
  );
}

export function PlantPoweredBitesProductPageContent({ data }: { data: PlantPoweredBitesPageData }) {
  return (
    <main className={styles.page}>
      <section className={`${styles.fullBleed} leading-0`} aria-label={data.heroAlt}>
        {data.assets.heroDesktop.trim() ? (
          <Image
            src={data.assets.heroDesktop}
            alt={data.heroAlt}
            width={data.hero.desktopWidth}
            height={data.hero.desktopHeight}
            priority
            className={styles.heroDesktop}
            sizes="100vw"
          />
        ) : null}
        {data.assets.heroMobile.trim() ? (
          <Image
            src={data.assets.heroMobile}
            alt={data.heroAlt}
            width={data.hero.mobileWidth}
            height={data.hero.mobileHeight}
            priority
            className={styles.heroMobile}
            sizes="100vw"
          />
        ) : null}
      </section>

      <section
        className={`${styles.fullBleed} ${styles.detailSection}`}
        style={productThemeStyle(data)}
        aria-labelledby={data.headingId}
      >
        <SectionBackgroundImage
          desktopSrc={data.assets.detailBg}
          mobileSrc={data.assets.detailBgMobile}
          priority
          desktopFit="cover"
          mobileLayout="fullWidth"
          desktopPosition="top center"
          mobilePosition="top center"
        />
        <div className={`${styles.sectionContent} ${styles.inner} ${styles.detailInner}`}>
          <header className={styles.detailHeader}>
            <ProductHeading id={data.headingId} title={data.hero.title} />
            <p className={styles.detailIntro}>{data.hero.intro}</p>
          </header>

          <div className={styles.detailGrid}>
            <div className={styles.detailColumnCarousel}>
              <ProductCarousel
                slides={data.carousel}
                arrowLeft={data.assets.arrowLeft}
                arrowRight={data.assets.arrowRight}
              />
            </div>

            <div className={styles.detailContent}>
              <div className={styles.badgeStrip}>
                {data.badges.desktop.trim() ? (
                  <Image
                    src={data.badges.desktop}
                    alt={data.badges.alt}
                    width={data.badges.desktopWidth}
                    height={data.badges.desktopHeight}
                    className={`${styles.badgeStripImage} ${styles.badgeStripDesktop}`}
                    sizes="(min-width: 768px) 600px, 0px"
                  />
                ) : null}
                {data.badges.mobile.trim() ? (
                  <Image
                    src={data.badges.mobile}
                    alt={data.badges.alt}
                    width={data.badges.mobileWidth}
                    height={data.badges.mobileHeight}
                    className={`${styles.badgeStripImage} ${styles.badgeStripMobile}`}
                    sizes="(max-width: 767px) 100vw, 0px"
                  />
                ) : null}
              </div>

              {(Array.isArray(data.description) ? data.description : [data.description]).map(
                (paragraph) => (
                  <p key={paragraph} className={styles.description}>
                    {paragraph}
                  </p>
                ),
              )}

              <ProductAccordion items={data.accordion} />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.retailerSection}`}
        // style={{ backgroundColor: RETAILER_FALLBACK_COLOR }}
        aria-labelledby={`${data.slug}-retailer-heading`}
      >
        <SingleSectionBackgroundImage
          src={data.assets.retailerBg}
          fit="cover"
          position="right bottom"
        />
        <div className={`${styles.sectionContent} ${styles.inner}`}>
          <div className={styles.retailerRow}>
            <h2 id={`${data.slug}-retailer-heading`} className={styles.sectionHeading}>
              {data.retailer.heading}
            </h2>
            <a href={data.retailer.logoHref} target="_blank" rel="noreferrer">
              {data.assets.asdaLogo.trim() ? (
                <Image
                  src={data.assets.asdaLogo}
                  alt="ASDA"
                  width={1360}
                  height={404}
                  className={styles.asdaLogo}
                  sizes="(min-width: 768px) 320px, 75vw"
                />
              ) : null}
            </a>
          </div>
        </div>
      </section>

      <WaysToServeCarousel
        items={data.waysToServe}
        headingId={`${data.slug}-ways-to-serve-heading`}
      />

      <section
        className={`${styles.fullBleed} ${styles.whyNotTrySection}`}
        style={productThemeStyle(data)}
        aria-labelledby={`${data.slug}-why-not-try-heading`}
      >
        <SingleSectionBackgroundImage
          src={data.assets.whyNotTryBg}
          fit="cover"
          position="top center"
          unoptimized={true}
         
        />
        <div className={`${styles.sectionContent} ${styles.inner}`}>
          <h2 id={`${data.slug}-why-not-try-heading`} className={styles.sectionHeading}>
            Why not try
          </h2>
          <div className={styles.relatedGrid}>
            {data.related.map((product) => (
              <article key={product.href} className={styles.relatedCard}>
                <Link href={product.href} className={styles.relatedImageLink}>
                  <Image
                    src={product.image}
                    alt=""
                    width={product.width ?? 700}
                    height={product.height ?? 753}
                    className={styles.relatedImage}
                    sizes="(min-width: 768px) 360px, 100vw"
                  />
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
