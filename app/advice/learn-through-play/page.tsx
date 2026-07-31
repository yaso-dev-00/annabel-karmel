import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  edxEducationPromo,
  learnThroughPlayActivitiesIntro,
  learnThroughPlayClosing,
  learnThroughPlayDevelopmentImage,
  learnThroughPlayIntro,
  learnThroughPlayLead,
  learnThroughPlayRelatedArticles,
  learnThroughPlaySections,
} from '@/data/learn-through-play-page';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Learning through play | Child Development | Annabel Karmel',
  description:
    'Seven simple learn-through-play activities for toddlers including messy play, play dough, open-ended toys, singing, story time, and more.',
};

export default function LearnThroughPlayPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <p className={styles.leadBold}>{learnThroughPlayLead}</p>

          {learnThroughPlayIntro.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}

          <img
            src={learnThroughPlayDevelopmentImage.src}
            alt={learnThroughPlayDevelopmentImage.alt}
            width={700}
            height={700}
            className={styles.developmentImage}
            loading="lazy"
          />

          <p className={styles.activitiesIntro}>
            {learnThroughPlayActivitiesIntro}
          </p>

          {learnThroughPlaySections.map((section) => (
            <section key={section.title}>
              <p className={styles.subheading}>{section.title}</p>
              <img
                src={section.image}
                alt={section.imageAlt}
                width={1000}
                height={667}
                className={styles.contentImage}
                loading="lazy"
              />
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.body}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {learnThroughPlayClosing.map((paragraph, index) => (
            <p key={index} className={styles.body}>
              {paragraph}
            </p>
          ))}

          <section className="text-center">
            <h2 className={styles.promoTitle}>{edxEducationPromo.title}</h2>
            <img
              src={edxEducationPromo.image}
              alt={edxEducationPromo.imageAlt}
              width={300}
              height={300}
              className={styles.promoImage}
              loading="lazy"
            />
            <p className={styles.promoDescription}>
              {edxEducationPromo.description}
            </p>
            <div className="mt-[30px] flex justify-center">
              <Link
                href={edxEducationPromo.shopHref}
                className={styles.promoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={edxEducationPromo.shopButtonImage}
                  alt="Shop Edx Education's toys here"
                  width={390}
                  height={80}
                  className="h-auto w-[390px] max-w-full"
                />
              </Link>
            </div>
            <p
              className={`${styles.body} mt-[30px]! flex flex-col md:flex-row items-center justify-center gap-[10px]`}
            >
              <Link
                href={edxEducationPromo.instagramHref}
                className={styles.promoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={edxEducationPromo.instagramIcon}
                  alt="Follow Edx Education on Instagram"
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] shrink-0"
                />
              </Link>
              <Link
                href={edxEducationPromo.instagramHref}
                className={`${styles.promoLink} font-bold underline underline-offset-2`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Edx Education on Instagram
              </Link>
            </p>
          </section>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={learnThroughPlayRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
