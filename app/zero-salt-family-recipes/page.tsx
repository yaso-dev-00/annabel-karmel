import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/zero-salt-family-recipes");

const recipes = [
  {
    title: "Penne Pasta with Orange Tomatoes & Squash",
    href: "https://www.annabelkarmel.com/recipes/penne-pasta-orange-tomatoes-squash/",
    image: "/articles/zero-salt-family-recipes/penne-pasta-orange-tomatoes-squash.jpg",
    excerpt:
      "#CheatOnMeat this Monday with this creamy Penne Pasta with Orange Tomatoes & Squash. Post Views: 1,468",
  },
  {
    title: "Leek & Mushroom Puff Pastry Pie",
    href: "https://www.annabelkarmel.com/recipes/leek-mushroom-puff-pastry-pie/",
    image: "/articles/zero-salt-family-recipes/leek-mushroom-puff-pastry-pie.jpg",
    excerpt:
      "Cheating on meat cannot get easier, or tastier, than this Leek & Mushroom Puff Pastry Pie. Plus, the whole family can tuck into this creamy cosy classic using Knorr's Zero Salt Veggie Stock Cubes, which deliver on flavour without adding any salt. Knorr's Zero Salt stock cube range are now available to purchase at Boots online. Post Views: 2,285",
  },
  {
    title: "Vegetable Risotto & Arancini Balls",
    href: "https://www.annabelkarmel.com/recipes/vegetable-risotto-arancini-balls/",
    image: "/articles/zero-salt-family-recipes/vegetable-risotto-arancini-balls.jpg",
    excerpt:
      "Arancini, hailing from Sicily, are deliciously cheesy balls of risotto rice gently fried to create a crispy outside. These Vegetable Risotto & Arancini Balls are bursting with flavour without the added salt, so the whole family can tuck in! Post Views: 836",
  },
];

export default function ZeroSaltFamilyRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} text-center`}>
            I've teamed up with Knorr to launch #KnorrFamilyFlavours using their history-making #KnorrZeroSalt range
            of stock cubes. These pioneering stock cubes have all the flavour but no added salt.
          </p>
          <p className={`${styles.intro} text-center`}>
            Whether you're a dab hand or just aspiring to do more scratch cooking, you'll know that Knorr's stock cubes
            are a kitchen staple. But as delicious, nutritious, and necessary that stock cubes are, added salt can be
            problematic for your family.
          </p>
          <p className={`${styles.intro} text-center`}>
            Knorr has worked hard to develop the perfect blend of herbs and spices without you having to worry about
            your family's sodium intake and I'm delighted to incorporate them into these delicious recipes!
          </p>
          <p className={`${styles.intro} text-center`}>
            Knorr Zero Salt Stock Cubes are now available to buy in{" "}
            <strong className="hover:text-[#e98c9a]!">
              <a href="https://bit.ly/3JIgSq0" target="_blank" rel="noreferrer">
                Boots
              </a>
            </strong>{" "}
            in-store and{" "}
            <strong className="hover:text-[#e98c9a]!">
              <a href="https://bit.ly/3JIgSq0" target="_blank" rel="noreferrer">
                online!
              </a>
            </strong>
          
          </p>

          <div className="mt-[70px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className=" mt-[40px]">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className="w-full" />
                </a>
                <div
                  style={{ padding: "16px 21px" }}
                  className="px-[16px] pb-[21px]! mt-[20px]! pt-[10px] text-center"
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

