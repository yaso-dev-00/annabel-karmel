import type { RelatedArticleItem } from "@/components/related-articles-carousel";
import { articleIndex } from "@/data/article-index";

const thumbnailOverrides: Record<string, string> = {
  "best-foods-to-help-your-baby-sleep":
    "/articles/6-tips-for-getting-out-and-about-with-baby/related-best-foods.png",
  "haunted-toast-toppers": "/articles/6-tips-for-getting-out-and-about-with-baby/related-haunted-toast.png",
  "6-tips-for-getting-out-and-about-with-baby": "/articles/get-your-free-top-50-first-foods-list/related-6tips.jpg",
  "get-your-free-top-50-first-foods-list": "/articles/get-your-free-top-50-first-foods-list/related-first-foods.jpg",
};

export const allRelatedArticles: RelatedArticleItem[] = articleIndex.map((article) => ({
  href: `/${article.slug}`,
  title: article.title,
  image: thumbnailOverrides[article.slug] ?? article.heroImage,
}));

export function getRelatedArticles(currentHref: string, limit = 10): RelatedArticleItem[] {
  return allRelatedArticles.filter((item) => item.href !== currentHref).slice(0, limit);
}
