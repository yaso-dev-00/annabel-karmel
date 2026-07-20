import type { Recipe } from "@/lib/recipes/types";

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createDefaultRecipe(): Recipe {
  const now = new Date().toISOString();
  const title = "Untitled recipe";
  return {
    id: "",
    slug: slugifyTitle(title),
    title,
    description: "",
    featured_image: "",
    featured_image_alt: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    difficulty: "medium",
    suitable_for_freezing: false,
    app_exclusive: false,
    ingredients: [{ qty: "", unit: "g", item: "" }],
    method: [{ text: "" }],
    taxonomies: [],
    seo_title: "",
    seo_description: "",
    focus_keyphrase: "",
    noindex: false,
    status: "draft",
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
  };
}
