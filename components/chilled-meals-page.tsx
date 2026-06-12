import Link from "next/link";

import { InstagramShareSection } from "@/components/instagram-share-section";
import {
  chilledMealsAssets,
  chilledMealsFrozenCta,
  chilledMealsIntro,
  chilledMealsProducts,
  chilledMealsPromise,
  chilledMealsTesco,
} from "@/data/chilled-meals-page";
import styles from "./chilled-meals-page.module.css";

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

function DiscoverButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={`${styles.pequena} inline-flex min-w-[180px] items-center justify-center bg-[#1a2078] px-15 py-3 text-[30px] leading-[1.2] lowercase text-white! transition-colors duration-200 hover:bg-[#e93a88]`}
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
        <img src={image} alt={title} className="block h-auto w-full" />
      </Link>
      <div className={styles.productCardOverlay}>
        <h3 className={styles.productCardTitle}>{title}</h3>
        <p className={styles.productCardDescription}>{description}</p>
      </div>
      <div className={styles.productCardButton}>
        <DiscoverButton href={href} />
      </div>
    </div>
  );
}

export function ChilledMealsPageContent() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={`${styles.fullBleed} leading-0`} aria-label="Chilled meals hero">
        <picture className="block leading-0">
          <source media="(min-width: 768px)" srcSet={chilledMealsAssets.heroDesktop} />
          <img
            src={chilledMealsAssets.heroMobile}
            alt="Annabel Karmel chilled meals"
            className="block h-auto w-full align-bottom"
            fetchPriority="high"
          />
        </picture>
      </section>

      {/* Introduction */}
      <section
        className={`${styles.fullBleed} ${styles.introSection} flex flex-col items-center`}
        aria-labelledby="chilled-meals-intro-heading"
      >
        <div className={styles.inner}>
          <h1 id="chilled-meals-intro-heading" className={styles.sectionHeading}>
            {chilledMealsIntro.heading}
          </h1>
          <p
            className={`${styles.pequena} mx-auto mt-5 max-w-[780px] text-center text-[30px] leading-normal text-white`}
          >
            {chilledMealsIntro.body}
          </p>
          <div className="relative mt-7">
            <img
              src={chilledMealsAssets.signature}
              alt="Annabel Karmel"
              className="mx-auto mb-9 block h-auto w-[min(277px,70%)]"
            />
            <img
              src={chilledMealsAssets.awardLbc}
              alt="Award-winning chilled meals range"
              className="mx-auto block h-auto w-[min(410px,100%)]"
            />
          </div>
        </div>
      </section>

      {/* Expert Promise */}
      <section
        className={`${styles.fullBleed} ${styles.promiseSection}`}
        aria-labelledby="chilled-meals-promise-heading"
      >
        <div className={styles.inner}>
          <h2 id="chilled-meals-promise-heading" className={styles.sectionHeading}>
            {chilledMealsPromise.heading}
          </h2>
          <ul className="mt-6 grid list-none grid-cols-2 justify-items-center gap-x-5 gap-y-4 p-0 md:grid-cols-3 md:gap-x-6 md:gap-y-5 lg:grid-cols-5 lg:gap-6">
            {chilledMealsPromise.icons.map((icon) => (
              <li
                key={icon.src}
                className="max-md:last:col-span-full max-md:last:max-w-[50%]"
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
        aria-label="Chilled meal products"
      >
        <div className={`${styles.inner} lg:hidden`}>
          <div className="flex flex-col">
            {chilledMealsProducts.map((product) => (
              <article key={product.title} className="pb-12 pt-4 last:pb-8">
                <ProductCard {...product} />
              </article>
            ))}
          </div>
        </div>

        <div
          className={`${styles.inner} hidden lg:grid lg:grid-cols-2 lg:gap-x-[50px] lg:gap-y-18 md:gap-x-6   md:gap-y-16! max-[1200px]:lg:gap-x-6 max-[1200px]:lg:gap-y-8`}
        >
          {chilledMealsProducts.map((product) => (
            <article key={product.title}>
              <ProductCard {...product} />
            </article>
          ))}
        </div>
      </section>

      {/* Exclusively at Tesco */}
      <section
        className={`${styles.fullBleed} ${styles.tescoSection}`}
        aria-labelledby="chilled-meals-tesco-heading"
      >
        <div className={styles.inner}>
          <div className="flex flex-col items-center gap-4 md:gap-5 lg:flex-row lg:justify-center lg:gap-12">
            <h2 id="chilled-meals-tesco-heading" className={styles.tescoHeading}>
              {chilledMealsTesco.heading}
            </h2>
            <a
              href={chilledMealsTesco.logoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0"
            >
              <img
                src={chilledMealsAssets.tescoLogo}
                alt="Tesco"
                className="block h-auto w-[160px] sm:w-[180px] md:w-[220px] lg:w-[258px]"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Frozen aisle CTA */}
      <section
        className={`${styles.fullBleed} ${styles.frozenSection} relative -mt-10 bg-[url('/product-category/chilled-meals/frozen-aisle-bg.png')]  bg-position-[40%] bg-cover md:bg-position-top lg:bg-top bg-no-repeat  py-[80px] lg:py-[90px]`}
        aria-labelledby="chilled-meals-frozen-heading"
      >
        <WaveShapeBottom />
        <div className={styles.inner}>
          <div className="flex flex-col-reverse items-center justify-center gap-6 md:gap-8 lg:flex-row lg:gap-15">
            <div className="flex w-full flex-1 flex-col items-center justify-center text-center lg:relative lg:bottom-[34px] lg:items-center lg:self-end lg:text-left">
              <h2
                id="chilled-meals-frozen-heading"
                className={`${styles.pequena} m-0 text-[40px] leading-[1.15] whitespace-pre-line text-white md:text-[42px]  lg:text-[54px] xl:text-[64px]`}
              >
                {chilledMealsFrozenCta.heading}
              </h2>
              <div className="mt-4 w-full flex justify-center md:mt-6">
                <DiscoverButton href={chilledMealsFrozenCta.href} />
              </div>
            </div>
            <div className="flex w-full flex-1 justify-center lg:self-end">
              <Link
                href={chilledMealsFrozenCta.href}
                className="relative mx-auto flex w-[220px] max-w-[85vw] pl-[18px]  sm:pl-[35px] md:pl-[50px] lg:pl-0 shrink-0 items-center justify-center sm:w-[280px] md:w-[360px] lg:w-[min(100%,560px)]"
              >
                <img
                  src={chilledMealsAssets.frozenChild1}
                  alt="Toddler enjoying an Annabel Karmel meal"
                  className="relative z-1 block h-auto w-[190px] max-w-none left-[10px] bottom-[8px] rotate-[0.28deg] sm:w-[205px] min-[425px]:left-[9px] min-[425px]:w-[180px] sm:left-[7px] sm:bottom-[10px] md:w-[295px] md:left-[2px] md:bottom-[12px] lg:w-[90%] lg:-left-[12px] lg:bottom-[15px]"
                />
                <img
                  src={chilledMealsAssets.frozenChild2}
                  alt="Child enjoying Annabel Karmel spaghetti"
                  className="relative block h-auto w-[210px] max-w-none bottom-[10px] right-[22px] rotate-[0.37deg] sm:w-[240px] min-[425px]:w-[210px] sm:bottom-[12px] sm:right-[30px] md:w-[340px] md:bottom-[15px] md:right-[40px] lg:w-full lg:bottom-[18px] lg:right-[57px]"
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
