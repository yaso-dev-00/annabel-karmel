import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  pickyEaterRecipes,
  pickyEatersIntro,
} from '@/data/top-10-meals-to-make-for-picky-eaters-page';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Top 10 meals to make for picky eaters | Annabel Karmel',
  description:
    "Annabel's top 10 meals for picky eaters — hidden veggie dishes, homemade fish fingers, mini burgers and more to get fussy eaters back at the table.",
};

const relatedArticles = getRelatedArticles(
  '/top-10-meals-to-make-for-picky-eaters',
);

export default function PickyEatersPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          {pickyEatersIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className={styles.intro}>
              {paragraph}
            </p>
          ))}

          <div className="mt-[40px]! space-y-[60px]">
            {pickyEaterRecipes.map((recipe) => (
              <section key={recipe.title} style={{ background: '#f3ebee' }}>
                <a href={recipe.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    className="w-full"
                  />
                </a>
                <div
                  style={{ padding: '16px 21px' }}
                  className="pb-[21px]! pt-[10px] text-center"
                >
                  <h2 className={styles.cardTitle}>{recipe.title}</h2>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>
                    {recipe.body}
                    <br />
                    <span className={styles.postViews}>
                      Post Views: {recipe.postViews}
                    </span>
                  </p>
                  <div className="mt-[20px] text-center">
                    <a
                      href={recipe.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.readMore}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
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
