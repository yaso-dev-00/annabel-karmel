import { InstagramShareSection } from "@/components/instagram-share-section";
import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/get-kids-kitchen");
const articlePath = "/articles/get-kids-kitchen";

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
    appExclusive: true,
  },
  {
    title: "Baked Granola Cups with Blueberry Yoghurt",
    href: "https://www.annabelkarmel.com/recipes/baked-granola-cups-with-blueberry-yoghurt/",
    image: `${articlePath}/baked-granola-cups.jpg`,
  },
  {
    title: "No-Sugar Chocolate Orange Energy Balls",
    href: "https://www.annabelkarmel.com/recipes/no-sugar-chocolate-orange-energy-balls/",
    image: `${articlePath}/no-sugar-energy-balls.jpg`,
  },
  {
    title: "Chocolate Coated Strawberries",
    href: "https://www.annabelkarmel.com/recipes/chocolate-coated-strawberries/",
    image: `${articlePath}/chocolate-coated-strawberries.jpg`,
  },
  {
    title: "Easy Cupcakes",
    href: "https://www.annabelkarmel.com/recipes/easy-cupcakes/",
    image: `${articlePath}/easy-cupcakes.jpg`,
  },
];

export default function GetKidsInTheKitchenPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[40px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h1 className={styles.sectionTitle}>Maximising time spent together as a family</h1>

          <p className={`${styles.body}  `}>
            If the past year has taught us anything, it&apos;s how important family is. As we move towards more
            positive and happier times, let&apos;s make the most of family moments and use play as a bonding experience
            to create special memories for our children.We&apos;re very excited to have partnered with{" "}
            <a
              href="https://www.amazon.co.uk/stores/page/23DE37C2-3BE5-4BEB-8622-80D1F174A56E?ingress=3"
              target="_blank"
              rel="noopener"
              className={styles.link}
            >
              Edx Education
            </a>
            , innovators in educational toys &amp; home learning resources who champion learning through play.
            We&apos;ve selected some of our favourite recipes &amp; Edx Education activities to cook &amp; play
            together, help build family bonds and make the most of your time spent at home.
          </p>

          <h2 className={`${styles.sectionTitle}`}>Cook together</h2>
          <p className={`${styles.body}`}>
            Encouraging children to take an active interest in cooking and preparing meals is a great way to teach them
            about a healthy lifestyle. But time spent in the kitchen can also be a lesson in life skills. It&apos;s
            easy to incorporate science, spelling, fractions and even languages into the mix. What&apos;s more, they
            won&apos;t even realise they&apos;re learning amongst all the tasty fun!
          </p>
          <p className={`${styles.sectionTitle}`}>
            Here are some of Annabel&apos;s favourite recipes to cook together as a family:
          </p>

          <ArticleRecipeCarousel items={recipes} />

          <h2 className={`${styles.sectionTitle} mt-[60px]! `}>Play together</h2>
          <p className={`${styles.body} mt-[18px] `}>
            After a traumatic year of interrupted schooling, the cancelling of fun-filled social activities and lack of
            quality time spent with friends and loved ones, children need some welcome relief from what has been a very
            difficult year. Play offers the perfect answer - not only is it great for helping kids have fun and relax
            but it offers the ideal opportunity to catch up on lost learning in an enjoyable and engaging way. Let&apos;s
            take a look at its many benefits and how we can encourage children to make the most of playtime!
          </p>

          <section className="mt-[48px] grid grid-cols-1 items-center gap-[26px] md:grid-cols-2">
            <img
              src="/articles/get-your-free-top-50-first-foods-list/related-best-foods.png"
              alt="Edx Education play resources"
              className={styles.media}
            />
            <div>
              <h3 className={styles.sectionTitle}>
                Learning through play with{" "}
                <a href="https://edxeducation.com/teacher-parent/" target="_blank" rel="noopener" className={styles.link}>
                  Edx Education
                </a>
              </h3>
              <p className={`${styles.body} mt-[18px]`}>
                From early childhood active play toys, to arts &amp; crafts activities and maths and classroom guides,
                Edx Education&apos;s innovative toys and essential resources provide children with a fun and engaging way
                to learn.
              </p>
              <a
                href="https://www.amazon.co.uk/stores/page/23DE37C2-3BE5-4BEB-8622-80D1F174A56E?ingress=3"
                target="_blank"
                rel="noopener"
                className="mt-[16px] inline-block"
              >
                <img src={`${articlePath}/edx-button.png`} alt="Edx Education shop button" className="h-auto w-[350px] max-w-full" />
              </a>
              <p className={`${styles.body} mt-[30px]!`}>
                Play has endless opportunities to make learning FUN! For more ideas and inspiration, including free
                downloadable activities, visit Edx Education&apos;s play blog and so much more:{" "}
                <a href="http://www.edxeducation.com/" target="_blank" rel="noopener" className={styles.link}>
                  <strong>www.edxeducation.com</strong>
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
