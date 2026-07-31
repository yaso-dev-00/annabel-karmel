import { createDefaultHomepageDocument } from '@/lib/homepage/create-default-homepage';
import type {
  HomepageDocument,
  HomepageSection,
  HomepageSectionType,
  RecipeAppSectionData,
} from '@/lib/homepage/types';
import type {
  AppSectionContent,
  CollabCard,
  CookbookCard,
  ExpertRangeCard,
  HeroSlide,
  InstagramPostCard,
  RecipeCard,
} from '@/data/site-content';

export type ResolvedHomePageContent = {
  sectionOrder: HomepageSectionType[];
  heroSlides: HeroSlide[];
  latestRecipes: {
    heading: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    recipes: RecipeCard[];
  };
  appSection: AppSectionContent;
  expertRanges: {
    heading: string;
    body: string;
    awardLogos: string[];
    cards: ExpertRangeCard[];
  };
  cookbooks: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    books: CookbookCard[];
  };
  collabs: {
    heading: string;
    cards: CollabCard[];
  };
  partners: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    logos: { name: string; image: string; href: string }[];
  };
  instagram: {
    title: string;
    titleAccent: string;
    description: string;
    posts: InstagramPostCard[];
  };
};

function sectionMap(sections: HomepageSection[]) {
  const map = new Map<HomepageSectionType, HomepageSection>();
  for (const section of sections) {
    map.set(section.type, section);
  }
  return map;
}

function toAppSection(data: RecipeAppSectionData): AppSectionContent {
  return {
    heading: data.heading,
    bullets: data.bullets.map(({ lead, text }) => ({ lead, text })),
    ctaLabel: data.ctaLabel,
    ctaHref: data.ctaHref,
    appStoreHref: data.appStoreHref,
    playStoreHref: data.playStoreHref,
    awards: data.awards.map(({ src, alt }) => ({ src, alt })),
    phonesImage: data.phonesImage,
  };
}

export function resolveHomePageContent(
  document?: HomepageDocument | null,
): ResolvedHomePageContent {
  const doc = document ?? createDefaultHomepageDocument();
  const byType = sectionMap(doc.sections);
  const defaults = createDefaultHomepageDocument();
  const defaultByType = sectionMap(defaults.sections);

  const hero = (byType.get('hero') ?? defaultByType.get('hero'))!;
  const latest = (byType.get('latest_recipes') ??
    defaultByType.get('latest_recipes'))!;
  const app = (byType.get('recipe_app') ?? defaultByType.get('recipe_app'))!;
  const expert = (byType.get('expert_ranges') ??
    defaultByType.get('expert_ranges'))!;
  const books = (byType.get('cookbooks') ?? defaultByType.get('cookbooks'))!;
  const collabs = (byType.get('collabs') ?? defaultByType.get('collabs'))!;
  const partners = (byType.get('partners') ?? defaultByType.get('partners'))!;
  const instagram = (byType.get('instagram') ??
    defaultByType.get('instagram'))!;

  if (
    hero.type !== 'hero' ||
    latest.type !== 'latest_recipes' ||
    app.type !== 'recipe_app' ||
    expert.type !== 'expert_ranges' ||
    books.type !== 'cookbooks' ||
    collabs.type !== 'collabs' ||
    partners.type !== 'partners' ||
    instagram.type !== 'instagram'
  ) {
    throw new Error('Invalid homepage section payload');
  }

  return {
    sectionOrder: doc.sections.map((section) => section.type),
    heroSlides: hero.data.slides.map(
      ({ title, subtitle, cta, href, image }) => ({
        title,
        subtitle,
        cta,
        href,
        image,
      }),
    ),
    latestRecipes: {
      heading: latest.data.heading,
      subtitle: latest.data.subtitle,
      ctaLabel: latest.data.ctaLabel,
      ctaHref: latest.data.ctaHref,
      recipes: latest.data.recipes.map(({ title, duration, href, image }) => ({
        title,
        duration,
        href,
        image,
      })),
    },
    appSection: toAppSection(app.data),
    expertRanges: {
      heading: expert.data.heading,
      body: expert.data.body,
      awardLogos: expert.data.awardLogos
        .map((logo) => logo.src)
        .filter(Boolean),
      cards: expert.data.cards.map(({ title, image, href }) => ({
        title,
        image,
        href,
      })),
    },
    cookbooks: {
      heading: books.data.heading,
      body: books.data.body,
      ctaLabel: books.data.ctaLabel,
      ctaHref: books.data.ctaHref,
      books: books.data.books.map(({ title, image, href }) => ({
        title,
        image,
        href,
      })),
    },
    collabs: {
      heading: collabs.data.heading,
      cards: collabs.data.cards.map(
        ({ title, subtitle, href, logoImage, cardImage }) => ({
          title,
          subtitle,
          href,
          logoImage: logoImage || undefined,
          cardImage,
        }),
      ),
    },
    partners: {
      heading: partners.data.heading,
      body: partners.data.body,
      ctaLabel: partners.data.ctaLabel,
      ctaHref: partners.data.ctaHref,
      logos: partners.data.logos.map(({ name, image, href }) => ({
        name,
        image,
        href,
      })),
    },
    instagram: {
      title: instagram.data.title,
      titleAccent: instagram.data.titleAccent,
      description: instagram.data.description,
      posts: instagram.data.posts.map(({ href, image, kind }) => ({
        href,
        image,
        kind,
      })),
    },
  };
}
