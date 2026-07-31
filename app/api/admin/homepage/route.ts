import { NextResponse } from 'next/server';
import {
  getHomepageDocument,
  updateHomepageDocument,
} from '@/lib/admin/homepage-store';
import type { HomepageDocument } from '@/lib/homepage/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET() {
  const homepage = await getHomepageDocument();
  return NextResponse.json(homepage, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<
      Omit<HomepageDocument, 'id' | 'created_at'>
    >;
    const homepage = await updateHomepageDocument(body);
    return NextResponse.json(homepage, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update homepage';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
