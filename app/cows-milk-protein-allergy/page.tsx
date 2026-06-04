import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cowsMilkProteinAllergyBooks } from "@/data/cows-milk-protein-allergy-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dairy-free Diet | Cow's Milk Protein Allergy | Annabel Karmel",
  description:
    "A dairy-free diet for cow's milk protein allergy — why your baby may need it, symptoms, and when to seek professional advice before cutting out dairy.",
};

const relatedArticles = getRelatedArticles("/cows-milk-protein-allergy");

export default function CowsMilkProteinAllergyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              A dairy free diet for cow&apos;s milk protein allergy involves avoiding all forms of dairy foods such as
              milk, butter, cheese, cream, yoghurt, fromage frais, margarine, custards, ice cream and other foods made
              from milk. This also includes goat&apos;s milk, sheep&apos;s milk and even buffalo milk (think buffalo
              mozzarella) and any other milk products from animals.
            </p>

            <h2 className={styles.sectionHeading}>Why might your baby need a dairy free diet?</h2>
            <p className={styles.bodyText}>
              Your healthcare professional may have suggested that your baby needs a dairy free diet if they have
              symptoms of a cow&apos;s milk protein allergy or intolerance.
            </p>
            <p className={styles.bodyText}>
              A cow&apos;s milk protein allergy is when the body&apos;s own immune system decides it doesn&apos;t
              recognise the protein in milk and thinks it is a threat. It produces an allergic response that makes your
              little one unwell.
            </p>
            <p className={styles.bodyText}>
              Symptoms can include eczema, red skin, hives, swelling of the lips, tongue or mouth or body, difficulty
              breathing, an itchy runny nose, tummy troubles such as vomiting, constipation or diarrhoea, reflux, tummy
              pain, poor growth, asthma and in extreme cases, anaphylaxis.
            </p>
            <p className={styles.bodyText}>
              Symptoms of an allergic reaction can be immediate or delayed. Immediate means that they come on within two
              hours after eating and this is sometimes called an IgE allergy. Delayed allergy symptoms can occur anything
              from two hours to several days later! This is sometimes referred to as non-IgE allergy.
            </p>
            <p className={styles.bodyText}>
              A cow&apos;s milk protein intolerance doesn&apos;t actually exist. It&apos;s a term that healthcare
              professionals used to use to describe the delayed onset or non-IgE allergy but is often still used today.
            </p>
            <p className={styles.bodyText}>
              It&apos;s worth noting that lactose intolerance is not an allergy to dairy foods and is a completely
              different condition to those babies who have a cow&apos;s milk protein allergy. With lactose intolerance,
              your baby doesn&apos;t need to avoid all dairy products. See my{" "}
              <Link href="/managing-your-babys-lactose-intolerance" className={styles.inlineLink}>
                &lsquo;Managing Your Baby&apos;s Lactose Intolerance&rsquo;
              </Link>{" "}
              post for further information.
            </p>

            <h2 className={styles.sectionHeading}>
              Should I try giving my baby a dairy free diet without a confirmed diagnosis?
            </h2>
            <p className={styles.bodyText}>
              Dairy foods are one of the five food groups and contribute to a significant amount of your baby&apos;s
              nutrition. Formula fed babies for example get 100% of their nutrition from dairy foods as most infant
              formula is based on cow&apos;s milk. Once weaning starts, this gradually reduces as food intake goes up,
              but dairy still plays a significant role in nourishing your little one right through their childhood.
            </p>
            <p className={styles.bodyText}>
              You have to be careful as if you cut out this food group and don&apos;t replace the nutrients dairy provides,
              your baby could be deficient in energy (calories), protein and fat which will affect their growth and
              development. They will also be low in calcium, affecting their bone health, iodine, vitamin A and a B
              vitamin called riboflavin.
            </p>
            <p className={styles.bodyText}>
              Always seek the advice of a healthcare professional before you try a diet that avoids a whole food group as
              babies can become deficient in nutrients quite quickly which can affect their health and growth.
              It&apos;s likely that if an allergy is suspected, your doctor or health visitor will refer you to an NHS
              dietitian for guidance as dietitians are the only nutrition professionals regulated by law that can advise
              you on how to manage a free-from diet without risks to your baby&apos;s health. You can also self-refer to a
              dietitian in a{" "}
              <a
                href="https://freelancedietitians.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                private practice
              </a>{" "}
              – look for one who is experienced in paediatrics and allergies.
            </p>
          </div>

         

          <div className="mt-[90px] text-center md:mt-[90px]">
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
