import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/annabels-top-10-burger-recipes');

const recipes = [
  {
    title: 'Vegan Bunny Burger',
    href: 'https://www.annabelkarmel.com/recipes/vegan-bunny-burger/',
    image: '/articles/annabels-top-10-burger-recipes/vegan-bunny-burger.jpg',
    excerpt:
      "Looking for a delicious (and adorable) vegan burger recipe? Look no further than Annabel's Bunny Burger! This fun and flavourful burger recipe is not only easy to make, but it's also a great way to enjoy a plant-based meal that's packed with protein and nutrients. Post Views: 1,208",
  },
  {
    title: 'Pulled Chicken Burger',
    href: 'https://www.annabelkarmel.com/recipes/pulled-chicken-burger/',
    image: '/articles/annabels-top-10-burger-recipes/pulled-chicken-burger.jpg',
    excerpt:
      "Are you looking for a delicious and flavourful way to up your burger game? Annabel's pulled chicken burger, paired with Baker Street's soft and delicious burger buns will not disappoint! So, if you're ready to sink your teeth into a burger that's packed with bold flavours and juicy goodness, this is the recipe for you. Post Views: 1,640",
  },
  {
    title: 'Hidden Vegetable Burgers with Sweet Potato Fries',
    href: 'https://www.annabelkarmel.com/recipes/hidden-veg-beef-burger-sweet-potato-fries/',
    image:
      '/articles/annabels-top-10-burger-recipes/hidden-veg-burgers-sweet-potato-fries.jpg',
    excerpt:
      "These delicious Hidden Vegetable Beef Burgers with Sweet Potato Fries are super easy to make. Simply blitz all the ingredients together in a blender and you're good to go. Freeze any leftover cooked burgers so you know you have a home-cooked meal ready and waiting on those busy days. Post Views: 619",
  },
  {
    title: 'Mini Chicken Burgers with Red Onion, Carrot and Sage',
    href: 'https://www.annabelkarmel.com/recipes/mini-chicken-burgers-with-red-onion-carrot-and-sage/',
    image: '/articles/annabels-top-10-burger-recipes/mini-chicken-burgers.png',
    excerpt:
      "Did you know that chicken thighs contains twice as much iron as the breast? You can make your own healthy versions of fast food and sneak in some veggies. Babies will love these yummy, power-packed mini burgers, and they are easy-peasy to prepare. You simply whizz everything together in a food processor. This is an exclusive recipe from Annabel's 30th Anniversary Edition of her Global Bestselling Cookbook: New Complete Baby & Toddler Meal Planner. Post Views: 6,749",
  },
  {
    title: 'My Favourite Vegan Burger',
    href: 'https://www.annabelkarmel.com/recipes/my-favourite-vegan-burger/',
    image:
      '/articles/annabels-top-10-burger-recipes/my-favourite-vegan-burger.jpg',
    excerpt:
      'This is a recipe for my My Favourite Vegan Burger – sneaking vegetables into a burger is a good option for children who are super fussy and profess to hate veggies. Watch them munch these vegan burgers up in blissful ignorance. Instead of using egg as binder in the burger mixture, I use chia seeds soaked in water. Post Views: 771',
  },
  {
    title: 'Salmon & Cod Burgers',
    href: 'https://www.annabelkarmel.com/recipes/salmon-cod-burgers/',
    image: '/articles/annabels-top-10-burger-recipes/salmon-cod-burgers.jpg',
    excerpt:
      'We know that the healthy omega-3 fats contained in oily fish are important for your brain, nervous system and vision and they continue to be hugely important post-pregnancy. These deliciously melt-in-the-mouth Salmon & Cod Burgers provide an important dose of the good stuff! Post Views: 1,478',
  },
  {
    title: "Annabel's Beef Burgers",
    href: 'https://www.annabelkarmel.com/recipes/annabels-beef-burgers/',
    image: '/articles/annabels-top-10-burger-recipes/annabels-beef-burgers.jpg',
    excerpt:
      'If you want to freeze the burgers, its best to freeze them uncooked on a tray lined with clingfilm. Then, when frozen, wrap each one individually in clingfilm. Then, when frozen so that you can remove and defrost them as and when you need them. Post Views: 490',
  },
];

export default function AnnabelsTop10BurgerRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} text-center md:text-left`}>
            Introducing Annabel&apos;s Top 10 Burger Recipes! Get ready to
            elevate your burger game with these mouthwatering creations. From
            classic favourites to bold and innovative combinations, Annabel has
            curated a collection of burger recipes that will tantalize your
            taste buds. Whether you&apos;re a meat lover or prefer plant-based
            alternatives, there&apos;s something for everyone in this burger
            extravaganza. Unleash your culinary creativity and satisfy your
            cravings with Annabel&apos;s Top 10 Burger Recipes today!
          </p>

          <div className="mt-[100px]! space-y-[60px]">
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
                  className="mt-[20px]! px-[16px] pb-[21px]! pt-[10px] text-center"
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
