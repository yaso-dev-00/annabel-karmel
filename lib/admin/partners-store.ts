import seedStore from '@/data/cms/partners.seed.json';
import type { PartnerPage, PartnersStore } from '@/lib/content-blocks/types';
import { isPartnerPagePublic } from '@/lib/admin/partner-page-status';
import {
  readPartnersCmsStoreRaw,
  writePartnersCmsStoreRaw,
} from '@/lib/admin/partners-cms-store-io';
import { sanitizePartnerPage } from '@/lib/content-blocks/sanitize-settings';

async function readStore(): Promise<PartnersStore> {
  let raw: string;
  try {
    raw = await readPartnersCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let store: PartnersStore;
  try {
    store = JSON.parse(raw) as PartnersStore;
  } catch {
    store = seedStore as PartnersStore;
  }
  const partners = Array.isArray(store.partners) ? store.partners : [];
  return {
    partners: partners.flatMap((partner) => {
      try {
        return [sanitizePartnerPage(partner)];
      } catch {
        return [];
      }
    }),
  };
}

async function writeStore(store: PartnersStore): Promise<void> {
  await writePartnersCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getAllPartners(): Promise<PartnerPage[]> {
  const store = await readStore();
  return store.partners.slice().sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPartnerPageById(
  id: string,
): Promise<PartnerPage | null> {
  const store = await readStore();
  return store.partners.find((partner) => partner.id === id) ?? null;
}

export async function getPublishedPartnerPageBySlug(
  slug: string,
): Promise<PartnerPage | null> {
  const store = await readStore();
  const partner = store.partners.find((item) => item.slug === slug);
  if (!partner || !isPartnerPagePublic(partner)) return null;
  return partner;
}

export async function getPartnerPageBySlug(
  slug: string,
): Promise<PartnerPage | null> {
  const store = await readStore();
  return store.partners.find((item) => item.slug === slug) ?? null;
}

export async function createPartnerPage(
  input: Omit<PartnerPage, 'id' | 'created_at' | 'updated_at'>,
): Promise<PartnerPage> {
  const store = await readStore();
  const now = new Date().toISOString();
  const partner: PartnerPage = sanitizePartnerPage({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });
  store.partners.push(partner);
  await writeStore(store);
  return partner;
}

export async function updatePartnerPage(
  id: string,
  input: Partial<Omit<PartnerPage, 'id' | 'created_at'>>,
): Promise<PartnerPage | null> {
  const store = await readStore();
  const index = store.partners.findIndex((partner) => partner.id === id);
  if (index === -1) return null;

  const updated: PartnerPage = sanitizePartnerPage({
    ...store.partners[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.partners[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deletePartnerPage(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.partners.filter((partner) => partner.id !== id);
  if (next.length === store.partners.length) return false;
  await writeStore({ partners: next });
  return true;
}
