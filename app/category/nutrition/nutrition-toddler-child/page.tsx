import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { enrichListingArticle } from "@/data/resolve-article-listing";
import Link from "next/link";
import styles from "./page.module.css";

type ToddlerChildPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type ListingArticle = {
  title: string;
  href: string;
  heroImage: string;
  heroAlt: string;
  category: string;
  excerpt: string;
};

/** Original listing images (same URLs as annabelkarmel.com Toddler & Child archive). */
const AK_UPLOADS = "https://www.annabelkarmel.com/wp-content/uploads";

const ANNABEL_ORIGIN = "https://www.annabelkarmel.com";

const PLACEHOLDER = `${ANNABEL_ORIGIN}/wp-content/plugins/elementor/assets/images/placeholder.png`;

function listingImageSrc(src: string): string {
  if (!src.startsWith(ANNABEL_ORIGIN)) {
    return src;
  }
  return `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=900`;
}

const featuredExperts = {
  title: "Meet our experts",
  description:
    "We've partnered with top UK experts to give you the latest first-hand advice on all those important areas in raising happy, healthy babies, children & parents! From allergies to breast and bottle feeding, sleep to post-natal care and wellness, we've got your questions and concerns covered.",
  ctaLabel: "Read more",
  ctaHref: "/meet-our-experts",
  image: `${AK_UPLOADS}/2021/08/Experts-1-optimized.jpg`,
};

