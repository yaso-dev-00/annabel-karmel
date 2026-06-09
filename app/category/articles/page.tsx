import { InstagramShareSection } from "@/components/instagram-share-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { articleIndex } from "@/data/article-index";
import Link from "next/link";

type ArticlesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type ListingArticle = {
  title: string;
  heroImage: string;
  heroAlt: string;
  href: string;
};

const featuredExperts = {
  title: "Meet Our Experts",
  description:
    "We’ve partnered with top UK experts to give you the latest first-hand advice on all those important areas in raising happy, healthy babies, children & parents! From allergies to breast and bottle feeding, sleep to post-natal care and wellness, we’ve got your questions and concerns covered.",
  ctaLabel: "Meet Our Experts",
  ctaHref: "/meet-our-experts",
  image: "/articles/Experts-1-optimized.jpg",
};

const secondPageArticles: ListingArticle[] = [
  {
    title: "6 incredibly simple recipes with Green Giant sweetcorn",
    heroImage: "/articles/6-incredibly-simple-recipes-with-green-giant-sweetcorn/starry-eyed-sweetcorn-squash-stars.jpg",
    heroAlt: "Green Giant sweetcorn star shapes",
    href: "/6-incredibly-simple-recipes-with-green-giant-sweetcorn",
  },
  {
    title: "Annabel’s Top 10 Burger Recipes",
    heroImage: "/articles/annabels-top-10-burger-recipes/annabels-beef-burgers.jpg",
    heroAlt: "Burger recipe round-up",
    href: "/annabels-top-10-burger-recipes",
  },
  {
    title: "7 mouth-watering recipes to celebrate the start of Summer",
    heroImage: "/articles/summer-recipes/chicken-apple-hot-dogs.jpg",
    heroAlt: "Summer recipe burger",
    href: "/summer-recipes",
  },
  {
    title: "10 delicious cherry tomato recipes",
    heroImage: "/articles/10-delicious-cherry-tomato-recipes/hero.jpg",
    heroAlt: "Cherry tomato dish",
    href: "/10-delicious-cherry-tomato-recipes",
  },
  {
    title: "10 quick & easy puff pastry recipes",
    heroImage: "/articles/10-quick-easy-puff-pastry-recipes/apple-cinnamon-twists.jpg",
    heroAlt: "Puff pastry bites",
    href: "/10-quick-easy-puff-pastry-recipes",
  },
  {
    title: "Discover special offers at Sani Resort, Greece",
    heroImage: "/articles/discover-special-offers-at-sani-resort-greece/sani-asterias.jpg",
    heroAlt: "Sani Resort beachfront",
    href: "/discover-special-offers-at-sani-resort-greece",
  },
  {
    title: "10 amazing meals you can make with leftovers",
    heroImage: "/articles/10-meals-you-can-make-with-leftovers/strata-with-cheese-bacon-eggs-tomatoes.png",
    heroAlt: "Leftovers meal ideas",
    href: "/10-meals-you-can-make-with-leftovers",
  },
  {
    title: "Top 10 tips to reduce food waste at home",
    heroImage: "/articles/top-10-tip-to-reduce-food-waste/2-Organise-fridge-web-optimized.jpg",
    heroAlt: "Food waste reduction tips",
    href: "/top-10-tip-to-reduce-food-waste",
  },
  {
    title: "What to do when your baby is sick",
    heroImage: "/articles/what-to-do-when-your-baby-is-sick/shutterstock_1089455099-scaled-optimized.jpg",
    heroAlt: "Parent caring for sick baby",
    href: "/what-to-do-when-your-baby-is-sick",
  },
  {
    title: "Annabel Karmel & Baker Street team up for the ultimate Halloween Big Night In!",
    heroImage: "/articles/halloween-kids-party-recipes/monster-burgers-food.jpg",
    heroAlt: "Halloween Big Night In with Baker Street",
    href: "/halloween-kids-party-recipes",
  },
];

