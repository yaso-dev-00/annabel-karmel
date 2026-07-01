import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/boost-your-childs-immune-system");

const sections = [
  {
    title: "Taste The Rainbow",
    image: "/articles/boost-your-childs-immune-system/taste-the-rainbow.png",
    alt: "Fruit and veg ice lollies on rainbow plate",
    body: "Variety is key - by including an array of foods in your diet, including plenty of vibrant and fresh fruit and vegetables, you give yourself a strong fighting chance to avoid getting unwell!",
    linkText: "Up your 5-a-day with my fruit & veg ice lollies. Click here for the recipe.",
    href: "https://www.annabelkarmel.com/recipes/fruit-veg-ice-lollies/",
  },
  {
    title: "Avoid Processed Food",
    image: "/articles/boost-your-childs-immune-system/avoid-processed-food.png",
    alt: "No-sugar chocolate orange energy balls",
    body: "Unfortunately, many shop-bought products are highly processed and loaded with sugar. These sugary, additive-rich foods can destroy your white blood cell's ability to resist infections for several hours so it's best to avoid them during this time.",
    linkText: "Try my No-sugar Chocolate Orange Energy Balls for a healthy alternative. Click here for the recipe.",
    href: "https://www.annabelkarmel.com/recipes/no-sugar-chocolate-orange-energy-balls/",
  },
  {
    title: "Vitamin C For The Win",
    image: "/articles/boost-your-childs-immune-system/vitamin-c-for-the-win.jpg",
    alt: "Carrot puree with lentils",
    body: "Most people turn to oranges for vitamin C after they've caught a cold, and that's because they're great at helping build up your immune system - so get chomping on Vitamin C-rich carrots, oranges, and leafy veg!",
    linkText: "Try my Carrot Puree with Lentils to up your little one's vitamin C. Click here for the recipe.",
    href: "https://www.annabelkarmel.com/recipes/carrot-puree-with-lentils/",
  },
  {
    title: "Brilliant Broccoli",
    image: "/articles/boost-your-childs-immune-system/brilliant-broccoli.jpg",
    alt: "4 ways with broccoli",
    body: "Broccoli is a true superfood and one of the healthiest veg you can eat. It's packed with vitamins A, C & E as well as many antioxidants. The key to preserving the nutrients is to cook it for only a few minutes.",
    linkText: "For all my Broccoli recipes click here.",
    href: "https://www.annabelkarmel.com/?s=broccoli",
  },
  {
    title: "Terrific Tomatoes",
    image: "/articles/get-your-free-top-50-first-foods-list/related-haunted-toast.png",
    alt: "Hidden vegetable tomato soup",
    body: "Tomatoes are another great option as they contain the 3 major antioxidant vitamins - beta carotene, vitamin C and E - which help boost the immune system.",
    linkText: "Try my warming Roasted Tomato Soup. Get the recipe here.",
    href: "https://www.annabelkarmel.com/recipes/hidden-vegetable-tomato-soup/",
  },
  {
    title: "Bust Those Blues With Blueberries",
    image: "/articles/boost-your-childs-immune-system/blueberries.jpg",
    alt: "Purple porridge with blueberries",
    body: "These little berries are immune boosting superfoods. Blueberries contain flavonoids a type of antioxidant that can help reduce damage to cells. They are also rich in vitamins C & A.",
    linkText: "Give your little one a boost with this delicious purple porridge for breakfast. Get the recipe here.",
    href: "https://www.annabelkarmel.com/recipes/purple-porridge/",
  },
  {
    title: "Popeye Was On To Something",
    image: "/articles/6-tips-for-getting-out-and-about-with-baby/related-best-foods.png",
    alt: "Popeye pasta with spinach",
    body: "Spinach is not just rich in vitamin C but is also packed with numerous antioxidants and beta carotene which helps boost our immune system - best when only lightly cooked.",
    linkText: "Try my Popeye pasta packed with spinach. Get the recipe here.",
    href: "https://www.annabelkarmel.com/recipes/popeye-pasta/",
  },
  {
    title: "Superfood Salmon",
    image: "/articles/best-foods-to-help-your-baby-sleep/related-getting-out.jpg",
    alt: "Salmon fishcakes",
    caption: "Salmon Fish Cakes Recipe by Annabel Karmel",
    body: "Salmon provides the body with lots of immune-boosting omega-3s and are a great source of protein to help combat a weak immune system.",
    linkText: "Try my delicious Salmon Fishcakes, packed with Omega 3. Get the recipe here.",
    href: "https://www.annabelkarmel.com/recipes/salmon-fishcakes/",
  },
  {
    title: "Eggslent Eggs",
    image: "/articles/boost-your-childs-immune-system/eggslent-eggs.jpg",
    alt: "Veggie frittata muffins",
    body: "Eggs are full of protein, iron, and vitamin A which all help boost the immune system - an ideal snack or mealtime idea!",
    linkText:
      "Try my Veggie Frittata Muffins are a nutritious, quick, and easy recipe that you and your tot can enjoy together. Get the recipe here.",
    href: "https://www.annabelkarmel.com/recipes/veggie-frittata-muffins/",
  },
  {
    title: "Hydration Is Key",
    image: "/articles/boost-your-childs-immune-system/hydration-is-key.jpg",
    alt: "Infused waters",
    body: "Remember much of our body is made of water, so drink up and stay hydrated! Try to avoid sugar-filled fizzy drinks, instead, try these infused waters.",
    linkText: "Get the recipe here.",
    href: "https://www.annabelkarmel.com/recipes/infused-waters/",
  },
];

export default function BoostYourChildsImmuneSystemPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.body}>
            If there's anything that we've learnt from the past two years, it's that we can't underestimate the
            importance of a strong and healthy immune system. Nutritional deficiencies can make us more susceptible to
            viruses, so eating well is paramount when building a robust and thriving immune system!
          </p>
          <p className={`${styles.body} mt-[24px]`}>Here are my top tips to keep those pesky viruses at bay!</p>

          <div className="mt-[30px] grid grid-cols-1 gap-[34px]">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className={styles.sectionHeading}>{section.title}</h2>
                <div className="flex justify-center w-full">
                <img src={section.image} alt={section.alt} className="mt-[30px] w-full md:max-w-[850px]!" />

                </div>
                             {section.caption ? <p className={`${styles.caption} mt-[8px]`}>{section.caption}</p> : null}
                <p className={`${styles.body} mt-[14px]`}>{section.body}</p>
                <p className={`${styles.recipeLink} mt-[14px] hover:var(--hover-color)!`}>
                  <a href={section.href} target="_blank" rel="noopener">
                    {section.linkText}
                  </a>
                </p>
              </section>
            ))}
          </div>

          <div className="mt-[80px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[70px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
