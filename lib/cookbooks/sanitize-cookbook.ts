import { normalizeCookbook } from "@/lib/admin/cookbook-status";
import type {
  Cookbook,
  CookbookBuyLink,
  CookbookCarouselImage,
  CookbooksStore,
} from "@/lib/cookbooks/types";

function trimString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function sanitizeBuyLink(raw: unknown): CookbookBuyLink | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const url = trimString(input.url);
  if (!url) return null;
  return {
    retailer: trimString(input.retailer) || "Buy Now",
    url,
  };
}

function sanitizeCarouselImage(raw: unknown): CookbookCarouselImage | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const id = trimString(input.id);
  return {
    ...(id ? { id } : {}),
    src: trimString(input.src),
    alt: trimString(input.alt),
  };
}

function sanitizeStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => trimString(item)).filter(Boolean);
}

function sanitizeYear(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const value = typeof raw === "number" ? raw : Number(trimString(raw));
  return Number.isFinite(value) ? Math.round(value) : null;
}

export function sanitizeCookbook(raw: unknown): Cookbook {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid cookbook payload");
  }

  const input = raw as Record<string, unknown>;
  const slug = trimString(input.slug);
  const title = trimString(input.title);
  if (!slug) throw new Error("Cookbook slug is required");
  if (!title) throw new Error("Cookbook title is required");

  const buyLinks = Array.isArray(input.buyLinks)
    ? input.buyLinks.flatMap((item) => {
        const sanitized = sanitizeBuyLink(item);
        return sanitized ? [sanitized] : [];
      })
    : [];

  const carouselImages = Array.isArray(input.carouselImages)
    ? input.carouselImages.flatMap((item) => {
        const sanitized = sanitizeCarouselImage(item);
        return sanitized ? [sanitized] : [];
      })
    : [];

  const cookbook: Cookbook = {
    id: trimString(input.id) || crypto.randomUUID(),
    slug,
    title,
    subtitle: trimString(input.subtitle),
    year: sanitizeYear(input.year),
    badge: trimString(input.badge),
    body: trimString(input.body),
    bodyHighlights: sanitizeStringArray(input.bodyHighlights),
    detailBody: trimString(input.detailBody),
    detailBodyHighlights: sanitizeStringArray(input.detailBodyHighlights),
    suitableFor: trimString(input.suitableFor),
    buyLinks,
    carouselImages,
    seo_title: trimString(input.seo_title),
    seo_description: trimString(input.seo_description),
    status: input.status as Cookbook["status"],
    scheduled_at: (input.scheduled_at as string | null | undefined) ?? null,
    published_at: (input.published_at as string | null | undefined) ?? null,
    updated_at: trimString(input.updated_at) || new Date().toISOString(),
    created_at: trimString(input.created_at) || new Date().toISOString(),
  };

  return normalizeCookbook(cookbook);
}

export function sanitizeCookbooksStore(raw: unknown): CookbooksStore {
  if (!raw || typeof raw !== "object") {
    return { cookbooks: [] };
  }
  const store = raw as Record<string, unknown>;
  const cookbooks = Array.isArray(store.cookbooks)
    ? store.cookbooks.flatMap((cookbook) => {
        try {
          return [sanitizeCookbook(cookbook)];
        } catch {
          return [];
        }
      })
    : [];

  return { cookbooks };
}

export function validateCookbookForPublish(cookbook: Cookbook): string | null {
  if (!cookbook.title.trim()) return "Title is required to publish.";
  if (!cookbook.slug.trim()) return "Slug is required to publish.";
  if (!cookbook.subtitle.trim()) return "Subtitle is required to publish.";
  if (!cookbook.body.trim()) return "Listing copy is required to publish.";
  if (!cookbook.detailBody.trim()) return "Detail copy is required to publish.";
  if (!cookbook.suitableFor.trim()) return "Suitable for is required to publish.";
  if (cookbook.buyLinks.length < 1) return "Add at least one buy link to publish.";
  if (!cookbook.carouselImages.some((image) => image.src.trim())) {
    return "Add at least one carousel image to publish.";
  }
  if (cookbook.status === "scheduled" && !cookbook.scheduled_at) {
    return "Scheduled cookbooks need a publish date.";
  }
  return null;
}
