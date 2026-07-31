import { FoodCategoryAccordion } from '@/components/ArticleScreen/FoodCategoryAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  childrensNutritionUrl,
  weaningPrematureFaqItems,
  weaningPrematureIntro,
  weaningPrematureRelatedArticles,
} from '@/data/weaning-premature-babies-page';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Weaning premature babies | Annabel Karmel',
  description:
    "There's lots of weaning guidance for babies born on or around their due date. Here is some key information for weaning premature babies.",
};

export default function WeaningPrematureBabiesAdvicePage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>{weaningPrematureIntro}</p>

          <div className="mt-[28px]">
            <FoodCategoryAccordion
              items={weaningPrematureFaqItems}
              defaultOpenTitle={null}
            />
          </div>

          <p className={styles.closing}>
            If you would like to learn more about nutrition and feeding for
            babies and toddlers head over to my blog{' '}
            <a
              href={childrensNutritionUrl}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              www.childrensutrition.co.uk
            </a>
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={weaningPrematureRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
