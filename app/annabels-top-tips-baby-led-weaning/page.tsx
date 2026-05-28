import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/annabels-top-tips-baby-led-weaning");

export const metadata: Metadata = {
  title: "Annabel's top tips for baby led weaning | Annabel Karmel",
  description:
    "Annabel Karmel shares her top tips for baby-led weaning, including combining methods, shared mealtimes, and staying flexible.",
};

export default function AnnabelsTopTipsBabyLedWeaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Weaning can be a daunting experience, but it is a great opportunity to bond with your baby. In this article,
            Annabel shares her top tips for baby led weaning. These tips will help you and your little one get started on
            your journey.
          </p>
          <p className={styles.body}>
            Weaning can be a daunting experience, but it is a great opportunity to bond with your baby. In this article,
            Annabel shares her top tips for baby led weaning. These tips will help you and your little one get started on
            your journey.
          </p>

          <h2 className={styles.sectionTitle}>Top tips for baby led weaning</h2>

          <h3 className={styles.sectionTitle}>1. You don&apos;t have to choose one method</h3>
          <p className={styles.body}>
            I&apos;ve always believed that you don&apos;t have to choose between one method or the other. From around six
            months, you can incorporate baby-led weaning into your baby&apos;s diet. So, you&apos;ll have the freedom to
            combine an element of this alongside spoon feeding. Just use your intuition here, and follow what you feel is
            right for both you and your baby.
          </p>

          <h3 className={styles.sectionTitle}>2. Combining both methods is very popular</h3>
          <p className={styles.body}>
            In speaking to other parents, dietitians, nutritionists and healthcare professionals about the various
            approaches to weaning, combining both methods is a popular option and one that many parents are finding the
            most realistic to adopt.
          </p>
          <p className={styles.body}>
            Offering a mix of pureed foods as well as soft fingers foods at the beginning is also advocated by the likes
            of the Department of Health and the NHS and the British Nutrition Foundation.
          </p>

          <h3 className={styles.sectionTitle}>3. Having a guide with whichever option of weaning you choose is wise</h3>
          <p className={styles.body}>
            Both methods can be adopted on their own – and lots of parents enjoy real success with both when adopted
            exclusively. The introduction of my new baby-led weaning recipe book equips families with the option to do
            what they feel is best.
          </p>
          <p className={styles.body}>
            This book can be used on its own for exclusive baby-led weaning. Or, it can be used as a companion cookbook
            to my original feeding guide – The New Complete Baby and Toddler Meal Planner. This is filled with my most
            popular puree recipes.
          </p>

          <h3 className={styles.sectionTitle}>4. Shared mealtimes are to be enjoyed</h3>
          <p className={styles.body}>
            Baby-led weaning encourages shared family mealtimes, and whilst I&apos;m a big advocator of everyone sitting
            down together and eating a variety of foods, this is not always realistic for busy families. It&apos;s of course
            a positive principle to adopt, albeit if only a few times a week, but having purees as an option at the very
            beginning, gives parents even more flexibility.
          </p>

          <h3 className={styles.sectionTitle}>5. There is no right or wrong</h3>
          <p className={styles.body}>
            What&apos;s important is that there is no right or wrong to weaning. Some babies thrive on purees, others on
            finger foods and yet some on both. Instead of committing to a certain feeding method, it&apos;s ok to be
            flexible in your approach. Follow your intuition and your baby&apos;s developmental signs.
          </p>

          <div className={`${styles.bookPromo} mt-[20px]! flex flex-col items-center gap-8 min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-10`}>
            <img
              src="/articles/annabels-top-tips-baby-led-weaning/book.png"
              alt="Baby-Led Weaning Recipe Book by Annabel Karmel"
              className="mx-auto h-auto w-full max-w-[300px] shrink-0 md:mx-0"
            />
            <div className="min-w-0 flex-1">
              <p className={styles.bookPromoText}>
                Annabel&apos;s{" "}
                <a href="/our-products/cookbooks/baby-led-weaning-recipe-book" className={styles.link}>
                  Baby-Led Weaning Recipe Book
                </a>{" "}
                equips families with the option to do what they feel is best. This book can be used on its own for
                exclusive baby-led weaning, or it can be used as a companion cookbook to Annabel&apos;s original feeding
                guide, the{" "}
                <a
                  href="/our-products/cookbooks/new-complete-baby-toddler-meal-planner-25th-anniversary-edition"
                  className={styles.link}
                >
                  New Complete Baby &amp; Toddler Meal Planner
                </a>
                , which is filled with her popular puree recipes.
              </p>
              <p className={styles.bookPromoText}>
                As well as being packed with useful advice and top tips, the book is filled with 120 recipes which the
                whole family can enjoy together – from breakfast and snacks, to vegetables, poultry, fish, meat and
                more.
              </p>
            </div>
          </div>

          <div className="mt-[90px] text-center">
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
