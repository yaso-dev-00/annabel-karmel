'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminListToolbar } from '@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar';
import {
  ARTICLE_STATUS_LABELS,
  ARTICLE_STATUSES,
  getArticleStatusBadgeClass,
  isArticleDisabled,
  resolveArticleStatus,
} from '@/lib/admin/article-status';
import {
  formatAdminListDate,
  humanizeSlug,
  matchesAdminListSearch,
} from '@/lib/admin/format-admin-list';
import type { Article } from '@/lib/content-blocks/types';
import { SAMPLE_SITE_ARTICLE_SLUG } from '@/lib/content-blocks/types';
import { getArticleCategoryLabel } from '@/lib/content-blocks/article-categories';

type ArticleListProps = {
  articles: Article[];
};

function ArticleStatusBadge({ article }: { article: Article }) {
  const status = resolveArticleStatus(article);
  return (
    <span className={`badge ${getArticleStatusBadgeClass(status)}`}>
      {ARTICLE_STATUS_LABELS[status]}
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
      className={`tableRowClickable${className ? ` ${className}` : ''}`}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
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

export function ArticleList({ articles }: ArticleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = useMemo(
    () => [
      { value: 'all', label: 'All statuses' },
      ...ARTICLE_STATUSES.map((status) => ({
        value: status,
        label: ARTICLE_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredArticles = useMemo(() => {
    const sample = articles.find(
      (article) => article.slug === SAMPLE_SITE_ARTICLE_SLUG,
    );
    const rest = articles.filter(
      (article) => article.slug !== SAMPLE_SITE_ARTICLE_SLUG,
    );

    const matchesFilters = (article: Article) => {
      const status = resolveArticleStatus(article);
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(
        searchQuery,
        article.title,
        article.slug,
      );
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
              const isSample = article.slug === SAMPLE_SITE_ARTICLE_SLUG;
              const isDisabled = isArticleDisabled(article);

              return (
                <ClickableTableRow
                  key={article.id}
                  href={`/admin/articles/${article.id}/edit`}
                  className={isDisabled ? 'tableRowDisabled' : undefined}
                >
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">
                      {article.title}
                      {isSample ? (
                        <span className="badge badgeSample">Sample</span>
                      ) : null}
                    </span>
                    <span className="tableTitlePath">
                      /articles/{article.slug}
                    </span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">
                        Hidden from site
                      </span>
                    ) : null}
                  </td>
                  <td>
                    <ArticleStatusBadge article={article} />
                  </td>
                  <td>
                    {getArticleCategoryLabel(article.category_slug) ||
                      humanizeSlug(article.category_slug)}
                  </td>
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
