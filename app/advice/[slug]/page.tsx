import { AdviceArticleShell } from "@/components/ContentBlocks/advice-article-shell";
import { getPublishedAdviceArticleBySlug } from "@/lib/admin/advice-articles-store";
import { adviceArticleSlugs } from "@/data/resolve-article-listing";
import { SAMPLE_ARTICLE_SLUG } from "@/lib/content-blocks/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [{ slug: SAMPLE_ARTICLE_SLUG }, ...Array.from(adviceArticleSlugs).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedAdviceArticleBySlug(slug);
  if (!article) return { title: "Advice | Annabel Karmel" };
  return {
    title: article.seo_title,
    description: article.seo_description,
  };
}

export default async function AdviceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedAdviceArticleBySlug(slug);
  if (!article) notFound();
  return <AdviceArticleShell article={article} />;
}
