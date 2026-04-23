import { InstagramShareSection } from "@/components/instagram-share-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { articleIndex } from "@/data/article-index";
import Link from "next/link";

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

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawPageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const requestedPage = Number.parseInt(rawPageParam ?? "1", 10);

  const pageSize = 13;
  const totalPages = Math.max(1, Math.ceil(articleIndex.length / pageSize));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleArticles = articleIndex.slice(startIndex, startIndex + pageSize);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <h1 className="mt-2 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#161418] md:text-[52px]">
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
                key={article.slug}
                className="grid grid-cols-1 items-center justify-items-center gap-6 text-center md:grid-cols-[300px_1fr] md:justify-items-stretch md:gap-18 md:text-left"
              >
                <Link href={`/${article.slug}`} className="mx-auto block w-full max-w-[300px] md:mx-0">
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
                    <Link href={`/${article.slug}`} className="hover:text-[#8f2f58]">
                      {article.title}
                    </Link>
                  </h3>
                  {/* <p className="mt-4 max-w-[760px] [font-family:var(--font-montserrat)] text-[17px] leading-[1.6] text-[#514a52] md:text-[18px]">
                    {article.intro}
                  </p> */}
                  <Link
                    href={`/${article.slug}`}
                    className="mt-6 inline-flex items-center rounded-[4px] bg-[#6f7987] px-5 py-2 [font-family:var(--font-montserrat)] text-[14px] font-medium text-white transition-colors hover:bg-[#626c79]"
                  >
                    <span className="text-[14px] text-white md:text-[16px]">Read More</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <nav
            className="mt-12 flex items-center justify-center gap-4 [font-family:var(--font-montserrat)] text-[16px] text-[#373136]"
            aria-label="Articles pagination"
          >
            {prevPage ? (
              <Link href={`/category/articles?page=${prevPage}`} className="font-semibold hover:text-[#8f2f58]">
                &laquo; Previous
              </Link>
            ) : (
              <span className="opacity-40">&laquo; Previous</span>
            )}
            <ol className="m-0 flex list-none items-center gap-3 p-0">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                return (
                  <li key={pageNumber}>
                    <Link
                      href={`/category/articles?page=${pageNumber}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`font-semibold ${
                        isActive ? "text-[#8f2f58] underline underline-offset-4" : "hover:text-[#8f2f58]"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                );
              })}
            </ol>
            {nextPage ? (
              <Link href={`/category/articles?page=${nextPage}`} className="font-semibold hover:text-[#8f2f58]">
                Next &raquo;
              </Link>
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
