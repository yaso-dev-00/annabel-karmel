import type { RecipeTaxonomyKind } from '@/data/recipe-taxonomies';
import { RECIPE_TAXONOMY_KINDS } from '@/data/recipe-taxonomies';
import { normalizeRecipeCookingFields } from '@/lib/recipes/recipe-cooking-field-format';
import { normalizeRecipe } from '@/lib/admin/recipe-status';
import {
  RECIPE_DIFFICULTIES,
  RECIPE_INGREDIENT_UNITS,
  RECIPE_VIDEO_PROVIDERS,
  RECIPE_YIELD_TYPES,
  type Recipe,
  type RecipeDifficulty,
  type RecipeIngredient,
  type RecipeIngredientSection,
  type RecipeMedia,
  type RecipeSchema,
  type RecipeSponsor,
  type RecipeStep,
  type RecipeTaxonomyRef,
  type RecipeVideo,
  type RecipeVideoProvider,
  type RecipeVisibility,
  type RecipeYieldType,
  type RecipesStore,
} from '@/lib/recipes/types';

const TAXONOMY_KINDS: RecipeTaxonomyKind[] = [...RECIPE_TAXONOMY_KINDS];
const DIFFICULTY_VALUES = new Set(RECIPE_DIFFICULTIES.map((d) => d.value));
const UNIT_VALUES = new Set(RECIPE_INGREDIENT_UNITS);
const YIELD_TYPE_VALUES = new Set(RECIPE_YIELD_TYPES.map((y) => y.value));
const VIDEO_PROVIDER_VALUES = new Set(
  RECIPE_VIDEO_PROVIDERS.map((v) => v.value),
);

/** ISO 8601 duration like PT15M, PT1H30M, PT2H */
const ISO_DURATION = /^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/i;

function trimString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

/** Preserve internal whitespace for HTML fields; only trim ends. */
function trimHtml(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeIngredient(raw: unknown): RecipeIngredient | null {
  if (!raw || typeof raw !== 'object') return null;
  const input = raw as Record<string, unknown>;
  const item = trimString(input.item);
  if (!item) return null;
  const unitRaw = trimString(input.unit, 'g').toLowerCase();
  const unit = UNIT_VALUES.has(
    unitRaw as (typeof RECIPE_INGREDIENT_UNITS)[number],
  )
    ? unitRaw
    : 'g';
  return {
    qty: trimString(input.qty),
    unit,
    item,
  };
}

function formatLegacyIngredient(ingredient: RecipeIngredient): string {
  const qty = ingredient.qty.trim();
  const unit = ingredient.unit.trim();
  const item = ingredient.item.trim();
  if (qty && unit) return `${qty}${unit} ${item}`.replace(/\s+/g, ' ').trim();
  if (qty) return `${qty} ${item}`.trim();
  return item;
}

function parseItemLines(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((line) => (typeof line === 'string' ? line.trim() : ''))
      .filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

function sanitizeIngredientSection(
  raw: unknown,
): RecipeIngredientSection | null {
  if (!raw || typeof raw !== 'object') return null;
  const input = raw as Record<string, unknown>;

  if ('items' in input || 'ingredients' in input || 'title' in input) {
    const title = trimString(input.title);
    const items = parseItemLines(
      input.items ?? input.ingredients ?? input.lines,
    );
    if (!title && items.length === 0) return null;
    return { title, items };
  }

  return null;
}

/**
 * Accepts either:
 * - RecipeIngredientSection[] (new)
 * - legacy RecipeIngredient[] rows (qty/unit/item) → one untitled section
 */
function sanitizeIngredientSections(raw: unknown): RecipeIngredientSection[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  const first: unknown = raw[0];
  const looksLegacy =
    first !== null &&
    typeof first === 'object' &&
    ('qty' in first || 'unit' in first || 'item' in first) &&
    !('items' in first) &&
    !('ingredients' in first) &&
    !('title' in first);

  if (looksLegacy) {
    const lines = raw.flatMap((row) => {
      const ingredient = sanitizeIngredient(row);
      return ingredient ? [formatLegacyIngredient(ingredient)] : [];
    });
    return lines.length > 0 ? [{ title: '', items: lines }] : [];
  }

  return raw.flatMap((row) => {
    const section = sanitizeIngredientSection(row);
    return section ? [section] : [];
  });
}

function countIngredientItems(sections: RecipeIngredientSection[]): number {
  return sections.reduce((sum, section) => sum + section.items.length, 0);
}

function sanitizeStep(raw: unknown): RecipeStep | null {
  if (!raw || typeof raw !== 'object') return null;
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
  if (!raw || typeof raw !== 'object') return null;
  const input = raw as Record<string, unknown>;
  const kind = trimString(input.kind) as RecipeTaxonomyKind;
  const slug = trimString(input.slug);
  if (!TAXONOMY_KINDS.includes(kind) || !slug) return null;
  return {
    kind,
    slug,
    ...(input.hidden === true ? { hidden: true } : {}),
    ...(input.primary === true ? { primary: true } : {}),
  };
}

function normalizePrimaryFlags(refs: RecipeTaxonomyRef[]): RecipeTaxonomyRef[] {
  const byKind = new Map<RecipeTaxonomyKind, RecipeTaxonomyRef[]>();
  for (const ref of refs) {
    const list = byKind.get(ref.kind) ?? [];
    list.push(ref);
    byKind.set(ref.kind, list);
  }

  const result: RecipeTaxonomyRef[] = [];
  for (const [, list] of byKind) {
    if (list.length <= 1) {
      for (const ref of list) {
        result.push({
          kind: ref.kind,
          slug: ref.slug,
          ...(ref.hidden ? { hidden: true } : {}),
        });
      }
      continue;
    }
    let seenPrimary = false;
    for (const ref of list) {
      if (ref.primary && !seenPrimary) {
        seenPrimary = true;
        result.push({
          kind: ref.kind,
          slug: ref.slug,
          ...(ref.hidden ? { hidden: true } : {}),
          primary: true,
        });
      } else {
        result.push({
          kind: ref.kind,
          slug: ref.slug,
          ...(ref.hidden ? { hidden: true } : {}),
        });
      }
    }
    if (!seenPrimary && list[0]) {
      const first = result.find(
        (r) => r.kind === list[0].kind && r.slug === list[0].slug,
      );
      if (first) first.primary = true;
    }
  }
  return result;
}

function sanitizeVisibility(raw: unknown): RecipeVisibility {
  const value = trimString(raw).toLowerCase();
  if (value === 'mobile' || value === 'desktop' || value === 'both')
    return value;
  return 'both';
}

function sanitizeDifficulty(raw: unknown): RecipeDifficulty {
  const value = trimString(raw).toLowerCase() as RecipeDifficulty;
  return DIFFICULTY_VALUES.has(value) ? value : 'medium';
}

function sanitizeStepList(raw: unknown): RecipeStep[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const sanitized = sanitizeStep(item);
    return sanitized ? [sanitized] : [];
  });
}

