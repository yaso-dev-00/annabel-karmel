import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { getAllAdviceArticles } from "@/lib/admin/advice-articles-store";
import {
  ADVICE_ARTICLE_STATUS_LABELS,
  getAdviceArticleStatusBadgeClass,
  isAdviceArticleDisabled,
  resolveAdviceArticleStatus,
} from "@/lib/admin/advice-article-status";
import type { AdviceArticle } from "@/lib/content-blocks/types";
import { SAMPLE_ARTICLE_SLUG } from "@/lib/content-blocks/types";

export const dynamic = "force-dynamic";

function ArticleStatusBadge({ article }: { article: AdviceArticle }) {
  const status = resolveAdviceArticleStatus(article);
  return (
    <span className={`badge ${getAdviceArticleStatusBadgeClass(status)}`}>
      {ADVICE_ARTICLE_STATUS_LABELS[status]}
    </span>
  );
}

export default async function AdminAdviceListPage() {
  const articles = await getAllAdviceArticles();
  const sample = articles.find((a) => a.slug === SAMPLE_ARTICLE_SLUG);
  const rest = articles.filter((a) => a.slug !== SAMPLE_ARTICLE_SLUG);

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
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sample ? (
              <tr>
                <td>
                  {sample.title}{" "}
                  <span className="badge badgeSample">Sample</span>
                </td>
                <td>{sample.slug}</td>
                <td>{sample.category_slug}</td>
                <td>
                  <ArticleStatusBadge article={sample} />
                </td>
                <td className="tableActionsCell">
                  <Link href={`/admin/advice/${sample.id}/edit`} className="btn btnTableEdit">
                    Edit
                  </Link>
                </td>
              </tr>
            ) : null}
            {rest.map((article) => (
              <tr key={article.id} className={isAdviceArticleDisabled(article) ? "tableRowDisabled" : undefined}>
                <td>
                  {article.title}
                  {isAdviceArticleDisabled(article) ? (
                    <span className="tableRowDisabledNote">Hidden from site</span>
                  ) : null}
                </td>
                <td>{article.slug}</td>
                <td>{article.category_slug}</td>
                <td>
                  <ArticleStatusBadge article={article} />
                </td>
                <td className="tableActionsCell">
                  <Link href={`/admin/advice/${article.id}/edit`} className="btn btnTableEdit">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
