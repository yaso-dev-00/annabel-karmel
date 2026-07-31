'use client';

import {
  PreviewViewport,
  type PreviewViewportHandle,
} from '@/components/Admin/BlockEditor/preview-viewport';
import { RecipeDetailPage } from '@/components/RecipeScreen/RecipeDetailPage';
import { recipeToDetail } from '@/lib/recipes/recipe-to-detail';
import type { Recipe } from '@/lib/recipes/types';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import { forwardRef, memo, useDeferredValue, type ReactNode } from 'react';

import './recipe-preview-layout.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.annabelkarmel.com';

type RecipeLivePreviewProps = {
  recipe: Recipe;
  fullscreenActions?: ReactNode;
  className?: string;
  defaultFullscreen?: boolean;
};

const RecipePagePreview = memo(function RecipePagePreview({
  recipe,
}: {
  recipe: Recipe;
}) {
  const detail = recipeToDetail(recipe);
  const shareUrl = `${SITE_URL}${detail.href}`;
  return <RecipeDetailPage recipe={detail} shareUrl={shareUrl} />;
});

export const RecipeLivePreview = forwardRef<
  PreviewViewportHandle,
  RecipeLivePreviewProps
>(function RecipeLivePreview(
  { recipe, fullscreenActions, className, defaultFullscreen },
  ref,
) {
  const deferredRecipe = useDeferredValue(recipe);

  return (
    <PreviewViewport
      ref={ref}
      className={className ?? blockStyles.previewPanelDocked}
      bodyClassName={blockStyles.previewBodyFlush}
      fullscreenActions={fullscreenActions}
      defaultFullscreen={defaultFullscreen}
      dockedViewport="mobile"
      dockedWidth={400}
      viewportWidthOverrides={{ mobile: 400 }}
      title="Live preview"
    >
      <RecipePagePreview recipe={deferredRecipe} />
    </PreviewViewport>
  );
});
