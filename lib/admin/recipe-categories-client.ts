import type { RecipeTaxonomyGroup } from '@/data/recipe-taxonomies';

type CategoryGroupsResponse = {
  groups?: RecipeTaxonomyGroup[];
  error?: string;
};

function isCategoryGroupsResponse(
  value: unknown,
): value is CategoryGroupsResponse {
  return typeof value === 'object' && value !== null;
}

async function parseJson(response: Response): Promise<CategoryGroupsResponse> {
  const data: unknown = await response.json().catch(() => ({}));
  const payload = isCategoryGroupsResponse(data) ? data : {};
  if (!response.ok) {
    const message =
      typeof payload.error === 'string'
        ? payload.error
        : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return payload;
}

function readGroups(payload: CategoryGroupsResponse): RecipeTaxonomyGroup[] {
  return Array.isArray(payload.groups) ? payload.groups : [];
}

export async function fetchCategoryGroups(): Promise<RecipeTaxonomyGroup[]> {
  const response = await fetch('/api/admin/recipe-categories', {
    cache: 'no-store',
  });
  const data = await parseJson(response);
  return readGroups(data);
}

export async function saveCategoryGroupsApi(
  groups: RecipeTaxonomyGroup[],
): Promise<RecipeTaxonomyGroup[]> {
  const response = await fetch('/api/admin/recipe-categories', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groups }),
  });
  const data = await parseJson(response);
  const saved = readGroups(data);
  return saved.length > 0 ? saved : groups;
}
