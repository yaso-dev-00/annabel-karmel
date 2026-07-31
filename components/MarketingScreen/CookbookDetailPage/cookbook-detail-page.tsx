import type { CSSProperties } from 'react';

import { BookImageCarousel } from '@/components/SharedCarousels/BookImageCarousel';
import { ourBooksAssets } from '@/data/our-books-page';
import type { CookbookPageData } from '@/lib/cookbooks';
import { renderHighlightedText } from '@/lib/cookbooks/highlight-text';
import styles from './cookbook-detail-page.module.css';

function DetailBody({ cookbook }: { cookbook: CookbookPageData }) {
  const paragraphs = cookbook.detailBody.split('\n\n');

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

export function CookbookDetailPageContent({
  cookbook,
}: CookbookDetailPageContentProps) {
  const pageStyle = {
    '--wood-bg': `url(${ourBooksAssets.woodBackground})`,
  } as CSSProperties;

  return (
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
  );
}
