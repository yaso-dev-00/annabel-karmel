export type CmsMediaItem = {
  url: string;
  filename: string;
  uploadedAt: string | null;
  size: number | null;
};

export async function fetchMediaLibrary(): Promise<CmsMediaItem[]> {
  const res = await fetch("/api/admin/media", { cache: "no-store" });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Failed to load media library");
  }
  const data = (await res.json()) as { items?: CmsMediaItem[] };
  return Array.isArray(data.items) ? data.items : [];
}