const thirdPageArticles: ListingArticle[] = [
  {
    title: "All Recipes",
    heroImage: "/articles/annabels-top-15-recipes/babys-first-bolognese.jpg",
    heroAlt: "Children reading recipe book",
    href: "/all-recipes",
  },
  {
    title: "10 healthy & nutritious lunchbox ideas",
    heroImage: "/articles/10-healthy-nutritious-lunchbox-ideas/cheese-cherry-tomato-muffins.jpg",
    heroAlt: "Healthy lunchbox ideas",
    href: "/10-healthy-nutritious-lunchbox-ideas",
  },
  {
    title: "10 Quick & Easy Pasta Recipes for Baby",
    heroImage: "/articles/pasta-recipes-for-baby/babys-first-bolognese-sauce.jpg",
    heroAlt: "Pasta recipes for baby",
    href: "/pasta-recipes-for-baby",
  },
  {
    title: "Annabel’s Top 10 Summer Baby Purees",
    heroImage: "/articles/annabels-top-10-summer-baby-purees/blueberry-pear-banana-puree.jpg",
    heroAlt: "Summer baby puree",
    href: "/annabels-top-10-summer-baby-purees",
  },
  {
    title: "What spices can you give to your baby?",
    heroImage: "/articles/what-spices-can-you-give-to-your-baby/how-to-introduce-spices.jpg",
    heroAlt: "Baby-safe spices",
    href: "/what-spices-can-you-give-to-your-baby",
  },
  {
    title: "Budget-friendly recipes for a healthy, balanced diet",
    heroImage: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/carrot-coconut-raisin-bites.jpg",
    heroAlt: "Budget-friendly healthy recipes",
    href: "/budget-friendly-recipes-for-a-healthy-balanced-diet",
  },
  {
    title: "10 easy BBQ recipes to try this Summer",
    heroImage: "/articles/10-easy-bbq-recipes-to-try-this-summer/chicken-on-the-griddle.jpg",
    heroAlt: "BBQ recipes",
    href: "/10-easy-bbq-recipes-to-try-this-summer",
  },
  {
    title: "Quick & Nutritious Recipes for Baby & Toddler",
    heroImage: "/articles/weaning-recipes-with-piccolo-cherry-tomatoes/cherry-tomato-mascarpone-risotto.jpg",
    heroAlt: "Quick and nutritious baby and toddler recipes",
    href: "/weaning-recipes-with-piccolo-cherry-tomatoes",
  },
  {
    title: "Top foodie tips for boosting yours and your child’s immune system",
    heroImage: "/articles/boost-your-childs-immune-system/blueberries.jpg",
    heroAlt: "Immune-boosting foods",
    href: "/boost-your-childs-immune-system",
  },
  {
    title: "Rich in flavour, zero salt family recipes",
    heroImage: "/articles/zero-salt-family-recipes/leek-mushroom-puff-pastry-pie.jpg",
    heroAlt: "Zero salt family recipes",
    href: "/zero-salt-family-recipes",
  },
];

const fourthPageArticles: ListingArticle[] = [
  {
    title: "Annabel's Top 10 Finger Food Recipes",
    heroImage: "/articles/annabels-top-10-finger-food-recipes/broccoli-chicken-potato-bites.png",
    heroAlt: "Finger food recipes",
    href: "/annabels-top-10-finger-food-recipes",
  },
  {
    title: "Meatless Iron Rich Purees",
    heroImage: "/articles/meatless-iron-rich-purees/banana-avocado-blueberry-puree.jpg",
    heroAlt: "Meatless iron rich purees",
    href: "/meatless-iron-rich-purees",
  },
  {
    title: "Beat rising food prices with Annabel's money saving tips for family cooking",
    heroImage: "/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/batch-cook.jpg",
    heroAlt: "Money saving family cooking tips",
    href: "/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking",
  },
  {
    title: "Perfect pasta dishes for baby, toddler & family",
    heroImage: "/articles/perfect-pasta-dishes-for-baby-toddler-family/annabels-mighty-mac-n-cheese.jpg",
    heroAlt: "Perfect pasta dishes for family",
    href: "/perfect-pasta-dishes-for-baby-toddler-family",
  },
  {
    title: "Annabel’s Digital Weaning Course",
    heroImage: "/articles/annabels-digital-weaning-course/hero.png",
    heroAlt: "Annabel digital weaning course",
    href: "/annabels-digital-weaning-course",
  },
  {
    title: "Starting to wean",
    heroImage: "/articles/starting-to-wean-2/hero.jpg",
    heroAlt: "Starting to wean",
    href: "/starting-to-wean-2",
  },
  {
    title: "Introducing allergenic foods",
    heroImage: "/articles/introducing-allergenic-foods/hero.jpg",
    heroAlt: "Introducing allergenic foods",
    href: "/introducing-allergenic-foods",
  },
  {
    title: "Foods to avoid",
    heroImage: "/articles/foods-to-avoid-2/hero.jpg",
    heroAlt: "Foods to avoid",
    href: "/foods-to-avoid-2",
  },
  {
    title: "Best first foods",
    heroImage: "/articles/best-first-foods-2/hero.jpg",
    heroAlt: "Best first foods",
    href: "/best-first-foods-2",
  },
  {
    title: "Autism and Eating: How can your child’s ASD impact their diet?",
    heroImage: "/articles/how-can-your-childs-asd-impact-on-their-diet-autism-and-eating/hero.jpg",
    heroAlt: "Autism and eating",
    href: "/how-can-your-childs-asd-impact-on-their-diet-autism-and-eating",
  },
];

