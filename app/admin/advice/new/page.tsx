import { AdminShell } from "@/components/Admin/AdminShell";
import { AdviceArticleEditor } from "@/components/Admin/AdviceArticleEditor/advice-article-editor";
import { createDefaultArticle } from "@/components/Admin/AdviceArticleEditor/create-default-article";

export default function AdminAdviceNewPage() {
  const article = createDefaultArticle();

  return (
    <AdminShell breadcrumb="New article">
      <AdviceArticleEditor initialArticle={article} isNew />
    </AdminShell>
  );
}
