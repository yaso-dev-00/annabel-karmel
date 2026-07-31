import type {
  RecipeListingItem,
  RecipeTaxonomyKind,
} from '@/data/recipe-taxonomies';
import { getRecipeListing } from '@/lib/recipe-listings';

export type RecipeSearchFilters = {
  age?: string;
  mealTime?: string;
  freeFrom?: string;
  q?: string;
  page?: number;
};

export type RecipeSearchResult = {
  items: RecipeListingItem[];
  total: number;
  page: number;
  pageSize: number;
};

export const RECIPE_PAGE_SIZE = 24;

type FilterDimension = {
  kind: RecipeTaxonomyKind;
  slug: string;
};

function getActiveDimensions(filters: RecipeSearchFilters): FilterDimension[] {
  const dimensions: FilterDimension[] = [];
  if (filters.age)
    dimensions.push({ kind: 'recipe-category', slug: filters.age });
  if (filters.mealTime)
    dimensions.push({ kind: 'meal-time', slug: filters.mealTime });
  if (filters.freeFrom)
    dimensions.push({ kind: 'allergen', slug: filters.freeFrom });
  return dimensions;
}

function mergeItem(
  existing: RecipeListingItem,
  next: RecipeListingItem,
): RecipeListingItem {
  return {
    slug: existing.slug,
    title: existing.title || next.title,
    href: existing.href || next.href,
    image: existing.image || next.image,
    appExclusive: existing.appExclusive || next.appExclusive,
  };
}

/**
 * Search recipes across taxonomy dimensions. Demo: intersects scraped JSON lists by slug.
 * API: replace this function body with a fetch to your backend using the same filters.
 */
export async function searchRecipes(
  filters: RecipeSearchFilters,
): Promise<RecipeSearchResult> {
  const page = Math.max(1, filters.page ?? 1);
  const dimensions = getActiveDimensions(filters);

  if (dimensions.length === 0) {
    return { items: [], total: 0, page, pageSize: RECIPE_PAGE_SIZE };
  }

  const listings = await Promise.all(
    dimensions.map(async ({ kind, slug }) => ({
      kind,
      slug,
      items: (await getRecipeListing(kind, slug)) ?? [],
    })),
  );

  const itemMap = new Map<string, RecipeListingItem>();
  for (const { items } of listings) {
    for (const item of items) {
      const existing = itemMap.get(item.slug);
      itemMap.set(item.slug, existing ? mergeItem(existing, item) : item);
    }
  }

  let results = listings[0].items.filter((item) => itemMap.has(item.slug));

  for (let i = 1; i < listings.length; i++) {
    const slugSet = new Set(listings[i].items.map((item) => item.slug));
    results = results.filter((item) => slugSet.has(item.slug));
  }

  if (filters.q?.trim()) {
    const query = filters.q.trim().toLowerCase();
    results = results.filter((item) =>
      item.title.toLowerCase().includes(query),
    );
  }

  const total = results.length;
  const start = (page - 1) * RECIPE_PAGE_SIZE;
  const items = results.slice(start, start + RECIPE_PAGE_SIZE);

  return { items, total, page, pageSize: RECIPE_PAGE_SIZE };
}

export function hasSecondaryFilters(
  filters: RecipeSearchFilters,
  primaryKind: RecipeTaxonomyKind,
): boolean {
  if (filters.q?.trim()) return true;

  const ageCount = filters.age ? 1 : 0;
  const mealCount = filters.mealTime ? 1 : 0;
  const freeCount = filters.freeFrom ? 1 : 0;
  const activeCount = ageCount + mealCount + freeCount;

  if (activeCount <= 1) return false;

  if (primaryKind === 'recipe-category')
    return Boolean(filters.mealTime || filters.freeFrom);
  if (primaryKind === 'meal-time')
    return Boolean(filters.age || filters.freeFrom);
  return Boolean(filters.age || filters.mealTime);
}

export function hasQueryPagination(
  filters: RecipeSearchFilters,
  primaryKind: RecipeTaxonomyKind,
  searchParams: Record<string, string | string[] | undefined>,
): boolean {
  if (hasSecondaryFilters(filters, primaryKind)) return true;
  return Object.keys(searchParams).length > 0;
}
