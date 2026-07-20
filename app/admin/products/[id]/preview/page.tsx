import { ProductPreviewPageClient } from "@/components/Admin/ProductEditor/preview-page-client";
import { DisabledArticlePreview } from "@/components/Admin/AdviceArticleEditor/disabled-article-preview";
import { getProductById } from "@/lib/admin/products-store";
import { isProductDisabled } from "@/lib/admin/product-status";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminProductsPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  if (isProductDisabled(product)) {
    return <DisabledArticlePreview title={product.title} />;
  }
  return <ProductPreviewPageClient product={product} />;
}
