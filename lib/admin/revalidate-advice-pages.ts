import { revalidatePath } from "next/cache";

type RevalidateArticle = {
  id?: string;
  slug?: string;
};

export function revalidateAdviceArticlePages(article?: RevalidateArticle): void {
  revalidatePath("/admin");
  revalidatePath("/admin/advice");

  if (article?.id) {
    revalidatePath(`/admin/advice/${article.id}/edit`);
    revalidatePath(`/admin/advice/${article.id}/preview`);
  }

  if (article?.slug) {
    revalidatePath(`/advice/${article.slug}`);
  }
}
