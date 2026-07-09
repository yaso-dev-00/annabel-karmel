import { revalidatePath, revalidateTag } from "next/cache";

export const ADVICE_ARTICLES_CACHE_TAG = "advice-articles";

export function adviceArticleIdTag(id: string): string {
  return `advice-article:${id}`;
}

export function adviceArticleSlugTag(slug: string): string {
  return `advice-article-slug:${slug}`;
}

type RevalidateArticle = {
  id?: string;
  slug?: string;
};

export function revalidateAdviceArticlePages(article?: RevalidateArticle): void {
  // Use "seconds" so stale content expires quickly after publish.
  revalidateTag(ADVICE_ARTICLES_CACHE_TAG, "seconds");
  if (article?.id) revalidateTag(adviceArticleIdTag(article.id), "seconds");
  if (article?.slug) revalidateTag(adviceArticleSlugTag(article.slug), "seconds");

  revalidatePath("/admin");
  revalidatePath("/admin/advice");
  revalidatePath("/admin", "layout");

  if (article?.id) {
    revalidatePath(`/admin/advice/${article.id}/edit`);
    revalidatePath(`/admin/advice/${article.id}/preview`);
  }

  if (article?.slug) {
    revalidatePath(`/advice/${article.slug}`);
  }
}
