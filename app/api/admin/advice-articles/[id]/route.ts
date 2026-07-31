import { NextResponse } from 'next/server';
import {
  deleteAdviceArticle,
  getAdviceArticleById,
  updateAdviceArticle,
} from '@/lib/admin/advice-articles-store';
import { revalidateAdviceArticlePages } from '@/lib/admin/revalidate-advice-pages';
import type { AdviceArticle } from '@/lib/content-blocks/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const article = await getAdviceArticleById(id);
  if (!article)
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  return NextResponse.json(article, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<AdviceArticle, 'id' | 'created_at'>
    >;
    const article = await updateAdviceArticle(id, body);
    if (!article)
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    revalidateAdviceArticlePages(article);
    return NextResponse.json(article, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update article';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const article = await getAdviceArticleById(id);
  const deleted = await deleteAdviceArticle(id);
  if (!deleted)
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  revalidateAdviceArticlePages(article ?? { id });
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
