/** Exact Recipe Finder dropdown options from annabelkarmel.com (Search & Filter form #80859) */

export type RecipeFinderOption = {
  slug: string;
  label: string;
};

export const recipeFinderAgeOptions: RecipeFinderOption[] = [
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
];

export const recipeFinderMealTimeOptions: RecipeFinderOption[] = [
  { slug: "all-meal-times", label: "All Meal Times" },
  { slug: "breakfast", label: "Breakfast" },
  { slug: "main-meals", label: "Main Meals" },
  { slug: "dessert-recipes", label: "Desserts" },
  { slug: "brunch", label: "Brunch" },
  { slug: "tea-time", label: "Tea Time" },
  { slug: "light-meals", label: "Light Meals" },
  { slug: "snack", label: "Snacks" },
  { slug: "weaning", label: "Weaning" },
];

export const recipeFinderFreeFromOptions: RecipeFinderOption[] = [
  { slug: "dairy-free-recipes", label: "Dairy-free" },
  { slug: "egg-free-recipes", label: "Egg-free" },
  { slug: "nut-free-recipes", label: "Nut-free" },
  { slug: "gluten-free-recipes", label: "Gluten-free" },
  { slug: "vegetarian", label: "Vegetarian" },
  { slug: "all-free-from", label: "All Free From" },
  { slug: "vegan", label: "Plant-based" },
];

export const recipeFinderAgePlaceholder = "By Age";
export const recipeFinderMealTimePlaceholder = "Meal Time";
export const recipeFinderFreeFromPlaceholder = "Free From";

export function getFinderOptionLabel(
  kind: "recipe-category" | "meal-time" | "allergen",
  slug: string,
): string | undefined {
  const list =
    kind === "recipe-category"
      ? recipeFinderAgeOptions
      : kind === "meal-time"
        ? recipeFinderMealTimeOptions
        : recipeFinderFreeFromOptions;
  return list.find((option) => option.slug === slug)?.label;
}
