import { normalizeProduct } from "@/lib/admin/product-status";
import { normalizeCmsImageSrc } from "@/lib/content-blocks/image-src";
import { getTablewareProductPageData } from "@/data/tableware-product-page";
import {
  PRODUCT_CATEGORIES,
  type AustraliaFrozenPageContent,
  type ChilledProductPageContent,
  type FrozenProductPageContent,
  type PlantPoweredBitesPageContent,
  type Product,
  type ProductCategory,
  type ProductPageContent,
  type ProductsStore,
  type TablewarePageContent,
} from "@/lib/products/types";
import type { TablewareSwatchColor } from "@/data/tableware-page";

const CATEGORY_VALUES = new Set(PRODUCT_CATEGORIES.map((c) => c.value));

function trimString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function trimImageSrc(value: unknown, fallback = ""): string {
  return normalizeCmsImageSrc(trimString(value, fallback));
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function sanitizeStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => trimString(item)).filter(Boolean);
}

function sanitizeCarousel(raw: unknown): { src: string; alt: string; width?: number; height?: number }[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const row = asRecord(item);
    if (!row) return [];
    const src = trimImageSrc(row.src);
    if (!src) return [];
    const slide: { src: string; alt: string; width?: number; height?: number } = {
      src,
      alt: trimString(row.alt),
    };
    if (typeof row.width === "number") slide.width = row.width;
    if (typeof row.height === "number") slide.height = row.height;
    return [slide];
  });
}

function sanitizeBadges(raw: unknown): { src: string; alt: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const row = asRecord(item);
    if (!row) return [];
    const src = trimImageSrc(row.src);
    if (!src) return [];
    return [{ src, alt: trimString(row.alt) }];
  });
}

function sanitizeAccordion(raw: unknown): {
  title: string;
  paragraphs?: string[];
  table?: { headers: string[]; rows: string[][]; footnote?: string };
}[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const row = asRecord(item);
    if (!row) return [];
    const title = trimString(row.title);
    if (!title) return [];
    const entry: {
      title: string;
      paragraphs?: string[];
      table?: { headers: string[]; rows: string[][]; footnote?: string };
    } = { title };
    const table = asRecord(row.table);
    if (table) {
      const headers = Array.isArray(table.headers)
        ? table.headers.map((h) => trimString(h))
        : [];
      const rows = Array.isArray(table.rows)
        ? table.rows
            .filter((r): r is unknown[] => Array.isArray(r))
            .map((r) => r.map((cell) => trimString(cell)))
        : [];
      const hasTableContent = rows.length > 0 || headers.some(Boolean);
      if (hasTableContent) {
        entry.table = {
          headers,
          rows,
          ...(trimString(table.footnote) ? { footnote: trimString(table.footnote) } : {}),
        };
      }
    }
    // Text and table are mutually exclusive; prefer a real table when present.
    if (!entry.table && Array.isArray(row.paragraphs)) {
      entry.paragraphs = sanitizeStringArray(row.paragraphs);
    }
    return [entry];
  });
}

function sanitizeRelated(raw: unknown): {
  image: string;
  href: string;
  width?: number;
  height?: number;
}[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const row = asRecord(item);
    if (!row) return [];
    const image = trimImageSrc(row.image);
    const href = trimString(row.href);
    if (!image || !href) return [];
    const related: { image: string; href: string; width?: number; height?: number } = {
      image,
      href,
    };
    if (typeof row.width === "number") related.width = row.width;
    if (typeof row.height === "number") related.height = row.height;
    return [related];
  });
}

function sanitizeTheme(raw: unknown) {
  const row = asRecord(raw) ?? {};
  return {
    detailColor: trimString(row.detailColor, "#8585D5"),
    accordionBg: trimString(row.accordionBg, "#6868CD"),
    discoverButtonBg: trimString(row.discoverButtonBg, "#1a2078"),
    discoverButtonColor: trimString(row.discoverButtonColor, "#8585D5"),
    ...(trimString(row.detailTextColor) ? { detailTextColor: trimString(row.detailTextColor) } : {}),
    ...(trimString(row.heroTextColor) ? { heroTextColor: trimString(row.heroTextColor) } : {}),
  };
}

