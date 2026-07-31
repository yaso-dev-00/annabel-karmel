import Link from 'next/link';
import { AdminShell } from '@/components/Admin/AdminShell';
import { ProductList } from '@/components/Admin/ProductList/product-list';
import { getAllProducts } from '@/lib/admin/products-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminGrowProductsListPage() {
  const products = (await getAllProducts()).filter(
    (p) => p.category === 'tableware',
  );

  return (
    <AdminShell
      title="Grow Products"
      breadcrumb="Grow Products"
      actions={
        <Link href="/admin/grow-products/new" className="btn btnPrimary">
          + New product
        </Link>
      }
    >
      <ProductList
        products={products}
        section="grow"
        listPath="/admin/grow-products"
      />
    </AdminShell>
  );
}
