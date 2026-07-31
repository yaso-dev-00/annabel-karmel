import Link from 'next/link';
import { AdminShell } from '@/components/Admin/AdminShell';
import { ArticleList } from '@/components/Admin/ArticleList/article-list';
import { getAllArticles } from '@/lib/admin/articles-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminArticlesListPage() {
  const articles = await getAllArticles();

  return (
    <AdminShell
      title="Articles"
      breadcrumb="Articles"
      actions={
        <Link href="/admin/articles/new" className="btn btnPrimary">
          + New article
        </Link>
      }
    >
      <ArticleList articles={articles} />
    </AdminShell>
  );
}
