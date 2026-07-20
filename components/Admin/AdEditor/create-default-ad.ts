import type { SiteAd } from "@/lib/ads/types";

export function createDefaultAd(): SiteAd {
  const now = new Date().toISOString();
  return {
    id: "",
    title: "Untitled advertisement",
    image: "",
    href: "",
    ariaLabel: "",
    width: 728,
    height: 200,
    placements: ["header", "footer"],
    sortOrder: 0,
    status: "draft",
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
  };
}
