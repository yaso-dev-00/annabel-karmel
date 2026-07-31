import { FoodCategoryAccordion } from '@/components/ArticleScreen/FoodCategoryAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  familyHealthAccordionItems,
  familyHealthIntroParagraphs,
  familyHealthRelatedArticles,
} from '@/data/family-health-page';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Family Health | Child Development & Health | Annabel Karmel',
  description:
    'British Red Cross first aid advice for families covering choking, burns, asthma attacks, poisoning, and febrile seizures.',
};

export default function FamilyHealthPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          {familyHealthIntroParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.intro}>
              {paragraph}
            </p>
          ))}

          <div className="mt-[28px]">
            <FoodCategoryAccordion
              items={familyHealthAccordionItems}
              defaultOpenTitle={null}
            />
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={familyHealthRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
