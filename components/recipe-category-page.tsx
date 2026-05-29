import Link from "next/link";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { RecipeFinder } from "@/components/recipe-finder";
import { RecipeListingGrid } from "@/components/recipe-listing-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { RecipeListingItem, RecipeTaxonomy } from "@/data/recipe-taxonomies";
import { buildPaginationHref } from "@/lib/recipe-search-url";
import type { RecipeSearchFilters } from "@/lib/recipe-search";

type RecipeCategoryPageProps = {
  taxonomy: RecipeTaxonomy;
  items: RecipeListingItem[];
  total: number;
  page?: number;
  pageSize: number;
  basePath: string;
  filters: RecipeSearchFilters;
  useQueryPagination: boolean;
};

const pageLinkClass =
  "inline-flex min-w-10 items-center justify-center rounded border border-[#e8dde1] px-3.5 py-2 font-[family-name:var(--font-body)] text-base text-[#3a3a3a] no-underline hover:border-[var(--hover-color)] hover:text-[var(--hover-color)]";

const pageLinkActiveClass =
  "border-[#efcfd8] bg-[#fff4f7] font-semibold text-[#b34769] hover:border-[#efcfd8] hover:text-[#b34769]";

export function RecipeCategoryPage({
  taxonomy,
  items,
  total,
  page = 1,
  pageSize,
  basePath,
  filters,
  useQueryPagination,
}: RecipeCategoryPageProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <RecipeFinder taxonomy={taxonomy} initialFilters={filters} />
        <article className="mx-auto w-full max-w-[1200px] px-3.5 pb-[54px] pt-[60px]">
          <h1 className="mb-[50px] text-center font-[family-name:var(--font-display)] text-[40px] font-medium leading-[1.12] text-[#3a3a3a] max-[900px]:mb-10 max-[900px]:text-[32px]">
            {taxonomy.label}
          </h1>
          {items.length > 0 ? (
            <RecipeListingGrid items={items} />
          ) : (
            <p className="m-0 text-center font-[family-name:var(--font-body)] text-lg leading-[1.45] text-[#3f3841]">
              No recipes found. Try adjusting your filters or search.
            </p>
          )}
          {totalPages > 1 ? (
            <nav className="mt-[60px] flex flex-wrap justify-center gap-3" aria-label="Recipe pages">
              {Array.from({ length: totalPages }, (_, i) => {
                const n = i + 1;
                const href = buildPaginationHref(basePath, filters, n, useQueryPagination);
                const isActive = n === currentPage;
                return (
                  <Link
                    key={n}
                    href={href}
                    className={`${pageLinkClass} ${isActive ? pageLinkActiveClass : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {n}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </article>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}

export { RECIPE_PAGE_SIZE as PAGE_SIZE } from "@/lib/recipe-search";
