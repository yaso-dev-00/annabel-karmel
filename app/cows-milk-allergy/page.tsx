import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { cowsMilkAllergyBooks } from "@/data/cows-milk-allergy-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cow's milk allergy | Nutrition & Allergies | Annabel Karmel",
  description:
    "Cow's milk allergy (CMA) symptoms in babies — immediate and delayed reactions, when to see your GP, and Allergy UK support.",
};

const relatedArticles = getRelatedArticles("/cows-milk-allergy");

export default function CowsMilkAllergyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              Infants and children usually experience Cow&apos;s milk allergy (CMA) symptoms in their first few months as
              cow&apos;s milk and dairy contain essential nutrients including proteins, minerals, and vitamins which are
              essential for growth as well as bone and dental health.
            </p>
            <p className={styles.bodyText}>
              Cow&apos;s milk allergy is one of the most common food allergies to affect babies and young children in the
              United Kingdom. It affects around <strong>3-6%</strong>{" "} of infants and young children and often is not
              diagnosed or takes many months to be diagnosed. Symptoms can be immediate or delayed and occur after being
              exposed to cow&apos;s milk. Usually, a child will react to cow&apos;s milk protein when introduced to a
              formula or weaning food. However, a child may react after breastfeeding if they are very sensitive to
              traces of cow&apos;s milk protein found in the breastmilk.
            </p>

            <h2 className={styles.sectionHeading}>Allergic Symptoms</h2>
            <p className={styles.bodyText}>
              Allergic symptoms can affect one or more of the body&apos;s systems, including the skin, tummy and, less
              commonly, breathing or blood circulation.
            </p>
            <p className={styles.subHeading}>There are two types of symptoms:</p>
            <p className={styles.bodyText}>
              <span className={styles.symptomLabel}>Immediate symptoms</span> {""}occur quickly after consuming cow&apos;s
              milk. They are most likely to be seen when weaning starts from breastfeeding or when a change is made from
              breastfeeding to formula feeding. The symptoms will usually be mild-to-moderate and often only affect a
              baby&apos;s skin. It is very rare to see severe symptoms that can affect a baby&apos;s breathing or how
              alert they appear.
            </p>
            <p className={styles.bodyText}>
              <span className={styles.symptomLabel}>Delayed symptoms</span>{" "} appear much more slowly and are more likely to
              be mild-to-moderate. They are more difficult to relate to being caused by cow&apos;s milk as they happen
              several hours after cow&apos;s milk is consumed. However, it is important to remember that many of the
              symptoms of delayed allergies, such as eczema, colic, reflux, and diarrhoea are common in infants and milk
              allergy is only one of a number of possible causes. In most cases of cow&apos;s milk allergy, a baby will
              show several symptoms in a pattern that will suggest either the delayed or immediate type of food allergy.
            </p>
            <p className={styles.bodyText}>
              If you suspect your child is showing symptoms of Cow&apos;s Milk Allergy, do not delay. Seek advice from
              your GP or Health Visitor as they will be able to assess whether the symptoms may be due to milk allergy or
              there is another cause. They will listen to your concerns and take an allergy-focused clinical history (a
              series of questions to help decide if an allergy is a possible cause of the symptoms). It may be necessary
              for the doctor to carry out a physical examination. In addition, if you think your child may be showing
              delayed symptoms, consider keeping a food and symptom diary of all the food eaten and symptoms seen.
              Listing medications and taking photos or videos of rashes, swelling, etc. may also be helpful.
            </p>
            <p className={`${styles.bodyText} ${styles.helplineText}`}>
              For more information and advice contact the Allergy UK Helpline on{" "}
              <a href="tel:01322619898" className={styles.inlineLink}>
                01322 619898
              </a>
              , Monday – Friday, 9 am – 5 pm or visit the Allergy UK website{" "}
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
            items={cowsMilkAllergyBooks}
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
