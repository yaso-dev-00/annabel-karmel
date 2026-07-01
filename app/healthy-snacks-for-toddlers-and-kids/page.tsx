import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { healthySnacks, snacksIntro } from "@/data/healthy-snacks-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "10 Easy and Healthy Snack Ideas for Toddlers and Kids | Annabel Karmel",
  description:
    "Keep a supply of healthy snacks on hand for toddlers and kids. Top super-fuelled kids snack ideas to help feed their adventures and keep them topped up until teatime!",
};

const relatedArticles = getRelatedArticles("/healthy-snacks-for-toddlers-and-kids");

export default function HealthySnacksPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={styles.intro}>{snacksIntro}</p>
<p className={styles.intro}>And if you can make your own, then do, as it’s a good opportunity to get the kids involved in the preparation too.</p>
          <div className="mt-[40px]! space-y-[60px]">
            {healthySnacks.map((snack) => (
              <section key={snack.title} style={{ background: "#f3ebee" }}>
                <a href={snack.href} target="_blank" rel="noopener noreferrer">
                  <img src={snack.image} alt={snack.imageAlt} className="w-full" />
                </a>
                <div style={{ padding: "16px 21px" }} className="pb-[21px]! pt-[10px] text-center">
                  <h2 className={styles.cardTitle}>{snack.title}</h2>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>
                    {snack.body}
                    <br />
                    <span className={styles.postViews}>Post Views: {snack.postViews}</span>
                  </p>
                  <div className="mt-[20px] text-center">
                    <a href={snack.href} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                      Read More
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-[70px] text-center">
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
