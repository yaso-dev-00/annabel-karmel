import { articleIndex } from "@/data/article-index";

const indexBySlug = new Map(articleIndex.map((article) => [article.slug, article]));

/** Listing href → local route when the live site slug differs. */
const hrefAliases: Record<string, string> = {
  "babys-hydration": "babys-hydration-2",
  "fabulous-finger-food": "fabulous-finger-food-2",
  "food-allergies-natashas-law-put-a-label-on-it": "food-allergies-put-a-label-on-it",
  "managing-childs-food-allergy": "managing-my-childs-food-allergy",
  "weaning-baby-allergies": "weaning-and-baby-allergies",
  "travelling-children-food-allergies": "travelling-with-children-with-food-allergies",
  "breastfeeding-food-allergies": "breastfeeding-and-food-allergies",
  "eczema-linked-food-allergies": "is-eczema-linked-to-food-allergies",
  "common-food-allergens-uk": "the-most-common-food-allergens-in-the-uk",
  "common-food-allergies-babies": "most-common-food-allergies-in-babies",
  "toddler-snack-time": "toddler-snack-time3",
  "toddler-snacking": "toddler-snack-time3",
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
  "baby-led-weaning-pros-cons",
  "annabels-top-tips-baby-led-weaning",
  "10-things-only-weaning-parents-know-to-be-true",
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
  "go-guide-handling-leftovers-safely",
  "go-guide-preparing-freezing-reheating-foods-baby-2",
  "health-benefits-of-spinach",
  "salmon-important-babys-diet",
  "introducing-lumps-bumps-new-flavours",
  "introduction-to-finger-foods",
  "iron-rich-foods",
  "meatless-iron-rich-purees",
  "pasta-recipes-for-baby",
  "portion-size-babies-theres-no-easy-answer",
  "statistics-baby-led-weaning",
  "top-10-baby-led-weaning-recipes",
  "top-10-weaning-recipes",
  "top-10-baby-recipes",
  "tips-ideas-getting-started-baby-led-weaning",
  "top-tips-thinning-baby-purees-2",
  "top-tips-washing-babies-hands",
  "top-weaning-tips",
  "weaning-equipment-cooking",
  "weaning-equipment-getting-kitchen-ready-weaning",
  "weaning-getting-started",
  "weaning-preterm-infants",
  "weaning-premature-babies",
  "looking-after-childrens-teeth",
  "what-spices-can-you-give-to-your-baby",
  "what-to-do-when-your-baby-is-sick",
  "zero-salt-family-recipes",
  "10-healthy-nutritious-lunchbox-ideas",
  "beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking",
  "budget-friendly-recipes-for-a-healthy-balanced-diet",
  "haunted-toast-toppers",
  "healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes",
  "how-can-your-childs-asd-impact-on-their-diet-autism-and-eating",
  "perfect-pasta-dishes-for-baby-toddler-family",
  "toddler-snack-time3",
  "everything-you-need-to-know-about-strep-a",
  "vitamins-and-calcium-intake",
  "foods-boost-childs-brainpower",
  "top-freezer-tips",
  "lunchboxes-2",
  "annabel-tackles-the-topic-of-portion-sizes",
  "pancake-recipes",
  "top-10-tips-coping-fussy-eater",
  "healthy-snacks-for-toddlers-and-kids",
  "get-kids-eating-vegetables",
  "top-10-meals-to-make-for-picky-eaters",
  "youngs-food-explorers",
  "top-10-family-recipes",
  "top-10-easy-dinner-recipes",
  "food-allergies-put-a-label-on-it",
  "food-allergies-your-common-questions-concerns-answered",
  "spotting-food-allergy-symptoms",
  "managing-my-childs-food-allergy",
  "weaning-and-baby-allergies",
  "cows-milk-allergy",
  "food-allergy-vs-food-intolerance",
  "travelling-with-children-with-food-allergies",
  "breastfeeding-and-food-allergies",
  "is-eczema-linked-to-food-allergies",
  "allergies-finding-support",
  "the-most-common-food-allergens-in-the-uk",
  "egg-allergy",
  "most-common-food-allergies-in-babies",
  "allergies-with-professor-adam-fox",
  "managing-your-babys-lactose-intolerance",
  "cows-milk-protein-allergy",
  "are-allergies-genetic",
  "infertility-and-iodine-deficiency-everything-you-need-to-know",
  "the-best-foods-for-boosting-fertility",
  "top-ten-tips-fourth-trimester",
  "pregnancy-month-month",
  "nesting",
  "what-to-buy",
]);

/** Articles that live under `/advice/<slug>` on the live site. */
export const adviceArticleSlugs = new Set([
  "infertility-and-iodine-deficiency-everything-you-need-to-know",
  "the-best-foods-for-boosting-fertility",
  "top-ten-tips-fourth-trimester",
  "pregnancy-month-month",
  "nesting",
  "what-to-buy",
  "toddler-top-tips-to-healthy-food-habits",
  "gagging-vs-choking",
  "weaning-premature-babies",
  "looking-after-childrens-teeth",
]);

/** Articles served at both `/slug` and `/advice/slug` — path follows the listing source. */
export const dualPathArticleSlugs = new Set(["gagging-vs-choking"]);

export function slugFromHref(href: string): string {
  const path = href.replace(/^\//, "").replace(/\/$/, "");
  return path.startsWith("advice/") ? path.slice("advice/".length) : path;
}

export function resolveArticleHref(slug: string, preferAdvicePath: boolean): string {
  const resolvedSlug = hrefAliases[slug] ?? slug;
  if (dualPathArticleSlugs.has(resolvedSlug)) {
    return preferAdvicePath ? `/advice/${resolvedSlug}` : `/${resolvedSlug}`;
  }
  if (adviceArticleSlugs.has(resolvedSlug)) {
    return `/advice/${resolvedSlug}`;
  }
  if (builtArticleSlugs.has(resolvedSlug)) {
    return `/${resolvedSlug}`;
  }
  return `/${resolvedSlug}`;
}

export function resolveListingHref(href: string): string {
  const normalized = href.replace(/^\//, "").replace(/\/$/, "");
  const preferAdvicePath = normalized.startsWith("advice/");
  const slug = slugFromHref(href);
  const resolvedSlug = hrefAliases[slug] ?? slug;
  return resolveArticleHref(resolvedSlug, preferAdvicePath);
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
    heroImage: indexed.heroImage,
    heroAlt: indexed.heroAlt,
    // Keep archive card copy (title, excerpt, category) from the listing source.
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
  };
}
