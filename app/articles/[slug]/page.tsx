import { ArticleShell } from '@/components/ContentBlocks/article-shell';
import { getPublishedArticleBySlug } from '@/lib/admin/articles-store';
import {
  SAMPLE_SITE_ARTICLE_SLUG,
  SHOWCASE_SITE_ARTICLE_SLUG,
} from '@/lib/content-blocks/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  return [
    { slug: SAMPLE_SITE_ARTICLE_SLUG },
    { slug: SHOWCASE_SITE_ARTICLE_SLUG },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return { title: 'Articles | Annabel Karmel' };
  return {
    title: article.seo_title,
    description: article.seo_description,
  };
}

export default async function SiteArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleShell article={article} />;
}
