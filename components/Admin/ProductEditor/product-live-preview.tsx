'use client';

import {
  PreviewViewport,
  type PreviewViewportHandle,
} from '@/components/Admin/BlockEditor/preview-viewport';
import { AustraliaFrozenProductPageContent } from '@/components/ProductScreen/detail/AustraliaFrozenProductPage';
import { ChilledProductPageContent } from '@/components/ProductScreen/detail/ChilledProductPage';
import { FrozenProductPageContent } from '@/components/ProductScreen/detail/FrozenProductPage';
import { PlantPoweredBitesProductPageContent } from '@/components/ProductScreen/detail/PlantPoweredBitesProductPage';
import { TablewareProductPageContent } from '@/components/ProductScreen/tableware/TablewareProductPage';
import type { TablewareColorSwatch } from '@/data/tableware-product-page';
import { productToPageData } from '@/lib/products/product-to-page-data';
import type { Product, TablewarePageContent } from '@/lib/products/types';
import {
  tablewareContentToPageData,
  makeTablewareVariantKey,
} from '@/lib/products/tableware-variants';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import {
  forwardRef,
  memo,
  useDeferredValue,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import './product-preview-layout.css';
import './tableware-preview-layout.css';

type ProductLivePreviewProps = {
  product: Product;
  fullscreenActions?: ReactNode;
  className?: string;
  defaultFullscreen?: boolean;
  /** Controlled colour for Grow preview (editor colour tab / external sync). */
  tablewareVariantKey?: string | null;
  onTablewareVariantKeyChange?: (variantKey: string | null) => void;
};

const TablewarePagePreview = memo(function TablewarePagePreview({
  product,
  page,
  variantKey,
  onVariantKeyChange,
}: {
  product: Product;
  page: TablewarePageContent;
  variantKey?: string | null;
  onVariantKeyChange?: (variantKey: string | null) => void;
}) {
  const [internalVariantKey, setInternalVariantKey] = useState<string | null>(
    null,
  );
  const selectedVariantKey =
    variantKey !== undefined ? variantKey : internalVariantKey;
  const setSelectedVariantKey = onVariantKeyChange ?? setInternalVariantKey;

  const previewData = tablewareContentToPageData(
    page,
    {
      slug: product.slug,
      title: product.title,
      metaDescription: product.seo_description,
    },
    selectedVariantKey,
  );

  useEffect(() => {
    // Keep selection if that colour still exists; otherwise fall back to default.
    if (!selectedVariantKey) return;
    const stillExists = page.colorVariants.some((variant, index) => {
      if (selectedVariantKey === makeTablewareVariantKey(index)) return true;
      if (variant.slug.trim() && variant.slug === selectedVariantKey)
        return true;
      return variant.color === selectedVariantKey;
    });
    if (!stillExists) setSelectedVariantKey(null);
  }, [page.colorVariants, selectedVariantKey, setSelectedVariantKey]);

  const handleSwatchSelect = (_swatch: TablewareColorSwatch, index: number) => {
    setSelectedVariantKey(makeTablewareVariantKey(index));
  };

  return (
    <TablewareProductPageContent
      data={previewData}
      previewMode
      onSwatchSelect={handleSwatchSelect}
    />
  );
});

const ProductPagePreview = memo(function ProductPagePreview({
  product,
  tablewareVariantKey,
  onTablewareVariantKeyChange,
}: {
  product: Product;
  tablewareVariantKey?: string | null;
  onTablewareVariantKeyChange?: (variantKey: string | null) => void;
}) {
  const mapped = productToPageData(product);

  switch (mapped.category) {
    case 'chilled-meals':
      return <ChilledProductPageContent data={mapped.data} />;
    case 'frozen-meals':
      return <FrozenProductPageContent data={mapped.data} />;
    case 'plant-powered-bites':
      return <PlantPoweredBitesProductPageContent data={mapped.data} />;
    case 'australia-frozen':
      return <AustraliaFrozenProductPageContent data={mapped.data} />;
    case 'tableware':
      return product.page.kind === 'tableware' ? (
        <TablewarePagePreview
          product={product}
          page={product.page}
          variantKey={tablewareVariantKey}
          onVariantKeyChange={onTablewareVariantKeyChange}
        />
      ) : null;
  }
});

export const ProductLivePreview = forwardRef<
  PreviewViewportHandle,
  ProductLivePreviewProps
>(function ProductLivePreview(
  {
    product,
    fullscreenActions,
    className,
    defaultFullscreen,
    tablewareVariantKey,
    onTablewareVariantKeyChange,
  },
  ref,
) {
  const deferredProduct = useDeferredValue(product);

  return (
    <PreviewViewport
      ref={ref}
      className={className ?? blockStyles.previewPanelDocked}
      bodyClassName={blockStyles.previewBodyFlush}
      fullscreenActions={fullscreenActions}
      defaultFullscreen={defaultFullscreen}
      dockedViewport="mobile"
      dockedWidth={390}
      viewportWidthOverrides={{ mobile: 390 }}
      title="Live preview"
    >
      <ProductPagePreview
        product={deferredProduct}
        tablewareVariantKey={tablewareVariantKey}
        onTablewareVariantKeyChange={onTablewareVariantKeyChange}
      />
    </PreviewViewport>
  );
});
