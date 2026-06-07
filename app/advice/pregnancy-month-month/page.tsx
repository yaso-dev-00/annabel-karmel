import { EggQuestionsAccordion } from "@/components/egg-questions-accordion";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  motherBoxUrl,
  pregnancyIntroParagraphs,
  pregnancyMonthRelatedArticles,
  pregnancyTrimesterAccordionItems,
} from "@/data/pregnancy-month-month-page";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your pregnancy month-by-month | Annabel Karmel",
  description:
    "A trimester-by-trimester guide to your baby's development and the changes you and your body will encounter throughout pregnancy.",
};

export default function PregnancyMonthMonthPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {pregnancyIntroParagraphs.map((paragraph) => (
            <p key={paragraph} className={styles.intro}>
              {paragraph}
            </p>
          ))}

          <EggQuestionsAccordion items={pregnancyTrimesterAccordionItems} />

          <p className={styles.attribution}>
            <strong>
              Alexis and Beccy are the duo behind{" "}
              <Link href={motherBoxUrl} className={styles.attributionLink} target="_blank" rel="noreferrer">
                The Mother Box
              </Link>{" "}
              – a complete package of pregnancy, birth and postnatal gifts, courses and workshops carefully created to
              nurture, heal and empower new mums.
            </strong>
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={pregnancyMonthRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
