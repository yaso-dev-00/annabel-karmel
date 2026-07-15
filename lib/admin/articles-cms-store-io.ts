import { del, get, list, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import seedStore from "@/data/cms/articles.seed.json";

const LEGACY_BLOB_PATHNAME = "cms/articles.json";
const VERSIONED_PREFIX = "cms/articles/v";
const MAX_VERSIONS = 12;

const CMS_DIR = path.join(process.cwd(), "data", "cms");
const LOCAL_RUNTIME_FILE = path.join(CMS_DIR, "articles.json");
const SEED_FILE = path.join(CMS_DIR, "articles.seed.json");
const BUNDLED_SEED_RAW = JSON.stringify(seedStore);

export function useBlobArticlesCmsStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getBlobAuthOptions(): { token: string; storeId?: string } {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for CMS persistence on Vercel.");
  }
  const options: { token: string; storeId?: string } = { token };
  if (process.env.BLOB_STORE_ID) {
    options.storeId = process.env.BLOB_STORE_ID;
  }
  return options;
}

async function readSeedRaw(): Promise<string> {
  try {
    return await fs.readFile(SEED_FILE, "utf8");
  } catch {
    return BUNDLED_SEED_RAW;
  }
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text();
}

async function readBlobAtPathname(pathname: string): Promise<string | null> {
  try {
    const result = await get(pathname, {
      access: "public",
      useCache: false,
      ...getBlobAuthOptions(),
    });
    if (result?.statusCode === 200 && result.stream) {
      return streamToText(result.stream);
    }
  } catch {
    // Missing blob or access mismatch.
  }
  return null;
}

async function listArticlesStoreBlobs() {
  const auth = getBlobAuthOptions();
  const [versioned, legacy] = await Promise.all([
    list({ prefix: VERSIONED_PREFIX, limit: MAX_VERSIONS + 4, ...auth }),
    list({ prefix: LEGACY_BLOB_PATHNAME, limit: 1, ...auth }),
  ]);
  return [...versioned.blobs, ...legacy.blobs];
}

async function readLatestVersionedBlob(): Promise<string | null> {
  const auth = getBlobAuthOptions();
  const { blobs } = await list({ prefix: VERSIONED_PREFIX, limit: MAX_VERSIONS + 4, ...auth });
  if (!blobs.length) return null;

  const latest = blobs.reduce((current, candidate) =>
    candidate.uploadedAt > current.uploadedAt ? candidate : current,
  );

  return readBlobAtPathname(latest.pathname);
}

async function readBlobRaw(): Promise<string | null> {
  if (!useBlobArticlesCmsStore()) return null;

  const versioned = await readLatestVersionedBlob();
  if (versioned) return versioned;

  return readBlobAtPathname(LEGACY_BLOB_PATHNAME);
}

async function pruneOldVersions(): Promise<void> {
  const auth = getBlobAuthOptions();
  const { blobs } = await list({ prefix: VERSIONED_PREFIX, limit: MAX_VERSIONS + 20, ...auth });
  if (blobs.length <= MAX_VERSIONS) return;

  const sorted = blobs.slice().sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  const stale = sorted.slice(MAX_VERSIONS);
  if (!stale.length) return;

  await del(
    stale.map((blob) => blob.url),
    auth,
  );
}

async function writeBlobRaw(raw: string): Promise<void> {
  if (!useBlobArticlesCmsStore()) {
    throw new Error(
      "CMS persistence on Vercel requires BLOB_READ_WRITE_TOKEN. Add it in Vercel Environment Variables, then redeploy.",
    );
  }

  const auth = getBlobAuthOptions();
  const pathname = `${VERSIONED_PREFIX}${Date.now()}.json`;

  await put(pathname, raw, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    ...auth,
  });

  await pruneOldVersions();
}

async function blobStoreHasData(): Promise<boolean> {
  if (!useBlobArticlesCmsStore()) return false;
  const blobs = await listArticlesStoreBlobs();
  return blobs.length > 0;
}

export async function readArticlesCmsStoreRaw(): Promise<string> {
  if (useBlobArticlesCmsStore()) {
    let blobRaw = await readBlobRaw();
    if (blobRaw) return blobRaw;

    if (await blobStoreHasData()) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      blobRaw = await readBlobRaw();
      if (blobRaw) return blobRaw;
    }

    return readSeedRaw();
  }

  if (!process.env.VERCEL) {
    try {
      return await fs.readFile(LOCAL_RUNTIME_FILE, "utf8");
    } catch {
      // Fall back to seed below.
    }
  }

  return readSeedRaw();
}

export async function writeArticlesCmsStoreRaw(raw: string): Promise<void> {
  if (useBlobArticlesCmsStore()) {
    await writeBlobRaw(raw);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "CMS persistence on Vercel requires BLOB_READ_WRITE_TOKEN. Add it in Vercel Environment Variables, then redeploy.",
    );
  }

  await fs.mkdir(CMS_DIR, { recursive: true });
  await fs.writeFile(LOCAL_RUNTIME_FILE, raw, "utf8");
}
