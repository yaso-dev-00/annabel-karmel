'use client';

import { RecipeLivePreview } from '@/components/Admin/RecipeEditor/recipe-live-preview';
import type { Recipe } from '@/lib/recipes/types';
import styles from '@/components/Admin/BlockEditor/block-editor.module.css';

type PreviewPageClientProps = {
  recipe: Recipe;
};

export function RecipePreviewPageClient({ recipe }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <RecipeLivePreview recipe={recipe} defaultFullscreen />
    </div>
  );
}
