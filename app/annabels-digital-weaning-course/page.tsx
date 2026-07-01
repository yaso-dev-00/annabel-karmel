import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/annabels-digital-weaning-course");

export default function AnnabelsDigitalWeaningCoursePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h1 className={styles.title}>Annabel&apos;s Digital Weaning Course</h1>

          <p className={`${styles.body} mt-[22px]`}>
            Set your baby up for a lifetime of healthy, happy eating with your complete Digital Weaning Course from
            Annabel Karmel.
          </p>
          <p className={`${styles.body} mt-[8px]`}>
            Designed with an expert team of registered dietitians and nutritionists, Annabel&apos;s step-by-step online
            audio course provides you with the ultimate guide to feeding your baby confidently.
          </p>

          <ul className={`${styles.list} mt-[8px]`}>
            <li>– Bitesize audio tutorials</li>
            <li>– Lists, charts and planners</li>
            <li>– Helpful short videos</li>
            <li>– 100 NEW nutritious recipes</li>
            <li>– Dedicated support service</li>
            <li>– Take the tutorials at your leisure</li>
          </ul>

          <p className={`${styles.body} mt-[20px]`}>
            Get your weaning journey on track by visiting{" "}
            <a href="https://www.annabelkarmelweaning.com" target="_blank" rel="noopener" className="hover:text-[var(--hover-color)]!">
              www.annabelkarmelweaning.com
            </a>
          </p>

          <div className="mt-[64px] text-center">
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
