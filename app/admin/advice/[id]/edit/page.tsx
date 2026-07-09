import { AdminShell } from "@/components/Admin/AdminShell";
import { AdviceArticleEditor } from "@/components/Admin/AdviceArticleEditor/advice-article-editor";
import { getAdviceArticleById } from "@/lib/admin/advice-articles-store";
import { SAMPLE_ARTICLE_ID } from "@/lib/content-blocks/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminAdviceEditPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getAdviceArticleById(id);
  if (!article) notFound();

  return (
    <AdminShell breadcrumb="Edit article">
      <AdviceArticleEditor key={article.updated_at} initialArticle={article} />
    </AdminShell>
  );
}

export async function generateStaticParams() {
  return [{ id: SAMPLE_ARTICLE_ID }];
}
