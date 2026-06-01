import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { midweekRecipes, midweekRecipesIntro } from "@/data/top-10-easy-dinner-recipes-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "10 Easy Midweek Meal Recipes | Nutrition | Annabel Karmel",
  description:
    "In this article, we list our top 10 Easy Midweek Meal Recipes...from homemade oven-baked chicken nuggets to meat-free Bolognese.",
};

const relatedArticles = getRelatedArticles("/top-10-easy-dinner-recipes");

export default function Top10EasyDinnerRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={styles.intro}>{midweekRecipesIntro}</p>
<p className={styles.intro}>From delicious one-pots, to quick pasta recipes and fakeaways, Annabel is on hand to feed the family in a flash.</p>
          <div className="mt-[40px]! space-y-[60px]">
            {midweekRecipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }}>
                <a href={recipe.href} target="_blank" rel="noopener noreferrer">
                  <img src={recipe.image} alt={recipe.imageAlt} className="w-full" />
                </a>
                <div style={{ padding: "16px 21px" }} className="pb-[21px]! pt-[10px] text-center">
                  <h2 className={styles.cardTitle}>{recipe.title}</h2>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>
                    {recipe.body}
                    <br />
                    <span className={styles.postViews}>Post Views: {recipe.postViews}</span>
                  </p>
                  <div className="mt-[20px] text-center">
                    <a href={recipe.href} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                      Read More
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[80px]! px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
