"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { TablewareFeaturesSection } from "@/components/ProductScreen/tableware/TablewareFeaturesSection";
import { TablewareProductCard } from "@/components/ProductScreen/tableware/TablewareProductCard";
import { CAROUSEL_DRAG_RELEASE, CAROUSEL_SLIDE, useSnapCarousel } from "@/components/hooks/useSnapCarousel";
import type { TablewareProductPageData } from "@/data/tableware-product-page";
import {
  getCompleteSetProducts,
  tablewareProductSharedAssets,
} from "@/data/tableware-product-page";
import { tablewareProductHref, tablewareAssets } from "@/data/tableware-page";
import type { TablewareProduct, TablewareSwatchColor } from "@/data/tableware-page";
import styles from "./tableware-product-page.module.css";

const SWATCH_BORDER: Record<TablewareSwatchColor, string> = {
  "soft-sage": "#b4c7a3",
  "warm-stone": "#f0e1da",
  blushberry: "#bc7f7a",
};

function GalleryChevron({
  direction,
  iconClassName,
  strokeWidth,
}: {
  direction: "prev" | "next";
  iconClassName?: string;
  strokeWidth?: number;
}) {
  const iconClass = iconClassName ?? styles.galleryNavIcon;
  const stroke = strokeWidth ?? (direction === "prev" ? 2.25 : 2.5);
  if (direction === "prev") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={iconClass}>
        <path
          d="M14.5 5.5 8 12l6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={iconClass}>
      <path
        d="M9.5 5.5 16 12l-6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductGallery({ images }: { images: TablewareProductPageData["gallery"] }) {
  const carousel = useSnapCarousel({
    itemCount: images.length,
    cardSelector: ".tableware-gallery-slide",
    controlsSelector: "button",
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
    dragReleaseTransition: CAROUSEL_DRAG_RELEASE,
  });
  const [isThumbsDragging, setIsThumbsDragging] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const thumbButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const animateToIndexRef = useRef(carousel.animateToIndex);
  const measureRef = useRef(carousel.measure);
  const indexRef = useRef(carousel.index);
  const thumbDragRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
    pressedIndex: -1,
  });
  const thumbScrollVelocityRef = useRef(0);
  const thumbLastSampleRef = useRef({ x: 0, t: 0 });
  const thumbMomentumRafRef = useRef<number | null>(null);

  const stopThumbMomentum = useCallback(() => {
    if (thumbMomentumRafRef.current !== null) {
      window.cancelAnimationFrame(thumbMomentumRafRef.current);
      thumbMomentumRafRef.current = null;
    }
  }, []);

  animateToIndexRef.current = carousel.animateToIndex;
  measureRef.current = carousel.measure;
  indexRef.current = carousel.index;

  const selectSlide = useCallback((index: number) => {
    if (index < 0 || index >= images.length || index === indexRef.current) {
      return;
    }

    measureRef.current();
    window.requestAnimationFrame(() => {
      measureRef.current();
      animateToIndexRef.current(index, CAROUSEL_SLIDE);
    });
  }, [images.length]);

  const goTo = useCallback(
    (next: number) => {
      const total = images.length;
      selectSlide(((next % total) + total) % total);
    },
    [images.length, selectSlide],
  );

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure, images.length]);

  useEffect(() => {
    const thumb = thumbButtonRefs.current[carousel.index];
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [carousel.index]);

  useEffect(() => {
    return () => stopThumbMomentum();
  }, [stopThumbMomentum]);

  const onThumbsPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = thumbsRef.current;
    if (!element) return;

    stopThumbMomentum();
    thumbScrollVelocityRef.current = 0;
    thumbLastSampleRef.current = { x: event.clientX, t: performance.now() };

    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-thumb-index]");
    const pressedIndex = button ? Number(button.dataset.thumbIndex) : -1;

    thumbDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
      isDragging: false,
      pressedIndex,
    };
  }, [stopThumbMomentum]);

  const onThumbsPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = thumbDragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const element = thumbsRef.current;
    if (!element) return;

    const deltaX = event.clientX - state.startX;
    if (!state.isDragging && Math.abs(deltaX) > 4) {
      state.isDragging = true;
      state.pressedIndex = -1;
      setIsThumbsDragging(true);
      element.setPointerCapture(event.pointerId);
    }

    if (state.isDragging) {
      const now = performance.now();
      const lastSample = thumbLastSampleRef.current;
      const elapsed = now - lastSample.t;
      if (elapsed > 0 && elapsed < 40) {
        thumbScrollVelocityRef.current = (lastSample.x - event.clientX) / elapsed;
      }
      thumbLastSampleRef.current = { x: event.clientX, t: now };

      element.scrollLeft = state.scrollLeft - deltaX;
      event.preventDefault();
    }
  }, []);

  const onThumbsPointerEnd = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = thumbDragRef.current;
    if (state.pointerId !== event.pointerId) return;

    const element = thumbsRef.current;
    if (element?.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }

    const pressedIndex = state.pressedIndex;
    const wasDragging = state.isDragging;

    state.pointerId = null;
    state.isDragging = false;
    state.pressedIndex = -1;
    setIsThumbsDragging(false);

    if (!wasDragging && pressedIndex >= 0) {
      selectSlide(pressedIndex);
      return;
    }

    if (!wasDragging) {
      return;
    }

    if (!element) {
      return;
    }

    let velocity = thumbScrollVelocityRef.current * 16;
    const friction = 0.92;
    const minVelocity = 0.35;

    const tick = () => {
      if (Math.abs(velocity) < minVelocity) {
        thumbMomentumRafRef.current = null;
        return;
      }

      element.scrollLeft += velocity;
      velocity *= friction;
      thumbMomentumRafRef.current = window.requestAnimationFrame(tick);
    };

    if (Math.abs(velocity) >= minVelocity) {
      thumbMomentumRafRef.current = window.requestAnimationFrame(tick);
    }
  }, [selectSlide]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryFrame}>
        <div
          ref={carousel.carouselRef}
          className={styles.galleryMainViewport}
          aria-live="polite"
          onPointerDownCapture={carousel.handlePointerDown}
          onPointerMoveCapture={carousel.handlePointerMove}
          onPointerUpCapture={carousel.handlePointerEnd}
          onPointerCancelCapture={carousel.handlePointerEnd}
        >
          <motion.div
            ref={carousel.trackRef}
            className={styles.galleryMainTrack}
            style={{ x: carousel.x }}
            initial={false}
          >
            {images.map((image, slideIndex) => (
              <div
                key={`${image.src}-${slideIndex}`}
                className={`tableware-gallery-slide ${styles.galleryMainSlide}`}
                aria-hidden={slideIndex !== carousel.index}
                onClickCapture={carousel.handleCardClickCapture}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.galleryMainImage}
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
        {images.length > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.galleryNav} ${styles.galleryNavPrev}`}
              aria-label="Previous image"
              onPointerDown={(event) => {
                event.stopPropagation();
                goTo(carousel.index - 1);
              }}
            >
              <GalleryChevron direction="prev" />
            </button>
            <button
              type="button"
              className={`${styles.galleryNav} ${styles.galleryNavNext}`}
              aria-label="Next image"
              onPointerDown={(event) => {
                event.stopPropagation();
                goTo(carousel.index + 1);
              }}
            >
              <GalleryChevron direction="next" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div
          ref={thumbsRef}
          className={`${styles.galleryThumbs}${isThumbsDragging ? ` ${styles.galleryThumbsDragging}` : ""}`}
          onPointerDown={onThumbsPointerDown}
          onPointerMove={onThumbsPointerMove}
          onPointerUp={onThumbsPointerEnd}
          onPointerCancel={onThumbsPointerEnd}
        >
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              ref={(element) => {
                thumbButtonRefs.current[index] = element;
              }}
              type="button"
              data-thumb-index={index}
              className={`${styles.galleryThumb}${index === carousel.index ? ` ${styles.galleryThumbActive}` : ""}`}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === carousel.index ? "true" : undefined}
            >
              <Image
                src={image.src}
                alt=""
                width={224}
                height={224}
                className={styles.galleryThumbImage}
                sizes="112px"
                draggable={false}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CompleteSetCarousel({ products }: { products: TablewareProduct[] }) {
  const carousel = useSnapCarousel({
    itemCount: products.length,
    cardSelector: ".tableware-complete-set-slide",
    controlsSelector: "button, a",
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.35,
    touchMomentumFactor: 0.3,
    dragReleaseTransition: CAROUSEL_DRAG_RELEASE,
  });

  const indexRef = useRef(0);
  const animateToIndexRef = useRef(carousel.animateToIndex);

  indexRef.current = carousel.index;
  animateToIndexRef.current = carousel.animateToIndex;

  const goTo = useCallback(
    (next: number) => {
      const total = products.length;
      const wrapped = ((next % total) + total) % total;
      if (wrapped === carousel.index) return;
      carousel.animateToIndex(wrapped, CAROUSEL_SLIDE);
    },
    [carousel, products.length],
  );

  useEffect(() => {
    carousel.measure();
  }, [carousel.measure, products.length]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselStage}>
      <div
        ref={carousel.carouselRef}
        className={styles.carouselViewport}
        aria-live="polite"
        onPointerDownCapture={carousel.handlePointerDown}
        onPointerMoveCapture={carousel.handlePointerMove}
        onPointerUpCapture={carousel.handlePointerEnd}
        onPointerCancelCapture={carousel.handlePointerEnd}
      >
        <motion.div ref={carousel.trackRef} className={styles.carouselTrack} style={{ x: carousel.x }} initial={false}>
          {products.map((product) => (
            <div
              key={product.slug}
              className={`tableware-complete-set-slide ${styles.carouselSlide}`}
              onClickCapture={carousel.handleCardClickCapture}
            >
              <TablewareProductCard product={product} variant="completeSet" />
            </div>
          ))}
        </motion.div>
      </div>

      {products.length > 1 ? (
        <>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
            aria-label="Previous products"
            onPointerDown={(event) => {
              event.stopPropagation();
              goTo(carousel.index - 1);
            }}
          >
            <GalleryChevron direction="prev" iconClassName={styles.carouselArrowIcon} strokeWidth={3} />
          </button>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
            aria-label="Next products"
            onPointerDown={(event) => {
              event.stopPropagation();
              goTo(carousel.index + 1);
            }}
          >
            <GalleryChevron direction="next" iconClassName={styles.carouselArrowIcon} strokeWidth={3} />
          </button>
        </>
      ) : null}
    </div>
  );
}

export function TablewareProductPageContent({ data }: { data: TablewareProductPageData }) {
  const completeSetProducts = getCompleteSetProducts(data.completeSetSlugs, data.slug);

  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-label={data.title}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <ProductGallery images={data.gallery} />

          <div className={styles.productInfo}>
            <Link href="/tableware/" className={styles.growLogoLink}>
              <Image
                src={tablewareProductSharedAssets.growLogo}
                alt="grow by Annabel Karmel"
                width={245}
                height={70}
                className={styles.growLogo}
                priority
              />
            </Link>

            <h1 className={styles.productTitle}>{data.title}</h1>

            <p className={styles.colorLabel}>
              <strong>Colour |</strong> {data.activeColorLabel}
            </p>

            <div className={styles.colorSwatches} role="list" aria-label="Colour options">
              {data.swatches.map((swatch) => {
                const isActive = swatch.color === data.activeColor;
                const swatchSrc = isActive
                  ? tablewareAssets.swatchImagesActive[swatch.color]
                  : tablewareAssets.swatchImages[swatch.color];

                return (
                  <Link
                    key={swatch.slug}
                    href={tablewareProductHref(swatch.slug)}
                    role="listitem"
                    className={`${styles.colorSwatch} ${styles[swatch.color]}${isActive ? ` ${styles.colorSwatchActive}` : ""}`}
                    style={{
                      backgroundImage: `url(${swatchSrc})`,
                      borderColor: isActive ? SWATCH_BORDER[swatch.color] : "transparent",
                    }}
                    aria-label={`${swatch.label} colour`}
                    aria-current={isActive ? "true" : undefined}
                  />
                );
              })}
            </div>

            <div className={styles.retailerSection}>
              <p className={styles.retailerLabel}>{data.retailer.label}</p>
              <Image
                src={data.retailer.logo}
                alt="Baby Bunting"
                width={245}
                height={60}
                className={styles.retailerLogo}
              />
              {data.retailer.shopHref ? (
                <a
                  href={data.retailer.shopHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shopButton}
                >
                  {data.retailer.shopLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.descriptionSection} aria-label="Product description">
        <div className={`${styles.container} ${styles.descriptionInner}`}>
          {data.description.map((paragraph) => (
            <p key={paragraph} className={styles.descriptionParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <TablewareFeaturesSection
        heading={data.features.heading}
        columns={data.features.columns}
        headingId="tableware-product-features-heading"
      />

      <section className={styles.specsSection} aria-label="Materials, dimensions and care">
        <div className={styles.container}>
          <div className={styles.specsCard}>
            <div className={styles.specsGrid}>
              <div className={styles.specsBlock}>
                <h3 className={styles.specsHeading}>{data.materials.heading}</h3>
                <ul className={styles.specsList}>
                  {data.materials.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {data.dimensions.items.length > 0 ? (
                  <ul className={`${styles.specsList} ${styles.specsDimensionsList}`}>
                    {data.dimensions.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className={styles.careSection}>
                <h3 className={styles.specsHeading}>{data.careHeading}</h3>
                <div className={styles.careGrid}>
                  {data.careIcons.map((icon) => (
                    <div key={icon.label} className={styles.careItem}>
                      <div className={styles.careIconWrap}>
                        <Image
                          src={icon.src}
                          alt=""
                          width={40}
                          height={40}
                          className={styles.careIcon}
                          aria-hidden
                        />
                      </div>
                      <p className={styles.careLabel}>{icon.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.distributorSection} aria-label="Distribution">
        <div className={styles.container}>
          <p className={styles.distributorText} dangerouslySetInnerHTML={{ __html: data.distributorHtml }} />
        </div>
      </section>

      {completeSetProducts.length > 0 ? (
        <section className={styles.completeSetSection} aria-labelledby="complete-set-heading">
          <div className={styles.container}>
            <h2 id="complete-set-heading" className={styles.completeSetHeading}>
              Complete your set
            </h2>
          </div>
          <div className={styles.completeSetCarouselWrap}>
            <CompleteSetCarousel products={completeSetProducts} />
          </div>
        </section>
      ) : null}

     <div className="mt-[50px]">
     <InstagramShareSection />
     </div>
    </main>
  );
}
