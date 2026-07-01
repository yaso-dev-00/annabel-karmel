import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/foods-to-avoid-when-baby-led-weaning");

const foodsToAvoid = [
  "Honey",
  "Mould-ripened soft cheeses",
  "Added salt and sugar",
  "Paté",
  "Whole cow's milk (or goat's / sheep's milk) as a main drink. You can introduce a little into your baby's foods from six months, once she's started on solids",
  "Shark, swordfish or marlin (due to high mercury levels)",
  "High choking-risk foods like whole grapes and whole/chopped nuts (although nut butters can be given at six months)",
  "Stimulants such as chocolate or sugar",
  "Unhealthy and processed foods such as battered foods, sugary breakfast cereals, chips, and other foods that contain sugar",
  "Caffeinated drinks such as tea, coffee, hot chocolate and cola",
];

export default function FoodsToAvoidBabyLedWeaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Baby-led weaning (BLW) is a great opportunity to introduce your baby to a variety of tastes and textures.
            And while when it comes to BLW the old saying that &apos;variety is key&apos; rings true, there are some
            foods that are best to leave off the menu for babies under 12 months. So, what foods should you avoid when
            baby led weaning?
          </p>

          <ul className={styles.bulletList}>
            {foodsToAvoid.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>

          <p className={styles.bodyText}>
            Your baby should never be left alone while eating, and they must always be supported in an upright position.
          </p>
          <p className={styles.bodyText}>
            <strong>Top Tip:</strong> Babies can store food in their cheeks for quite some time after eating, so remember
            to check that all food has been swallowed.
          </p>
          <p className={styles.bodyText}>
            <strong>And Remember: </strong>  Baby-led weaning doesn&apos;t have to be an all-or-nothing method. You can
            choose to feed your baby soft finger foods and small portions of family meals alongside spoon-feeding purees.
            The most important thing is that both you and your baby feel content and comfortable in your routine.
          </p>

          <div className={`${styles.bookPromo} flex flex-col gap-8 md:flex-row md:items-start md:gap-10`}>
            <img
              src="/articles/foods-to-avoid-when-baby-led-weaning/book.png"
              alt="Baby-Led Weaning Recipe Book by Annabel Karmel"
              className="mx-auto h-auto w-full max-w-[300px] shrink-0 md:mx-0"
            />
            <div className="min-w-0 flex-1">
              <p className={styles.bookPromoText}>
                Annabel&apos;s{" "}
                <a
                  href="/our-products/cookbooks/baby-led-weaning-recipe-book"
                  className={styles.link}
                >
                  Baby-Led Weaning Recipe Book
                </a>{" "}
                supports families as their little one weans. This book can be used on its own for exclusive baby-led
                weaning or as a companion cookbook to Annabel&apos;s original feeding guide, the{" "}
                <a
                  href="/our-products/cookbooks/new-complete-baby-toddler-meal-planner-25th-anniversary-edition"
                  className={styles.link}
                >
                  New Complete Baby & Toddler Meal Planner
                </a>
                , which is filled with her popular puree recipes.
              </p>
              <p className={styles.bookPromoText}>
                As well as being packed with useful advice and top tips, the book is filled with 120 recipes which the
                whole family can enjoy together – from breakfast and snacks, to vegetables, poultry, fish, meat and more.
              </p>
            </div>
          </div>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
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
