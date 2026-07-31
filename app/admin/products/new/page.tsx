import { AdminShell } from '@/components/Admin/AdminShell';
import { ProductEditor } from '@/components/Admin/ProductEditor/product-editor';
import { createDefaultProduct } from '@/components/Admin/ProductEditor/create-default-product';

export default function AdminProductsNewPage() {
  const product = createDefaultProduct();

  return (
    <AdminShell breadcrumb="Products / New">
      <ProductEditor initialProduct={product} isNew section="meals" />
    </AdminShell>
  );
}
