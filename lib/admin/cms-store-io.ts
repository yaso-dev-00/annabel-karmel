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

async function readBlobViaHead(): Promise<string | null> {
  try {
    const meta = await head(BLOB_PATHNAME, getBlobAuthOptions());
    const res = await fetch(meta.downloadUrl ?? meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

async function readBlobRaw(): Promise<string | null> {
  if (!useBlobCmsStore()) return null;

  const accessModes = ["public", "private"] as const;
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

  return readBlobViaHead();
}

async function writeBlobRaw(raw: string): Promise<void> {
  if (!useBlobCmsStore()) {
    throw new Error(
      "CMS persistence on Vercel requires Vercel Blob. Connect a Blob store in your Vercel project settings.",
    );
  }

  const putOptions = {
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...getBlobAuthOptions(),
  };

  try {
    await put(BLOB_PATHNAME, raw, { ...putOptions, access: "public" });
    return;
  } catch (publicError) {
    try {
      await put(BLOB_PATHNAME, raw, { ...putOptions, access: "private" });
      return;
    } catch (privateError) {
      const publicMessage =
        publicError instanceof Error ? publicError.message : "Public blob write failed";
      const privateMessage =
        privateError instanceof Error ? privateError.message : "Private blob write failed";
      throw new Error(`CMS save failed: ${publicMessage} / ${privateMessage}`);
    }
  }
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

export async function readCmsStoreRaw(): Promise<string> {
  if (useBlobCmsStore()) {
    const blobRaw = await readBlobRaw();
    if (blobRaw) return blobRaw;

    const headRaw = await readBlobViaHead();
    if (headRaw) return headRaw;

    if (await cmsBlobExists()) {
      throw new Error(
        "Failed to read CMS store from Blob. Add BLOB_READ_WRITE_TOKEN from your Blob store to the project environment variables, then redeploy.",
      );
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
