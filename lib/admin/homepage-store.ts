import { createDefaultHomepageDocument } from '@/lib/homepage/create-default-homepage';
import type { HomepageDocument, HomepageStore } from '@/lib/homepage/types';
import {
  readHomepageCmsStoreRaw,
  writeHomepageCmsStoreRaw,
} from '@/lib/admin/homepage-cms-store-io';
import { sanitizeHomepageDocument } from '@/lib/admin/sanitize-homepage';

async function readStore(): Promise<HomepageStore> {
  let raw: string;
  try {
    raw = await readHomepageCmsStoreRaw();
  } catch {
    raw = JSON.stringify({ homepage: createDefaultHomepageDocument() });
  }

  let store: HomepageStore;
  try {
    store = JSON.parse(raw) as HomepageStore;
  } catch {
    store = { homepage: createDefaultHomepageDocument() };
  }

  return {
    homepage: sanitizeHomepageDocument(
      store.homepage ?? createDefaultHomepageDocument(),
    ),
  };
}

async function writeStore(store: HomepageStore): Promise<void> {
  await writeHomepageCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getHomepageDocument(): Promise<HomepageDocument> {
  const store = await readStore();
  return store.homepage;
}

export async function updateHomepageDocument(
  input: Partial<Omit<HomepageDocument, 'id' | 'created_at'>> & {
    sections?: HomepageDocument['sections'];
  },
): Promise<HomepageDocument> {
  const store = await readStore();
  const updated = sanitizeHomepageDocument({
    ...store.homepage,
    ...input,
    id: store.homepage.id,
    created_at: store.homepage.created_at,
    updated_at: new Date().toISOString(),
  });
  await writeStore({ homepage: updated });
  return updated;
}
