import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Popular Baby Recipes | Top Ten Baby Recipes | Annabel Karmel",
  description:
    "A countdown of Annabel Karmel's top 10 popular baby recipes, from lovely lentils and purees to fish cakes and chicken curry.",
};

const relatedArticles = getRelatedArticles("/top-10-baby-recipes");
const IMG = "/articles/top-10-baby-recipes";

type Recipe = {
  rank: number;
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  caption: string;
};

const recipes: Recipe[] = [
  {
    rank: 10,
    title: "Lovely Lentils",
    href: "https://www.annabelkarmel.com/recipes/lovely-lentils/",
    image: `${IMG}/lovely-lentils.jpg`,
    imageAlt: "Lovely lentils baby recipe",
    caption:
      "This lentil recipe is sweet, soft & smooth for babies. It's easy to make & is packed full of vital nutrients to help them grow up strong.",
  },
  {
    rank: 9,
    title: "Carrots, Broccoli & Cheese Puree",
    href: "https://www.annabelkarmel.com/recipes/carrots-broccoli-cheese-puree/",
    image: `${IMG}/carrots-broccoli-cheese-puree.jpg`,
    imageAlt: "Carrots broccoli and cheese puree",
    caption:
      "Broccoli oozes with vitamin C, folic acid & iron so it's an important veggie to add to purees. Try mashing it with potato & cheese for a classic combo.",
  },
  {
    rank: 8,
    title: "Sweetcorn Fritters",
    href: "https://www.annabelkarmel.com/recipes/sweetcorn-fritters/",
    image: `${IMG}/sweetcorn-fritters.jpg`,
    imageAlt: "Sweetcorn fritters for babies and toddlers",
    caption:
      "Sweetcorn Fritters are a firm favourite with many families and are loved by children and adults alike. They make a fantastic snack and lunchbox filler and as they are quick and simple to make and can be frozen for convenience.",
  },
  {
    rank: 7,
    title: "Salmon, Broccoli & Spinach Puree",
    href: "https://www.annabelkarmel.com/recipes/salmon-broccoli-spinach-puree/",
    image: `${IMG}/salmon-broccoli-spinach-puree.png`,
    imageAlt: "Salmon broccoli and spinach puree",
    caption:
      "A powerhouse of a puree with three superfoods - salmon, broccoli, spinach. It's important to include oily fish like salmon in your baby's diet from 6 months as the essential fatty acids are important for their brain and visual development.",
  },
  {
    rank: 6,
    title: "Annabel's Quick Tomato Sauce",
    href: "https://www.annabelkarmel.com/recipes/annabels-quick-tomato-sauce/",
    image: `${IMG}/annabels-quick-tomato-sauce.jpg`,
    imageAlt: "Annabels quick tomato sauce over spaghetti",
    caption:
      "Short on time? Make a batch of this delicious tomato sauce to pour over pasta, pizza bases or meatballs. Just pop what you don't need in the freezer until next time.",
  },
  {
    rank: 5,
    title: "My First Cottage Pie",
    href: "https://www.annabelkarmel.com/recipes/mini-cottage-pie-2/",
    image: `${IMG}/my-first-cottage-pie.jpg`,
    imageAlt: "My first cottage pie",
    caption:
      "A classic Cottage Pie, sure to be a winner. For babies, chop the meat in a food processor to make it softer & for kids over 1 year, you can season with a little salt & pepper.",
  },
  {
    rank: 4,
    title: "Broccoli, Chicken & Potato Bites",
    href: "https://www.annabelkarmel.com/recipes/broccoli-chicken-potato-bites/",
    image: `${IMG}/broccoli-chicken-potato-bites.png`,
    imageAlt: "Broccoli chicken and potato bites",
    caption:
      "These make good soft finger food for little ones. A yummy combination of flavours to please your gurgling gourmet.",
  },
  {
    rank: 3,
    title: "Easy One Pot Chicken",
    href: "https://www.annabelkarmel.com/recipes/easy-one-pot-chicken/",
    image: `${IMG}/easy-one-pot-chicken.jpg`,
    imageAlt: "Easy one pot chicken puree",
    caption:
      "Chicken blends well with root veggies like carrot & sweet potato, so try this puree for a tasty intro to meat.",
  },
  {
    rank: 2,
    title: "Baby's First Bolognese",
    href: "https://www.annabelkarmel.com/recipes/babys-first-bolognese-sauce-2/",
    image: `${IMG}/babys-first-bolognese.jpg`,
    imageAlt: "Babys first bolognese",
    caption: "Babies need iron from 6 months so recipes with red meat are great options.",
  },
  {
    rank: 1,
    title: "My First Chicken Curry",
    href: "https://www.annabelkarmel.com/recipes/my-first-chicken-curry/",
    image: `${IMG}/my-first-chicken-curry.png`,
    imageAlt: "My first chicken curry for babies",
    caption:
      "Out of all our most popular baby recipes, Annabel's recipe for My First Chicken Curry comes out top. This is the perfect introduction to curry and mild spice.",
  },
];

export default function TopTenBabyRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Mums have trusted Annabel Karmel recipes for years, but which of her recipes are the most popular? Below we
            count down through the top 10 most popular baby recipes on our website in 2019.
          </p>

          <div className="mt-[50px] space-y-[56px]">
            {recipes.map((recipe) => (
              <section key={recipe.title}>
                <h2 className={styles.recipeTitle}>
                  <a href={recipe.href} className={styles.recipeTitleLink} target="_blank" rel="noopener noreferrer">
                    {recipe.rank}. {recipe.title}
                  </a>
                </h2>

                <a
                  href={recipe.href}
                  className={`${styles.imageWrap} block md:mx-auto md:max-w-[820px]`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={recipe.image} alt={recipe.imageAlt} width={800} height={800} loading="lazy" />
                </a>

                <p className={styles.caption}>{recipe.caption}</p>
              </section>
            ))}
          </div>

          <p className={styles.question}>Which of our most popular baby recipes is your favourite?</p>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
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
