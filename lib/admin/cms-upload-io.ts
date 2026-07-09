import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { useBlobCmsStore } from "@/lib/admin/cms-store-io";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "cms-uploads");

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
