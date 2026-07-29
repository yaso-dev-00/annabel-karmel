import type { RecipeTaxonomyGroup } from "@/data/recipe-taxonomies";

async function parseJson(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof data?.error === "string" ? data.error : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}

export async function fetchCategoryGroups(): Promise<RecipeTaxonomyGroup[]> {
  const response = await fetch("/api/admin/recipe-categories", { cache: "no-store" });
  const data = await parseJson(response);
  return Array.isArray(data.groups) ? data.groups : [];
}

export async function saveCategoryGroupsApi(
  groups: RecipeTaxonomyGroup[],
): Promise<RecipeTaxonomyGroup[]> {
  const response = await fetch("/api/admin/recipe-categories", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groups }),
  });
  const data = await parseJson(response);
  return Array.isArray(data.groups) ? data.groups : groups;
}
