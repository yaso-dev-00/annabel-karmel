import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/10-delicious-cherry-tomato-recipes',
);

const recipes = [
  {
    title: 'Tomato Hummus with Baked Tortilla Chips',
    href: 'https://www.annabelkarmel.com/recipes/tomato-hummus-with-baked-tortilla-chips/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/tomato-hummus-with-baked-tortilla-chips.jpg',
    excerpt:
      "Hummus is a much-loved snack in many families and it's ideal for those sudden snack-attacks! This recipe takes it up a notch in the flavour and nutritious stakes! With its creamy texture and rich tomato flavour, this hummus is the perfect dip for baked tortilla chips (ready for scooping and dipping!) Not only is this recipe delicious, but it's also packed with nutrients. Tomatoes are a great source of vitamins and antioxidants, while chickpeas provide an excellent source of protein and fibre. It's a nutritious snack that you can feel good about serving to your little ones. Post Views: 1,035",
  },
  {
    title: 'Cherry Tomato, Mozzarella & Crouton Salad Boats',
    href: 'https://www.annabelkarmel.com/recipes/cherry-tomato-mozzarella-crouton-salad-boats/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/cherry-tomato-mozzarella-crouton-salad-boats.jpg',
    excerpt:
      "If you're looking for a fresh and flavourful way to serve up snacks this summer, look no further than these cherry tomato, mozzarella, and crouton salad boats! This recipe transforms salad into a fun and easy-to-eat finger food. The sweet and juicy Piccolo cherry tomatoes are paired with creamy mozzarella cheese and crunchy croutons, all nestled into little lettuce boats. Drizzled with a simple pesto dressing and finished off with a sprinkle of fresh basil, this salad is bursting with flavour and texture and is the perfect sunshine snack! Post Views: 589",
  },
  {
    title: 'Tomato & Avocado Bruschetta',
    href: 'https://www.annabelkarmel.com/recipes/tomato-avocado-bruschetta/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/tomato-avocado-bruschetta.jpg',
    excerpt:
      "Looking for a simple and delicious snack that's bursting with flavour? Look no further than this Piccolo tomato and avocado bruschetta recipe. The classic combination of sweet ripe tomatoes and creamy avocado is elevated to the next level with a few simple ingredients. Plus, you can have these brilliant bruschetta on the table in minutes (which is my kind of snack!) Post Views: 1,172",
  },
  {
    title: 'Butternut Squash & Tomato Stars',
    href: 'https://www.annabelkarmel.com/recipes/butternut-squash-piccolo-tomato-stars/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/butternut-squash-tomato-stars.png',
    excerpt:
      'Roasting vegetables brings out their natural sweetness and enhances their flavour, while a sprinkle of herbs adds a tasty touch of seasoning. Plus, with their high vitamin and mineral content, butternut squash and tomatoes are both great choices for growing little ones. This recipe is perfect for picky eaters and for those parents looking for a fun and creative way to serve up vegetables. This snack is sure to leave them starry-eyed and satisfied! Post Views: 3,101',
  },
  {
    title: 'Roasted Piccolo Tomato Sauce',
    href: 'https://www.annabelkarmel.com/recipes/roasted-piccolo-tomato-sauce/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/roasted-piccolo-tomato-sauce.jpg',
    excerpt:
      "This simple tomato sauce is one you'll turn to time and time again! Sweet Piccolo cherry tomatoes are roasted to bring out their natural sweetness, then blended into a smooth and creamy sauce. With just a hint of garlic and basil, this is a quick and easy way to add flavour (and some extra nutrition!) to your baby's meals. Simply stir the sauce through baby pasta shells or rice for a tasty introduction to texture. Post Views: 12,930",
  },
  {
    title: 'Chicken & Piccolo Tomato Orzo',
    href: 'https://www.annabelkarmel.com/recipes/chicken-piccolo-tomato-orzo/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/chicken-piccolo-tomato-orzo.jpg',
    excerpt:
      "This is the perfect dish for those busy weeknights when you want something quick, easy and delicious to bring to the table. Tender chicken pairs perfectly with sweet and juicy Piccolo cherry tomatoes, and with a spoonful of punchy pesto, herbs and added crunch from the French beans, this recipe is bursting with flavour and packed with nutrients. It's sure to become a new family favourite! Post Views: 3,506",
  },
  {
    title: 'Veggie Packed Frittata Muffins 4-ways',
    href: 'https://www.annabelkarmel.com/recipes/veggie-packed-frittata-muffins/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/veggie-packed-frittata-muffins.jpg',
    excerpt:
      "These frittata muffins are so simple to make and very versatile, making them the ideal recipe for using up leftovers. With four different flavour combinations to choose from, there's a frittata muffin here for everyone! Post Views: 24,607",
  },
  {
    title: 'Chicken, Tomato & Coconut curry',
    href: 'https://www.annabelkarmel.com/recipes/chicken-tomato-coconut-curry/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/chicken-tomato-coconut-curry.jpg',
    excerpt:
      "This dish will no doubt spice up your baby's life as well as stave off fussy eating in the longrun! It's been shown time and time again that introducing new foods between 6 and 12 months will help to set your little one up with a healthy and adventurous appetite for life. Post Views: 26,084",
  },
  {
    title: 'Chicken, Tomato & Corn Fritters',
    href: 'https://www.annabelkarmel.com/recipes/chicken-tomato-corn-fritters/',
    image:
      '/articles/10-delicious-cherry-tomato-recipes/chicken-tomato-corn-fritters.jpg',
    excerpt:
      "You won't want to fritter away any more time not making these delicious chicken, sweetcorn and tomato buttermilk fritters. This is the perfect quick and easy meal to use up that leftover roast chicken from the weekend! Post Views: 10,326",
  },
];

export default function CherryTomatoRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            Looking for some fresh and tasty ideas for cooking with our
            favourite Summer ingredient Piccolo Cherry Tomatoes? Look no further
            than these 10 delicious cherry tomato recipes!
          </p>
          <p className={`${styles.intro}  md:text-left text-center`}>
            From savory main dishes like Chicken &amp; Piccolo Tomato Orzo to
            kid-friendly snacks like our tomato hummus or Frittata muffins,
            there&apos;s something for everyone in this collection. We&apos;ve
            even included a recipe for Roasted Tomato Sauce that&apos;s perfect
            for baby&apos;s first tastes. With the versatility and flavor of
            Piccolo tomatoes, these recipes are sure to become new family
            favorites. So grab some Piccolo tomatoes and get ready to cook up a
            storm with these 10 delicious recipes!
          </p>

          <div className="mt-[70px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section
                key={recipe.title}
                style={{ background: '#f3ebee' }}
                className=" mt-[40px]"
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
                  className="px-[16px] pb-[21px]! mt-[20px]!  pt-[10px] text-center"
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
