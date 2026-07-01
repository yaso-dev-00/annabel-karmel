import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  doNotFreezeItems,
  freezerTips,
  goodToFreezeItems,
} from "@/data/top-freezer-tips-page";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/top-freezer-tips");

export default function TopFreezerTipsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.body}>
            Wouldn&apos;t it be great if we could freeze time? Imagine all those extra jobs and chores we could get
            done? The great thing about the trusty freezer is that it acts like a pause button, saving you time, money
            and effort in the kitchen.
          </p>

          <p className={styles.bodySpacing}>
            We&apos;ve taken the guesswork out of freezing with our handy guide.
          </p>

          <ol className={styles.numberedList}>
            {freezerTips.map((tip) => (
              <li key={tip.title} className={styles.numberedItem}>
                <strong className={styles.numberedItemTitle}>{tip.title}</strong>. {tip.body}
              </li>
            ))}
          </ol>

          <p className={styles.sectionHeading}>What not to freeze…</p>
          <ul className={styles.bulletList}>
            {doNotFreezeItems.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>

          <p className={styles.sectionHeading}>Good to freeze</p>
          <ul className={styles.bulletList}>
            {goodToFreezeItems.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>

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