function sanitizeMedia(raw: unknown): RecipeMedia | null {
  if (!raw || typeof raw !== 'object') return null;
  const input = raw as Record<string, unknown>;
  const src = trimString(input.src);
  if (!src) return null;
  const alt = trimString(input.alt);
  return { src, ...(alt ? { alt } : {}) };
}

function sanitizeMediaList(raw: unknown): RecipeMedia[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const sanitized = sanitizeMedia(item);
    return sanitized ? [sanitized] : [];
  });
}

function sanitizeIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    const id = trimString(item);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

function sanitizeYieldType(raw: unknown): RecipeYieldType | undefined {
  const value = trimString(raw).toLowerCase() as RecipeYieldType;
  return YIELD_TYPE_VALUES.has(value) ? value : undefined;
}

function sanitizeVideo(raw: unknown): RecipeVideo | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const input = raw as Record<string, unknown>;
  const url = trimString(input.url);
  if (!url) return undefined;
  const providerRaw = trimString(
    input.provider,
    'youtube',
  ).toLowerCase() as RecipeVideoProvider;
  const provider = VIDEO_PROVIDER_VALUES.has(providerRaw)
    ? providerRaw
    : 'youtube';
  const caption = trimString(input.caption);
  const poster = trimString(input.poster);
  return {
    provider,
    url,
    ...(caption ? { caption } : {}),
    ...(poster ? { poster } : {}),
  };
}

function sanitizeSchema(raw: unknown): RecipeSchema | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const input = raw as Record<string, unknown>;
  const schema: RecipeSchema = {
    aggregate_rating: trimString(input.aggregate_rating) || undefined,
    keywords: trimString(input.keywords) || undefined,
    cooking_time: trimString(input.cooking_time) || undefined,
    preparation_time: trimString(input.preparation_time) || undefined,
    recipe_cuisine: trimString(input.recipe_cuisine) || undefined,
    nutrition: trimString(input.nutrition) || undefined,
  };
  const hasValue = Object.values(schema).some(Boolean);
  return hasValue ? schema : undefined;
}

function sanitizeSponsor(raw: unknown): RecipeSponsor | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const input = raw as Record<string, unknown>;
  const sponsor: RecipeSponsor = {
    name: trimString(input.name) || undefined,
    logo: trimString(input.logo) || undefined,
    logo_alt: trimString(input.logo_alt) || undefined,
    url: trimString(input.url) || undefined,
  };
  const hasValue = Object.values(sponsor).some(Boolean);
  return hasValue ? sponsor : undefined;
}

