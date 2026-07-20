import type { SiteAd } from "@/lib/ads/types";

const BASE = "/api/admin/ads";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchAds(): Promise<SiteAd[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch advertisements"));
  const data = (await res.json()) as { ads: SiteAd[] };
  return data.ads;
}

export async function fetchAd(id: string): Promise<SiteAd> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Advertisement not found"));
  return (await res.json()) as SiteAd;
}

export async function createAdApi(
  input: Omit<SiteAd, "id" | "created_at" | "updated_at">,
): Promise<SiteAd> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create advertisement"));
  return (await res.json()) as SiteAd;
}

export async function updateAdApi(
  id: string,
  input: Partial<Omit<SiteAd, "id" | "created_at">>,
): Promise<SiteAd> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update advertisement"));
  return (await res.json()) as SiteAd;
}

export async function deleteAdApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete advertisement"));
}
