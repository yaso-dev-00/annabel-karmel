export type CookbookStatus =
  'draft' | 'published' | 'scheduled' | 'private' | 'disabled';

export type CookbookCarouselImage = {
  id?: string;
  src: string;
  alt: string;
};

export type CookbookBuyLink = {
  retailer: string;
  url: string;
};

export type Cookbook = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  year: number | null;
  badge: string;
  body: string;
  bodyHighlights: string[];
  detailBody: string;
  detailBodyHighlights: string[];
  suitableFor: string;
  buyLinks: CookbookBuyLink[];
  carouselImages: CookbookCarouselImage[];
  seo_title: string;
  seo_description: string;
  status?: CookbookStatus;
  scheduled_at?: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CookbooksStore = {
  cookbooks: Cookbook[];
};
