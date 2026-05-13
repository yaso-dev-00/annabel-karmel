import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/10-healthy-nutritious-lunchbox-ideas");

const recipes = [
  {
    title: "Chicken, Tomato & Veggie Stars",
    href: "https://www.annabelkarmel.com/recipes/chicken-tomato-veggie-stars/",
    image: "/articles/10-healthy-nutritious-lunchbox-ideas/chicken-tomato-veggie-stars.jpg",
    excerpt:
      "These chicken, tomato & veggie stars will be the star of any mealtime. Not only do they pass the kiddie taste test, but they contain a whole lot of goodness. Filled with lots of hidden vegetables, even the most discerning little veggie-phobe will be none the wiser! These colourful and flavourful stars are perfect for batch cooking and stocking in the freezer for a rainy day - or simply for when you're lacking food inspiration. Post Views: 3,767",
  },
  {
    title: "Turkey & Vegetable Rice Salad",
    href: "https://www.annabelkarmel.com/recipes/turkey-vegetable-rice-salad/",
    image: "/articles/10-healthy-nutritious-lunchbox-ideas/turkey-vegetable-rice-salad.jpg",
    excerpt:
      "This Piccolo cherry tomato and turkey rice salad is so delicious your little one will be sure to gobble it up! Packed with protein from the lean turkey and delicious (and nutritious) tomatoes, this hearty yet healthy salad is guaranteed to become your new tomato go-to. Post Views: 1,881",
  },
  {
    title: "Veggie Packed Frittata Muffins 4-ways",
    href: "https://www.annabelkarmel.com/recipes/veggie-packed-frittata-muffins/",
    image: "/articles/10-healthy-nutritious-lunchbox-ideas/veggie-packed-frittata-muffins.jpg",
    excerpt:
      "These frittata muffins are so simple to make and very versatile, making them the ideal recipe for using up leftovers. With four different flavour combinations to choose from, there's a frittata muffin here for everyone! Post Views: 24,623",
  },
  {
    title: "Chicken, Tomato & Corn Fritters",
    href: "https://www.annabelkarmel.com/recipes/chicken-tomato-corn-fritters/",
    image: "/articles/10-healthy-nutritious-lunchbox-ideas/chicken-tomato-corn-fritters.jpg",
    excerpt:
      "You won't want to fritter away any more time not making these delicious chicken, sweetcorn and tomato buttermilk fritters. This is the perfect quick and easy meal to use up that leftover roast chicken from the weekend! Post Views: 10,331",
  },
  {
    title: "Macaroni & Cheese Muffins",
    href: "https://www.annabelkarmel.com/recipes/macaroni-cheese-muffins/",
    image: "/articles/10-healthy-nutritious-lunchbox-ideas/macaroni-cheese-muffins.jpg",
    excerpt:
      "The kids will love these Macaroni & Cheese Muffins, a creative way of cooking mac and cheese! Macaroni is baked with a cheese sauce in muffin tins. Allow the muffins to cool a little before serving to let the cheese set. Post Views: 1,072",
  },
  {
    title: "Cheese & Cherry Tomato Muffins",
    href: "https://www.annabelkarmel.com/recipes/cheese-cherry-tomato-muffins/",
    image: "/articles/10-healthy-nutritious-lunchbox-ideas/cheese-cherry-tomato-muffins.jpg",
    excerpt:
      "After a busy morning, hungry (or should we say 'hangry') tums will snap-up my savoury little muffins. Batch cooking at its best! Post Views: 6,745",
  },
];

export default function LunchboxIdeasPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro}  md:text-left text-center`}>
            A new school term calls for fresh ideas to boost brainpower and feed imaginations!
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            We all know how important it is for little learners to stay fuelled on the right foods to support their
            development, so it's time to refresh those lunchboxes with a host of energy-boosting recipes from Annabel's
            kitchen.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            But healthy eating doesn't have to stop at the school gate; we've got lots of brand new simple and healthy
            recipes for after school snacks and midweek meals.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            This new school term, let's liven up those lunchboxes, shake-up snack time, and put the 'mmm' into midweek
            meals.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            Here are my Top 10 delicious & nutritious lunchbox fillers for you to try this Back to School season!
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
