import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Baby's hydration | Baby Nutrition | Annabel Karmel",
  description:
    "How to keep up baby's hydration with milk and water during weaning, and feeding and hydration advice when your baby is unwell.",
};

const relatedArticles = getRelatedArticles('/babys-hydration-2');

export default function BabysHydrationPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h2 className={`${styles.subsectionTitle} mt-0!`}>Milk</h2>
          <p className={styles.bodyFirst}>
            You may be moo-ving into the grown-up world of real food but milk
            still has an important role for the remainder of the first year.
            From four to six months baby needs 500 – 600 ml (17 – 21 fl oz) of
            breast or formula milk a day and up to four milk feeds a day to the
            age of eight months.
          </p>
          <p className={styles.body}>
            Milk feeds can be gradually reduced as weaning progresses but giving
            baby too much solid food too quickly can lead to constipation. First
            foods are about introducing tastes and textures but milk continues
            to provide necessary nutrients.
          </p>
          <p className={styles.body}>
            Cow&apos;s milk and goat&apos;s milk are not suitable alternatives
            to breast or formula milk before baby&apos;s first birthday because
            they do not contain sufficient iron and other nutrients. They can be
            used in cooking and with cereal from six months. You may be thinking
            about your pre-pregnancy wardrobe but baby needs the calories in
            full-fat milk.
          </p>

          <h2 className={styles.subsectionTitle}>Water</h2>
          <p className={styles.body}>
            Babies lose more water from their skin and kidneys than adults so it
            is vital to keep them hydrated. For the first six months the only
            drink suitable for your baby, besides breast or formula milk, is
            boiled, cooled tap water. Not bottled water, which can contain high
            concentrations of mineral salts.
          </p>
          <p className={styles.body}>
            By introducing a cup you can keep baby&apos;s bottle for milk feeds.
            Sucking on sweet drinks can contribute to tooth decay. By
            introducing a lidded cup with a spout at six or seven months you are
            helping baby graduate to a cup and by the time baby reaches their
            first birthday you may be ready to bin the bottles altogether,
            perhaps with the exception of one at bedtime.
          </p>

          <h2 className={styles.subsectionTitle}>
            Feeding &amp; hydration for sick babies
          </h2>
          <p className={styles.body}>
            Weaning can feel like two spoons forward and one back at the best of
            times and it can be especially frustrating if your fledgling foodie
            gets sick. Don&apos;t panic. Coughs, colds, flu, ear infections,
            tonsillitis, etc. are all miserable but thankfully the worst is
            usually over after a couple of days.
          </p>
          <p className={styles.body}>
            Hydration is your top priority for a poorly baby so make sure you
            keep them drinking. Breastfed babies may find feeding tiring if they
            are congested, try feeding little and often and build up to where
            you left off as they get better. Offer water as well as milk and you
            might consider enticing older babies with diluted fruit concentrate.
          </p>
          <p className={styles.body}>
            Once on the road to recovery and regaining a healthy appetite
            continue to offer a wide range of foods, there is a lot to be said
            for Grandma&apos;s chicken soup as it ticks off protein, veg, and
            liquid. Protein is important for the immune system and repairs
            damaged body tissues. Carbohydrates give a quick burst of energy but
            opt for slow-releasing energy foods and offer the complex carbs
            found in wholemeal bread, pasta, fruit, and vegetables.
          </p>
          <p className={styles.body}>
            Bribing your baby back to where you were on the weaning adventure
            with all their favourite foods is tempting but keep the variety up
            or you risk encouraging fussy eating, which will make life harder in
            the long run.
          </p>
          <p className={styles.body}>
            Try to keep baby cool as they are likely to be less hungry if they
            have a fever, which can also increase the chance of vomiting.
          </p>
          <p className={styles.body}>
            Keep it simple when baby isn&apos;t fighting fit as they are not
            likely to be at their most adventurous. Expect a reduced appetite
            and try not to worry if they only mange one or two mouthfuls.
          </p>

          <div className="mt-[90px] text-center">
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