function sanitizeHero(raw: unknown) {
  const row = asRecord(raw) ?? {};
  return {
    title: trimString(row.title),
    intro: trimString(row.intro),
    desktopWidth: typeof row.desktopWidth === "number" ? row.desktopWidth : 1200,
    desktopHeight: typeof row.desktopHeight === "number" ? row.desktopHeight : 800,
    mobileWidth: typeof row.mobileWidth === "number" ? row.mobileWidth : 800,
    mobileHeight: typeof row.mobileHeight === "number" ? row.mobileHeight : 700,
  };
}

function sanitizeCategory(raw: unknown): ProductCategory {
  const value = trimString(raw) as ProductCategory;
  return CATEGORY_VALUES.has(value) ? value : "chilled-meals";
}

function sanitizeChilledPage(raw: Record<string, unknown>): ChilledProductPageContent {
  const assets = asRecord(raw.assets) ?? {};
  const retailer = asRecord(raw.retailer) ?? {};
  return {
    kind: "chilled-meals",
    heroAlt: trimString(raw.heroAlt),
    headingId: trimString(raw.headingId) || "product-heading",
    assets: {
      heroDesktop: trimImageSrc(assets.heroDesktop),
      heroMobile: trimImageSrc(assets.heroMobile),
      detailBg: trimImageSrc(assets.detailBg),
      detailBgMobile: trimImageSrc(assets.detailBgMobile),
      retailerBg: trimImageSrc(assets.retailerBg),
      whyNotTryBg: trimImageSrc(assets.whyNotTryBg),
      ...(trimImageSrc(assets.tescoLogo) ? { tescoLogo: trimImageSrc(assets.tescoLogo) } : {}),
      arrowLeft: trimImageSrc(assets.arrowLeft),
      arrowRight: trimImageSrc(assets.arrowRight),
    },
    hero: sanitizeHero(raw.hero),
    carousel: sanitizeCarousel(raw.carousel),
    badges: sanitizeBadges(raw.badges),
    description: trimString(raw.description),
    accordion: sanitizeAccordion(raw.accordion),
    retailer: {
      heading: trimString(retailer.heading, "exclusively at"),
      ...(trimString(retailer.logoHref) ? { logoHref: trimString(retailer.logoHref) } : {}),
    },
    related: sanitizeRelated(raw.related),
    theme: sanitizeTheme(raw.theme),
  };
}

function sanitizeFrozenPage(raw: Record<string, unknown>): FrozenProductPageContent {
  const assets = asRecord(raw.assets) ?? {};
  const retailer = asRecord(raw.retailer) ?? {};
  const logos = Array.isArray(retailer.logos)
    ? retailer.logos.flatMap((item) => {
        const row = asRecord(item);
        if (!row) return [];
        const src = trimImageSrc(row.src);
        const href = trimString(row.href);
        if (!src || !href) return [];
        return [{ src, alt: trimString(row.alt), href }];
      })
    : [];

  return {
    kind: "frozen-meals",
    heroAlt: trimString(raw.heroAlt),
    headingId: trimString(raw.headingId) || "product-heading",
    assets: {
      heroDesktop: trimImageSrc(assets.heroDesktop),
      heroMobile: trimImageSrc(assets.heroMobile),
      detailBg: trimImageSrc(assets.detailBg),
      detailBgMobile: trimImageSrc(assets.detailBgMobile),
      ...(trimImageSrc(assets.cloudLeft) ? { cloudLeft: trimImageSrc(assets.cloudLeft) } : {}),
      ...(trimImageSrc(assets.cloudRight) ? { cloudRight: trimImageSrc(assets.cloudRight) } : {}),
      retailerBg: trimImageSrc(assets.retailerBg),
      whyNotTryBg: trimImageSrc(assets.whyNotTryBg),
      arrowLeft: trimImageSrc(assets.arrowLeft),
      arrowRight: trimImageSrc(assets.arrowRight),
    },
    hero: sanitizeHero(raw.hero),
    carousel: sanitizeCarousel(raw.carousel),
    badges: sanitizeBadges(raw.badges),
    description: trimString(raw.description),
    accordion: sanitizeAccordion(raw.accordion),
    retailer: {
      heading: trimString(retailer.heading, "Discover in the freezer aisle"),
      logos,
    },
    related: sanitizeRelated(raw.related),
    theme: sanitizeTheme(raw.theme),
  };
}

