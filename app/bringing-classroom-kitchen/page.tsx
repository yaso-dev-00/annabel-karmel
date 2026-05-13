import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/bringing-classroom-kitchen");
const articlePath = "/articles/bringing-classroom-kitchen";

const recipes = [
  {
    title: "Plant-Based Veggie Croquettes",
    href: "https://www.annabelkarmel.com/recipes/plant-based-veggie-croquettes/",
    image: `${articlePath}/plant-based-veggie-croquettes.jpg`,
  },
  {
    title: "Carrot & Apple Muffins",
    href: "https://www.annabelkarmel.com/recipes/carrot-apple-muffins/",
    image: `${articlePath}/carrot-apple-muffins.jpg`,
  },
  {
    title: "Rainbow Pizza",
    href: "https://www.annabelkarmel.com/recipes/rainbow-pizza/",
    image: `${articlePath}/rainbow-pizza.jpg`,
  },
  {
    title: "Baked Granola Cups with Blueberry Yoghurt",
    href: "https://www.annabelkarmel.com/recipes/baked-granola-cups-with-blueberry-yoghurt/",
    image: `${articlePath}/baked-granola-cups.jpg`,
  },
  {
    title: "Yoghurt Pancakes With Berries",
    href: "https://www.annabelkarmel.com/recipes/yoghurt-pancakes-with-berries/",
    image: `${articlePath}/yoghurt-pancakes.jpg`,
  },
  {
    title: "Watermelon Pizza",
    href: "https://www.annabelkarmel.com/recipes/watermelon-pizza/",
    image: `${articlePath}/watermelon-pizza.png`,
  },
  {
    title: "Cheese & Cherry Tomato Muffins",
    href: "https://www.annabelkarmel.com/recipes/cheese-cherry-tomato-muffins/",
    image: `${articlePath}/cheese-cherry-tomato-muffins.jpg`,
  },
];

export default function BringingClassroomToKitchenPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[40px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.lead}>
            Encouraging children to take an active interest in cooking and preparing meals is a great way to teach them
            about a healthy lifestyle. But time spent in the kitchen can also be a lesson in life skills. it&apos;s
            easy to incorporate science, spelling, fractions and even languages into the mix. What&apos;s more, they
            won&apos;t even realise they&apos;re learning amongst all the tasty fun! Here&apos;s a few clever ways to
            bring the classroom to the kitchen.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[24px]`}>Moreish maths</h2>
          <img src={`${articlePath}/moreish-maths.png`} alt="Moreish maths" className="mt-[20px] w-full" />
          <p className={styles.body}>
            Let&apos;s be honest, maths isn&apos;t always everyone&apos;s favourite. But how about muffin maths or
            cookie calculations? Now they&apos;re suddenly interested!
          </p>
          <p className={styles.body}>
            Counting out and weighing ingredients will boost their confidence and tasking them with dividing muffin
            batter or cookie dough mixture in equal dollops between paper cases or trays will teach them division.
            Start off by halving the mixture and the quartering and so on.
          </p>
          <p className={styles.body}>
            You can also teach some adding and subtracting. For example, explain, &quot;If you have 2 cookies from the
            batch you&apos;ve made and then give 2 to a friend how many of the cookies do you both have (4/12). How
            many are left?&quot;
          </p>
          <p className={styles.body}>
            Muffins are also a great snack option for your little learners so it&apos;s a good recipe to have up your
            sleeve. Why not try my{" "}
            <a href="https://www.annabelkarmel.com/recipes/carrot-apple-muffins/" target="_blank" rel="noopener" className={styles.link}>
              Teddy Bear Muffins
            </a>{" "}
            or check out my recipe for{" "}
            <a href="https://www.annabelkarmel.com/cookie-recipes/" target="_blank" rel="noopener" className={styles.link}>
              Cookies 3-Ways
            </a>{" "}
            and transform basic baking into a trip to the classroom?
          </p>

          <h2 className={`${styles.sectionTitle} mt-[34px]`}>Scrumptious science!</h2>
          <img src={`${articlePath}/scrumptious-science.jpg`} alt="Scrumptious science" className="mt-[20px] w-full" />
          <p className={styles.body}>
            When it comes to science, practical experiments reign supreme and I have a sure-fire way of making science
            fun whilst also teaching kids about food provenance.
          </p>
          <p className={styles.body}>
            This is a science experiment you can eat! On a morning, toast appears on their plate, spread with butter,
            but wouldn&apos;t it be great to teach children where butter comes from and how it is made before it
            arrives in the packet which sits in the fridge?
          </p>
          <img src={`${articlePath}/butter-jar.jpg`} alt="Making butter at home" className="mt-[30px] w-full" />
          <h3 className={`${styles.strongTitle} mt-[24px]`}>
            Making your own butter couldn&apos;t be easier - plus, excitingly it&apos;s also a little bit like magic!
            All you need is double cream, a bit of elbow grease and some eager learners. Here&apos;s how:
          </h3>
          <ol className={styles.orderedList}>
            <li>
              Fill a jar halfway with double cream, pop the lid on tightly and get ready to shake shake shake! The
              cream will gradually thicken until you get whipped cream (this is a good point to stop and show them) but
              keep going and shake some more!
            </li>
            <li>
              Cream consists mostly of water and around 15-25% fat molecules and protein. The fat molecules are
              extremely small and fat is lighter than water so when cream is shaken the fat molecules are broken up
              leaving their normal position.
            </li>
            <li>
              After a while, the more the cream is shaken, the more the fat molecules separate from the liquid and cling
              together, forming a solid lump which is your butter!
            </li>
            <li>
              The leftover liquid, after the solid butter has formed, is called buttermilk. Poor off the buttermilk, et
              voila - scoop out your delicious homemade butter. And just in time for lunch!
            </li>
          </ol>

          <h2 className={`${styles.sectionTitle} mt-[34px]`}>Language lessons</h2>
          <img src={`${articlePath}/language-lessons.png`} alt="Language lessons" className="mt-[20px] w-full" />
          <p className={styles.body}>
            Offer them the cooking power hour! Have a shelf with some colourful cookbooks or find some inspiring recipe
            websites to scroll through with them. Ask your child to pick a few recipes that they like the look of and
            sound of. By allowing your child to select recipes to cook, they will gain a sense of empowerment from
            helping you plan a meal, snack or dessert and begin to understand the cooking prep and process.
          </p>
          <p className={styles.body}>
            This is also a great opportunity to get your little learner to practice reading out a recipe and to follow
            instructions. You could challenge them to an impromptu ingredient spelling bee as you cook. Teach children
            about adjectives and get them to describe each of the ingredients you&apos;re using in a recipe. For example
            crunchy cucumber, zingy kiwi, runny honey or fresh and juicy tomatoes.
          </p>
          <p className={styles.body}>
            While you&apos;re at it why not teach them some French or Spanish words? An inflatable globe to pinpoint
            where certain foods come from, from around the world is also a nice addition to add some geography skills to
            the kitchen classroom mix!
          </p>

          <h2 className={`${styles.sectionTitle} mt-[34px] text-center`}>Kids cooking recipes:</h2>
           <div className="w-full mt-[40px]!">
           <ArticleRecipeCarousel items={recipes} className="mt-[26px]" />

           </div>
        
          <div className="mt-[70px] text-center">
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
