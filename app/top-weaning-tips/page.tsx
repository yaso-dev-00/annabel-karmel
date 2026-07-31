import { ArticleRecipeCarousel } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { introductionToFingerFoodsRelatedArticles } from '@/data/introduction-to-finger-foods-page';
import { topWeaningTipsRecipes } from '@/data/top-weaning-tips-page';
import styles from './page.module.css';

const IMG = '/articles/top-weaning-tips';

const weaningTips = [
  'Babies sometimes find the process of weaning a little clinical and miss the comfort of sucking milk. When offering your baby their very first taste or two you may find it easier to hold them on your lap so that they feel loved and secure and more receptive to eating. Babies are unable to lick food off a spoon with their tongues, so choose a small shallow plastic weaning spoon so they can take some food with their lips.',
  "When babies feed from the breast or a bottle they instinctively push their tongue forwards – this is called the tongue-thrust reflex. Your baby needs to learn to swallow solids and not push their tongue forwards. If they can't get on with a spoon, dip a clean finger into the puree and let them suck your finger for a few mouthfuls.",
  "You don't need to sterilise your baby's spoons or bowls, simply wash them in a dishwasher. After all, your baby puts everything in reach into their mouth and let's face it none of these things are sterilised! However, it's important to sterilise your baby's bottles and teats as warm milk is the perfect breeding ground for bacteria.",
  "You will find that your baby will let you know how much they need to eat; some foods such as carbohydrates will fill them up more quickly than fresh fruit and vegetables; when they appear to be full or resist your attempts at feeding, it's time to stop.",
];

export default function TopWeaningTipsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Some mums feel sad that weaning signals the end of the teeny, tiny
            baby stage, but weaning offers a real opportunity to bond – and it
            can be quite the fun adventure too!
          </p>

          <img
            src={`${IMG}/baby-feeding.jpg`}
            alt="Baby being fed in a high chair"
            className={styles.contentImage}
            width={800}
            height={800}
          />

          <h2 className={styles.sectionHeading}>
            Here are my top weaning tips:
          </h2>
          <ul className={styles.bulletList}>
            {weaningTips.map((tip) => (
              <li key={tip} className={styles.bulletItem}>
                {tip}
              </li>
            ))}
          </ul>

          <img
            src={`${IMG}/puree-bowls.jpg`}
            alt="Bowls of vegetable and fruit purees with spoons"
            className={styles.contentImage}
            width={800}
            height={800}
          />

          <h2 className={styles.sectionHeading}>Best First Foods:</h2>

          <ArticleRecipeCarousel
            items={topWeaningTipsRecipes}
            className="mt-[40px]"
            perDesktopView={4}
          />

          <p className={styles.fingerFoodsNote}>
            Once they have mastered purees, its time to graduate to finger
            foods. Learn more about{' '}
            <a href="/introduction-to-finger-foods" className={styles.link}>
              how to introduce finger foods
            </a>{' '}
            and{' '}
            <a href="/baby-finger-foods" className={styles.link}>
              the best baby first finger foods.
            </a>
          </p>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel
            items={introductionToFingerFoodsRelatedArticles}
          />
        </div>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