function sanitizePlantPoweredPage(raw: Record<string, unknown>): PlantPoweredBitesPageContent {
  const assets = asRecord(raw.assets) ?? {};
  const retailer = asRecord(raw.retailer) ?? {};
  const badges = asRecord(raw.badges) ?? {};
  const description = Array.isArray(raw.description)
    ? sanitizeStringArray(raw.description)
    : trimString(raw.description);

  const waysToServe = Array.isArray(raw.waysToServe)
    ? raw.waysToServe.flatMap((item) => {
        const row = asRecord(item);
        if (!row) return [];
        const title = trimString(row.title);
        const href = trimString(row.href);
        const image = trimImageSrc(row.image);
        if (!title || !href || !image) return [];
        return [{ title, href, image }];
      })
    : [];

  return {
    kind: "plant-powered-bites",
    heroAlt: trimString(raw.heroAlt),
    headingId: trimString(raw.headingId) || "product-heading",
    assets: {
      heroDesktop: trimImageSrc(assets.heroDesktop),
      heroMobile: trimImageSrc(assets.heroMobile),
      detailBg: trimImageSrc(assets.detailBg),
      detailBgMobile: trimImageSrc(assets.detailBgMobile),
      retailerBg: trimImageSrc(assets.retailerBg),
      whyNotTryBg: trimImageSrc(assets.whyNotTryBg),
      asdaLogo: trimImageSrc(assets.asdaLogo),
      arrowLeft: trimImageSrc(assets.arrowLeft),
      arrowRight: trimImageSrc(assets.arrowRight),
    },
    hero: sanitizeHero(raw.hero),
    carousel: sanitizeCarousel(raw.carousel).map((slide) => ({
      ...slide,
      width: slide.width ?? 800,
      height: slide.height ?? 800,
    })),
    badges: {
      desktop: trimImageSrc(badges.desktop),
      mobile: trimImageSrc(badges.mobile),
      alt: trimString(badges.alt),
      desktopWidth: typeof badges.desktopWidth === "number" ? badges.desktopWidth : 1024,
      desktopHeight: typeof badges.desktopHeight === "number" ? badges.desktopHeight : 238,
      mobileWidth: typeof badges.mobileWidth === "number" ? badges.mobileWidth : 812,
      mobileHeight: typeof badges.mobileHeight === "number" ? badges.mobileHeight : 452,
    },
    description,
    accordion: sanitizeAccordion(raw.accordion),
    retailer: {
      heading: trimString(retailer.heading, "Find them in the freezer exclusively at"),
      logoHref: trimString(retailer.logoHref),
    },
    waysToServe,
    related: sanitizeRelated(raw.related),
    theme: sanitizeTheme(raw.theme),
  };
}

function sanitizeAustraliaFrozenPage(raw: Record<string, unknown>): AustraliaFrozenPageContent {
  const retailers = asRecord(raw.retailers) ?? {};
  const nutrition = asRecord(raw.nutrition) ?? {};
  const headersRaw = Array.isArray(nutrition.headers) ? nutrition.headers.map((h) => trimString(h)) : ["", "Per serving", "Per 100g"];
  const headers: [string, string, string] = [
    headersRaw[0] ?? "",
    headersRaw[1] ?? "Per serving",
    headersRaw[2] ?? "Per 100g",
  ];

  return {
    kind: "australia-frozen",
    title: trimString(raw.title),
    description: sanitizeStringArray(raw.description),
    carousel: sanitizeCarousel(raw.carousel).map(({ src, alt }) => ({ src, alt })),
    retailers: {
      ...(trimImageSrc(retailers.woolworths) ? { woolworths: trimImageSrc(retailers.woolworths) } : {}),
      ...(trimImageSrc(retailers.coles) ? { coles: trimImageSrc(retailers.coles) } : {}),
      ...(trimImageSrc(retailers.iga) ? { iga: trimImageSrc(retailers.iga) } : {}),
    },
    ingredients: sanitizeStringArray(raw.ingredients),
    nutrition: {
      headers,
      rows: Array.isArray(nutrition.rows)
        ? nutrition.rows
            .filter((r): r is unknown[] => Array.isArray(r))
            .map((r) => r.map((cell) => trimString(cell)))
        : [],
    },
  };
}

const TABLEWARE_COLORS = new Set<TablewareSwatchColor>(["soft-sage", "warm-stone", "blushberry"]);

function sanitizeTablewareColor(raw: unknown, fallback: TablewareSwatchColor = "soft-sage"): TablewareSwatchColor {
  const value = trimString(raw) as TablewareSwatchColor;
  return TABLEWARE_COLORS.has(value) ? value : fallback;
}

