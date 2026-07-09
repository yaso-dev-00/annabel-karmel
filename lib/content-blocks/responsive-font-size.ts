import type { CSSProperties } from "react";
import type { BlockSettings } from "./types";
import { normalizeCssLength } from "./css-length";

export type ResponsiveFontSizeBreakpoint = "mobile" | "tablet" | "desktop";

export function hasResponsiveFontSize(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return Boolean(
    settings.font_size_mobile?.trim() ||
      settings.font_size_tablet?.trim() ||
      settings.font_size_desktop?.trim(),
  );
}

export function applyResponsiveFontSizeStyle(
  style: CSSProperties,
  settings?: BlockSettings,
): void {
  if (!settings) return;

  const record = style as Record<string, string>;
  const mobile = settings.font_size_mobile?.trim();
  const tablet = settings.font_size_tablet?.trim();
  const desktop = settings.font_size_desktop?.trim();

  if (mobile) record["--block-font-size-mobile"] = normalizeCssLength(mobile);
  if (tablet) record["--block-font-size-tablet"] = normalizeCssLength(tablet);
  if (desktop) record["--block-font-size-desktop"] = normalizeCssLength(desktop);
}
