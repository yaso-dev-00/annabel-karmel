import type { ContentBlock } from "@/lib/content-blocks/types";

export type AdviceBlockGroup = {
  fullBleed: boolean;
  blocks: ContentBlock[];
};

export function isFullBleedAdviceBlock(block: ContentBlock): boolean {
  return block.type === "related_articles";
}

/** Groups consecutive blocks so full-bleed sections can break out of the article max-width. */
export function groupAdviceArticleBlocks(blocks: ContentBlock[]): AdviceBlockGroup[] {
  const sorted = blocks.slice().sort((a, b) => a.order - b.order);
  const groups: AdviceBlockGroup[] = [];

  for (const block of sorted) {
    const fullBleed = isFullBleedAdviceBlock(block);
    const last = groups[groups.length - 1];
    if (last && last.fullBleed === fullBleed) {
      last.blocks.push(block);
    } else {
      groups.push({ fullBleed, blocks: [block] });
    }
  }

  return groups;
}
