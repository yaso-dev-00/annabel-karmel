import type { CSSProperties } from "react";

import { BookImageCarousel } from "@/components/SharedCarousels/BookImageCarousel";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { ourBooksAssets } from "@/data/our-books-page";
import type { CookbookPageData } from "@/lib/cookbooks";
import styles from "./cookbook-detail-page.module.css";

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

function DetailBody({ cookbook }: { cookbook: CookbookPageData }) {
  const paragraphs = cookbook.detailBody.split("\n\n");

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.bodyCopy}>
          {renderHighlightedText(paragraph, cookbook.detailBodyHighlights)}
        </p>
      ))}
    </>
  );
}

type CookbookDetailPageContentProps = {
  cookbook: CookbookPageData;
};

export function CookbookDetailPageContent({ cookbook }: CookbookDetailPageContentProps) {
  const pageStyle = {
    "--wood-bg": `url(${ourBooksAssets.woodBackground})`,
  } as CSSProperties;

  return (
    <>
    <main className={styles.page} style={pageStyle}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>{cookbook.title}</h1>

        <div className={styles.detailGrid}>
          <div className={styles.mediaCol}>
            <div className={styles.carouselPanel}>
              <BookImageCarousel
                images={cookbook.carouselImages}
                title={cookbook.title}
                showMobileTitle={false}
              />
            </div>
            <a
              href={cookbook.buyNowHref}
              className={styles.buyButton}
              target="_blank"
              rel="noreferrer"
            >
              Buy Now
            </a>
          </div>

          <div className={styles.contentCol}>
            <DetailBody cookbook={cookbook} />
            <p className={styles.suitableFor}>
              <strong>Suitable for </strong>
              <span>{cookbook.suitableFor}</span>
            </p>
          </div>
        </div>
      </div>

    
    </main>
      <div className={styles.shareWrap}>
      <InstagramShareSection />
    </div>
    </>
  );
}
