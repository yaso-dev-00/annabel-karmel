import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Statistics on baby-led weaning | Annabel Karmel",
  description:
    "Discover what UK families say about baby-led weaning with highlights from Annabel Karmel's nationwide weaning survey.",
};

const relatedArticles = getRelatedArticles("/statistics-baby-led-weaning");

export default function StatisticsBabyLedWeaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] mt-[20px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h1 className={styles.title}>Discover what UK families say about baby-led weaning</h1>

          <p className={styles.body}>
            We had a huge response to our nationwide baby-led weaning survey, and it&apos;s safe to say that parents
            have very similar worries when it comes to weaning!
          </p>
          <p className={styles.body}>
            If you&apos;re still undecided about which weaning route to take, here are our poll highlights.
          </p>

          <img
            src="/articles/statistics-baby-led-weaning/infographic.png"
            alt="Statistics on baby led weaning"
            width={1200}
            height={1600}
            className={styles.contentImage}
          />

          <div className="mt-[70px] text-center">
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
