import { ArticleRecipeCarousel } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import { FallbackImage } from '@/components/UiPrimitives/FallbackImage';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { areAllergiesGeneticBooks } from '@/data/are-allergies-genetic-page';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Are Allergies Genetic? | Nutrition | Annabel Karmel',
  description:
    'Professor Adam Fox explains whether allergies are hereditary — atopy, inheriting food allergies, and when babies outgrow food allergies.',
};

const articlePath = '/articles/are-allergies-genetic';
const relatedArticles = getRelatedArticles('/are-allergies-genetic');

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  genetics: `${articlePath}/genetics.jpg`,
  allergies: '/articles/allergies-with-professor-adam-fox/hero.jpg',
} as const;

export default function AreAllergiesGeneticPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              If your family has a history of allergies, it&apos;s
              understandable to be concerned that you might have passed on these
              same allergies to your baby. Consultant Paediatric Allergist{' '}
              <Link
                href="/experts/professor-adam-fox"
                className={styles.inlineLink}
              >
                Professor Adam Fox
              </Link>{' '}
              is here to explain whether allergies are in fact hereditary.
            </p>

            <h2 className={styles.sectionHeading}>Are allergies genetic?</h2>
            <p className={styles.bodyText}>
              The tendency to develop allergies and associated allergic
              problems, such as hayfever, asthma, and eczema is known as atopy
              which is the genetic tendency to develop allergies. It is also
              more common to be atopic if both, rather than just one of the
              parents already have allergies.
            </p>
            <p className={styles.bodyText}>
              However, specific allergies are not inherited. If you, your
              partner or one of your other children have an allergy, this
              doesn&apos;t necessarily mean that your other children will
              develop the same allergic problems. Some babies will have
              allergies even if <span className={styles.emphasis}>no</span>{' '}
              family member is allergic, and those who are allergic to one thing
              sadly are more likely to be allergic to others.
            </p>

            <section>
              <h2 className={styles.sectionHeading}>
                Inheriting food allergies
              </h2>
              <FallbackImage
                src={`${articlePath}/genetics.jpg`}
                fallbackSrc={`${articlePath}/genetics.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Family with baby outdoors"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Unfortunately, you can&apos;t alter your children&apos;s genes,
                so, if one or both parents have a food allergy, it does make it
                more likely that your baby will too. If they do inherit the
                allergic tendency you or your partner has, then it seems that it
                is environmental factors that will influence which allergies
                your baby might get.
              </p>
              <p className={styles.bodyText}>
                It&apos;s also worth noting that children who have other
                allergic conditions such as eczema are more likely to develop
                food allergies than those who do not have allergies or atopic
                conditions.
              </p>
            </section>

            <h2 className={styles.sectionHeading}>
              Will my baby outgrow his food allergies?
            </h2>
            <p className={styles.bodyText}>
              Having one food allergy does increase the risk of having further
              food allergies. Certain allergies commonly go together such as an
              egg with a peanut allergy or a peanut allergy with an allergy to
              tree nuts and sesame.
            </p>
            <p className={styles.bodyText}>
              When looking at food allergies, in particular, thankfully many
              children will naturally outgrow these anyway. As their immune
              systems mature, most children outgrow allergies to egg, milk, soy,
              and wheat during childhood.
            </p>
            <p className={styles.bodyText}>
              Find out more about food allergies in babies{' '}
              <Link
                href="/most-common-food-allergies-in-babies"
                className={styles.inlineLink}
              >
                here
              </Link>
              .
            </p>
          </div>

          <h2 className={styles.booksHeading}>Books of interest</h2>
          <ArticleRecipeCarousel
            items={areAllergiesGeneticBooks}
            className="mt-[24px] md:mt-[32px]"
            perDesktopView={4}
            loop
          />

          <div className="mt-[56px] text-center md:mt-[90px]">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
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
