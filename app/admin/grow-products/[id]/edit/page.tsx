import { notFound, redirect } from 'next/navigation';
import { AdminShell } from '@/components/Admin/AdminShell';
import { ProductEditor } from '@/components/Admin/ProductEditor/product-editor';
import { getProductById } from '@/lib/admin/products-store';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminGrowProductsEditPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  if (product.category !== 'tableware') {
    redirect(`/admin/products/${id}/edit`);
  }

  return (
    <AdminShell breadcrumb="Grow Products / Edit">
      <ProductEditor initialProduct={product} section="grow" />
    </AdminShell>
  );
}
