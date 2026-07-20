import type { Cookbook } from "@/lib/cookbooks/types";

const BASE = "/api/admin/cookbooks";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchCookbooks(): Promise<Cookbook[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch cookbooks"));
  const data = (await res.json()) as { cookbooks: Cookbook[] };
  return data.cookbooks;
}

export async function fetchCookbook(id: string): Promise<Cookbook> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Cookbook not found"));
  return (await res.json()) as Cookbook;
}

export async function createCookbookApi(
  input: Omit<Cookbook, "id" | "created_at" | "updated_at">,
): Promise<Cookbook> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create cookbook"));
  return (await res.json()) as Cookbook;
}

export async function updateCookbookApi(
  id: string,
  input: Partial<Omit<Cookbook, "id" | "created_at">>,
): Promise<Cookbook> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update cookbook"));
  return (await res.json()) as Cookbook;
}

export async function deleteCookbookApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete cookbook"));
}
