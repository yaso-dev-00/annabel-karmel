import type { RecipeTaxonomyKind } from '@/data/recipe-taxonomies';

export type RecipeStatus = 'draft' | 'published' | 'scheduled' | 'disabled';

export type RecipeVisibility = 'mobile' | 'desktop' | 'both';

export type RecipeDifficulty = 'easy' | 'medium' | 'involved';

export type RecipeYieldType = 'serves' | 'makes';

export type RecipeVideoProvider = 'youtube' | 'vimeo' | 'upload';

export type RecipeIngredient = {
  qty: string;
  unit: string;
  item: string;
};

/** Titled ingredient block — lines are one ingredient per string. */
export type RecipeIngredientSection = {
  title: string;
  items: string[];
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
  /** At most one primary per kind/group. */
  primary?: boolean;
};

export type RecipeMedia = {
  src: string;
  alt?: string;
};

export type RecipeVideo = {
  provider: RecipeVideoProvider;
  url: string;
  caption?: string;
  poster?: string;
};

export type RecipeSchema = {
  aggregate_rating?: string;
  keywords?: string;
  cooking_time?: string;
  preparation_time?: string;
  recipe_cuisine?: string;
  nutrition?: string;
};

export type RecipeSponsor = {
  name?: string;
  logo?: string;
  logo_alt?: string;
  url?: string;
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
  ingredients: RecipeIngredientSection[];
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
  /** Channel visibility: mobile app, desktop site, or both. */
  visibility?: RecipeVisibility;

  /** US title variant (WordPress "Recipe Title US"). */
  title_us?: string;
  /** US body content — WYSIWYG HTML (WordPress "Recipe Content US"). */
  content_us?: string;
  description_us?: string;
  /** Additional info — WYSIWYG HTML ("Info UK"). */
  info_uk?: string;
  /** Additional info — WYSIWYG HTML ("Info US"). */
  info_us?: string;
  ingredients_us?: RecipeIngredientSection[];
  method_us?: RecipeStep[];

  yield_type?: RecipeYieldType;
  yield_value?: string;

  video?: RecipeVideo;
  vimeo_embed?: string;
  additional_images?: RecipeMedia[];

  related_recipes?: string[];
  book_related_recipes?: string[];
  apps_and_books?: string[];
  nutrition_category_image?: string;

  /** Default allergen / dietary icon for this recipe. */
  allergen_icon?: string;
  /** Hover / active allergen / dietary icon for this recipe. */
  allergen_icon_active?: string;
  /** Recipe author id (see `data/recipe-authors.ts`). */
  author_id?: string;

  schema?: RecipeSchema;
  sponsor?: RecipeSponsor;
};

export type RecipesStore = {
  recipes: Recipe[];
};

export const RECIPE_INGREDIENT_UNITS = [
  'g',
  'ml',
  'tbsp',
  'tsp',
  'whole',
] as const;

export const RECIPE_DIFFICULTIES: { value: RecipeDifficulty; label: string }[] =
  [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'involved', label: 'Involved' },
  ];

export const RECIPE_YIELD_TYPES: { value: RecipeYieldType; label: string }[] = [
  { value: 'serves', label: 'Serves' },
  { value: 'makes', label: 'Makes' },
];

export const RECIPE_VIDEO_PROVIDERS: {
  value: RecipeVideoProvider;
  label: string;
}[] = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'vimeo', label: 'Vimeo' },
  { value: 'upload', label: 'Upload URL' },
];

export const RECIPE_VISIBILITIES: { value: RecipeVisibility; label: string }[] =
  [
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'both', label: 'Both' },
  ];
