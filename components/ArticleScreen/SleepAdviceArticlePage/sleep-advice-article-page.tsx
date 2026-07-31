import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  careItOutEcourseUrl,
  careItOutFreeVideoUrl,
  careItOutPodcastUrl,
  careItOutUrl,
  kerrySeckerFacebookUrl,
  kerrySeckerInstagramUrl,
} from '@/data/kerry-secker-attribution';
import type { RelatedArticleItem } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import Link from 'next/link';
import defaultStyles from './sleep-advice.module.css';

type StyleMap = Record<string, string | undefined>;

/**
 * Class-name map an article can supply to override the shared look
 * (e.g. a different heading font-family). Missing keys fall back to
 * the shared `sleep-advice.module.css`.
 */
export type SleepArticleStyles = Partial<Record<string, string>>;

export type SleepAdviceTableRow = {
  label: string;
  value: string;
};

export type SleepAdviceHighlightedItem = {
  title: string;
  paragraphs: string[];
};

export type SleepAdviceListItem =
  | string
  | {
      label: string;
      text: string;
    };

export type SleepAdviceSection = {
  title: string;
  paragraphs?: string[];
  afterListParagraphs?: string[];
  highlightedItems?: SleepAdviceHighlightedItem[];
  listItems?: SleepAdviceListItem[];
  ordered?: boolean;
  tableRows?: SleepAdviceTableRow[];
  image?: string;
  imageAlt?: string;
  /** Render the image directly under the title, before the paragraphs. */
  imageFirst?: boolean;
};

type SleepAdviceArticlePageProps = {
  sections: SleepAdviceSection[];
  relatedArticles: RelatedArticleItem[];
  attributionImage: string;
  /** Per-article CSS module overrides; falls back to the shared stylesheet. */
  styles?: SleepArticleStyles;
};

function renderListItem(item: SleepAdviceListItem, styles: StyleMap) {
  if (typeof item === 'string') {
    return item;
  }

  return (
    <>
      <strong className={styles.listLabel}>{item.label}</strong>: {item.text}
    </>
  );
}

function listItemKey(item: SleepAdviceListItem) {
  return typeof item === 'string' ? item : `${item.label}:${item.text}`;
}

function SleepAdviceImage({
  section,
  styles,
}: {
  section: SleepAdviceSection;
  styles: StyleMap;
}) {
  if (!section.image) {
    return null;
  }

  return (
    <img
      src={section.image}
      alt={section.imageAlt ?? section.title}
      width={1000}
      height={667}
      className={styles.contentImage}
      loading="lazy"
    />
  );
}

function SleepAdviceSection({
  section,
  styles,
  isFirst = false,
}: {
  section: SleepAdviceSection;
  styles: StyleMap;
  isFirst?: boolean;
}) {
  return (
    <section>
      {isFirst ? (
        <h1 className={styles.pageTitle}>{section.title}</h1>
      ) : (
        <h2 className={styles.sectionTitle}>{section.title}</h2>
      )}

      {section.imageFirst ? (
        <SleepAdviceImage section={section} styles={styles} />
      ) : null}

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className={styles.body}>
          {paragraph}
        </p>
      ))}

      {section.highlightedItems && section.highlightedItems.length > 0 ? (
        <div className={styles.highlightedBlock}>
          {section.highlightedItems.map((item) => (
            <div key={item.title} className={styles.highlightedItem}>
              <h3 className={styles.highlightedItemTitle}>{item.title}</h3>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.highlightedBody}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {!section.imageFirst ? (
        <SleepAdviceImage section={section} styles={styles} />
      ) : null}

      {section.listItems && section.listItems.length > 0 ? (
        section.ordered ? (
          <ol className={styles.orderedList}>
            {section.listItems.map((item) => (
              <li key={listItemKey(item)}>{renderListItem(item, styles)}</li>
            ))}
          </ol>
        ) : (
          <ul className={styles.list}>
            {section.listItems.map((item) => (
              <li key={listItemKey(item)}>{renderListItem(item, styles)}</li>
            ))}
          </ul>
        )
      ) : null}

      {section.afterListParagraphs?.map((paragraph) => (
        <p key={paragraph} className={styles.body}>
          {paragraph}
        </p>
      ))}

      {section.tableRows && section.tableRows.length > 0 ? (
        <table className={styles.table}>
          <tbody>
            {section.tableRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </section>
  );
}

export function SleepAdviceArticlePage({
  sections,
  relatedArticles,
  attributionImage,
  styles: styleOverrides,
}: SleepAdviceArticlePageProps) {
  const styles: StyleMap = { ...defaultStyles, ...styleOverrides };

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {sections.map((section, index) => (
            <SleepAdviceSection
              key={section.title}
              section={section}
              styles={styles}
              isFirst={index === 0}
            />
          ))}

          <div className={styles.attributionBlock}>
            <img
              src={attributionImage}
              alt="Kerry Secker Baby Sleep Expert"
              width={320}
              height={320}
              className={styles.attributionImage}
              loading="lazy"
            />
            <p className={styles.attribution}>
              Visit{' '}
              <Link
                href={careItOutUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                Care It Out
              </Link>
              &reg; for more information and{' '}
              <Link
                href={careItOutFreeVideoUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                free video
              </Link>{' '}
              to get you started.
            </p>
            <p className={styles.attribution}>
              Kerry Secker&apos;s{' '}
              <Link
                href={careItOutEcourseUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                Ecourse
              </Link>{' '}
              on bedtime basics for under 18 months is now available. The Care
              Care It Out{' '}
              <Link
                href={careItOutPodcastUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                Sleep Show Podcast
              </Link>{' '}
              is also now live with new episodes fortnightly.
            </p>
            <p className={styles.attribution}>
              Follow Kerry on{' '}
              <Link
                href={kerrySeckerFacebookUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </Link>{' '}
              and{' '}
              <Link
                href={kerrySeckerInstagramUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </Link>
              .
            </p>
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