/** Page 1 — same order, copy and images as annabelkarmel.com/category/nutrition/nutrition-toddler-child/ */
const pageOneArticles: ListingArticle[] = [
  {
    title: "Haunted Toast Toppers",
    href: "/haunted-toast-toppers",
    heroImage: `${AK_UPLOADS}/2025/10/AK-Haunted-Toast-Toppers_Web-edited-min-1024x768-optimized.png`,
    heroAlt: "Haunted Toast Toppers",
    category: "Articles",
    excerpt:
      "Haunted Toast Toppers In partnership with Your breakfast staple but make it SPOOKY! These easy ideas in partnership with British ...",
  },
  {
    title: "Everything you need to know about Strep A",
    href: "/everything-you-need-to-know-about-strep-a",
    heroImage: "/articles/everything-you-need-to-know-about-strep-a/hero.jpg",
    heroAlt: "Everything you need to know about Strep A",
    category: "Toddler & Child",
    excerpt:
      "Parents are understandably worried about Group A strep considering the recent devastating cases in the UK. Whilst the bacterial infection ...",
  },
  {
    title: "10 healthy & nutritious lunchbox ideas",
    href: "/10-healthy-nutritious-lunchbox-ideas",
    heroImage: `${AK_UPLOADS}/2024/05/20220816-AK5554-819x1024-optimized.jpg`,
    heroAlt: "10 healthy & nutritious lunchbox ideas",
    category: "Articles",
    excerpt:
      "A new school term calls for fresh ideas to boost brainpower and feed imaginations! It's time to refresh those lunchboxes ...",
  },
  {
    title: "Budget-friendly recipes for a healthy, balanced diet",
    href: "/budget-friendly-recipes-for-a-healthy-balanced-diet",
    heroImage: `${AK_UPLOADS}/2022/07/budget-friendly-optimized.jpg`,
    heroAlt: "Budget-friendly recipes for a healthy, balanced diet",
    category: "Articles",
    excerpt:
      "Budget-Friendly Recipes for a Healthy, Balanced Diet Rising costs have led to most of us feeling the pinch in many ...",
  },
  {
    title: "Top foodie tips for boosting yours and your child's immune system",
    href: "/boost-your-childs-immune-system",
    heroImage: `${AK_UPLOADS}/2021/12/AK-FOODS-TO-FIGHT-VIRUSES-200311-01-1024x1024-optimized.jpg`,
    heroAlt: "Top foodie tips for boosting yours and your child's immune system",
    category: "Articles",
    excerpt:
      "If there's anything that we've learnt from the past two years, it's that we can't underestimate the importance of a ...",
  },
  {
    title: "Rich in flavour, zero salt family recipes",
    href: "/zero-salt-family-recipes",
    heroImage: `${AK_UPLOADS}/2023/10/20210914-AK07399_1-1024x1024-optimized.jpg`,
    heroAlt: "Rich in flavour, zero salt family recipes",
    category: "Articles",
    excerpt:
      "I've teamed up with Knorr to launch #KnorrFamilyFlavours using their history-making #KnorrZeroSalt range of stock cubes. These pioneering stock cubes ...",
  },
  {
    title: "Annabel's Top 10 Finger Food Recipes",
    href: "/annabels-top-10-finger-food-recipes",
    heroImage: `${AK_UPLOADS}/2022/01/recipe2-8-1024x1024-optimized.png`,
    heroAlt: "Annabel's Top 10 Finger Food Recipes",
    category: "Articles",
    excerpt:
      "These finger food recipes are easy to make and tasty and convenient for when you're on the go. There are ...",
  },
  {
    title: "Beat rising food prices with Annabel's money saving tips for family cooking",
    href: "/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking",
    heroImage: `${AK_UPLOADS}/2022/02/bolognese-1024x1024-optimized.png`,
    heroAlt: "Beat rising food prices with Annabel's money saving tips for family cooking",
    category: "Articles",
    excerpt:
      "Providing for our families can be challenging at the best of times, but throw a global pandemic, inflation, and increased ...",
  },
  {
    title: "Perfect pasta dishes for baby, toddler & family",
    href: "/perfect-pasta-dishes-for-baby-toddler-family",
    heroImage: `${AK_UPLOADS}/2024/05/family-recipes-1024x1024-optimized.png`,
    heroAlt: "Perfect pasta dishes for baby, toddler & family",
    category: "Articles",
    excerpt:
      "Pasta is a family staple for good reason – not only is it delicious and pastably one of the easiest ...",
  },
  {
    title: "Autism and Eating: How can your child's ASD impact their diet?",
    href: "/how-can-your-childs-asd-impact-on-their-diet-autism-and-eating",
    heroImage: `${AK_UPLOADS}/2022/03/shutterstock_1948166263-1024x683-optimized.jpg`,
    heroAlt: "Autism and Eating: How can your child's ASD impact their diet?",
    category: "Articles",
    excerpt:
      "As a parent of a child with autism there are many challenges you may face. Supporting them socially, ensuring school ...",
  },
  {
    title: "The perfect pair: why hitting your child's Vitamin D and Calcium intake is so important.",
    href: "/vitamins-and-calcium-intake",
    heroImage: "/articles/vitamins-and-calcium-intake/hero.png",
    heroAlt: "The perfect pair: why hitting your child's Vitamin D and Calcium intake is so important.",
    category: "Nutrition",
    excerpt:
      "Getting your child to eat anything you put in front of them is a serious feat. Not to mention the challenge of hitting their daily Vitamin D and Calcium requirements.",
  },
  {
    title: "Toddler snack time",
    href: "/toddler-snack-time",
    heroImage: `${AK_UPLOADS}/2021/07/toddler-snack-time-optimized.jpg`,
    heroAlt: "Toddler snack time",
    category: "Nutrition",
    excerpt:
      "Your toddler-nado is a whirl of high energy at this stage in their development, so it's a good idea to ...",
  },
  {
    title: "Why eggs are so good for your growing family?",
    href: "/eggs-good-growing-family",
    heroImage: `${AK_UPLOADS}/2019/03/British-Lion-Eggs-Square-190306-01-1-1024x871-optimized.jpg`,
    heroAlt: "Why eggs are so good for your growing family? Annabel Karmel",
    category: "Nutrition",
    excerpt:
      "Eggs are good for us and our little ones but what is it that makes them one of the best ...",
  },
  {
    title: "Foods to boost your child's brainpower",
    href: "/foods-boost-childs-brainpower",
    heroImage: "/articles/foods-boost-childs-brainpower/hero.jpg",
    heroAlt: "Foods to boost your child's brainpower",
    category: "Toddler & Child",
    excerpt:
      "We're all about fuelling children with the best nourishment for busy days of play, learning and development. Food plays an important role in supporting brain health.",
  },
  {
    title: "Fabulous Finger Food",
    href: "/fabulous-finger-food-2",
    heroImage: `${AK_UPLOADS}/2021/06/chicken-sticks-1-optimized.png`,
    heroAlt: "Broccoli, Chicken & Potato Bites recipe by Annabel Karmel",
    category: "Nutrition",
    excerpt:
      "These finger food recipes are easy to make and tasty and convenient for when you're on the go. My chicken ...",
  },
  {
    title: "Top freezer tips",
    href: "/top-freezer-tips",
    heroImage: "/articles/top-freezer-tips/hero.png",
    heroAlt: "Top freezer tips",
    category: "Nutrition",
    excerpt:
      "Wouldn't it be great if we could freeze time? Imagine all those extra jobs and chores we could get done? ...",
  },
  {
    title: "Toddler snack time",
    href: "/toddler-snack-time3",
    heroImage: "/articles/toddler-snack-time3/hero.jpg",
    heroAlt: "Toddler snack time",
    category: "Nutrition",
    excerpt:
      "Your toddler-nado is a whirl of high energy at this stage in their development, so it's a good idea to keep a supply of nutritious snacks to hand.",
  },
  {
    title: "Lunchboxes",
    href: "/lunchboxes-2",
    heroImage: "/articles/lunchboxes-2/hero.jpg",
    heroAlt: "Lunchboxes",
    category: "Nutrition",
    excerpt:
      "Given that school children consume one third of their daily food intake at school (once they are too old for ...",
  },
];

