import type { CSSProperties } from "react";
import type { ProductGridBlockData } from "./types";
import {
  getResponsiveGridStyle,
  withResponsiveGridColumnDefaults,
  type GridImageAspect,
} from "./responsive-grid-columns";

const PRODUCT_GRID_DEFAULT_ASPECT: GridImageAspect = "4/3";

/** Ensure product grids always carry explicit column defaults (editable later). */
export function withProductGridColumnDefaults(data: ProductGridBlockData): ProductGridBlockData {
  return withResponsiveGridColumnDefaults({
    ...data,
    image_aspect: data.image_aspect ?? PRODUCT_GRID_DEFAULT_ASPECT,
  });
}

export function getProductGridStyle(data: ProductGridBlockData): CSSProperties {
  return getResponsiveGridStyle({
    ...data,
    image_aspect: data.image_aspect ?? PRODUCT_GRID_DEFAULT_ASPECT,
  });
}

export function productGridUsesMatchAspect(data: ProductGridBlockData): boolean {
  const aspect = data.image_aspect ?? PRODUCT_GRID_DEFAULT_ASPECT;
  return aspect !== "auto";
}
