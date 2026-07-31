import { NextResponse } from 'next/server';
import {
  createExpert,
  getAllExperts,
  getExpertsIntro,
} from '@/lib/admin/experts-store';
import { revalidateExpertPages } from '@/lib/admin/revalidate-expert-pages';
import type { Expert } from '@/lib/experts/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET() {
  const [experts, intro] = await Promise.all([
    getAllExperts(),
    getExpertsIntro(),
  ]);
  return NextResponse.json({ intro, experts }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      Expert,
      'id' | 'created_at' | 'updated_at'
    >;
    const expert = await createExpert(body);
    revalidateExpertPages(expert);
    return NextResponse.json(expert, {
      status: 201,
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create expert';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}