/** Page 2 — same order as annabelkarmel.com/category/nutrition/nutrition-toddler-child/page/2/ */
const pageTwoArticles: ListingArticle[] = [
  {
    title: "Top 10 tips for coping with a fussy eater",
    href: "/top-10-tips-coping-fussy-eater",
    heroImage: "/articles/top-10-tips-coping-fussy-eater/hero.jpg",
    heroAlt: "Top 10 tips for coping with a fussy eater",
    category: "Nutrition",
    excerpt:
      "When you've got a fussy eater to contend with, it's easy to get locked in a battle of wills, and it's so easy to feel frustrated when your toddler simply refuses to eat certain foods.",
  },
  {
    title: "Iron Rich Foods",
    href: "/iron-rich-foods",
    heroImage: "/articles/iron-rich-foods/hero.jpg",
    heroAlt: "Iron Rich Foods",
    category: "Nutrition",
    excerpt:
      "The best iron-rich food source is red meat, in fact, meat should be one of your babies first foods. Other great sources include pulses, eggs, and dark green vegetables.",
  },
  {
    title: "Healthy 'fast' food swaps for less 'naughty' and more nutritious mealtimes",
    href: "/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes",
    heroImage: "/articles/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes/hero.jpg",
    heroAlt: "Healthy fast food swaps for less naughty and more nutritious mealtimes",
    category: "Articles",
    excerpt:
      "Did you know that half of all the food bought by families in the UK is now 'ultra-processed'? Here are Annabel's simple swaps to keep meals nutritious.",
  },
  {
    title: "Annabel tackles the topic of portion sizes",
    href: "/annabel-tackles-the-topic-of-portion-sizes",
    heroImage: "/articles/top-10-tips-coping-fussy-eater/hero.jpg",
    heroAlt: "Annabel tackles the topic of portion sizes",
    category: "Nutrition",
    excerpt:
      "I always get asked about the question of portion size. Although every baby is different, even from a young age they have a strong sense of appetite — eating when they are hungry.",
  },
  {
    title: "10 Perfect Pancake Recipes",
    href: "/pancake-recipes",
    heroImage: "/articles/pancake-recipes/mini-pancakes.jpg",
    heroAlt: "10 Perfect Pancake Recipes",
    category: "Articles",
    excerpt:
      "Whether you're looking for an easy pancake recipe to nail with the kids, a creative twist on a classic or something piled high with toppings — we've got you covered.",
  },
  {
    title: "10 Easy and Healthy Snack Ideas for Toddlers and Kids",
    href: "/healthy-snacks-for-toddlers-and-kids",
    heroImage: "/articles/healthy-snacks-for-toddlers-and-kids/banana-loaf.png",
    heroAlt: "10 Easy and Healthy Snack Ideas for Toddlers and Kids",
    category: "Articles",
    excerpt:
      "Top super-fuelled kids snack ideas to help feed their adventures and keep them topped up until teatime!",
  },
  {
    title: "10 Recipes Guaranteed To Get Kids Eating Vegetables",
    href: "/get-kids-eating-vegetables",
    heroImage: "/articles/get-kids-eating-vegetables/veggie-croquettes.jpg",
    heroAlt: "10 Recipes Guaranteed To Get Kids Eating Vegetables",
    category: "Articles",
    excerpt:
      "Encouraging children to eat their veggies or try new foods can often result in mealtimes quite quickly turning into a battle of wills!",
  },
  {
    title: "Top 10 meals to make for picky eaters",
    href: "/top-10-meals-to-make-for-picky-eaters",
    heroImage: "/articles/top-10-meals-to-make-for-picky-eaters/pasta-bake.jpg",
    heroAlt: "Top 10 meals to make for picky eaters",
    category: "Articles",
    excerpt:
      "Got a fussy eater in the family? Here are Annabel's Top 10 meals for picky eaters — including hidden veggie dishes, homemade fish fingers and mini burgers.",
  },
  {
    title: "10 Easy Midweek Meal Recipes",
    href: "/top-10-easy-dinner-recipes",
    heroImage: "/articles/top-10-easy-dinner-recipes/20220208-AK06108-768x960-optimized.jpg",
    heroAlt: "10 Easy Midweek Meal Recipes",
    category: "Articles",
    excerpt:
      "Hungry kids? Need something easy to cook in the week? Here are 10 of the most popular recipes our families love.",
  },
  {
    title: "Getting kids to eat fish",
    href: "/youngs-food-explorers",
    heroImage: "/articles/youngs-food-explorers/DAIRY-FREE-SALMON-FISHCAKES-scaled-optimized.jpg",
    heroAlt: "Getting kids to eat fish",
    category: "Articles",
    excerpt:
      "Tips, tricks and great recipes to get your tots diving into fish dinners — in partnership with Young's Seafood.",
  },
  {
    title: "Top 10 most popular family recipes",
    href: "/top-10-family-recipes",
    heroImage: "/articles/top-10-family-recipes/curry-768x586-optimized.jpg",
    heroAlt: "Top 10 most popular family recipes",
    category: "Articles",
    excerpt:
      "Families all over the world rely on Annabel Karmel's recipes. Here are the top 10 most popular family recipes on our website.",
  },
];

