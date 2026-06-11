import { FoodCategoryAccordion } from "@/components/food-category-accordion";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  commonConcernsAccordionItems,
  commonConcernsIntro,
  commonConcernsRelatedArticles,
} from "@/data/common-concerns-page";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Common Concerns | Child Development & Health | Annabel Karmel",
  description:
    "Common toddler ailments including nits, chickenpox, colds, teeth-care, and constipation or diarrhoea — how to spot symptoms and help your child recover.",
};

export default function CommonConcernsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <p className={styles.intro}>{commonConcernsIntro}</p>

          <div className="mt-[28px]">
            <FoodCategoryAccordion items={commonConcernsAccordionItems} defaultOpenTitle={null} />
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={commonConcernsRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
