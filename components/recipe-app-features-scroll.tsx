"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";

import { recipeAppFeatures, recipeAppLinks } from "@/data/recipe-app-page";
import styles from "./recipe-app-page.module.css";

const STEP_COUNT = recipeAppFeatures.length;
const DESKTOP_QUERY = "(min-width: 900px)";
const MIN_THUMB_PX = 48;

export function RecipeAppFeaturesScroll() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateCustomScrollbar = useCallback(() => {
    const viewport = viewportRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (!viewport || !thumb || !track) {
      return;
    }

    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      thumb.style.display = "none";
      return;
    }

    const maxScroll = viewport.scrollHeight - viewport.clientHeight;
    const trackHeight = track.clientHeight;

    if (maxScroll <= 0 || trackHeight <= 0) {
      thumb.style.display = "none";
      return;
    }

    const thumbHeight = Math.max(
      MIN_THUMB_PX,
      (viewport.clientHeight / viewport.scrollHeight) * trackHeight,
    );
    const maxThumbTop = trackHeight - thumbHeight;
    const thumbTop = (viewport.scrollTop / maxScroll) * maxThumbTop;

    thumb.style.display = "block";
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${thumbTop}px)`;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const desktopQuery = window.matchMedia(DESKTOP_QUERY);

    const getMaxScroll = () =>
      Math.max(0, viewport.scrollHeight - viewport.clientHeight);

    const releaseToPage = (deltaY: number) => {
      if (deltaY === 0) {
        return;
      }

      window.scrollBy({ top: deltaY, left: 0 });
    };

    const onWheel = (event: WheelEvent) => {
      if (!desktopQuery.matches) {
        return;
      }

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) {
        return;
      }

      const atTop = viewport.scrollTop <= 1;
      const atBottom = viewport.scrollTop >= maxScroll - 1;

      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
        event.preventDefault();
        releaseToPage(event.deltaY);
      }
    };

    let touchStartY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!desktopQuery.matches) {
        return;
      }

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) {
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - currentY;
      const atTop = viewport.scrollTop <= 1;
      const atBottom = viewport.scrollTop >= maxScroll - 1;

      if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
        releaseToPage(deltaY);
        touchStartY = currentY;
      }
    };

    const onScroll = () => {
      updateCustomScrollbar();
    };

    const onLayoutChange = () => {
      updateCustomScrollbar();
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCustomScrollbar();
    });

    resizeObserver.observe(viewport);
    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });
    desktopQuery.addEventListener("change", onLayoutChange);
    window.addEventListener("resize", onLayoutChange, { passive: true });
    updateCustomScrollbar();

    return () => {
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      desktopQuery.removeEventListener("change", onLayoutChange);
      window.removeEventListener("resize", onLayoutChange);
    };
  }, [updateCustomScrollbar]);

  return (
    <section
      className={styles.featuresScrollSection}
      style={{ "--feature-step-count": STEP_COUNT } as CSSProperties}
      aria-label="App features"
    >
      <div className={styles.featuresScrollGrid}>
        <div className={styles.featuresScrollScrollArea}>
          <div
            ref={viewportRef}
            className={styles.featuresScrollViewport}
            tabIndex={0}
            role="region"
            aria-label="Scroll through app features"
          >
            {recipeAppFeatures.map((feature, index) => (
              <div key={feature.id} className={styles.featureScrollSlide}>
                <article className={styles.featurePanel}>
                  <div className={styles.featurePanelVisual}>
                    <Image
                      src={feature.image}
                      alt=""
                      width={feature.imageWidth}
                      height={feature.imageHeight}
                      className={`${styles.featurePanelImage} ${styles.featurePanelImageDesktop}`}
                      sizes="(min-width: 1024px) 46vw, (min-width: 900px) 44vw, 92vw"
                      priority={index === 0}
                    />
                    <Image
                      src={feature.mobileImage}
                      alt=""
                      width={feature.mobileImageWidth}
                      height={feature.mobileImageHeight}
                      className={`${styles.featurePanelImage} ${styles.featurePanelImageMobile}`}
                      sizes="(max-width: 899px) 100vw, 0px"
                      loading="eager"
                      priority={index === 0}
                    />
                  </div>

                  <div className={styles.featurePanelCopy}>
                    <p className={styles.featureEyebrow}>{feature.eyebrow}</p>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureBody}>{feature.body}</p>
                    <a
                      href={recipeAppLinks.trialCta}
                      className={styles.featureCta}
                      tabIndex={0}
                    >
                      {feature.cta}
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className={styles.featuresCustomScrollbar} aria-hidden="true">
            <div ref={trackRef} className={styles.featuresCustomScrollbarTrack}>
              <div ref={thumbRef} className={styles.featuresCustomScrollbarThumb} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
