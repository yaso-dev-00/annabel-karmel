import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Top 10 Weaning Recipes for 6-9 months | Annabel Karmel',
  description:
    "Annabel Karmel's top weaning recipe ideas to help parents get started, including lentils, bolognese, veggie purees and first curries.",
};

const relatedArticles = getRelatedArticles('/top-10-weaning-recipes');
const IMG = '/articles/top-10-weaning-recipes';

type Recipe = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  postViews: string;
};

const recipes: Recipe[] = [
  {
    title: 'Fruit & Veg Ice Lollies',
    href: 'https://www.annabelkarmel.com/recipes/fruit-veg-ice-lollies/',
    image: `${IMG}/fruit-veg-ice-lollies.png`,
    imageAlt: 'Fruit and veg ice lollies',
    excerpt:
      'Did you know that you can make the freshest, healthiest ice lollies with just a few ingredients? These zero-sugar fruit and veggie ice lollies are delicious and not only a healthy treat but will also soothe sore gums if your little one is teething.',
    postViews: '7,466',
  },
  {
    title: 'Mini Beef Meatballs with Carrot & Apple',
    href: 'https://www.annabelkarmel.com/recipes/mini-beef-meatballs-with-carrot-apple/',
    image: `${IMG}/mini-beef-meatballs.jpg`,
    imageAlt: 'Mini beef meatballs with carrot and apple',
    excerpt:
      'Keep in mind that iron deficiency is the most common deficiency between 6 and 12 months. Red meat provides a great source of iron, and these mini meatballs are quick and easy to prepare.',
    postViews: '771',
  },
  {
    title: 'Cherry Tomato, Squash & Spinach Orzo',
    href: 'https://www.annabelkarmel.com/recipes/piccolo-cherry-tomato-squash-spinach-orzo/',
    image: `${IMG}/cherry-tomato-squash-spinach-orzo.jpg`,
    imageAlt: 'Cherry tomato squash and spinach orzo',
    excerpt:
      'This Cherry Tomato, Squash & Spinach Orzo is such a tasty and nutritionally balanced meal for your tiny tot. Orzo pasta is the perfect size to encourage your baby to tackle texture and learn to chew.',
    postViews: '2,561',
  },
  {
    title: 'My First Chicken Curry',
    href: 'https://www.annabelkarmel.com/recipes/my-first-chicken-curry/',
    image: `${IMG}/my-first-chicken-curry.png`,
    imageAlt: 'My first chicken curry',
    excerpt:
      'Some parents are surprised to hear that their baby can enjoy a tasty curry from so early on in their weaning journey. Once your little one is around 7-8 months old, they will probably like a mild, aromatic curry.',
    postViews: '6,019',
  },
  {
    title: 'Trio of Vegetables with Tomatoes & Basil',
    href: 'https://www.annabelkarmel.com/recipes/trio-of-vegetables-with-tomatoes-basil/',
    image: `${IMG}/trio-veg-tomato-basil.jpg`,
    imageAlt: 'Trio of vegetables with tomatoes and basil',
    excerpt:
      'For this Trio of Vegetables with Tomatoes & Basil recipe, the root veggies puree to a smooth consistency, making them an ideal first food. The mix of butternut squash & carrots complements the tomatoes, basil & cheese perfectly.',
    postViews: '756',
  },
  {
    title: 'Popeye Pasta',
    href: 'https://www.annabelkarmel.com/recipes/popeye-pasta/',
    image: `${IMG}/popeye-pasta.jpg`,
    imageAlt: 'Popeye pasta recipe',
    excerpt:
      "This pasta dish contains spinach which is a great source of various vitamins. Mixing tiny pasta shapes into your baby's food is also a good way to add texture to encourage your baby to eat more lumpy food.",
    postViews: '11,275',
  },
  {
    title: 'Lovely Lentils',
    href: 'https://www.annabelkarmel.com/recipes/lovely-lentils/',
    image: `${IMG}/lovely-lentils.jpg`,
    imageAlt: 'Lovely lentils puree',
    excerpt:
      "This Lovely Lentils recipe is sweet, soft & smooth for babies. It's easy to make & is packed full of vital nutrients to help them grow up strong.",
    postViews: '15,210',
  },
  {
    title: "Baby's First Bolognese Sauce",
    href: 'https://www.annabelkarmel.com/recipes/babys-first-bolognese-sauce-2/',
    image: `${IMG}/babys-first-bolognese-sauce.jpg`,
    imageAlt: 'Babys first bolognese sauce',
    excerpt:
      "Red meat is rich in iron, which is important for supporting your baby's growth and immune system. This recipe for Baby's First Bolognese Sauce is a great option to help up your little one's iron intake during weaning.",
    postViews: '95,210',
  },
];

export default function Top10WeaningRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Reaching that all important milestone of weaning your baby is a key
            moment for every parent. It's exciting and full of fun, but it can
            also be a little daunting. Fear not! Annabel's got you covered with
            her top weaning recipes to help you and your little one get started
            on your weaning adventure!
          </p>
          <p className={styles.intro}>
            Don't forget to visit{' '}
            <a
              href="https://www.annabelkarmel.com/weaning-hub/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Annabel's Weaning Hub
            </a>{' '}
            for advice, handy tips, recipes and product recommendations. With
            all the information you need in one place covering every stage of
            your baby's weaning journey, it's your go-to guide to baby's first
            year.
          </p>

          <div className="space-y-[60px]">
            {recipes.map((recipe) => (
              <section
                key={recipe.title}
                className={`${styles.card} mt-[40px]`}
              >
                <a
                  href={recipe.href}
                  className={styles.imageWrap}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    width={768}
                    height={768}
                    loading="lazy"
                  />
                </a>
                <div className={`${styles.cardBody} text-center`}>
                  <h2 className={styles.cardTitle}>
                    <a
                      href={recipe.href}
                      className={styles.cardTitleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {recipe.title}
                    </a>
                  </h2>
                  <p className={styles.excerpt}>
                    {recipe.excerpt}
                    <span className={styles.postViews}>
                      Post Views: {recipe.postViews}
                    </span>
                  </p>
                  <div className="mt-[20px] text-center">
                    <a
                      href={recipe.href}
                      className={styles.readMore}
                      target="_blank"
                      rel="noopener noreferrer"
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

        <div className="mb-[80px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
