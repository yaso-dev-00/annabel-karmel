import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  bigCleanSection,
  lessStrenuousSection,
  motherBoxUrl,
  nestingIntro,
  nestingRelatedArticles,
  type NestingParagraph,
} from '@/data/nesting-page';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Nesting in pregnancy: why and how to | Annabel Karmel',
  description:
    'Why nesting happens in late pregnancy, how to clean and prepare safely, and practical tips for your hospital bag, birth plan, and essentials.',
};

function paragraphKey(paragraph: NestingParagraph, index: number): string {
  if (typeof paragraph === 'string') {
    return paragraph.slice(0, 48);
  }
  return paragraph.parts
    .map((part) => (typeof part === 'string' ? part : part.label))
    .join('|')
    .slice(0, 48);
}

function NestingParagraphBlock({ paragraph }: { paragraph: NestingParagraph }) {
  if (typeof paragraph === 'string') {
    return <p className={styles.bodyText}>{paragraph}</p>;
  }

  return (
    <p className={styles.bodyText}>
      {paragraph.parts.map((part) =>
        typeof part === 'string' ? (
          part
        ) : (
          <Link
            key={part.label}
            href={part.href}
            className={styles.inlineLink}
            target={part.href.startsWith('http') ? '_blank' : undefined}
            rel={part.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <strong>{part.label}</strong>
          </Link>
        ),
      )}
    </p>
  );
}

function NestingSection({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: NestingParagraph[];
}) {
  return (
    <section>
      <h2 className={styles.sectionHeading}>{heading}</h2>
      {paragraphs.map((paragraph, index) => (
        <NestingParagraphBlock
          key={`${heading}-${paragraphKey(paragraph, index)}`}
          paragraph={paragraph}
        />
      ))}
    </section>
  );
}

export default function NestingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {nestingIntro.map((paragraph, index) => (
            <NestingParagraphBlock
              key={paragraphKey(paragraph, index)}
              paragraph={paragraph}
            />
          ))}

          <NestingSection
            heading={bigCleanSection.heading}
            paragraphs={bigCleanSection.paragraphs}
          />
          <NestingSection
            heading={lessStrenuousSection.heading}
            paragraphs={lessStrenuousSection.paragraphs}
          />

          <p className={styles.attribution}>
            <strong>
              Alexis and Beccy are the duo behind{' '}
              <Link
                href={motherBoxUrl}
                className={styles.attributionLink}
                target="_blank"
                rel="noreferrer"
              >
                The Mother Box
              </Link>{' '}
              – a complete package of pregnancy, birth and postnatal gifts,
              courses and workshops carefully created to nurture, heal and
              empower new mums.
            </strong>
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={nestingRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
