'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArticleStatusField } from '@/components/Admin/Ui/ArticleStatusField';
import type { PreviewViewportHandle } from '@/components/Admin/BlockEditor/preview-viewport';
import { ProductLivePreview } from '@/components/Admin/ProductEditor/product-live-preview';
import { ProductPageFields } from '@/components/Admin/ProductEditor/product-page-fields';
import { createDefaultPageContent } from '@/components/Admin/ProductEditor/create-default-product';
import {
  createProductApi,
  updateProductApi,
} from '@/lib/admin/products-client';
import {
  applyProductStatus,
  buildProductSavePayload,
  getProductStatusPatch,
  isProductDisabled,
  isProductPreviewable,
  resolveProductStatus,
} from '@/lib/admin/product-status';
import { validateProductForPublish } from '@/lib/products/sanitize-product';
import {
  PRODUCT_CATEGORIES,
  productCategoryLabel,
  type Product,
  type ProductCategory,
  type ProductStatus,
} from '@/lib/products/types';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import styles from './product-editor.module.css';

type ProductEditorProps = {
  initialProduct: Product;
  isNew?: boolean;
  /** Grow Products section locks category to tableware and uses /tableware/ slug path. */
  section?: 'meals' | 'grow';
};

const MEAL_CATEGORIES = PRODUCT_CATEGORIES.filter(
  (c) => c.value !== 'tableware',
);

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ProductEditor({
  initialProduct,
  isNew,
  section = 'meals',
}: ProductEditorProps) {
  const router = useRouter();
  const previewRef = useRef<PreviewViewportHandle>(null);
  const [product, setProduct] = useState(initialProduct);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(isNew && !initialProduct.slug);
  const [editingSlug, setEditingSlug] = useState(false);
  const [tablewareVariantKey, setTablewareVariantKey] = useState<string | null>(
    null,
  );

  // Soft navigations / refresh can pass a newer initialProduct while this client
  // component stays mounted — don't keep stale empty colour galleries around.
  useEffect(() => {
    if (dirty) return;
    queueMicrotask(() => setProduct(initialProduct));
  }, [initialProduct, dirty]);

  const isGrow = section === 'grow' || product.category === 'tableware';
  const slugPrefix = isGrow ? '/tableware/' : '/products/';
  const categoryOptions = isGrow
    ? PRODUCT_CATEGORIES.filter((c) => c.value === 'tableware')
    : MEAL_CATEGORIES;

  const update = useCallback(
    <K extends keyof Product>(key: K, value: Product[K]) => {
      setProduct((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    [],
  );

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      if (publish) {
        const error = validateProductForPublish(product);
        if (error) {
          setMessage(error);
          setSaving(false);
          return;
        }
      }

      const payload = buildProductSavePayload(product, { publish });
      if (isNew || !product.id) {
        const created = await createProductApi(payload);
        setProduct(created);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.replace(
          isGrow
            ? `/admin/grow-products/${created.id}/edit`
            : `/admin/products/${created.id}/edit`,
        );
        router.refresh();
      } else {
        const updated = await updateProductApi(product.id, payload);
        setProduct(updated);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.refresh();
      }
    } catch (error) {
      const detail =
        error instanceof Error
          ? error.message
          : 'Save failed. Please try again.';
      setMessage(detail);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (
    status: ProductStatus,
    scheduledAt?: string | null,
  ) => {
    const next = applyProductStatus(product, status, scheduledAt);
    setProduct(next);

    if (!isNew && product.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateProductApi(
          product.id,
          getProductStatusPatch(next),
        );
        setProduct(updated);
        setDirty(false);
        setMessage(
          status === 'disabled'
            ? 'Product disabled.'
            : status === 'published'
              ? 'Product published.'
              : 'Status saved.',
        );
        router.refresh();
      } catch (error) {
        setDirty(true);
        const detail =
          error instanceof Error
            ? error.message
            : 'Failed to save status. Try Save draft.';
        setMessage(detail);
      } finally {
        setSaving(false);
      }
      return;
    }

    setDirty(true);
  };

  const handleCategoryChange = (category: ProductCategory) => {
    if (!isNew) return;
    setProduct((prev) => ({
      ...prev,
      category,
      page: createDefaultPageContent(category),
    }));
    setDirty(true);
  };

  const saveDraft = () => save(false);
  const publish = () => save(true);
  const productStatus = resolveProductStatus(product);
  const previewable = isProductPreviewable(product);
  const seoTitleLen = product.seo_title.length;
  const seoDescLen = product.seo_description.length;

  const titleField = useMemo(
    () => (
      <div className="card">
        <div className="field">
          <label className="fieldLabel" htmlFor="product-title">
            Product title
          </label>
          <input
            id="product-title"
            className="fieldInput"
            value={product.title}
            onChange={(e) => {
              const title = e.target.value;
              setProduct((prev) => ({
                ...prev,
                title,
                slug: autoSlug ? slugifyTitle(title) : prev.slug,
              }));
              setDirty(true);
            }}
          />
        </div>
        <div className={styles.slugField}>
          <div className={styles.slugFieldHeader}>
            <label
              className={styles.slugFieldLabel}
              htmlFor={editingSlug ? 'product-slug' : undefined}
            >
              Page URL
            </label>
            {autoSlug ? (
              <span className={styles.slugAutoHint}>Synced from title</span>
            ) : null}
          </div>

          {editingSlug ? (
            <div className={`${styles.slugBar} ${styles.slugBarEditing}`}>
              <span className={styles.slugPrefix}>{slugPrefix}</span>
              <input
                id="product-slug"
                className={styles.slugEditInput}
                value={product.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  update('slug', e.target.value);
                }}
                onBlur={() => setEditingSlug(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Escape') {
                    e.preventDefault();
                    setEditingSlug(false);
                  }
                }}
                autoFocus
                spellCheck={false}
              />
              <button
                type="button"
                className={styles.slugDoneBtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setEditingSlug(false)}
              >
                Done
              </button>
            </div>
          ) : (
            <div className={styles.slugBar}>
              <span className={styles.slugPrefix}>{slugPrefix}</span>
              <span className={styles.slugValue}>
                {product.slug || 'your-product-slug'}
              </span>
              <button
                type="button"
                className={styles.slugEditBtn}
                onClick={() => setEditingSlug(true)}
              >
                <span className={styles.slugEditIcon} aria-hidden>
                  ✎
                </span>
                Change slug
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    [autoSlug, editingSlug, product.slug, product.title, slugPrefix, update],
  );

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{product.title || 'Untitled'}</h1>
          <p className={`statusBar ${dirty && !message ? 'statusDirty' : ''}`}>
            {message
              ? message
              : dirty
                ? 'Unsaved changes'
                : 'All changes saved'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {previewable ? (
            <button
              type="button"
              className="btn btnGhost"
              onClick={() => previewRef.current?.openFullscreen()}
            >
              Preview
            </button>
          ) : (
            <button
              type="button"
              className="btn btnGhost"
              disabled
              title="Preview is unavailable while this product is disabled"
            >
              Preview
            </button>
          )}
          <button
            type="button"
            className="btn btnSecondary"
            onClick={saveDraft}
            disabled={saving}
          >
            Save draft
          </button>
          <button
            type="button"
            className="btn btnPrimary"
            onClick={publish}
            disabled={saving || isProductDisabled(product)}
          >
            Publish
          </button>
        </div>
      </div>

      <div className={blockStyles.editorWorkspace}>
        <div className={blockStyles.editorWorkspaceMain}>
          {titleField}

          <div className="card">
            <h2 className="cardSectionTitle">Category</h2>
            {isGrow ? (
              <p className={styles.categoryLocked}>Grow Products</p>
            ) : isNew ? (
              <div className="field">
                <select
                  className="fieldInput"
                  value={product.category}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value as ProductCategory)
                  }
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className={styles.sectionHint}>
                  Category locks the page template. Choose carefully — it cannot
                  be changed after save.
                </p>
              </div>
            ) : (
              <p className={styles.categoryLocked}>
                {productCategoryLabel(product.category)}
              </p>
            )}
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Status &amp; visibility</h2>
            <ArticleStatusField
              value={productStatus}
              scheduledAt={product.scheduled_at}
              onChange={handleStatusChange}
            />
          </div>

          <ProductPageFields
            page={product.page}
            onChange={(page) => {
              setProduct((prev) => ({ ...prev, page }));
              setDirty(true);
            }}
            onPreviewVariantChange={setTablewareVariantKey}
            productSlug={product.slug}
          />

          <div className="card">
            <div className={styles.sectionHeader}>
              <h2 className="cardSectionTitle">SEO</h2>
            </div>
            <p className={styles.sectionHint}>
              How this product appears in search results
            </p>
            <div className="cardForm">
              <div className="field">
                <div className={styles.sectionHeader}>
                  <label className="fieldLabel" htmlFor="seo-title">
                    SEO title
                  </label>
                  <span
                    className={`${styles.charCount} ${seoTitleLen > 60 ? styles.charCountWarn : ''}`}
                  >
                    {seoTitleLen}/60
                  </span>
                </div>
                <input
                  id="seo-title"
                  className="fieldInput"
                  value={product.seo_title}
                  onChange={(e) => update('seo_title', e.target.value)}
                />
              </div>
              <div className="field">
                <div className={styles.sectionHeader}>
                  <label className="fieldLabel" htmlFor="seo-desc">
                    Meta description
                  </label>
                  <span
                    className={`${styles.charCount} ${seoDescLen > 160 ? styles.charCountWarn : ''}`}
                  >
                    {seoDescLen}/160
                  </span>
                </div>
                <textarea
                  id="seo-desc"
                  className="fieldTextarea"
                  rows={3}
                  value={product.seo_description}
                  onChange={(e) => update('seo_description', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <aside
          className={blockStyles.editorPreviewColumn}
          aria-label="Live preview"
        >
          <ProductLivePreview
            ref={previewRef}
            product={product}
            className={blockStyles.previewPanelDocked}
            tablewareVariantKey={tablewareVariantKey}
            onTablewareVariantKeyChange={setTablewareVariantKey}
            fullscreenActions={
              <>
                <button
                  type="button"
                  className="btn btnSecondary"
                  onClick={saveDraft}
                  disabled={saving}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className="btn btnPrimary"
                  onClick={publish}
                  disabled={saving || isProductDisabled(product)}
                >
                  Publish
                </button>
              </>
            }
          />
        </aside>
      </div>
    </div>
  );
}
