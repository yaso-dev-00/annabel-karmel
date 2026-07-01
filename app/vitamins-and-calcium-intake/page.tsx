import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const articlePath = "/articles/vitamins-and-calcium-intake";
const relatedArticles = getRelatedArticles("/vitamins-and-calcium-intake");

const calciumSources = [
  "Fortified cereal",
  "Canned sardines in oil with edible bones",
  "Cheddar cheese",
  "Non-fat or low-fat milk",
  "Plain, low-fat, yogurt",
  "Soybeans",
  "Tofu",
  "Canned salmon in oil with edible bones",
  "Turnip greens, collards, kale, mustard greens",
  "Broccoli, cabbage, bok choy",
  "Black-eyed peas, black beans, dried beans",
];

const vitaminDSources = [
  "Egg yolks",
  "Wild caught fatty fish (salmon, tuna, mackerel)",
  "Fish liver oils",
  "Beef liver",
  "Fortified milk, orange juice, and soy milk",
  "Fortified cereal",
];

const recipes = [
  {
    title: "Veggie Omelette Toasties",
    href: "https://www.annabelkarmel.com/recipes/veggie-omelette-toasties/",
    image: `${articlePath}/veggie-omelette-toasties.jpg`,
    excerpt:
      "Kids' energy levels flagging after school or nursery? Here's my oh-so-simple omelette toastie recipe to have up your sleeve! Its super easy and even a great addition to your little ones lunchbox. Eggs have plenty of protein and when served in vitamin D and calcium enriched bread thins, they make for a cracking afternoon boost. Post Views: 427",
  },
  {
    title: "Mini Ploughman's Bento",
    href: "https://www.annabelkarmel.com/recipes/mini-ploughmans-bento/",
    image: `${articlePath}/mini-ploughmans-bento.jpg`,
    excerpt:
      "Now here's a funky twist on traditional pub grub! Take the humble Ploughman's to the school canteen with my yummy bento box! Swap crusty bread for tasty thins enriched with Vitamin D and calcium, and cut everything up into little chunks for fun finger food! Simply pack up with a cut-up hard-boiled egg and apple slices for a truly British lunch. Post Views: 787",
  },
];

function FoodSourceSection({
  heading,
  image,
  imageAlt,
  items,
}: {
  heading: string;
  image: string;
  imageAlt: string;
  items: string[];
}) {
  return (
    <section>
      <h2 className={styles.sectionHeading}>{heading}</h2>
      <div className="mt-[40px] grid grid-cols-1 items-start gap-x-[35px] gap-y-[24px] min-[900px]:grid-cols-2">
        <img src={image} alt={imageAlt} className="mx-auto h-auto w-full " loading="lazy" />
        <ul className={styles.foodList}>
          {items.map((item) => (
            <li key={item} className={styles.foodListItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function VitaminsAndCalciumIntakePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={`${styles.body} mt-0!`}>
            Getting your child to eat anything you put in front of them is a serious feat. Not to mention the added
            worry of them reaching their recommended vitamin intake. However, fret not, hitting nutritional targets can
            be as easy Vitamins A, B, C…and D.
          </p>

          <p className={styles.body}>
            While many parents may know that Vitamin D and Calcium are important for children&apos;s development, few are
            aware that they work most effectively when consumed together. Did you know, Vitamin D&apos;s role in calcium
            absorption helps our little ones avoid brittle bones, weak muscles, and impaired nerves?
            <sup>[1]</sup>
          </p>

          <p className={styles.body}>
            But why do we need calcium? Well, it helps build and maintain healthy bones and supports various bodily
            functions such as blood clotting and muscle contraction. Superstar Vitamin D also plays a big role in our
            bone health, by promoting bone growth and strength, and helping calcium to work its magic. However,
            unfortunately for us in Blighty, the main source of Vitamin D is from the sun, which means it&apos;s crucial
            we get it via our diets or supplements.
          </p>

          <p className={styles.body}>There is a reason it&apos;s called the &quot;sunshine vitamin&quot; after all!</p>

          <p className={styles.body}>
            Fortunately, there are many food sources containing Vitamin D, including egg yolks, fatty-fish and fortified
            milk and cereals. And we all know that calcium can be found in dairy, tofu, soybeans, and many leafy
            vegetables to name but a few.
          </p>

          <p className={styles.body}>
            It&apos;s all very well knowing where to find the vitamins, but most parents would agree that getting your
            child to eat them is the challenging part. This is where I&apos;m here to help! I&apos;ve partnered with
            Warburtons to develop some delicious and nutritious recipes to help your little one grow strong and healthy
            bones. Check out my three delicious, lunch-box friendly recipes below. I&apos;ve also popped a few ideas
            below on Vitamin D and calcium food sources that you can refer back to for inspiration.
          </p>

          <p className={styles.footnote}>
            <sup>[1]</sup> Rutgers
          </p>

          <FoodSourceSection
            heading="High Calcium food sources:"
            image={`${articlePath}/calcium-sources.png`}
            imageAlt="High calcium food sources infographic"
            items={calciumSources}
          />

          <FoodSourceSection
            heading="High Vitamin D food sources:"
            image={`${articlePath}/vitamin-d-sources.png`}
            imageAlt="High vitamin D food sources infographic"
            items={vitaminDSources}
          />

          <h2 className={styles.recipesHeading}>Vitamin D and Calcium Rich Recipes</h2>

          <div className="mt-[40px] space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} className="mt-[40px] bg-[#f3ebee]">
                <a href={recipe.href} target="_blank" rel="noopener noreferrer">
                  <img src={recipe.image} alt={recipe.title} className="w-full" loading="lazy" />
                </a>
                <div className="px-[16px] pb-[21px] pt-[10px] text-center">
                  <h3 className={styles.cardTitle}>{recipe.title}</h3>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>{recipe.excerpt}</p>
                  <div className="mt-[20px] text-center">
                    <a href={recipe.href} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                      Read More
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

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
