import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/6-incredibly-simple-recipes-with-green-giant-sweetcorn");

const recipes = [
  {
    title: "A ‘Slice of Fun’ Sweetcorn Rosti Pizza",
    href: "https://www.annabelkarmel.com/recipes/a-slice-of-fun-sweetcorn-rosti-pizza/",
    image: "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/slice-of-fun-sweetcorn-rosti-pizza.webp",
    excerpt:
      "A pizza with a twist! Kids love pizza so why not try this unique take on the classic kids favourite. Combining the crispy goodness of a rosti crust with the sweetness and crunch of Sweetcorn, all topped with oozy meted cheese, it's any pizza lovers' dream come true! Post Views: 3,858",
  },
  {
    title: "‘Knock Your Socks Off’ Sweetcorn & Veggie Gnocchi",
    href: "https://www.annabelkarmel.com/recipes/knock-your-socks-off-sweetcorn-veggie-gnocchi/",
    image:
      "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/knock-your-socks-off-sweetcorn-veggie-gnocchi.webp",
    excerpt:
      "Gnocchi is a go-to when it comes to speedy mid-week meal. In just 15 minutes the whole family can enjoy this 'knock your socks off' gnocchi! Post Views: 3,191",
  },
  {
    title: "Super-duper Rice Salad with Ham & Sweetcorn",
    href: "https://www.annabelkarmel.com/recipes/super-duper-rice-salad-with-ham-sweetcorn/",
    image:
      "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/super-duper-rice-salad-with-ham-sweetcorn.jpg",
    excerpt:
      "Child-friendly salad incoming! With the most delicious dressing, vibrant veggies, succulent ham, and the irresistible sweetness of Sweetcorn, this super-duper salad offers a variety of flavours and textures. It's perfect for picnics and packed lunches and a great way to sneak in some nutritious ingredients whist keeping taste buds happy. Post Views: 1,981",
  },
  {
    title: "Starry-eyed Sweetcorn & Squash Stars",
    href: "https://www.annabelkarmel.com/recipes/starry-eyed-sweetcorn-squash-stars/",
    image:
      "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/starry-eyed-sweetcorn-squash-stars.jpg",
    excerpt:
      "These adorable star-shaped treats are packed with all the goodness of sweetcorn and butternut squash, offering a tasty and healthy option for lunch, dinner or snack attacks! Post Views: 15,578",
  },
  {
    title: "Crispy Chicken & Sweetcorn Croquettes",
    href: "https://www.annabelkarmel.com/recipes/crispy-chicken-sweetcorn-croquettes/",
    image:
      "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/crispy-chicken-sweetcorn-croquettes.jpg",
    excerpt:
      "These mini crispy chicken croquettes are a fab finger food for babies and toddlers. Using leftover mashed potato and chicken means these 'cheat's' croquettes are ready in just 15 minutes! Post Views: 25,445",
  },
  {
    title: "One Pot Chicken & Creamed Sweetcorn Casserole",
    href: "https://www.annabelkarmel.com/recipes/one-pot-chicken-creamed-sweetcorn-casserole/",
    image:
      "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/one-pot-chicken-creamed-sweetcorn-casserole.jpg",
    excerpt:
      "Get ready to indulge in the ultimate comforting and flavour-packed dish with Annabel's one-pot chicken and creamed sweetcorn casserole. What's more, it's all cooked in one pot, which means maximum 'mmm' and minimal clean-up! Post Views: 6,586",
  },
];

export default function GreenGiantSweetcornPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} text-center`}>
            Annabel proudly presents a brand-new collection of recipes featuring the wholesome goodness of Green Giant
            sweetcorn.
          </p>
          <p className={`${styles.intro} text-center`}>
            From those first exploratory bites to delightful family feasts, our specially crafted recipes cater to
            every stage of your child&apos;s growth and palate development.
          </p>
          <p className={`${styles.intro} text-center`}>
            Bursting with vibrant flavours, essential nutrients, and the unmistakable freshness of Green Giant
            sweetcorn, these dishes are designed to ignite a lifelong love for delicious, nourishing food.
          </p>
          <p className={`${styles.intro} text-center`}>
            Whether you&apos;re a parent looking to introduce your little one to the world of solids or a family seeking
            delightful mealtime experiences, join us in discovering the magic that Green Giant sweetcorn brings to the
            table.
          </p>

          <div className="mt-[40px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className="mt-[40px]">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className="w-full" />
                </a>
                <div style={{ padding: "16px 21px" }} className="px-[16px] pb-[21px]! mt-[20px]! pt-[10px] text-center">
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
