import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import {
  getAdviceCategoryArticleOptions,
  getDefaultRelatedArticlesForCategory,
} from "@/lib/content-blocks/advice-category-articles";
import {
  getArticleCategoryArticleOptions,
  getDefaultRelatedArticlesForArticleCategory,
} from "@/lib/content-blocks/article-category-articles";
import type { RelatedArticlesBlockData } from "@/lib/content-blocks/types";
import { slugFromHref } from "@/data/resolve-article-listing";

export type RelatedArticlesCatalog = "advice" | "article";

function getCategoryArticleOptions(catalog: RelatedArticlesCatalog, categorySlug: string) {
  return catalog === "article"
    ? getArticleCategoryArticleOptions(categorySlug)
    : getAdviceCategoryArticleOptions(categorySlug);
}

export function resolveRelatedArticlesBlockItems(
  data: RelatedArticlesBlockData,
  excludeSlug?: string,
  catalog: RelatedArticlesCatalog = "advice",
): RelatedArticleItem[] {
  const categoryArticles = getCategoryArticleOptions(catalog, data.category_slug);
  const bySlug = new Map(categoryArticles.map((article) => [article.slug, article]));

  const selected =
    data.article_slugs.length > 0
      ? data.article_slugs
          .map((slug) => bySlug.get(slug))
          .filter((article): article is NonNullable<typeof article> => Boolean(article))
      : categoryArticles;

  const items = selected.map((article) => ({
    href: article.href,
    title: article.title,
    image: article.image,
  }));

  if (!excludeSlug) return items;
  return items.filter((item) => slugFromHref(item.href) !== excludeSlug);
}

export function getRelatedArticlesBlockFallbackItems(
  data: RelatedArticlesBlockData,
  excludeSlug?: string,
  catalog: RelatedArticlesCatalog = "advice",
): RelatedArticleItem[] {
  if (data.category_slug) {
    return catalog === "article"
      ? getDefaultRelatedArticlesForArticleCategory(data.category_slug, excludeSlug)
      : getDefaultRelatedArticlesForCategory(data.category_slug, excludeSlug);
  }
  return resolveRelatedArticlesBlockItems(data, excludeSlug, catalog);
}
