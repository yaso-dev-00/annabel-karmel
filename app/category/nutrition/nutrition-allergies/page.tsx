import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { ListingPaginationScroll } from "@/components/ArticleScreen/ListingPaginationScroll";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { Suspense } from "react";
import {
  nutritionAllergiesPageOne,
  nutritionAllergiesPageTwo,
  type NutritionAllergiesListingArticle,
} from "@/data/nutrition-allergies-listing";
import { enrichListingArticle } from "@/data/resolve-article-listing";
import Link from "next/link";
import styles from "./page.module.css";

type AllergiesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const AK_UPLOADS = "https://www.annabelkarmel.com/wp-content/uploads";
const ANNABEL_ORIGIN = "https://www.annabelkarmel.com";

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

const curatedPageArticles: Record<number, NutritionAllergiesListingArticle[]> = {
  1: nutritionAllergiesPageOne,
  2: nutritionAllergiesPageTwo,
};

const totalPages = 2;
const basePath = "/category/nutrition/nutrition-allergies";

export default async function AllergiesNutritionPage({ searchParams }: AllergiesPageProps) {
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
      <Suspense fallback={null}>
        <ListingPaginationScroll />
      </Suspense>
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-4 pb-8 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <p className="[font-family:var(--font-montserrat)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a7a7f]">
            Nutrition
          </p>
          <h1 className="mt-3 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#161418] md:text-[52px]">
            Allergies
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] [font-family:var(--font-montserrat)] text-[19px] leading-[1.55] text-[#514a52] md:text-[20px]">
            Expert advice on food allergies, intolerances, and introducing allergens — to help you confidently navigate
            mealtimes and keep your child safe and thriving.
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

        <section className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div id="articles-list" className="scroll-mt-[120px]">
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
              More Allergies articles for this page are coming soon.
            </div>
          )}
          </div>

          <nav className={styles.pagination} aria-label="Allergies pagination">
            {prevPage ? (
              <Link
                href={`${basePath}?page=${prevPage}`}
                scroll={false}
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
                      href={`${basePath}?page=${pageNumber}`}
                      scroll={false}
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
                href={`${basePath}?page=${nextPage}`}
                scroll={false}
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
