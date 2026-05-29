import type { RecipeTaxonomyLink } from "@/data/recipe-detail";

/** Shared recipe detail body (from sweet-potato-spinach on annabelkarmel.com). Only title varies per recipe. */
export const recipeDetailDemoContent = {
  image:
    "https://www.annabelkarmel.com/wp-content/uploads/2023/11/Sweet-potato-spinach-min-scaled-optimized.jpg",
  description:
    "This Sweet Potato & Spinach puree has the nutritional WOW factor. Containing not just one, but two superfood powerhouses, this recipe is a great way to hit little one's nutritional targets in the most tasty way!",
  breadcrumbCategory: {
    label: "Dairy-free",
    href: "/allergen/dairy-free-recipes/",
  } satisfies RecipeTaxonomyLink,
  allergens: [
    { label: "All Free From", href: "/allergen/all-free-from/" },
    { label: "Dairy-free", href: "/allergen/dairy-free-recipes/" },
    { label: "Egg-free", href: "/allergen/egg-free-recipes/" },
    { label: "Nut-free", href: "/allergen/nut-free-recipes/" },
    { label: "Gluten-free", href: "/allergen/gluten-free-recipes/" },
    { label: "Vegetarian", href: "/allergen/vegetarian/" },
    { label: "Plant-based", href: "/allergen/vegan/" },
  ] satisfies RecipeTaxonomyLink[],
  ages: [
    { label: "First Foods", href: "/recipe-category/first-foods/" },
    { label: "6 Months +", href: "/recipe-category/6-9-months-recipes/" },
    { label: "Baby", href: "/recipe-category/baby-recipes/" },
  ] satisfies RecipeTaxonomyLink[],
  suitableForFreezing: true,
  prepTime: "5 mins",
  cookTime: "15 mins",
  portions: "3 portions",
  ingredients: ["150g sweet potato, peeled and diced", "40g fresh baby spinach"],
  method: [
    "Put the sweet potato into a steamer. Steam for 15 minutes until tender.",
    "Add the spinach and steam for a further 2 minutes.",
    "Blend until smooth using a stick blender.",
  ],
} as const;
