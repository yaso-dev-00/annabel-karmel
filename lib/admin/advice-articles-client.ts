import type { AdviceArticle } from "@/lib/content-blocks/types";

const BASE = "/api/admin/advice-articles";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchAdviceArticles(): Promise<AdviceArticle[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch advice articles"));
  const data = (await res.json()) as { articles: AdviceArticle[] };
  return data.articles;
}

export async function fetchAdviceArticle(id: string): Promise<AdviceArticle> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Article not found"));
  return (await res.json()) as AdviceArticle;
}

export async function createAdviceArticleApi(
  input: Omit<AdviceArticle, "id" | "created_at" | "updated_at">,
): Promise<AdviceArticle> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create article"));
  return (await res.json()) as AdviceArticle;
}

export async function updateAdviceArticleApi(
  id: string,
  input: Partial<Omit<AdviceArticle, "id" | "created_at">>,
): Promise<AdviceArticle> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update article"));
  return (await res.json()) as AdviceArticle;
}

export async function deleteAdviceArticleApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete article"));
}
