import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/birthday-spread-fit-prince");
const articlePath = "/articles/birthday-spread-fit-prince";

const recipes = [
  {
    title: "Birthday Train Cake",
    href: "https://www.annabelkarmel.com/recipes/birthday-train-cake/",
    image: `${articlePath}/birthday-train-cake.jpg`,
    alt: "Birthday train cake",
    body: "Choo choo! Make way for every child's dream cake. This impressive show-stopper is actually really easy to make with no baking involved.",
  },
  {
    title: "Watermelon Monster",
    href: "https://www.annabelkarmel.com/recipes/watermelon-monster/",
    image: `${articlePath}/watermelon-monster.jpg`,
    alt: "Watermelon monster fruit platter",
    body: "This Watermelon Monster is sure to be a roaring success! Plus, it's a fantastic way to help attack that five-a-day target even on their birthday...",
  },
  {
    title: "Rice Krispie Monsters",
    href: "https://www.annabelkarmel.com/recipes/rice-krispie-monsters/",
    image: `${articlePath}/rice-krispie-monsters.jpg`,
    alt: "Rice krispie monsters",
    body: "Snap, Crackle, and Pop - these mini-monsters will soon get gobbled up! Kids will love getting involved with this recipe!",
  },
  {
    title: "Mini Watermelon Jellies",
    href: "https://www.annabelkarmel.com/recipes/mini-watermelon-jellies/",
    image: `${articlePath}/mini-watermelon-jellies.jpg`,
    alt: "Mini watermelon jellies",
    body: "The once traditional jelly and ice cream has been given a mini-makeover to create perhaps the smallest watermelons these party-goers will have ever seen!",
  },
];

export default function BirthdaySpreadFitPrincePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[12px] pt-[20px] md:px-[14px] md:pt-[30px]">
          <h1 className={styles.pageTitle}>Annabel&apos;s Birthday Party Recipes</h1>

          {recipes.map((recipe) => (
            <section key={recipe.title} className="mt-[34px]">
              <h2 className={styles.recipeTitle}>
                <a href={recipe.href} target="_blank" rel="noopener" className={styles.recipeLink}>
                  {recipe.title}
                </a>
              </h2>
              <a href={recipe.href} target="_blank" rel="noopener" className="block">
                <img src={recipe.image} alt={recipe.alt} className="mt-[30px]   md:max-w-[700px]! mx-auto" />
              </a>
              <p className={styles.body}>{recipe.body}</p>
            </section>
          ))}

          <p className={styles.milestoneText}>
            We hope these birthday party recipes have given you inspiration for the next milestone!
          </p>

          <section style={{maxWidth: "1000px"}} className="mt-[42px] md:max-w-[1000px]! mx-auto grid max-w-full grid-cols-1 min-[900px]:grid-cols-2  gap-12">
            
           <img
              src={`${articlePath}/app-promo.jpg`}
              alt="Annabel app promo"
              className="w-full max-w-full shrink-0 md:w-auto lg:max-w-[472px]"
            />
            
            <div className={`min-w-0 flex-1 ${styles.appPromoCopy}`}>
              <p className={styles.body}>
                Never be short on food ideas for your little ones with{" "}
                <strong>Annabel&apos;s Baby &amp; Toddler Recipe App</strong>. New and updated with over 350 delicious
                recipes, as well as a host of features, this is the must-have app for delicious mealtimes.
              </p>
              <p className={styles.downloadText}>
                Download now for{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.annabelkarmel"
                  target="_blank"
                  rel="noopener"
                  className={styles.downloadLink}
                >
                  IOS
                </a>{" "}
                or{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.annabelkarmel"
                  target="_blank"
                  rel="noopener"
                  className={styles.downloadLink}
                >
                  ANDROID
                </a>
              </p>
            </div>
          </section>

       
          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
