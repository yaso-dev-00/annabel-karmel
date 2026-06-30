import { InstagramShareSection } from "@/components/instagram-share-section";
import { TablewareFeaturesSection } from "@/components/tableware-features-section";
import { TablewareHeroCarousel } from "@/components/tableware-hero-carousel";
import { TablewareProductCard } from "@/components/tableware-product-card";
import {
  tablewareAssets,
  tablewareFeatures,
  tablewareIntro,
  tablewareProducts,
  tablewareStory,
} from "@/data/tableware-page";
import styles from "./tableware-page.module.css";

export function TablewarePageContent() {
  return (
    <main className={styles.page}>
      <TablewareHeroCarousel />

      <section className={styles.introSection} aria-label="Grow by Annabel Karmel">
        <div className={styles.introInner}>
          <img
            src={tablewareAssets.growLogo}
            alt="grow by Annabel Karmel"
            className={styles.growLogo}
            width={245}
            height={70}
            decoding="async"
          />
          <p className={styles.introText}>{tablewareIntro.body}</p>
        </div>
      </section>

      <section className={styles.productsSection} aria-label="Grow tableware products">
        <div className={styles.productsGrid}>
          {tablewareProducts.map((product) => (
            <TablewareProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <TablewareFeaturesSection
        heading={tablewareFeatures.heading}
        columns={tablewareFeatures.columns}
      />

      <section className={styles.lifestyleSection} aria-label="Grow tableware lifestyle">
        <img
          src={tablewareAssets.lifestyleBanner}
          alt=""
          className={styles.lifestyleImage}
          decoding="async"
        />
      </section>

      <section className={styles.storySection} aria-labelledby="tableware-story-heading">
        <div className={styles.storyInner}>
          <h2 id="tableware-story-heading" className={styles.storyHeading}>
            {tablewareStory.heading}
          </h2>
          <div className={styles.storyBody}>
            {tablewareStory.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 3 ? styles.storyParagraphLeft : styles.storyParagraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p
            className={styles.distributor}
            dangerouslySetInnerHTML={{ __html: tablewareStory.distributor }}
          />
        </div>
      </section>

      <InstagramShareSection />
    </main>
  );
}
