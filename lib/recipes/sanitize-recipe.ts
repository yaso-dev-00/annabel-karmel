import type { RecipeTaxonomyKind } from "@/data/recipe-taxonomies";
import { normalizeRecipeCookingFields } from "@/lib/recipes/recipe-cooking-field-format";
import { normalizeRecipe } from "@/lib/admin/recipe-status";
import {
  RECIPE_DIFFICULTIES,
  RECIPE_INGREDIENT_UNITS,
  type Recipe,
  type RecipeDifficulty,
  type RecipeIngredient,
  type RecipeStep,
  type RecipeTaxonomyRef,
  type RecipesStore,
} from "@/lib/recipes/types";

const TAXONOMY_KINDS: RecipeTaxonomyKind[] = ["recipe-category", "meal-time", "allergen"];
const DIFFICULTY_VALUES = new Set(RECIPE_DIFFICULTIES.map((d) => d.value));
const UNIT_VALUES = new Set(RECIPE_INGREDIENT_UNITS);

function trimString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function sanitizeIngredient(raw: unknown): RecipeIngredient | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const item = trimString(input.item);
  if (!item) return null;
  const unitRaw = trimString(input.unit, "g").toLowerCase();
  const unit = UNIT_VALUES.has(unitRaw as (typeof RECIPE_INGREDIENT_UNITS)[number])
    ? unitRaw
    : "g";
  return {
    qty: trimString(input.qty),
    unit,
    item,
  };
}

function sanitizeStep(raw: unknown): RecipeStep | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const text = trimString(input.text);
  if (!text) return null;
  const image = trimString(input.image);
  const image_alt = trimString(input.image_alt);
  return {
    text,
    ...(image ? { image } : {}),
    ...(image_alt ? { image_alt } : {}),
  };
}

function sanitizeTaxonomyRef(raw: unknown): RecipeTaxonomyRef | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const kind = trimString(input.kind) as RecipeTaxonomyKind;
  const slug = trimString(input.slug);
  if (!TAXONOMY_KINDS.includes(kind) || !slug) return null;
  return { kind, slug };
}

function sanitizeDifficulty(raw: unknown): RecipeDifficulty {
  const value = trimString(raw).toLowerCase() as RecipeDifficulty;
  return DIFFICULTY_VALUES.has(value) ? value : "medium";
}

export function sanitizeRecipe(raw: unknown): Recipe {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid recipe payload");
  }

  const input = raw as Record<string, unknown>;
  const slug = trimString(input.slug);
  const title = trimString(input.title);
  if (!slug) throw new Error("Recipe slug is required");
  if (!title) throw new Error("Recipe title is required");

  const ingredients = Array.isArray(input.ingredients)
    ? input.ingredients.flatMap((item) => {
        const sanitized = sanitizeIngredient(item);
        return sanitized ? [sanitized] : [];
      })
    : [];

  const method = Array.isArray(input.method)
    ? input.method.flatMap((item) => {
        const sanitized = sanitizeStep(item);
        return sanitized ? [sanitized] : [];
      })
    : [];

  const taxonomies = Array.isArray(input.taxonomies)
    ? input.taxonomies.flatMap((item) => {
        const sanitized = sanitizeTaxonomyRef(item);
        return sanitized ? [sanitized] : [];
      })
    : [];

  const cooking = normalizeRecipeCookingFields({
    prep_time: trimString(input.prep_time),
    cook_time: trimString(input.cook_time),
    servings: trimString(input.servings),
  });

  const recipe: Recipe = {
    id: trimString(input.id) || crypto.randomUUID(),
    slug,
    title,
    description: trimString(input.description),
    featured_image: trimString(input.featured_image),
    featured_image_alt: trimString(input.featured_image_alt) || undefined,
    prep_time: cooking.prep_time,
    cook_time: cooking.cook_time,
    servings: cooking.servings,
    difficulty: sanitizeDifficulty(input.difficulty),
    suitable_for_freezing: Boolean(input.suitable_for_freezing),
    app_exclusive: Boolean(input.app_exclusive),
    ingredients,
    method,
    taxonomies,
    seo_title: trimString(input.seo_title),
    seo_description: trimString(input.seo_description),
    focus_keyphrase: trimString(input.focus_keyphrase) || undefined,
    noindex: Boolean(input.noindex),
    status: input.status as Recipe["status"],
    scheduled_at: (input.scheduled_at as string | null | undefined) ?? null,
    published_at: (input.published_at as string | null | undefined) ?? null,
    updated_at: trimString(input.updated_at) || new Date().toISOString(),
    created_at: trimString(input.created_at) || new Date().toISOString(),
  };

  return normalizeRecipe(recipe);
}

export function sanitizeRecipesStore(raw: unknown): RecipesStore {
  if (!raw || typeof raw !== "object") {
    return { recipes: [] };
  }
  const store = raw as Record<string, unknown>;
  const recipes = Array.isArray(store.recipes)
    ? store.recipes.flatMap((recipe) => {
        try {
          return [sanitizeRecipe(recipe)];
        } catch {
          return [];
        }
      })
    : [];

  return { recipes };
}

export function validateRecipeForPublish(recipe: Recipe): string | null {
  if (!recipe.title.trim()) return "Title is required to publish.";
  if (!recipe.slug.trim()) return "Slug is required to publish.";
  if (!recipe.featured_image.trim()) return "Featured image is required to publish.";
  if (!recipe.prep_time.trim()) return "Prep time is required to publish.";
  if (!recipe.cook_time.trim()) return "Cook time is required to publish.";
  if (recipe.ingredients.length < 1) return "Add at least one ingredient to publish.";
  if (recipe.method.length < 1) return "Add at least one method step to publish.";
  if (recipe.status === "scheduled" && !recipe.scheduled_at) {
    return "Scheduled recipes need a publish date.";
  }
  return null;
}
