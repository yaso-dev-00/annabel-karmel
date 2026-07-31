import { ArticleRecipeCarousel } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  brainFoods,
  brainpowerRecipes,
} from '@/data/foods-boost-childs-brainpower-page';
import { getRelatedArticles } from '@/data/related-articles';
import Link from 'next/link';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/foods-boost-childs-brainpower');

function BrainFoodBlock({
  name,
  icon,
  iconAlt,
  description,
}: {
  name: string;
  icon: string;
  iconAlt: string;
  description: string;
}) {
  return (
    <section className="mt-[50px] first:mt-[40px]">
      <div className="flex justify-center">
        <img
          src={icon}
          alt={iconAlt}
          className="h-auto w-[120px] max-w-full object-contain"
          loading="lazy"
        />
      </div>
      <h3 className={`${styles.foodName} mt-[20px] text-center`}>{name}</h3>
      <p className={`${styles.foodBody} mt-[30px]!`}>{description}</p>
    </section>
  );
}

export default function FoodsBoostChildsBrainpowerPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full  max-w-[1200px] px-[8px] pb-[10px] pt-[40px] md:px-[14px] ">
          <p className={styles.intro}>
            We&apos;re all about fuelling children with the best nourishment for
            busy days of play, learning and development. Food plays an integral
            role in the development of your little one&apos;s brain. Like the
            body the brain absorbs nutrients from the food we eat. In this
            article, we run through our favourite brain foods for kids!
          </p>

          <p className={styles.subheading}>
            Here are our favourite foods to help fuel your little ones:
          </p>

          {brainFoods.map((food) => (
            <BrainFoodBlock key={food.name} {...food} />
          ))}

          <p className={styles.ironLink}>
            For more on essential critical nutrients see our article all about{' '}
            <Link
              href="/critical-nutrients-baby-importance-iron"
              className={styles.inlineLink}
            >
              Iron
            </Link>
            .
          </p>

          <h2 className={styles.recipesHeading}>
            Feed Imaginations with Annabel&apos;s Supercharged Recipes:
          </h2>

          <ArticleRecipeCarousel
            items={brainpowerRecipes}
            className="mt-[50px]"
            perDesktopView={5}
            loop
          />

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
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
