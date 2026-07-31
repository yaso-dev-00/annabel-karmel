import type {
  AdviceArticle,
  Article,
  BlockSettings,
  Competition,
  ContentBlock,
  PartnerPage,
} from '@/lib/content-blocks/types';
import { normalizeAdviceArticle } from '@/lib/admin/advice-article-status';
import { normalizeArticle } from '@/lib/admin/article-status';
import { normalizeCompetition } from '@/lib/admin/competition-status';
import { normalizePartnerPage } from '@/lib/admin/partner-page-status';
import { sortBlocksByOrder } from '@/lib/content-blocks/defaults';

/** Strip legacy fixed-size fields that cause content overflow/overlap. */
export function sanitizeBlockSettings(
  settings?: BlockSettings,
): BlockSettings | undefined {
  if (!settings) return undefined;
  const next = { ...settings };
  delete next.height_custom;
  delete next.width_custom;
  delete next.min_width_custom;
  return Object.keys(next).length > 0 ? next : undefined;
}

export function sanitizeContentBlock(block: ContentBlock): ContentBlock {
  const settings = sanitizeBlockSettings(block.settings);
  if (block.type === 'two_column') {
    const left_settings = sanitizeBlockSettings(block.data.left_settings);
    const right_settings = sanitizeBlockSettings(block.data.right_settings);
    return {
      ...block,
      settings,
      data: {
        ...block.data,
        left_settings,
        right_settings,
      },
    };
  }
  return settings ? { ...block, settings } : { ...block, settings: undefined };
}

export function sanitizeAdviceArticle(article: AdviceArticle): AdviceArticle {
  return normalizeAdviceArticle({
    ...article,
    content_blocks: sortBlocksByOrder(
      (article.content_blocks ?? []).map(sanitizeContentBlock),
    ),
  });
}

export function sanitizeArticle(article: Article): Article {
  return normalizeArticle({
    ...article,
    content_blocks: sortBlocksByOrder(
      (article.content_blocks ?? []).map(sanitizeContentBlock),
    ),
  });
}

export function sanitizeCompetition(competition: Competition): Competition {
  return normalizeCompetition({
    ...competition,
    content_blocks: sortBlocksByOrder(
      (competition.content_blocks ?? []).map(sanitizeContentBlock),
    ),
  });
}

export function sanitizePartnerPage(partner: PartnerPage): PartnerPage {
  return normalizePartnerPage({
    ...partner,
    content_blocks: sortBlocksByOrder(
      (partner.content_blocks ?? []).map(sanitizeContentBlock),
    ),
  });
}
