import type { AdviceArticle, BlockSettings, ContentBlock } from "@/lib/content-blocks/types";
import { normalizeAdviceArticle } from "@/lib/admin/advice-article-status";
import { sortBlocksByOrder } from "@/lib/content-blocks/defaults";

/** Strip legacy fixed-size fields that cause content overflow/overlap. */
export function sanitizeBlockSettings(settings?: BlockSettings): BlockSettings | undefined {
  if (!settings) return undefined;
  const next = { ...settings };
  delete next.height_custom;
  delete next.width_custom;
  delete next.min_width_custom;
  return Object.keys(next).length > 0 ? next : undefined;
}

export function sanitizeContentBlock(block: ContentBlock): ContentBlock {
  const settings = sanitizeBlockSettings(block.settings);
  return settings ? { ...block, settings } : { ...block, settings: undefined };
}

export function sanitizeAdviceArticle(article: AdviceArticle): AdviceArticle {
  return normalizeAdviceArticle({
    ...article,
    content_blocks: sortBlocksByOrder(article.content_blocks.map(sanitizeContentBlock)),
  });
}
