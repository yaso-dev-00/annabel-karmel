import { getRecipeListingStub } from '@/lib/recipe-index';

export type RecipePageData = {
  slug: string;
  title: string;
  href: string;
};

export async function getRecipePage(
  slug: string,
): Promise<RecipePageData | null> {
  const stub = await getRecipeListingStub(slug);
  if (!stub) return null;

  return {
    slug,
    title: stub.title,
    href: stub.href.startsWith('/') ? stub.href : `/recipes/${slug}`,
  };
}
