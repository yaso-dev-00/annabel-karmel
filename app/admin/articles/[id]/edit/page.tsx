import { AdminShell } from "@/components/Admin/AdminShell";
import { ArticleEditor } from "@/components/Admin/ArticleEditor/article-editor";
import { getArticleById } from "@/lib/admin/articles-store";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminArticlesEditPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  return (
    <AdminShell breadcrumb="Edit article">
      <ArticleEditor initialArticle={article} />
    </AdminShell>
  );
}
