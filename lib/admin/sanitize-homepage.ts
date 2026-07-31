import { createDefaultHomepageDocument } from '@/lib/homepage/create-default-homepage';
import { normalizeHomepage } from '@/lib/admin/homepage-status';
import type {
  HomepageDocument,
  HomepageSection,
  HomepageSectionType,
  HomepageStatus,
} from '@/lib/homepage/types';

const SECTION_TYPES: HomepageSectionType[] = [
  'hero',
  'recipe_finder',
  'latest_recipes',
  'recipe_app',
  'expert_ranges',
  'cookbooks',
  'collabs',
  'partners',
  'instagram',
];

const STATUSES: HomepageStatus[] = [
  'draft',
  'published',
  'scheduled',
  'private',
  'disabled',
];

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return typeof value === 'string' ? value : null;
}

function asStatus(value: unknown): HomepageStatus {
  if (typeof value === 'string' && STATUSES.includes(value as HomepageStatus)) {
    return value as HomepageStatus;
  }
  return 'draft';
}

function withIds<T extends Record<string, unknown>>(
  items: unknown,
  mapItem: (raw: Record<string, unknown>, index: number) => T,
): T[] {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    const raw = (item && typeof item === 'object' ? item : {}) as Record<
      string,
      unknown
    >;
    const mapped = mapItem(raw, index);
    return {
      ...mapped,
      id:
        asString(raw.id) ||
        asString((mapped as { id?: string }).id) ||
        crypto.randomUUID(),
    };
  });
}

