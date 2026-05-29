import type { Metadata } from "next";

import { RecipeCategoryPage } from "@/components/recipe-category-page";

import { getTaxonomy } from "@/data/recipe-taxonomies";

import {

  getStaticParamsForKind,

  metadataForTaxonomy,

  resolveRecipeCategoryPage,

} from "@/lib/recipe-category-page-props";



type PageProps = {

  params: Promise<{ slug: string }>;

  searchParams?: Promise<Record<string, string | string[] | undefined>>;

};



export async function generateStaticParams() {

  return getStaticParamsForKind("meal-time");

}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { slug } = await params;

  const taxonomy = getTaxonomy("meal-time", slug);

  if (!taxonomy) {

    return { title: "Recipes | Annabel Karmel" };

  }

  return metadataForTaxonomy(taxonomy.label);

}



export default async function MealTimeListingPage({ params, searchParams }: PageProps) {

  const { slug } = await params;

  const resolved = await resolveRecipeCategoryPage("meal-time", slug, {

    searchParams: searchParams ? await searchParams : {},

  });



  return <RecipeCategoryPage {...resolved} />;

}

