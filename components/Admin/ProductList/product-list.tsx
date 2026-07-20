"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUSES,
  getProductStatusBadgeClass,
  isProductDisabled,
  resolveProductStatus,
} from "@/lib/admin/product-status";
import {
  formatAdminListDate,
  matchesAdminListSearch,
} from "@/lib/admin/format-admin-list";
import { fetchProducts } from "@/lib/admin/products-client";
import { useAdminListRefresh } from "@/lib/admin/use-admin-list-refresh";
import {
  productCategoryLabel,
  type Product,
} from "@/lib/products/types";
import styles from "@/components/Admin/ProductEditor/product-editor.module.css";

type ProductListSection = "meals" | "grow";

type ProductListProps = {
  products: Product[];
  section?: ProductListSection;
  listPath?: string;
};

function ProductStatusBadge({ product }: { product: Product }) {
  const status = resolveProductStatus(product);
  return (
    <span className={`badge ${getProductStatusBadgeClass(status)}`}>
      {PRODUCT_STATUS_LABELS[status]}
    </span>
  );
}

function listingThumb(product: Product): string {
  const page = product.page;
  switch (page.kind) {
    case "australia-frozen":
      return page.carousel[0]?.src ?? "";
    case "tableware": {
      const active =
        page.colorVariants.find((variant) => variant.color === page.activeColor) ??
        page.colorVariants[0];
      return active?.gallery[0]?.src ?? "";
    }
    case "chilled-meals":
    case "frozen-meals":
    case "plant-powered-bites":
      return page.assets.heroMobile || page.assets.heroDesktop || page.carousel[0]?.src || "";
    default:
      return "";
  }
}

function publicPath(product: Product): string {
  if (product.category === "tableware") {
    return `/tableware/${product.slug}`;
  }
  return `/products/${product.slug}`;
}

function ClickableTableRow({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      className={`tableRowClickable${className ? ` ${className}` : ""}`}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </tr>
  );
}

export function ProductList({
  products: initialProducts,
  section = "meals",
  listPath = "/admin/products",
}: ProductListProps) {
  const products = useAdminListRefresh(initialProducts, fetchProducts, listPath);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...PRODUCT_STATUSES.map((status) => ({
        value: status,
        label: PRODUCT_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inSection =
        section === "grow" ? product.category === "tableware" : product.category !== "tableware";
      if (!inSection) return false;
      const status = resolveProductStatus(product);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(
        searchQuery,
        product.title,
        product.slug,
        productCategoryLabel(product.category),
      );
      return matchesStatus && matchesSearch;
    });
  }, [products, searchQuery, statusFilter, section]);

  const showCategoryColumn = section !== "grow";

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder={section === "grow" ? "Search Grow products…" : "Search products…"}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
      />
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 56 }} aria-hidden="true" />
            <th>Title</th>
            <th>Status</th>
            {showCategoryColumn ? <th>Category</th> : null}
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={showCategoryColumn ? 5 : 4} className="tableEmpty">
                No products match your search.
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => {
              const isDisabled = isProductDisabled(product);
              const thumb = listingThumb(product);

              return (
                <ClickableTableRow
                  key={product.id}
                  href={
                    section === "grow"
                      ? `/admin/grow-products/${product.id}/edit`
                      : `/admin/products/${product.id}/edit`
                  }
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td>
                    <div className={styles.thumbCell}>
                      {thumb ? <img src={thumb} alt="" /> : null}
                    </div>
                  </td>
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">{product.title}</span>
                    <span className="tableTitlePath">{publicPath(product)}</span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>
                    <ProductStatusBadge product={product} />
                  </td>
                  {showCategoryColumn ? <td>{productCategoryLabel(product.category)}</td> : null}
                  <td>{formatAdminListDate(product.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
