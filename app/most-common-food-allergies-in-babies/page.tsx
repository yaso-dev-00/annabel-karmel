import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { FoodCategoryAccordion } from "@/components/ArticleScreen/FoodCategoryAccordion";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  babyFoodAllergiesAccordion,
  babyFoodAllergiesBooks,
} from "@/data/most-common-food-allergies-in-babies-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Most common food allergies in babies | Nutrition | Annabel Karmel",
  description:
    "Professor Adam Fox explores the most common food allergies in babies — egg, nut, wheat, cow's milk, and honey.",
};

const relatedArticles = getRelatedArticles("/most-common-food-allergies-in-babies");

export default function MostCommonFoodAllergiesInBabiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              Consultant Paediatric Allergist{" "}
              <Link href="/allergies-with-professor-adam-fox" className={styles.inlineLink}>
                Professor Adam Fox
              </Link>{" "}
              explores the most common food allergies in babies.
            </p>
            <p className={styles.bodyText}>
              A food allergy is when your baby&apos;s immune system has a bad (adverse) reaction to a usually harmless
              protein in a food, leading to the release of histamine and other chemicals that cause symptoms such as itch
              and swelling.
            </p>
            <p className={styles.bodyText}>
              If your baby has a food allergy, he is likely to show symptoms just a few minutes after having the food.
            </p>
            <p className={styles.bodyText}>
              Food allergies are common in babies and young children, and your child is more likely to have a food
              allergy if you have a family history of them, or of other allergic conditions, such as asthma, hayfever or
              eczema. The link between food allergies and{" "}
              <Link href="/is-eczema-linked-to-food-allergies" className={styles.inlineLink}>
                eczema
              </Link>{" "}
              is the strongest.
            </p>

            <div className={styles.accordionWrap}>
              <FoodCategoryAccordion items={babyFoodAllergiesAccordion} />
            </div>
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
