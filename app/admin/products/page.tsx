import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { ProductList } from "@/components/Admin/ProductList/product-list";
import { getAllProducts } from "@/lib/admin/products-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsListPage() {
  const products = (await getAllProducts()).filter((p) => p.category !== "tableware");

  return (
    <AdminShell
      title="Products"
      breadcrumb="Products"
      actions={
        <Link href="/admin/products/new" className="btn btnPrimary">
          + New product
        </Link>
      }
    >
      <ProductList products={products} section="meals" listPath="/admin/products" />
    </AdminShell>
  );
}
