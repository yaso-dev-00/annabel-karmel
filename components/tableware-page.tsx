import { InstagramShareSection } from "@/components/instagram-share-section";
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

function FeatureCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d="M16.9544 6.69268C16.677 5.15608 15.2229 4.13632 13.704 4.40467C14.4261 3.0271 13.9165 1.31756 12.5549 0.574108C11.1874 -0.17332 9.47954 0.341531 8.7417 1.72308C8.73973 1.72705 8.73776 1.73302 8.73579 1.73699C8.73973 1.73302 8.73383 1.72904 8.73186 1.72507C8.11797 0.281895 6.46322 -0.388006 5.03475 0.230212C3.60825 0.846442 2.94517 2.51623 3.55315 3.95741C2.05778 3.54593 0.513224 4.43449 0.101997 5.94525C-0.311198 7.45799 0.568316 9.02441 2.06565 9.44186C0.81033 10.3682 0.536835 12.1453 1.45177 13.4136C2.3667 14.6798 4.12179 14.9581 5.37711 14.0397C5.31218 15.6061 6.51635 16.93 8.06878 16.9976C9.62121 17.0652 10.9336 15.8487 11.0005 14.2783C11.0005 14.2743 11.0005 14.2703 11.0005 14.2663C11.0044 14.2703 11.0084 14.2743 11.0123 14.2783C12.187 15.306 13.9637 15.1768 14.9829 13.99C15.9942 12.8093 15.8723 11.0282 14.7153 9.99647C16.2323 9.70425 17.2338 8.23126 16.9544 6.69466V6.69268Z"
        fill="#CA9591"
      />
    </svg>
  );
}

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

      <section
        className={styles.featuresSection}
        aria-labelledby="tableware-features-heading"
      >
        <div className={styles.featuresCard}>
          <img
            src={tablewareAssets.practicalLeft}
            alt=""
            className={`${styles.featuresArtLeft} ${styles.featuresArtDesktop}`}
            aria-hidden
            decoding="async"
          />
          <img
            src={tablewareAssets.practicalLeftMobile}
            alt=""
            className={`${styles.featuresArtLeft} ${styles.featuresArtMobile}`}
            aria-hidden
            decoding="async"
          />
          <img
            src={tablewareAssets.practicalRight}
            alt=""
            className={`${styles.featuresArtRight} ${styles.featuresArtDesktop}`}
            aria-hidden
            decoding="async"
          />
          <img
            src={tablewareAssets.practicalRightMobile}
            alt=""
            className={`${styles.featuresArtRight} ${styles.featuresArtMobile}`}
            aria-hidden
            decoding="async"
          />
          <h2 id="tableware-features-heading" className={styles.featuresHeading}>
            {tablewareFeatures.heading}
          </h2>
          <div className={styles.featuresColumns}>
            {tablewareFeatures.columns.map((column, columnIndex) => (
              <ul key={columnIndex} className={styles.featuresList}>
                {column.map((item) => (
                  <li key={item} className={styles.featuresItem}>
                    <span className={styles.featuresIcon}>
                      <FeatureCheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

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
