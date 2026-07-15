import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { AdviceArticleList } from "@/components/Admin/AdviceArticleList/advice-article-list";
import { getAllAdviceArticles } from "@/lib/admin/advice-articles-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminAdviceListPage() {
  const articles = await getAllAdviceArticles();

  return (
    <AdminShell
      title="Advice Articles"
      breadcrumb="Advice Articles"
      actions={
        <Link href="/admin/advice/new" className="btn btnPrimary">
          + New article
        </Link>
      }
    >
      <AdviceArticleList articles={articles} />
    </AdminShell>
  );
}
