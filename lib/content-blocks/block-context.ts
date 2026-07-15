import type { BlockType } from "@/lib/content-blocks/types";

export type ContentEditorContext = "advice" | "article" | "competition" | "partners";
export type ContentRenderContext = "advice" | "article" | "competition" | "partners";

export const RELATED_ARTICLES_EDITOR_CONTEXTS = ["advice", "article"] as const satisfies readonly ContentEditorContext[];

export const ADVICE_ARTICLE_ONLY_BLOCKS = ["related_articles"] as const satisfies readonly BlockType[];
export const PARTNERS_ONLY_BLOCKS = ["partnership_tag"] as const satisfies readonly BlockType[];

export type AdviceArticleOnlyBlockType = (typeof ADVICE_ARTICLE_ONLY_BLOCKS)[number];
export type PartnersOnlyBlockType = (typeof PARTNERS_ONLY_BLOCKS)[number];

export function isAdviceArticleOnlyBlock(type: BlockType): type is AdviceArticleOnlyBlockType {
  return (ADVICE_ARTICLE_ONLY_BLOCKS as readonly BlockType[]).includes(type);
}

export function isPartnersOnlyBlock(type: BlockType): type is PartnersOnlyBlockType {
  return (PARTNERS_ONLY_BLOCKS as readonly BlockType[]).includes(type);
}

export function isBlockAllowedInEditor(type: BlockType, context: ContentEditorContext): boolean {
  if (isPartnersOnlyBlock(type)) return context === "partners";
  if (context === "advice" || context === "article") return true;
  return !isAdviceArticleOnlyBlock(type);
}

export function shouldRenderBlock(type: BlockType, context: ContentRenderContext = "competition"): boolean {
  if (isPartnersOnlyBlock(type)) return context === "partners";
  if (!isAdviceArticleOnlyBlock(type)) return true;
  return context === "advice" || context === "article";
}

export function editorContextToRenderContext(editorContext: ContentEditorContext): ContentRenderContext {
  if (editorContext === "advice") return "advice";
  if (editorContext === "article") return "article";
  if (editorContext === "partners") return "partners";
  return "competition";
}
