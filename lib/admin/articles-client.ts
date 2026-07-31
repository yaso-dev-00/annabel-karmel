import type { Article } from '@/lib/content-blocks/types';

const BASE = '/api/admin/articles';

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(BASE, { cache: 'no-store' });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to fetch articles'));
  const data = (await res.json()) as { articles: Article[] };
  return data.articles;
}

export async function fetchArticle(id: string): Promise<Article> {
  const res = await fetch(`${BASE}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(await readApiError(res, 'Article not found'));
  return (await res.json()) as Article;
}

export async function createArticleApi(
  input: Omit<Article, 'id' | 'created_at' | 'updated_at'>,
): Promise<Article> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to create article'));
  return (await res.json()) as Article;
}

export async function updateArticleApi(
  id: string,
  input: Partial<Omit<Article, 'id' | 'created_at'>>,
): Promise<Article> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to update article'));
  return (await res.json()) as Article;
}

export async function deleteArticleApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to delete article'));
}
