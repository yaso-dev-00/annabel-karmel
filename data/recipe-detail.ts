export type RecipeTaxonomyLink = {
  label: string;
  href: string;
};

export type RecipeDetail = {
  slug: string;
  title: string;
  href: string;
  image: string;
  description: string;
  appExclusive?: boolean;
  allergens: RecipeTaxonomyLink[];
  ages: RecipeTaxonomyLink[];
  suitableForFreezing: boolean;
  prepTime?: string;
  cookTime?: string;
  portions?: string;
  ingredients: string[];
  method: string[];
  breadcrumb?: RecipeTaxonomyLink[];
};
