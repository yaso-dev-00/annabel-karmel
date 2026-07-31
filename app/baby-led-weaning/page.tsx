import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { introductionToFingerFoodsRelatedArticles } from '@/data/introduction-to-finger-foods-page';
import styles from './page.module.css';

const readinessSigns = [
  'She can sit up unassisted.',
  'She has lost the tongue-thrust reflex (automatically pushing solids out of her mouth with her tongue).',
  'She has developed sufficient hand-to-eye coordination to pick up food and put it in her mouth.',
  'She is able to chew, even if she has few or no teeth.',
  'She shows that she wants to join in family mealtimes.',
];

export default function BabyLedWeaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            If you are about to embark on the weaning journey you probably heard
            about the different types of weaning techniques. You&apos;ve almost
            certainly heard about BLW, but are probably wondering exactly what
            is baby led weaning? The ethos behind baby led weaning is that your
            forgo purees, and instead offer your baby a variety of foods which
            she can pick up and eat herself — allowing her to decide what, how
            much, and how quickly to eat.
          </p>

          <h2 className={styles.sectionHeading}>
            What are the benefits of baby-led weaning?
          </h2>
          <p className={styles.bodyText}>
            The idea is that they can explore a variety of foods, tastes and
            textures for themselves, at their own pace. At first, your baby may
            just play with the food, but this is all part of their development.
            They will soon progress to sucking, chewing and swallowing. Baby-led
            weaning also encourages baby to join the dinner table and experiment
            with meals the whole family are enjoying (albeit without added
            salt). These combined elements lead to the view that your baby will
            go on to develop healthy eating habits for life.
          </p>
          <p className={styles.bodyText}>
            Some feel a need to go with spoon-feeding or baby-led weaning, but
            Annabel believes that you don&apos;t have to choose. At around six
            months, you have the freedom to combine an element of baby-led
            weaning alongside spoon feeding if you feel that&apos;s right for
            you and your baby.
          </p>

          <h2 className={styles.sectionHeading}>
            How do I know when my baby is ready for baby-led weaning?
          </h2>
          <p className={styles.bodyText}>
            There are some key tell-tale signs that indicate your baby is ready
            to start feeding herself:
          </p>
          <ul className={styles.bulletList}>
            {readinessSigns.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            Prior to six months, babies tend not to have developed the
            hand-to-eye coordination needed for baby-led weaning, so it&apos;s
            not an option if your baby is ready to wean early. In this case,
            purees or well-mashed food are an obvious bridge between milk and
            solid foods.
          </p>

          <h2 className={styles.sectionHeading}>
            Is it ok to combine spoon feeding with the principles of baby-led
            weaning?
          </h2>
          <p className={styles.bodyText}>
            Many babies take to self-feeding early and easily – these babies
            often reject spoon-feeding altogether so clearly it makes sense to
            let them do baby-led weaning. But other babies, particularly those
            whose motor skills are slower to develop, will not be able to
            self-feed useful amounts of food until they are much older than six
            months; however, once babies get to six months they need essential
            nutrients such as iron which cannot be fully gained from breast or
            formula milk alone. This is where some form of pureeing or mashing
            of nutrient-rich food such as chicken or meat becomes important.
            Quite simply, some babies don&apos;t cope as well as others with
            lumpy food and need a more gradual transition from milk to solids.
          </p>
          <p className={styles.bodyText}>
            While lots of parents have success with spoon-feeding or baby-led
            weaning alone, combining the two is often an approach most suited to
            lots of families.
          </p>
          <p className={styles.bodyText}>
            What&apos;s important is that there is no right or wrong to weaning.
            Some babies thrive on purees, others on finger foods and yet some on
            both. Instead of committing to a certain feeding method, it&apos;s
            ok to be flexible in your approach and to follow your intuition and
            your baby&apos;s developmental signs.
          </p>

          <div
            className={`${styles.bookPromo} flex flex-col gap-8 md:flex-row md:items-start md:gap-10`}
          >
            <img
              src="/articles/baby-led-weaning/book.png"
              alt="Baby-Led Weaning Recipe Book by Annabel Karmel"
              className="mx-auto h-auto w-full max-w-[300px] shrink-0 md:mx-0"
            />
            <div className="min-w-0 flex-1">
              <p className={styles.bookPromoText}>
                Annabel&apos;s new{' '}
                <a
                  href="/our-products/cookbooks/baby-led-weaning-recipe-book"
                  className={styles.link}
                >
                  Baby-Led Weaning Recipe Book
                </a>{' '}
                equips families with the option to do what they feel is best.
                This book can be used on its own for exclusive baby-led weaning.
                Or it can be used as a companion cookbook to Annabel&apos;s
                original feeding guide, the{' '}
                <a
                  href="/our-products/cookbooks/new-complete-baby-toddler-meal-planner-25th-anniversary-edition"
                  className={styles.link}
                >
                  New Complete Baby & Toddler Meal Planner
                </a>
                , which is filled with her popular puree recipes.
              </p>
              <p className={`${styles.bookPromoText} mt-[40px]!`}>
                As well as being packed with useful advice and top tips, the
                book is filled with 120 recipes which the whole family can enjoy
                together – from breakfast and snacks, to vegetables, poultry,
                fish, meat and more.
              </p>
            </div>
          </div>

          <div className="mt-[90px] text-center">
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
