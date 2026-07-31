import { NextResponse } from 'next/server';
import {
  deleteCookbook,
  getCookbookById,
  updateCookbook,
} from '@/lib/admin/cookbooks-store';
import { revalidateCookbookPages } from '@/lib/admin/revalidate-cookbook-pages';
import type { Cookbook } from '@/lib/cookbooks/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const cookbook = await getCookbookById(id);
  if (!cookbook) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  return NextResponse.json(cookbook, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<Cookbook, 'id' | 'created_at'>
    >;
    const cookbook = await updateCookbook(id, body);
    if (!cookbook) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    }
    revalidateCookbookPages(cookbook);
    return NextResponse.json(cookbook, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update cookbook';
    const status = message.includes('already exists')
      ? 409
      : message.includes('Blob storage is full')
        ? 503
        : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const cookbook = await getCookbookById(id);
    const deleted = await deleteCookbook(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    }
    revalidateCookbookPages(cookbook ?? { id });
    return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete cookbook';
    const status = message.includes('Blob storage is full') ? 503 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}
