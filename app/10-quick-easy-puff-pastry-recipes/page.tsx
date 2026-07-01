import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/10-quick-easy-puff-pastry-recipes");

const recipes = [
  {
    title: "Pigs in Blankets",
    href: "https://www.annabelkarmel.com/recipes/pigs-in-blankets/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/pigs-in-blankets.jpg",
    excerpt:
      "This pigs in blankets recipe is a great one to keep up your sleeve to use up any leftover puff pastry. With a flavour-packed sausage filling wrapped in bacon and topped off with crispy puff pastry layer, they make for the most delicious bite-sized mouthful. Post Views: 1,799",
  },
  {
    title: "Apple & Cinnamon Twists",
    href: "https://www.annabelkarmel.com/recipes/apple-cinnamon-twists/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/apple-cinnamon-twists.jpg",
    excerpt:
      "There's a lot to twist 'n' shout about these delicious apple & cinnamon puff pastry twists. Soft on the inside with a crispy coating, they're super easy and a great addition to your little one's lunchbox. Post Views: 8,479",
  },
  {
    title: "Tomato & Mozzarella Pinwheels",
    href: "https://www.annabelkarmel.com/recipes/tomato-mozzarella-pinwheels/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/tomato-mozzarella-pinwheels.jpg",
    excerpt:
      "These pinwheels are a great party food, snack or quick and easy kids dinner. They are light, crispy, packed full of flavour. Post Views: 21,486",
  },
  {
    title: "Puff Pastry Cheese Stars",
    href: "https://www.annabelkarmel.com/recipes/puff-pastry-cheese-stars/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/puff-pastry-cheese-stars.jpg",
    excerpt:
      "These puff pastry cheese and chia seed stars are a great snack for kids. Using Jus-Rol's Ready Rolled Puff Pastry Sheet and just three other ingredients, these starry snacks are quick, easy and ready to eat in just 15 minutes Post Views: 8,517",
  },
  {
    title: "Chicken Sausage Rolls",
    href: "https://www.annabelkarmel.com/recipes/chicken-sausage-rolls/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/chicken-sausage-rolls.jpg",
    excerpt:
      "Who doesn't love a sausage roll!? Whether it's for a picnic, party or playdate, my take on the classic might just be your new sausage roll go-to! You can swap chicken for beef mince or your family's favourite plant-based alternative. Simply blitz all the filling ingredients in a food processor! Post Views: 8,714",
  },
  {
    title: "Chicken, Leek & Mushroom Pie",
    href: "https://www.annabelkarmel.com/recipes/chicken-leek-mushroom-pie/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/chicken-leek-mushroom-pie.jpg",
    excerpt:
      "This is the perfect recipe to use up that leftover chicken from your weekend roast! A pie is also a great way to make meat go that little bit further when feeding the whole family. This recipe is so simple to make and it's quick enough to be cooked-up mid-week. Post Views: 9,464",
  },
  {
    title: "Mini Pizza People",
    href: "https://www.annabelkarmel.com/recipes/mini-pizza-people/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/mini-pizza-people.jpg",
    excerpt:
      "Puff Pastry makes delicious pizza bases. Just let kids choose their favourite toppings and pop them under the grill for a few minutes. This is an exclusive recipe from my book, Where Does My Food Come From? Post Views: 3,034",
  },
  {
    title: "Puff Pastry Apple & Almond Tarts",
    href: "https://www.annabelkarmel.com/recipes/puff-pastry-apple-and-almond-tart/",
    image: "/articles/10-quick-easy-puff-pastry-recipes/puff-pastry-apple-almond-tarts.jpg",
    excerpt: "Post Views: 6,797",
  },
];

export default function QuickEasyPuffPastryRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} text-center`}>
            Beloved by the nation for almost 70 years, Jus-Rol helps hungry families create delicious dishes with their
            ready-made pastry range.
          </p>
          <p className={`${styles.intro}  text-center`}>
            We&apos;re thrilled to join forces with Jus-Rol to inspire families to reduce food waste with leftovers
            recipes. Whether you&apos;ve got some leftover chicken from the Sunday roast or some extra puff pastry from
            yesterday&apos;s pie, give these recipes a go to make your food go further!
          </p>

          <div className="mt-[60px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className=" mt-[40px]">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className="w-full" />
                </a>
                <div style={{ padding: "16px 21px" }} className="px-[16px] pb-[21px]! mt-[20px]!  pt-[10px] text-center">
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
