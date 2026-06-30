import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TablewareProductPageContent } from "@/components/tableware-product-page";
import {
  getAllTablewareProductSlugs,
  getTablewareProductPageData,
} from "@/data/tableware-product-page";

type TablewareProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTablewareProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TablewareProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getTablewareProductPageData(slug);

  if (!data) {
    return {
      title: "Product not found | Annabel Karmel",
    };
  }

  return {
    title: `${data.title} | Grow Tableware | Annabel Karmel`,
    description: data.metaDescription,
  };
}

export default async function TablewareProductPage({ params }: TablewareProductPageProps) {
  const { slug } = await params;
  const data = getTablewareProductPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <TablewareProductPageContent data={data} />
      <SiteFooter />
    </>
  );
}
