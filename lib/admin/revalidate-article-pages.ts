import { revalidatePath, revalidateTag } from "next/cache";

export const ARTICLES_CACHE_TAG = "articles";

export function articleIdTag(id: string): string {
  return `article:${id}`;
}

export function articleSlugTag(slug: string): string {
  return `article-slug:${slug}`;
}

type RevalidateArticle = {
  id?: string;
  slug?: string;
};

export function revalidateArticlePages(article?: RevalidateArticle): void {
  revalidateTag(ARTICLES_CACHE_TAG, "seconds");
  if (article?.id) revalidateTag(articleIdTag(article.id), "seconds");
  if (article?.slug) revalidateTag(articleSlugTag(article.slug), "seconds");

  revalidatePath("/admin");
  revalidatePath("/admin/articles");
  revalidatePath("/admin", "layout");

  if (article?.id) {
    revalidatePath(`/admin/articles/${article.id}/edit`);
    revalidatePath(`/admin/articles/${article.id}/preview`);
  }

  if (article?.slug) {
    revalidatePath(`/articles/${article.slug}`);
  }
}
