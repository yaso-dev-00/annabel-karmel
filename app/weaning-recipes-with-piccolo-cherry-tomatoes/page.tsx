import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/weaning-recipes-with-piccolo-cherry-tomatoes',
);

const recipes = [
  {
    title: 'Hidden Vegetable Tomato Sauce',
    href: 'https://www.annabelkarmel.com/recipes/hidden-vegetable-tomato-sauce/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/hidden-vegetable-tomato-sauce.jpg',
    excerpt:
      "This colourful and flavourful sauce is perfect for batch cooking and stocking in the freezer for a rainy day - or simply one where you're lacking food inspiration. Mix with pasta shells, meatballs or add some stock and serve as a delicious soup. Post Views: 24,760",
  },
  {
    title: 'Chicken, Tomato & Coconut curry',
    href: 'https://www.annabelkarmel.com/recipes/chicken-tomato-coconut-curry/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/chicken-tomato-coconut-curry.jpg',
    excerpt:
      "This dish will no doubt spice up your baby's life as well as stave off fussy eating in the longrun! It's been shown time and time again that introducing new foods between 6 and 12 months will help to set your little one up with a healthy and adventurous appetite for life. Post Views: 26,092",
  },
  {
    title: 'Chicken, Tomato & Corn Fritters',
    href: 'https://www.annabelkarmel.com/recipes/chicken-tomato-corn-fritters/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/chicken-tomato-corn-fritters.jpg',
    excerpt:
      "You won't want to fritter away any more time not making these delicious chicken, sweetcorn and tomato buttermilk fritters. This is the perfect quick and easy meal to use up that leftover roast chicken from the weekend! Post Views: 10,331",
  },
  {
    title: 'Cherry Tomato & Mascarpone Risotto',
    href: 'https://www.annabelkarmel.com/recipes/cherry-tomato-mascarpone-risotto/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/cherry-tomato-mascarpone-risotto.jpg',
    excerpt:
      'Enjoy a comforting bowl of risotto with sweet cherry tomatoes and mascarpone. This is an absolutely winning combo! Post Views: 2,530',
  },
  {
    title: 'Spinach & Tomato Frittata',
    href: 'https://www.annabelkarmel.com/recipes/spinach-frittata/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/spinach-tomato-frittata.jpg',
    excerpt:
      'Eggs are high in protein and contain iron, folate and vitamin A - so serve up this power-packed spinach and tomato frittata for breakfast. Post Views: 942',
  },
  {
    title: 'Mini Cherry Tomato & Cheese Muffins',
    href: 'https://www.annabelkarmel.com/recipes/mini-piccolo-cherry-tomato-cheese-muffins/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/mini-cherry-tomato-cheese-muffins.jpg',
    excerpt:
      "If you're looking for new ways to mix up your baby's snacks then look no further than my Mini Cherry Tomato & Cheese Muffins. You can also freeze these when cooked for an emergency snack stash! Post Views: 10,262",
  },
  {
    title: 'Cherry Tomato, Squash & Spinach Orzo',
    href: 'https://www.annabelkarmel.com/recipes/piccolo-cherry-tomato-squash-spinach-orzo/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/cherry-tomato-squash-spinach-orzo.jpg',
    excerpt:
      'This Cherry Tomato, Squash & Spinach Orzo is such a tasty and nutritionally balanced meal for your tiny tot. Orzo pasta is the perfect size to encourage your baby to tackle texture and learn to chew. Post Views: 2,524',
  },
  {
    title: 'Salmon, Sweet Potato & Tomato Puree',
    href: 'https://www.annabelkarmel.com/recipes/salmon-sweet-potato-tomato-puree/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/salmon-sweet-potato-tomato-puree.jpg',
    excerpt:
      "The sooner you can establish oily fish on your tot's menu the better. This Salmon, Sweet potato & Tomato Puree creates the most fantastic flavour combination. Post Views: 1,296",
  },
  {
    title: 'Sweetcorn & Tomato Rainbow Fritters',
    href: 'https://www.annabelkarmel.com/recipes/sweetcorn-tomato-rainbow-fritters/',
    image:
      '/articles/weaning-recipes-with-piccolo-cherry-tomatoes/sweetcorn-tomato-rainbow-fritters.jpg',
    excerpt:
      'This recipe for sweetcorn & tomato rainbow fritters is super easy. Simply add whichever seasonal vegetables you have to hand. A perfect finger food packed full of flavour! Post Views: 3,328',
  },
];

export default function WeaningRecipesWithPiccoloCherryTomatoesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro}   text-center`}>
            The possibilities of what to do with Piccolo Cherry Tomatoes are
            endless, they're almost tomatoo good to be true - especially when it
            comes to weaning your little one!
          </p>
          <p className={`${styles.intro}  text-center`}>
            Piccolos are rich in Vitamins E, C and K, as well as being a
            valuable source of the antioxidant lycopene - and not to mention
            seriously delicious!
          </p>
          <p className={`${styles.intro}   text-center`}>
            It's remarkable how your baby suddenly transforms into a top
            detective at mealtimes, scrupulously on the hunt for signs of
            veggies.
          </p>
          <p className={`${styles.intro}  text-center`}>
            But what I've discovered is that while little ones think they don't
            like vegetables, they really just don't like the look of them!
          </p>
          <p className={`${styles.intro}   text-center`}>
            So here are some brand new weaning recipes to try our on your tiny
            taster.
          </p>
          <p className={`${styles.intro}   text-center`}>Enjoy!</p>

          <div className="mt-[70px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section
                key={recipe.title}
                style={{ background: '#f3ebee' }}
                className="mt-[40px]"
              >
                <a href={recipe.href}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full"
                  />
                </a>
                <div
                  style={{ padding: '16px 21px' }}
                  className="px-[16px] pb-[21px]! mt-[20px]! pt-[10px] text-center"
                >
                  <h2 className={styles.cardTitle}>{recipe.title}</h2>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>
                    {recipe.excerpt}
                  </p>
                  <div className="mt-[20px] text-center">
                    <a href={recipe.href} className={styles.readMore}>
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
