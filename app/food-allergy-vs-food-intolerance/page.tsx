import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { FallbackImage } from "@/components/fallback-image";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { foodAllergyVsIntoleranceBooks } from "@/data/food-allergy-vs-food-intolerance-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Food allergy vs. food intolerance | Nutrition & Allergies | Annabel Karmel",
  description:
    "What's the difference between food allergy and food intolerance? Symptoms, elimination diets, IgE testing, and when to see your GP.",
};

const articlePath = "/articles/food-allergy-vs-food-intolerance";
const relatedArticles = getRelatedArticles("/food-allergy-vs-food-intolerance");

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: "/articles/introducing-allergenic-foods/hero.jpg",
} as const;

export default function FoodAllergyVsFoodIntolerancePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto overflow-hidden">
            <p className={styles.bodyText}>
              Many different names are used to describe adverse reactions to foods, including food hypersensitivity, food
              intolerance, food allergy and other medical and non-medical terms. This causes confusion for those who have
              recently started suffering from symptoms that could be an allergy or intolerance. An allergy, with delayed
              symptoms can also often be confused with an intolerance, so it is always best to consult your GP about your
              symptoms.
            </p>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>Food Intolerance</h2>
              <FallbackImage
                src={`${articlePath}/food-intolerance.png`}
                fallbackSrc={`${articlePath}/food-intolerance.png`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Food intolerance"
                className={styles.floatImageRight}
              />
              <p className={styles.bodyText}>
                Food intolerance is much more common than food allergy. Symptoms are often slower and may be delayed by
                many hours after eating the offending food and can even last until the next day. Fatigue, bloating,
                irritable bowel, joint pains, rashes, nettle rash, eczema and migraine are some of the symptoms caused by
                a food intolerance.
              </p>
              <p className={styles.bodyText}>
                The most accurate way of identifying whether food intolerance is the cause of these symptoms is an
                Elimination and Challenge Diet. If your symptoms diminish or disappear with the removal of certain food
                items, and then reappear with the reintroduction of the food, then you have proved the cause is dietary.
                Elimination diets must be followed strictly and for the correct period of time to be effective.
              </p>
              <p className={styles.bodyText}>
                Having performed an elimination diet and found the cause of your symptoms, the only treatment is to avoid
                the offending food(s). Avoiding a large number of foods is not sensible, as good nutrition is vitally
                important, and because repeatedly eating a small number of foods tends to make intolerances worse. A
                dietitian will be able to ensure that your diet is not excessively limited, and that it contains all the
                necessary vitamins and minerals you need.
              </p>
            </section>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>Food Allergy</h2>
              <FallbackImage
                src={`${articlePath}/food-allergy.jpg`}
                fallbackSrc={`${articlePath}/food-allergy.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Food allergy"
                className={styles.floatImageLeft}
              />
              <p className={styles.bodyText}>
                A food allergy is caused when the body mistakenly makes an antibody (IgE) which &lsquo;fights off&rsquo;
                the food when it is eaten (or sometimes is just in contact with the skin). The symptoms are usually those
                of &lsquo;classic&rsquo; allergy such as a red raised, itchy rash (Urticaria), wheezing, vomiting, severe
                gut symptoms or (very rarely) sudden collapse. Most people will therefore already recognize that the food
                causes them a problem. There are reliable blood tests and skin tests, available through the NHS, that can
                be used to quite accurately confirm the presence or absence of food allergy.
              </p>
              <p className={styles.bodyText}>
                Although some tests for food intolerance may be scientifically reliable, their relevance to food related
                symptoms is scientifically unproven. The Gold Standard, and only way, to ascertain which foods cause
                adverse reactions, is by accurately recording the times and duration of all symptoms, illness or stress,
                as well as everything you eat and drink. This includes all prescribed medicines and other supplements,
                all sweets, nibbles and even licking out the mixing bowl when cooking!
              </p>
              <p className={styles.bodyText}>
                This record should be continued for two weeks and should be representative of your normal diet. Use a new
                page each day. Ideally, it should be analysed by a registered dietitian or nurse with nutritional
                training. It is also helpful to keep food packaging which lists ingredients for reference by the health
                care professional.
              </p>
            </section>

            <p className={`${styles.bodyText} ${styles.helplineText}`}>
              For more information and advice contact the Allergy UK Helpline on{" "}
              <a href="tel:01322619898" className={styles.inlineLink}>
                01322 619898
              </a>
              , Monday – Friday, 9am – 5pm or visit the Allergy UK website{" "}
              <a
                href="https://www.allergyuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                www.allergyuk.org
              </a>{" "}
              and use our &lsquo;live chat&rsquo; feature.
            </p>
          </div>

          <ArticleRecipeCarousel
            items={foodAllergyVsIntoleranceBooks}
            className="mt-[50px] md:mt-[70px]"
            perDesktopView={4}
            loop
          />

          <div className="mt-[56px] text-center md:mt-[90px]">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
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
