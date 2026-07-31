import { revalidatePath, revalidateTag } from 'next/cache';

export const EXPERTS_CACHE_TAG = 'experts';

export function expertIdTag(id: string): string {
  return `expert:${id}`;
}

export function expertSlugTag(slug: string): string {
  return `expert-slug:${slug}`;
}

type RevalidateExpert = {
  id?: string;
  slug?: string;
};

export function revalidateExpertPages(expert?: RevalidateExpert): void {
  revalidateTag(EXPERTS_CACHE_TAG, 'seconds');
  if (expert?.id) revalidateTag(expertIdTag(expert.id), 'seconds');
  if (expert?.slug) revalidateTag(expertSlugTag(expert.slug), 'seconds');

  revalidatePath('/admin');
  revalidatePath('/admin/experts');
  revalidatePath('/admin', 'layout');
  revalidatePath('/meet-our-experts');
  revalidatePath('/experts');

  if (expert?.id) {
    revalidatePath(`/admin/experts/${expert.id}/edit`);
    revalidatePath(`/admin/experts/${expert.id}/preview`);
  }

  if (expert?.slug) {
    revalidatePath(`/experts/${expert.slug}`);
  }
}
