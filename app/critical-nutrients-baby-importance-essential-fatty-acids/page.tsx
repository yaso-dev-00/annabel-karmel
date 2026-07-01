import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

const IMG = "/articles/critical-nutrients-baby-importance-essential-fatty-acids";

export const metadata: Metadata = {
  title: "Critical nutrients for your baby: the importance of essential fatty acids | Annabel Karmel",
  description:
    "Why omega-3 essential fatty acids matter for babies, oily fish serving guidance, portion sizes, and plant-based sources for vegetarian and vegan babies.",
};

const relatedArticles = getRelatedArticles("/critical-nutrients-baby-importance-essential-fatty-acids");

const servingTips = [
  "Salmon can be given from 6 months once those first tastes have been mastered.",
  "Aim for 2 servings of oily fish twice a week (but no more due to pollutants found in oily fish which may build up in the body).",
  "There are no set portion size guidelines for a baby under 1 year but for a toddler aged 1-4 years roughly aim for a 40g portion.",
  "Tinned salmon is also a good source of calcium (because of the bones). Just ensure they are completely grounded/blended for your baby before serving.",
];

const alaOmegaSources = [
  "Walnuts (grounded or as nut butter)",
  "Soya beans",
  "Flaxseeds, linseeds or linseed oil",
  "Rapeseed oil",
  "Chia seeds",
  "Tofu",
  "For vegetarians, omega-3 can be sourced via enriched products such as omega-3 enriched eggs and margarine spreads.",
];

export default function CriticalNutrientsEssentialFattyAcidsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyFirst}>
            Along with that all-important iron which I covered over in{" "}
            <Link href="/critical-nutrients-baby-importance-iron" className={styles.inlineLink}>
              Critical Nutrients for your Baby: Iron
            </Link>
            , another key nutrient to have on your radar is essential fatty acids.
          </p>
          <p className={styles.body}>
            Oily fish such as salmon is the best source of Omega 3 essential fatty acids for your growing baby. These
            fatty acids are &apos;essential&apos; as they help the development of your child&apos;s vision, nervous
            system, as well as brain growth and development. Plus, they help to reduce inflammation and enhance the
            function of their immune cells.
          </p>

          <h2 className={styles.sectionTitle}>
            Here&apos;s what you need to know about serving this super-food to babies:
          </h2>
          <ul className={styles.dashList}>
            {servingTips.map((tip) => (
              <li key={tip} className={styles.dashItem}>
                {tip}
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>Which foods are high in Omega 3?</h2>
          <img
            src={`${IMG}/omega-3-fish-plate.jpg`}
            alt="Fish-shaped salmon fish cake on a plate with peas and radish bubbles"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            A great form of omega 3 for babies can be found in oily fish such as salmon, mackerel and sardines. My salmon
            and broccoli puree or, for baby-led weaners my salmon balls with sweet potato and sweetcorn are a tasty
            introduction to fish!
          </p>
          <p className={styles.body}>
            Ideally, you should include two portions of oily fish in your baby&apos;s diet a week, but no more due to
            small amounts of pollutants found in oily fish which may build up in the body.
          </p>
          <p className={styles.body}>
            Unfortunately, tinned tuna doesn&apos;t count as a source of omega 3. And, if you are serving-up fresh tuna,
            make sure it&apos;s no more than once a week due to the high mercury content.
          </p>
          <p className={styles.body}>
            Whilst those essential fatty acids are key, don&apos;t forget that fish, in general, is a fantastic weaning
            food (and food for the whole family) as it contains other important nutrients such as protein, iodine,
            selenium, calcium, and vitamin A, so even more reason to include on your baby&apos;s menu!
          </p>

          <h2 className={styles.sectionTitle}>Annabel&apos;s favourite fish recipes:</h2>
          <p className={styles.recipeEmpty}>It seems we can&apos;t find what you&apos;re looking for.</p>

          <h2 className={styles.sectionTitle}>How much fish is recommended for a baby?</h2>
          <img
            src={`${IMG}/fish-fingers.jpg`}
            alt="Salmon and vegetable finger food for babies"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            As I mentioned, UK guidelines recommend offering two portions of oily fish per week to your baby (but no more
            due to small amounts of pollutants found in oily fish which may build up toxins in the body).
          </p>
          <p className={styles.body}>
            There are no set portion sizes for children under 1 year and portion sizes will always vary from baby to
            baby. But for children aged 1 – 4 years, as a guide, aim for roughly around 40g as a portion.
          </p>
          <p className={styles.body}>
            The British Dietetic Association (BDA) have a useful table for recommended oily fish production sizes for
            different age groups:
          </p>
          <img
            src={`${IMG}/portion-table.jpg`}
            alt="Guideline portion amounts for oily fish by age from the British Dietetic Association"
            width={900}
            height={600}
            className={styles.contentImage}
          />
          <p className={styles.tableCaption}>Source: BDA</p>

          <h2 className={styles.sectionTitle}>Essential fatty acids for vegan and vegetarian babies</h2>
          <img
            src={`${IMG}/vegan-omega.jpg`}
            alt="Children cooking with fresh vegetables in a kitchen"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            Whilst the best and most effective source of omega 3 for babies is oily fish such as salmon, that&apos;s not
            to say that there aren&apos;t other foods that can provide a little helping hand on the omega 3 front too. If
            you are raising your baby as vegetarian or vegan just be sure they are getting a well-balanced diet including
            plant-based sources of omega 3 essential fatty acids.
          </p>
          <p className={styles.body}>
            Vegetarian food sources of essential fatty acids contain a different type of omega 3 called ALA. To be of
            most use the body must make this into DHA and EPA (the optimal form of omega 3).
          </p>
          <p className={styles.body}>
            Foods that contain ALA omega 3s that your baby will need to convert include:
          </p>
          <ul className={styles.bulletList}>
            {alaOmegaSources.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            It&apos;s important to note that the body&apos;s ability to convert sources of food into the best forms of
            omega 3 depends on genetic factors. Be sure to speak to your health visitor or a dietitian as vegan babies
            may require a supplement.
          </p>

          <h2 className={styles.sectionTitle}>Can omega 3 be passed onto my baby through breast milk?</h2>
          <p className={styles.body}>
            Yes! This critical nutrient passes to your baby through breastmilk so make sure those omega 3 rich foods are
            on your menu too!
          </p>
          <p className={styles.body}>
            And, because it is such an important nutrient in your baby&apos;s diet, it&apos;s now added to all infant
            formula milk.
          </p>

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
