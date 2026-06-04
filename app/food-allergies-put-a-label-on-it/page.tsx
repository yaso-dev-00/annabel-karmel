import { FallbackImage } from "@/components/fallback-image";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Food Allergies – Natasha's Law put a label on it | Annabel Karmel",
  description:
    "Natasha's Law and clear allergen labelling on pre-packed food: why ingredient lists matter for families managing food allergies.",
};

const articlePath = "/articles/food-allergies-put-a-label-on-it";
const relatedArticles = getRelatedArticles("/food-allergies-put-a-label-on-it");

const imageFallbacks = {
  listingHero: `${articlePath}/listing-hero.png`,
  allergies: "/articles/introducing-allergenic-foods/hero.jpg",
} as const;

const paragraphsBeforeImage = [
  "In today’s climate we tend to avoid putting a label on things, but when it comes to the food industry nutritional labels are not only necessary but can be lifesaving.",
  "Natasha’s law came into effect in England, Scotland, Wales and Northern Ireland on 1st October 2021, requiring that all food outlets provide full ingredient lists with clear allergen labelling on Pre-Packed for Direct Sale foods (PPDS.)",
  "Although the legislation marked much-welcomed and much-needed progress, it unfortunately came as a result of tragic circumstances. It took the devastating death of British teenager Natasha Ednan-Laperouse from an unmarked Highstreet chain sandwich to prompt change. Natasha, for whom the eponymous law was named, had a fatal allergic reaction to a Pret baguette with unlisted sesame seeds baked into the dough, of which she was allergic to and had been reassured were not contained in the sandwich. Since her tragic death in 2016, Natasha’s family tirelessly campaigned to change the law to ensure that every single ingredient is listed on pre-packed foods to prevent other families from suffering the same avoidable heartbreak that they did.",
];

const imageCaption =
  "It took the devastating death of British teenager Natasha Ednan-Laperouse (pictured above) from an unmarked Highstreet chain sandwich to prompt change.";

const paragraphsAfterImage = [
  "Natasha’s Law states that PPDS (Pre-Packed for Direct Sale) food must clearly display the name of the food as well as a full list of ingredients with allergenic contents highlighted for effect.",
  "Labelling clarity is of the utmost importance for both children and adults alike and although I am devasted by the tragic circumstances surrounding the law, I am thrilled that it has now been enforced. Almost half of adults with allergies have suffered moderate to severe allergic reactions to pre-packed food, and the risk is even greater for children whose food intake is at the mercy of their parents.",
  "When you consider recent research that shows that both allergic and non-allergic sufferers struggle to understand what the different Precautionary Allergen Labelling (𝘗𝘈𝘓) mean, something as simple as selecting a snack could prove highly dangerous, and at worse fatal.",
  "This is particularly alarming in light of research by Mintel which found that almost half (48%) of Brits are unsure whether or not allergen labels are clear, and a further 15% have no confidence in them at all.",
  "Worryingly, other research has found that, perhaps as an offshoot of this confusion around PAL, a high proportion of allergy sufferers do not read the label and instead rely on their own previous experiences.",
  "When we consider that allergies are at an all-time high, with now 1 in 4 people living with them in the UK, there is no room for omission or ambiguity when it comes to ingredient lists.",
  "Now is the time to put a label on things, and to put a very clear and detailed label at that! Fortunately, we’re now living in a time where people are more invested and motivated than ever to know what they are putting in their body. The majority want to know exactly what they’re eating so they can make informed health and fitness decisions, and this has led to much needed honesty and transparency in the industry.",
  "After all, we are what we eat, so we deserve to know what that is!",
];

export default function FoodAllergiesNatashasLawPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto w-full">
            {paragraphsBeforeImage.map((paragraph, index) => (
              <p key={`before-${index}`} className={styles.bodyText}>
                {paragraph}
              </p>
            ))}

            <figure className={styles.figure}>
              <FallbackImage
                src={`${articlePath}/natasha.jpg`}
                fallbackSrc={imageFallbacks.listingHero}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Natasha Ednan-Laperouse"
                className={styles.figureImage}
              />
              <figcaption className={styles.caption}>{imageCaption}</figcaption>
            </figure>

            {paragraphsAfterImage.map((paragraph, index) => (
              <p key={`after-${index}`} className={styles.bodyText}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className=" text-center mt-[90px]">
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
