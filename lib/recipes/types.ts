import type { RecipeTaxonomyKind } from "@/data/recipe-taxonomies";

export type RecipeStatus = "draft" | "published" | "scheduled" | "private" | "disabled";

export type RecipeDifficulty = "easy" | "medium" | "involved";

export type RecipeIngredient = {
  qty: string;
  unit: string;
  item: string;
};

export type RecipeStep = {
  text: string;
  image?: string;
  image_alt?: string;
};

export type RecipeTaxonomyRef = {
  kind: RecipeTaxonomyKind;
  slug: string;
  /** When true, recipe stays in the category but is hidden from public category listings. */
  hidden?: boolean;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  featured_image: string;
  featured_image_alt?: string;
  prep_time: string;
  cook_time: string;
  servings: string;
  difficulty: RecipeDifficulty;
  suitable_for_freezing: boolean;
  app_exclusive: boolean;
  ingredients: RecipeIngredient[];
  method: RecipeStep[];
  taxonomies: RecipeTaxonomyRef[];
  seo_title: string;
  seo_description: string;
  focus_keyphrase?: string;
  noindex?: boolean;
  status?: RecipeStatus;
  scheduled_at?: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type RecipesStore = {
  recipes: Recipe[];
};

export const RECIPE_INGREDIENT_UNITS = ["g", "ml", "tbsp", "tsp", "whole"] as const;

export const RECIPE_DIFFICULTIES: { value: RecipeDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "involved", label: "Involved" },
];
