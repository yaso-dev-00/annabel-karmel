import type { CSSProperties } from "react";
import type {
  AnnouncementBannerBlockData,
  BlockSettings,
  BlockType,
  CalloutBlockData,
  HeroBlockData,
  MaxWidthPreset,
  NestedMiniBlockStyle,
  RichTextBlockData,
} from "./types";
import {
  resolveAnnouncementBannerBackgroundColor,
  resolveCalloutBackgroundColor,
  resolveCalloutDefaultBackgroundColor,
  resolveHeroBackgroundColor,
  resolveRichTextBackgroundColor,
  usesIntrinsicBackgroundChildBox,
} from "./block-background";
import { resolveBlockMaxWidth, resolveMaxWidth } from "./max-width";
import { applyBlockMarginStyle } from "./margin";
import { applyBlockPaddingStyle, hasCustomPadding } from "./padding";
import { normalizeCssLength } from "./css-length";
import { applyBlockBorderStyle, hasCustomBorder } from "./border";
import { applyResponsiveFontSizeStyle } from "./responsive-font-size";
import { resolveFontFamily, resolveRadius, resolveShadow } from "@/lib/design-system/tokens";

/** True when toolbar chrome should render on the inner visual box, not the wrapper. */
export function hasBlockChrome(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return (
    hasCustomBorder(settings) ||
    hasCustomPadding(settings) ||
    Boolean(settings.background_color?.trim()) ||
    Boolean(settings.border_radius) ||
    Boolean(settings.box_shadow && settings.box_shadow !== "none")
  );
}

/** CSS fallbacks when the editor has not set an explicit border radius. */
export const INTRINSIC_DEFAULT_BORDER_RADIUS = {
  callout: "12px",
  partner_promo: "12px",
  expert_attribution: "12px",
  hero: "18px",
  banner: "8px",
  cta_button: "999px",
} as const;

export type IntrinsicChildBoxOptions = {
  backgroundColor?: string;
  fullWidth?: boolean;
  defaultBorderRadius?: string;
  clipOverflow?: boolean;
};

function applyIntrinsicChromeStyle(
  style: CSSProperties,
  settings?: BlockSettings,
  options?: Pick<IntrinsicChildBoxOptions, "defaultBorderRadius" | "clipOverflow">,
): void {
  const radius = resolveRadius(settings?.border_radius);
  if (radius) {
    style.borderRadius = radius;
  } else if (options?.defaultBorderRadius) {
    style.borderRadius = options.defaultBorderRadius;
  }

  const shadow = resolveShadow(settings?.box_shadow);
  if (shadow) {
    style.boxShadow = shadow;
  }

  applyBlockBorderStyle(style, settings);

  if (options?.clipOverflow !== false && style.borderRadius) {
    style.overflow = "hidden";
  }
}

/** Layout styles for a nested mini-block inside two-column layouts. */
export function getNestedMiniBlockStyle(style?: NestedMiniBlockStyle): CSSProperties | undefined {
  if (!style) return undefined;
  const css: CSSProperties = {};
  if (style.text_align) css.textAlign = style.text_align;
  if (style.max_width) {
    css.maxWidth = resolveMaxWidth(
      style.max_width,
      style.max_width === "custom" ? style.max_width_custom : undefined,
    );
    css.width = "100%";
    if (style.text_align === "center") {
      css.marginLeft = "auto";
      css.marginRight = "auto";
    } else if (style.text_align === "right") {
      css.marginLeft = "auto";
    }
  }
  return Object.keys(css).length ? css : undefined;
}

/** Padding and min-height belong on the colored/visual inner element, not the outer wrapper. */
export function usesIntrinsicLayoutChildBox(blockType?: BlockType): boolean {
  return (
    blockType === "accordion" ||
    blockType === "announcement_banner" ||
    blockType === "callout" ||
    blockType === "cta_button" ||
    blockType === "expert_attribution" ||
    blockType === "form_embed" ||
    blockType === "hero" ||
    blockType === "multi_column_table" ||
    blockType === "partner_promo" ||
    blockType === "product_grid" ||
    blockType === "recipe_grid" ||
    blockType === "related_links" ||
    blockType === "rich_text" ||
    blockType === "table"
  );
}

/** Shared padding / bg / align / chrome for blocks whose visual box is the inner element. */
export function getIntrinsicChildBoxStyle(
  settings?: BlockSettings,
  options?: IntrinsicChildBoxOptions,
): CSSProperties {
  const style: CSSProperties = {
    boxSizing: "border-box",
  };

  if (options?.fullWidth !== false) {
    style.width = "100%";
  }

  if (options?.backgroundColor) {
    style.backgroundColor = options.backgroundColor;
  } else if (settings?.background_color?.trim()) {
    style.backgroundColor = settings.background_color.trim();
  }

  applyBlockPaddingStyle(style, settings);

  if (settings?.min_height?.trim()) {
    style.minHeight = normalizeCssLength(settings.min_height.trim());
  }

  if (settings?.text_align) {
    style.textAlign = settings.text_align;
  }

  applyIntrinsicChromeStyle(style, settings, options);

  return style;
}

export function getRichTextStyle(
  variant: RichTextBlockData["variant"],
  settings?: BlockSettings,
): CSSProperties {
  return getIntrinsicChildBoxStyle(settings, {
    backgroundColor: resolveRichTextBackgroundColor(variant, settings),
    clipOverflow: false,
  });
}

