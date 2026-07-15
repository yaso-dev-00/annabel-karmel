import seedStore from "@/data/cms/competitions.seed.json";
import type { Competition, CompetitionsStore } from "@/lib/content-blocks/types";
import { isCompetitionPublic } from "@/lib/admin/competition-status";
import { readCompetitionsCmsStoreRaw, writeCompetitionsCmsStoreRaw } from "@/lib/admin/competitions-cms-store-io";
import { sanitizeCompetition } from "@/lib/content-blocks/sanitize-settings";

async function readStore(): Promise<CompetitionsStore> {
  let raw: string;
  try {
    raw = await readCompetitionsCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let store: CompetitionsStore;
  try {
    store = JSON.parse(raw) as CompetitionsStore;
  } catch {
    store = seedStore as CompetitionsStore;
  }
  const competitions = Array.isArray(store.competitions) ? store.competitions : [];
  return {
    competitions: competitions.flatMap((competition) => {
      try {
        return [sanitizeCompetition(competition)];
      } catch {
        return [];
      }
    }),
  };
}

async function writeStore(store: CompetitionsStore): Promise<void> {
  await writeCompetitionsCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getAllCompetitions(): Promise<Competition[]> {
  const store = await readStore();
  return store.competitions.slice().sort((a, b) => a.title.localeCompare(b.title));
}

export async function getCompetitionById(id: string): Promise<Competition | null> {
  const store = await readStore();
  return store.competitions.find((competition) => competition.id === id) ?? null;
}

export async function getPublishedCompetitionBySlug(slug: string): Promise<Competition | null> {
  const store = await readStore();
  const competition = store.competitions.find((item) => item.slug === slug);
  if (!competition || !isCompetitionPublic(competition)) return null;
  return competition;
}

export async function getCompetitionBySlug(slug: string): Promise<Competition | null> {
  const store = await readStore();
  return store.competitions.find((item) => item.slug === slug) ?? null;
}

export async function createCompetition(
  input: Omit<Competition, "id" | "created_at" | "updated_at">,
): Promise<Competition> {
  const store = await readStore();
  const now = new Date().toISOString();
  const competition: Competition = sanitizeCompetition({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });
  store.competitions.push(competition);
  await writeStore(store);
  return competition;
}

export async function updateCompetition(
  id: string,
  input: Partial<Omit<Competition, "id" | "created_at">>,
): Promise<Competition | null> {
  const store = await readStore();
  const index = store.competitions.findIndex((competition) => competition.id === id);
  if (index === -1) return null;

  const updated: Competition = sanitizeCompetition({
    ...store.competitions[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.competitions[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteCompetition(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.competitions.filter((competition) => competition.id !== id);
  if (next.length === store.competitions.length) return false;
  await writeStore({ competitions: next });
  return true;
}
