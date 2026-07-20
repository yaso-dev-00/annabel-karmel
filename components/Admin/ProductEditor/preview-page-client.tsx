"use client";

import { ProductLivePreview } from "@/components/Admin/ProductEditor/product-live-preview";
import type { Product } from "@/lib/products/types";
import styles from "@/components/Admin/BlockEditor/block-editor.module.css";

type PreviewPageClientProps = {
  product: Product;
};

export function ProductPreviewPageClient({ product }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <ProductLivePreview product={product} defaultFullscreen />
    </div>
  );
}
