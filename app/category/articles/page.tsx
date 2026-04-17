import { InstagramShareSection } from "@/components/instagram-share-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type DemoArticle = {
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

type ArticlesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const featuredExperts = {
  title: "Meet Our Experts",
  description:
    "We’ve partnered with top UK experts to give you the latest first-hand advice on all those important areas in raising happy, healthy babies, children & parents! From allergies to breast and bottle feeding, sleep to post-natal care and wellness, we’ve got your questions and concerns covered.",
  ctaLabel: "Meet Our Experts",
  ctaHref: "/meet-our-experts",
  image: "/articles/Experts-1-optimized.jpg",
};

const demoArticles: DemoArticle[] = [
  {
    title: "The Best Foods to Help Your Baby Sleep",
    excerpt: "Simple nutrition swaps and bedtime meal ideas to support better rest for little ones.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "6 Tips for Getting Out and About with Baby",
    excerpt: "Practical planning tips for stress-free days out, snacks, and meal prep on the go.",
    href: "#article-2",
    image: "/hero-slides/slide-2.png",
  },
  {
    title: "Starting Solids: Top Transition Tips",
    excerpt: "A clear, confidence-building guide for moving from milk feeds to family foods.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Your Guide to Supporting Baby's Gut Health",
    excerpt: "How fiber, hydration, and varied ingredients can support digestive comfort.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Tips to Keep Baby Hydrated",
    excerpt: "What to offer, how often, and easy high-water food ideas for warm days.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Fibre Intake for Babies: What You Need to Know",
    excerpt: "Balanced ways to increase fibre while keeping textures age-appropriate.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pedal Power! Family Fuel for Busy Days",
    excerpt: "Quick prep lunches and dinners for active little ones and after-school appetite spikes.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Annabel's x HECK! Recipe Bangers",
    excerpt: "Flavor-packed meal ideas using simple ingredients and child-friendly textures.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Get Your FREE Top 50 First Foods Checklist",
    excerpt: "A practical starting point for introducing solids with confidence and variety.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Haunted Toast Toppers",
    excerpt: "Playful, spooky snack ideas that are easy to make and great for fussy eaters.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Summer Picnic Recipes Kids Will Love",
    excerpt: "Portable, balanced options for family picnics and warm-weather weekends.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
  },
];

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawPageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const requestedPage = Number.parseInt(rawPageParam ?? "1", 10);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(demoArticles.length / pageSize));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleArticles = demoArticles.slice(startIndex, startIndex + pageSize);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1120px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          {/* <p className="[font-family:var(--font-montserrat)] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8d4a67]">
            Latest News | Views | Information
          </p> */}
          <h1 className="mt-2 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#161418] md:text-[52px]">
            Articles
          </h1>
          <p className="mx-auto mt-7 max-w-[840px] [font-family:var(--font-montserrat)] text-[22px] leading-[1.55] text-[#514a52] md:text-[19px]">
            All the latest news, views and information from the world of Annabel Karmel, including articles of
            interest for mums, dads and the whole family.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-6 sm:px-6 lg:px-8">
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
                  className="mt-7 inline-flex items-center rounded-[4px] bg-[#6f7987] px-5 py-2 [font-family:var(--font-montserrat)] text-[18px] font-medium text-white transition-colors hover:bg-[#626c79]"
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

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-18 md:gap-16">
            {visibleArticles.map((article) => (
              <article
                key={article.title}
                className="grid grid-cols-1 items-center justify-items-center gap-6 text-center md:grid-cols-[300px_1fr] md:justify-items-stretch md:gap-18 md:text-left"
              >
                <a href={article.href} className="mx-auto block w-full max-w-[300px] md:mx-0">
                  <img src={article.image} alt={article.title} className="h-[220px] w-full object-cover md:h-[210px]" />
                </a>
                <div>
                  <h3 className="[font-family:var(--font-playfair)] text-[35px] leading-[1.2] text-[#2f2d35] md:text-[45px]">
                    {article.title}
                  </h3>
                  <a
                    href={article.href}
                    className="mt-6 inline-flex items-center rounded-[4px] bg-[#6f7987] px-5 py-2 [font-family:var(--font-montserrat)] text-[14px] font-medium text-white transition-colors hover:bg-[#626c79]"
                  >
                    <span className="text-[14px] text-white md:text-[16px]">Read More</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <nav
            className="mt-12 flex items-center justify-center gap-4 [font-family:var(--font-montserrat)] text-[16px] text-[#373136]"
            aria-label="Articles pagination"
          >
            {prevPage ? (
              <a href={`/category/articles?page=${prevPage}`} className="font-semibold hover:text-[#8f2f58]">
                &laquo; Previous
              </a>
            ) : (
              <span className="opacity-40">&laquo; Previous</span>
            )}
            <ol className="m-0 flex list-none items-center gap-3 p-0">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                return (
                  <li key={pageNumber}>
                    <a
                      href={`/category/articles?page=${pageNumber}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`font-semibold ${
                        isActive ? "text-[#8f2f58] underline underline-offset-4" : "hover:text-[#8f2f58]"
                      }`}
                    >
                      {pageNumber}
                    </a>
                  </li>
                );
              })}
            </ol>
            {nextPage ? (
              <a href={`/category/articles?page=${nextPage}`} className="font-semibold hover:text-[#8f2f58]">
                Next &raquo;
              </a>
            ) : (
              <span className="opacity-40">Next &raquo;</span>
            )}
          </nav>
        </section>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
