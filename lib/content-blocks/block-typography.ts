import type { CSSProperties } from "react";
import type { BlockSettings } from "./types";
import { normalizeCssLength } from "./css-length";

/** Unitless multipliers (e.g. 1.42) or CSS lengths (e.g. 24px, 1.5em). */
export function normalizeLineHeight(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[\d.]+$/.test(trimmed)) return trimmed;
  return normalizeCssLength(trimmed);
}

export function hasBlockFontWeight(settings?: BlockSettings): boolean {
  return Boolean(settings?.font_weight);
}

export function hasBlockLineHeight(settings?: BlockSettings): boolean {
  return Boolean(settings?.line_height?.trim());
}

export function hasBlockTypographyOverride(settings?: BlockSettings): boolean {
  return hasBlockFontWeight(settings) || hasBlockLineHeight(settings);
}

export function applyBlockTypographyStyle(style: CSSProperties, settings?: BlockSettings): void {
  if (!settings) return;

  const record = style as Record<string, string>;

  if (settings.font_weight) {
    style.fontWeight = settings.font_weight;
    record["--block-font-weight"] = settings.font_weight;
  }

  const lineHeight = settings.line_height?.trim();
  if (lineHeight) {
    const normalized = normalizeLineHeight(lineHeight);
    style.lineHeight = normalized;
    record["--block-line-height"] = normalized;
  }
}
