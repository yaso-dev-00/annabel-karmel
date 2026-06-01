import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lunchboxRecipes, lunchboxTips } from "@/data/lunchboxes-2-page";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/lunchboxes-2");

export default function LunchboxesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[40px] md:px-[14px]">
          <p className={styles.body}>
            Given that school children consume one third of their daily food intake at school (once they are too old for
            the governments free school meals initiative), the humble lunch box is worthy of consideration. It is too
            easy for lunchboxes to be packed full of the wrong things, namely the usual culprits; fat, sugar and salt.
            Not only do these lunch boxes miss the nutritional mark they also negatively impact on energy and
            concentration levels during the day.
          </p>

          <ul className={styles.bulletList}>
            {lunchboxTips.map((tip) => (
              <li key={tip.label ?? tip.body.slice(0, 40)} className={styles.bulletItem}>
                {tip.label ? (
                  <>
                    <strong>{tip.label}</strong> {tip.body}
                  </>
                ) : (
                  tip.body
                )}
              </li>
            ))}
          </ul>

          <h2 className={styles.recipesHeading}>Lunchbox Recipes:</h2>

          <ArticleRecipeCarousel items={lunchboxRecipes} className="mt-[40px]" perDesktopView={5} loop />

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
