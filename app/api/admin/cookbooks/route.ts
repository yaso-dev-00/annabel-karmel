import { NextResponse } from 'next/server';
import { createCookbook, getAllCookbooks } from '@/lib/admin/cookbooks-store';
import { revalidateCookbookPages } from '@/lib/admin/revalidate-cookbook-pages';
import type { Cookbook } from '@/lib/cookbooks/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET() {
  const cookbooks = await getAllCookbooks();
  return NextResponse.json({ cookbooks }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      Cookbook,
      'id' | 'created_at' | 'updated_at'
    >;
    const cookbook = await createCookbook(body);
    revalidateCookbookPages(cookbook);
    return NextResponse.json(cookbook, {
      status: 201,
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create cookbook';
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
