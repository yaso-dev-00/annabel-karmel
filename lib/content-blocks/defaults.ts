import { v4 as uuidv4 } from "uuid";
import type { BlockDataByType, BlockType, ContentBlock, ImageStackBlockData, ImageStackItem, NestedMiniBlock, TwoColumnBlockData } from "./types";
import { createDefaultFormSchema } from "./form-schema";
import { IMAGE_STACK_DEFAULT_COLUMNS, withImageStackColumnDefaults } from "./image-stack-columns";
import { RESPONSIVE_GRID_DEFAULT_COLUMNS } from "./responsive-grid-columns";

export function createBlockId(): string {
  return uuidv4();
}

/** Ensures nested mini-blocks have stable ids (legacy CMS data may omit them). */
export function ensureNestedMiniBlockId(block: NestedMiniBlock): NestedMiniBlock & { id: string } {
  if (block.id) return block as NestedMiniBlock & { id: string };
  return { ...block, id: createBlockId() };
}

export function normalizeTwoColumnData(data: TwoColumnBlockData): TwoColumnBlockData {
  return {
    ...data,
    left_blocks: data.left_blocks.map((b) => ensureNestedMiniBlockId(b)),
    right_blocks: data.right_blocks.map((b) => ensureNestedMiniBlockId(b)),
  };
}

export function ensureImageStackItemId(item: ImageStackItem): ImageStackItem & { id: string } {
  if (item.id) return item as ImageStackItem & { id: string };
  return { ...item, id: createBlockId() };
}

export function normalizeImageStackData(data: ImageStackBlockData): ImageStackBlockData {
  return withImageStackColumnDefaults({
    ...data,
    images: data.images.map(ensureImageStackItemId),
  });
}

export function createDefaultBlockData(type: BlockType): BlockDataByType[BlockType] {
  switch (type) {
    case "hero":
      return {
        headline: "Headline",
        subheadline: "",
        image_url: "",
        image_alt: "",
        cta_label: "",
        cta_url: "",
      };
    case "rich_text":
      return { html: "<p></p>", variant: "body" };
    case "heading":
      return { level: "h2", text: "Section heading" };
    case "list":
      return { ordered: false, style: "plain", items: ["List item"] };
    case "divider":
      return { style: "hr" };
    case "image":
      return { src: "", alt: "", full_width: false };
    case "image_text":
      return {
        image_src: "",
        image_alt: "",
        image_position: "left",
        body: "<p></p>",
        image_first: true,
      };
    case "image_stack":
      return {
        layout: "vertical",
        columns_desktop: IMAGE_STACK_DEFAULT_COLUMNS.desktop,
        columns_tablet: IMAGE_STACK_DEFAULT_COLUMNS.tablet,
        columns_mobile: IMAGE_STACK_DEFAULT_COLUMNS.mobile,
        images: [{ id: createBlockId(), src: "", alt: "" }],
      };
    case "two_column":
      return { left_blocks: [], right_blocks: [] };
    case "video":
      return { provider: "youtube", url: "" };
    case "accordion":
      return {
        default_open: "first",
        numbered_titles: false,
        panels: [
          {
            id: createBlockId(),
            title: "Panel title",
            paragraphs: "<p>Panel content</p>",
          },
        ],
      };
    case "table":
      return {
        style: "default",
        rows: [{ label: "Label", value: "Value" }],
      };
    case "multi_column_table":
      return {
        column_count: 3,
        headers: ["Column 1", "Column 2", "Column 3"],
        rows: [
          ["Row 1", "Data", "Data"],
          ["Row 2", "Data", "Data"],
        ],
        style: "default",
      };
    case "callout":
      return { variant: "tip", title: "Top tip", body: "<p></p>" };
    case "cta_button":
      return { label: "Learn more", url: "/", style: "primary" };
    case "form_embed":
      return {
        mode: "builder",
        schema: createDefaultFormSchema(),
      };
    case "announcement_banner":
      return { message: "Announcement message" };
    case "product_grid":
      return {
        columns_desktop: RESPONSIVE_GRID_DEFAULT_COLUMNS.desktop,
        columns_tablet: RESPONSIVE_GRID_DEFAULT_COLUMNS.tablet,
        columns_mobile: RESPONSIVE_GRID_DEFAULT_COLUMNS.mobile,
        image_aspect: "4/3",
        items: [],
      };
    case "recipe_grid":
      return {
        layout: "grid",
        columns_desktop: RESPONSIVE_GRID_DEFAULT_COLUMNS.desktop,
        columns_tablet: RESPONSIVE_GRID_DEFAULT_COLUMNS.tablet,
        columns_mobile: RESPONSIVE_GRID_DEFAULT_COLUMNS.mobile,
        image_aspect: "4/3",
        items: [],
      };
    case "related_links":
      return { intro: "Related links", links: [{ label: "Link", href: "/" }] };
    case "related_articles":
      return {
        heading: "Related Articles",
        subtitle: "Some more articles you might enjoy...",
        category_slug: "breastfeeding-advice",
        article_slugs: [],
      };
    case "expert_attribution":
      return { preset: "milk_making_mama" };
    case "partner_promo":
      return { logo_src: "", logo_alt: "", layout: "horizontal" };
    case "partnership_tag":
      return {
        label: "In partnership with",
        logo_src: "",
        logo_alt: "Partner logo",
      };
    case "book_promo":
      return { cover_src: "", cover_alt: "", book_href: "/", book_title: "Book title", body: "<p></p>" };
    case "author_bio":
      return { photo_src: "", photo_alt: "", name: "Author name", bio_paragraphs: [""] };
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

export function createBlock<T extends BlockType>(type: T, order: number): Extract<ContentBlock, { type: T }> {
  return {
    id: createBlockId(),
    type,
    order,
    data: createDefaultBlockData(type),
  } as Extract<ContentBlock, { type: T }>;
}

export function normalizeBlockOrder(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.map((block, index) => ({ ...block, order: index }));
}

/** Sort by stored order field (e.g. when loading from CMS). */
export function sortBlocksByOrder(blocks: ContentBlock[]): ContentBlock[] {
  return normalizeBlockOrder(
    blocks.slice().sort((a, b) => a.order - b.order),
  );
}
