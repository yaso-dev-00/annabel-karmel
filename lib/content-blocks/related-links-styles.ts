import type { CSSProperties } from "react";
import type { RelatedLinksBlockData } from "./types";

export const RELATED_LINK_STYLE_LABELS: Record<
  NonNullable<RelatedLinksBlockData["link_style"]>,
  string
> = {
  underline: "Underline",
  plain: "Plain",
  arrow: "Arrow (→)",
};

export const RELATED_LIST_SPACING_LABELS: Record<
  NonNullable<RelatedLinksBlockData["list_spacing"]>,
  string
> = {
  compact: "Compact",
  normal: "Normal",
  loose: "Loose",
};

export const RELATED_LINK_COLOR_PRESETS = [
  { value: "", label: "Brand (default)" },
  { value: "#b34769", label: "Brand pink" },
  { value: "#d73b67", label: "Brand strong" },
  { value: "#8f2f58", label: "Brand deep" },
  { value: "#3f3841", label: "Body" },
  { value: "#3d3d3d", label: "Heading" },
  { value: "#6d5757", label: "Muted" },
  { value: "#261919", label: "Ink" },
] as const;

export const DEFAULT_LINK_COLOR = "#b34769";

export function resolveRelatedLinksStyle(data: RelatedLinksBlockData): CSSProperties {
  return {
    ["--related-link-color" as string]: data.link_color ?? DEFAULT_LINK_COLOR,
  };
}

export function getRelatedLinksListClass(
  data: RelatedLinksBlockData,
  styles: Record<string, string>,
): string {
  if (data.layout === "row") {
    return styles.relatedLinksRow;
  }
  const classes = [styles.list, styles.relatedLinksList];
  const spacing = data.list_spacing ?? "normal";
  if (spacing === "compact") classes.push(styles.relatedLinksCompact);
  if (spacing === "loose") classes.push(styles.relatedLinksLoose);
  return classes.join(" ");
}

export function getRelatedLinkClass(
  data: RelatedLinksBlockData,
  styles: Record<string, string>,
): string {
  if (data.layout === "row") {
    return styles.relatedSocialLink;
  }
  const classes = [styles.relatedLink];
  const linkStyle = data.link_style ?? "underline";
  if (linkStyle === "plain") classes.push(styles.relatedLinkPlain);
  if (linkStyle === "arrow") classes.push(styles.relatedLinkArrow);
  return classes.join(" ");
}
