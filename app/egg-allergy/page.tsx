import { ArticleRecipeCarousel } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import { FallbackImage } from '@/components/UiPrimitives/FallbackImage';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { eggAllergyBooks } from '@/data/egg-allergy-page';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Egg allergy | Nutrition & Allergies | Annabel Karmel',
  description:
    'Egg allergy in children — baked egg tolerance, vaccinations, MMR safety, and when to see your GP or dietitian.',
};

const articlePath = '/articles/egg-allergy';
const relatedArticles = getRelatedArticles('/egg-allergy');

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: '/articles/cows-milk-allergy/hero.jpg',
} as const;

export default function EggAllergyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              Most children will outgrow an allergy to eggs which explains why
              egg allergy is much more common in young children than in adults.
              However, if a child is suspected of having an allergy to egg it is
              important to book an appointment with their GP or a dietitian.
            </p>
            <p className={styles.bodyText}>
              Even with an egg allergy, many people can eat baked food
              containing well-cooked eggs without a problem. Research has shown
              70-80% of children with an egg allergy can eat plain cakes and
              biscuits containing egg. But it is important to always get advice
              from a health care professional before consuming allergenic foods
              in any form. It is essential that any child with an egg allergy is
              first tested under specialist medical supervision (for example, in
              a hospital allergy clinic) before foods (such as cakes and
              biscuits) containing egg are given to them.
            </p>

            <section>
              <h2 className={styles.sectionHeading}>Vaccinations</h2>
              <p className={styles.bodyText}>
                Vaccinations are an important area to consider for parents of a
                child with an egg allergy. Inactivated influenza vaccines, given
                by injection, that are egg-free or have a very low ovalbumin
                content are safe for individuals with egg allergy (des Roches et
                al., 2012). The BSACI (British Society for Allergy and Clinical
                Immunology) have advised that children with egg allergy can
                safely be vaccinated with the nasal influenza vaccine in any
                setting, including a GP surgery and school. However, facilities
                should be available and staff trained to recognise and treat
                anaphylaxis.
              </p>
              <p className={styles.bodyText}>
                The exception is for children who have previously required
                admission to an intensive care unit for severe anaphylaxis to
                egg; these children should be referred to a specialist for
                immunisation in hospital.
              </p>
              <FallbackImage
                src={`${articlePath}/vaccinations.jpg`}
                fallbackSrc={`${articlePath}/vaccinations.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Egg allergy vaccinations"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                The yellow fever vaccine may contain traces of egg and should be
                avoided by anyone allergic to egg. The vaccines against yellow
                fever and typhus are produced in a similar way to influenza.
                However, this vaccine is not a routine part of the UK
                immunisation schedule and are usually only given to people
                travelling abroad to high-risk destinations.
              </p>
              <p className={styles.bodyText}>
                All available information about immunisation and allergy points
                to the fact that immunisation in children who are at high risk
                of developing allergy is safe and not a factor in their future
                allergic conditions.
              </p>
              <p className={styles.bodyText}>
                Many people ask if the MMR (measles, mumps and rubella) vaccine
                should be given to those with egg allergy. The MMR vaccine does
                not contain any egg protein and is considered to be safe but any
                concerns should always be discussed with your GP.
              </p>
            </section>

            <p className={`${styles.bodyText} ${styles.helplineText}`}>
              For more information and advice contact the Allergy UK Helpline on{' '}
              <a href="tel:01322619898" className={styles.inlineLink}>
                01322 619898
              </a>
              , Monday – Friday, 9am – 5pm or visit the Allergy UK website{' '}
              <a
                href="https://www.allergyuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                www.allergyuk.org
              </a>{' '}
              and use our &lsquo;live chat&rsquo; feature.
            </p>
          </div>

          <div className="mt-[90px] text-center md:mt-[90px]">
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
