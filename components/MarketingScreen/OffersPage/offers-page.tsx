import Link from "next/link";

import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import {
  offersPageAward,
  offersPageAssets,
  offersPageChilled,
  offersPageDiscover,
  offersPageFrozen,
  offersPageHero,
  offersPageIntro,
  type RetailerOffer,
} from "@/data/offers-page";
import styles from "./offers-page.module.css";

function OfferRetailerBlock({
  offer,
  priceColor,
  buttonVariant,
}: {
  offer: RetailerOffer;
  priceColor: string;
  buttonVariant: "chilled" | "frozen";
}) {
  return (
    <div className={styles.retailerBlock}>
      <div className="py-[20px] text-center">
        <img src={offer.logo} alt={offer.logoAlt} className={styles.retailerLogo} />
      </div>
      <p className={styles.offerPriceLine}>
        <strong>
          Now{" "}
          <span className={styles.offerPrice} style={{ color: priceColor }}>
            {offer.nowPrice}
          </span>
          <span className="font-[500]">{offer.nowSuffix ? ` ${offer.nowSuffix}` : null}</span>
        </strong>
      </p>
      <p className={styles.wasPrice}>
        Was <del>{offer.wasPrice}</del>
      </p>
      <a
        href={offer.shopHref}
        target="_blank"
        rel="noreferrer"
        className={`${styles.shopButton} ${
          buttonVariant === "chilled" ? styles.shopButtonChilled : styles.shopButtonFrozen
        }`}
      >
        SHOP NOW
      </a>
      <p className={styles.expiry}>Offer ends {offer.expires}</p>
    </div>
  );
}

function OfferColumn({
  title,
  image,
  imageAlt,
  backgroundColor,
  buttonVariant,
  priceColor,
  priceColors,
  offers,
}: {
  title: string;
  image: string;
  imageAlt: string;
  backgroundColor: string;
  buttonVariant: "chilled" | "frozen";
  priceColor?: string;
  priceColors?: string[];
  offers: RetailerOffer[];
}) {
  return (
    <article className={styles.offerCard} style={{ backgroundColor }}>
      <h2 className={styles.offerCardTitle}>{title}</h2>
      <img src={image} alt={imageAlt} className={styles.offerImage} />
      {offers.map((offer, index) => (
        <OfferRetailerBlock
          key={offer.logoAlt}
          offer={offer}
          priceColor={priceColors?.[index] ?? priceColor ?? "#b7daea"}
          buttonVariant={buttonVariant}
        />
      ))}
    </article>
  );
}

export function OffersPageContent() {
  return (
    <main className={styles.page}>
      <section
        className={`${styles.fullBleed} ${styles.woodSection} ${styles.heroSection}`}
        aria-labelledby="offers-hero-heading"
      >
        <div className={styles.inner}>
          <h1 id="offers-hero-heading" className={styles.heroTitle}>
            {offersPageHero.title}
            <br />
            {offersPageHero.subtitle}
          </h1>
        </div>
      </section>

      <section className={styles.fullBleed} aria-label="Family enjoying Annabel Karmel meals">
        <img
          src={offersPageAssets.header}
          alt="Annabel Karmel expert ranges for toddlers and kids"
          className="block h-auto w-full"
          fetchPriority="high"
        />
      </section>

      <section className={`${styles.fullBleed} ${styles.woodSection} ${styles.introSection}`}>
        <div className={styles.inner}>
          <p className={styles.introText}>{offersPageIntro}</p>
        </div>
      </section>

      <section className={`${styles.fullBleed} mt-[30px] md:mt-[40px]`} aria-label="Supermarket offers">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          <OfferColumn
            title={offersPageChilled.title}
            image={offersPageChilled.image}
            imageAlt={offersPageChilled.title}
            backgroundColor={offersPageChilled.backgroundColor}
            buttonVariant="chilled"
            priceColor={offersPageChilled.priceColor}
            offers={offersPageChilled.offers}
          />
          <OfferColumn
            title={offersPageFrozen.title}
            image={offersPageFrozen.image}
            imageAlt={offersPageFrozen.title}
            backgroundColor={offersPageFrozen.backgroundColor}
            buttonVariant="frozen"
            priceColors={offersPageFrozen.priceColors}
            offers={offersPageFrozen.offers}
          />
        </div>
      </section>

      <section className={`${styles.fullBleed} ${styles.awardSection}`} aria-labelledby="offers-award-heading">
        <div className={`${styles.woodSection} ${styles.awardCopy}`}>
          <h2 id="offers-award-heading" className={styles.awardHeading}>
            {offersPageAward.heading}
          </h2>
          <p className={styles.awardBody}>{offersPageAward.body}</p>
        </div>
        <div className={styles.awardImageWrap} aria-hidden="true" />
      </section>

      <section className={styles.fullBleed} aria-label="Discover our meal ranges">
        <div className="grid grid-cols-1 gap-[20px]  md:grid-cols-2">
          {offersPageDiscover.map((card) => (
            <article key={card.href} className={styles.discoverCard}>
              <img src={card.image} alt="" className={styles.discoverImage} />
              <Link href={card.href} className={styles.discoverButton}>
                {card.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <InstagramShareSection className={`${styles.fullBleed} bg-white pt-[90px] pb-10 md:pb-16`} />
    </main>
  );
}
