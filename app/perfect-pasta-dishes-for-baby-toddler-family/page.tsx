import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/perfect-pasta-dishes-for-baby-toddler-family");

const recipes = [
  {
    title: "Rigatoni Pasta Bake with Tomatoes & Mozzarella",
    href: "https://www.annabelkarmel.com/recipes/rigatoni-pasta-bake/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/rigatoni-pasta-bake.jpg",
    excerpt:
      "This baked rigatoni recipe is pasta tossed in a flavorful tomato sauce, then topped with plenty of cheese and baked until golden brown. A super easy dinner option that’s great for feeding a crowd! Post Views: 4,325",
  },
  {
    title: "Vroom Vroom Veggie-packed Bolognese",
    href: "https://www.annabelkarmel.com/recipes/vroom-vroom-veggie-packed-bolognese/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/vroom-vroom-veggie-packed-bolognese.jpg",
    excerpt:
      "After a busy day, this is the perfect way to recharge your batteries. Plus, it’s packed with lots of good-for-you veggies. Get. Set. Go! *EXCLUSIVE RECIPE* from Annabel’s New Cookbook: Fun, Fast & Easy Children’s Cookbook. OUT NOW. Post Views: 6,717",
  },
  {
    title: "Tuna Fusilli in a Tasty Tomato Sauce",
    href: "https://www.annabelkarmel.com/recipes/tuna-fusilli-in-a-tasty-tomato-sauce/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/tuna-fusilli-tomato-sauce.jpg",
    excerpt:
      "Most kids love pasta and this easy to make Tuna Fish Fusilli dish will not disappoint. Made with fresh ingredients it is a tasty and healthy option including the excellent source of Omega 3 fatty acids contained in the Tuna. Post Views: 1,429",
  },
  {
    title: "Pasta Shells with Tomato & Mascarpone Sauce",
    href: "https://www.annabelkarmel.com/recipes/pasta-shells-with-tomato-mascarpone-sauce/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/pasta-shells-tomato-mascarpone.jpg",
    excerpt:
      "This Pasta Shells with Tomato & Mascarpone Sauce recipe is a simple and delicious pasta dish that’s perfect for babies and toddlers. Post Views: 6,415",
  },
  {
    title: "Annabel’s Super-Fuel Veggie Fusilli",
    href: "https://www.annabelkarmel.com/recipes/annabels-super-fuel-veggie-fusilli/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/annabels-super-fuel-veggie-fusilli.jpg",
    excerpt:
      "Need good food fast? Annabel’s Super-Fuel Veggie Fusilli is easy to prepare and passes the taste test with flying colours. There’s no easier way towards your family’s 5-a-day, and with Annabel’s deliciously light cheese sauce, it’s a staple you’ll want to whip-up time and time again. Post Views: 1,307",
  },
  {
    title: "Annabel’s Mighty Mac ‘N’ Cheese",
    href: "https://www.annabelkarmel.com/recipes/annabels-mighty-mac-n-cheese/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/annabels-mighty-mac-n-cheese.jpg",
    excerpt:
      "Annabel’s Mighty Mac ‘N’ Cheese recipe definitely deserves its title. Supercharged with broccoli and sweetcorn, this creamy creation with a crunchy topping is the best fuel for your family – young and old! Post Views: 5,115",
  },
  {
    title: "Popeye Pasta",
    href: "https://www.annabelkarmel.com/recipes/popeye-pasta/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/popeye-pasta.jpg",
    excerpt:
      "This pasta dish contains spinach which is a great source of various vitamins. Mixing tiny pasta shapes into your baby’s food is also a good way to add texture to encourage your baby to eat more lumpy food. Try my organic pasta with this dish! This recipe is from my Complete Baby & Toddler Meal Planner book. Post Views: 10,927",
  },
  {
    title: "Baby’s First Bolognese Sauce",
    href: "https://www.annabelkarmel.com/recipes/babys-first-bolognese-sauce-2/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/babys-first-bolognese-sauce.jpg",
    excerpt:
      "Red meat is rich in iron, which is important for supporting your baby’s growth and immune system. This recipe for Baby’s First Bolognese Sauce is a great option to help up your little one’s iron intake during weaning. Post Views: 92,763",
  },
  {
    title: "Meatball Pasta Bake",
    href: "https://www.annabelkarmel.com/recipes/meatball-pasta-bake/",
    image: "/articles/perfect-pasta-dishes-for-baby-toddler-family/meatball-pasta-bake.jpg",
    excerpt:
      "Family favourite alert! For this Meatball Pasta Bake recipe, cook some mighty meatballs & nestle them inside spirals of tomato pasta for a hearty supper. Post Views: 1,706",
  },
];

export default function PerfectPastaDishesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            Pasta is a family staple for good reason - not only is it delicious and pastably one of the easiest and quickest things to make, but it’s also packed with fibre, protein and a host of other nutritional benefits.
            <br />
            <br />
            Tuck into these delicious and oh-so-saucy pasta dishes that count towards your 5-a-day – see, the pastabilities are endless!
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            Try these scrummy recipes to tide you and your little one over at lunchtime, dinnertime or even as an energy-boosting midday snack. Trust us, they definitely pasta the taste test!
          </p>

          <div className="mt-[70px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className=" mt-[40px]">
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