export function sanitizeRecipe(raw: unknown): Recipe {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid recipe payload');
  }

  const input = raw as Record<string, unknown>;
  const slug = trimString(input.slug);
  const title = trimString(input.title);
  if (!slug) throw new Error('Recipe slug is required');
  if (!title) throw new Error('Recipe title is required');

  const ingredients = sanitizeIngredientSections(input.ingredients);
  const method = sanitizeStepList(input.method);

  const taxonomies = normalizePrimaryFlags(
    Array.isArray(input.taxonomies)
      ? input.taxonomies.flatMap((item) => {
          const sanitized = sanitizeTaxonomyRef(item);
          return sanitized ? [sanitized] : [];
        })
      : [],
  );

  const cooking = normalizeRecipeCookingFields({
    prep_time: trimString(input.prep_time),
    cook_time: trimString(input.cook_time),
    servings: trimString(input.servings),
  });

  const title_us = trimString(input.title_us);
  const content_us = trimHtml(input.content_us);
  const description_us = trimString(input.description_us);
  const info_uk = trimHtml(input.info_uk);
  const info_us = trimHtml(input.info_us);
  const ingredients_us = sanitizeIngredientSections(input.ingredients_us);
  const method_us = sanitizeStepList(input.method_us);
  const yield_type = sanitizeYieldType(input.yield_type);
  const yield_value = trimString(input.yield_value);
  const video = sanitizeVideo(input.video);
  const vimeo_embed = trimHtml(input.vimeo_embed);
  const additional_images = sanitizeMediaList(input.additional_images);
  const related_recipes = sanitizeIdList(input.related_recipes);
  const book_related_recipes = sanitizeIdList(input.book_related_recipes);
  const apps_and_books = sanitizeIdList(input.apps_and_books);
  const nutrition_category_image = trimString(input.nutrition_category_image);
  const allergen_icon = trimString(input.allergen_icon);
  const allergen_icon_active = trimString(input.allergen_icon_active);
  const author_id = trimString(input.author_id);
  const schema = sanitizeSchema(input.schema);
  const sponsor = sanitizeSponsor(input.sponsor);

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
    status: input.status as Recipe['status'],
    scheduled_at: (input.scheduled_at as string | null | undefined) ?? null,
    published_at: (input.published_at as string | null | undefined) ?? null,
    updated_at: trimString(input.updated_at) || new Date().toISOString(),
    created_at: trimString(input.created_at) || new Date().toISOString(),
    visibility: sanitizeVisibility(input.visibility),
    ...(title_us ? { title_us } : {}),
    ...(content_us ? { content_us } : {}),
    ...(description_us ? { description_us } : {}),
    ...(info_uk ? { info_uk } : {}),
    ...(info_us ? { info_us } : {}),
    ...(ingredients_us.length > 0 ? { ingredients_us } : {}),
    ...(method_us.length > 0 ? { method_us } : {}),
    ...(yield_type ? { yield_type } : {}),
    ...(yield_value ? { yield_value } : {}),
    ...(video ? { video } : {}),
    ...(vimeo_embed ? { vimeo_embed } : {}),
    ...(additional_images.length > 0 ? { additional_images } : {}),
    ...(related_recipes.length > 0 ? { related_recipes } : {}),
    ...(book_related_recipes.length > 0 ? { book_related_recipes } : {}),
    ...(apps_and_books.length > 0 ? { apps_and_books } : {}),
    ...(nutrition_category_image ? { nutrition_category_image } : {}),
    ...(allergen_icon ? { allergen_icon } : {}),
    ...(allergen_icon_active ? { allergen_icon_active } : {}),
    ...(author_id ? { author_id } : {}),
    ...(schema ? { schema } : {}),
    ...(sponsor ? { sponsor } : {}),
  };

  return normalizeRecipe(recipe);
}

export function sanitizeRecipesStore(raw: unknown): RecipesStore {
  if (!raw || typeof raw !== 'object') {
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

function isValidIsoDuration(value: string): boolean {
  if (!value) return true;
  return ISO_DURATION.test(value) && value.toUpperCase() !== 'PT';
}

export function validateRecipeForPublish(recipe: Recipe): string | null {
  if (!recipe.title.trim()) return 'Title is required to publish.';
  if (!recipe.slug.trim()) return 'Slug is required to publish.';
  if (!recipe.featured_image.trim())
    return 'Featured image is required to publish.';
  if (!recipe.prep_time.trim()) return 'Prep time is required to publish.';
  if (!recipe.cook_time.trim()) return 'Cook time is required to publish.';
  if (countIngredientItems(recipe.ingredients) < 1) {
    return 'Add at least one ingredient to publish.';
  }
  if (recipe.method.filter((step) => step.text.trim()).length < 1) {
    return 'Add at least one method step to publish.';
  }
  if (recipe.status === 'scheduled' && !recipe.scheduled_at) {
    return 'Scheduled recipes need a publish date.';
  }
  if (
    recipe.schema?.cooking_time &&
    !isValidIsoDuration(recipe.schema.cooking_time)
  ) {
    return 'Schema cooking time must use ISO 8601 format (e.g. PT15M).';
  }
  if (
    recipe.schema?.preparation_time &&
    !isValidIsoDuration(recipe.schema.preparation_time)
  ) {
    return 'Schema preparation time must use ISO 8601 format (e.g. PT15M).';
  }
  return null;
}
