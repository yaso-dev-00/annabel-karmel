import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/starting-to-wean-2');

export default function StartingToWeanPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] mt-[40px] md:px-[14px] md:pt-[28px]">
          <div className="space-y-[32px]">
            <p className={styles.lead}>
              Ok so you&apos;ve decided to go down the spoon-led or baby-led
              route or perhaps you plan on adopting a combined approach, but how
              do you know when your baby is actually ready? As with most big
              milestones in parenthood, nothing is ever black and white. Fist
              chewing, more frequent night wakings, or wanting more milk feeds
              aren&apos;t actually reliable signs of readiness.
            </p>

            <p className={styles.body}>
              Remember that weaning is a gentle process - it&apos;s about
              introducing a variety of new tastes and textures rather than the
              volume of foods that contribute nutrients and calories (not just
              yet anyway). So, it&apos;s important to remember that your
              baby&apos;s usual milk will still remain the most essential dish
              on the menu with around 500-700ml of breast milk or formula needed
              each day up until their first birthday.
            </p>

            <p className={styles.body}>
              Introducing complementary foods at around 6 months is the age
              advised by the World Health Organisation. If your baby starts to
              show the signs of wanting solids a little earlier than 6 months,
              then it&apos;s fine to start but it&apos;s important to note that
              babies should never be weaned before 17 weeks, as research
              suggests that your baby&apos;s digestive system and kidneys might
              not be developed enough to cope with solid food at this point. If
              you&apos;re unsure and want to start a little earlier than 6
              months, do check in with your health visitor or GP.
            </p>

            <p className={styles.body}>
              Although all babies develop at their own pace, knowing what to
              look out for will certainly help to further reaffirm your gut
              feeling that your baby is ready to tackle solids. There are 3
              clear signs which, together, show your baby is ready to start out
              on their food adventure!
            </p>
          </div>

          <section className="mt-[36px] space-y-[22px]">
            <p className={styles.signTitle}>
              Key signs that your baby is developmentally ready to wean:
            </p>

            <p className={styles.signBlock}>
              <span className={styles.signBlockTitle}>
                Sitting-up and supporting their head in a stable position
              </span>
              <br />
              • They need to be able to stay seated in a sitting position
              without intervention.
              <br />• A highchair will provide the additional support for the
              feet, bottom and back while eating.
            </p>

            <p className={styles.signBlock}>
              <span className={styles.signBlockTitle}>
                Hand-to-eye coordination
              </span>
              <br />• Your baby needs to be able to coordinate food and direct
              it into their mouth.
            </p>

            <p className={styles.signBlock}>
              <span className={styles.signBlockTitle}>
                Tongue-thrust reflex has disappeared
              </span>
              <br />
              • Most babies are likely to have lost this protective reflex by 6
              months.
              <br />
              • Once disappeared, they will be better able to move food from the
              front to the back of their mouth and swallow it.
              <br />• Not all babies lose this reflex by 6 months but don&apos;t
              delay on this account as gentle weaning will naturally help baby
              lose this reflex.
            </p>
          </section>

          <p className={`${styles.body} mt-[32px]`}>
            Offer your baby a breastfeed or a little formula before you give
            them food. By making sure your baby is relaxed, content, and not too
            hungry, they are more likely to be accepting of exploring new foods.
            Their usual milk is still so key at this time as it is far more
            nutrient-dense than the amount they&apos;ll be taking in through
            food.
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