export function getHeroStyle(data: HeroBlockData, settings?: BlockSettings): CSSProperties {
  return getIntrinsicChildBoxStyle(settings, {
    backgroundColor: resolveHeroBackgroundColor(data, settings),
    defaultBorderRadius: INTRINSIC_DEFAULT_BORDER_RADIUS.hero,
    clipOverflow: false,
  });
}

export function getAnnouncementBannerStyle(
  data: AnnouncementBannerBlockData,
  settings?: BlockSettings,
): CSSProperties {
  return getIntrinsicChildBoxStyle(settings, {
    backgroundColor: resolveAnnouncementBannerBackgroundColor(data, settings),
    defaultBorderRadius: INTRINSIC_DEFAULT_BORDER_RADIUS.banner,
    clipOverflow: false,
  });
}

export function getCalloutStyle(data: CalloutBlockData, settings?: BlockSettings): CSSProperties {
  return getIntrinsicChildBoxStyle(settings, {
    backgroundColor:
      resolveCalloutBackgroundColor(data, settings) || resolveCalloutDefaultBackgroundColor(data),
    defaultBorderRadius: INTRINSIC_DEFAULT_BORDER_RADIUS.callout,
  });
}

export function getPartnerPromoStyle(settings?: BlockSettings): CSSProperties {
  return getIntrinsicChildBoxStyle(settings, {
    backgroundColor: settings?.background_color?.trim() || "#fff2ea",
    defaultBorderRadius: INTRINSIC_DEFAULT_BORDER_RADIUS.partner_promo,
  });
}

export function getCtaButtonStyle(settings?: BlockSettings): CSSProperties {
  return getIntrinsicChildBoxStyle(settings, {
    fullWidth: false,
    defaultBorderRadius: INTRINSIC_DEFAULT_BORDER_RADIUS.cta_button,
    clipOverflow: false,
  });
}

export function getExpertAttributionStyle(
  preset: string,
  settings?: BlockSettings,
): CSSProperties {
  const explicitBg = settings?.background_color?.trim();
  const isPlainPreset = preset === "milk_making_mama" || preset === "mother_box";
  const isBoxedPreset = preset === "kerry_secker" || preset === "custom";
  const style = getIntrinsicChildBoxStyle(settings, {
    defaultBorderRadius: isBoxedPreset ? INTRINSIC_DEFAULT_BORDER_RADIUS.expert_attribution : undefined,
  });

  if (explicitBg) {
    style.backgroundColor = explicitBg;
  } else if (isBoxedPreset) {
    delete style.backgroundColor;
  } else if (isPlainPreset) {
    style.backgroundColor = "transparent";
    delete style.border;
    style.borderWidth = 0;
    style.borderStyle = "solid";
    style.borderColor = "transparent";
  }

  if (isPlainPreset && !hasCustomPadding(settings)) {
    style.padding = 0;
  }

  return style;
}

export function getBlockWrapperStyle(
  settings: BlockSettings | undefined,
  articleMaxWidth?: MaxWidthPreset,
  articleMaxWidthCustom?: string,
  blockType?: BlockType,
): CSSProperties {
  const paddingOnChild = usesIntrinsicLayoutChildBox(blockType);
  const backgroundOnChild = usesIntrinsicBackgroundChildBox(blockType);
  const chromeOnChild = paddingOnChild;
  const style: CSSProperties = {
    maxWidth: resolveBlockMaxWidth(
      settings?.max_width,
      articleMaxWidth,
      settings?.max_width_custom,
      articleMaxWidthCustom,
    ),
    width: "100%",
    boxSizing: "border-box",
  };

  if (settings?.min_width_custom?.trim()) {
    style.minWidth = normalizeCssLength(settings.min_width_custom.trim());
  }

  applyBlockMarginStyle(style, settings);
  if (style.marginLeft === undefined) style.marginLeft = "auto";
  if (style.marginRight === undefined) style.marginRight = "auto";

  if (!paddingOnChild) {
    applyBlockPaddingStyle(style, settings);
  }

  if (!backgroundOnChild && settings?.background_color) {
    style.backgroundColor = settings.background_color;
  }

  if (!chromeOnChild) {
    const radius = resolveRadius(settings?.border_radius);
    if (radius) {
      style.borderRadius = radius;
    } else if (!backgroundOnChild && settings?.background_color) {
      style.borderRadius = "8px";
    }

    const shadow = resolveShadow(settings?.box_shadow);
    if (shadow) {
      style.boxShadow = shadow;
    }

    applyBlockBorderStyle(style, settings);
  }

  if (settings?.text_color) {
    style.color = settings.text_color;
    (style as Record<string, string>)["--block-text-color"] = settings.text_color;
  }

  const fontFamily = resolveFontFamily(settings?.font_family);
  if (fontFamily) {
    (style as Record<string, string>)["--block-font-body"] = fontFamily;
    (style as Record<string, string>)["--block-font-display"] = fontFamily;
  }

  applyResponsiveFontSizeStyle(style, settings);

  if (settings?.text_align) {
    style.textAlign = settings.text_align;
  }

  if (settings?.font_weight) {
    style.fontWeight = settings.font_weight;
  }

  if (!paddingOnChild && settings?.min_height?.trim()) {
    style.minHeight = normalizeCssLength(settings.min_height.trim());
  }

  return style;
}
