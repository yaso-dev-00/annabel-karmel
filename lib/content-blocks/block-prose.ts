import type { CSSProperties } from "react";
import type { BlockSettings, BlockType } from "./types";
import { normalizeCssLength } from "./css-length";

/** Blocks that render HTML paragraphs via `.blockProse` or stacked `.body` copy. */
const PARAGRAPH_GAP_BLOCK_TYPES = new Set<BlockType>([
  "rich_text",
  "callout",
  "image_text",
  "two_column",
  "related_links",
  "accordion",
  "partner_promo",
  "book_promo",
  "author_bio",
]);

export function blockSupportsParagraphGap(blockType: BlockType): boolean {
  return PARAGRAPH_GAP_BLOCK_TYPES.has(blockType);
}

export function hasParagraphGap(settings?: BlockSettings): boolean {
  return Boolean(settings?.paragraph_gap?.trim());
}

export function resolveColumnProseParagraphGap(
  columnSettings?: BlockSettings,
  blockSettings?: BlockSettings,
): BlockSettings | undefined {
  if (hasParagraphGap(columnSettings)) return columnSettings;
  if (hasParagraphGap(blockSettings)) return blockSettings;
  return undefined;
}

/** @deprecated Use resolveColumnProseParagraphGap */
export function resolveParagraphGapSettings(
  ...candidates: (BlockSettings | undefined)[]
): BlockSettings | undefined {
  return candidates.find((settings) => hasParagraphGap(settings));
}

export function applyParagraphGapStyle(style: CSSProperties, settings?: BlockSettings): void {
  const gap = settings?.paragraph_gap?.trim();
  if (!gap) return;
  (style as Record<string, string>)["--block-prose-paragraph-gap"] = normalizeCssLength(gap);
}

export function getProseParagraphGapStyle(settings?: BlockSettings): CSSProperties | undefined {
  if (!hasParagraphGap(settings)) return undefined;
  const gap = normalizeCssLength(settings!.paragraph_gap!.trim());
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap,
  };
  applyParagraphGapStyle(style, settings);
  return style;
}

/** Merge gap onto an existing style object (e.g. column/chrome styles). */
export function withProseParagraphGapStyle(
  base: CSSProperties | undefined,
  settings?: BlockSettings,
): CSSProperties | undefined {
  const gapStyle = getProseParagraphGapStyle(settings);
  if (!base && !gapStyle) return undefined;
  return { ...base, ...gapStyle };
}
