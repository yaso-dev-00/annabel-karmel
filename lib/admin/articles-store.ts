import seedStore from "@/data/cms/articles.seed.json";
import type { Article, ArticlesStore } from "@/lib/content-blocks/types";
import { isArticlePublic } from "@/lib/admin/article-status";
import { readArticlesCmsStoreRaw, writeArticlesCmsStoreRaw } from "@/lib/admin/articles-cms-store-io";
import { sanitizeArticle } from "@/lib/content-blocks/sanitize-settings";

async function readStore(): Promise<ArticlesStore> {
  let raw: string;
  try {
    raw = await readArticlesCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let store: ArticlesStore;
  try {
    store = JSON.parse(raw) as ArticlesStore;
  } catch {
    store = seedStore as ArticlesStore;
  }
  const articles = Array.isArray(store.articles) ? store.articles : [];
  return {
    articles: articles.flatMap((article) => {
      try {
        return [sanitizeArticle(article)];
      } catch {
        return [];
      }
    }),
  };
}

async function writeStore(store: ArticlesStore): Promise<void> {
  await writeArticlesCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getAllArticles(): Promise<Article[]> {
  const store = await readStore();
  return store.articles.slice().sort((a, b) => a.title.localeCompare(b.title));
}

export async function getArticleById(id: string): Promise<Article | null> {
  const store = await readStore();
  return store.articles.find((article) => article.id === id) ?? null;
}

export async function getPublishedArticleBySlug(slug: string): Promise<Article | null> {
  const store = await readStore();
  const article = store.articles.find((item) => item.slug === slug);
  if (!article || !isArticlePublic(article)) return null;
  return article;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const store = await readStore();
  return store.articles.find((item) => item.slug === slug) ?? null;
}

export async function createArticle(
  input: Omit<Article, "id" | "created_at" | "updated_at">,
): Promise<Article> {
  const store = await readStore();
  const now = new Date().toISOString();
  const article: Article = sanitizeArticle({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });
  store.articles.push(article);
  await writeStore(store);
  return article;
}

export async function updateArticle(
  id: string,
  input: Partial<Omit<Article, "id" | "created_at">>,
): Promise<Article | null> {
  const store = await readStore();
  const index = store.articles.findIndex((article) => article.id === id);
  if (index === -1) return null;

  const updated: Article = sanitizeArticle({
    ...store.articles[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.articles[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.articles.filter((article) => article.id !== id);
  if (next.length === store.articles.length) return false;
  await writeStore({ articles: next });
  return true;
}