const fifthPageArticles: ListingArticle[] = [
  {
    title: "Get the kids in the kitchen",
    heroImage: "/articles/get-kids-kitchen/hero.png",
    heroAlt: "Kids in the kitchen",
    href: "/get-kids-kitchen",
  },
  {
    title: "Enjoy Summer 2021 at Sani Resort, Greece",
    heroImage: "/articles/enjoy-summer-2021-sani-resort-greece/hero.png",
    heroAlt: "Sani Resort 2021",
    href: "/enjoy-summer-2021-sani-resort-greece",
  },
  {
    title: "Development Milestones for Toddlers – what to expect",
    heroImage: "/articles/development-milestones-toddlers-expect/hero.png",
    heroAlt: "Development milestones for toddlers",
    href: "/development-milestones-toddlers-expect",
  },
  {
    title: "Bringing the classroom to the kitchen!",
    heroImage: "/articles/bringing-classroom-kitchen/baked-granola-cups.jpg",
    heroAlt: "Bringing the classroom to the kitchen",
    href: "/bringing-classroom-kitchen",
  },
  {
    title: "A Dairy-free Diet for Cow’s Milk Protein Allergy",
    heroImage: "/articles/cows-milk-protein-allergy/hero.jpg",
    heroAlt: "Cow's milk protein allergy",
    href: "/cows-milk-protein-allergy",
  },
  {
    title: "A birthday spread fit for a prince",
    heroImage: "/articles/birthday-spread-fit-prince/birthday-train-cake.jpg",
    heroAlt: "Birthday spread fit for a prince",
    href: "/birthday-spread-fit-prince",
  },
  {
    title: "A balanced diet throughout your trimesters",
    heroImage: "/articles/balanced-diet-throughout-trimesters/hero.jpg",
    heroAlt: "Balanced diet throughout trimesters",
    href: "/balanced-diet-throughout-trimesters",
  },
  {
    title: "Food Allergies with Professor Adam Fox",
    heroImage: "/articles/allergies-with-professor-adam-fox/hero.jpg",
    heroAlt: "Food allergies with Professor Adam Fox",
    href: "/allergies-with-professor-adam-fox",
  },
  {
    title: "Weaning Equipment – Getting your kitchen ready for weaning",
    heroImage: "/articles/weaning-equipment-getting-kitchen-ready-weaning/kitchen-essentials.jpg",
    heroAlt: "Weaning equipment",
    href: "/weaning-equipment-getting-kitchen-ready-weaning",
  },
  {
    title: "Healthy ‘fast’ food swaps for less ‘naughty’ and more nutritious mealtimes",
    heroImage: "/articles/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes/hero.jpg",
    heroAlt: "Healthy fast food swaps",
    href: "/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes",
  },
  {
    title: "10 Perfect Pancake Recipes",
    heroImage: "/articles/pancake-recipes/yoghurt-pancakes.jpg",
    heroAlt: "Delicious pancake recipes",
    href: "/pancake-recipes",
  },
];

