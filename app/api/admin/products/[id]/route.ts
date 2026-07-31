import { NextResponse } from 'next/server';
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from '@/lib/admin/products-store';
import { revalidateProductPages } from '@/lib/admin/revalidate-product-pages';
import type { Product } from '@/lib/products/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  return NextResponse.json(product, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<Product, 'id' | 'created_at'>
    >;
    const product = await updateProduct(id, body);
    if (!product) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    }
    revalidateProductPages(product);
    return NextResponse.json(product, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update product';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = await getProductById(id);
  const deleted = await deleteProduct(id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  revalidateProductPages(product ?? { id });
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
