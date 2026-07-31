import type { CSSProperties } from 'react';
import type { RecipeGridBlockData } from './types';
import {
  getResponsiveGridStyle,
  withResponsiveGridColumnDefaults,
  type GridImageAspect,
} from './responsive-grid-columns';

const RECIPE_GRID_DEFAULT_ASPECT: GridImageAspect = '4/3';

/** Ensure grid layouts always carry explicit column defaults (editable later). */
export function withRecipeGridColumnDefaults(
  data: RecipeGridBlockData,
): RecipeGridBlockData {
  if (data.layout !== 'grid') return data;
  return withResponsiveGridColumnDefaults({
    ...data,
    image_aspect: data.image_aspect ?? RECIPE_GRID_DEFAULT_ASPECT,
  });
}

export function getRecipeGridStyle(
  data: RecipeGridBlockData,
): CSSProperties | undefined {
  if (data.layout !== 'grid') return undefined;
  return getResponsiveGridStyle({
    ...data,
    image_aspect: data.image_aspect ?? RECIPE_GRID_DEFAULT_ASPECT,
  });
}

export function recipeGridUsesMatchAspect(data: RecipeGridBlockData): boolean {
  const aspect = data.image_aspect ?? RECIPE_GRID_DEFAULT_ASPECT;
  return aspect !== 'auto';
}
