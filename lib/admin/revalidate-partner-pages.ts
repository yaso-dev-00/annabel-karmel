import { revalidatePath, revalidateTag } from "next/cache";

export const PARTNERS_CACHE_TAG = "partners";

export function partnerIdTag(id: string): string {
  return `partner:${id}`;
}

export function partnerSlugTag(slug: string): string {
  return `partner-slug:${slug}`;
}

type RevalidatePartner = {
  id?: string;
  slug?: string;
};

export function revalidatePartnerPages(partner?: RevalidatePartner): void {
  revalidateTag(PARTNERS_CACHE_TAG, "seconds");
  if (partner?.id) revalidateTag(partnerIdTag(partner.id), "seconds");
  if (partner?.slug) revalidateTag(partnerSlugTag(partner.slug), "seconds");

  revalidatePath("/admin");
  revalidatePath("/admin/partners");
  revalidatePath("/admin", "layout");

  if (partner?.id) {
    revalidatePath(`/admin/partners/${partner.id}/edit`);
    revalidatePath(`/admin/partners/${partner.id}/preview`);
  }

  if (partner?.slug) {
    revalidatePath(`/${partner.slug}`);
  }
}
