import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/pasta-recipes-for-baby");

const recipes = [
  {
    title: "4-Ingredient Cheesy Broccoli Pasta",
    href: "https://www.annabelkarmel.com/recipes/cheesy-broccoli-pasta/",
    image: "/articles/pasta-recipes-for-baby/cheesy-broccoli-pasta.jpg",
    excerpt:
      "Wondering what to do with those few leftover broccoli florets? Looking for a quick and delicious meal for your baby? You're in luck! Using one-pot, 4-ingredients, and made in less than 15 minutes, what's not to love? Post Views: 69,592",
  },
  {
    title: "Roasted Vegetables with Baby Pasta Shells",
    href: "https://www.annabelkarmel.com/recipes/roasted-vegetables-with-baby-pasta-shells/",
    image: "/articles/pasta-recipes-for-baby/roasted-vegetables-baby-pasta-shells.jpg",
    excerpt:
      "This tasty Roasted Vegetables with Baby Pasta Shells recipe is an ideal way to introduce texture to your baby's food. Post Views: 6,255",
  },
  {
    title: "Pasta Shells with Tomato & Mascarpone Sauce",
    href: "https://www.annabelkarmel.com/recipes/pasta-shells-with-tomato-mascarpone-sauce/",
    image: "/articles/pasta-recipes-for-baby/pasta-shells-tomato-mascarpone.jpg",
    excerpt:
      "This Pasta Shells with Tomato & Mascarpone Sauce recipe is a simple and delicious pasta dish that's perfect for babies and toddlers. Post Views: 6,415",
  },
  {
    title: "Popeye Pasta",
    href: "https://www.annabelkarmel.com/recipes/popeye-pasta/",
    image: "/articles/pasta-recipes-for-baby/popeye-pasta.jpg",
    excerpt:
      "This pasta dish contains spinach which is a great source of various vitamins. Mixing tiny pasta shapes into your baby's food is also a good way to add texture to encourage your baby to eat more lumpy food. Try my organic pasta with this dish! This recipe is from my Complete Baby & Toddler Meal Planner book. Post Views: 10,926",
  },
  {
    title: "Pasta Shells with Salmon & Broccoli",
    href: "https://www.annabelkarmel.com/recipes/pasta-shells-with-salmon-broccoli/",
    image: "/articles/pasta-recipes-for-baby/pasta-shells-salmon-broccoli.png",
    excerpt:
      "A baby's brain grows rapidly between birth and three years, and most of this growth takes place in the first year, so it's important to introduce fish such as salmon early on. So, this Pasta Shells with Salmon & Broccoli, is the perfect recipe to get them started! Post Views: 6,360",
  },
  {
    title: "Baby's First Bolognese Sauce",
    href: "https://www.annabelkarmel.com/recipes/babys-first-bolognese-sauce-2/",
    image: "/articles/pasta-recipes-for-baby/babys-first-bolognese-sauce.jpg",
    excerpt:
      "Red meat is rich in iron, which is important for supporting your baby's growth and immune system. This recipe for Baby's First Bolognese Sauce is a great option to help up your little one's iron intake during weaning. Post Views: 92,753",
  },
  {
    title: "Pasta with Tomato, Sweet Potato & Cheese",
    href: "https://www.annabelkarmel.com/recipes/pasta-with-tomato-sweet-potato-cheese/",
    image: "/articles/pasta-recipes-for-baby/pasta-tomato-sweet-potato-cheese.jpg",
    excerpt:
      "This Pasta with Tomato, Sweet Potato & Cheese recipe has a delicious sauce enriched with veggies. It can be mixed with pasta, fish or chicken for extra protein. Post Views: 6,161",
  },
  {
    title: "Pasta Stars with Veggie Sauce",
    href: "https://www.annabelkarmel.com/recipes/pasta-stars-with-veggie-sauce/",
    image: "/articles/pasta-recipes-for-baby/pasta-stars-veggie-sauce.jpg",
    excerpt:
      "Pasta Stars with Veggie Sauce takes only 10 minutes to prepare! A super easy tasty veggie sauce to pour over pasta. Post Views: 9,990",
  },
  {
    title: "Three Cheese Sauce",
    href: "https://www.annabelkarmel.com/recipes/three-cheese-sauce/",
    image: "/articles/pasta-recipes-for-baby/three-cheese-sauce.jpg",
    excerpt:
      "Cheese is one of the richest sources of calcium which helps children's bones grow up strong. This Three Cheese Sauce is so tasty and great way to get Calcium in! Post Views: 10,063",
  },
  {
    title: "Tomato & Butternut Squash Pasta",
    href: "https://www.annabelkarmel.com/recipes/tomato-butternut-squash-pasta/",
    image: "/articles/pasta-recipes-for-baby/tomato-butternut-squash-pasta.jpg",
    excerpt:
      "Fill up tiny tums with this delicious and creamy Tomato & Butternut Squash Pasta recipe. This is an exclusive recipe from the 30th Anniversary Edition of my Global Bestselling Cookbook: The Complete Baby & Toddler Meal Planner. Post Views: 10,181",
  },
];

export default function PastaRecipesForBabyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            Pasta is a family staple for good reason - not only is it delicious and pastably one of the easiest and
            quickest things to make, but it's also packed with fibre, protein and a host of other nutritional benefits.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            But it's not just for adults, pasta is a fantastic weaning food and a brilliant way to introduce texture to
            your little one.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            It's such a versatile food, you can add to soups, serve hot or cold, dress up or down however you please -
            the pastabilities are endless!
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            These are my top 10 baby pasta recipes that definitely pasta the taste test!
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
