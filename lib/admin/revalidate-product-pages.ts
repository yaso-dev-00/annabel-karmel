import { revalidatePath, revalidateTag } from 'next/cache';

export const PRODUCTS_CACHE_TAG = 'products';

export function productIdTag(id: string): string {
  return `product:${id}`;
}

export function productSlugTag(slug: string): string {
  return `product-slug:${slug}`;
}

type RevalidateProduct = {
  id?: string;
  slug?: string;
};

/** Admin paths only — live /products/* stays on static pages for now. */
export function revalidateProductPages(product?: RevalidateProduct): void {
  revalidateTag(PRODUCTS_CACHE_TAG, 'seconds');
  if (product?.id) revalidateTag(productIdTag(product.id), 'seconds');
  if (product?.slug) revalidateTag(productSlugTag(product.slug), 'seconds');

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin', 'layout');

  if (product?.id) {
    revalidatePath(`/admin/products/${product.id}/edit`);
    revalidatePath(`/admin/products/${product.id}/preview`);
  }
}
