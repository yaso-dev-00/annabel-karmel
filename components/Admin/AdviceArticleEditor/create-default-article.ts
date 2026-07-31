import { createBlock } from '@/lib/content-blocks/defaults';
import type { AdviceArticle } from '@/lib/content-blocks/types';

export function createDefaultArticle(): AdviceArticle {
  const now = new Date().toISOString();
  return {
    id: '',
    slug: '',
    title: 'Untitled advice article',
    category_slug: 'breastfeeding-advice',
    listing_image: '',
    listing_image_alt: '',
    seo_title: '',
    seo_description: '',
    content_blocks: [createBlock('rich_text', 0)],
    related_articles: [],
    show_instagram_share: true,
    content_max_width: 'default',
    status: 'draft',
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
  };
}
