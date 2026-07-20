export type RecipeTimeUnit = "mins" | "hours";

export function parseRecipeTime(value: string): { amount: string; unit: RecipeTimeUnit } {
  const trimmed = value.trim();
  if (!trimmed) return { amount: "", unit: "mins" };

  const hourMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\b/i);
  if (hourMatch) return { amount: hourMatch[1], unit: "hours" };

  const minMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:mins?|minutes?|m)\b/i);
  if (minMatch) return { amount: minMatch[1], unit: "mins" };

  const numOnly = trimmed.match(/^(\d+(?:\.\d+)?)$/);
  if (numOnly) return { amount: numOnly[1], unit: "mins" };

  const leading = trimmed.match(/^(\d+(?:\.\d+)?)/);
  if (leading) return { amount: leading[1], unit: "mins" };

  return { amount: "", unit: "mins" };
}

export function formatRecipeTime(amount: string, unit: RecipeTimeUnit): string {
  const value = amount.trim();
  if (!value) return "";
  return unit === "hours"
    ? `${value} ${value === "1" ? "hour" : "hours"}`
    : `${value} mins`;
}

export function parseRecipeServings(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:portions?|servings?|serves?)?/i);
  if (match) return match[1];

  const leading = trimmed.match(/^(\d+(?:\.\d+)?)/);
  return leading?.[1] ?? "";
}

export function formatRecipeServings(amount: string): string {
  const value = amount.trim();
  if (!value) return "";
  return `${value} ${value === "1" ? "portion" : "portions"}`;
}

/** Keep free-form servings text; only expand a bare number to "N portions". */
export function normalizeRecipeServings(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    return formatRecipeServings(trimmed);
  }
  return trimmed;
}

export function normalizeRecipeCookingFields(recipe: {
  prep_time: string;
  cook_time: string;
  servings: string;
}): { prep_time: string; cook_time: string; servings: string } {
  const prep = parseRecipeTime(recipe.prep_time);
  const cook = parseRecipeTime(recipe.cook_time);

  return {
    prep_time: formatRecipeTime(prep.amount, prep.unit),
    cook_time: formatRecipeTime(cook.amount, cook.unit),
    servings: normalizeRecipeServings(recipe.servings),
  };
}
