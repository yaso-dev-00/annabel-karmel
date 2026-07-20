import type { HomepageDocument } from "@/lib/homepage/types";

const BASE = "/api/admin/homepage";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchHomepage(): Promise<HomepageDocument> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch homepage"));
  return (await res.json()) as HomepageDocument;
}

export async function updateHomepageApi(
  input: Partial<Omit<HomepageDocument, "id" | "created_at">>,
): Promise<HomepageDocument> {
  const res = await fetch(BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update homepage"));
  return (await res.json()) as HomepageDocument;
}
