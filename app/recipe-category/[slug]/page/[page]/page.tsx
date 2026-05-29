import type { Metadata } from "next";

import { RecipeCategoryPage } from "@/components/recipe-category-page";

import { getTaxonomy } from "@/data/recipe-taxonomies";

import {

  getStaticParamsForKind,

  metadataForTaxonomy,

  resolveRecipeCategoryPage,

} from "@/lib/recipe-category-page-props";



type PageProps = {

  params: Promise<{ slug: string; page: string }>;

};



export async function generateStaticParams() {

  const slugs = getStaticParamsForKind("recipe-category");

  const params: { slug: string; page: string }[] = [];

  for (const { slug } of slugs) {

    const taxonomy = getTaxonomy("recipe-category", slug);

    if (!taxonomy) continue;

    const { searchRecipes } = await import("@/lib/recipe-search");

    const result = await searchRecipes({ age: slug, page: 1 });

    const totalPages = Math.ceil(result.total / result.pageSize);

    for (let p = 2; p <= totalPages; p++) {

      params.push({ slug, page: String(p) });

    }

  }

  return params;

}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { slug, page } = await params;

  const taxonomy = getTaxonomy("recipe-category", slug);

  if (!taxonomy) {

    return { title: "Recipes | Annabel Karmel" };

  }

  return metadataForTaxonomy(`${taxonomy.label} – Page ${page}`);

}



export default async function RecipeCategoryPagedListingPage({ params }: PageProps) {

  const { slug, page: pageStr } = await params;

  const pageNum = Number.parseInt(pageStr, 10);

  if (!Number.isFinite(pageNum) || pageNum < 2) {

    const { notFound } = await import("next/navigation");

    notFound();

  }



  const resolved = await resolveRecipeCategoryPage("recipe-category", slug, {

    pathPage: pageNum,

  });



  return <RecipeCategoryPage {...resolved} />;

}

