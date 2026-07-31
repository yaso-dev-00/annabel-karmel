import type { Expert } from '@/lib/experts/types';

const BASE = '/api/admin/experts';

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchExperts(): Promise<{
  intro: string;
  experts: Expert[];
}> {
  const res = await fetch(BASE, { cache: 'no-store' });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to fetch experts'));
  return (await res.json()) as { intro: string; experts: Expert[] };
}

export async function fetchExpert(id: string): Promise<Expert> {
  const res = await fetch(`${BASE}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(await readApiError(res, 'Expert not found'));
  return (await res.json()) as Expert;
}

export async function createExpertApi(
  input: Omit<Expert, 'id' | 'created_at' | 'updated_at'>,
): Promise<Expert> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to create expert'));
  return (await res.json()) as Expert;
}

export async function updateExpertApi(
  id: string,
  input: Partial<Omit<Expert, 'id' | 'created_at'>>,
): Promise<Expert> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to update expert'));
  return (await res.json()) as Expert;
}

export async function deleteExpertApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to delete expert'));
}

export async function updateExpertsIntroApi(intro: string): Promise<string> {
  const res = await fetch(`${BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ intro }),
  });
  if (!res.ok)
    throw new Error(await readApiError(res, 'Failed to update experts intro'));
  const data = (await res.json()) as { intro: string };
  return data.intro;
}
