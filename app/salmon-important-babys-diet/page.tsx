import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:
    "Salmon Recipes | Why is salmon so important in your baby's diet? | Annabel Karmel",
  description:
    'Why oily fish like salmon matters for babies, serving guidance, and four family-friendly salmon recipes from puree to pasta.',
};

const relatedArticles = getRelatedArticles('/salmon-important-babys-diet');

const IMG = '/articles/salmon-important-babys-diet';

const FISH_FACTS = [
  'Salmon can be given from 6 months once those first tastes have been given',
  'Aim for giving your baby 2 servings of oily fish a week (but no more due to pollutants found in oily fish which may build up in the body).',
  'There are no set portion size guidelines for a baby under 1 year but for a toddler aged 1-4 years roughly aim for a 40g portion.',
  'Tinned salmon is also a good source of calcium (because of the bones). Just ensure they are completely ground up and blended for your baby before serving',
] as const;

export default function SalmonImportantBabysDietPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.introLead}>
            Oily fish such as salmon is the best source of Omega 3 essential
            fatty acids for your growing baby.
          </p>
          <p className={styles.introLead}>
            These fatty acids are &apos;essential&apos; as they help the
            development of your child&apos;s vision, nervous system, as well as
            brain growth and development.
          </p>
          <p className={styles.introLead}>
            Plus, they help to reduce inflammation and enhance the function of
            their immune cells. Try out this superfood with the salmon recipes
            below!
          </p>

          <ul className="m-0 list-none p-0" aria-label="Salmon feeding tips">
            {FISH_FACTS.map((fact) => (
              <li key={fact} className={styles.factBlock}>
                <img
                  src={`${IMG}/fish-icon.png`}
                  alt=""
                  width={105}
                  height={105}
                  className={styles.factIcon}
                />
                <p className={styles.factText}>{fact}</p>
              </li>
            ))}
          </ul>

          <h2 className={styles.recipesMainTitle}>Salmon recipes 4-ways</h2>

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-glazed-salmon"
          >
            <h3 id="recipe-glazed-salmon" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/annabels-glazed-salmon-chinese-rice/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Glazed Salmon &amp; Chinese Rice
              </a>
            </h3>
            <a
              href="https://www.annabelkarmel.com/recipes/annabels-glazed-salmon-chinese-rice/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/glazed-salmon-chinese-rice.jpg`}
                alt="Glazed salmon with Chinese rice in a bowl"
                width={900}
                height={900}
                fetchPriority="high"
              />
            </a>
            <p className={styles.caption}>
              This is a recipe you&apos;ll want to keep to hand! Not only is
              this delicious salmon dish high in that all-important omega-3,
              it&apos;s got bags of flavour making it marvelously moreish. The
              whole family are sure to love this tasty combo.
            </p>
          </section>

          <hr className={styles.divider} />

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-fish-cakes"
          >
            <h3 id="recipe-fish-cakes" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/salmon-fish-cakes/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Salmon Fish Cakes
              </a>
            </h3>
            <a
              href="https://www.annabelkarmel.com/recipes/salmon-fish-cakes/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/salmon-fish-cakes.jpg`}
                alt="Mini salmon fish cakes with sweet potato fries and dip"
                width={900}
                height={900}
                loading="lazy"
              />
            </a>
            <p className={styles.caption}>
              Mini salmon fish cakes, perfectly formed for little hands and
              hungry tummies. A great way to boost your baby&apos;s intake of
              those vital essential fatty acids and mummy and daddy can tuck in
              too!
            </p>
          </section>

          <hr className={styles.divider} />

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-super-salmon-puree"
          >
            <h3 id="recipe-super-salmon-puree" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/super-salmon-puree/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Super Salmon Puree
              </a>
            </h3>
            <a
              href="https://www.annabelkarmel.com/recipes/super-salmon-puree/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/super-salmon-puree.jpg`}
                alt="Super salmon puree in a baby bowl with fish-shaped crackers"
                width={900}
                height={900}
                loading="lazy"
              />
            </a>
            <p className={styles.caption}>
              Oily fish is the best source of essential fatty acids which are
              vital for your baby&apos;s brain and visual development. Ideally
              you should include oily fish like salmon twice a week in your
              baby&apos;s diet. Here&apos;s a tasty recipe to get your gurgling
              gourmet excited about fish for dinner!
            </p>
          </section>

          <hr className={styles.divider} />

          <section
            className="mt-10 md:mt-12"
            aria-labelledby="recipe-salmon-pea-pasta"
          >
            <h3 id="recipe-salmon-pea-pasta" className={styles.recipeTitle}>
              <a
                href="https://www.annabelkarmel.com/recipes/salmon-pea-pasta/"
                className={styles.recipeTitleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Salmon &amp; Pea Pasta
              </a>
            </h3>
            <a
              href="https://www.annabelkarmel.com/recipes/salmon-pea-pasta/"
              className={`${styles.recipeFigure} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG}/salmon-pea-pasta.jpg`}
                alt="Salmon and pea pasta on pink toddler plates"
                width={900}
                height={901}
                loading="lazy"
              />
            </a>
            <p className={styles.caption}>
              Top up your omega 3 by eating salmon in this light yet creamy
              pasta dish, mixed with leek, pea &amp; dill.
            </p>
          </section>

          <p className={styles.closingNote}>
            We hope you enjoyed these nutritious salmon recipes. For more
            nutritional information, see our article on{' '}
            <a
              href="/critical-nutrients-baby-importance-essential-fatty-acids"
              className={styles.inlineLink}
            >
              essential fatty acids
            </a>
            .
          </p>

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
