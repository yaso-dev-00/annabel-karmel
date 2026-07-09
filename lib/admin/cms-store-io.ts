import { get, head, put, BlobNotFoundError } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import seedStore from "@/data/cms/advice-articles.seed.json";

const BLOB_PATHNAME = "cms/advice-articles.json";
const CMS_DIR = path.join(process.cwd(), "data", "cms");
const LOCAL_RUNTIME_FILE = path.join(CMS_DIR, "advice-articles.json");
const SEED_FILE = path.join(CMS_DIR, "advice-articles.seed.json");
const BUNDLED_SEED_RAW = JSON.stringify(seedStore);

export function useBlobCmsStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function getBlobAuthOptions(): { token?: string; storeId?: string } {
  const options: { token?: string; storeId?: string } = {};
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    options.token = process.env.BLOB_READ_WRITE_TOKEN;
  }
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

async function cmsBlobExists(): Promise<boolean> {
  try {
    await head(BLOB_PATHNAME, getBlobAuthOptions());
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    return false;
  }
}

async function readBlobRaw(): Promise<string | null> {
  if (!useBlobCmsStore()) return null;

  const accessModes = ["private", "public"] as const;
  for (const access of accessModes) {
    try {
      const result = await get(BLOB_PATHNAME, {
        access,
        useCache: false,
        ...getBlobAuthOptions(),
      });
      if (result?.statusCode === 200 && result.stream) {
        return streamToText(result.stream);
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function writeBlobRaw(raw: string): Promise<void> {
  if (!useBlobCmsStore()) {
    throw new Error(
      "CMS persistence on Vercel requires Vercel Blob. Connect a Blob store in your Vercel project settings.",
    );
  }

  await put(BLOB_PATHNAME, raw, {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...getBlobAuthOptions(),
  });
}

export async function readCmsStoreRaw(): Promise<string> {
  if (useBlobCmsStore()) {
    const blobRaw = await readBlobRaw();
    if (blobRaw) return blobRaw;

    if (await cmsBlobExists()) {
      const retryRaw = await readBlobRaw();
      if (retryRaw) return retryRaw;
      throw new Error("Failed to read CMS store from Blob");
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

export async function writeCmsStoreRaw(raw: string): Promise<void> {
  if (useBlobCmsStore()) {
    await writeBlobRaw(raw);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "CMS persistence on Vercel requires Vercel Blob. Connect a Blob store in your Vercel project settings.",
    );
  }

  await fs.mkdir(CMS_DIR, { recursive: true });
  await fs.writeFile(LOCAL_RUNTIME_FILE, raw, "utf8");
}
