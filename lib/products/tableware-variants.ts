import type { TablewareSwatchColor } from '@/data/tableware-page';
import type {
  TablewareColorSwatch,
  TablewareGalleryImage,
  TablewareProductPageData,
} from '@/data/tableware-product-page';
import { getTablewareProductPageData } from '@/data/tableware-product-page';
import type {
  TablewareColorVariant,
  TablewarePageContent,
} from '@/lib/products/types';

const VARIANT_INDEX_PREFIX = 'index:';

export function makeTablewareVariantKey(index: number): string {
  return `${VARIANT_INDEX_PREFIX}${index}`;
}

export function parseTablewareVariantIndex(key?: string | null): number | null {
  if (!key?.startsWith(VARIANT_INDEX_PREFIX)) return null;
  const index = Number(key.slice(VARIANT_INDEX_PREFIX.length));
  return Number.isInteger(index) && index >= 0 ? index : null;
}

export function resolveTablewareVariant(
  page: TablewarePageContent,
  colorOrSlugOrIndex?: string | null,
): TablewareColorVariant | null {
  const variants = page.colorVariants;
  if (!variants.length) return null;

  if (colorOrSlugOrIndex) {
    const byIndex = parseTablewareVariantIndex(colorOrSlugOrIndex);
    if (byIndex !== null && variants[byIndex]) return variants[byIndex]!;

    const bySlug = variants.find(
      (variant) => variant.slug === colorOrSlugOrIndex,
    );
    if (bySlug) return bySlug;
    const byColor = variants.find(
      (variant) => variant.color === colorOrSlugOrIndex,
    );
    if (byColor) return byColor;
  }

  return (
    variants.find((variant) => variant.color === page.activeColor) ??
    variants[0] ??
    null
  );
}

export function resolveTablewareVariantIndex(
  page: TablewarePageContent,
  colorOrSlugOrIndex?: string | null,
): number {
  const variants = page.colorVariants;
  if (!variants.length) return 0;

  if (colorOrSlugOrIndex) {
    const byIndex = parseTablewareVariantIndex(colorOrSlugOrIndex);
    if (byIndex !== null && variants[byIndex]) return byIndex;

    const slugIndex = variants.findIndex(
      (variant) => variant.slug === colorOrSlugOrIndex,
    );
    if (slugIndex >= 0) return slugIndex;
    const colorIndex = variants.findIndex(
      (variant) => variant.color === colorOrSlugOrIndex,
    );
    if (colorIndex >= 0) return colorIndex;
  }

  const activeIndex = variants.findIndex(
    (variant) => variant.color === page.activeColor,
  );
  return activeIndex >= 0 ? activeIndex : 0;
}

export function tablewareVariantsToSwatches(
  variants: TablewareColorVariant[],
): TablewareColorSwatch[] {
  return variants.map(({ slug, color, label, hex }, index) => ({
    slug: slug.trim() || makeTablewareVariantKey(index),
    color,
    label,
    hex,
  }));
}

function galleryWithSrc(
  gallery: TablewareGalleryImage[],
): TablewareGalleryImage[] {
  return gallery.filter((image) => image.src.trim());
}

/** Prefer CMS gallery; if empty, fall back to static Grow PDP JSON for that slug. */
export function resolveVariantGallery(
  variant: TablewareColorVariant,
): TablewareGalleryImage[] {
  const fromCms = galleryWithSrc(variant.gallery);
  if (fromCms.length > 0) return fromCms;

  const slug = variant.slug.trim();
  if (!slug) return [];

  const fromStatic = getTablewareProductPageData(slug);
  return fromStatic ? galleryWithSrc(fromStatic.gallery) : [];
}

export function tablewareContentToPageData(
  page: TablewarePageContent,
  meta: { slug: string; title: string; metaDescription: string },
  variantKey?: string | null,
): TablewareProductPageData {
  const activeIndex = resolveTablewareVariantIndex(page, variantKey);
  const active =
    page.colorVariants[activeIndex] ??
    ({
      slug: meta.slug,
      color: page.activeColor,
      label: 'Colour',
      hex: '#c3d2b6',
      gallery: [] as TablewareGalleryImage[],
      shopHref: '',
    } satisfies TablewareColorVariant);

  const gallery = resolveVariantGallery(active);
  const staticPage = active.slug.trim()
    ? getTablewareProductPageData(active.slug.trim())
    : undefined;
  const shopHref =
    active.shopHref.trim() ||
    staticPage?.retailer.shopHref ||
    page.retailer.shopHref;
  const activeSwatchKey =
    active.slug.trim() || makeTablewareVariantKey(activeIndex);

  return {
    slug: active.slug.trim() || meta.slug,
    title: meta.title,
    metaDescription: meta.metaDescription,
    activeColor: active.color,
    activeColorLabel: active.label,
    activeSwatchKey,
    swatches: tablewareVariantsToSwatches(page.colorVariants),
    gallery,
    description: page.description,
    features: page.features,
    materials: page.materials,
    dimensions: page.dimensions,
    careHeading: page.careHeading,
    careIcons: page.careIcons,
    retailer: {
      ...page.retailer,
      shopHref,
    },
    distributorHtml: page.distributorHtml,
    completeSetSlugs: page.completeSetSlugs,
  };
}

export function emptyTablewareVariant(
  color: TablewareSwatchColor = 'soft-sage',
  label = 'Soft Sage',
  hex = '#c3d2b6',
): TablewareColorVariant {
  return {
    slug: '',
    color,
    label,
    hex,
    gallery: [{ src: '', alt: '' }],
    shopHref: '',
  };
}
