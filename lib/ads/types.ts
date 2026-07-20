export type AdStatus = "draft" | "published" | "scheduled" | "private" | "disabled";

export type AdPlacementId = "header" | "footer";

export type SiteAd = {
  id: string;
  title: string;
  image: string;
  href: string;
  ariaLabel: string;
  width: number;
  height: number;
  placements: AdPlacementId[];
  sortOrder: number;
  status: AdStatus;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdsStore = {
  ads: SiteAd[];
};