const firstPageArticles: ListingArticle[] = [
  {
    title: "The Best Foods to Help Your Baby Sleep",
    heroImage: "/articles/best-foods-to-help-your-baby-sleep/hero.png",
    heroAlt: "Baby resting peacefully",
    href: "/best-foods-to-help-your-baby-sleep",
  },
  {
    title: "Haunted Toast Toppers",
    heroImage: "/articles/haunted-toast-toppers/hero.png",
    heroAlt: "Halloween toast toppers",
    href: "/haunted-toast-toppers",
  },
  {
    title: "6 tips for getting out and about with baby",
    heroImage: "/articles/6-tips-for-getting-out-and-about-with-baby/hero.jpg",
    heroAlt: "Family outdoors with baby",
    href: "/6-tips-for-getting-out-and-about-with-baby",
  },
  {
    title: "Get your FREE top 50 First Foods Checklist",
    heroImage: "/articles/get-your-free-top-50-first-foods-list/hero.jpg",
    heroAlt: "Baby first foods checklist",
    href: "/get-your-free-top-50-first-foods-list",
  },
  {
    title: "Tips on how to keep baby hydrated!",
    heroImage: "/articles/tips-on-how-to-keep-baby-hydrated/hero.jpg",
    heroAlt: "Baby drinking water",
    href: "/tips-on-how-to-keep-baby-hydrated",
  },
  {
    title: "Starting solids: Top tips on how to transition from milk to solid food",
    heroImage: "/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/hero.jpg",
    heroAlt: "Baby trying first foods",
    href: "/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food",
  },
  {
    title: "Your guide to supporting baby's gut health",
    heroImage: "/articles/your-guide-to-supporting-babys-gut-health/hero.jpg",
    heroAlt: "Colourful healthy ingredients",
    href: "/your-guide-to-supporting-babys-gut-health",
  },
  {
    title: "Fibre intake for babies – what you need to know!",
    heroImage: "/articles/fibre-intake-for-babies-what-you-need-to-know/hero.jpg",
    heroAlt: "Fibre rich ingredients",
    href: "/fibre-intake-for-babies-what-you-need-to-know",
  },
  {
    title: "Pedal Power!",
    heroImage: "/articles/pedal-power/hero.jpg",
    heroAlt: "Child riding a bike",
    href: "/pedal-power",
  },
  {
    title: "Annabel's 6 family favourites with HECK!",
    heroImage: "/articles/annabels-6-family-favourites-with-heck/hero.jpg",
    heroAlt: "Family meal recipes with HECK",
    href: "/annabels-6-family-favourites-with-heck",
  },
];

