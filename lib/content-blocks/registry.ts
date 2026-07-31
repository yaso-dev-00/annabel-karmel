import type { BlockType } from './types';

export type BlockCategory =
  'content' | 'media' | 'structured' | 'grids' | 'attribution';

export type BlockRegistryEntry = {
  type: BlockType;
  label: string;
  description: string;
  category: BlockCategory;
  icon: string;
};

export const BLOCK_REGISTRY: BlockRegistryEntry[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Large headline with image and optional CTA',
    category: 'content',
    icon: 'H',
  },
  {
    type: 'rich_text',
    label: 'Rich text',
    description: 'WYSIWYG body, lead, or pull quote',
    category: 'content',
    icon: 'T',
  },
  {
    type: 'heading',
    label: 'Heading',
    description: 'H1, H2, or H3 section title',
    category: 'content',
    icon: '#',
  },
  {
    type: 'list',
    label: 'List',
    description: 'Bulleted or numbered list',
    category: 'content',
    icon: 'L',
  },
  {
    type: 'divider',
    label: 'Divider',
    description: 'Horizontal rule or decorative image',
    category: 'content',
    icon: '—',
  },
  {
    type: 'image',
    label: 'Image',
    description: 'Standalone image with optional caption',
    category: 'media',
    icon: 'I',
  },
  {
    type: 'image_text',
    label: 'Image + text',
    description: 'Side-by-side or stacked image and copy',
    category: 'media',
    icon: 'IT',
  },
  {
    type: 'image_stack',
    label: 'Image stack',
    description: 'Multiple images in a group',
    category: 'media',
    icon: 'IS',
  },
  {
    type: 'two_column',
    label: 'Two column',
    description: 'Two-column layout with nested blocks',
    category: 'media',
    icon: '2C',
  },
  {
    type: 'video',
    label: 'Video',
    description: 'YouTube, Vimeo, or uploaded video',
    category: 'media',
    icon: 'V',
  },
  {
    type: 'accordion',
    label: 'Accordion',
    description: 'Expandable FAQ panels with subsections',
    category: 'structured',
    icon: 'A',
  },
  {
    type: 'table',
    label: 'Table',
    description: 'Label/value data table',
    category: 'structured',
    icon: 'Tb',
  },
  {
    type: 'multi_column_table',
    label: 'Multi-column table',
    description: 'Table with 2–5 configurable columns',
    category: 'structured',
    icon: 'T+',
  },
  {
    type: 'callout',
    label: 'Callout',
    description: 'Tip, highlight, or warning box',
    category: 'structured',
    icon: '!',
  },
  {
    type: 'cta_button',
    label: 'CTA button',
    description: 'Call-to-action link button',
    category: 'grids',
    icon: 'Btn',
  },
  {
    type: 'form_embed',
    label: 'Custom form',
    description: 'Drag-and-drop form builder with JSON schema',
    category: 'grids',
    icon: 'F',
  },
  {
    type: 'announcement_banner',
    label: 'Banner',
    description: 'Announcement strip with optional link',
    category: 'grids',
    icon: 'B',
  },
  {
    type: 'product_grid',
    label: 'Product grid',
    description: 'Grid of product cards',
    category: 'grids',
    icon: 'PG',
  },
  {
    type: 'recipe_grid',
    label: 'Recipe grid',
    description: 'Grid or carousel of recipes',
    category: 'grids',
    icon: 'RG',
  },
  {
    type: 'related_links',
    label: 'Related links',
    description: 'Intro plus list of links',
    category: 'grids',
    icon: 'RL',
  },
  {
    type: 'related_articles',
    label: 'Related articles',
    description: 'Carousel of articles from a category',
    category: 'grids',
    icon: 'RA',
  },
  {
    type: 'expert_attribution',
    label: 'Expert sign-off',
    description: 'Expert attribution block',
    category: 'attribution',
    icon: 'E',
  },
  {
    type: 'partner_promo',
    label: 'Partner promo',
    description: 'Logo and partner promotion',
    category: 'attribution',
    icon: 'P',
  },
  {
    type: 'partnership_tag',
    label: 'Partnership tag',
    description: 'In partnership with + logo',
    category: 'attribution',
    icon: 'Pt',
  },
  {
    type: 'book_promo',
    label: 'Book promo',
    description: 'Book cover with description',
    category: 'attribution',
    icon: 'Bk',
  },
  {
    type: 'author_bio',
    label: 'Author bio',
    description: 'Author photo and biography',
    category: 'attribution',
    icon: 'Ab',
  },
];

export const BLOCK_CATEGORIES: { id: BlockCategory; label: string }[] = [
  { id: 'content', label: 'Content' },
  { id: 'media', label: 'Media' },
  { id: 'structured', label: 'Structured' },
  { id: 'grids', label: 'Grids & CTAs' },
  { id: 'attribution', label: 'Attribution & Promos' },
];

export function getBlockLabel(type: BlockType): string {
  return BLOCK_REGISTRY.find((entry) => entry.type === type)?.label ?? type;
}

export function getBlockSummary(block: {
  type: BlockType;
  data: Record<string, unknown>;
}): string {
  switch (block.type) {
    case 'hero':
      return String(block.data.headline ?? 'Hero');
    case 'rich_text':
      return (
        stripHtml(String(block.data.html ?? '')).slice(0, 60) || 'Rich text'
      );
    case 'heading':
      return String(block.data.text ?? 'Heading');
    case 'list':
      return `List (${Array.isArray(block.data.items) ? block.data.items.length : 0} items)`;
    case 'accordion':
      return `Accordion (${Array.isArray(block.data.panels) ? block.data.panels.length : 0} panels)`;
    case 'table':
      return `Table (${Array.isArray(block.data.rows) ? block.data.rows.length : 0} rows)`;
    case 'multi_column_table':
      return `Multi-column table (${block.data.column_count ?? 0} cols)`;
    case 'image':
      return String(block.data.alt || block.data.src || 'Image');
    case 'callout':
      return String(block.data.title ?? 'Callout');
    case 'related_articles':
      return `Related articles (${block.data.category_slug || 'no category'})`;
    case 'expert_attribution':
      return `Expert: ${String(block.data.preset ?? 'custom')}`;
    case 'partnership_tag':
      return String(
        block.data.label || block.data.logo_alt || 'Partnership tag',
      );
    default:
      return getBlockLabel(block.type);
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
