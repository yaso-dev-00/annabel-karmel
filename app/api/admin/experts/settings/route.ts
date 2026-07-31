import { NextResponse } from 'next/server';
import { updateExpertsIntro } from '@/lib/admin/experts-store';
import { revalidateExpertPages } from '@/lib/admin/revalidate-expert-pages';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { intro?: string };
    const intro = await updateExpertsIntro(body.intro ?? '');
    revalidateExpertPages();
    return NextResponse.json({ intro }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update experts intro';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
