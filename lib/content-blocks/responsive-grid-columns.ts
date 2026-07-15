import type { CSSProperties } from "react";

export type ResponsiveGridColumnCount = 1 | 2 | 3 | 4;

export type GridImageAspect = "auto" | "4/3" | "1/1" | "3/2" | "3/4";

export type ResponsiveGridColumns = {
  columns_desktop?: ResponsiveGridColumnCount;
  columns_tablet?: ResponsiveGridColumnCount;
  columns_mobile?: ResponsiveGridColumnCount;
  /**
   * Shared image aspect for grid cells. Prefer this over dragging image height —
   * it keeps desktop rows even and stays responsive on mobile/tablet.
   */
  image_aspect?: GridImageAspect;
};

export const GRID_IMAGE_ASPECT_OPTIONS: {
  value: GridImageAspect;
  label: string;
  hint: string;
}[] = [
  { value: "auto", label: "Natural", hint: "Each image keeps its own shape (best for tip graphics)" },
  { value: "4/3", label: "Match 4:3", hint: "Even row height — good for photos" },
  { value: "1/1", label: "Match square", hint: "Even square cards" },
  { value: "3/2", label: "Match 3:2", hint: "Wider photo cards" },
  { value: "3/4", label: "Match 3:4", hint: "Taller portrait cards" },
];

export const RESPONSIVE_GRID_COLUMN_OPTIONS: ResponsiveGridColumnCount[] = [1, 2, 3, 4];

export const RESPONSIVE_GRID_DEFAULT_COLUMNS = {
  desktop: 3 as ResponsiveGridColumnCount,
  tablet: 2 as ResponsiveGridColumnCount,
  mobile: 1 as ResponsiveGridColumnCount,
};

export const RESPONSIVE_GRID_DEFAULT_IMAGE_ASPECT: GridImageAspect = "auto";

function clampColumnCount(
  value: unknown,
  fallback: ResponsiveGridColumnCount,
): ResponsiveGridColumnCount {
  const n = typeof value === "number" ? value : Number(value);
  if (n === 1 || n === 2 || n === 3 || n === 4) return n;
  return fallback;
}

export function resolveGridImageAspect(value?: GridImageAspect): GridImageAspect {
  if (value === "4/3" || value === "1/1" || value === "3/2" || value === "3/4" || value === "auto") {
    return value;
  }
  return RESPONSIVE_GRID_DEFAULT_IMAGE_ASPECT;
}

export function resolveResponsiveGridColumns(data: ResponsiveGridColumns): {
  desktop: ResponsiveGridColumnCount;
  tablet: ResponsiveGridColumnCount;
  mobile: ResponsiveGridColumnCount;
} {
  return {
    desktop: clampColumnCount(data.columns_desktop, RESPONSIVE_GRID_DEFAULT_COLUMNS.desktop),
    tablet: clampColumnCount(data.columns_tablet, RESPONSIVE_GRID_DEFAULT_COLUMNS.tablet),
    mobile: clampColumnCount(data.columns_mobile, RESPONSIVE_GRID_DEFAULT_COLUMNS.mobile),
  };
}

/** Fill missing column fields with defaults (user can change later). */
export function withResponsiveGridColumnDefaults<T extends ResponsiveGridColumns>(data: T): T {
  const columns = resolveResponsiveGridColumns(data);
  return {
    ...data,
    columns_desktop: data.columns_desktop ?? columns.desktop,
    columns_tablet: data.columns_tablet ?? columns.tablet,
    columns_mobile: data.columns_mobile ?? columns.mobile,
    image_aspect: data.image_aspect ?? RESPONSIVE_GRID_DEFAULT_IMAGE_ASPECT,
  };
}

export function getResponsiveGridStyle(data: ResponsiveGridColumns): CSSProperties {
  const columns = resolveResponsiveGridColumns(data);
  const aspect = resolveGridImageAspect(data.image_aspect);
  const style: CSSProperties = {
    ["--cms-grid-cols-desktop" as string]: String(columns.desktop),
    ["--cms-grid-cols-tablet" as string]: String(columns.tablet),
    ["--cms-grid-cols-mobile" as string]: String(columns.mobile),
  };
  if (aspect !== "auto") {
    (style as Record<string, string>)["--cms-grid-image-aspect"] = aspect.replace("/", " / ");
  }
  return style;
}
