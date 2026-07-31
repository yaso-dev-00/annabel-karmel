import { revalidatePath, revalidateTag } from 'next/cache';

export const COOKBOOKS_CACHE_TAG = 'cookbooks';

export function cookbookIdTag(id: string): string {
  return `cookbook:${id}`;
}

export function cookbookSlugTag(slug: string): string {
  return `cookbook-slug:${slug}`;
}

type RevalidateCookbook = {
  id?: string;
  slug?: string;
};

/** Admin + preview paths only — live /apps-books/[slug] stays on static data for now. */
export function revalidateCookbookPages(cookbook?: RevalidateCookbook): void {
  revalidateTag(COOKBOOKS_CACHE_TAG, 'seconds');
  if (cookbook?.id) revalidateTag(cookbookIdTag(cookbook.id), 'seconds');
  if (cookbook?.slug) revalidateTag(cookbookSlugTag(cookbook.slug), 'seconds');

  revalidatePath('/admin');
  revalidatePath('/admin/cookbooks');
  revalidatePath('/admin', 'layout');

  if (cookbook?.id) {
    revalidatePath(`/admin/cookbooks/${cookbook.id}/edit`);
    revalidatePath(`/admin/cookbooks/${cookbook.id}/preview`);
  }
}
