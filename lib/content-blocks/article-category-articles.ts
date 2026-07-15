import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import type { ArticleCategorySlug } from "@/lib/content-blocks/article-categories";
import {
  SAMPLE_SITE_ARTICLE_SLUG,
  SHOWCASE_SITE_ARTICLE_SLUG,
} from "@/lib/content-blocks/types";

export type ArticleCategoryArticleOption = {
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

function toCategoryArticleOption(article: CategoryArticleSource): ArticleCategoryArticleOption {
  return {
    slug: article.slug,
    title: article.title,
    href: `/articles/${article.slug}`,
    image: article.image,
  };
}

function toRelatedArticleItem(article: ArticleCategoryArticleOption): RelatedArticleItem {
  return {
    href: article.href,
    title: article.title,
    image: article.image,
  };
}

const PLACEHOLDER_IMAGE = "/advice-category/child-health-and-development/toddler-snacking.jpg";

const CATEGORY_ARTICLE_SOURCES: Record<ArticleCategorySlug, CategoryArticleSource[]> = {
  "baby-nutrition": [
    {
      slug: SAMPLE_SITE_ARTICLE_SLUG,
      title: "Sample Article",
      image: PLACEHOLDER_IMAGE,
    },
    {
      slug: "first-foods-guide",
      title: "First Foods Guide",
      image: PLACEHOLDER_IMAGE,
    },
    {
      slug: "purees-vs-finger-foods",
      title: "Purees vs Finger Foods",
      image: PLACEHOLDER_IMAGE,
    },
  ],
  "toddler-child": [
    {
      slug: SHOWCASE_SITE_ARTICLE_SLUG,
      title: "Articles Block Showcase",
      image: PLACEHOLDER_IMAGE,
    },
    {
      slug: "toddler-snacking-ideas",
      title: "Toddler Snacking Ideas",
      image: PLACEHOLDER_IMAGE,
    },
    {
      slug: "cooking-with-kids",
      title: "Cooking with Kids",
      image: PLACEHOLDER_IMAGE,
    },
  ],
  allergies: [
    {
      slug: "introducing-allergens",
      title: "Introducing Allergens",
      image: PLACEHOLDER_IMAGE,
    },
    {
      slug: "nut-free-lunchbox",
      title: "Nut-Free Lunchbox Ideas",
      image: PLACEHOLDER_IMAGE,
    },
    {
      slug: "allergy-safe-baking",
      title: "Allergy-Safe Baking",
      image: PLACEHOLDER_IMAGE,
    },
  ],
};

export function getArticleCategoryArticleOptions(categorySlug: string): ArticleCategoryArticleOption[] {
  const articles = CATEGORY_ARTICLE_SOURCES[categorySlug as ArticleCategorySlug];
  if (!articles) return [];
  return articles.map(toCategoryArticleOption);
}

export function getDefaultRelatedArticlesForArticleCategory(
  categorySlug: string,
  excludeSlug?: string,
): RelatedArticleItem[] {
  return getArticleCategoryArticleOptions(categorySlug)
    .filter((article) => article.slug !== excludeSlug)
    .map(toRelatedArticleItem);
}
