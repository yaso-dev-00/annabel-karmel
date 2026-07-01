import {
  recipeFinderAgeOptions,
  recipeFinderFreeFromOptions,
  recipeFinderMealTimeOptions,
} from "@/data/recipe-finder-options";

export type RecipeListingItem = {
  slug: string;
  title: string;
  href: string;
  image: string;
  appExclusive?: boolean;
};

export type RecipeTaxonomyKind = "recipe-category" | "meal-time" | "allergen";

export type RecipeTaxonomy = {
  kind: RecipeTaxonomyKind;
  slug: string;
  label: string;
  path: string;
  sourceUrl: string;
};

const BASE = "https://www.annabelkarmel.com";

function taxonomy(
  kind: RecipeTaxonomyKind,
  slug: string,
  label: string,
  segment: string,
): RecipeTaxonomy {
  const path = `/${segment}/${slug}`;
  return {
    kind,
    slug,
    label,
    path,
    sourceUrl: `${BASE}${path}/`,
  };
}

export const byAge: RecipeTaxonomy[] = [
  taxonomy("recipe-category", "first-foods", "First Foods", "recipe-category"),
  taxonomy("recipe-category", "6-9-months-recipes", "6 Months +", "recipe-category"),
  taxonomy("recipe-category", "9-12-months", "9–12 months", "recipe-category"),
  taxonomy("recipe-category", "12-18-months", "12–18 months", "recipe-category"),
  taxonomy("recipe-category", "18-months", "18 Months +", "recipe-category"),
  taxonomy("recipe-category", "family-recipes", "Family", "recipe-category"),
];

export const mealTimes: RecipeTaxonomy[] = [
  taxonomy("meal-time", "all-meal-times", "All Meal Times", "meal-time"),
  taxonomy("meal-time", "breakfast", "Breakfast", "meal-time"),
  taxonomy("meal-time", "snack", "Snacks", "meal-time"),
  taxonomy("meal-time", "main-meals", "Main Meals", "meal-time"),
  taxonomy("meal-time", "dessert-recipes", "Desserts", "meal-time"),
  taxonomy("meal-time", "weaning", "Weaning", "meal-time"),
];

export const freeFrom: RecipeTaxonomy[] = [
  taxonomy("allergen", "vegan", "Plant Based", "allergen"),
  taxonomy("allergen", "vegetarian", "Vegetarian", "allergen"),
  taxonomy("allergen", "dairy-free-recipes", "Dairy Free", "allergen"),
  taxonomy("allergen", "egg-free-recipes", "Egg Free", "allergen"),
  taxonomy("allergen", "gluten-free-recipes", "Gluten Free", "allergen"),
  taxonomy("allergen", "nut-free-recipes", "Nut Free", "allergen"),
];

export const recipesArchiveTaxonomy: RecipeTaxonomy = {
  kind: "recipe-category",
  slug: "recipes-archive",
  label: "Recipes",
  path: "/recipes",
  sourceUrl: "https://www.annabelkarmel.com/recipes/",
};

export const allRecipeTaxonomies: RecipeTaxonomy[] = [...byAge, ...mealTimes, ...freeFrom];

function segmentForKind(kind: RecipeTaxonomyKind): string {
  switch (kind) {
    case "recipe-category":
      return "recipe-category";
    case "meal-time":
      return "meal-time";
    case "allergen":
      return "allergen";
  }
}

function finderOptionsForKind(kind: RecipeTaxonomyKind) {
  switch (kind) {
    case "recipe-category":
      return recipeFinderAgeOptions;
    case "meal-time":
      return recipeFinderMealTimeOptions;
    case "allergen":
      return recipeFinderFreeFromOptions;
  }
}

export function getTaxonomy(kind: RecipeTaxonomyKind, slug: string): RecipeTaxonomy | undefined {
  const found = allRecipeTaxonomies.find((t) => t.kind === kind && t.slug === slug);
  if (found) return found;

  const option = finderOptionsForKind(kind).find((item) => item.slug === slug);
  if (!option) return undefined;

  return taxonomy(kind, option.slug, option.label, segmentForKind(kind));
}

export function getTaxonomiesByKind(kind: RecipeTaxonomyKind): RecipeTaxonomy[] {
  switch (kind) {
    case "recipe-category":
      return byAge;
    case "meal-time":
      return mealTimes;
    case "allergen":
      return freeFrom;
  }
}

export function listingDataKey(taxonomy: RecipeTaxonomy): string {
  return `${taxonomy.kind}-${taxonomy.slug}`;
}

/** Home recipe finder option label → category path */
export const recipeFinderPaths = {
  age: Object.fromEntries(
    recipeFinderAgeOptions.map((option) => [
      option.label,
      `/recipe-category/${option.slug}`,
    ]),
  ),
  mealTime: Object.fromEntries(
    recipeFinderMealTimeOptions.map((option) => [
      option.label,
      `/meal-time/${option.slug}`,
    ]),
  ),
  freeFrom: Object.fromEntries(
    recipeFinderFreeFromOptions.map((option) => [
      option.label,
      `/allergen/${option.slug}`,
    ]),
  ),
} as const;

/** Home recipe finder option label → taxonomy slug for URL builder */
export const recipeFinderSlugs = {
  age: Object.fromEntries(
    recipeFinderAgeOptions.map((option) => [option.label, option.slug]),
  ),
  mealTime: Object.fromEntries(
    recipeFinderMealTimeOptions.map((option) => [option.label, option.slug]),
  ),
  freeFrom: Object.fromEntries(
    recipeFinderFreeFromOptions.map((option) => [option.label, option.slug]),
  ),
} as const;
