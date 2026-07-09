import { unstable_cache } from "next/cache";
import seedStore from "@/data/cms/advice-articles.seed.json";
import type { AdviceArticle, AdviceArticlesStore } from "@/lib/content-blocks/types";
import { isAdviceArticlePublic } from "@/lib/admin/advice-article-status";
import { readCmsStoreRaw, writeCmsStoreRaw } from "@/lib/admin/cms-store-io";
import { sanitizeAdviceArticle } from "@/lib/content-blocks/sanitize-settings";
import {
  ADVICE_ARTICLES_CACHE_TAG,
  adviceArticleIdTag,
  adviceArticleSlugTag,
} from "@/lib/admin/revalidate-advice-pages";

async function readStore(): Promise<AdviceArticlesStore> {
  let raw: string;
  try {
    raw = await readCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let store: AdviceArticlesStore;
  try {
    store = JSON.parse(raw) as AdviceArticlesStore;
  } catch {
    store = seedStore as AdviceArticlesStore;
  }
  const articles = Array.isArray(store.articles) ? store.articles : [];
  return {
    articles: articles.flatMap((article) => {
      try {
        return [sanitizeAdviceArticle(article)];
      } catch {
        return [];
      }
    }),
  };
}

async function writeStore(store: AdviceArticlesStore): Promise<void> {
  await writeCmsStoreRaw(JSON.stringify(store, null, 2));
}

const getCachedAllAdviceArticles = unstable_cache(
  async () => {
    const store = await readStore();
    return store.articles.slice().sort((a, b) => a.title.localeCompare(b.title));
  },
  ["advice-articles-all"],
  { tags: [ADVICE_ARTICLES_CACHE_TAG] },
);

export async function getAllAdviceArticles(): Promise<AdviceArticle[]> {
  return getCachedAllAdviceArticles();
}

export async function getAdviceArticleById(id: string): Promise<AdviceArticle | null> {
  return unstable_cache(
    async () => {
      const store = await readStore();
      return store.articles.find((article) => article.id === id) ?? null;
    },
    ["advice-article-by-id", id],
    { tags: [ADVICE_ARTICLES_CACHE_TAG, adviceArticleIdTag(id)] },
  )();
}

export async function getPublishedAdviceArticleBySlug(slug: string): Promise<AdviceArticle | null> {
  return unstable_cache(
    async () => {
      const store = await readStore();
      const article = store.articles.find((item) => item.slug === slug);
      if (!article || !isAdviceArticlePublic(article)) return null;
      return article;
    },
    ["advice-article-published-by-slug", slug],
    { tags: [ADVICE_ARTICLES_CACHE_TAG, adviceArticleSlugTag(slug)] },
  )();
}

export async function getAdviceArticleBySlug(slug: string): Promise<AdviceArticle | null> {
  return unstable_cache(
    async () => {
      const store = await readStore();
      return store.articles.find((item) => item.slug === slug) ?? null;
    },
    ["advice-article-by-slug", slug],
    { tags: [ADVICE_ARTICLES_CACHE_TAG, adviceArticleSlugTag(slug)] },
  )();
}

export async function createAdviceArticle(
  input: Omit<AdviceArticle, "id" | "created_at" | "updated_at">,
): Promise<AdviceArticle> {
  const store = await readStore();
  const now = new Date().toISOString();
  const article: AdviceArticle = sanitizeAdviceArticle({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });
  store.articles.push(article);
  await writeStore(store);
  return article;
}

export async function updateAdviceArticle(
  id: string,
  input: Partial<Omit<AdviceArticle, "id" | "created_at">>,
): Promise<AdviceArticle | null> {
  const store = await readStore();
  const index = store.articles.findIndex((article) => article.id === id);
  if (index === -1) return null;

  const updated: AdviceArticle = sanitizeAdviceArticle({
    ...store.articles[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.articles[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteAdviceArticle(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.articles.filter((article) => article.id !== id);
  if (next.length === store.articles.length) return false;
  await writeStore({ articles: next });
  return true;
}
