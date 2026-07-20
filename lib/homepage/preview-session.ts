import type { HomepageDocument } from "@/lib/homepage/types";

export const HOMEPAGE_PREVIEW_DOC_KEY = "ak-homepage-preview-document";

export function writeHomepagePreviewDocument(document: HomepageDocument): void {
  try {
    sessionStorage.setItem(HOMEPAGE_PREVIEW_DOC_KEY, JSON.stringify(document));
  } catch {
    // sessionStorage full or unavailable
  }
}

export function readHomepagePreviewDocument(): HomepageDocument | null {
  try {
    const raw = sessionStorage.getItem(HOMEPAGE_PREVIEW_DOC_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as HomepageDocument;
  } catch {
    return null;
  }
}
