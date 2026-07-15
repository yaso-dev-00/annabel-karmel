import { AdminShell } from "@/components/Admin/AdminShell";
import { ArticleEditor } from "@/components/Admin/ArticleEditor/article-editor";
import { createDefaultSiteArticle } from "@/components/Admin/ArticleEditor/create-default-article";

export default function AdminArticlesNewPage() {
  const article = createDefaultSiteArticle();

  return (
    <AdminShell breadcrumb="New article">
      <ArticleEditor initialArticle={article} isNew />
    </AdminShell>
  );
}
