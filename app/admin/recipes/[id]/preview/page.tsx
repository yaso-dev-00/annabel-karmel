import { RecipePreviewPageClient } from '@/components/Admin/RecipeEditor/preview-page-client';
import { DisabledArticlePreview } from '@/components/Admin/AdviceArticleEditor/disabled-article-preview';
import { getRecipeById } from '@/lib/admin/recipes-store';
import { isRecipeDisabled } from '@/lib/admin/recipe-status';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminRecipesPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) notFound();
  if (isRecipeDisabled(recipe)) {
    return <DisabledArticlePreview title={recipe.title} />;
  }
  return <RecipePreviewPageClient recipe={recipe} />;
}
