import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Spinach Recipes | The health benefits of spinach | Annabel Karmel',
  description:
    'Why spinach is a superfood for babies and children, plus four recipe ideas: spinach puree, frittata, shell pasta with spinach, and chicken & sweetcorn wraps.',
};

const relatedArticles = getRelatedArticles('/health-benefits-of-spinach');

const IMG = '/articles/health-benefits-of-spinach';

const OCADO_PASTA =
  'https://www.ocado.com/products/annabel-karmel-organic-pasta-shapes-47539011';
const AMAZON_PASTA_SEARCH =
  'https://www.amazon.co.uk/s?k=Annabel+Karmel+organic+baby+pasta+shells';

export default function HealthBenefitsOfSpinachPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-3 pb-6 pt-6 md:px-6 md:pb-10 md:pt-8">
          <p className={styles.introLead}>
            It&apos;s no secret that spinach is one serious superfood! It
            contains a whole host of antioxidants to help build and strengthen
            your little one&apos;s immune system. An excellent source of
            vitamins and minerals including vitamin A, C, and K as well as a
            source of iron, folic acid, and calcium, it provides a boost of
            calcium for bone health too.
          </p>
          <p className={styles.intro}>
            But, we all know that green veggies like spinach are not always a
            firm &apos;favourite&apos; for babies and young children. However,
            it&apos;s easy to serve spinach in a whole host of different ways to
            make them slightly more appealing – I hope these spinach recipes
            help to inspire!
          </p>

          <h1 className={styles.recipesMainTitle}>Spinach Recipes:</h1>
          <p className={styles.waysSubtitle}>Four ways with spinach</p>

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-spinach-puree"
          >
            <h2 id="recipe-spinach-puree" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/spinach-puree/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                1. Spinach Puree
              </a>
            </h2>
            <a
              href="https://www.annabelkarmel.com/recipes/spinach-puree/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/spinach-puree.jpg`}
                alt="Spinach puree in baby bowls with a small weaning spoon"
                width={800}
                height={800}
                fetchPriority="high"
              />
            </a>
            <p className={styles.caption}>
              Boost your baby&apos;s strength with this superfood puree recipe,
              loaded with spinach.
            </p>
          </section>

          <hr className={styles.divider} />

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-spinach-frittata"
          >
            <h2 id="recipe-spinach-frittata" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/spinach-frittata/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                2. Spinach Frittata
              </a>
            </h2>
            <a
              href="https://www.annabelkarmel.com/recipes/spinach-frittata/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/spinach-frittata.jpg`}
                alt="Slices of spinach frittata with cherry tomatoes on a platter"
                width={800}
                height={800}
                loading="lazy"
              />
            </a>
            <p className={styles.caption}>
              Eggs are high in protein and contain iron, folate and vitamin A –
              so serve up this power-packed frittata for breakfast.
            </p>
          </section>

          <hr className={styles.divider} />

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-shell-pasta"
          >
            <h2 id="recipe-shell-pasta" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/shell-pasta-spinach/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                3. Shell Pasta with Spinach
              </a>
            </h2>
            <a
              href="https://www.annabelkarmel.com/recipes/shell-pasta-spinach/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/shell-pasta-spinach.jpg`}
                alt="Baby pasta shells with spinach and tomato in a small bowl"
                width={800}
                height={800}
                loading="lazy"
              />
            </a>
            <p className={styles.caption}>
              A tasty veggie pasta sauce ready in minutes. You can make this
              using my organic baby pasta shells which are a great way to
              introduce more texture into your baby&apos;s food. My organic
              pasta shells are now available to buy on{' '}
              <a
                href={OCADO_PASTA}
                className={styles.inlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ocado
              </a>{' '}
              &amp;{' '}
              <a
                href={AMAZON_PASTA_SEARCH}
                className={styles.inlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon
              </a>
              .
            </p>
          </section>

          <hr className={styles.divider} />

          <section className="mt-10 md:mt-12" aria-labelledby="recipe-wraps">
            <h2 id="recipe-wraps" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/chicken-sweetcorn-wraps-spinach/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                4. Chicken &amp; Sweetcorn Wraps with Spinach
              </a>
            </h2>
            <a
              href="https://www.annabelkarmel.com/recipes/chicken-sweetcorn-wraps-spinach/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/chicken-sweetcorn-wraps.jpg`}
                alt="Chicken and sweetcorn wraps with spinach tied with string on a plate"
                width={800}
                height={800}
                loading="lazy"
              />
            </a>
            <p className={styles.caption}>
              Pop some veggies inside a wrap and suddenly it adds oodles of
              child appeal. This is a quick and tasty combination and you can
              add other ingredients like chopped cherry tomatoes, spring onion
              or swap the chicken for tuna.
            </p>
          </section>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>

        <div className="mx-auto mb-16 max-w-[1200px] px-3 md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
