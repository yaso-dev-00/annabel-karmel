import Image from "next/image";
import Link from "next/link";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { ProductCategoryIntroSection } from "@/components/product-category-intro-section";
import {
  ProductCategoryDiscoverButton,
  ProductCategoryProductCard,
} from "@/components/product-category-product-card";
import {
  SectionBackgroundImage,
} from "@/components/section-background-image";
import { WaysToServeCarousel } from "@/components/ways-to-serve-carousel";
import {
  plantPoweredBitesAssets,
  plantPoweredBitesFrozenCta,
  plantPoweredBitesIntro,
  plantPoweredBitesProducts,
  plantPoweredBitesPromise,
  plantPoweredBitesRetailer,
  plantPoweredBitesWaysToServe,
} from "@/data/plant-powered-bites-page";
import styles from "./plant-powered-bites-page.module.css";

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

export function PlantPoweredBitesPageContent() {
  return (
    <main className={styles.page}>
      <section className={`${styles.fullBleed} ${styles.heroSection}`} aria-label="Plant-powered bites hero">
        <div className={`${styles.heroImageWrap} ${styles.heroImageDesktop}`}>
          <Image
            src={plantPoweredBitesAssets.heroDesktop}
            alt="Annabel Karmel plant-powered bites"
            width={2197}
            height={1054}
            priority
            className={styles.heroImage}
            sizes="(min-width: 768px) 100vw, 0px"
          />
        </div>
        <div className={`${styles.heroImageWrap} ${styles.heroImageMobile}`}>
          <Image
            src={plantPoweredBitesAssets.heroMobile}
            alt="Annabel Karmel plant-powered bites"
            width={440}
            height={571}
            priority
            unoptimized
            className={styles.heroImage}
            sizes="(max-width: 767px) 100vw, 0px"
          />
        </div>
      </section>

      <ProductCategoryIntroSection
        id="plant-powered-bites-intro-heading"
        heading={plantPoweredBitesIntro.heading}
        body={plantPoweredBitesIntro.body}
        signatureSrc={plantPoweredBitesAssets.signature}
        introBg={plantPoweredBitesAssets.introBg}
        introBgMobile={plantPoweredBitesAssets.introBgMobile}
        theme="light"
        className={styles.introSection}
      />

      <section
        className={`${styles.fullBleed} ${styles.promiseSection} flex flex-col items-center justify-center `}
        aria-labelledby="plant-powered-bites-promise-heading"
      >
        <SectionBackgroundImage desktopSrc={plantPoweredBitesAssets.promiseBg} />
        <div className={`${styles.sectionContent} ${styles.inner} flex flex-col gap-y-6 md:gap-y-10`}>
          <h2 id="plant-powered-bites-promise-heading" className={`${styles.sectionHeadingDark} uppercase`}>
            {plantPoweredBitesPromise.heading}
          </h2>
          <Image
            src={plantPoweredBitesAssets.promiseArtwork}
            alt={plantPoweredBitesPromise.artworkAlt}
            width={1008}
            height={235}
            unoptimized
            className={styles.promiseArtwork}
            sizes="(min-width: 768px) 980px, 0px"
          />
          <Image
            src={plantPoweredBitesAssets.promiseArtworkMobile}
            alt={plantPoweredBitesPromise.artworkAlt}
            width={406}
            height={226}
            unoptimized
            className={styles.promiseArtworkMobile}
            sizes="(max-width: 767px) 100vw, 0px"
          />
        </div>
      </section>

      <section
        className={`${styles.fullBleed} relative bg-white py-[35px] text-white md:pt-20 md:pb-[100px]`}
        aria-label="Plant-powered bite products"
      >
        <div
          className={`${styles.inner} grid grid-cols-1 gap-y-12 pt-4 pb-8 lg:grid-cols-2 lg:gap-x-[50px] lg:gap-y-18 lg:pt-0 lg:pb-0 max-[1200px]:lg:gap-x-6 max-[1200px]:lg:gap-y-8`}
        >
          {plantPoweredBitesProducts.map((product) => (
            <article key={product.title}>
              <ProductCategoryProductCard
                {...product}
                buttonColor="#005D1F"
                buttonHoverColor="#E93A88"
              />
            </article>
          ))}
        </div>
      </section>

      <section
        className={`${styles.fullBleed} ${styles.retailersSection}`}
        aria-labelledby="plant-powered-bites-retailer-heading"
      >
        <SectionBackgroundImage desktopSrc={plantPoweredBitesAssets.retailersBg} />
        <WaveShapeBottom />
        <div className={`${styles.sectionContent} ${styles.inner} max-w-[1210px]!`}>
          <h2 id="plant-powered-bites-retailer-heading" className={`${styles.retailersHeading} uppercase`}>
            {plantPoweredBitesRetailer.heading}
          </h2>
          <div className="mt-6 flex justify-center md:mt-8">
            <a
              href={plantPoweredBitesRetailer.logoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center"
            >
              <Image
                src={plantPoweredBitesAssets.logoAsda}
                alt="ASDA"
                width={1360}
                height={404}
                className={styles.retailerLogo}
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 320px, 220px"
              />
            </a>
          </div>
        </div>
      </section>

      <WaysToServeCarousel items={plantPoweredBitesWaysToServe} />

      <section
        className={`${styles.fullBleed} ${styles.frozenCtaSection}`}
        aria-labelledby="plant-powered-bites-frozen-heading"
      >
        <SectionBackgroundImage
          desktopSrc={plantPoweredBitesAssets.frozenCtaBg}
          mobileSrc={plantPoweredBitesAssets.frozenCtaBgMobile}
        />
        <WaveShapeBottom />
        <div className={`${styles.sectionContent} ${styles.inner} max-w-[1350px]!`}>
          <div className={styles.frozenCtaLayout}>
            <div className={styles.frozenCtaPhotoLeft}>
              <Link href={plantPoweredBitesFrozenCta.href}>
                <Image
                  src={plantPoweredBitesAssets.frozenCtaLeft}
                  alt="Annabel Karmel frozen chicken tikka meal"
                  width={543}
                  height={615}
                  className={styles.frozenCtaSideImage}
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 440px, 300px"
                />
              </Link>
            </div>

            <div className={styles.frozenCtaCenter}>
              <Image
                src={plantPoweredBitesAssets.frozenCtaMobile}
                alt="Annabel Karmel frozen meals range"
                width={1265}
                height={938}
                className={styles.frozenCtaMobileImage}
                sizes="100vw"
              />
              <h2
                id="plant-powered-bites-frozen-heading"
                className={`${styles.pequena} m-0 text-center text-[40px] leading-[1.15] uppercase text-white md:text-[42px] lg:text-[54px] xl:text-[56px]`}
              >
                {plantPoweredBitesFrozenCta.heading}
              </h2>
              <div className="mt-4 flex w-full justify-center md:mt-6">
                <ProductCategoryDiscoverButton href={plantPoweredBitesFrozenCta.href} color="#005D1F" hoverColor="#E93A88" />
              </div>
            </div>

            <div className={styles.frozenCtaPhotoRight}>
              <Link href={plantPoweredBitesFrozenCta.href}>
                <Image
                  src={plantPoweredBitesAssets.frozenCtaRight}
                  alt="Child enjoying Annabel Karmel spaghetti bolognese"
                  width={617}
                  height={681}
                  className={styles.frozenCtaSideImage}
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 440px, 300px"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InstagramShareSection
        className={`${styles.fullBleed} mt-[50px] bg-white pb-10 pt-10 md:pb-16 md:pt-16`}
      />
    </main>
  );
}
