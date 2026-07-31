'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import {
  CAROUSEL_SLIDE,
  useSnapCarousel,
} from '@/components/hooks/useSnapCarousel';
import {
  australiaFrozenAssets,
  australiaFrozenCarouselSlides,
  australiaFrozenExpertMeals,
  australiaFrozenGoodness,
  australiaFrozenHero,
  australiaFrozenNew,
  australiaFrozenProducts,
  australiaFrozenPromise,
  australiaFrozenRange,
  australiaFrozenRetailers,
  australiaFrozenWhereToBuy,
  type AustraliaFrozenProduct,
} from '@/data/australia-frozen-page';
import styles from './australia-frozen-page.module.css';

type PromiseItem = (typeof australiaFrozenPromise.items)[number];

function CheckIcon() {
  return (
    <svg aria-hidden className={styles.checkIcon} viewBox="0 0 512 512">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

function PromiseItemText({ item }: { item: PromiseItem }) {
  if (typeof item === 'string') {
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

function CarouselChevron({ direction }: { direction: 'prev' | 'next' }) {
  if (direction === 'prev') {
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

function LifestyleCarousel() {
  const {
    carouselRef,
    trackRef,
    x,
    index,
    indexRef,
    measure,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleCardClickCapture,
    animateToIndex,
  } = useSnapCarousel({
    itemCount: australiaFrozenCarouselSlides.length,
    cardSelector: '.aus-frozen-slide',
    controlsSelector: 'button',
    centerSingleSlide: true,
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
  });

  const animateToIndexRef = useRef(animateToIndex);

  useLayoutEffect(() => {
    animateToIndexRef.current = animateToIndex;
  }, [animateToIndex]);

  const goTo = useCallback(
    (next: number) => {
      const total = australiaFrozenCarouselSlides.length;
      const wrapped = ((next % total) + total) % total;
      if (wrapped === index) return;
      animateToIndex(wrapped, CAROUSEL_SLIDE);
    },
    [animateToIndex, index],
  );

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = indexRef.current;
      const next =
        current >= australiaFrozenCarouselSlides.length - 1 ? 0 : current + 1;
      animateToIndexRef.current(next, CAROUSEL_SLIDE);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      ref={carouselRef}
      className={styles.carouselViewport}
      onPointerDownCapture={handlePointerDown}
      onPointerMoveCapture={handlePointerMove}
      onPointerUpCapture={handlePointerEnd}
      onPointerCancelCapture={handlePointerEnd}
    >
      <motion.div
        ref={trackRef}
        className={styles.carouselTrack}
        style={{ x }}
        initial={false}
      >
        {australiaFrozenCarouselSlides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className={`aus-frozen-slide ${styles.carouselSlide}`}
            onClickCapture={handleCardClickCapture}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={styles.carouselImage}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onLoad={measure}
            />
          </div>
        ))}
      </motion.div>

      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
        aria-label="Previous slide"
        onPointerDown={(event) => {
          event.stopPropagation();
          goTo(index - 1);
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
          goTo(index + 1);
        }}
      >
        <CarouselChevron direction="next" />
      </button>

      <p className={styles.slideCounter} aria-live="polite">
        <span className={styles.slideCounterCurrent}>{index + 1}</span>
        <span className={styles.slideCounterDivider}>/</span>
        <span className={styles.slideCounterTotal}>
          {australiaFrozenCarouselSlides.length}
        </span>
      </p>
    </div>
  );
}

function ProductCard({ product }: { product: AustraliaFrozenProduct }) {
  return (
    <article className={styles.productCard}>
      <a href={product.href} className="block">
        <figure className={styles.productSwap}>
          <img src={product.packImage} alt="" aria-hidden="true" />
          <img
            src={product.lifestyleImage}
            alt={product.title}
            className={styles.productSwapFront}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </a>
      <h3 className={styles.productTitle}>{product.title}</h3>
    </article>
  );
}

function RetailerLogos() {
  return (
    <div className={styles.retailerRow}>
      {australiaFrozenRetailers.map((retailer) => (
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
            className={
              retailer.alt === 'IGA'
                ? styles.retailerLogoIga
                : styles.retailerLogo
            }
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  );
}

export function AustraliaFrozenPageContent() {
  const pageStyle = {
    '--wood-bg': `url(${australiaFrozenAssets.woodBg})`,
    '--promise-bg': `url(${australiaFrozenAssets.promiseBg})`,
    '--annabel-bg': `url(${australiaFrozenAssets.annabelAus})`,
    '--buy-bg': `url(${australiaFrozenAssets.buyBg})`,
  } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <section className={styles.woodBand}>
        <div className={styles.pageContainer}>
          <h1 className={styles.pageTitle}>
            {australiaFrozenHero.titleLine1}
            <br />
            {australiaFrozenHero.titleLine2}
          </h1>
        </div>
      </section>

      <section className={styles.woodBand} aria-label="Expert meals in minutes">
        <div className={styles.pageContainer}>
          <div className={`${styles.splitGrid} ${styles.expertMealsRow}`}>
            <div
              className={`${styles.splitTile} ${styles.tileMint} order-2 md:order-1`}
            >
              <h2 className={styles.heading}>
                {australiaFrozenExpertMeals.headingLine1}
                <br />
                {australiaFrozenExpertMeals.headingLine2}
              </h2>
              <p className={styles.bodyCopy}>
                {australiaFrozenExpertMeals.body}
              </p>
              <img
                src={australiaFrozenAssets.signature}
                alt="Annabel Karmel signature"
                className={styles.signature}
                width={250}
                height={100}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              className={`${styles.splitTile} ${styles.tilePink} order-1 md:order-2`}
            >
              <LifestyleCarousel />
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.woodBand}
        aria-labelledby="aus-frozen-promise-heading"
      >
        <div className={styles.pageContainer}>
          <div className={styles.splitGrid}>
            <div className={`${styles.splitTile} ${styles.tilePromise}`}>
              <h2 id="aus-frozen-promise-heading" className={styles.heading}>
                {australiaFrozenPromise.heading}
              </h2>
              <ul className={styles.promiseList}>
                {australiaFrozenPromise.items.map((item) => (
                  <li
                    key={typeof item === 'string' ? item : item.lines.join('-')}
                    className={styles.promiseItem}
                  >
                    <CheckIcon />
                    <PromiseItemText item={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.goodnessTile} px-[20px] md:px-[60px]!`}>
              <h2 className={styles.heading}>
                <br />
                {australiaFrozenGoodness.headingLine1}{' '}
                {australiaFrozenGoodness.headingLine2}
              </h2>
              <p className={styles.bodyCopy}>{australiaFrozenGoodness.body}</p>
              <img
                src={australiaFrozenAssets.goodnessCharacters}
                alt=""
                aria-hidden="true"
                className={styles.goodnessArt}
                width={520}
                height={450}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.woodBand} aria-label="New for 2024">
        <div className={styles.pageContainer}>
          <div className={styles.splitGrid}>
            <div
              className={`${styles.splitTile} ${styles.tileYellow} order-2 md:order-1`}
            >
              <h2 className={styles.heading}>{australiaFrozenNew.heading}</h2>
              <p className={styles.bodyCopy}>{australiaFrozenNew.body}</p>
            </div>
            <div
              className={`${styles.splitTile} ${styles.tileAnnabel} order-1 md:order-2`}
              role="img"
              aria-label="Annabel Karmel with Little Meals products"
            />
          </div>
        </div>
      </section>

      <section
        className={` ${styles.rangeSection}`}
        aria-labelledby="aus-frozen-range-heading"
      >
        <div className={styles.pageContainerPadded}>
          <h2 id="aus-frozen-range-heading" className={styles.heading}>
            {australiaFrozenRange.heading}
          </h2>
          <p className={styles.rangeSubtitle}>
            {australiaFrozenRange.subtitle}
          </p>
          <RetailerLogos />
        </div>
      </section>

      <div className={styles.pageContainerPadded}>
        <div className={styles.productGrid}>
          {australiaFrozenProducts.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      </div>

      <section aria-labelledby="aus-frozen-buy-heading">
        <div className={styles.pageContainer}>
          <div className={styles.splitGrid}>
            <div
              className={`${styles.splitTile} ${styles.tileBuyPhoto} order-2 md:order-1`}
              role="img"
              aria-label="Annabel Karmel Little Meals range"
            />
            <div
              className={`${styles.splitTile} ${styles.tileBuyCopy} order-1 md:order-2`}
            >
              <h2 id="aus-frozen-buy-heading" className={styles.heading}>
                {australiaFrozenWhereToBuy.heading}
              </h2>
              <p className={styles.bodyCopy}>
                {australiaFrozenWhereToBuy.bodyLine1}
                <br />
                {australiaFrozenWhereToBuy.bodyLine2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.pageContainerPadded}>
        <RetailerLogos />
      </div>

      <InstagramShareSection className="bg-white pb-10 pt-10 md:pb-16 md:pt-18" />
    </main>
  );
}
