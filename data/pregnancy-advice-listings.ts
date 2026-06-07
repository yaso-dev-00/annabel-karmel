import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export type PregnancyAdviceArticle = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  /** Parent archive slugs on annabelkarmel.com */
  categories: Array<"pregnancy-tips" | "your-pregnancy">;
};

export type PregnancyListingArticle = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const pregnancyCategoryNav = [
  {
    label: "Pregnancy and Postnatal Tips and Health Advice",
    href: "/advice-category/pregnancy-tips",
    slug: "pregnancy-tips" as const,
  },
  {
    label: "Your Pregnancy",
    href: "/advice-category/your-pregnancy",
    slug: "your-pregnancy" as const,
  },
];

export const pregnancyTipsIntro =
  "There is so much pregnancy advice available online and from families and friends that sometimes it's hard to know what advice to follow. What should you be eating to help conceive? What nutrients do you need during pregnancy? How will your body change? We've got all the key topics around pregnancy covered.";

export const yourPregnancyIntro =
  "Your pregnancy advice. All the pregnancy advice you need from our resident experts Alexis Stickland & Beccy Hands to guide you through having a baby.";

/** Same order as annabelkarmel.com/advice-category/pregnancy-tips/ */
export const pregnancyAdviceArticles: PregnancyAdviceArticle[] = [
  {
    slug: "infertility-and-iodine-deficiency-everything-you-need-to-know",
    title: "Infertility and Iodine Deficiency: Everything You Need to Know",
    image: "/advice-category/pregnancy-tips/infertility-iodine.jpg",
    imageAlt: "Infertility and Iodine Deficiency: Everything You Need to Know",
    categories: ["pregnancy-tips"],
  },
  {
    slug: "the-best-foods-for-boosting-fertility",
    title: "The Best Foods for Boosting Fertility",
    image: "/advice-category/pregnancy-tips/boosting-fertility.jpg",
    imageAlt: "The Best Foods for Boosting Fertility",
    categories: ["pregnancy-tips"],
  },
  {
    slug: "top-ten-tips-fourth-trimester",
    title: "Top ten tips for the fourth trimester",
    image: "/advice-category/pregnancy-tips/fourth-trimester.jpg",
    imageAlt: "Top ten tips for the fourth trimester",
    categories: ["pregnancy-tips", "your-pregnancy"],
  },
  {
    slug: "pregnancy-month-month",
    title: "Your pregnancy month-by-month",
    image: "/advice-category/pregnancy-tips/pregnancy-month-by-month.jpg",
    imageAlt: "Your pregnancy month-by-month",
    categories: ["pregnancy-tips", "your-pregnancy"],
  },
  {
    slug: "nesting",
    title: "Nesting in pregnancy: why and how to",
    image: "/advice-category/pregnancy-tips/nesting.jpg",
    imageAlt: "Nesting in pregnancy: why and how to",
    categories: ["pregnancy-tips", "your-pregnancy"],
  },
  {
    slug: "what-to-buy",
    title: "What to buy",
    image: "/advice-category/pregnancy-tips/what-to-buy.jpg",
    imageAlt: "What to buy",
    categories: ["pregnancy-tips", "your-pregnancy"],
  },
];

export function pregnancyArticleHref(slug: string): string {
  return `/advice/${slug}`;
}

export function toPregnancyListingArticle(article: PregnancyAdviceArticle): PregnancyListingArticle {
  return {
    title: article.title,
    href: pregnancyArticleHref(article.slug),
    image: article.image,
    imageAlt: article.imageAlt,
  };
}

export function pregnancyArticlesForCategory(
  category: "pregnancy-tips" | "your-pregnancy",
): PregnancyListingArticle[] {
  return pregnancyAdviceArticles
    .filter((article) => article.categories.includes(category))
    .map(toPregnancyListingArticle);
}

export const pregnancyTipsArticles = pregnancyArticlesForCategory("pregnancy-tips");
export const yourPregnancyArticles = pregnancyArticlesForCategory("your-pregnancy");

const pregnancyArticleByTitle = new Map(
  pregnancyAdviceArticles.map((article) => [article.title, article]),
);

/** Map expert topic titles to local pregnancy advice routes. */
export function pregnancyTopicHref(title: string): string | undefined {
  const article = pregnancyArticleByTitle.get(title);
  return article ? pregnancyArticleHref(article.slug) : undefined;
}

export function pregnancyTopicImage(title: string): string | undefined {
  return pregnancyArticleByTitle.get(title)?.image;
}

export const pregnancyTipsRelatedArticles: RelatedArticleItem[] = [
  {
    href: "/advice/nesting",
    title: "Nesting in pregnancy: why and how to",
    image: "/articles/nesting/hero.jpg",
  },
  {
    href: "/advice/pregnancy-month-month",
    title: "Your pregnancy month-by-month",
    image: "/articles/pregnancy-month-month/hero.jpg",
  },
  {
    href: "/advice/top-ten-tips-fourth-trimester",
    title: "Top ten tips for the fourth trimester",
    image: "/articles/top-ten-tips-fourth-trimester/hero.jpg",
  },
  {
    href: "/advice/infertility-and-iodine-deficiency-everything-you-need-to-know",
    title: "Infertility and Iodine Deficiency: Everything You Need to Know",
    image: "/articles/infertility-and-iodine-deficiency-everything-you-need-to-know/hero.jpg",
  },
  {
    href: "/advice/the-best-foods-for-boosting-fertility",
    title: "The Best Foods for Boosting Fertility",
    image: "/articles/the-best-foods-for-boosting-fertility/hero.jpg",
  },
  {
    href: "/advice/what-to-buy",
    title: "What to buy",
    image: "/articles/what-to-buy/hero.jpg",
  },
];
