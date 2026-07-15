import { revalidatePath, revalidateTag } from "next/cache";

export const COMPETITIONS_CACHE_TAG = "competitions";

export function competitionIdTag(id: string): string {
  return `competition:${id}`;
}

export function competitionSlugTag(slug: string): string {
  return `competition-slug:${slug}`;
}

type RevalidateCompetition = {
  id?: string;
  slug?: string;
};

export function revalidateCompetitionPages(competition?: RevalidateCompetition): void {
  revalidateTag(COMPETITIONS_CACHE_TAG, "seconds");
  if (competition?.id) revalidateTag(competitionIdTag(competition.id), "seconds");
  if (competition?.slug) revalidateTag(competitionSlugTag(competition.slug), "seconds");

  revalidatePath("/admin");
  revalidatePath("/admin/competitions");
  revalidatePath("/admin", "layout");

  if (competition?.id) {
    revalidatePath(`/admin/competitions/${competition.id}/edit`);
    revalidatePath(`/admin/competitions/${competition.id}/preview`);
  }

  if (competition?.slug) {
    revalidatePath(`/competitions/${competition.slug}`);
  }
}
