import type { Metadata } from "next";

import { RecipeCategoryPage } from "@/components/RecipeScreen/RecipeCategoryPage";

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

  const slugs = getStaticParamsForKind("meal-time");

  const params: { slug: string; page: string }[] = [];

  for (const { slug } of slugs) {

    const { searchRecipes } = await import("@/lib/recipe-search");

    const result = await searchRecipes({ mealTime: slug, page: 1 });

    const totalPages = Math.ceil(result.total / result.pageSize);

    for (let p = 2; p <= totalPages; p++) {

      params.push({ slug, page: String(p) });

    }

  }

  return params;

}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { slug, page } = await params;

  const taxonomy = getTaxonomy("meal-time", slug);

  if (!taxonomy) {

    return { title: "Recipes | Annabel Karmel" };

  }

  return metadataForTaxonomy(`${taxonomy.label} – Page ${page}`);

}



export default async function MealTimePagedListingPage({ params }: PageProps) {

  const { slug, page: pageStr } = await params;

  const pageNum = Number.parseInt(pageStr, 10);

  if (!Number.isFinite(pageNum) || pageNum < 2) {

    const { notFound } = await import("next/navigation");

    notFound();

  }



  const resolved = await resolveRecipeCategoryPage("meal-time", slug, {

    pathPage: pageNum,

  });



  return <RecipeCategoryPage {...resolved} />;

}

