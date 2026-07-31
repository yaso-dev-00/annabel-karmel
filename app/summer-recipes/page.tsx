import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/summer-recipes');

const recipes = [
  {
    title: 'Toasted Cinnamon Breadcrumb Ice Cream',
    href: 'https://www.annabelkarmel.com/recipes/toasted-cinnamon-breadcrumb-ice-cream/',
    image: '/articles/summer-recipes/toasted-cinnamon-breadcrumb-ice-cream.png',
    excerpt:
      "Looking for a unique and delicious way to enjoy ice cream? Try mixing your favourite ice cream flavour with Annabel's crunchy cinnamon toasted breadcrumbs. This recipe takes any classic ice cream flavour to the next level by incorporating the rich, nutty taste of brown bread and the satisfying crunch of toasted breadcrumbs. Post Views: 356",
  },
  {
    title: 'Vegan Bunny Burger',
    href: 'https://www.annabelkarmel.com/recipes/vegan-bunny-burger/',
    image: '/articles/annabels-top-10-burger-recipes/vegan-bunny-burger.jpg',
    excerpt:
      "Looking for a delicious (and adorable) vegan burger recipe? Look no further than Annabel's Bunny Burger! This fun and flavourful burger recipe is not only easy to make, but it's also a great way to enjoy a plant-based meal that's packed with protein and nutrients. Post Views: 1,208",
  },
  {
    title: 'Chicken, Halloumi & Red Pepper Hot Dogs',
    href: 'https://www.annabelkarmel.com/recipes/chicken-halloumi-red-pepper-hot-dogs/',
    image: '/articles/summer-recipes/chicken-halloumi-red-pepper-hot-dogs.png',
    excerpt:
      'This recipe is the perfect combination of savoury grilled chicken, halloumi cheese, and sweet bell peppers, all skewered and cooked to perfection. So, fire up the grill and get ready to cook-up these mouth-watering skewers that are sure to be a hit with the whole family! Post Views: 1,088',
  },
  {
    title: 'Pulled Chicken Burger',
    href: 'https://www.annabelkarmel.com/recipes/pulled-chicken-burger/',
    image: '/articles/annabels-top-10-burger-recipes/pulled-chicken-burger.jpg',
    excerpt:
      "Are you looking for a delicious and flavourful way to up your burger game? Annabel's pulled chicken burger, paired with Baker Street's soft and delicious burger buns will not disappoint! So, if you're ready to sink your teeth into a burger that's packed with bold flavours and juicy goodness, this is the recipe for you. Post Views: 1,640",
  },
  {
    title: 'Strata with Cheese, Bacon, Eggs & Tomatoes',
    href: 'https://www.annabelkarmel.com/recipes/strata-with-cheese-bacon-eggs-tomatoes/',
    image:
      '/articles/summer-recipes/strata-with-cheese-bacon-eggs-tomatoes.png',
    excerpt:
      "This savoury casserole baked with eggs, cheese, bacon and tomatoes is the most delicious way to use up any leftover bread. So, if you've got a few slices of leftover loaf hanging around please don't chuck it. Post Views: 1,717",
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
    title: 'Chicken & Apple Hot Dogs',
    href: 'https://www.annabelkarmel.com/recipes/chicken-apple-hot-dogs/',
    image: '/articles/summer-recipes/chicken-apple-hot-dogs.jpg',
    excerpt:
      'Spruce up your hot dog with this reimagination of a well-loved classic, and sink your teeth into these deliciously Chicken & Apple Hot dogs. Post Views: 497',
  },
];

export default function SummerRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} text-center`}>
            Summer is finally here, and we couldn&apos;t be more excited! To
            kick off the season, we&apos;ve teamed up with our friends at Baker
            Street to bring you a collection of mind-blowing recipes that scream
            summer vibes.
          </p>
          <p className={`${styles.intro}  text-center`}>
            Whether you&apos;re planning family BBQ&apos;s or dreaming of
            mouth-watering desserts, these simple &amp; delicious creations will
            take your taste buds on the ultimate summer adventure.
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
