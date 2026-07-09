import type {
  AnnouncementBannerBlockData,
  BlockSettings,
  BlockType,
  CalloutBlockData,
  ContentBlock,
  HeroBlockData,
  RichTextBlockData,
} from "./types";

export const HERO_DEFAULT_BACKGROUND = "#f6e9ef";
export const PULL_QUOTE_DEFAULT_BACKGROUND = "#fff2ea";

const CALLOUT_VARIANT_BACKGROUNDS: Record<CalloutBlockData["variant"], string> = {
  tip: "#fff2ea",
  highlight: "#f6e9ef",
  warning: "#fff5f5",
};

/** Background color is painted on the inner element, not the block wrapper. */
export function usesIntrinsicBackgroundChildBox(blockType?: BlockType): boolean {
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

export function resolveHeroBackgroundColor(
  data: HeroBlockData,
  settings?: BlockSettings,
): string {
  return (
    settings?.background_color?.trim() ||
    data.background_color?.trim() ||
    HERO_DEFAULT_BACKGROUND
  );
}

export function resolveAnnouncementBannerBackgroundColor(
  data: AnnouncementBannerBlockData,
  settings?: BlockSettings,
): string {
  return (
    settings?.background_color?.trim() ||
    data.background_color?.trim() ||
    "#f6e9ef"
  );
}

/** Returns an explicit override only; variant CSS supplies the default when undefined. */
export function resolveCalloutBackgroundColor(
  data: CalloutBlockData,
  settings?: BlockSettings,
): string | undefined {
  return settings?.background_color?.trim() || data.background_color?.trim() || undefined;
}

export function resolveCalloutDefaultBackgroundColor(data: CalloutBlockData): string {
  return data.background_color?.trim() || CALLOUT_VARIANT_BACKGROUNDS[data.variant];
}

export function resolveRichTextBackgroundColor(
  variant: RichTextBlockData["variant"],
  settings?: BlockSettings,
): string | undefined {
  if (settings?.background_color?.trim()) return settings.background_color.trim();
  if (variant === "pull_quote") return PULL_QUOTE_DEFAULT_BACKGROUND;
  return undefined;
}

/** Stored background only — undefined when the editor has not set an explicit color. */
export function resolveToolbarBackgroundStoredValue(block: ContentBlock): string | undefined {
  return block.settings?.background_color?.trim() || undefined;
}

/** Variant default used to highlight a preset when no explicit color is stored. */
export function resolveToolbarBackgroundPresetFallback(block: ContentBlock): string | undefined {
  if (block.settings?.background_color?.trim()) return undefined;
  return resolveToolbarBackgroundColor(block);
}

/** Effective background shown in the style toolbar (settings override legacy data fields). */
export function resolveToolbarBackgroundColor(block: ContentBlock): string | undefined {
  const fromSettings = block.settings?.background_color?.trim();
  if (fromSettings) return fromSettings;

  if (block.type === "announcement_banner") {
    return resolveAnnouncementBannerBackgroundColor(block.data, block.settings);
  }

  if (block.type === "callout") {
    return resolveCalloutDefaultBackgroundColor(block.data);
  }

  if (block.type === "hero") {
    return resolveHeroBackgroundColor(block.data, block.settings);
  }

  if (block.type === "rich_text") {
    return resolveRichTextBackgroundColor(block.data.variant, block.settings);
  }

  if (block.type === "partner_promo") {
    return "#fff2ea";
  }

  if (block.type === "accordion") {
    return "#ffffff";
  }

  if (block.type === "expert_attribution") {
    if (block.data.preset === "kerry_secker" || block.data.preset === "custom") {
      return "#fff2ea";
    }
    return undefined;
  }

  return undefined;
}
