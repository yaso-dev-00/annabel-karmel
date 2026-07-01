import { EggQuestionsAccordion } from "@/components/ArticleScreen/EggQuestionsAccordion";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  motherBoxUrl,
  whatToBuyAccordionItems,
  whatToBuyIntro,
  whatToBuyRelatedArticles,
} from "@/data/what-to-buy-page";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "What to buy | Your Pregnancy | Annabel Karmel",
  description:
    "Baby essentials to get you started — car seat, cot, pushchair, bouncer, feeding equipment, and baby clothes.",
};

export default function WhatToBuyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <p className={styles.intro}>{whatToBuyIntro}</p>

          <EggQuestionsAccordion items={whatToBuyAccordionItems} />

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
          <RelatedArticlesCarousel items={whatToBuyRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
