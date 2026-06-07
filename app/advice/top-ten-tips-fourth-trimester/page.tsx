import { EggQuestionsAccordion } from "@/components/egg-questions-accordion";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  fourthTrimesterAccordionItems,
  fourthTrimesterRelatedArticles,
} from "@/data/fourth-trimester-page";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Top ten tips for the fourth trimester | Postnatal Care | Annabel Karmel",
  description:
    "Becky and Alexis share their top self-care tips for new mums during the fourth trimester — from slowing down to planning some you time.",
};

export default function FourthTrimesterPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <p className={styles.intro}>
            Becky and Alexis share some of their top self-care tips for new mums during the 4<sup>th</sup> trimester:
          </p>

          <EggQuestionsAccordion items={fourthTrimesterAccordionItems} numbered />

          <p className={styles.excerpt}>
            Excerpt from{" "}
            <Link
              href="https://www.amazon.co.uk/Little-Book-Self-Care-New-Mums/dp/1785041827"
              className={styles.excerptLink}
              target="_blank"
              rel="noreferrer"
            >
              <strong>The Little Book of Self Care for New Mums</strong>
            </Link>{" "}
            by Beccy Hands &amp; Alexis Stickland (Vermillion, £12.99).
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={fourthTrimesterRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
