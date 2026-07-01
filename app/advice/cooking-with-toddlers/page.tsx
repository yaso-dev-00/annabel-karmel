import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  cookingWithToddlersBanner,
  cookingWithToddlersIntro,
  cookingWithToddlersRelatedArticles,
  cookingWithToddlersSections,
} from "@/data/cooking-with-toddlers-page";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cooking with Toddlers | Child Health & Learning | Annabel Karmel",
  description:
    "Get toddlers involved in the kitchen to build healthy eating habits, teach invaluable skills, and make simple meals together from scratch.",
};

export default function CookingWithToddlersPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {cookingWithToddlersIntro.map((paragraph, index) => (
            <p
              key={paragraph}
              className={index === 0 ? styles.bodyFirst : styles.body}
            >
              {paragraph}
            </p>
          ))}

          {cookingWithToddlersSections.map((section) => (
            <section key={section.title}>
              <p className={styles.subheading}>{section.title}</p>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.body}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <img
            src={cookingWithToddlersBanner.image}
            alt={cookingWithToddlersBanner.alt}
            width={1000}
            height={400}
            className={styles.bannerImage}
            loading="lazy"
          />

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={cookingWithToddlersRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
