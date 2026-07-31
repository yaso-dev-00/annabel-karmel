/** Exact Recipe Finder dropdown options from annabelkarmel.com (Search & Filter form #80859) */

export type RecipeFinderOption = {
  slug: string;
  label: string;
};

export const recipeFinderAgeOptions: RecipeFinderOption[] = [
  { slug: 'first-foods', label: 'First Foods' },
  { slug: '6-9-months-recipes', label: '6 Months +' },
  { slug: '9-12-months', label: '9 Months +' },
  { slug: '12-18-months', label: '12 Months +' },
  { slug: '18-months', label: '18 Months +' },
  { slug: 'family-recipes', label: 'Family' },
];

export const recipeFinderMealTimeOptions: RecipeFinderOption[] = [
  { slug: 'weaning', label: 'Weaning' },
  { slug: 'breakfast', label: 'Breakfast' },
  { slug: 'snack', label: 'Snacks' },
  { slug: 'main-meals', label: 'Main Meals' },
  { slug: 'dessert-recipes', label: 'Desserts' },
];

export const recipeFinderFreeFromOptions: RecipeFinderOption[] = [
  { slug: 'vegan', label: 'Plant-based' },
  { slug: 'vegetarian', label: 'Vegetarian' },
  { slug: 'dairy-free-recipes', label: 'Dairy-free' },
  { slug: 'egg-free-recipes', label: 'Egg-free' },
  { slug: 'gluten-free-recipes', label: 'Gluten-free' },
];

export const recipeFinderAgePlaceholder = 'By Age';
export const recipeFinderMealTimePlaceholder = 'Meal Time';
export const recipeFinderFreeFromPlaceholder = 'Free From';

export function getFinderOptionLabel(
  kind: 'recipe-category' | 'meal-time' | 'allergen',
  slug: string,
): string | undefined {
  const list =
    kind === 'recipe-category'
      ? recipeFinderAgeOptions
      : kind === 'meal-time'
        ? recipeFinderMealTimeOptions
        : recipeFinderFreeFromOptions;
  return list.find((option) => option.slug === slug)?.label;
}
