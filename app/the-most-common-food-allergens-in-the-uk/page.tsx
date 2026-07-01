import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { FallbackImage } from "@/components/UiPrimitives/FallbackImage";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { commonFoodAllergensUkBooks } from "@/data/the-most-common-food-allergens-in-the-uk-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The most common food allergens in the UK | Nutrition | Annabel Karmel",
  description:
    "Guide to the 14 major food allergens in the UK — where they appear on labels and menus, with examples for families.",
};

const articlePath = "/articles/the-most-common-food-allergens-in-the-uk";
const relatedArticles = getRelatedArticles("/the-most-common-food-allergens-in-the-uk");

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: "/articles/allergies-finding-support/hero.jpg",
} as const;

export default function TheMostCommonFoodAllergensInTheUkPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              There are 14 major allergens which must be clearly mentioned on food labels or on information such as
              restaurant menus when they are used as ingredients in a food product or meal. These reflect the most common
              food allergens across Europe. Some of these, such as mustard and celery are uncommon in the UK whilst others
              e.g. sulphur dioxide are not important in babies.{" "}
              <span className={styles.boldText}>
                <Link href="/cows-milk-allergy" className={styles.inlineLink}>
                  milk
                </Link>
                ,{" "}
                <Link href="/egg-allergy" className={styles.inlineLink}>
                  egg
                </Link>{" "}
                and nuts are the{" "}
                <Link href="/most-common-food-allergies-in-babies" className={styles.inlineLink}>
                  most common food allergies in UK children.
                </Link>
              </span>
            </p>
            <p className={styles.bodyText}>
              Here is your guide to the allergens to watch out for, and some examples of where they can be found.
            </p>

            <FallbackImage
              src={`${articlePath}/allergens-infographic.png`}
              fallbackSrc={`${articlePath}/hero.jpg`}
              finalFallbackSrc={imageFallbacks.allergies}
              alt="The Most Common Food Allergens in the UK"
              className={styles.infographicImage}
            />

            <div className={styles.infoBlock}>
              <span className={styles.infoHeading}>For more information, visit:</span>
              <a
                href="https://www.allergyuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                www.allergyuk.org
              </a>
              <a
                href="https://www.nhs.uk/conditions/allergies/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                www.nhs.uk/conditions/allergies
              </a>
              <p className={`${styles.bodyText} ${styles.infoFooterText}`}>
                Find out more about food allergies in babies{" "}
                <Link href="/allergies-with-professor-adam-fox" className={styles.inlineLink}>
                  here
                </Link>
                .
              </p>
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
