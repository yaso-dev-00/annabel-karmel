import type { Competition } from "@/lib/content-blocks/types";

const BASE = "/api/admin/competitions";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchCompetitions(): Promise<Competition[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch competitions"));
  const data = (await res.json()) as { competitions: Competition[] };
  return data.competitions;
}

export async function fetchCompetition(id: string): Promise<Competition> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Competition not found"));
  return (await res.json()) as Competition;
}

export async function createCompetitionApi(
  input: Omit<Competition, "id" | "created_at" | "updated_at">,
): Promise<Competition> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create competition"));
  return (await res.json()) as Competition;
}

export async function updateCompetitionApi(
  id: string,
  input: Partial<Omit<Competition, "id" | "created_at">>,
): Promise<Competition> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update competition"));
  return (await res.json()) as Competition;
}

export async function deleteCompetitionApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete competition"));
}
