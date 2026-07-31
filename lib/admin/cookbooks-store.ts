import seedStore from '@/data/cms/cookbooks.seed.json';
import { isCookbookPublic } from '@/lib/admin/cookbook-status';
import {
  readCookbooksCmsStoreRaw,
  writeCookbooksCmsStoreRaw,
} from '@/lib/admin/cookbooks-cms-store-io';
import {
  sanitizeCookbook,
  sanitizeCookbooksStore,
} from '@/lib/cookbooks/sanitize-cookbook';
import type { Cookbook, CookbooksStore } from '@/lib/cookbooks/types';

async function readStore(): Promise<CookbooksStore> {
  let raw: string;
  try {
    raw = await readCookbooksCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = seedStore;
  }

  return sanitizeCookbooksStore(parsed);
}

async function writeStore(store: CookbooksStore): Promise<void> {
  await writeCookbooksCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getAllCookbooks(): Promise<Cookbook[]> {
  const store = await readStore();
  return store.cookbooks.slice().sort((a, b) => a.title.localeCompare(b.title));
}

export async function getCookbookById(id: string): Promise<Cookbook | null> {
  const store = await readStore();
  return store.cookbooks.find((cookbook) => cookbook.id === id) ?? null;
}

export async function getPublishedCookbookBySlug(
  slug: string,
): Promise<Cookbook | null> {
  const store = await readStore();
  const cookbook = store.cookbooks.find((item) => item.slug === slug);
  if (!cookbook || !isCookbookPublic(cookbook)) return null;
  return cookbook;
}

export async function getCookbookBySlug(
  slug: string,
): Promise<Cookbook | null> {
  const store = await readStore();
  return store.cookbooks.find((item) => item.slug === slug) ?? null;
}

function assertUniqueSlug(
  store: CookbooksStore,
  slug: string,
  excludeId?: string,
): void {
  const conflict = store.cookbooks.find(
    (cookbook) => cookbook.slug === slug && cookbook.id !== excludeId,
  );
  if (conflict) {
    throw new Error(`A cookbook with slug "${slug}" already exists.`);
  }
}

export async function createCookbook(
  input: Omit<Cookbook, 'id' | 'created_at' | 'updated_at'>,
): Promise<Cookbook> {
  const store = await readStore();
  assertUniqueSlug(store, input.slug.trim());

  const now = new Date().toISOString();
  const cookbook = sanitizeCookbook({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });

  store.cookbooks.push(cookbook);
  await writeStore(store);
  return cookbook;
}

export async function updateCookbook(
  id: string,
  input: Partial<Omit<Cookbook, 'id' | 'created_at'>>,
): Promise<Cookbook | null> {
  const store = await readStore();
  const index = store.cookbooks.findIndex((cookbook) => cookbook.id === id);
  if (index === -1) return null;

  const nextSlug = input.slug?.trim() ?? store.cookbooks[index].slug;
  assertUniqueSlug(store, nextSlug, id);

  const updated = sanitizeCookbook({
    ...store.cookbooks[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.cookbooks[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteCookbook(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.cookbooks.filter((cookbook) => cookbook.id !== id);
  if (next.length === store.cookbooks.length) return false;
  await writeStore({ cookbooks: next });
  return true;
}