const curatedPageArticles: Record<number, ListingArticle[]> = {
  1: pageOneArticles,
  2: pageTwoArticles,
};

const totalPages = 2;
const basePath = "/category/nutrition/nutrition-toddler-child";

export default async function ToddlerChildNutritionPage({ searchParams }: ToddlerChildPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawPageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const requestedPage = Number.parseInt(rawPageParam ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  const visibleArticles = (curatedPageArticles[currentPage] ?? []).map(enrichListingArticle);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-4 pb-8 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <p className="[font-family:var(--font-montserrat)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a7a7f]">
            Nutrition
          </p>
          <h1 className="mt-3 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#161418] md:text-[52px]">
            Toddler &amp; Child
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] [font-family:var(--font-montserrat)] text-[19px] leading-[1.55] text-[#514a52] md:text-[20px]">
            Expert advice on toddler nutrition, fussy eating, lunchboxes, healthy snacks and family mealtimes — to help you
            raise a happy, healthy little one.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 pb-6 sm:px-6 lg:px-8">
          <article className="overflow-hidden border border-[#e8e1e3] bg-[#fef3f4]">
            <div className="grid grid-cols-1 md:grid-cols-[1.95fr_1fr]">
              <div className="p-6 md:p-8">
                <h2 className="[font-family:var(--font-playfair)] text-[34px] font-normal! leading-[1.08] text-[#161418] md:text-[50px]">
                  {featuredExperts.title}
                </h2>
                <p className="mt-5 max-w-[760px] [font-family:var(--font-montserrat)] text-[18px] leading-normal text-[#514a52] md:text-[20px]">
                  {featuredExperts.description}
                </p>
                <Link
                  href={featuredExperts.ctaHref}
                  className="mt-7 inline-flex items-center rounded-[4px] bg-[#6f7987] px-5 py-2 [font-family:var(--font-montserrat)] text-[18px] font-medium text-white! transition-colors hover:bg-[#626c79]"
                >
                  {featuredExperts.ctaLabel}
                </Link>
              </div>
              <img
                src={listingImageSrc(featuredExperts.image)}
                alt="Meet our experts"
                className="h-[280px] w-full bg-[#f4eef0] object-cover object-center md:h-[360px]"
              />
            </div>
          </article>
        </section>

        <section
          id="articles-list"
          className="mx-auto w-full max-w-[1200px] scroll-mt-[120px] px-4 pb-16 pt-8 sm:px-6 lg:px-8"
        >
          {visibleArticles.length > 0 ? (
            <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((article) => (
                <li key={article.href} className="flex">
                  <article className={styles.card}>
                    <Link href={article.href} className={styles.cardImageWrap} aria-label={article.title}>
                      <img
                        src={listingImageSrc(article.heroImage)}
                        alt={article.heroAlt}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    </Link>
                    <div className={styles.cardBody}>
                      <p className={styles.cardCategory}>{article.category}</p>
                      <h2 className={styles.cardTitle}>
                        <Link href={article.href}>{article.title}</Link>
                      </h2>
                      <p className={styles.cardExcerpt}>{article.excerpt}</p>
                      <div className={styles.cardCta}>
                        <Link href={article.href} className={styles.cardButton}>
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-[640px] py-16 text-center [font-family:var(--font-montserrat)] text-[18px] leading-[1.55] text-[#514a52]">
              More Toddler &amp; Child articles for this page are coming soon.
            </div>
          )}

          <nav className={styles.pagination} aria-label="Toddler and Child pagination">
            {prevPage ? (
              <Link
                href={`${basePath}?page=${prevPage}#articles-list`}
                className={styles.paginationStep}
                aria-label="Previous page"
              >
                &laquo; Previous
              </Link>
            ) : null}
            <ol className="m-0 flex list-none items-center gap-3 p-0">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                if (isActive) {
                  return (
                    <li key={pageNumber}>
                      <span
                        aria-current="page"
                        aria-label={`Page ${pageNumber}, current page`}
                        className={`${styles.paginationItem} ${styles.paginationItemActive}`}
                      >
                        {pageNumber}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={pageNumber}>
                    <Link
                      href={`${basePath}?page=${pageNumber}#articles-list`}
                      aria-label={`Page ${pageNumber}`}
                      className={styles.paginationItem}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                );
              })}
            </ol>
            {nextPage ? (
              <Link
                href={`${basePath}?page=${nextPage}#articles-list`}
                className={styles.paginationStep}
                aria-label="Next page"
              >
                Next &raquo;
              </Link>
            ) : null}
          </nav>
        </section>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
