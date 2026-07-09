import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { getAllAdviceArticles } from "@/lib/admin/advice-articles-store";
import { resolveAdviceArticleStatus } from "@/lib/admin/advice-article-status";
import { SAMPLE_ARTICLE_ID, SAMPLE_ARTICLE_SLUG } from "@/lib/content-blocks/types";

export default async function AdminDashboardPage() {
  const articles = await getAllAdviceArticles();
  const sample = articles.find((a) => a.slug === SAMPLE_ARTICLE_SLUG);
  const counts = articles.reduce(
    (acc, article) => {
      const status = resolveAdviceArticleStatus(article);
      acc[status] += 1;
      return acc;
    },
    { draft: 0, published: 0, scheduled: 0, private: 0, disabled: 0 },
  );

  return (
    <AdminShell title="Dashboard" breadcrumb="Dashboard">
      <div className="grid2">
        <div className="card">
          <h2 className="cardTitle">Advice Articles</h2>
          <p className="cardDesc">
            {articles.length} total · {counts.published} published · {counts.draft} drafts
            {counts.scheduled > 0 ? ` · ${counts.scheduled} scheduled` : ""}
            {counts.private > 0 ? ` · ${counts.private} private` : ""}
            {counts.disabled > 0 ? ` · ${counts.disabled} disabled` : ""}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/admin/advice" className="btn btnPrimary">
              View all articles
            </Link>
            {sample ? (
              <Link href={`/admin/advice/${sample.id}/edit`} className="btn btnSecondary">
                Edit sample article
              </Link>
            ) : null}
            <Link href="/admin/advice/new" className="btn btnGhost">
              + New article
            </Link>
          </div>
        </div>
        <div className="card">
          <h2 className="cardTitle">Quick preview</h2>
          <p className="cardDesc">
            View the sample article on the public site to see ContentBlockRenderer output.
          </p>
          <Link
            href={`/advice/${SAMPLE_ARTICLE_SLUG}`}
            className="btn btnSecondary"
            target="_blank"
          >
            Open /advice/{SAMPLE_ARTICLE_SLUG}
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
