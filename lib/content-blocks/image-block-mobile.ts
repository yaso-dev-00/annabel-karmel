import type { CSSProperties } from "react";
import type { ImageBlockData } from "./types";

/** Resolved mobile image path (supports legacy fallback_src). */
export function resolveImageBlockMobileSrc(data: ImageBlockData): string | undefined {
  const mobile = data.mobile_src?.trim() || data.fallback_src?.trim();
  return mobile || undefined;
}

/**
 * Mobile image is active when explicitly toggled on, or when legacy data has a
 * fallback/mobile src and the toggle was never set (back-compat).
 */
export function isImageBlockMobileEnabled(data: ImageBlockData): boolean {
  if (data.use_mobile_image === false) return false;
  if (data.use_mobile_image === true) return true;
  return Boolean(resolveImageBlockMobileSrc(data));
}

export function imageBlockHasMobileSwap(data: ImageBlockData): boolean {
  if (!isImageBlockMobileEnabled(data)) return false;
  const desktop = data.src?.trim();
  const mobile = resolveImageBlockMobileSrc(data);
  return Boolean(desktop && mobile && mobile !== desktop);
}

export type ImageResizeBreakpoint = "mobile" | "tablet" | "desktop";

/** Map preview-frame / viewport width to the resize target breakpoint. */
export function resolveImageResizeBreakpoint(width: number): ImageResizeBreakpoint {
  if (width <= 767) return "mobile";
  if (width <= 1023) return "tablet";
  return "desktop";
}

export function resolvePreviewImageBreakpoint(element: HTMLElement | null): ImageResizeBreakpoint {
  const frame = element?.closest("[data-preview-frame]") as HTMLElement | null;
  const width =
    frame?.clientWidth ?? (typeof window !== "undefined" ? window.innerWidth : 1280);
  return resolveImageResizeBreakpoint(width);
}

function parsePx(value?: string): number {
  if (!value?.trim()) return NaN;
  return parseFloat(value);
}

function sizeStyleFromDims(width?: string, height?: string): CSSProperties | undefined {
  const w = width?.trim();
  const h = height?.trim();
  if (!w && !h) return undefined;

  const widthPx = parsePx(w);
  const heightPx = parsePx(h);
  const style: CSSProperties = {
    width: "100%",
    maxWidth: w ?? "100%",
    height: "auto",
  };

  if (widthPx > 0 && heightPx > 0) {
    style.aspectRatio = `${widthPx} / ${heightPx}`;
    style.objectFit = "cover";
  } else if (h) {
    style.height = h;
    style.objectFit = "cover";
  }

  return style;
}

/** Desktop image style — used on the desktop `<img>` (and tablet via aspect scaling). */
export function getImageBlockDesktopStyle(data: ImageBlockData): CSSProperties | undefined {
  return sizeStyleFromDims(data.width, data.height);
}

/** Mobile image style — only for the mobile `<img>` when swap is on. */
export function getImageBlockMobileStyle(data: ImageBlockData): CSSProperties | undefined {
  return sizeStyleFromDims(data.mobile_width, data.mobile_height);
}

/**
 * CSS variables for a single-image block so mobile can override size without
 * replacing desktop width/height fields. Applied on the `<img>`.
 */
export function getImageBlockSharedSizeVars(data: ImageBlockData): CSSProperties | undefined {
  const desktopW = data.width?.trim();
  const desktopH = data.height?.trim();
  const mobileW = data.mobile_width?.trim();
  const mobileH = data.mobile_height?.trim();
  if (!desktopW && !desktopH && !mobileW && !mobileH) return undefined;

  const style: CSSProperties = {};
  const record = style as Record<string, string>;

  if (desktopW) record["--img-max-w"] = desktopW;
  const dw = parsePx(desktopW);
  const dh = parsePx(desktopH);
  if (dw > 0 && dh > 0) {
    record["--img-ar"] = `${dw} / ${dh}`;
  }

  if (mobileW) record["--img-mobile-max-w"] = mobileW;
  const mw = parsePx(mobileW);
  const mh = parsePx(mobileH);
  if (mw > 0 && mh > 0) {
    record["--img-mobile-ar"] = `${mw} / ${mh}`;
  }

  return style;
}

export function imageBlockHasCustomSize(data: ImageBlockData): boolean {
  return Boolean(
    data.width?.trim() ||
      data.height?.trim() ||
      data.mobile_width?.trim() ||
      data.mobile_height?.trim(),
  );
}
