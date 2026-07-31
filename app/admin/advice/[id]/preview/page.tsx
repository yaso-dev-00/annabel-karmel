import { PreviewPageClient } from '@/components/Admin/AdviceArticleEditor/preview-page-client';
import { DisabledArticlePreview } from '@/components/Admin/AdviceArticleEditor/disabled-article-preview';
import { getAdviceArticleById } from '@/lib/admin/advice-articles-store';
import { isAdviceArticleDisabled } from '@/lib/admin/advice-article-status';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminAdvicePreviewPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getAdviceArticleById(id);
  if (!article) notFound();
  if (isAdviceArticleDisabled(article)) {
    return <DisabledArticlePreview title={article.title} />;
  }
  return <PreviewPageClient article={article} />;
}
