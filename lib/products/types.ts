import type { ChilledProductPageData } from '@/data/chilled-product-page';
import type { FrozenProductPageData } from '@/data/frozen-product-page';
import type { PlantPoweredBitesPageData } from '@/data/plant-powered-bites-product-page';
import type { AustraliaFrozenProductPageData } from '@/data/australia-frozen-product-page';
import type {
  TablewareCareIcon,
  TablewareGalleryImage,
} from '@/data/tableware-product-page';
import type { TablewareSwatchColor } from '@/data/tableware-page';

export type ProductStatus =
  'draft' | 'published' | 'scheduled' | 'private' | 'disabled';

export type ProductCategory =
  | 'chilled-meals'
  | 'frozen-meals'
  | 'plant-powered-bites'
  | 'australia-frozen'
  | 'tableware';

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'chilled-meals', label: 'Chilled Meals' },
  { value: 'frozen-meals', label: 'Frozen Meals' },
  { value: 'plant-powered-bites', label: 'Plant Powered Bites' },
  { value: 'australia-frozen', label: 'Little Meals' },
  { value: 'tableware', label: 'Grow Products' },
];

export type ChilledProductPageContent = Omit<ChilledProductPageData, 'slug'> & {
  kind: 'chilled-meals';
};

export type FrozenProductPageContent = Omit<FrozenProductPageData, 'slug'> & {
  kind: 'frozen-meals';
};

export type PlantPoweredBitesPageContent = Omit<
  PlantPoweredBitesPageData,
  'slug'
> & {
  kind: 'plant-powered-bites';
};

export type AustraliaFrozenPageContent = Omit<
  AustraliaFrozenProductPageData,
  'slug' | 'metaDescription'
> & {
  kind: 'australia-frozen';
};

/** One colour option with its own PDP gallery (and optional shop URL). */
export type TablewareColorVariant = {
  slug: string;
  color: TablewareSwatchColor;
  label: string;
  hex: string;
  gallery: TablewareGalleryImage[];
  shopHref: string;
};

export type TablewarePageContent = {
  kind: 'tableware';
  /** Default colour shown for this product’s primary slug / editor preview. */
  activeColor: TablewareSwatchColor;
  colorVariants: TablewareColorVariant[];
  description: string[];
  features: {
    heading: string;
    columns: string[][];
  };
  materials: {
    heading: string;
    items: string[];
  };
  dimensions: {
    items: string[];
  };
  careHeading: string;
  careIcons: TablewareCareIcon[];
  retailer: {
    label: string;
    logo: string;
    shopLabel: string;
    shopHref: string;
  };
  distributorHtml: string;
  completeSetSlugs: string[];
};

export type ProductPageContent =
  | ChilledProductPageContent
  | FrozenProductPageContent
  | PlantPoweredBitesPageContent
  | AustraliaFrozenPageContent
  | TablewarePageContent;

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  title: string;
  seo_title: string;
  seo_description: string;
  status?: ProductStatus;
  scheduled_at?: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  page: ProductPageContent;
};

export type ProductsStore = {
  products: Product[];
};

export function productCategoryLabel(category: ProductCategory): string {
  return (
    PRODUCT_CATEGORIES.find((item) => item.value === category)?.label ??
    category
  );
}
