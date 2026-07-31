import type { CSSProperties } from 'react';
import type { ImageStackBlockData } from './types';
import {
  RESPONSIVE_GRID_COLUMN_OPTIONS,
  RESPONSIVE_GRID_DEFAULT_COLUMNS,
  getResponsiveGridStyle,
  resolveResponsiveGridColumns,
  withResponsiveGridColumnDefaults,
  type ResponsiveGridColumnCount,
} from './responsive-grid-columns';

/** @deprecated Prefer RESPONSIVE_GRID_COLUMN_OPTIONS */
export const IMAGE_STACK_COLUMN_OPTIONS = RESPONSIVE_GRID_COLUMN_OPTIONS;

/** @deprecated Prefer RESPONSIVE_GRID_DEFAULT_COLUMNS */
export const IMAGE_STACK_DEFAULT_COLUMNS = RESPONSIVE_GRID_DEFAULT_COLUMNS;

export type { ResponsiveGridColumnCount as ImageStackColumnCount };

export function resolveImageStackColumns(data: ImageStackBlockData) {
  return resolveResponsiveGridColumns(data);
}

/** Ensure grid layouts always carry explicit column defaults (editable later). */
export function withImageStackColumnDefaults(
  data: ImageStackBlockData,
): ImageStackBlockData {
  if (data.layout !== 'grid') return data;
  return withResponsiveGridColumnDefaults(data);
}

export function getImageStackGridStyle(
  data: ImageStackBlockData,
): CSSProperties | undefined {
  if (data.layout !== 'grid') return undefined;
  return getResponsiveGridStyle(data);
}
