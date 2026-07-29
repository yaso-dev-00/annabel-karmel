import {
  RECIPE_TAXONOMY_KINDS,
  defaultRecipeCategoriesStore,
  type RecipeCategoriesStore,
  type RecipeTaxonomy,
  type RecipeTaxonomyGroup,
  type RecipeTaxonomyKind,
} from "@/data/recipe-taxonomies";
import {
  readRecipeCategoriesCmsStoreRaw,
  writeRecipeCategoriesCmsStoreRaw,
} from "@/lib/admin/recipe-categories-cms-store-io";

const KIND_SET = new Set<string>(RECIPE_TAXONOMY_KINDS);

function trimString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizeTerm(raw: unknown, kind: RecipeTaxonomyKind): RecipeTaxonomy | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const label = trimString(input.label);
  const slug = trimString(input.slug) || slugify(label);
  if (!label || !slug) return null;
  const path = trimString(input.path) || `/${kind}/${slug}`;
  const sourceUrl = trimString(input.sourceUrl) || `https://www.annabelkarmel.com${path}/`;
  const icon = trimString(input.icon);
  const iconActive = trimString(input.iconActive);
  return {
    kind,
    slug,
    label,
    path,
    sourceUrl,
    ...(icon ? { icon } : {}),
    ...(iconActive ? { iconActive } : {}),
  };
}

function sanitizeGroup(raw: unknown): RecipeTaxonomyGroup | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const kind = trimString(input.kind) as RecipeTaxonomyKind;
  if (!KIND_SET.has(kind)) return null;
  const id = trimString(input.id) || kind;
  const label = trimString(input.label) || kind;
  const terms = Array.isArray(input.terms)
    ? input.terms.flatMap((term) => {
        const sanitized = sanitizeTerm(term, kind);
        return sanitized ? [sanitized] : [];
      })
    : [];
  return { id, label, kind, terms };
}

export function sanitizeRecipeCategoriesStore(raw: unknown): RecipeCategoriesStore {
  if (!raw || typeof raw !== "object") {
    return defaultRecipeCategoriesStore();
  }
  const input = raw as Record<string, unknown>;
  const groups = Array.isArray(input.groups)
    ? input.groups.flatMap((group) => {
        const sanitized = sanitizeGroup(group);
        return sanitized ? [sanitized] : [];
      })
    : [];

  if (groups.length === 0) {
    return defaultRecipeCategoriesStore();
  }

  // Ensure every known kind exists (preserve order from defaults, overlay saved terms).
  const byKind = new Map(groups.map((group) => [group.kind, group]));
  const defaults = defaultRecipeCategoriesStore().groups;
  const merged = defaults.map((fallback) => {
    const saved = byKind.get(fallback.kind);
    if (!saved) return fallback;
    return {
      ...fallback,
      label: saved.label || fallback.label,
      terms: saved.terms.length > 0 ? saved.terms : fallback.terms,
    };
  });

  // Append any unexpected extra groups that somehow passed kind check.
  for (const group of groups) {
    if (!merged.some((item) => item.kind === group.kind)) {
      merged.push(group);
    }
  }

  return { groups: merged };
}

async function readStore(): Promise<RecipeCategoriesStore> {
  let raw: string;
  try {
    raw = await readRecipeCategoriesCmsStoreRaw();
  } catch {
    return defaultRecipeCategoriesStore();
  }

  try {
    return sanitizeRecipeCategoriesStore(JSON.parse(raw));
  } catch {
    return defaultRecipeCategoriesStore();
  }
}

async function writeStore(store: RecipeCategoriesStore): Promise<void> {
  await writeRecipeCategoriesCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getCategoryGroups(): Promise<RecipeTaxonomyGroup[]> {
  const store = await readStore();
  return store.groups;
}

export async function saveCategoryGroups(
  groups: RecipeTaxonomyGroup[],
): Promise<RecipeTaxonomyGroup[]> {
  const store = sanitizeRecipeCategoriesStore({ groups });
  await writeStore(store);
  return store.groups;
}
