import { AdminShell } from "@/components/Admin/AdminShell";
import { ProductEditor } from "@/components/Admin/ProductEditor/product-editor";
import { createDefaultProduct } from "@/components/Admin/ProductEditor/create-default-product";

export default function AdminGrowProductsNewPage() {
  const product = createDefaultProduct("tableware");

  return (
    <AdminShell breadcrumb="Grow Products / New">
      <ProductEditor initialProduct={product} isNew section="grow" />
    </AdminShell>
  );
}
