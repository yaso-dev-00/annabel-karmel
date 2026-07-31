import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  gemmaExpertHref,
  toddlerTopTips,
  toddlerTopTipsIntro,
  toddlerTopTipsLead,
  toddlerTopTipsRelatedArticles,
  toddlersTeensCourseUrl,
  toddlersTeensUrl,
  ttabLogoSrc,
  type ToddlerFoodTipLink,
} from '@/data/toddler-top-tips-healthy-food-habits-page';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Toddler Top Tips to Healthy Food Habits | Annabel Karmel',
  description:
    'Top tips from Annabel Karmel and ToddlersTeensAndBetween to help your little eater develop healthy mealtimes habits and a smoother food experience for all.',
};

function isTipLink(
  part: string | ToddlerFoodTipLink,
): part is ToddlerFoodTipLink {
  return typeof part === 'object';
}

function TipBody({ tip }: { tip: (typeof toddlerTopTips)[number] }) {
  if (tip.bodyParts) {
    return (
      <p className={`${styles.tipBody} mt-[30px]! pl-[30px]!`}>
        {tip.bodyParts.map((part) =>
          isTipLink(part) ? (
            <Link
              key={part.label}
              href={part.href}
              className={styles.inlineLink}
              target="_blank"
              rel="noreferrer"
            >
              {part.label}
            </Link>
          ) : (
            part
          ),
        )}
      </p>
    );
  }

  return (
    <p className={`${styles.tipBody} mt-[30px]! pl-[30px]!`}>{tip.body}</p>
  );
}

export default function ToddlerTopTipsHealthyFoodHabitsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {toddlerTopTipsIntro.map((paragraph) => (
            <p key={paragraph} className={styles.bodyText}>
              {paragraph}
            </p>
          ))}

          <p className={styles.bodyText}>
            {toddlerTopTipsLead.split('ToddlersTeensAndBetween')[0]}
            <Link
              href={toddlersTeensUrl}
              className={styles.inlineLink}
              target="_blank"
              rel="noreferrer"
            >
              ToddlersTeensAndBetween
            </Link>
            {toddlerTopTipsLead.split('ToddlersTeensAndBetween')[1]}
          </p>

          <ol className={styles.tipsList}>
            {toddlerTopTips.map((tip, index) => (
              <li key={tip.title} className={styles.tipItem}>
                <p className={styles.tipBody}>
                  {index + 1}.{' '}
                  <strong className={styles.tipTitle}>{tip.title}</strong>
                </p>
                <TipBody tip={tip} />
              </li>
            ))}
          </ol>

          <p className={styles.closing}>
            If you&apos;d like more support with the behaviour of your toddler,
            you can subscribe to Toddlers Teens and Inbetweens&apos; course{' '}
            <Link
              href={toddlersTeensCourseUrl}
              className={styles.closingLink}
              target="_blank"
              rel="noreferrer"
            >
              <strong>HERE</strong>
            </Link>{' '}
            or be in touch with Toddler expert Gemma on the{' '}
            <Link href={gemmaExpertHref} className={styles.closingLink}>
              AK expert page
            </Link>{' '}
            and book in a bespoke Troubleshooting Guidance Call today!
          </p>

          <Link
            href={toddlersTeensUrl}
            className={styles.ttabLogoLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Toddlers Teens and Between"
          >
            <img
              src={ttabLogoSrc}
              alt="Toddlers Teens and Between logo"
              width={300}
              height={300}
              className={styles.ttabLogo}
              loading="lazy"
            />
          </Link>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={toddlerTopTipsRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
