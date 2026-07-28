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

/** All WordPress recipe taxonomies available in admin. */
export type RecipeTaxonomyKind =
  | "recipe-category"
  | "allergen"
  | "meal-time"
  | "occasions"
  | "ingredients"
  | "dish_type"
  | "sweet_treats";

export type RecipeTaxonomy = {
  kind: RecipeTaxonomyKind;
  slug: string;
  label: string;
  path: string;
  sourceUrl: string;
};

export type RecipeTaxonomyGroup = {
  id: string;
  label: string;
  kind: RecipeTaxonomyKind;
  terms: RecipeTaxonomy[];
};

const BASE = "https://www.annabelkarmel.com";

function taxonomy(
  kind: RecipeTaxonomyKind,
  slug: string,
  label: string,
  segment: string = kind,
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

function terms(
  kind: RecipeTaxonomyKind,
  items: { slug: string; label: string }[],
  segment: string = kind,
): RecipeTaxonomy[] {
  return items.map((item) => taxonomy(kind, item.slug, item.label, segment));
}

/** By Age (recipe-category) — full live finder list */
export const byAge = terms(
  "recipe-category",
  [
    { slug: "first-foods", label: "First Foods" },
    { slug: "after-first-tastes", label: "After First Tastes" },
    { slug: "6-9-months-recipes", label: "6 Months +" },
    { slug: "9-12-months", label: "9 Months +" },
    { slug: "baby-recipes", label: "Baby" },
    { slug: "12-18-months", label: "12 Months +" },
    { slug: "18-months", label: "18 Months +" },
    { slug: "toddler-recipes", label: "Toddler" },
    { slug: "family-recipes", label: "Family" },
    { slug: "back-to-school", label: "Lunchboxes" },
    { slug: "finger-foods", label: "Finger Foods" },
  ],
  "recipe-category",
);

/** Meal Times — full live finder list */
export const mealTimes = terms(
  "meal-time",
  [
    { slug: "breakfast", label: "Breakfast" },
    { slug: "brunch", label: "Brunch" },
    { slug: "light-meals", label: "Light Meals" },
    { slug: "main-meals", label: "Main Meals" },
    { slug: "tea-time", label: "Tea Time" },
    { slug: "snack", label: "Snacks" },
    { slug: "dessert-recipes", label: "Desserts" },
    { slug: "weaning", label: "Weaning" },
  ],
  "meal-time",
);

/** Allergens & Dietary Requirements */
export const freeFrom = terms(
  "allergen",
  [
    { slug: "vegan", label: "Plant-based" },
    { slug: "vegetarian", label: "Vegetarian" },
    { slug: "dairy-free-recipes", label: "Dairy-free" },
    { slug: "egg-free-recipes", label: "Egg-free" },
    { slug: "gluten-free-recipes", label: "Gluten-free" },
    { slug: "nut-free-recipes", label: "Nut-free" },
    { slug: "all-free-from", label: "All Free From" },
  ],
  "allergen",
);

export const occasions = terms("occasions", [
  { slug: "childrens-party-food-recipes", label: "Birthday Parties" },
  { slug: "party-recipes", label: "Party Recipes" },
  { slug: "bonfire-night-recipes", label: "Bonfire Night" },
  { slug: "kid-friendly-christmas-recipes", label: "Christmas" },
  { slug: "healthy-easter-recipes-food-ideas-for-kids-toddlers-babies", label: "Easter" },
  { slug: "halloween-recipe-ideas", label: "Halloween" },
  { slug: "mothers-day-recipe-ideas-for-kids", label: "Mother's Day" },
  { slug: "easy-valentines-day-recipes-for-kids-toddlers", label: "Valentines Day" },
  { slug: "winter-warmers", label: "Winter Warmers" },
]);

export const ingredientTaxonomies = terms("ingredients", [
  { slug: "beef", label: "Beef" },
  { slug: "broccoli", label: "Broccoli" },
  { slug: "cheese", label: "Cheese" },
  { slug: "chicken", label: "Chicken" },
  { slug: "chocolate", label: "Chocolate" },
  { slug: "egg", label: "Egg" },
  { slug: "fish", label: "Fish" },
  { slug: "fruit", label: "Fruit" },
  { slug: "lamb", label: "Lamb" },
  { slug: "meat", label: "Meat" },
  { slug: "oats", label: "Oats" },
  { slug: "pork", label: "Pork" },
  { slug: "rice", label: "Rice" },
  { slug: "salmon", label: "Salmon" },
  { slug: "sweet-potato", label: "Sweet Potato" },
  { slug: "tuna", label: "Tuna" },
  { slug: "vegetables", label: "Vegetables" },
]);

export const dishTypes = terms("dish_type", [
  { slug: "baby-led-weaning-recipes", label: "Baby Led Weaning" },
  { slug: "bolognese", label: "Bolognese" },
  { slug: "curry-recipes-for-kids-toddlers-babies", label: "Curry" },
  { slug: "everyday-meals", label: "Everyday Meals" },
  { slug: "finger-food-recipe-ideas", label: "Finger Food" },
  { slug: "fussy-eaters-meal-ideas", label: "Food for Fussy Kids" },
  { slug: "kids-cooking", label: "Kids Cooking" },
  { slug: "lunch-boxes", label: "Lunchbox" },
  { slug: "pancakes", label: "Pancakes" },
  { slug: "recipe-filter-pasta", label: "Pasta" },
  { slug: "pie", label: "Pie" },
  { slug: "pizza", label: "Pizza" },
  { slug: "quick-easy", label: "Quick & Easy" },
  { slug: "risotto", label: "Risotto" },
  { slug: "salads", label: "Salads" },
  { slug: "sandwiches-wraps", label: "Sandwiches & Wraps" },
  { slug: "soups", label: "Soups" },
  { slug: "sunday-dinner", label: "Sunday Dinner" },
  { slug: "traditional-british-recipes", label: "Traditional British Food" },
]);

export const sweetTreats = terms("sweet_treats", [
  { slug: "bread", label: "Bread" },
  { slug: "cakes", label: "Cakes" },
  { slug: "cookies", label: "Cookies" },
  { slug: "cupcakes", label: "Cupcakes" },
  { slug: "healthy-ice-cream-ice-lolly-recipes-for-kids-toddlers-babies", label: "Ice Cream & Ice Lollies" },
  { slug: "muffins", label: "Muffins" },
  { slug: "smoothies", label: "Smoothies" },
  { slug: "tray-bakes-bars", label: "Tray Bakes & Bars" },
]);

export const recipesArchiveTaxonomy: RecipeTaxonomy = {
  kind: "recipe-category",
  slug: "recipes-archive",
  label: "Recipes",
  path: "/recipes",
  sourceUrl: "https://www.annabelkarmel.com/recipes/",
};

/** Admin tabs / recipe editor groups — same order as WordPress recipe taxonomies. */
export const recipeTaxonomyGroups: RecipeTaxonomyGroup[] = [
  { id: "recipe-category", label: "By Age", kind: "recipe-category", terms: byAge },
  { id: "allergen", label: "Free from", kind: "allergen", terms: freeFrom },
  { id: "meal-time", label: "Meal times", kind: "meal-time", terms: mealTimes },
  { id: "occasions", label: "Occasions", kind: "occasions", terms: occasions },
  { id: "ingredients", label: "Ingredients", kind: "ingredients", terms: ingredientTaxonomies },
  { id: "dish_type", label: "Dish type", kind: "dish_type", terms: dishTypes },
  { id: "sweet_treats", label: "Sweet treats", kind: "sweet_treats", terms: sweetTreats },
];

export const allRecipeTaxonomies: RecipeTaxonomy[] = recipeTaxonomyGroups.flatMap(
  (group) => group.terms,
);

export const RECIPE_TAXONOMY_KINDS: RecipeTaxonomyKind[] = recipeTaxonomyGroups.map(
  (group) => group.kind,
);

function segmentForKind(kind: RecipeTaxonomyKind): string {
  return kind;
}

function finderOptionsForKind(kind: RecipeTaxonomyKind) {
  switch (kind) {
    case "recipe-category":
      return recipeFinderAgeOptions;
    case "meal-time":
      return recipeFinderMealTimeOptions;
    case "allergen":
      return recipeFinderFreeFromOptions;
    default:
      return [];
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
  return recipeTaxonomyGroups.find((group) => group.kind === kind)?.terms ?? [];
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
