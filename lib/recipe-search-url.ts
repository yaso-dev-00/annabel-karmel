import type { RecipeTaxonomyKind } from '@/data/recipe-taxonomies';
import type { RecipeSearchFilters } from '@/lib/recipe-search';

function pickParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = searchParams[key];
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export function parseRecipeSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
  primaryKind: RecipeTaxonomyKind,
  primarySlug: string,
  pathPage?: number,
): RecipeSearchFilters {
  const filters: RecipeSearchFilters = {};

  if (primaryKind === 'recipe-category') {
    filters.age = primarySlug;
  } else if (primaryKind === 'meal-time') {
    filters.mealTime = primarySlug;
  } else {
    filters.freeFrom = primarySlug;
  }

  const ageParam = pickParam(searchParams, 'age');
  const mealParam = pickParam(searchParams, 'meal-time');
  const freeParam = pickParam(searchParams, 'free-from');
  const q = pickParam(searchParams, 'q');
  const pageParam = pickParam(searchParams, 'page');

  if (primaryKind !== 'recipe-category' && ageParam) {
    filters.age = ageParam;
  }
  if (primaryKind !== 'meal-time' && mealParam) {
    filters.mealTime = mealParam;
  }
  if (primaryKind !== 'allergen' && freeParam) {
    filters.freeFrom = freeParam;
  }
  if (q) {
    filters.q = q;
  }

  const pageFromQuery = pageParam ? Number.parseInt(pageParam, 10) : undefined;
  filters.page =
    pageFromQuery && Number.isFinite(pageFromQuery) && pageFromQuery > 0
      ? pageFromQuery
      : pathPage && pathPage > 0
        ? pathPage
        : 1;

  return filters;
}

export function buildRecipeListingUrl(filters: RecipeSearchFilters): string {
  const { age, mealTime, freeFrom, q, page } = filters;
  const query = new URLSearchParams();

  let base = '/recipe-category/family-recipes';

  if (age) {
    base = `/recipe-category/${age}`;
    if (mealTime) query.set('meal-time', mealTime);
    if (freeFrom) query.set('free-from', freeFrom);
  } else if (mealTime) {
    base = `/meal-time/${mealTime}`;
    if (freeFrom) query.set('free-from', freeFrom);
  } else if (freeFrom) {
    base = `/allergen/${freeFrom}`;
  }

  if (q?.trim()) {
    query.set('q', q.trim());
  }
  if (page && page > 1) {
    query.set('page', String(page));
  }

  const qs = query.toString();
  return qs ? `${base}?${qs}` : base;
}

export function buildPaginationHref(
  basePath: string,
  filters: RecipeSearchFilters,
  page: number,
  useQueryPagination: boolean,
): string {
  if (!useQueryPagination) {
    return page === 1 ? basePath : `${basePath}/page/${page}`;
  }

  return buildRecipeListingUrl({ ...filters, page });
}

export function filtersToFinderValues(filters: RecipeSearchFilters) {
  return {
    age: filters.age ?? '',
    mealTime: filters.mealTime ?? '',
    freeFrom: filters.freeFrom ?? '',
    q: filters.q ?? '',
  };
}
