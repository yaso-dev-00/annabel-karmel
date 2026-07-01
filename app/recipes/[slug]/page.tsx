import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecipeDetailPage } from "@/components/RecipeScreen/RecipeDetailPage";
import { recipeDetailDemoContent } from "@/data/recipe-detail-demo";
import { getRecipePage } from "@/lib/recipe-detail";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.annabelkarmel.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipePage(slug);
  if (!recipe) {
    return { title: "Recipe | Annabel Karmel" };
  }
  return {
    title: `${recipe.title} | Annabel Karmel`,
    description: recipeDetailDemoContent.description,
    openGraph: {
      title: recipe.title,
      description: recipeDetailDemoContent.description,
      images: [{ url: recipeDetailDemoContent.image }],
    },
  };
}

export default async function RecipeDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipePage(slug);
  if (!recipe) {
    notFound();
  }

  const shareUrl = `${SITE_URL}${recipe.href}`;

  return <RecipeDetailPage title={recipe.title} shareUrl={shareUrl} />;
}
