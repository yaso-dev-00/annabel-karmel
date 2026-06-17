import type { CSSProperties } from "react";

import { BookImageCarousel } from "@/components/book-image-carousel";
import { InstagramShareSection } from "@/components/instagram-share-section";
import {
  ourBooksAssets,
  ourBooksGridIntro,
  ourBooksHero,
  ourBooksProducts,
  type OurBooksProduct,
} from "@/data/our-books-page";
import styles from "./our-books-page.module.css";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, highlights: string[]) {
  if (highlights.length === 0) {
    return text;
  }

  const pattern = new RegExp(
    `(${[...highlights].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})`,
    "g",
  );

  return text.split(pattern).map((part, index) => {
    if (highlights.includes(part)) {
      return <strong key={`${part}-${index}`}>{part}</strong>;
    }
    return part;
  });
}

function BookBody({ product }: { product: OurBooksProduct }) {
  const paragraphs = product.body.split("\n\n");

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.bookBody}>
          {renderHighlightedText(paragraph, product.bodyHighlights)}
        </p>
      ))}
    </>
  );
}

function BookSection({ product }: { product: OurBooksProduct }) {
  return (
    <section className={styles.bookSection} aria-labelledby={`book-${product.slug}`}>
      <div className={styles.bookPanel}>
        <div className={styles.inner}>
          <div className={styles.bookGrid}>
            <div className={styles.bookContent}>
            <h2 id={`book-${product.slug}`} className={styles.bookTitle}>
              {product.title}
            </h2>
            <p className={styles.bookSubtitle}>{product.subtitle}</p>
            <BookBody product={product} />
            <p className={styles.suitableFor}>
              <strong>Suitable for </strong>
              <span>{product.suitableFor}</span>
            </p>
            <div className={styles.bookActions}>
              <a
                href={product.moreInfoHref}
                className={styles.bookButton}
                target="_blank"
                rel="noreferrer"
              >
                More Info
              </a>
              <a
                href={product.buyNowHref}
                className={styles.bookButton}
                target="_blank"
                rel="noreferrer"
              >
                Buy Now
              </a>
            </div>
          </div>

          <div className={styles.bookCarouselCol}>
            <BookImageCarousel images={product.carouselImages} title={product.title} />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export function OurBooksPageContent() {
  const pageStyle = {
    "--wood-bg": `url(${ourBooksAssets.woodBackground})`,
    "--portrait-bg": `url(${ourBooksAssets.annabelPortrait})`,
  } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>{ourBooksHero.title}</h1>

        <img
          src={ourBooksAssets.booksCollage}
          alt="A collection of Annabel Karmel bestselling cookbooks"
          className={styles.collage}
          width={1200}
          height={400}
          decoding="async"
          fetchPriority="high"
        />

        <div className={styles.introGrid}>
          <div className={styles.introCopy}>
            {ourBooksHero.intro.map((paragraph) => (
              <p key={paragraph} className={styles.introText}>
                {paragraph}
              </p>
            ))}
            <img
              src={ourBooksAssets.annabelSignature}
              alt="Annabel Karmel signature"
              className={styles.signature}
              width={280}
              height={80}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.introPortrait} role="img" aria-label="Annabel Karmel in her kitchen" />
        </div>

        <div className={styles.gridIntro}>
          <h2 className={styles.sectionHeading}>{ourBooksGridIntro.heading}</h2>
          <p className={styles.gridIntroText}>
            {ourBooksGridIntro.body}
            <br />
            {ourBooksGridIntro.body2}
            <br />
            {ourBooksGridIntro.body3}

          </p>
        </div>
      </div>

      {ourBooksProducts.map((product) => (
        <BookSection key={product.slug} product={product} />
      ))}

      <InstagramShareSection />
    </main>
  );
}
