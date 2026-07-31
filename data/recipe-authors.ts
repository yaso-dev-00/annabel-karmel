export type RecipeAuthorOption = {
  id: string;
  email: string;
  name: string;
};

/** CMS author options for recipe assignment (WordPress-style Author box). */
export const RECIPE_AUTHORS: RecipeAuthorOption[] = [
  {
    id: 'annabel-karmel',
    email: 'annabel@annabelkarmel.com',
    name: 'Annabel Karmel',
  },
  {
    id: 'imogenr',
    email: 'imogenr@annabelkarmel.com',
    name: 'Imogen',
  },
  {
    id: 'content-team',
    email: 'content@annabelkarmel.com',
    name: 'Content Team',
  },
];

export function formatRecipeAuthorLabel(author: RecipeAuthorOption): string {
  return `${author.email} (${author.name})`;
}

export function getRecipeAuthorById(
  id: string | undefined | null,
): RecipeAuthorOption | undefined {
  if (!id) return undefined;
  return RECIPE_AUTHORS.find((author) => author.id === id);
}
