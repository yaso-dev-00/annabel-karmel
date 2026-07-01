import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Getting kids to eat fish | Family meals | Annabel Karmel",
  description:
    "Tips, tricks and great recipes to get your tots diving into fish dinners! Discover fun ideas in partnership with Young's Seafood to get the whole family hooked.",
};

const relatedArticles = getRelatedArticles("/youngs-food-explorers");

const IMG = "/articles/youngs-food-explorers";

const recipes = [
  {
    title: "Popcorn Scampi with Fruity Curry Dipping Sauce",
    image: `${IMG}/curry-optimized.png`,
    alt: "Popcorn scampi with fruity curry dipping sauce",
  },
  {
    title: "Spooky Spider Fishcakes with Scary Sweet Potato Faces",
    image: `${IMG}/spider-fishcake-optimized.png`,
    alt: "Spooky spider fishcakes with sweet potato faces",
  },
  {
    title: "Deep Sea Flipper Dinner",
    image: `${IMG}/flipper-optimized.png`,
    alt: "Deep sea flipper dinner",
  },
  {
    title: "5 Veggie Rainbow Cod",
    image: `${IMG}/rice-optimized.png`,
    alt: "5 veggie rainbow cod",
  },
];

export default function YoungsFoodExplorersPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[30px] md:px-[14px]">

          {/* Hero title */}
          <h1 className={styles.heroTitle}>LET&apos;S GET THE WHOLE FAMILY EXPLORING FISH!</h1>

          {/* Hero image */}
          <div className={styles.heroImageWrap}>
            <img
              src="/articles/critical-nutrients-baby-importance-essential-fatty-acids/hero.jpg"
              alt="Getting the whole family exploring fish"
              width={1200}
              height={600}
              loading="eager"
            />
          </div>

          {/* Intro paragraphs */}
          <p className={styles.body}>
            If you&apos;re looking for more ways to pack in those all-important two portions of fish a week, you&apos;ve
            come to the right place!
          </p>
          <p className={styles.body}>
            We all know that seafood is packed with lots of vitamins and minerals that the body needs to function
            properly. Yet getting kids to eat fish can be easier said than done. In this article we will run through
            some tricks, tips and great recipes to get your tots diving into fish dinners!
          </p>
          <p className={styles.body}>
            The secret to getting kids to eat fish is to keep things simple, but add a splash of creativity so that
            your little ones will love to get involved.
          </p>
          <p className={styles.body}>
            And to help inspire you this Autumn, we&apos;ve teamed up with Young&apos;s Seafood to serve-up some fun
            ideas to get the whole family hooked.
          </p>

          {/* Bold recipe section intro */}
          <p className={styles.bodyBold}>
            Let&apos;s face it, kids eat with their eyes, so getting kids to eat fish can be as simple as presentation.
            Here are some easy ideas to explore, and don&apos;t forget to involve even the smallest of shipmates in the
            food prep!
          </p>

          {/* 2×2 recipe grid */}
          <div className="mt-[40px] grid grid-cols-2 gap-[20px] md:gap-[40px]">
            {recipes.map((r) => (
              <div key={r.title}>
                <p className={styles.recipeGridTitle}>{r.title}</p>
                <div className="mt-[10px] overflow-hidden rounded-[4px]">
                  <img src={r.image} alt={r.alt} className="w-full h-auto block" loading="lazy" />
                </div>
              </div>
            ))}
          </div>

          {/* Mid-page fish image */}
          <div className={styles.midBannerWrap}>
            <img
              src="/articles/critical-nutrients-baby-importance-essential-fatty-acids/omega-3-fish-plate.jpg"
              alt="A colourful plate of fish for children"
              loading="lazy"
            />
          </div>

          {/* Nutrition sections */}
          <div className="mt-[60px] space-y-[56px]">

            {/* Protein */}
            <div className="flex flex-col gap-[28px] md:flex-row md:items-center md:gap-[48px]">
              <div className="md:w-1/2">
                <h2 className={styles.nutritionTitle}>
                  A great source of <span className="font-black">Protein</span>
                </h2>
                <p className={styles.nutritionBody}>
                  Seafood is a great source of protein. A portion of seafood typically provides you with around half of
                  your protein requirement for the day.
                </p>
                <p className={styles.nutritionBody}>
                  Why do we need protein? It&apos;s essential for the growth and maintenance of muscles and body tissues.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={`${IMG}/DAIRY-FREE-SALMON-FISHCAKES-scaled-optimized.jpg`}
                  alt="Dairy-free salmon fishcakes"
                  className="w-full h-auto block rounded-[4px]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Low in saturated fat */}
            <div className="flex flex-col gap-[28px] md:flex-row-reverse md:items-center md:gap-[48px]">
              <div className="md:w-1/2">
                <h2 className={styles.nutritionTitle}>
                  Low in <span className="font-black">saturated fat</span>
                </h2>
                <p className={styles.nutritionBody}>
                  We all need some fat in our diet, but too much saturated fat can raise cholesterol, increasing the
                  risk of heart disease.
                </p>
                <p className={styles.nutritionBody}>
                  Seafood is generally lower in saturated fat than other proteins, especially when grilled, baked,
                  poached or steamed.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={`${IMG}/SALMON-CROQUETTES-WITH-SWEET-POTATO-BUTTERNUT-SQUASH-scaled-optimized.jpg`}
                  alt="Salmon croquettes with sweet potato and butternut squash"
                  className="w-full h-auto block rounded-[4px]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Omega 3 */}
            <div className="flex flex-col gap-[28px] md:flex-row md:items-center md:gap-[48px]">
              <div className="md:w-1/2">
                <h2 className={styles.nutritionTitle}>
                  Essential <span className="font-black">Omega 3</span>
                </h2>
                <p className={styles.nutritionBody}>
                  We should be eating at least two portions (a portion is around 140g) of fish per week, one of which
                  should be an oily fish such as salmon, mackerel, or sardines.
                </p>
                <p className={styles.nutritionBody}>
                  These provide the long chain omega-3 fatty acids which have important healthy benefits such as helping
                  with brain development and keeping a healthy heart. Which is why getting kids to eat fish is so
                  important!
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={`${IMG}/Miso-Salmon-with-Rice-scaled-optimized.jpg`}
                  alt="Miso salmon with rice"
                  className="w-full h-auto block rounded-[4px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Tips cards */}
          <div className="mt-[60px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
            <div className={`${styles.tipCard} flex flex-col`}>
              <img
                src="/articles/critical-nutrients-baby-importance-essential-fatty-acids/fish-fingers.jpg"
                alt="Top tips for cooking with kids"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="flex flex-col flex-1 p-[20px]">
                <h3 className={styles.tipTitle}>Top tips for cooking with kids</h3>
                <p className={styles.tipBody}>
                  Check out Annabel&apos;s tricks to help you and your kids enjoy cooking together. Aprons at the ready!
                </p>
                <a
                  href="https://www.annabelkarmel.com/top-tips-cooking-kids/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.tipReadMore}
                >
                  Read more
                </a>
              </div>
            </div>

            <div className={`${styles.tipCard} flex flex-col`}>
              <img
                src={`${IMG}/balls-300x225-optimized.png`}
                alt="How to get kids eating fish"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="flex flex-col flex-1 p-[20px]">
                <h3 className={styles.tipTitle}>How to get kids eating fish</h3>
                <p className={styles.tipBody}>
                  Fish doesn&apos;t have to be a hard sell to mini diners. Try these simple hacks for packing in their
                  2-a-week.
                </p>
                <a
                  href="https://www.annabelkarmel.com/how-to-get-kids-eating-fish/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.tipReadMore}
                >
                  Read more
                </a>
              </div>
            </div>
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
