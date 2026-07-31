import type { Expert } from '@/lib/experts/types';

export function createDefaultExpert(): Expert {
  const now = new Date().toISOString();
  return {
    id: '',
    slug: '',
    name: 'Untitled expert',
    role: '',
    image: '',
    sourceUrl: '',
    introParagraphs: [''],
    bioParagraphs: [],
    socialLink: null,
    articleTopics: [],
    sort_order: 0,
    status: 'draft',
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
  };
}
