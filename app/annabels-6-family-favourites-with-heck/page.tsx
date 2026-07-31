import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/annabels-6-family-favourites-with-heck',
);

const recipes = [
  {
    title: 'Hidden Veg Chicken Bolognese',
    href: 'https://www.annabelkarmel.com/recipes/hidden-veg-chicken-bolognese/',
    image:
      '/articles/annabels-6-family-favourites-with-heck/hidden-veg-chicken-bolognese.jpg',
    excerpt:
      "This Bolognese recipe is a sure-fire bet to get kids eating their 5-a-day (even the most ardent of veggie-dodgers). It's a fabulous way to ensure that everyone around the dinner table is getting their share of goodness, all while enjoying a delicious, home-cooked meal. Post Views: 9,532",
  },
  {
    title: 'Crispy Cornflake Chicken Burger',
    href: 'https://www.annabelkarmel.com/recipes/crispy-cornflake-chicken-burger/',
    image:
      '/articles/annabels-6-family-favourites-with-heck/crispy-cornflake-chicken-burger.jpg',
    excerpt:
      "Prepare yourself for all kinds of 'mmmm...' with Annabel's crispy chicken burger. Coated in crunchy cornflakes, smothered in a simple homemade tomato sauce, and topped with melted mozzarella cheese this just has to be on your menu plan this week! The greatest part? You can skip the burger making process entirely - just pick up HECK's Chicken Italia Burgers, and you're well on your way to enjoying the most mouthwatering burger experience! Post Views: 1,420",
  },
  {
    title: 'Sticky Sausage & Veg Traybake',
    href: 'https://www.annabelkarmel.com/recipes/sticky-sausage-veg-traybake/',
    image:
      '/articles/annabels-6-family-favourites-with-heck/sticky-sausage-veg-traybake.jpg',
    excerpt:
      "With a mouth-watering hoisin and sweet chilli glaze, this Sausage & Veg Traybake will be your new go-to for a quick and tasty family meal. Plus, did I mention it's all cooked in one tray? Less fuss, more flavour! Post Views: 2,765",
  },
  {
    title: 'Cheesy Sausage & Veg Pasta',
    href: 'https://www.annabelkarmel.com/recipes/15-minute-cheesy-sausage-veg-pasta/',
    image:
      '/articles/annabels-6-family-favourites-with-heck/cheesy-sausage-veg-pasta.jpg',
    excerpt:
      "Easy, cheesy, sausage pasta! In the whirlwind of mid-week mayhem, dinner doesn't have to be a chore - this recipe is your ticket to a delicious and hassle-free weeknight meal. Post Views: 6,150",
  },
  {
    title: 'Sausage & Potato Frittata Muffins',
    href: 'https://www.annabelkarmel.com/recipes/sausage-potato-frittata-muffins/',
    image:
      '/articles/annabels-6-family-favourites-with-heck/sausage-potato-frittata-muffins.jpg',
    excerpt:
      'A sausage frittata muffin you say? Yes please! These batch-cook frittata muffins are a lifesaver for a rushed breakfast on-the-go or lunchbox filler dilemma - we think they are the most scrumptious solution and come in handy finger food form too! Post Views: 5,236',
  },
  {
    title: 'Mini Toad in the Hole with Onion & Thyme Gravy',
    href: 'https://www.annabelkarmel.com/recipes/mini-toad-in-the-hole-with-onion-thyme-gravy/',
    image:
      '/articles/annabels-6-family-favourites-with-heck/mini-toad-in-the-hole.jpg',
    excerpt:
      "This mini toad-in-the-hole recipe has the perfect pairing of golden-brown Yorkshire puddings and succulent sausages, all drizzled in a mouth-watering onion and thyme gravy... what's not to love! These are excellent served up as a snack, party finger food or as a delicious dinner paired with the usual sides. Post Views: 5,396",
  },
];

export default function HeckFamilyFavouritesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} text-center`}>
            Annabel has joined forces with HECK! a wonderful family-run company
            crafting sausages & burgers in small batches right from their farm
            in Yorkshire.
          </p>
          <p className={`${styles.intro}  text-center`}>
            Here you'll find Annabel's x HECK! family-friendly recipes that are
            not only incredibly scrumptious but also designed to make your life
            in the kitchen a breeze.
          </p>
          <p className={`${styles.intro}  text-center`}>
            Each recipe is a testament to the exceptional range of products
            offered by HECK!, guaranteeing a mouthwatering experience for your
            entire family. Get ready to elevate your cooking game with the
            perfect combination of Annabel's easy-to-follow recipes and HECK's
            outstanding products!
          </p>

          <div className="mt-[40px]! space-y-[60px]">
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