function sanitizeTablewareGallery(raw: unknown): { src: string; alt: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    const row = asRecord(item);
    if (!row) return [];
    const src = trimImageSrc(row.src);
    if (!src) return [];
    return [{ src, alt: trimString(row.alt) }];
  });
}

function sanitizeTablewarePage(raw: Record<string, unknown>): TablewarePageContent {
  const features = asRecord(raw.features) ?? {};
  const materials = asRecord(raw.materials) ?? {};
  const dimensions = asRecord(raw.dimensions) ?? {};
  const retailer = asRecord(raw.retailer) ?? {};
  const activeColor = sanitizeTablewareColor(raw.activeColor);

  const legacyGallery = sanitizeTablewareGallery(raw.gallery);
  const legacySwatches = Array.isArray(raw.swatches)
    ? raw.swatches.flatMap((item) => {
        const row = asRecord(item);
        if (!row) return [];
        const slug = trimString(row.slug);
        if (!slug && !trimString(row.color) && !trimString(row.label)) return [];
        return [
          {
            slug,
            color: sanitizeTablewareColor(row.color, activeColor),
            label: trimString(row.label),
            hex: trimString(row.hex, "#c3d2b6"),
            gallery: sanitizeTablewareGallery(row.gallery),
            shopHref: trimString(row.shopHref),
          },
        ];
      })
    : [];

  let colorVariants = Array.isArray(raw.colorVariants)
    ? raw.colorVariants.flatMap((item) => {
        const row = asRecord(item);
        if (!row) return [];
        return [
          {
            slug: trimString(row.slug),
            color: sanitizeTablewareColor(row.color, activeColor),
            label: trimString(row.label),
            hex: trimString(row.hex, "#c3d2b6"),
            gallery: sanitizeTablewareGallery(row.gallery),
            shopHref: trimString(row.shopHref),
          },
        ];
      })
    : [];

  if (colorVariants.length === 0 && legacySwatches.length > 0) {
    colorVariants = legacySwatches.map((swatch) => ({
      ...swatch,
      gallery:
        swatch.gallery.length > 0
          ? swatch.gallery
          : swatch.color === activeColor
            ? legacyGallery
            : [],
      shopHref:
        swatch.shopHref ||
        (swatch.color === activeColor ? trimString(retailer.shopHref) : ""),
    }));
  }

  if (colorVariants.length === 0) {
    colorVariants = [
      {
        slug: "",
        color: activeColor,
        label: trimString(raw.activeColorLabel, "Soft Sage"),
        hex: "#c3d2b6",
        gallery: legacyGallery.length > 0 ? legacyGallery : [{ src: "", alt: "" }],
        shopHref: trimString(retailer.shopHref),
      },
    ];
  }

  // Backfill empty per-colour galleries / shop URLs from the static Grow PDP JSON.
  colorVariants = colorVariants.map((variant) => {
    const slug = variant.slug.trim();
    if (!slug) {
      return {
        ...variant,
        gallery: variant.gallery.length > 0 ? variant.gallery : [{ src: "", alt: "" }],
      };
    }

    const fromStatic = getTablewareProductPageData(slug);
    if (!fromStatic) {
      return {
        ...variant,
        gallery: variant.gallery.length > 0 ? variant.gallery : [{ src: "", alt: "" }],
      };
    }

    const staticGallery = sanitizeTablewareGallery(fromStatic.gallery);
    return {
      ...variant,
      gallery: variant.gallery.length > 0 ? variant.gallery : staticGallery.length > 0 ? staticGallery : [{ src: "", alt: "" }],
      shopHref: variant.shopHref || trimString(fromStatic.retailer?.shopHref),
      label: variant.label || trimString(fromStatic.activeColorLabel),
      hex: variant.hex || "#c3d2b6",
    };
  });

  const careIcons = Array.isArray(raw.careIcons)
    ? raw.careIcons.flatMap((item) => {
        const row = asRecord(item);
        if (!row) return [];
        const src = trimImageSrc(row.src);
        const label = trimString(row.label);
        if (!src || !label) return [];
        return [{ src, label }];
      })
    : [];

  const featureColumns = Array.isArray(features.columns)
    ? features.columns.map((col) =>
        Array.isArray(col) ? col.map((cell) => trimString(cell)).filter(Boolean) : [],
      )
    : [[], []];

  while (featureColumns.length < 2) featureColumns.push([]);

  const resolvedActive =
    colorVariants.some((variant) => variant.color === activeColor)
      ? activeColor
      : colorVariants[0]!.color;

  return {
    kind: "tableware",
    activeColor: resolvedActive,
    colorVariants,
    description: sanitizeStringArray(raw.description),
    features: {
      heading: trimString(features.heading, "Practical, safe and parent approved"),
      columns: featureColumns.slice(0, 2),
    },
    materials: {
      heading: trimString(materials.heading, "Materials and dimensions"),
      items: sanitizeStringArray(materials.items),
    },
    dimensions: {
      items: sanitizeStringArray(dimensions.items),
    },
    careHeading: trimString(raw.careHeading, "Looking after me"),
    careIcons,
    retailer: {
      label: trimString(retailer.label, "Available exclusively at:"),
      logo: trimImageSrc(retailer.logo, "/tableware/baby-bunting-logo.jpg"),
      shopLabel: trimString(retailer.shopLabel, "Shop"),
      shopHref: trimString(retailer.shopHref),
    },
    distributorHtml: trimString(raw.distributorHtml),
    completeSetSlugs: sanitizeStringArray(raw.completeSetSlugs),
  };
}

