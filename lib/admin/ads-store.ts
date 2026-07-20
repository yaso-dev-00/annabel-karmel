import seedStore from "@/data/cms/ads.seed.json";
import type { AdsStore, SiteAd } from "@/lib/ads/types";
import { readAdsCmsStoreRaw, writeAdsCmsStoreRaw } from "@/lib/admin/ads-cms-store-io";
import { sanitizeSiteAd } from "@/lib/admin/sanitize-ad";

async function readStore(): Promise<AdsStore> {
  let raw: string;
  try {
    raw = await readAdsCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let store: AdsStore;
  try {
    store = JSON.parse(raw) as AdsStore;
  } catch {
    store = seedStore as AdsStore;
  }
  const ads = Array.isArray(store.ads) ? store.ads : [];
  return {
    ads: ads.flatMap((ad) => {
      try {
        return [sanitizeSiteAd(ad)];
      } catch {
        return [];
      }
    }),
  };
}

async function writeStore(store: AdsStore): Promise<void> {
  await writeAdsCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getAllAds(): Promise<SiteAd[]> {
  const store = await readStore();
  return store.ads.slice().sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.title.localeCompare(b.title);
  });
}

export async function getAdById(id: string): Promise<SiteAd | null> {
  const store = await readStore();
  return store.ads.find((ad) => ad.id === id) ?? null;
}

export async function createAd(
  input: Omit<SiteAd, "id" | "created_at" | "updated_at">,
): Promise<SiteAd> {
  const store = await readStore();
  const now = new Date().toISOString();
  const ad = sanitizeSiteAd({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });
  store.ads.push(ad);
  await writeStore(store);
  return ad;
}

export async function updateAd(
  id: string,
  input: Partial<Omit<SiteAd, "id" | "created_at">>,
): Promise<SiteAd | null> {
  const store = await readStore();
  const index = store.ads.findIndex((ad) => ad.id === id);
  if (index === -1) return null;

  const updated = sanitizeSiteAd({
    ...store.ads[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.ads[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteAd(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.ads.filter((ad) => ad.id !== id);
  if (next.length === store.ads.length) return false;
  await writeStore({ ads: next });
  return true;
}
