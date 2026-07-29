import { list, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { useBlobCmsStore } from "@/lib/admin/cms-store-io";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "cms-uploads");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export type CmsMediaItem = {
  url: string;
  filename: string;
  uploadedAt: string | null;
  size: number | null;
};

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

export async function saveCmsUpload(
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  if (useBlobCmsStore()) {
    const blob = await put(`cms-uploads/${filename}`, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: false,
      ...getBlobAuthOptions(),
    });
    return blob.url;
  }

  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_UPLOAD_DIR, filename), buffer);
  return `/cms-uploads/${filename}`;
}

export async function listCmsUploads(): Promise<CmsMediaItem[]> {
  if (useBlobCmsStore()) {
    const items: CmsMediaItem[] = [];
    let cursor: string | undefined;
    do {
      const result = await list({
        prefix: "cms-uploads/",
        limit: 200,
        cursor,
        ...getBlobAuthOptions(),
      });
      for (const blob of result.blobs) {
        const filename = blob.pathname.replace(/^cms-uploads\//, "");
        const ext = path.extname(filename).toLowerCase();
        if (!IMAGE_EXT.has(ext)) continue;
        items.push({
          url: blob.url,
          filename,
          uploadedAt: blob.uploadedAt ? new Date(blob.uploadedAt).toISOString() : null,
          size: typeof blob.size === "number" ? blob.size : null,
        });
      }
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    items.sort((a, b) => (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));
    return items;
  }

  try {
    await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
    const entries = await fs.readdir(LOCAL_UPLOAD_DIR);
    const items: CmsMediaItem[] = [];
    for (const filename of entries) {
      const ext = path.extname(filename).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;
      const fullPath = path.join(LOCAL_UPLOAD_DIR, filename);
      const stat = await fs.stat(fullPath);
      if (!stat.isFile()) continue;
      items.push({
        url: `/cms-uploads/${filename}`,
        filename,
        uploadedAt: stat.mtime.toISOString(),
        size: stat.size,
      });
    }
    items.sort((a, b) => (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));
    return items;
  } catch {
    return [];
  }
}
