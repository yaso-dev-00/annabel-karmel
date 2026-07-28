import type { RecipeDetail, RecipeTaxonomyLink } from "@/data/recipe-detail";
import { getTaxonomy } from "@/data/recipe-taxonomies";
import type { Recipe, RecipeIngredient } from "@/lib/recipes/types";

function formatIngredient(ingredient: RecipeIngredient): string {
  const qty = ingredient.qty.trim();
  const unit = ingredient.unit.trim();
  const item = ingredient.item.trim();
  if (qty && unit) return `${qty}${unit} ${item}`.replace(/\s+/g, " ").trim();
  if (qty) return `${qty} ${item}`.trim();
  return item;
}

function taxonomyLinks(
  recipe: Recipe,
  kind: "recipe-category" | "meal-time" | "allergen",
): RecipeTaxonomyLink[] {
  return recipe.taxonomies
    .filter((ref) => ref.kind === kind && !ref.hidden)
    .flatMap((ref) => {
      const taxonomy = getTaxonomy(ref.kind, ref.slug);
      if (!taxonomy) return [];
      return [{ label: taxonomy.label, href: `${taxonomy.path}/` }];
    });
}

export function recipeToDetail(recipe: Recipe): RecipeDetail {
  const ages = taxonomyLinks(recipe, "recipe-category");
  const allergens = taxonomyLinks(recipe, "allergen");
  const mealTimes = taxonomyLinks(recipe, "meal-time");
  const breadcrumbCategory = allergens[0] ?? ages[0] ?? mealTimes[0];

  return {
    slug: recipe.slug,
    title: recipe.title,
    href: `/recipes/${recipe.slug}`,
    image: recipe.featured_image,
    description: recipe.description,
    appExclusive: recipe.app_exclusive,
    allergens,
    mealTimes,
    ages,
    suitableForFreezing: recipe.suitable_for_freezing,
    prepTime: recipe.prep_time || undefined,
    cookTime: recipe.cook_time || undefined,
    portions: recipe.servings || undefined,
    ingredients: recipe.ingredients.map(formatIngredient),
    method: recipe.method.map((step) => step.text),
    breadcrumb: breadcrumbCategory ? [breadcrumbCategory] : undefined,
  };
}
