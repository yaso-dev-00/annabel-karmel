import { NextResponse } from 'next/server';
import {
  deleteCompetition,
  getCompetitionById,
  updateCompetition,
} from '@/lib/admin/competitions-store';
import { revalidateCompetitionPages } from '@/lib/admin/revalidate-competition-pages';
import type { Competition } from '@/lib/content-blocks/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const competition = await getCompetitionById(id);
  if (!competition)
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  return NextResponse.json(competition, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<Competition, 'id' | 'created_at'>
    >;
    const competition = await updateCompetition(id, body);
    if (!competition)
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    revalidateCompetitionPages(competition);
    return NextResponse.json(competition, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update competition';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const competition = await getCompetitionById(id);
  const deleted = await deleteCompetition(id);
  if (!deleted)
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  revalidateCompetitionPages(competition ?? { id });
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
