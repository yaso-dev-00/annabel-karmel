import seedStore from "@/data/cms/experts.seed.json";
import { isExpertPublic } from "@/lib/admin/expert-status";
import { readExpertsCmsStoreRaw, writeExpertsCmsStoreRaw } from "@/lib/admin/experts-cms-store-io";
import { sanitizeExpert, sanitizeExpertsStore } from "@/lib/experts/sanitize-expert";
import type { Expert, ExpertsStore } from "@/lib/experts/types";

async function readStore(): Promise<ExpertsStore> {
  let raw: string;
  try {
    raw = await readExpertsCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = seedStore;
  }

  return sanitizeExpertsStore(parsed);
}

async function writeStore(store: ExpertsStore): Promise<void> {
  await writeExpertsCmsStoreRaw(JSON.stringify(store, null, 2));
}

function sortExperts(experts: Expert[]): Expert[] {
  return experts.slice().sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    return a.name.localeCompare(b.name);
  });
}

export async function getExpertsListing(): Promise<{ intro: string; experts: Expert[] }> {
  const store = await readStore();
  return {
    intro: store.intro,
    experts: sortExperts(store.experts.filter(isExpertPublic)),
  };
}

export async function getAllExperts(): Promise<Expert[]> {
  const store = await readStore();
  return sortExperts(store.experts);
}

export async function getExpertsIntro(): Promise<string> {
  const store = await readStore();
  return store.intro;
}

export async function updateExpertsIntro(intro: string): Promise<string> {
  const store = await readStore();
  store.intro = typeof intro === "string" ? intro.trim() : "";
  await writeStore(store);
  return store.intro;
}

export async function getExpertById(id: string): Promise<Expert | null> {
  const store = await readStore();
  return store.experts.find((expert) => expert.id === id) ?? null;
}

export async function getPublishedExpertBySlug(slug: string): Promise<Expert | null> {
  const store = await readStore();
  const expert = store.experts.find((item) => item.slug === slug);
  if (!expert || !isExpertPublic(expert)) return null;
  return expert;
}

export async function getExpertBySlug(slug: string): Promise<Expert | null> {
  const store = await readStore();
  return store.experts.find((item) => item.slug === slug) ?? null;
}

export async function getPublishedExperts(): Promise<Expert[]> {
  const store = await readStore();
  return sortExperts(store.experts.filter(isExpertPublic));
}

function assertUniqueSlug(store: ExpertsStore, slug: string, excludeId?: string): void {
  const conflict = store.experts.find(
    (expert) => expert.slug === slug && expert.id !== excludeId,
  );
  if (conflict) {
    throw new Error(`An expert with slug "${slug}" already exists.`);
  }
}

export async function createExpert(
  input: Omit<Expert, "id" | "created_at" | "updated_at">,
): Promise<Expert> {
  const store = await readStore();
  assertUniqueSlug(store, input.slug.trim());

  const now = new Date().toISOString();
  const expert = sanitizeExpert({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });

  store.experts.push(expert);
  await writeStore(store);
  return expert;
}

export async function updateExpert(
  id: string,
  input: Partial<Omit<Expert, "id" | "created_at">>,
): Promise<Expert | null> {
  const store = await readStore();
  const index = store.experts.findIndex((expert) => expert.id === id);
  if (index === -1) return null;

  const nextSlug = input.slug?.trim() ?? store.experts[index].slug;
  assertUniqueSlug(store, nextSlug, id);

  const updated = sanitizeExpert({
    ...store.experts[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.experts[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteExpert(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.experts.filter((expert) => expert.id !== id);
  if (next.length === store.experts.length) return false;
  await writeStore({ intro: store.intro, experts: next });
  return true;
}
