import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { babySleepAdviceArticles } from "@/data/baby-sleep-advice-listing";
import { breastfeedingAdviceArticles } from "@/data/breastfeeding-advice-listing";
import { bottleFeedingArticles } from "@/data/bottle-feeding-listing";
import { childHealthDevelopmentArticles } from "@/data/child-health-development-listing";
import { pregnancyTipsArticles } from "@/data/pregnancy-advice-listings";
import { resolveListingHref } from "@/data/resolve-article-listing";
import type { AdviceCategorySlug } from "@/lib/content-blocks/advice-categories";

export type AdviceCategoryArticleOption = {
  slug: string;
  title: string;
  href: string;
  image: string;
};

type CategoryArticleSource = {
  slug: string;
  title: string;
  image: string;
};

function toCategoryArticleOption(article: CategoryArticleSource): AdviceCategoryArticleOption {
  const href = resolveListingHref(`/advice/${article.slug}`);
  return {
    slug: article.slug,
    title: article.title,
    href,
    image: article.image,
  };
}

function toRelatedArticleItem(article: AdviceCategoryArticleOption): RelatedArticleItem {
  return {
    href: article.href,
    title: article.title,
    image: article.image,
  };
}

const CATEGORY_ARTICLE_SOURCES: Record<AdviceCategorySlug, CategoryArticleSource[]> = {
  "breastfeeding-advice": breastfeedingAdviceArticles,
  "bottle-feeding-tips": bottleFeedingArticles,
  "baby-sleep-advice": babySleepAdviceArticles,
  "pregnancy-tips": pregnancyTipsArticles.map((article) => ({
    slug: article.href.replace(/^\/advice\//, ""),
    title: article.title,
    image: article.image,
  })),
  "child-health-and-development": childHealthDevelopmentArticles.map((article) => ({
    slug: article.href.replace(/^\/advice\//, ""),
    title: article.title,
    image: article.image,
  })),
};

export function getAdviceCategoryArticleOptions(categorySlug: string): AdviceCategoryArticleOption[] {
  const articles = CATEGORY_ARTICLE_SOURCES[categorySlug as AdviceCategorySlug];
  if (!articles) return [];
  return articles.map(toCategoryArticleOption);
}

export function getDefaultRelatedArticlesForCategory(
  categorySlug: string,
  excludeSlug?: string,
): RelatedArticleItem[] {
  return getAdviceCategoryArticleOptions(categorySlug)
    .filter((article) => article.slug !== excludeSlug)
    .map(toRelatedArticleItem);
}
