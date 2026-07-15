"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  ADVICE_ARTICLE_STATUS_LABELS,
  ADVICE_ARTICLE_STATUSES,
  getAdviceArticleStatusBadgeClass,
  isAdviceArticleDisabled,
  resolveAdviceArticleStatus,
} from "@/lib/admin/advice-article-status";
import {
  formatAdminListDate,
  humanizeSlug,
  matchesAdminListSearch,
} from "@/lib/admin/format-admin-list";
import type { AdviceArticle } from "@/lib/content-blocks/types";
import { SAMPLE_ARTICLE_SLUG } from "@/lib/content-blocks/types";

type AdviceArticleListProps = {
  articles: AdviceArticle[];
};

function ArticleStatusBadge({ article }: { article: AdviceArticle }) {
  const status = resolveAdviceArticleStatus(article);
  return (
    <span className={`badge ${getAdviceArticleStatusBadgeClass(status)}`}>
      {ADVICE_ARTICLE_STATUS_LABELS[status]}
    </span>
  );
}

function ClickableTableRow({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      className={`tableRowClickable${className ? ` ${className}` : ""}`}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </tr>
  );
}

export function AdviceArticleList({ articles }: AdviceArticleListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...ADVICE_ARTICLE_STATUSES.map((status) => ({
        value: status,
        label: ADVICE_ARTICLE_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredArticles = useMemo(() => {
    const sample = articles.find((article) => article.slug === SAMPLE_ARTICLE_SLUG);
    const rest = articles.filter((article) => article.slug !== SAMPLE_ARTICLE_SLUG);

    const matchesFilters = (article: AdviceArticle) => {
      const status = resolveAdviceArticleStatus(article);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(searchQuery, article.title, article.slug);
      return matchesStatus && matchesSearch;
    };

    const filteredSample = sample && matchesFilters(sample) ? [sample] : [];
    const filteredRest = rest.filter(matchesFilters);

    return [...filteredSample, ...filteredRest];
  }, [articles, searchQuery, statusFilter]);

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder="Search articles..."
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.length === 0 ? (
            <tr>
              <td colSpan={4} className="tableEmpty">
                No articles match your search.
              </td>
            </tr>
          ) : (
            filteredArticles.map((article) => {
              const isSample = article.slug === SAMPLE_ARTICLE_SLUG;
              const isDisabled = isAdviceArticleDisabled(article);

              return (
                <ClickableTableRow
                  key={article.id}
                  href={`/admin/advice/${article.id}/edit`}
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">
                      {article.title}
                      {isSample ? <span className="badge badgeSample">Sample</span> : null}
                    </span>
                    <span className="tableTitlePath">/advice/{article.slug}</span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>
                    <ArticleStatusBadge article={article} />
                  </td>
                  <td>{humanizeSlug(article.category_slug)}</td>
                  <td>{formatAdminListDate(article.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
