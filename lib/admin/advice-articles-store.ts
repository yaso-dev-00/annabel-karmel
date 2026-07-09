import { promises as fs } from "fs";
import path from "path";
import seedStore from "@/data/cms/advice-articles.seed.json";
import type { AdviceArticle, AdviceArticlesStore } from "@/lib/content-blocks/types";
import { isAdviceArticlePublic } from "@/lib/admin/advice-article-status";
import { sanitizeAdviceArticle } from "@/lib/content-blocks/sanitize-settings";

const CMS_DIR = path.join(process.cwd(), "data", "cms");
const SEED_FILE = path.join(CMS_DIR, "advice-articles.seed.json");
const BUNDLED_SEED_RAW = JSON.stringify(seedStore);

function getRuntimeFile(): string {
  if (process.env.VERCEL) {
    return path.join("/tmp", "advice-articles.json");
  }
  return path.join(CMS_DIR, "advice-articles.json");
}

async function readSeedRaw(): Promise<string> {
  try {
    return await fs.readFile(SEED_FILE, "utf8");
  } catch {
    return BUNDLED_SEED_RAW;
  }
}

async function readRawStore(): Promise<string> {
  const runtimeFile = getRuntimeFile();
  try {
    return await fs.readFile(runtimeFile, "utf8");
  } catch {
    return readSeedRaw();
  }
}

async function ensureRuntimeFile(): Promise<void> {
  const runtimeFile = getRuntimeFile();
  try {
    await fs.access(runtimeFile);
    return;
  } catch {
    // Runtime store missing — bootstrap from seed where the filesystem allows writes.
  }

  const seedRaw = await readSeedRaw();

  if (process.env.VERCEL) {
    await fs.writeFile(runtimeFile, seedRaw, "utf8");
    return;
  }

  try {
    await fs.mkdir(CMS_DIR, { recursive: true });
    await fs.writeFile(runtimeFile, seedRaw, "utf8");
  } catch {
    // Local read-only environments can still read from the seed file.
  }
}

async function readStore(): Promise<AdviceArticlesStore> {
  const raw = await readRawStore();
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
  await ensureRuntimeFile();
  await fs.writeFile(getRuntimeFile(), JSON.stringify(store, null, 2), "utf8");
}

export async function getAllAdviceArticles(): Promise<AdviceArticle[]> {
  const store = await readStore();
  return store.articles.slice().sort((a, b) => a.title.localeCompare(b.title));
}

export async function getAdviceArticleById(id: string): Promise<AdviceArticle | null> {
  const store = await readStore();
  return store.articles.find((article) => article.id === id) ?? null;
}

export async function getPublishedAdviceArticleBySlug(slug: string): Promise<AdviceArticle | null> {
  const store = await readStore();
  const article = store.articles.find((item) => item.slug === slug);
  if (!article || !isAdviceArticlePublic(article)) return null;
  return article;
}

export async function getAdviceArticleBySlug(slug: string): Promise<AdviceArticle | null> {
  const store = await readStore();
  return store.articles.find((item) => item.slug === slug) ?? null;
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
