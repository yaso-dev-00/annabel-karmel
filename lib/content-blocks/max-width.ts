import type { MaxWidthPreset } from "./types";
import { MAX_WIDTH_VALUES } from "./types";
import { normalizeCssLength } from "./css-length";

export function normalizeCustomMaxWidth(value: string): string {
  const normalized = normalizeCssLength(value);
  return normalized || MAX_WIDTH_VALUES.default;
}

export function resolveMaxWidth(preset?: MaxWidthPreset, custom?: string): string {
  if (preset === "custom") {
    return custom?.trim() ? normalizeCustomMaxWidth(custom) : MAX_WIDTH_VALUES.default;
  }
  return MAX_WIDTH_VALUES[preset ?? "default"];
}

export function resolveBlockMaxWidth(
  blockPreset: MaxWidthPreset | undefined,
  articlePreset?: MaxWidthPreset,
  blockCustom?: string,
  articleCustom?: string,
): string {
  if (blockPreset !== undefined) {
    return resolveMaxWidth(blockPreset, blockPreset === "custom" ? blockCustom : undefined);
  }
  return resolveMaxWidth(articlePreset, articlePreset === "custom" ? articleCustom : undefined);
}

export function formatBlockMaxWidthLabel(settings?: {
  max_width?: MaxWidthPreset;
  max_width_custom?: string;
}): string {
  if (settings?.max_width === "custom" && settings.max_width_custom) {
    return settings.max_width_custom;
  }
  if (settings?.max_width && settings.max_width !== "custom") {
    return settings.max_width;
  }
  return "inherit";
}
