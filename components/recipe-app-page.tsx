import Image from "next/image";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { RecipeAppFeaturesScroll } from "@/components/recipe-app-features-scroll";
import {
  RecipeAppCategoryCarousel,
  RecipeAppDiscoverFeatures,
  RecipeAppTestimonialCarousel,
} from "@/components/recipe-app-carousels";
import { RecipeAppPricingSection } from "@/components/recipe-app-pricing";
import {
  recipeAppAssets,
  recipeAppAwards,
  recipeAppHero,
  recipeAppIntro,
  recipeAppJoin,
  recipeAppLinks,
  recipeAppQuote,
  recipeAppWeaning,
} from "@/data/recipe-app-page";
import styles from "./recipe-app-page.module.css";

function HeroCheckIcon() {
  return (
    <svg className="mt-1 h-9 w-9 shrink-0" width="36" height="37" viewBox="0 0 36 37" fill="none" aria-hidden="true">
      <path d="M30 9.5L13.5 26L6 18.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRatingInline() {
  return (
    <div className={styles.starRow} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <svg key={index} width="24" height="24" viewBox="0 0 28 28" fill="none">
          <path
            d="M13.3 2.2L16.4 9.5L24.3 10.4L18.6 15.7L20.2 23.5L13.3 19.7L6.4 23.5L8 15.7L2.3 10.4L10.2 9.5L13.3 2.2Z"
            fill="#B34769"
          />
        </svg>
      ))}
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path
          d="M13.3 2.2L16.4 9.5L24.3 10.4L18.6 15.7L20.2 23.5L13.3 19.7L6.4 23.5L8 15.7L2.3 10.4L10.2 9.5L13.3 2.2Z"
          fill="#E9C6CE"
        />
        <path d="M13.3 2.2L16.4 9.5L24.3 10.4L13.3 19.7V2.2Z" fill="#B34769" />
      </svg>
    </div>
  );
}

function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a href={recipeAppLinks.appStore} aria-label="Download on the App Store">
        <Image src={recipeAppAssets.appStoreBadge} alt="" width={152} height={50} />
      </a>
      <a href={recipeAppLinks.playStore} aria-label="Get it on Google Play">
        <Image src={recipeAppAssets.googlePlayBadge} alt="" width={152} height={50} />
      </a>
    </div>
  );
}

