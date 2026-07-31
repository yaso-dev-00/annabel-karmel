import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Weaning Preterm Infants | Annabel Karmel',
  description:
    'Expert advice on weaning premature babies from Caroline King, Neonatal Specialist Dietitian at Imperial College Healthcare NHS Trust.',
};

const relatedArticles = getRelatedArticles('/weaning-preterm-infants');

export default function WeaningPretermInfantsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[30px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h1 className={styles.expertHeading}>
            Expert advice from Caroline King Dietitian (Neonatal Specialist)
            Imperial College Healthcare NHS Trust
          </h1>

          <p className={styles.body}>
            The department of health guidelines for weaning do not include
            babies born premature therefore health professionals working with
            this group have put together guidelines based on published evidence
            and experience. This has been summarised in a booklet published by
            Bliss. You can find out more information on their website{' '}
            <a
              href="http://www.bliss.org.uk/help-for-families/video5/weaning/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              http://www.bliss.org.uk/help-for-families/video5/weaning/
            </a>
          </p>

          <p className={styles.body}>
            Premature babies are born any time from 22 to 37 weeks gestation and
            are a very varied group. In many aspects of development they may be
            behind term babies for example being able to sit, however due to
            feeding early into their stomachs their digestive systems develop
            earlier. This means that we don&apos;t have to wait until babies are
            six months after their due date before weaning but it also means
            baby led weaning needs to be modified and cannot fully be tried
            until they can sit.
          </p>

          <p className={styles.body}>
            The guidelines take into account the great variety within the group
            of premature babies and suggest considering weaning somewhere
            between 5 to 8 months after birth (not due date). For more mature
            early babies it might be closer to five months for less mature
            babies closer to 8 months. It is also advised that a baby is at
            least three months after their due date to allow development of good
            head control. However, as for term babies the key factor in deciding
            when to start within this window is assessment of each individual
            babies cues, help with this is given in the Bliss booklet.
          </p>

          <p className={styles.body}>
            Caregivers are encouraged to be responsive to their babies
            throughout the weaning process to allow feeding to the babies hunger
            and textures according to the babies&apos; ability, and to introduce
            a wide variety of flavours. Finger foods are encouraged as soon as
            possible and lumps should be introduced at the latest when the baby
            is nine months old (from birth) to avoid gagging and vomiting which
            may occur if lumps are delayed.
          </p>

          <p className={styles.body}>
            As iron stores are laid down during the latter stages of pregnancy
            premature babies are at risk of iron deficiency so iron rich and
            nutrient rich foods should be prioritised.
          </p>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
