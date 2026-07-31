import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const IMG_BASE = '/articles/annabels-top-15-recipes';

const relatedArticles = getRelatedArticles('/annabels-top-15-recipes');

const recipes = [
  {
    title: 'Chicken, Tomato & Veggie Stars',
    href: 'https://www.annabelkarmel.com/recipes/chicken-tomato-veggie-stars/',
    image: `${IMG_BASE}/chicken-tomato-veggie-stars.jpg`,
  },
  {
    title: 'Superfood Veggie Croquettes',
    href: 'https://www.annabelkarmel.com/recipes/superfood-vegetable-croquettes/',
    image: `${IMG_BASE}/superfood-veggie-croquettes.jpg`,
  },
  {
    title: '4-Ingredient Cheesy Broccoli Pasta',
    href: 'https://www.annabelkarmel.com/recipes/cheesy-broccoli-pasta/',
    image: `${IMG_BASE}/cheesy-broccoli-pasta.jpg`,
  },
  {
    title: 'Chicken, Apple & Carrot Balls',
    href: 'https://www.annabelkarmel.com/recipes/chicken-apple-carrot-balls/',
    image: `${IMG_BASE}/chicken-apple-carrot-balls.png`,
  },
  {
    title: 'Salmon & Veggie Bites',
    href: 'https://www.annabelkarmel.com/recipes/salmon-veggie-bites/',
    image: `${IMG_BASE}/salmon-veggie-bites.jpg`,
  },
  {
    title: 'Veggie Frittata Muffins',
    href: 'https://www.annabelkarmel.com/recipes/veggie-frittata-muffins/',
    image: `${IMG_BASE}/veggie-frittata-muffins.jpg`,
  },
  {
    title: 'My First Chicken Curry',
    href: 'https://www.annabelkarmel.com/recipes/my-first-chicken-curry/',
    image: `${IMG_BASE}/my-first-chicken-curry.png`,
  },
  {
    title: 'Banana Puree',
    href: 'https://www.annabelkarmel.com/recipes/banana-puree/',
    image: `${IMG_BASE}/banana-puree.jpg`,
  },
  {
    title: 'Broccoli, Chicken & Potato Bites',
    href: 'https://www.annabelkarmel.com/recipes/broccoli-chicken-potato-bites/',
    image: `${IMG_BASE}/broccoli-chicken-potato-bites.png`,
  },
  {
    title: 'Kids Chicken Curry',
    href: 'https://www.annabelkarmel.com/recipes/kids-chicken-curry/',
    image: `${IMG_BASE}/kids-chicken-curry.jpg`,
  },
  {
    title: "Baby's First Bolognese Sauce",
    href: 'https://www.annabelkarmel.com/recipes/babys-first-bolognese-sauce-2/',
    image: `${IMG_BASE}/babys-first-bolognese.jpg`,
  },
  {
    title: 'Power Oat Bars',
    href: 'https://www.annabelkarmel.com/recipes/power-packed-oat-bars/',
    image: `${IMG_BASE}/power-oat-bars.jpg`,
  },
  {
    title: 'Easy Cupcakes',
    href: 'https://www.annabelkarmel.com/recipes/easy-cupcakes/',
    image: `${IMG_BASE}/easy-cupcakes.jpg`,
  },
  {
    title: 'My First Cottage Pie',
    href: 'https://www.annabelkarmel.com/recipes/my-first-cottage-pie/',
    image: `${IMG_BASE}/my-first-cottage-pie.jpg`,
  },
];

export default function AnnabelsTop15RecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[14px] pb-[54px] pt-[60px]">
          {/* <h1 className={styles.title}>Annabel&apos;s Top 15 recipes</h1> */}

          <p className={styles.intro}>
            Stuck for fresh mealtime ideas? We&apos;ve done the hard work for
            you and put together our top 15 recipes of all time! We have catered
            to all in this line up from baby recipes to toddlers to family
            meals.
          </p>

          <ul className={styles.recipeGrid}>
            {recipes.map((recipe) => (
              <li key={recipe.href} className={styles.recipeCard}>
                <a
                  href={recipe.href}
                  className={styles.recipeLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={recipe.title}
                >
                  <span className={styles.recipeImageWrap}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className={styles.recipeImage}
                      loading="lazy"
                    />
                  </span>
                  <h2 className={styles.recipeTitle}>{recipe.title}</h2>
                </a>
              </li>
            ))}
          </ul>

          <section className="relative left-1/2 right-1/2 mt-[80px] flex w-screen -translate-x-1/2 flex-col items-center px-2 md:mt-[100px] md:px-4">
            <h2 className={`${styles.relatedTitle} text-center`}>
              Related Articles
            </h2>
            <p className={`${styles.relatedIntro} text-center`}>
              Some more articles you might enjoy...
            </p>
            <RelatedArticlesCarousel items={relatedArticles} />
          </section>
        </article>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
