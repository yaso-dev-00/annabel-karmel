import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/10-easy-bbq-recipes-to-try-this-summer");

const recipes = [
  {
    title: "Hidden Vegetable Burgers with Sweet Potato Fries",
    href: "https://www.annabelkarmel.com/recipes/hidden-veg-beef-burger-sweet-potato-fries/",
    image: "/articles/10-easy-bbq-recipes-to-try-this-summer/hidden-veg-beef-burger-sweet-potato-fries.jpg",
    excerpt:
      "These delicious Hidden Vegetable Beef Burgers with Sweet Potato Fries are super easy to make. Simply blitz all the ingredients together in a blender and you're good to go. Freeze any leftover cooked burgers so you know you have a home-cooked meal ready and waiting on those busy days. Post Views: 621",
  },
  {
    title: "Chicken & Apple Hot Dogs",
    href: "https://www.annabelkarmel.com/recipes/chicken-apple-hot-dogs/",
    image: "/articles/10-easy-bbq-recipes-to-try-this-summer/chicken-apple-hot-dogs.jpg",
    excerpt:
      "Spruce up your hot dog with this reimagination of a well-loved classic, and sink your teeth into these deliciously Chicken & Apple Hot dogs. Post Views: 497",
  },
  {
    title: "Chicken on the Griddle",
    href: "https://www.annabelkarmel.com/recipes/chicken-on-the-griddle/",
    image: "/articles/10-easy-bbq-recipes-to-try-this-summer/chicken-on-the-griddle.jpg",
    excerpt:
      "This Chicken on the Griddle recipe is great as chicken provides lots of B vitamins and iron and is an excellent source of lean protein. Cooking on the griddle is a popular method as it requires very little fat to cook. Post Views: 5,359",
  },
];

export default function TenEasyBbqRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            There's nothing quite like firing up the barbecue for family and friends on a sunny day. We've
            rounded up our favourite summer BBQ recipes, from Hidden Veg Burgers to Homemade Hot Dogs,
            finger-licking good BBQ Ribs & Apricot Dijon Chicken Drumsticks. Look no further, your Summer
            menu is sorted.
          </p>

          <div className="mt-[70px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className="mt-[40px]">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className="w-full" />
                </a>
                <div
                  style={{ padding: "16px 21px" }}
                  className="px-[16px] pb-[21px]! mt-[20px]!  pt-[10px] text-center"
                >
                  <h2 className={styles.cardTitle}>{recipe.title}</h2>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>{recipe.excerpt}</p>
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
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
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

