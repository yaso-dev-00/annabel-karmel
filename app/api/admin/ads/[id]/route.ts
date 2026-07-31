import { NextResponse } from 'next/server';
import { deleteAd, getAdById, updateAd } from '@/lib/admin/ads-store';
import type { SiteAd } from '@/lib/ads/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const ad = await getAdById(id);
  if (!ad)
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  return NextResponse.json(ad, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<SiteAd, 'id' | 'created_at'>
    >;
    const ad = await updateAd(id, body);
    if (!ad)
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    return NextResponse.json(ad, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update advertisement';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = await deleteAd(id);
  if (!deleted)
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
