import { notFound } from 'next/navigation';

import {
  getTaxonomiesByKind,
  getTaxonomy,
  type RecipeTaxonomyKind,
} from '@/data/recipe-taxonomies';

import { parseRecipeSearchParams } from '@/lib/recipe-search-url';

import { hasQueryPagination, searchRecipes } from '@/lib/recipe-search';

export function getStaticParamsForKind(kind: RecipeTaxonomyKind) {
  return getTaxonomiesByKind(kind).map((t) => ({ slug: t.slug }));
}

type ResolveOptions = {
  pathPage?: number;

  searchParams?: Record<string, string | string[] | undefined>;
};

export async function resolveRecipeCategoryPage(
  kind: RecipeTaxonomyKind,

  slug: string,

  options: ResolveOptions = {},
) {
  const taxonomy = getTaxonomy(kind, slug);

  if (!taxonomy) {
    notFound();
  }

  const filters = parseRecipeSearchParams(
    options.searchParams ?? {},

    kind,

    slug,

    options.pathPage,
  );

  const result = await searchRecipes(filters);

  const useQueryPagination = hasQueryPagination(
    filters,
    kind,
    options.searchParams ?? {},
  );

  return {
    taxonomy,

    items: result.items,

    total: result.total,

    page: result.page,

    pageSize: result.pageSize,

    basePath: taxonomy.path,

    filters,

    useQueryPagination,
  };
}

export function metadataForTaxonomy(label: string) {
  return {
    title: `${label} | Annabel Karmel`,

    description: `Browse ${label} recipes from Annabel Karmel.`,
  };
}
