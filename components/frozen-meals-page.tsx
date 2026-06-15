import Link from "next/link";

import { InstagramShareSection } from "@/components/instagram-share-section";
import {
  frozenMealsAssets,
  frozenMealsChilledCta,
  frozenMealsIntro,
  frozenMealsProducts,
  frozenMealsPromise,
  frozenMealsRetailers,
} from "@/data/frozen-meals-page";
import styles from "./frozen-meals-page.module.css";

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

function DiscoverButton({
  href,
  color = "#1a2078",
  hoverColor = "#e93a88",
}: {
  href: string;
  color?: string;
  hoverColor?: string;
}) {
  return (
    <Link
      href={href}
      className={`${styles.discoverButton} ${styles.pequena} inline-flex min-w-[180px] items-center justify-center px-15 py-3 text-[30px] leading-[1.2] lowercase text-white! transition-colors duration-200`}
      style={
        {
          "--discover-bg": color,
          "--discover-hover": hoverColor,
        } as React.CSSProperties
      }
    >
      discover
    </Link>
  );
}

function ProductCard({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <div className={styles.productCard}>
      <Link href={href} className="block">
        <img src={image} alt={title.replace(/\n/g, " ")} className="block h-auto w-full" />
      </Link>
      <div className={styles.productCardOverlay}>
        <h3 className={styles.productCardTitle}>{title}</h3>
        <p className={styles.productCardDescription}>{description}</p>
      </div>
      <div className={styles.productCardButton}>
        <DiscoverButton href={href} color="#00A19D"  hoverColor="#E93A88"/>
      </div>
    </div>
  );
}