const curatedPageArticles: Record<number, ListingArticle[]> = {
  1: firstPageArticles,
  2: secondPageArticles,
  3: thirdPageArticles,
  4: fourthPageArticles,
  5: fifthPageArticles,
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawPageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const requestedPage = Number.parseInt(rawPageParam ?? "1", 10);

  const pageSize = 10;
  const curatedPages = Object.keys(curatedPageArticles).map((key) => Number.parseInt(key, 10));
  const totalPages = curatedPages.length ? Math.max(...curatedPages) : 1;
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const defaultVisibleArticles: ListingArticle[] = articleIndex
    .slice(startIndex, startIndex + pageSize)
    .map((article) => ({
      title: article.title,
      heroImage: article.heroImage,
      heroAlt: article.heroAlt,
      href: `/${article.slug}`,
    }));
  const visibleArticles = curatedPageArticles[currentPage] ?? defaultVisibleArticles;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <h1 className="mt-2 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#3a3a3a] md:text-[52px]">
            Articles
          </h1>
          <p className="mx-auto mt-7  [font-family:var(--font-montserrat)] text-[22px] leading-[1.55] text-[#514a52] md:text-[19px]">
            All the latest news, views and information from the world of Annabel Karmel, including articles of
            interest for mums, dads and the whole family.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 pb-6 sm:px-6 lg:px-8">
          <article className="overflow-hidden border border-[#e8e1e3] bg-[#f4eef0]">
            <div className="grid grid-cols-1 md:grid-cols-[1.95fr_1fr]">
              <div className="p-6 md:p-8">
                <h2 className="[font-family:var(--font-playfair)] text-[34px] font-semibold leading-[1.08] text-[#161418] md:text-[50px]">
                  {featuredExperts.title}
                </h2>
                <p className="mt-5 max-w-[760px] [font-family:var(--font-montserrat)] text-[21px] leading-[1.4] text-[#514a52] md:text-[20px]">
                  {featuredExperts.description}
                </p>
                <a
                  href={featuredExperts.ctaHref}
                  className="mt-7 inline-flex items-center rounded-[4px] bg-[#6f7987] px-[13px] py-[13px] [font-family:var(--font-montserrat)] text-[18px] font-medium text-white transition-colors hover:bg-[#626c79]"
                >
                  <span className="text-[18px] text-white md:text-[20px]">{featuredExperts.ctaLabel}</span>
                </a>
              </div>
              <img
                src={featuredExperts.image}
                alt="Featured experts"
                className="h-[280px] w-full bg-[#f4eef0] object-cover object-center md:h-[360px]"
              />
            </div>
          </article>
        </section>

        <section id="articles-list" className="mx-auto w-full max-w-[1120px] scroll-mt-[120px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-18 md:gap-16">
            {visibleArticles.map((article) => (
              <article
                key={article.href}
                className="grid grid-cols-1 items-center justify-items-center gap-6 text-center md:grid-cols-[300px_1fr] md:justify-items-stretch md:gap-18 md:text-left"
              >
                <Link href={article.href} className="mx-auto block w-full max-w-[300px] md:mx-0">
                  <img
                    src={article.heroImage}
                    alt={article.heroAlt}
                    className="h-[220px] w-full object-cover md:h-[210px]"
                  />
                </Link>
                <div>
                  {/* <p className="mb-2 [font-family:var(--font-montserrat)] text-[13px] uppercase tracking-[0.08em] text-[#8a7a7f]">
                    {article.category}
                  </p> */}
                  <h3 className="[font-family:var(--font-playfair)] text-[35px] leading-[1.2] text-[#2f2d35] md:text-[45px]">
                    <Link href={article.href} className="hover:text-[#8f2f58]">
                      {article.title}
                    </Link>
                  </h3>
                  {/* <p className="mt-4 max-w-[760px] [font-family:var(--font-montserrat)] text-[17px] leading-[1.6] text-[#514a52] md:text-[18px]">
                    {article.intro}
                  </p> */}
                  <Link
                    href={article.href}
                    className="mt-6 inline-flex items-center rounded-[4px] bg-[#6f7987] px-[13px] py-2 [font-family:var(--font-montserrat)] text-[14px] font-medium text-white transition-colors hover:bg-[#626c79]"
                  >
                    <span className="text-[15px] text-white md:text-[18px]">Read More</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <nav
            className="mt-12 flex flex-wrap items-center justify-center gap-2 [font-family:var(--font-montserrat)] text-[15px] text-[#373136]"
            aria-label="Articles pagination"
          >
            {prevPage ? (
              <Link
                href={`/category/articles?page=${prevPage}#articles-list`}
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-[4px] border border-[#e8e1e3] bg-white px-3 font-medium text-[#373136] transition-colors hover:border-[#8f2f58] hover:bg-[#f4eef0] hover:text-[#8f2f58] sm:px-4"
                aria-label="Previous page"
              >
                &laquo;<span className="hidden sm:ml-1 sm:inline">Previous</span>
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-[4px] border border-[#ece5e7] bg-[#f8f5f6] px-3 font-medium text-[#bdb4b8] sm:px-4"
              >
                &laquo;<span className="hidden sm:ml-1 sm:inline">Previous</span>
              </span>
            )}
            <ol className="m-0 flex list-none items-center gap-2 p-0">
              {(() => {
                const windowSize = 5;
                const half = Math.floor(windowSize / 2);
                let start = Math.max(1, currentPage - half);
                const end = Math.min(totalPages, start + windowSize - 1);
                start = Math.max(1, end - windowSize + 1);
                return Array.from({ length: end - start + 1 }, (_, i) => {
                  const pageNumber = start + i;
                  const isActive = pageNumber === currentPage;
                  return (
                    <li key={pageNumber}>
                      <Link
                        href={`/category/articles?page=${pageNumber}#articles-list`}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={`Page ${pageNumber}${isActive ? ", current page" : ""}`}
                        className={`inline-flex h-10 min-w-10 items-center justify-center rounded-[4px] border px-3 font-semibold transition-colors ${
                          isActive
                            ? "border-[#8f2f58] bg-[#8f2f58] text-white! shadow-[0_1px_0_rgba(143,47,88,0.25)]"
                            : "border-[#e8e1e3] bg-white text-[#373136] hover:border-[#8f2f58] hover:bg-[#f4eef0] hover:text-[#8f2f58]"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    </li>
                  );
                });
              })()}
            </ol>
            {nextPage ? (
              <Link
                href={`/category/articles?page=${nextPage}#articles-list`}
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-[4px] border border-[#e8e1e3] bg-white px-3 font-medium text-[#373136] transition-colors hover:border-[#8f2f58] hover:bg-[#f4eef0] hover:text-[#8f2f58] sm:px-4"
                aria-label="Next page"
              >
                <span className="hidden sm:mr-1 sm:inline">Next</span>&raquo;
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-[4px] border border-[#ece5e7] bg-[#f8f5f6] px-3 font-medium text-[#bdb4b8] sm:px-4"
              >
                <span className="hidden sm:mr-1 sm:inline">Next</span>&raquo;
              </span>
            )}
          </nav>
        </section>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
