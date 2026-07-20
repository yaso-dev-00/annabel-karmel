"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { CAROUSEL_SLIDE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import type { AustraliaFrozenProductPageData } from "@/data/australia-frozen-product-page";
import {
  australiaFrozenProductPromise,
  australiaFrozenProductRange,
  australiaFrozenProductSharedAssets,
  australiaFrozenProductWhereToBuy,
  getAustraliaFrozenProductRetailers,
} from "@/data/australia-frozen-product-page";
import styles from "./australia-frozen-product-page.module.css";

type PromiseItem = (typeof australiaFrozenProductPromise.items)[number];

function renderInlineBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden className={styles.checkIcon} viewBox="0 0 512 512">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

function PromiseItemText({ item }: { item: PromiseItem }) {
  if (typeof item === "string") {
    return <span>{item}</span>;
  }

  return (
    <span>
      {item.lines.map((line, index) => (
        <span key={line}>
          {line}
          {index < item.lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </span>
  );
}

function CarouselChevron({ direction }: { direction: "prev" | "next" }) {
  if (direction === "prev") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={styles.carouselArrowIcon}>
        <path
          d="M14.5 5.5 8 12l6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={styles.carouselArrowIcon}>
      <path
        d="M9.5 5.5 16 12l-6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductCarousel({
  slides,
}: {
  slides: AustraliaFrozenProductPageData["carousel"];
}) {
  const visibleSlides = slides.filter((slide) => slide.src.trim().length > 0);
  const carousel = useSnapCarousel({
    itemCount: visibleSlides.length,
    cardSelector: ".au-product-slide",
    controlsSelector: "button",
    centerSingleSlide: true,
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
    <div
      ref={carousel.carouselRef}
      className={styles.carouselViewport}
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
            className={`au-product-slide ${styles.carouselSlide}`}
            onClickCapture={carousel.handleCardClickCapture}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={styles.carouselImage}
              loading={slideIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onLoad={carousel.measure}
            />
          </div>
        ))}
      </motion.div>

      {visibleSlides.length > 1 ? (
        <>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
            aria-label="Previous slide"
            onPointerDown={(event) => {
              event.stopPropagation();
              goTo(carousel.index - 1);
            }}
          >
            <CarouselChevron direction="prev" />
          </button>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
            aria-label="Next slide"
            onPointerDown={(event) => {
              event.stopPropagation();
              goTo(carousel.index + 1);
            }}
          >
            <CarouselChevron direction="next" />
          </button>

          <p className={styles.slideCounter} aria-live="polite">
            <span className={styles.slideCounterCurrent}>{carousel.index + 1}</span>
            <span>/</span>
            <span>{visibleSlides.length}</span>
          </p>
        </>
      ) : null}
    </div>
  );
}

function AccordionPanel({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={`${styles.accordionSummary}${open ? ` ${styles.accordionSummaryOpen}` : ""}`}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{title}</span>
        <svg
          aria-hidden
          className={styles.accordionChevron}
          viewBox={open ? "0 0 448 512" : "0 0 320 512"}
        >
          {open ? (
            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
          ) : (
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          )}
        </svg>
      </button>

      {open ? (
        <div className={styles.accordionBody}>
          <div className={styles.accordionBodyInner}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}

function RetailerLogos({
  retailers,
}: {
  retailers: ReturnType<typeof getAustraliaFrozenProductRetailers>;
}) {
  return (
    <div className={styles.retailerRow}>
      {retailers.map((retailer) => (
        <a
          key={retailer.alt}
          href={retailer.href}
          target="_blank"
          rel="noreferrer"
          className={styles.retailerLink}
        >
          <img
            src={retailer.src}
            alt={retailer.alt}
            className={retailer.alt === "IGA" ? styles.retailerLogoIga : styles.retailerLogo}
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  );
}

export function AustraliaFrozenProductPageContent({
  data,
}: {
  data: AustraliaFrozenProductPageData;
}) {
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const retailers = getAustraliaFrozenProductRetailers(data.retailers);

  const pageStyle = {
    "--wood-bg": `url(${australiaFrozenProductSharedAssets.woodBg})`,
    "--promise-bg": `url(${australiaFrozenProductSharedAssets.promiseBg})`,
    "--promise-photo": `url(${australiaFrozenProductSharedAssets.promisePhoto})`,
    "--buy-bg": `url(${australiaFrozenProductSharedAssets.buyBg})`,
  } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <section className={styles.woodBand}>
        <div className={styles.pageContainer}>
          <h1 className={styles.pageTitle}>{data.title}</h1>
        </div>
      </section>

      <section className={styles.woodBand} aria-label={data.title}>
        <div className={styles.pageContainer}>
          <div className={styles.splitGrid}>
            <div className={`${styles.splitTile} ${styles.tileCarousel} order-1 md:order-1`}>
              <ProductCarousel slides={data.carousel} />
            </div>
            <div className={`${styles.splitTile} ${styles.tileDescription} order-2 md:order-2`}>
              {data.description.map((paragraph) => (
                <p key={paragraph} className={styles.bodyCopy}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.woodBand} aria-labelledby="au-product-range-heading">
        <div className={`${styles.pageContainerPadded} ${styles.rangeSection}`}>
          <h2 id="au-product-range-heading" className={styles.heading}>
            {australiaFrozenProductRange.heading}
          </h2>
          <p className={styles.rangeSubtitle}>{australiaFrozenProductRange.subtitle}</p>
          <RetailerLogos retailers={retailers} />
        </div>
      </section>

      <section className={styles.woodBand} aria-labelledby="au-product-promise-heading">
        <div className={styles.pageContainer}>
          <div className={styles.splitGrid}>
            <div className={`${styles.splitTile} ${styles.tilePromise}`}>
              <h2 id="au-product-promise-heading" className={styles.heading}>
                {australiaFrozenProductPromise.heading}
              </h2>
              <ul className={styles.promiseList}>
                {australiaFrozenProductPromise.items.map((item) => (
                  <li
                    key={typeof item === "string" ? item : item.lines.join("-")}
                    className={styles.promiseItem}
                  >
                    <CheckIcon />
                    <PromiseItemText item={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`${styles.splitTile} ${styles.tilePromisePhoto} order-1 md:order-2`}
              role="img"
              aria-label="Annabel Karmel with Little Meals products"
            />
          </div>
        </div>
      </section>

      <section className={styles.woodBand} aria-label="Product information">
        <div className={`${styles.pageContainerPadded} ${styles.accordionSection}`}>
          <div className={styles.accordionGrid}>
            <AccordionPanel
              title="I N G R E D I E N T S"
              open={ingredientsOpen}
              onToggle={() => setIngredientsOpen((current) => !current)}
            >
              {data.ingredients.map((paragraph) => (
                <p key={paragraph}>{renderInlineBold(paragraph)}</p>
              ))}
            </AccordionPanel>

            <AccordionPanel
              title="N U T R I T I O N"
              open={nutritionOpen}
              onToggle={() => setNutritionOpen((current) => !current)}
            >
              <table className={styles.nutritionTable}>
                <thead>
                  <tr>
                    {data.nutrition.headers.map((header) => (
                      <th key={header} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.nutrition.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionPanel>
          </div>
        </div>
      </section>

      <section aria-labelledby="au-product-buy-heading">
        <div className={styles.pageContainer}>
          <div className={styles.splitGrid}>
            <div
              className={`${styles.splitTile} ${styles.tileBuyPhoto} order-2 md:order-1`}
              role="img"
              aria-label="Annabel Karmel Little Meals range"
            />
            <div className={`${styles.splitTile} ${styles.tileBuyCopy} order-1 md:order-2`}>
              <h2 id="au-product-buy-heading" className={styles.heading}>
                {australiaFrozenProductWhereToBuy.heading}
              </h2>
              <p className={styles.bodyCopy}>
                {australiaFrozenProductWhereToBuy.bodyLine1}
                <br />
                {australiaFrozenProductWhereToBuy.bodyLine2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={`${styles.pageContainerPadded} ${styles.retailerSectionBottom}`}>
        <RetailerLogos retailers={retailers} />
      </div>

      <InstagramShareSection className="bg-white pb-10 pt-10 md:pb-16 md:pt-18" />
    </main>
  );
}
