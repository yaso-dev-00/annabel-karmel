import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  toddlerSnackingIntroSections,
  toddlerSnackingRelatedArticles,
  toddlerSnackingSections,
  type ToddlerSnackingSection,
} from "@/data/toddler-snacking-page";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Toddler Snacks | Healthy Food Ideas | Annabel Karmel",
  description:
    "Healthy toddler snack ideas including fruit and veg, carbohydrates, protein, healthy fats and sweet treats. Tips on when and how to offer snacks to toddlers.",
};

function SnackingSection({ section }: { section: ToddlerSnackingSection }) {
  return (
    <section>
      <h2 className={styles.sectionTitle}>{section.title}</h2>

      {section.image ? (
        <img
          src={section.image}
          alt={section.imageAlt ?? section.title}
          width={1000}
          height={667}
          className={styles.contentImage}
          loading="lazy"
        />
      ) : null}

      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.body}>
          {paragraph}
        </p>
      ))}

      {section.topTip ? (
        <p className={styles.topTip}>
          <strong>Top Tip:</strong> {section.topTip}
        </p>
      ) : null}

      {section.recipes && section.recipes.length > 0 ? (
        <ArticleRecipeCarousel
          items={section.recipes}
          className="mt-[40px]"
          perDesktopView={4}
          compact
        />
      ) : null}
    </section>
  );
}

export default function ToddlerSnackingPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {toddlerSnackingIntroSections.map((section) => (
            <SnackingSection key={section.title} section={section} />
          ))}

          {toddlerSnackingSections.map((section) => (
            <SnackingSection key={section.title} section={section} />
          ))}

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={toddlerSnackingRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