function sanitizePage(category: ProductCategory, raw: unknown): ProductPageContent {
  const input = asRecord(raw) ?? {};
  const kind = trimString(input.kind) || category;

  if (kind === "frozen-meals" || category === "frozen-meals") {
    return sanitizeFrozenPage(input);
  }
  if (kind === "plant-powered-bites" || category === "plant-powered-bites") {
    return sanitizePlantPoweredPage(input);
  }
  if (kind === "australia-frozen" || category === "australia-frozen") {
    return sanitizeAustraliaFrozenPage(input);
  }
  if (kind === "tableware" || category === "tableware") {
    return sanitizeTablewarePage(input);
  }
  return sanitizeChilledPage(input);
}

export function sanitizeProduct(raw: unknown): Product {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid product payload");
  }

  const input = raw as Record<string, unknown>;
  const slug = trimString(input.slug);
  const title = trimString(input.title);
  if (!slug) throw new Error("Product slug is required");
  if (!title) throw new Error("Product title is required");

  const category = sanitizeCategory(input.category);
  const page = sanitizePage(category, input.page);

  const product: Product = {
    id: trimString(input.id) || crypto.randomUUID(),
    slug,
    category,
    title,
    seo_title: trimString(input.seo_title),
    seo_description: trimString(input.seo_description),
    status: input.status as Product["status"],
    scheduled_at: (input.scheduled_at as string | null | undefined) ?? null,
    published_at: (input.published_at as string | null | undefined) ?? null,
    updated_at: trimString(input.updated_at) || new Date().toISOString(),
    created_at: trimString(input.created_at) || new Date().toISOString(),
    page,
  };

  return normalizeProduct(product);
}

export function sanitizeProductsStore(raw: unknown): ProductsStore {
  if (!raw || typeof raw !== "object") {
    return { products: [] };
  }
  const store = raw as Record<string, unknown>;
  const products = Array.isArray(store.products)
    ? store.products.flatMap((product) => {
        try {
          return [sanitizeProduct(product)];
        } catch {
          return [];
        }
      })
    : [];

  return { products };
}

export function validateProductForPublish(product: Product): string | null {
  if (!product.title.trim()) return "Title is required to publish.";
  if (!product.slug.trim()) return "Slug is required to publish.";
  if (!product.category) return "Category is required to publish.";
  if (product.page.kind === "australia-frozen") {
    if (!product.page.title.trim()) return "Product page title is required to publish.";
    if (product.page.description.length < 1) return "Add at least one description paragraph to publish.";
  } else if (product.page.kind === "tableware") {
    const page = product.page;
    const active =
      page.colorVariants.find((variant) => variant.color === page.activeColor) ?? page.colorVariants[0];
    const galleryCount = active?.gallery.filter((image) => image.src.trim()).length ?? 0;
    if (galleryCount < 1) return "Add at least one gallery image to the active colour to publish.";
    if (page.description.length < 1) return "Add at least one description paragraph to publish.";
    if (page.colorVariants.length < 1) return "Add at least one colour variant to publish.";
  } else if (!("hero" in product.page) || !product.page.hero.title.trim()) {
    return "Hero title is required to publish.";
  }
  if (product.status === "scheduled" && !product.scheduled_at) {
    return "Scheduled products need a publish date.";
  }
  return null;
}
