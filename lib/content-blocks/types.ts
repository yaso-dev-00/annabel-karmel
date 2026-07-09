import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import type { CustomFormSchema } from "@/lib/content-blocks/form-schema";
import type { FontFamilyPreset, RadiusPreset, ShadowPreset } from "@/lib/design-system/tokens";

export const BLOCK_TYPES = [
  "hero",
  "rich_text",
  "heading",
  "list",
  "divider",
  "image",
  "image_text",
  "image_stack",
  "two_column",
  "video",
  "accordion",
  "table",
  "multi_column_table",
  "callout",
  "cta_button",
  "form_embed",
  "announcement_banner",
  "product_grid",
  "recipe_grid",
  "related_links",
  "expert_attribution",
  "partner_promo",
  "book_promo",
  "author_bio",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export type BlockSpacing = "compact" | "normal" | "loose";

export type MaxWidthPreset = "narrow" | "default" | "wide" | "full" | "custom";

export const MAX_WIDTH_VALUES: Record<Exclude<MaxWidthPreset, "custom">, string> = {
  narrow: "720px",
  default: "900px",
  wide: "1100px",
  full: "100%",
};

export const MAX_WIDTH_LABELS: Record<MaxWidthPreset, string> = {
  narrow: "Narrow — 720px",
  default: "Default — 900px",
  wide: "Wide — 1100px",
  full: "Full width",
  custom: "Custom…",
};

export type BlockSettings = {
  css_class?: string;
  background_color?: string;
  text_color?: string;
  font_weight?: "400" | "600" | "700" | "900";
  min_height?: string;
  height_custom?: string;
  width_custom?: string;
  min_width_custom?: string;
  padding?: string;
  padding_top?: string;
  padding_right?: string;
  padding_bottom?: string;
  padding_left?: string;
  margin?: string;
  margin_top?: string;
  margin_right?: string;
  margin_bottom?: string;
  margin_left?: string;
  spacing?: BlockSpacing;
  max_width?: MaxWidthPreset;
  max_width_custom?: string;
  /** When true, block is omitted from the published article but still editable in the CMS. */
  hidden?: boolean;
  border_radius?: RadiusPreset;
  box_shadow?: ShadowPreset;
  font_family?: FontFamilyPreset;
  font_size_mobile?: string;
  font_size_tablet?: string;
  font_size_desktop?: string;
  border_width?: string;
  border_top?: string;
  border_right?: string;
  border_bottom?: string;
  border_left?: string;
  border_color?: string;
  border_style?: "none" | "solid" | "dashed" | "dotted";
  text_align?: "left" | "center" | "right" | "justify";
};

export type HeroBlockData = {
  headline: string;
  subheadline?: string;
  image_url?: string;
  image_alt?: string;
  image_width?: string;
  image_height?: string;
  cta_label?: string;
  cta_url?: string;
  text_color?: string;
  background_color?: string;
};

export type RichTextBlockData = {
  html: string;
  variant: "body" | "lead" | "pull_quote";
};

export type HeadingBlockData = {
  level: "h1" | "h2" | "h3";
  text: string;
};

export type ListBlockItem = string | { label: string; text: string };

export type ListBlockData = {
  ordered: boolean;
  style: "plain" | "labeled";
  items: ListBlockItem[];
};

export type DividerBlockData = {
  style: "hr" | "image";
  image_src?: string;
};

export type ImageBlockData = {
  src: string;
  alt: string;
  caption?: string;
  full_width?: boolean;
  width?: string;
  height?: string;
  link_href?: string;
  fallback_src?: string;
};

export type ImageTextBlockData = {
  image_src: string;
  image_alt: string;
  image_width?: string;
  image_height?: string;
  image_position: "left" | "right" | "top";
  heading?: string;
  body: string;
  image_first?: boolean;
};

export type ImageStackItem = {
  id?: string;
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
};

export type ImageStackBlockData = {
  layout: "vertical" | "grid";
  images: ImageStackItem[];
};

/** Per nested item styles inside two-column (and similar) layouts. */
export type NestedMiniBlockStyle = {
  text_align?: "left" | "center" | "right" | "justify";
  max_width?: MaxWidthPreset;
  max_width_custom?: string;
};

export type NestedMiniBlock =
  | { id?: string; type: "rich_text"; html: string; style?: NestedMiniBlockStyle }
  | {
      id?: string;
      type: "image";
      src: string;
      alt: string;
      width?: string;
      height?: string;
      style?: NestedMiniBlockStyle;
    }
  | { id?: string; type: "cta_button"; label: string; url: string; style?: NestedMiniBlockStyle }
  | {
      id?: string;
      type: "list";
      ordered: boolean;
      items: string[];
      style?: NestedMiniBlockStyle;
    };

export type TwoColumnBlockData = {
  left_blocks: NestedMiniBlock[];
  right_blocks: NestedMiniBlock[];
};

export type VideoBlockData = {
  provider: "youtube" | "vimeo" | "upload";
  url: string;
  caption?: string;
};

export type AccordionSubsection = {
  id: string;
  heading: string;
  heading_variant?: "display" | "step";
  paragraphs?: string;
  list_items?: string[];
};

export type AccordionPanel = {
  id: string;
  title: string;
  image?: { src: string; alt: string };
  paragraphs?: string;
  list_items?: string[];
  subsections?: AccordionSubsection[];
  closing_paragraphs?: string;
};

export type AccordionBlockData = {
  default_open: "first" | "none" | { panel_id: string };
  numbered_titles?: boolean;
  panels: AccordionPanel[];
};

export type TableBlockData = {
  caption?: string;
  style: "default" | "compact" | "striped" | "borderless";
  border_style?: "full" | "horizontal" | "none";
  label_width?: "auto" | "35" | "45";
  header_bg?: string;
  row_bg?: string;
  striped_row_bg?: string;
  header_text_color?: string;
  body_text_color?: string;
  border_color?: string;
  rows: { label: string; value: string }[];
};

export type MultiColumnTableBlockData = {
  caption?: string;
  column_count: 2 | 3 | 4 | 5;
  headers: string[];
  rows: string[][];
  style: TableBlockData["style"];
  border_style?: TableBlockData["border_style"];
  header_bg?: string;
  row_bg?: string;
  striped_row_bg?: string;
  header_text_color?: string;
  body_text_color?: string;
  border_color?: string;
};

export type CalloutBlockData = {
  variant: "tip" | "highlight" | "warning";
  title?: string;
  body: string;
  background_color?: string;
};

export type CtaButtonBlockData = {
  label: string;
  url: string;
  style: "primary" | "secondary";
  open_in_new_tab?: boolean;
};

export type FormEmbedBlockData = {
  title?: string;
  /** Legacy raw HTML embed */
  embed_code?: string;
  mode?: "builder" | "embed";
  schema?: CustomFormSchema;
};

export type AnnouncementBannerBlockData = {
  message: string;
  link_url?: string;
  link_label?: string;
  dismissible?: boolean;
  background_color?: string;
};

export type GridItem = {
  title: string;
  image: string;
  url: string;
  cook_time?: string;
  app_exclusive?: boolean;
};

export type ProductGridBlockData = {
  items: GridItem[];
};

export type RecipeGridBlockData = {
  layout: "grid" | "carousel";
  items: GridItem[];
};

export type RelatedLinksBlockData = {
  intro: string;
  links: { label: string; href: string }[];
  link_color?: string;
  link_style?: "underline" | "plain" | "arrow";
  list_spacing?: "compact" | "normal" | "loose";
};

export type ExpertAttributionBlockData = {
  preset: "milk_making_mama" | "kerry_secker" | "mother_box" | "custom";
  prefix?: string;
  image_url?: string;
  name?: string;
  bio_paragraphs?: string[];
  links?: { label: string; href: string }[];
};

export type PartnerPromoBlockData = {
  logo_src: string;
  logo_alt: string;
  logo_href?: string;
  title?: string;
  body?: string;
  links?: { label: string; href: string; style?: string }[];
  layout: "horizontal" | "stacked";
};

export type BookPromoBlockData = {
  cover_src: string;
  cover_alt: string;
  cover_width?: string;
  cover_height?: string;
  book_href: string;
  book_title: string;
  body: string;
};

export type AuthorBioBlockData = {
  photo_src: string;
  photo_alt: string;
  photo_width?: string;
  photo_height?: string;
  name: string;
  bio_paragraphs: string[];
  social_links?: { platform: string; url: string }[];
};

export type BlockDataByType = {
  hero: HeroBlockData;
  rich_text: RichTextBlockData;
  heading: HeadingBlockData;
  list: ListBlockData;
  divider: DividerBlockData;
  image: ImageBlockData;
  image_text: ImageTextBlockData;
  image_stack: ImageStackBlockData;
  two_column: TwoColumnBlockData;
  video: VideoBlockData;
  accordion: AccordionBlockData;
  table: TableBlockData;
  multi_column_table: MultiColumnTableBlockData;
  callout: CalloutBlockData;
  cta_button: CtaButtonBlockData;
  form_embed: FormEmbedBlockData;
  announcement_banner: AnnouncementBannerBlockData;
  product_grid: ProductGridBlockData;
  recipe_grid: RecipeGridBlockData;
  related_links: RelatedLinksBlockData;
  expert_attribution: ExpertAttributionBlockData;
  partner_promo: PartnerPromoBlockData;
  book_promo: BookPromoBlockData;
  author_bio: AuthorBioBlockData;
};

export type ContentBlock = {
  [K in BlockType]: {
    id: string;
    type: K;
    order: number;
    data: BlockDataByType[K];
    settings?: BlockSettings;
  };
}[BlockType];

export type AdviceArticleStatus = "draft" | "published" | "scheduled" | "private" | "disabled";

export type AdviceArticle = {
  id: string;
  slug: string;
  title: string;
  category_slug: string;
  listing_image: string;
  listing_image_alt: string;
  seo_title: string;
  seo_description: string;
  content_blocks: ContentBlock[];
  related_articles: RelatedArticleItem[];
  show_instagram_share: boolean;
  content_max_width?: MaxWidthPreset;
  content_max_width_custom?: string;
  style_preset?: string;
  status?: AdviceArticleStatus;
  scheduled_at?: string | null;
  published_at: string | null;
  updated_at: string;
  created_at: string;
};

export type AdviceArticlesStore = {
  articles: AdviceArticle[];
};

export const SAMPLE_ARTICLE_ID = "00000000-0000-4000-8000-000000000001";
export const SAMPLE_ARTICLE_SLUG = "sample-advice-article";
export const SHOWCASE_ARTICLE_ID = "00000000-0000-4000-8000-000000000002";
export const SHOWCASE_ARTICLE_SLUG = "cms-block-showcase";