export function RecipeAppPageContent() {
  return (
    <main className={styles.page}>
      <section className={styles.heroDesktop} aria-labelledby="recipe-app-hero-heading">
        <div className={styles.heroDesktopInner}>
          <div className={styles.heroDesktopContent}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>{recipeAppHero.eyebrow}</p>
              <h1 id="recipe-app-hero-heading" className={styles.heroTitle}>
                {recipeAppHero.title}
              </h1>
              <ul className={styles.heroList}>
                {recipeAppHero.bullets.map((bullet) => (
                  <li key={bullet.lead} className={styles.heroListItem}>
                    <HeroCheckIcon />
                    <span>
                      <strong className="text-[22px]">{bullet.lead}</strong>
                      <br />
                      {bullet.text}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={styles.heroTrial}>{recipeAppHero.trialHeading}</p>
            </div>
          </div>
          <StoreBadges className={styles.heroStoreRow} />
        </div>
      </section>

      <section className={styles.heroMobile} aria-labelledby="recipe-app-hero-mobile-heading">
        <div className={styles.heroMobileInner}>
          <p className={styles.heroEyebrow}>{recipeAppHero.eyebrow}</p>
          <h1 id="recipe-app-hero-mobile-heading" className={styles.heroTitle}>
            {recipeAppHero.title}
          </h1>
          <ul className={styles.heroList}>
            {recipeAppHero.bullets.map((bullet) => (
              <li key={bullet.lead} className={styles.heroListItem}>
                <HeroCheckIcon />
                <span>
                  <strong>{bullet.lead}</strong>
                  <br />
                  {bullet.text}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.heroTrial}>{recipeAppHero.trialHeading}</p>
          <StoreBadges className={styles.heroStoreRow} />
        </div>
      </section>

      <section className={styles.introSection} aria-labelledby="recipe-app-intro-heading">
        <div className={styles.sectionShell}>
          <h2 id="recipe-app-intro-heading" className={styles.introTitle}>
            {recipeAppIntro.title}
          </h2>
          <p className={styles.introBody}>{recipeAppIntro.body}</p>
          <div className={styles.awardsGrid}>
            {recipeAppAwards.map((award) => (
              <img
                key={award.src}
                src={award.src}
                alt={award.alt}
                width={award.width}
                height={award.height}
                className={styles.awardLogo}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.joinSection} aria-labelledby="recipe-app-join-heading">
        <div className={styles.joinShell}>
          <div className={styles.joinMobileCollageTop} aria-hidden="true">
            <Image
              src={recipeAppAssets.group1}
              alt=""
              width={recipeAppAssets.group1Width}
              height={recipeAppAssets.group1Height}
              className={styles.joinCollageImage}
              sizes="100vw"
            />
          </div>

          <div className={styles.joinGrid}>
            <div className={styles.joinCollageLeft}>
              <Image
                src={recipeAppAssets.group1}
                alt=""
                width={recipeAppAssets.group1Width}
                height={recipeAppAssets.group1Height}
                className={`${styles.joinCollageImage} ${styles.joinCollageImageLeft}`}
                sizes="(min-width: 1200px) 460px, (min-width: 768px) 38vw, 70vw"
              />
            </div>

            <div className={styles.joinCenter}>
              <h2 id="recipe-app-join-heading" className={styles.joinTitle}>
                {recipeAppJoin.title}
              </h2>
              <p className={styles.joinPrice}>{recipeAppJoin.price}</p>
              <a href={recipeAppLinks.trialCta} className={styles.joinCta}>
                {recipeAppJoin.cta}
              </a>
              <div className={styles.joinRatingRow}>
                <StarRatingInline />
                <p className={styles.ratingText}>{recipeAppJoin.rating}</p>
              </div>
            </div>

            <div className={styles.joinCollageRight}>
              <Image
                src={recipeAppAssets.group2}
                alt=""
                width={recipeAppAssets.group2Width}
                height={recipeAppAssets.group2Height}
                className={`${styles.joinCollageImage} ${styles.joinCollageImageRight}`}
                sizes="(min-width: 768px) 17vw, 30vw"
              />
            </div>
          </div>

          <div className={styles.joinMobileCollageBottom} aria-hidden="true">
            <Image
              src={recipeAppAssets.joinMobileBottomCollage}
              alt=""
              width={recipeAppAssets.joinMobileBottomCollageWidth}
              height={recipeAppAssets.joinMobileBottomCollageHeight}
              className={styles.joinCollageImage}
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.quoteSection} aria-labelledby="recipe-app-quote-heading">
        <div className={styles.sectionShell}>
          <div className={styles.quoteCard}>
            <div className={styles.quoteGrid}>
              <div className={styles.quoteCopy}>
                <svg className={styles.quoteIcon} viewBox="0 0 512 512" aria-hidden="true">
                  <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                </svg>
                <h2 id="recipe-app-quote-heading" className="sr-only">
                  Annabel Karmel quote
                </h2>
                <p className={styles.quoteText}>{recipeAppQuote.text}</p>
                <p className={styles.quoteAuthor}>{recipeAppQuote.author}</p>
              </div>
              <div className={styles.quoteImageWrap}>
                <Image
                  src={recipeAppAssets.annabelQuote}
                  alt="Annabel Karmel with a baby"
                  width={recipeAppAssets.annabelQuoteWidth}
                  height={recipeAppAssets.annabelQuoteHeight}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={styles.quoteImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecipeAppFeaturesScroll />

      <section className={styles.categoriesSection} aria-labelledby="recipe-app-categories-heading">
        <h2 id="recipe-app-categories-heading" className={styles.categoriesHeading}>
          Recipes that grow with your family
        </h2>
        <RecipeAppCategoryCarousel />
      </section>

      <section className={styles.weaningSection} aria-labelledby="recipe-app-weaning-heading">
        <div className={styles.sectionShell}>
          <div className={styles.weaningIntroDesktop}>
            <h2 className={styles.weaningTitle}>
              {recipeAppWeaning.desktopTitle}
            </h2>
            <p className={styles.weaningBody}>{recipeAppWeaning.body}</p>
          </div>
          <div className={styles.weaningIntroMobile}>
            <h2 id="recipe-app-weaning-heading" className={styles.weaningTitle}>
              {recipeAppWeaning.mobileTitle}
            </h2>
            <p className={styles.weaningBody}>{recipeAppWeaning.body}</p>
          </div>

          <div className={styles.weaningCards}>
            {recipeAppWeaning.cards.map((card) => (
              <article key={card.title} className={styles.weaningCard}>
                <h3 className={styles.weaningCardTitle}>{card.title}</h3>
                <p className={styles.weaningCardBody}>{card.body}</p>
                <div className={styles.weaningCardImageWrap}>
                  <Image
                    src={card.image}
                    alt=""
                    width={card.imageWidth}
                    height={card.imageHeight}
                    sizes="(max-width: 767px) 300px, 200px"
                    unoptimized
                    className={styles.weaningCardImage}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecipeAppDiscoverFeatures />
      <RecipeAppTestimonialCarousel />
      <RecipeAppPricingSection />

      <div className={styles.instagramWrap}>
        <InstagramShareSection />
      </div>
    </main>
  );
}
