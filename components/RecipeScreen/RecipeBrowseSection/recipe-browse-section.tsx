import Link from 'next/link';

import type { RecipeBrowseTile } from '@/data/recipes-archive-page';
import styles from './recipe-browse-section.module.css';

type RecipeBrowseSectionProps = {
  heading: string;
  subheading?: string;
  tiles: RecipeBrowseTile[];
};

export function RecipeBrowseSection({
  heading,
  subheading,
  tiles,
}: RecipeBrowseSectionProps) {
  return (
    <section
      className={styles.browseSection}
      aria-labelledby={`browse-${heading.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-3.5">
        <div className={styles.headingWrap}>
          <h2
            id={`browse-${heading.replace(/\s+/g, '-').toLowerCase()}`}
            className={styles.heading}
          >
            {heading}
          </h2>
          {subheading ? (
            <p className={styles.subheading}>{subheading}</p>
          ) : null}
        </div>

        <div className={styles.grid}>
          {tiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className={styles.tileLink}>
              <div className={styles.tileInner}>
                <img
                  src={tile.image}
                  alt={tile.imageAlt}
                  className={styles.tileImage}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.tileContent}>
                  <p className={styles.tileTitle}>{tile.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
