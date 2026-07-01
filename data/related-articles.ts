import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { articleIndex } from "@/data/article-index";
import { resolveArticleHref, slugFromHref } from "@/data/resolve-article-listing";

const thumbnailOverrides: Record<string, string> = {
  "best-foods-to-help-your-baby-sleep":
    "/articles/6-tips-for-getting-out-and-about-with-baby/related-best-foods.png",
  "haunted-toast-toppers": "/articles/6-tips-for-getting-out-and-about-with-baby/related-haunted-toast.png",
  "6-tips-for-getting-out-and-about-with-baby": "/articles/get-your-free-top-50-first-foods-list/related-6tips.jpg",
  "get-your-free-top-50-first-foods-list": "/articles/get-your-free-top-50-first-foods-list/related-first-foods.jpg",
};

export function getRelatedArticles(currentHref: string, limit = 10): RelatedArticleItem[] {
  const preferAdvicePath = currentHref.startsWith("/advice/");
  const currentSlug = slugFromHref(currentHref);

  return articleIndex
    .map((article) => ({
      href: resolveArticleHref(article.slug, preferAdvicePath),
      title: article.title,
      image: thumbnailOverrides[article.slug] ?? article.heroImage,
    }))
    .filter((item) => slugFromHref(item.href) !== currentSlug)
    .slice(0, limit);
}
