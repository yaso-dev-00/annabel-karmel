import type { Cookbook } from "@/lib/cookbooks/types";

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createDefaultCookbook(): Cookbook {
  const now = new Date().toISOString();
  const title = "Untitled cookbook";
  return {
    id: "",
    slug: slugifyTitle(title),
    title,
    subtitle: "",
    year: null,
    badge: "",
    body: "",
    bodyHighlights: [],
    detailBody: "",
    detailBodyHighlights: [],
    suitableFor: "",
    buyLinks: [{ retailer: "Buy Now", url: "" }],
    carouselImages: [{ src: "", alt: "" }],
    seo_title: "",
    seo_description: "",
    status: "draft",
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
  };
}
