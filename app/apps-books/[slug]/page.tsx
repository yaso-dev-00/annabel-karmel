import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CookbookDetailPageContent } from "@/components/MarketingScreen/CookbookDetailPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getAllCookbookSlugs, getCookbookBySlug } from "@/lib/cookbooks";

type CookbookPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCookbookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CookbookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cookbook = getCookbookBySlug(slug);

  if (!cookbook) {
    return {
      title: "Cookbook not found | Annabel Karmel",
    };
  }

  return {
    title: `${cookbook.title} | Annabel Karmel`,
    description: cookbook.metaDescription,
  };
}

export default async function CookbookPage({ params }: CookbookPageProps) {
  const { slug } = await params;
  const cookbook = getCookbookBySlug(slug);

  if (!cookbook) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <CookbookDetailPageContent cookbook={cookbook} />
      <SiteFooter />
    </>
  );
}
