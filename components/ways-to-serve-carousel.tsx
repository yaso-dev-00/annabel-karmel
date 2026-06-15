"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useSnapCarousel } from "@/components/use-snap-carousel";
import shared from "./product-category-shared.module.css";
import styles from "./ways-to-serve-carousel.module.css";

export type WaysToServeItem = {
  title: string;
  href: string;
  image: string;
};

type WaysToServeCarouselProps = {
  items: WaysToServeItem[];
  heading?: string;
  headingId?: string;
};

function CarouselNavIcon({ direction }: { direction: "prev" | "next" }) {
  if (direction === "prev") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none" aria-hidden>
        <g clipPath="url(#ways-prev-clip-0)">
          <path
            d="M6.05686 10.4186C10.246 3.6248 18.1251 -0.824808 26.2103 0.130231C30.0631 0.586044 33.7204 2.11628 36.5421 4.80775C39.5266 7.65116 41.046 11.8078 41.6755 15.8015C42.3375 20.0558 42.0553 24.4946 40.1886 28.4233C38.5933 31.7659 36.0103 34.6744 32.9282 36.7256C26.1886 41.1969 17.5173 41.7829 10.2894 38.0822C2.51887 34.1101 -1.69198 24.8961 0.630501 16.4419C0.977787 15.1721 2.19329 14.4341 3.47391 14.293C4.26616 14.2062 6.27391 14.5535 5.91577 15.8341C4.24445 21.9333 6.11112 28.7488 10.9948 32.8837C15.3685 36.5845 22.0646 38.0605 27.3933 35.6512C33.091 33.0682 36.5204 27.5225 36.7158 21.3256C36.9328 14.7597 34.3499 7.27132 27.7948 4.69922C21.2398 2.12713 14.5762 5.05736 11.0491 10.7659C10.3437 11.9054 9.01965 12.5566 7.67391 12.4481C6.74057 12.3721 5.34058 11.5473 6.046 10.4078L6.05686 10.4186Z"
            fill="#005D20"
          />
        </g>
        <g clipPath="url(#ways-prev-clip-1)">
          <path
            d="M27.3867 32.2108C24.3068 30.6443 21.1241 28.3373 18.0608 26.5452C15.6455 25.1336 13.0363 23.9308 10.6756 22.4604C10.2072 22.1687 9.72306 21.8602 9.55534 21.0512C9.28873 19.7668 9.4786 18.3756 10.2674 17.6482C11.731 16.2954 14.4311 14.771 16.0925 13.7399C19.2009 11.811 22.4849 9.92884 25.8076 9.02379C26.8907 8.7297 28.9627 7.95909 29.0157 10.5026C29.0252 10.9479 28.8456 11.4185 28.8488 11.6933C28.8519 11.9826 29.0157 12.5108 29.0378 12.9561C29.0798 13.8059 29.0204 18.7453 29.1779 19.0274L29.613 24.3425C29.5924 25.9258 29.9912 27.982 30.0584 29.582C30.1067 30.7632 29.7269 31.8146 29.0022 32.2972C28.3242 32.7497 28.0331 32.5397 27.3867 32.2108ZM26.7364 13.9104C23.314 16.3375 19.7072 18.0852 16.0925 19.7428L16.0767 19.9865L26.3939 26.1106L26.7364 13.9104Z"
            fill="#005D20"
          />
        </g>
        <defs>
          <clipPath id="ways-prev-clip-0">
            <rect width="42" height="40.5132" fill="white" transform="matrix(-1 0 0 1 42 0)" />
          </clipPath>
          <clipPath id="ways-prev-clip-1">
            <rect width="23.876" height="20.6202" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 30.0625 32.5581)" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none" aria-hidden>
      <g clipPath="url(#ways-next-clip-0)">
        <path
          d="M35.9431 10.4186C31.754 3.6248 23.8749 -0.824808 15.7897 0.130231C11.9369 0.586044 8.27958 2.11628 5.45787 4.80775C2.47338 7.65116 0.953997 11.8078 0.324539 15.8015C-0.337476 20.0558 -0.0553058 24.4946 1.81136 28.4233C3.40671 31.7659 5.98966 34.6744 9.07183 36.7256C15.8114 41.1969 24.4827 41.7829 31.7106 38.0822C39.4811 34.1101 43.692 24.8961 41.3695 16.4419C41.0222 15.1721 39.8067 14.4341 38.5261 14.293C37.7338 14.2062 35.7261 14.5535 36.0842 15.8341C37.7555 21.9333 35.8889 28.7488 31.0052 32.8837C26.6315 36.5845 19.9354 38.0605 14.6067 35.6512C8.90904 33.0682 5.47958 27.5225 5.28423 21.3256C5.06717 14.7597 7.65012 7.27132 14.2052 4.69922C20.7602 2.12713 27.4238 5.05736 30.9509 10.7659C31.6563 11.9054 32.9804 12.5566 34.3261 12.4481C35.2594 12.3721 36.6594 11.5473 35.954 10.4078L35.9431 10.4186Z"
          fill="#005D20"
        />
      </g>
      <g clipPath="url(#ways-next-clip-1)">
        <path
          d="M14.6133 32.2108C17.6932 30.6443 20.8759 28.3373 23.9392 26.5452C26.3545 25.1336 28.9637 23.9308 31.3244 22.4604C31.7928 22.1687 32.2769 21.8602 32.4447 21.0512C32.7113 19.7668 32.5214 18.3756 31.7326 17.6482C30.269 16.2954 27.5689 14.771 25.9075 13.7399C22.7991 11.811 19.5151 9.92884 16.1924 9.02379C15.1093 8.7297 13.0373 7.95909 12.9843 10.5026C12.9748 10.9479 13.1544 11.4185 13.1512 11.6933C13.1481 11.9826 12.9843 12.5108 12.9622 12.9561C12.9202 13.8059 12.9796 18.7453 12.8221 19.0274L12.387 24.3425C12.4076 25.9258 12.0088 27.982 11.9416 29.582C11.8933 30.7632 12.2731 31.8146 12.9978 32.2972C13.6758 32.7497 13.9669 32.5397 14.6133 32.2108ZM15.2636 13.9104C18.686 16.3375 22.2928 18.0852 25.9075 19.7428L25.9233 19.9865L15.6061 26.1106L15.2636 13.9104Z"
          fill="#005D20"
        />
      </g>
      <defs>
        <clipPath id="ways-next-clip-0">
          <rect width="42" height="40.5132" fill="white" />
        </clipPath>
        <clipPath id="ways-next-clip-1">
          <rect width="23.876" height="20.6202" fill="white" transform="translate(11.9375 32.5581) rotate(-90)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function WaysToServeCarousel({
  items,
  heading = "WAYS TO SERVE",
  headingId = "ways-to-serve-heading",
}: WaysToServeCarouselProps) {
  const [navOffset, setNavOffset] = useState(0);
  const carousel = useSnapCarousel({
    itemCount: items.length,
    cardSelector: ".ways-to-serve-card",
    controlsSelector: "button",
    dragThreshold: 2,
    touchDragThreshold: 1,
    rubberBandFactor: 0.42,
    touchMomentumFactor: 0.32,
  });

  useEffect(() => {
    const updateNavOffset = () => {
      const track = carousel.trackRef.current;
      if (!track) return;
      const firstImage = track.querySelector<HTMLElement>(".ways-to-serve-card-image");
      if (!firstImage) return;
      setNavOffset(Math.max(0, firstImage.offsetHeight / 2 - 26));
    };

    updateNavOffset();
    window.addEventListener("resize", updateNavOffset);
    return () => window.removeEventListener("resize", updateNavOffset);
  }, [items.length]);

  const canCycle = carousel.maxIndex > 0;

  return (
    <section className="bg-white py-[100px]" aria-labelledby={headingId}>
      <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-6 md:px-8">
        <h2
          id={headingId}
          className={`${shared.pequena} m-0 text-center text-[40px] leading-[1.03] text-[#005d20] md:text-[52px] lg:text-[64px]`}
        >
          {heading}
        </h2>
      </div>

      <div className={styles.carouselWrap}>
        <div className={styles.carouselRow}>
          <button
            type="button"
            aria-label="Previous recipes"
            className={styles.navButton}
            style={{ marginTop: navOffset }}
            disabled={!canCycle || carousel.index <= 0}
            onPointerDown={(event) => {
              event.stopPropagation();
              carousel.handleNavigation(-1);
            }}
          >
            <CarouselNavIcon direction="prev" />
          </button>

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
                {items.map((recipe, recipeIndex) => (
                  <article
                    key={recipe.title}
                    className={`ways-to-serve-card ${styles.waysToServeCard}`}
                    onClickCapture={carousel.handleCardClickCapture}
                  >
                    <Link
                      href={recipe.href}
                      className={`${styles.cardImageLink} ways-to-serve-card-image`}
                      draggable={false}
                      onDragStart={(event) => event.preventDefault()}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className={styles.cardImage}
                        draggable={false}
                        onLoad={recipeIndex === 0 ? carousel.measure : undefined}
                      />
                    </Link>
                    <h3 className={styles.cardTitle}>
                      <Link href={recipe.href}>{recipe.title}</Link>
                    </h3>
                  </article>
                ))}
              </motion.div>
            </div>

            <button
              type="button"
              aria-label="Next recipes"
              className={styles.navButton}
              style={{ marginTop: navOffset }}
              disabled={!canCycle || carousel.index >= carousel.maxIndex}
              onPointerDown={(event) => {
                event.stopPropagation();
                carousel.handleNavigation(1);
              }}
            >
              <CarouselNavIcon direction="next" />
            </button>
          </div>
        </div>
    </section>
  );
}
