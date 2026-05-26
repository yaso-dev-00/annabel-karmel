import { articleIndex } from "@/data/article-index";

const indexBySlug = new Map(articleIndex.map((article) => [article.slug, article]));

/** Listing href → local route when the live site slug differs. */
const hrefAliases: Record<string, string> = {
  "babys-hydration": "babys-hydration-2",
};

/**
 * Article routes with `app/<slug>/page.tsx` in this repo.
 * Keep in sync when new Baby Nutrition (or listing) articles are added.
 */
export const builtArticleSlugs = new Set([
  "advice-runny-eggs",
  "annabels-top-10-finger-food-recipes",
  "annabels-top-10-summer-baby-purees",
  "annabels-top-15-recipes",
  "baby-finger-foods",
  "baby-led-weaning",
  "babys-hydration-2",
  "best-first-foods-baby-led-weaning",
  "best-foods-to-help-your-baby-sleep",
  "boost-your-childs-immune-system",
  "critical-nutrients-baby-importance-essential-fatty-acids",
  "critical-nutrients-baby-importance-iron",
  "eggs-good-growing-family",
  "eggs-questions-answered",
  "fabulous-finger-food-2",
  "foods-to-avoid-when-baby-led-weaning",
  "gagging-vs-choking",
  "go-guide-preparing-freezing-reheating-foods-baby-2",
  "introducing-lumps-bumps-new-flavours",
  "introduction-to-finger-foods",
  "iron-rich-foods",
  "meatless-iron-rich-purees",
  "pasta-recipes-for-baby",
  "portion-size-babies-theres-no-easy-answer",
  "statistics-baby-led-weaning",
  "tips-ideas-getting-started-baby-led-weaning",
  "top-tips-thinning-baby-purees-2",
  "top-tips-washing-babies-hands",
  "top-weaning-tips",
  "weaning-equipment-cooking",
  "weaning-equipment-getting-kitchen-ready-weaning",
  "weaning-getting-started",
  "weaning-preterm-infants",
  "what-spices-can-you-give-to-your-baby",
  "what-to-do-when-your-baby-is-sick",
  "zero-salt-family-recipes",
]);

export function slugFromHref(href: string): string {
  return href.replace(/^\//, "").replace(/\/$/, "");
}

export function resolveListingHref(href: string): string {
  const slug = slugFromHref(href);
  const resolvedSlug = hrefAliases[slug] ?? slug;
  if (builtArticleSlugs.has(resolvedSlug)) {
    return `/${resolvedSlug}`;
  }
  return href;
}

export function isBuiltArticleHref(href: string): boolean {
  const slug = slugFromHref(href);
  const resolvedSlug = hrefAliases[slug] ?? slug;
  return builtArticleSlugs.has(resolvedSlug);
}

export type ListingArticleFields = {
  href: string;
  title: string;
  heroImage: string;
  heroAlt: string;
  excerpt: string;
  category: string;
};

/** Point listing cards at local routes and use on-disk hero assets when available. */
export function enrichListingArticle<T extends ListingArticleFields>(article: T): T {
  const href = resolveListingHref(article.href);
  const slug = slugFromHref(href);
  const indexed = indexBySlug.get(slug);

  if (!indexed) {
    return { ...article, href };
  }

  return {
    ...article,
    href,
    title: indexed.title,
    heroImage: indexed.heroImage,
    heroAlt: indexed.heroAlt,
    excerpt: indexed.intro,
    category: indexed.category,
  };
}
