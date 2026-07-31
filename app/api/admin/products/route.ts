import { NextResponse } from 'next/server';
import { createProduct, getAllProducts } from '@/lib/admin/products-store';
import { revalidateProductPages } from '@/lib/admin/revalidate-product-pages';
import type { Product } from '@/lib/products/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      Product,
      'id' | 'created_at' | 'updated_at'
    >;
    const product = await createProduct(body);
    revalidateProductPages(product);
    return NextResponse.json(product, {
      status: 201,
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create product';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}
