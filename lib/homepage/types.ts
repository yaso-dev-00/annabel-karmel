export type HomepageStatus = "draft" | "published" | "scheduled" | "private" | "disabled";

export type HomepageSectionType =
  | "hero"
  | "recipe_finder"
  | "latest_recipes"
  | "recipe_app"
  | "expert_ranges"
  | "cookbooks"
  | "collabs"
  | "partners"
  | "instagram";

export type HomepageHeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

export type HomepageRecipeCard = {
  id: string;
  title: string;
  duration: string;
  href: string;
  image: string;
};

export type HomepageAppBullet = {
  id: string;
  lead: string;
  text: string;
};

export type HomepageAwardImage = {
  id: string;
  src: string;
  alt: string;
};

export type HomepageExpertCard = {
  id: string;
  title: string;
  image: string;
  href: string;
};

export type HomepageCookbookCard = {
  id: string;
  title: string;
  image: string;
  href: string;
};

export type HomepageCollabCard = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  logoImage: string;
  cardImage: string;
};

export type HomepagePartnerLogo = {
  id: string;
  name: string;
  image: string;
  href: string;
};

export type HomepageInstagramPost = {
  id: string;
  href: string;
  image: string;
  kind: "image" | "video" | "carousel";
};

export type HeroSectionData = {
  slides: HomepageHeroSlide[];
};

export type RecipeFinderSectionData = Record<string, never>;

export type LatestRecipesSectionData = {
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  recipes: HomepageRecipeCard[];
};

export type RecipeAppSectionData = {
  heading: string;
  bullets: HomepageAppBullet[];
  ctaLabel: string;
  ctaHref: string;
  appStoreHref: string;
  playStoreHref: string;
  awards: HomepageAwardImage[];
  phonesImage: string;
};

export type ExpertRangesSectionData = {
  heading: string;
  body: string;
  awardLogos: HomepageAwardImage[];
  cards: HomepageExpertCard[];
};

export type CookbooksSectionData = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  books: HomepageCookbookCard[];
};

export type CollabsSectionData = {
  heading: string;
  cards: HomepageCollabCard[];
};

export type PartnersSectionData = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  logos: HomepagePartnerLogo[];
};

export type InstagramSectionData = {
  title: string;
  titleAccent: string;
  description: string;
  posts: HomepageInstagramPost[];
};

export type HomepageSection =
  | { id: string; type: "hero"; data: HeroSectionData }
  | { id: string; type: "recipe_finder"; data: RecipeFinderSectionData }
  | { id: string; type: "latest_recipes"; data: LatestRecipesSectionData }
  | { id: string; type: "recipe_app"; data: RecipeAppSectionData }
  | { id: string; type: "expert_ranges"; data: ExpertRangesSectionData }
  | { id: string; type: "cookbooks"; data: CookbooksSectionData }
  | { id: string; type: "collabs"; data: CollabsSectionData }
  | { id: string; type: "partners"; data: PartnersSectionData }
  | { id: string; type: "instagram"; data: InstagramSectionData };

export type HomepageDocument = {
  id: string;
  title: string;
  status: HomepageStatus;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  sections: HomepageSection[];
};

export type HomepageStore = {
  homepage: HomepageDocument;
};

export const HOMEPAGE_SECTION_LABELS: Record<HomepageSectionType, string> = {
  hero: "Hero carousel",
  recipe_finder: "Search recipes",
  latest_recipes: "Latest recipes",
  recipe_app: "Recipe app promo",
  expert_ranges: "Expert ranges",
  cookbooks: "Bestselling cookbooks",
  collabs: "Collabs",
  partners: "Partner with us",
  instagram: "Instagram",
};

export const LOCKED_HOMEPAGE_SECTION_TYPES: HomepageSectionType[] = ["recipe_finder"];

export function isHomepageSectionLocked(type: HomepageSectionType): boolean {
  return LOCKED_HOMEPAGE_SECTION_TYPES.includes(type);
}