export function FrozenMealsPageContent() {
  return (
    <main className={styles.page}>
      {/* Hero — looping MP4 on all breakpoints; invisible images set height (live site pattern) */}
      <section className={`${styles.fullBleed} ${styles.heroSection}`} aria-label="Frozen meals hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={frozenMealsAssets.heroDesktop}
          className={styles.heroVideo}
          aria-hidden="true"
        >
          <source src={frozenMealsAssets.heroVideo} type="video/mp4" />
        </video>
        <img
          src={frozenMealsAssets.heroDesktop}
          alt=""
          aria-hidden="true"
          className={styles.heroDesktopSizer}
        />
        <img
          src={frozenMealsAssets.heroDesktop}
          alt="Annabel Karmel frozen meals"
          className={styles.heroReducedMotionFallbackDesktop}
        />
        <img
          src={frozenMealsAssets.heroMobile}
          alt="Annabel Karmel frozen meals"
          className={styles.heroReducedMotionFallbackMobile}
        />
      </section>

      {/* Introduction */}
      <section
        className={`${styles.fullBleed} ${styles.introSection} `}
        aria-labelledby="frozen-meals-intro-heading"
      >
        <div className={`${styles.inner} pt-[60px] md:pt-0`}>
          <h1 id="frozen-meals-intro-heading" className={styles.sectionHeadingDark}>
            {frozenMealsIntro.heading}
          </h1>
          <p
            className={`${styles.pequena} mx-auto mt-10 max-w-[780px] text-center text-[30px] leading-normal text-[#494747]`}
          >
            {frozenMealsIntro.body}
          </p>
          <div className="relative mt-10">
            <img
              src={frozenMealsAssets.signature}
              alt="Annabel Karmel"
              className="mx-auto mb-9 block h-auto w-[min(277px,70%)]"
            />
            <img
              src={frozenMealsAssets.awardLogos}
              alt="Award-winning frozen meals range"
              className="mx-auto block h-auto w-[min(410px,100%)]"
            />
          </div>
        </div>
      </section>

      {/* Expert Promise */}
      <section
        className={`${styles.fullBleed} ${styles.promiseSection} flex flex-col justify-center items-center`}
        aria-labelledby="frozen-meals-promise-heading"
      >
        <div className={`${styles.inner} `}>
          <h2 id="frozen-meals-promise-heading" className={styles.sectionHeadingDark}>
            {frozenMealsPromise.heading}
          </h2>
          <ul className="mt-6 grid list-none grid-cols-2 justify-items-center gap-x-5 gap-y-4 p-0 md:grid-cols-3 md:gap-x-6 md:gap-y-5 lg:grid-cols-6 lg:gap-6">
            {frozenMealsPromise.icons.map((icon, index) => (
              <li
                key={icon.src}
               
              >
                <img src={icon.src} alt={icon.alt} className="h-auto w-full max-w-[180px] md:max-w-[216px]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section
        className={`${styles.fullBleed} relative bg-white py-[35px] text-white md:pt-20 md:pb-[100px]`}
        aria-label="Frozen meal products"
      >
        <div className={`${styles.inner} lg:hidden`}>
          <div className="flex flex-col">
            {frozenMealsProducts.map((product) => (
              <article key={product.title} className="pb-12 pt-4 last:pb-8">
                <ProductCard {...product} />
              </article>
            ))}
          </div>
        </div>

        <div
          className={`${styles.inner} hidden lg:grid lg:grid-cols-2 lg:gap-x-[50px] lg:gap-y-18 md:gap-x-6 md:gap-y-16! max-[1200px]:lg:gap-x-6 max-[1200px]:lg:gap-y-8`}
        >
          {frozenMealsProducts.map((product) => (
            <article key={product.title}>
              <ProductCard {...product} />
            </article>
          ))}
        </div>
      </section>

      {/* Discover in the freezer aisle */}
      <section
        className={`${styles.fullBleed} ${styles.retailersSection}`}
        aria-labelledby="frozen-meals-retailers-heading"
      >
        <div className={styles.inner}>
          <h2 id="frozen-meals-retailers-heading" className={styles.retailersHeading}>
            {frozenMealsRetailers.heading}
          </h2>
          <div className="mt-6 flex flex-row items-center justify-items-center gap-x-6 gap-y-8 md:mt-8 md:grid-cols-4 md:gap-10">
            {frozenMealsRetailers.logos.map((logo,index) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center ${index === frozenMealsRetailers.logos.length - 1 ? "justify-start" : ""}`}
              >
                <img src={logo.src} alt={logo.alt} className={styles.retailerLogo} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Chilled aisle CTA */}
      <section
        className={`${styles.fullBleed} ${styles.chilledSection} relative -mt-10 bg-[url('/product-category/frozen-meals/chilled-aisle-bg.png')] bg-position-[40%] bg-cover md:bg-position-top lg:bg-top bg-no-repeat py-[80px] pb-[100px]! lg:py-[90px]`}
        aria-labelledby="frozen-meals-chilled-heading"
      >
        <WaveShapeBottom />
        <div className={styles.inner}>
          <div className="flex flex-col-reverse items-center justify-center gap-6 md:gap-8 lg:flex-row lg:gap-15">
            <div className="flex w-full flex-1 flex-col items-center justify-center text-center lg:relative lg:bottom-[34px] lg:items-center lg:self-end lg:text-left">
              <h2
                id="frozen-meals-chilled-heading"
                className={`${styles.pequena} m-0 text-[40px] leading-[1.15] whitespace-pre-line text-[#161313] md:text-[42px] lg:text-[54px] xl:text-[64px]`}
              >
                {frozenMealsChilledCta.heading}
              </h2>
              <div className="mt-4 flex w-full justify-center md:mt-6">
                <DiscoverButton href={frozenMealsChilledCta.href} color="#E93A88"  hoverColor="#00A19D"/>
              </div>
            </div>
            <div className="flex w-full flex-1 justify-center lg:self-end">
              <Link
                href={frozenMealsChilledCta.href}
                className="relative mx-auto flex w-full max-w-[85vw] shrink-0 items-center justify-center  md:w-[550px] lg:w-[min(100%,560px)]"
              >
                <img
                  src={frozenMealsAssets.chilledAislePhoto}
                  alt="Children enjoying Annabel Karmel chilled meals"
                  className="block h-auto w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InstagramShareSection
        className={`${styles.fullBleed} bg-white pb-10 pt-10 md:pb-16 md:pt-16`}
      />
    </main>
  );
}