function sanitizeSection(
  input: unknown,
  index: number,
): HomepageSection | null {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const type = raw.type;
  if (
    typeof type !== 'string' ||
    !SECTION_TYPES.includes(type as HomepageSectionType)
  ) {
    return null;
  }
  const id = asString(raw.id) || `section-${type}-${index + 1}`;
  const dataRaw = (
    raw.data && typeof raw.data === 'object' ? raw.data : {}
  ) as Record<string, unknown>;

  switch (type as HomepageSectionType) {
    case 'hero':
      return {
        id,
        type: 'hero',
        data: {
          slides: withIds(dataRaw.slides, (slide) => ({
            id: asString(slide.id),
            title: asString(slide.title),
            subtitle: asString(slide.subtitle),
            cta: asString(slide.cta, 'Discover'),
            href: asString(slide.href),
            image: asString(slide.image),
          })),
        },
      };
    case 'recipe_finder':
      return { id, type: 'recipe_finder', data: {} };
    case 'latest_recipes':
      return {
        id,
        type: 'latest_recipes',
        data: {
          heading: asString(dataRaw.heading, 'Latest recipes'),
          subtitle: asString(dataRaw.subtitle),
          ctaLabel: asString(dataRaw.ctaLabel, 'See all recipes'),
          ctaHref: asString(dataRaw.ctaHref, '/recipes'),
          recipes: withIds(dataRaw.recipes, (recipe) => ({
            id: asString(recipe.id),
            title: asString(recipe.title),
            duration: asString(recipe.duration),
            href: asString(recipe.href),
            image: asString(recipe.image),
          })),
        },
      };
    case 'recipe_app':
      return {
        id,
        type: 'recipe_app',
        data: {
          heading: asString(dataRaw.heading),
          bullets: withIds(dataRaw.bullets, (bullet) => ({
            id: asString(bullet.id),
            lead: asString(bullet.lead),
            text: asString(bullet.text),
          })),
          ctaLabel: asString(dataRaw.ctaLabel),
          ctaHref: asString(dataRaw.ctaHref),
          appStoreHref: asString(dataRaw.appStoreHref),
          playStoreHref: asString(dataRaw.playStoreHref),
          awards: withIds(dataRaw.awards, (award) => ({
            id: asString(award.id),
            src: asString(award.src),
            alt: asString(award.alt),
          })),
          phonesImage: asString(dataRaw.phonesImage),
        },
      };
    case 'expert_ranges':
      return {
        id,
        type: 'expert_ranges',
        data: {
          heading: asString(dataRaw.heading),
          body: asString(dataRaw.body),
          awardLogos: withIds(dataRaw.awardLogos, (logo) => ({
            id: asString(logo.id),
            src: asString(logo.src),
            alt: asString(logo.alt),
          })),
          cards: withIds(dataRaw.cards, (card) => ({
            id: asString(card.id),
            title: asString(card.title),
            image: asString(card.image),
            href: asString(card.href),
          })),
        },
      };
    case 'cookbooks':
      return {
        id,
        type: 'cookbooks',
        data: {
          heading: asString(dataRaw.heading),
          body: asString(dataRaw.body),
          ctaLabel: asString(dataRaw.ctaLabel),
          ctaHref: asString(dataRaw.ctaHref),
          books: withIds(dataRaw.books, (book) => ({
            id: asString(book.id),
            title: asString(book.title),
            image: asString(book.image),
            href: asString(book.href),
          })),
        },
      };
    case 'collabs':
      return {
        id,
        type: 'collabs',
        data: {
          heading: asString(dataRaw.heading),
          cards: withIds(dataRaw.cards, (card) => ({
            id: asString(card.id),
            title: asString(card.title),
            subtitle: asString(card.subtitle),
            href: asString(card.href),
            logoImage: asString(card.logoImage),
            cardImage: asString(card.cardImage),
          })),
        },
      };
    case 'partners':
      return {
        id,
        type: 'partners',
        data: {
          heading: asString(dataRaw.heading),
          body: asString(dataRaw.body),
          ctaLabel: asString(dataRaw.ctaLabel),
          ctaHref: asString(dataRaw.ctaHref),
          logos: withIds(dataRaw.logos, (logo) => ({
            id: asString(logo.id),
            name: asString(logo.name),
            image: asString(logo.image),
            href: asString(logo.href),
          })),
        },
      };
    case 'instagram': {
      const posts = withIds(dataRaw.posts, (post) => {
        const kindRaw = asString(post.kind, 'image');
        const kind: 'image' | 'video' | 'carousel' =
          kindRaw === 'video' || kindRaw === 'carousel' || kindRaw === 'image'
            ? kindRaw
            : 'image';
        return {
          id: asString(post.id),
          href: asString(post.href),
          image: asString(post.image),
          kind,
        };
      });
      return {
        id,
        type: 'instagram',
        data: {
          title: asString(dataRaw.title, 'Share the love'),
          titleAccent: asString(dataRaw.titleAccent, '#AnnabelKarmel'),
          description: asString(dataRaw.description),
          posts,
        },
      };
    }
    default:
      return null;
  }
}

export function sanitizeHomepageDocument(input: unknown): HomepageDocument {
  const fallback = createDefaultHomepageDocument();
  const raw = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const now = new Date().toISOString();
  const sectionsRaw = Array.isArray(raw.sections)
    ? raw.sections
    : fallback.sections;
  const sections = sectionsRaw
    .map((section, index) => sanitizeSection(section, index))
    .filter((section): section is HomepageSection => section !== null);

  const hasFinder = sections.some(
    (section) => section.type === 'recipe_finder',
  );
  let nextSections = sections;
  if (!hasFinder) {
    const heroIndex = sections.findIndex((section) => section.type === 'hero');
    const insertAt = heroIndex >= 0 ? heroIndex + 1 : 0;
    const finderSection: HomepageSection = {
      id: 'section-recipe-finder',
      type: 'recipe_finder',
      data: {},
    };
    nextSections = [
      ...sections.slice(0, insertAt),
      finderSection,
      ...sections.slice(insertAt),
    ];
  }

  const doc: HomepageDocument = {
    id: asString(raw.id, 'homepage'),
    title: asString(raw.title, 'Homepage'),
    status: asStatus(raw.status),
    scheduled_at: asNullableString(raw.scheduled_at),
    published_at: asNullableString(raw.published_at),
    created_at: asString(raw.created_at, now),
    updated_at: asString(raw.updated_at, now),
    sections: nextSections.length > 0 ? nextSections : fallback.sections,
  };

  return normalizeHomepage(doc);
}
