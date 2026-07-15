import type { PartnerPage } from "@/lib/content-blocks/types";

const BASE = "/api/admin/partners";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchPartners(): Promise<PartnerPage[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch partners"));
  const data = (await res.json()) as { partners: PartnerPage[] };
  return data.partners;
}

export async function fetchPartnerPage(id: string): Promise<PartnerPage> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Partner page not found"));
  return (await res.json()) as PartnerPage;
}

export async function createPartnerPageApi(
  input: Omit<PartnerPage, "id" | "created_at" | "updated_at">,
): Promise<PartnerPage> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create partner page"));
  return (await res.json()) as PartnerPage;
}

export async function updatePartnerPageApi(
  id: string,
  input: Partial<Omit<PartnerPage, "id" | "created_at">>,
): Promise<PartnerPage> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update partner page"));
  return (await res.json()) as PartnerPage;
}

export async function deletePartnerPageApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete partner page"));
}
