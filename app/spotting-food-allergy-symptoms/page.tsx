import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Spotting food allergy symptoms | Nutrition & Allergies | Annabel Karmel",
  description:
    "How to spot food allergy symptoms in children — eyes, airways, digestion, skin, and when to visit your GP.",
};

const relatedArticles = getRelatedArticles("/spotting-food-allergy-symptoms");

const introParagraphs = [
  "It can be difficult spotting food allergy symptoms and different parts of the body can be affected by a variety of allergens. Commonly, problems with breathing, digestion, eyes and skin are symptoms of an allergic reaction.",
  "Usually the level of impact an allergic reaction brings is similar each time it occurs, whether it be a mild, moderate or severe. However there is no guarantee a moderate reaction may not be severe in the future so it is important allergies are diagnosed, treated and controlled.",
];

const symptoms: { category: string; description: string }[] = [
  {
    category: "Eyes",
    description: "Itchy, watery, prickly, red, swollen and dark areas under the eyes",
  },
  {
    category: "Nose, Throat and Ears",
    description:
      "Runny nose, blocked nose, itchy nose, sneezing, pain in sinuses, headaches, post-nasal drip (mucus drips down the throat from behind the nose) loss of smell and taste, sore throat, swollen larynx (voice box) itchy mouth and/or throat, blocked ear and glue ear.",
  },
  {
    category: "Airways",
    description:
      "Wheezy breathing, difficulty in breathing, coughing (especially at night time), shortness of breath.",
  },
  {
    category: "Digestion",
    description:
      "Swollen lips/tongue, itchy lips/tongue, stomach ache, feeling sick, vomiting, constipation, diarrhoea, bleeding from the bottom, reflux, poor growth.",
  },
  {
    category: "Skin",
    description: "Urticaria – Wheals or hives, bumpy, itchy raised areas, rashes.",
  },
  {
    category: "Eczema",
    description: "cracked, dry, or weepy, broken skin.",
  },
  {
    category: "Angiodema",
    description: "swelling of the deep layers of the skin",
  },
];

const closingParagraphs = [
  "Many of these symptoms can develop as a result of other common childhood illnesses. However, with allergy, symptoms may appear suddenly, even dramatically; they can be persistent, and can appear without an obvious cause. If you have any concerns about your child’s health and wellbeing, you should visit your GP.",
  "When an allergy is triggered, the body’s immune system has an inappropriate reaction to what, for most people, is an entirely harmless substance. The cells which react are found in those areas of the body that come into contact with the outside environment, or external substances that are passing through the body; that is, the skin, lining of the throat, airways, eyes and digestive tract.",
  "This is why these areas of the body are most affected by allergy and show most allergy symptoms. However, an allergic reaction that starts in these places can set off effects in other parts of the body, which is why allergy sufferers may experience more than one symptom for a single allergy.",
  "Food allergy symptoms affect many children on a daily basis, but it is not always easy to recognise how much the symptoms affect a child’s general health and well-being. For example, a child with eczema will have chronic itchy, sore, skin, while an asthma sufferer may not be able to run around with their friends, and the coughing and wheezing can affect their sleep. Rhinitis sufferers can struggle to avoid the allergens they react to, while children with a food allergy may have to worry about anaphylaxis if they have a severe reaction.",
  "Suffering from any of these symptoms can have a massive impact on a child’s life. Some symptoms can be seen to lead to more severe conditions. For example, itchy rashes can lead to skin infections; and chronic diarrhoea can lead to weight loss. However, there are many more minor symptoms, such as constant runny or blocked noses that may affect the quality of a child’s life because, for example, they then suffer from headaches, lack of sleep, and lack of concentration at school. Tiredness can lead to irritability and bad moods, and this can affect both the child and whole family.",
  "However, once understood, the effects of allergy can be reduced, and treatments can bring relief to a child, making their childhood a much happier experience.",
];

export default function SpottingFoodAllergySymptomsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto ">
            {introParagraphs.map((paragraph, index) => (
              <p key={`intro-${index}`} className={styles.bodyText}>
                {paragraph}
              </p>
            ))}

            <h2 className={styles.sectionHeading}>Symptoms to look out for:</h2>

            {symptoms.map((item) => (
              <p key={item.category} className={styles.symptomItem}>
                <span className={styles.symptomCategory}>{item.category}</span>
                {" – "}
                {item.description}
              </p>
            ))}

            {closingParagraphs.map((paragraph, index) => (
              <p key={`close-${index}`} className={styles.bodyText}>
                {paragraph}
              </p>
            ))}

            <p className={`${styles.bodyText} ${styles.helplineText}`}>
              For further information and advice contact the Allergy UK Helpline on{" "}
              <a href="tel:01322619898" className={styles.inlineLink}>
                01322 619898
              </a>
              , Monday – Friday, 9am – 5pm or visit the Allergy UK website{" "}
              <a href="https://www.allergyuk.org/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                www.allergyuk.org
              </a>{" "}
              and use our &lsquo;live chat&rsquo; feature.
            </p>
          </div>

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
