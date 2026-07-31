import { FoodCategoryAccordion } from '@/components/ArticleScreen/FoodCategoryAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import type { RelatedArticleItem } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { defaultRelatedArticles } from '@/data/default-related-articles';
import Link from 'next/link';
import { Fragment } from 'react';
import defaultStyles from './breastfeeding-article.module.css';

export const milkMakingMamaInstagramUrl =
  'https://www.instagram.com/milkmakingmama/';

/**
 * Class-name map an article can supply to override the shared look
 * (e.g. a different heading font-family). Any missing key falls back
 * to the shared `breastfeeding-article.module.css`.
 */
export type ArticleStyles = Partial<
  Record<
    | 'body'
    | 'bodyBold'
    | 'bodyBoldItalic'
    | 'sectionTitle'
    | 'subTitle'
    | 'image'
    | 'divider'
    | 'list'
    | 'orderedList'
    | 'accordion'
    | 'inlineBold'
    | 'inlineLink'
    | 'relatedTitle'
    | 'relatedText',
    string
  >
>;

/** A run of text, optionally wrapped in a link or bolded. */
export type BreastfeedingInline =
  string | { text: string; href: string } | { text: string; bold: true };

export type BreastfeedingAccordionItem = {
  title: string;
  paragraphs?: string[];
  listItems?: string[];
  closingParagraphs?: string[];
};

export type BreastfeedingBlock =
  | {
      type: 'paragraph';
      content: BreastfeedingInline[];
      bold?: boolean;
      italic?: boolean;
    }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'divider'; src?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'accordion'; items: BreastfeedingAccordionItem[] }
  | {
      type: 'relatedLinks';
      intro: string;
      links: { label: string; href: string }[];
    }
  /** Standard "Visit @milkmakingmama for more advice and support." sign-off. */
  | { type: 'milkMakingMamaClosing'; prefix?: string };

export type BreastfeedingArticle = {
  metaTitle: string;
  metaDescription: string;
  blocks: BreastfeedingBlock[];
};

type StyleMap = Record<string, string | undefined>;

function renderInline(content: BreastfeedingInline[], styles: StyleMap) {
  return content.map((part, index) => {
    if (typeof part === 'string') {
      return <Fragment key={index}>{part}</Fragment>;
    }
    if ('bold' in part) {
      return (
        <strong key={index} className={styles.inlineBold}>
          {part.text}
        </strong>
      );
    }
    return (
      <Link
        key={index}
        href={part.href}
        className={styles.inlineLink}
        target={part.href.startsWith('http') ? '_blank' : undefined}
        rel={part.href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {part.text}
      </Link>
    );
  });
}

function paragraphClassName(
  block: Extract<BreastfeedingBlock, { type: 'paragraph' }>,
  styles: StyleMap,
) {
  if (block.bold && block.italic) {
    return styles.bodyBoldItalic;
  }
  if (block.bold) {
    return styles.bodyBold;
  }
  return styles.body;
}

function BreastfeedingBlockView({
  block,
  styles,
}: {
  block: BreastfeedingBlock;
  styles: StyleMap;
}) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={paragraphClassName(block, styles)}>
          {renderInline(block.content, styles)}
        </p>
      );
    case 'heading':
      return <h2 className={styles.sectionTitle}>{block.text}</h2>;
    case 'subheading':
      return <h3 className={styles.subTitle}>{block.text}</h3>;
    case 'image':
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.image}
          src={block.src}
          alt={block.alt}
          loading="lazy"
        />
      );
    case 'divider':
      return block.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.divider}
          src={block.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      ) : (
        <hr className={styles.divider} />
      );
    case 'list':
      return block.ordered ? (
        <ol className={styles.orderedList}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'accordion':
      return (
        <div className={styles.accordion}>
          <FoodCategoryAccordion items={block.items} defaultOpenTitle={null} />
        </div>
      );
    case 'relatedLinks':
      return (
        <>
          <p className={styles.body}>{block.intro}</p>
          <ul className={styles.list}>
            {block.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.inlineLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      );
    case 'milkMakingMamaClosing':
      return (
        <p className={styles.bodyBold}>
          {block.prefix ? `${block.prefix} ` : ''}Visit{' '}
          <Link
            href={milkMakingMamaInstagramUrl}
            className={styles.inlineLink}
            target="_blank"
            rel="noreferrer"
          >
            @milkmakingmama
          </Link>{' '}
          for more advice and support.
        </p>
      );
    default:
      return null;
  }
}

type BreastfeedingArticlePageProps = {
  blocks: BreastfeedingBlock[];
  relatedArticles?: RelatedArticleItem[];
  /** Per-article CSS module overrides; falls back to the shared stylesheet. */
  styles?: ArticleStyles;
};

export function BreastfeedingArticlePage({
  blocks,
  relatedArticles = defaultRelatedArticles,
  styles: styleOverrides,
}: BreastfeedingArticlePageProps) {
  const styles: StyleMap = { ...defaultStyles, ...styleOverrides };

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {blocks.map((block, index) => (
            <BreastfeedingBlockView key={index} block={block} styles={styles} />
          ))}

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
