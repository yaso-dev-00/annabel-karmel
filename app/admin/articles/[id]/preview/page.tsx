import { ArticlePreviewPageClient } from '@/components/Admin/ArticleEditor/preview-page-client';
import { DisabledArticlePreview } from '@/components/Admin/AdviceArticleEditor/disabled-article-preview';
import { getArticleById } from '@/lib/admin/articles-store';
import { isArticleDisabled } from '@/lib/admin/article-status';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminArticlesPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();
  if (isArticleDisabled(article)) {
    return <DisabledArticlePreview title={article.title} />;
  }
  return <ArticlePreviewPageClient article={article} />;
}
