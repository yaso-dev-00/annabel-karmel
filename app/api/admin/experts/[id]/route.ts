import { NextResponse } from 'next/server';
import {
  deleteExpert,
  getExpertById,
  updateExpert,
} from '@/lib/admin/experts-store';
import { revalidateExpertPages } from '@/lib/admin/revalidate-expert-pages';
import type { Expert } from '@/lib/experts/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const expert = await getExpertById(id);
  if (!expert) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  return NextResponse.json(expert, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<Expert, 'id' | 'created_at'>
    >;
    const expert = await updateExpert(id, body);
    if (!expert) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    }
    revalidateExpertPages(expert);
    return NextResponse.json(expert, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update expert';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const expert = await getExpertById(id);
  const deleted = await deleteExpert(id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  revalidateExpertPages(expert ?? { id });
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
